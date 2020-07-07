import {
  Component,
  h,
  Host,
  Prop,
  Event,
  EventEmitter,
  Element,
  Listen,
  State,
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { getKey } from "../../utils/key";

@Component({
  tag: "calcite-video",
  styleUrl: "calcite-video.scss",
  shadow: true,
})
export class CalciteVideo {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** specify the scale of the video player, defaults to m */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** the src of the media  */
  @Prop({ reflect: true }) src?: string;

  /** preload type */
  @Prop({ reflect: true }) preload: "auto" | "none" | "preload" = "auto";

  /** loop the media */
  @Prop({ reflect: true }) loop: boolean = false;

  /** autoplay the media */
  @Prop({ reflect: true }) autoplay: boolean = false;

  /** is the media muted */
  @Prop({ reflect: true }) muted: boolean = false;

  /** is fullscreen mode allowed */
  @Prop({ reflect: true }) allowFullscreen: boolean = false;

  /** is scrubbing mode allowed */
  @Prop({ reflect: true }) allowScrubbing: boolean = false;

  /** allow play on hover  */
  @Prop({ reflect: true }) playOnHover: boolean = false;

  /** hide progress */
  @Prop({ reflect: true }) hideProgress: boolean = false;

  /** hide controls */
  @Prop({ reflect: true }) hideControls: boolean = false;

  /** hide controls */
  @Prop({ reflect: true }) showControlsOnHover: boolean = false;

  /** hide timestamp */
  @Prop({ reflect: true }) hideTimestamp: boolean = false;

  /** a desired height of the video */
  @Prop({ reflect: true }) height?: string;

  /** a desired width of the video */
  @Prop({ reflect: true }) width?: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteVideoElement;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  @Event() calciteVideoPlay: EventEmitter;
  @Event() calciteVideoPause: EventEmitter;
  @Event() calciteVideoComplete: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render() {
    const dir = getElementDir(this.el);

    const playControl = (
      <div class="calcite-video-control-item">
        <calcite-button
          scale="s"
          appearance="transparent"
          color="dark"
          icon={this.isComplete ? "reset" : this.isPlaying ? "pause" : "play"}
          onClick={() => this.toggleVideo()}
        />
      </div>
    );

    const volumeControl = (
      <div class="calcite-video-control-item volume-control-item">
        <calcite-button
          scale="s"
          appearance="transparent"
          color="dark"
          icon={this.muted ? "sound-unavailable" : "sound"}
          onClick={() => this.toggleMuted()}
        />
        <calcite-slider
          theme={this.theme}
          min={0}
          max={1}
          step={0.1}
          value={!this.muted ? (this.volumeLevel as number) : 0}
          onCalciteSliderUpdate={(e) => this.updateVolumeLevel(e)}
          onKeyDown={(e) => this.handleVolumeSliderKeyDown(e)}
        />
      </div>
    );

    const fullscreenControl = (
      <div class="calcite-video-control-item fullscreen-control-item">
        <calcite-button
          scale="s"
          appearance="transparent"
          color="dark"
          icon={!this.isFullscreen ? "extent" : "full-screen-exit"}
          onClick={() => this.toggleFullscreen()}
        />
      </div>
    );

    const progress = this.allowScrubbing ? (
      <div class="calcite-video-scrubber-wrapper">
        <calcite-slider
          theme={this.theme}
          class="calcite-video-scrubber"
          ref={(el) => (this.scrubberEl = el)}
          onCalciteSliderUpdate={(e) => this.updatePlaybackPosition(e)}
          onKeyDown={(e) => this.handleScrubberKeyDown(e)}
        />
      </div>
    ) : (
      <calcite-progress
        theme={this.theme}
        ref={(el) => (this.progressEl = el)}
      />
    );

    const time = (
      <div class="calcite-video-time">
        <span>{this.formatTime(this.currentTime)}</span>
        <span>&nbsp;/&nbsp;{this.formatTime(this.videoDuration)}</span>
      </div>
    );

    return (
      <Host dir={dir} tabIndex={0}>
        <calcite-loader
          type="indeterminate"
          is-active={this.isLoading}
        ></calcite-loader>
        <div
          class={`calcite-video-wrapper ${
            this.isFullscreen ? " calcite-video-fullscreen" : ""
          }`}
        >
          <video
            src={this.src}
            loop={this.loop}
            autoplay={this.autoplay}
            preload={this.preload}
            ref={(el) => (this.videoEl = el)}
            // ensure video is muted if autoplay is requested
            muted={this.muted || this.autoplay}
            height={this.height}
            width={this.width}
            controls={false}
            onTimeUpdate={() => this.determineProgress()}
            onEnded={() => this.determineProgress()}
            onLoadedMetaData={() => this.getVideoInfo()}
            onLoadStart={() => this.videoLoadStart()}
            onCanPlay={() => this.videoLoadFinish()}
          />
        </div>
        {!this.hideControls && !this.hideProgress ? (
          <div class="calcite-video-footer">
            {!this.hideProgress ? progress : null}
            {!this.hideControls ? (
              <div class="calcite-video-controls">
                {playControl}
                {this.hasAudio ? volumeControl : null}
                {!this.hideTimestamp ? time : null}
                {this.allowFullscreen ? fullscreenControl : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </Host>
    );
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  // pause other instances of video on page when another starts
  @Listen("calciteVideoPlay", { target: "window" }) videoPlayListener(e) {
    if (e.target !== this.el) {
      this.pauseVideo();
    }
  }

  @Listen("mouseenter") mouseEnterListener() {
    if (this.playOnHover && document.activeElement !== this.el)
      this.playVideo();
  }

  @Listen("mouseleave") mouseLeaveListener() {
    if (this.playOnHover && document.activeElement !== this.el)
      this.pauseVideo();
  }

  @Listen("focus") focusInListener() {
    if (this.playOnHover) this.playVideo();
  }

  @Listen("blur") focusOutListener() {
    if (this.playOnHover) this.pauseVideo();
  }

  @Listen("keydown") keydownListener(e: KeyboardEvent): void {
    if (!this.playOnHover && e.composedPath()[0] === this.el) {
      const key = getKey(e.key);
      if (key === " " || key === "Enter") {
        e.preventDefault();
        this.toggleVideo();
      }
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** the rendered child element */
  private videoEl?: HTMLVideoElement;

  /** the rendered progress element */
  private progressEl?: HTMLCalciteProgressElement;

  /** the rendered child element */
  private scrubberEl?: HTMLCalciteSliderElement;

  /** the unformatted video duration */
  private videoDuration?: Number = 0;

  /** volume level */
  @State() volumeLevel?: Number = 0.5;

  /** is the video playing in fullscreen */
  @State() isFullscreen?: boolean = false;

  /** the unformatted current time value of the video player */
  @State() currentTime?: Number = 0;

  /** show loading until sufficiently loaded */
  @State() isLoading: boolean = false;

  /** is the video playing */
  @State() isPlaying?: boolean = false;

  /** is the video complete */
  @State() isComplete?: boolean = false;

  /** does the video have an audio track */
  @State() hasAudio?: boolean = true;

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  videoLoadStart = () => {
    this.isLoading = true;
  };

  videoLoadFinish = () => {
    this.isLoading = false;
    if (this.autoplay) this.toggleVideo();
  };

  getVideoInfo = () => {
    this.videoDuration = this.videoEl?.duration;
    // check if has audio to display volume
    // if no audio, dont show volume controls
  };

  toggleVideo = () => {
    if (this.isComplete || !this.isPlaying) {
      this.playVideo();
    } else {
      this.pauseVideo();
    }
  };

  playVideo() {
    this.videoEl.play();
    this.isPlaying = true;
    this.calciteVideoPlay.emit();
  }

  pauseVideo() {
    this.videoEl.pause();
    this.isPlaying = false;
    this.calciteVideoPause.emit();
  }

  toggleMuted = () => {
    this.muted = !this.muted;
  };

  updateVolumeLevel = (e) => {
    this.volumeLevel = e.target.value;
    this.videoEl.volume = this.volumeLevel as number;
    this.muted = this.volumeLevel === 0;
  };

  handleScrubberKeyDown = (e) => {
    const key = getKey(e.key);
    if (key === " " || key === "Enter") {
      e.preventDefault();
      this.toggleVideo();
    }
  };

  handleVolumeSliderKeyDown = (e) => {
    const key = getKey(e.key);
    if (key === " " || key === "Enter") {
      e.preventDefault();
      this.toggleMuted();
    }
  };

  updatePlaybackPosition = (e) => {
    let requestedTime = (e.target.value / 100) * (this.videoDuration as number);
    this.currentTime = requestedTime;
    this.videoEl.currentTime = this.currentTime as number;
  };

  toggleFullscreen = () => {
    // todo remove type any - get errors without
    if (!this.isFullscreen) {
      this.isFullscreen = true;
      if ((this.el as any).requestFullscreen) {
        (this.el as any).requestFullscreen();
      } else if ((this.el as any).mozRequestFullScreen) {
        (this.el as any).mozRequestFullScreen();
      } else if ((this.el as any).webkitRequestFullscreen) {
        (this.el as any).webkitRequestFullscreen();
      } else if ((this.el as any).msRequestFullscreen) {
        (this.el as any).msRequestFullscreen();
      }
    } else if (this.isFullscreen) {
      this.isFullscreen = false;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  formatTime(currentTime) {
    // todo fix the flash of :60 seconds
    if (currentTime) {
      const hours = Math.floor(currentTime / 3600);
      const minutes = Math.floor((currentTime % 3600) / 60);
      const seconds = Math.round(currentTime % 60);
      return [
        hours,
        minutes > 9 ? minutes : hours ? `0${minutes}` : minutes || `0`,
        seconds > 9 ? seconds : `0${seconds}`,
      ]
        .filter(Boolean)
        .join(":");
    } else return `0:00`;
  }

  determineProgress() {
    if (!this.hideProgress) {
      this.isComplete = this.currentTime === this.videoDuration;
      this.currentTime = this.videoEl?.currentTime;
      if (this.allowScrubbing) {
        let position =
          ((this.currentTime as number) / (this.videoDuration as number)) * 100;
        this.scrubberEl?.setAttribute("value", `${position}`);
      } else {
        let position =
          (this.currentTime as number) / (this.videoDuration as number);
        this.progressEl?.setAttribute("value", `${position}`);
      }
      if (this.isComplete) this.calciteVideoComplete.emit();
    }
  }
}
