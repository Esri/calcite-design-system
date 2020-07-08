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
  shadow: false,
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

  /** preload type */
  @Prop({ reflect: true }) preload: "auto" | "none" | "preload" = "auto";

  /** loop the media */
  @Prop({ reflect: true }) loop: boolean = false;

  /** autoplay the media */
  @Prop({ reflect: true }) autoplay: boolean = false;

  /** is the media muted */
  @Prop({ reflect: true }) muted: boolean = false;

  /** allow play on hover  */
  @Prop({ reflect: true }) playOnHover: boolean = false;

  /** show controls on hover */
  @Prop({ reflect: true }) showControlsOnHover: boolean = false;

  /** is fullscreen mode disabled */
  @Prop({ reflect: true }) disableFullscreen: boolean = false;

  /** is scrubbing mode disabled */
  @Prop({ reflect: true }) disableScrubbing: boolean = false;

  /** disable progress */
  @Prop({ reflect: true }) disableProgress: boolean = false;

  /** disable controls */
  @Prop({ reflect: true }) disableControls: boolean = false;

  /** disable timestamp */
  @Prop({ reflect: true }) disableTimestamp: boolean = false;

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

    const subtitleControlSingle = (
      <div class="calcite-video-control-item subtitle-control-item">
        <calcite-button
          scale="s"
          appearance="transparent"
          color="dark"
          icon={!this.isSubtitleActive ? "speech-bubble" : "banana"}
          onClick={() => this.handleSubtitleToggle()}
        />
      </div>
    );

    const subtitleControlMultiple = (
      <div class="calcite-video-control-item subtitle-control-item">
        <calcite-dropdown alignment="end" width="s">
          <div slot="dropdown-trigger">
            <calcite-button
              scale="s"
              appearance="transparent"
              color="dark"
              icon={!this.isSubtitleActive ? "speech-bubbles" : "banana"}
            />
            {this.isSubtitleActive ? (
              <calcite-chip
                scale="s"
                value={this.currentSubtitleLang?.toUpperCase()}
              >
                {this.currentSubtitleLang?.toUpperCase()}
              </calcite-chip>
            ) : null}
          </div>
          <calcite-dropdown-group selection-mode="single">
            <calcite-dropdown-item
              active={!this.isSubtitleActive}
              onCalciteDropdownItemSelect={(e) =>
                this.handleSubtitleSelection(e)
              }
            >
              Off
            </calcite-dropdown-item>
            {this.availableSubtitleDropdownOptions}
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    );

    const progress = !this.disableScrubbing ? (
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
          >
            <slot />
          </video>
        </div>
        {!this.disableControls && !this.disableProgress ? (
          <div class="calcite-video-footer">
            {!this.disableProgress ? progress : null}
            {!this.disableControls ? (
              <div class="calcite-video-controls">
                {playControl}
                {this.hasAudio ? volumeControl : null}
                {!this.disableTimestamp ? time : null}
                {this.hasSubtitle && this.availableSubtitles?.length > 1
                  ? subtitleControlMultiple
                  : this.hasSubtitle
                  ? subtitleControlSingle
                  : null}
                {!this.disableFullscreen ? fullscreenControl : null}
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
  // todo determine if there is an audio track, if not, hide volume control
  @State() hasAudio?: boolean = true;

  /** does the video have availble subtitle */
  @State() hasSubtitle?: boolean = true;

  /** is a subtitle currently active */
  @State() isSubtitleActive?: boolean = false;

  /** the videos available subtitles */
  @State() availableSubtitles?: TextTrackList;

  /** the language of the current subtitle */
  @State() currentSubtitleLang?: String;

  @State()
  availableSubtitleDropdownOptions: HTMLCalciteDropdownItemElement[] = [];

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
    this.availableSubtitles = this.videoEl?.textTracks;
    this.hasSubtitle = this.availableSubtitles?.length > 0;
    this.initializeSubtitles();
  };

  initializeSubtitles = () => {
    // get the default track language and disable until requested
    let subtitles = Object.values(this.availableSubtitles);
    for (let item of subtitles) {
      if (item.mode === "showing") this.currentSubtitleLang = item.language;
      item.mode = "hidden";
    }
    this.getSubtitleDropdownOptions();
  };

  getSubtitleDropdownOptions = () => {
    // create the list of abailable subtitles for the dropdown
    if (this.availableSubtitles) {
      let items = [];
      Object.values(this.availableSubtitles).map((item) => {
        let node = (
          <calcite-dropdown-item
            active={
              this.isSubtitleActive &&
              this.currentSubtitleLang === item.language
            }
            onCalciteDropdownItemSelect={(e) => this.handleSubtitleSelection(e)}
            data-language={item.language}
          >
            {item.language.toUpperCase()}
          </calcite-dropdown-item>
        );
        items.push(node);
      });
      this.availableSubtitleDropdownOptions = [...Array.from(new Set(items))];
    }
  };

  handleSubtitleToggle = () => {
    // if one language, toggle and don't show a menu
    if (this.availableSubtitles) {
      for (let item of Object.values(this.availableSubtitles)) {
        if (item.language === this.currentSubtitleLang) {
          if (item.mode === "hidden") {
            item.mode = "showing";
            this.isSubtitleActive = true;
          } else if (item.mode === "showing") {
            item.mode = "hidden";
            this.isSubtitleActive = false;
          }
        }
      }
    } else return;
  };

  handleSubtitleSelection = (e) => {
    // if more than one language, show a menu and toggle on selection
    // if user selects "off" - disable all
    let requestedLang = e.target.dataset.language;
    if (this.availableSubtitles) {
      for (let item of Object.values(this.availableSubtitles)) {
        item.mode = "hidden";
        if (requestedLang) {
          this.currentSubtitleLang = requestedLang;
          this.isSubtitleActive = true;
          if (this.currentSubtitleLang === item.language) item.mode = "showing";
        } else {
          this.isSubtitleActive = !this.isSubtitleActive;
        }
      }
    }
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
    if (!this.disableProgress) {
      this.isComplete = this.currentTime === this.videoDuration;
      this.currentTime = this.videoEl?.currentTime;
      if (!this.disableScrubbing) {
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
