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
import { TEXT } from "./calcite-video.resources";

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

  /** string to override English play text */
  @Prop() intlPlay = TEXT.intlPlay;
  /** string to override English pause text */

  @Prop() intlPause = TEXT.intlPause;

  /** string to override English restart text */
  @Prop() intlRestart = TEXT.intlRestart;

  /** string to override English enter fullscreen text */
  @Prop() intlEnterFullscreen = TEXT.intlEnterFullscreen;

  /** string to override English exit fullscreen text */
  @Prop() intlExitFullscreen = TEXT.intlExitFullscreen;

  /** string to override English mute text */
  @Prop() intlMute = TEXT.intlMute;

  /** string to override English unmute text */
  @Prop() intlUnmute = TEXT.intlUnmute;

  /** string to override English subtitles text */
  @Prop() intlSubtitles = TEXT.intlSubtitles;

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
          icon-start={
            this.isComplete ? "reset" : this.isPlaying ? "pause" : "play"
          }
          title={
            this.isComplete
              ? this.intlRestart
              : this.isPlaying
              ? this.intlPause
              : this.intlPlay
          }
          aria-label={
            this.isComplete
              ? this.intlRestart
              : this.isPlaying
              ? this.intlPause
              : this.intlPlay
          }
          onClick={() => this.toggleVideo()}
        />
      </div>
    );

    const volumeControl = (
      <div class="calcite-video-control-item calcite-video-volume-control-item">
        <calcite-button
          dir={dir}
          scale="s"
          appearance="transparent"
          color="dark"
          icon-start={this.muted ? "sound-unavailable" : "sound"}
          title={!this.muted ? this.intlMute : this.intlUnmute}
          aria-label={!this.muted ? this.intlMute : this.intlUnmute}
          onClick={() => this.toggleMuted()}
        />
        <calcite-slider
          dir={dir}
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
      <div class="calcite-video-control-item calcite-video-fullscreen-control-item">
        <calcite-button
          scale="s"
          appearance="transparent"
          color="dark"
          icon-start={!this.isFullscreen ? "extent" : "full-screen-exit"}
          title={
            !this.isFullscreen
              ? this.intlEnterFullscreen
              : this.intlExitFullscreen
          }
          aria-label={
            !this.isFullscreen
              ? this.intlEnterFullscreen
              : this.intlExitFullscreen
          }
          onClick={() => this.toggleFullscreen()}
        />
      </div>
    );

    const subtitleControlSingle = (
      <div class="calcite-video-control-item calcite-video-subtitle-control-item">
        <calcite-button
          scale="s"
          class={this.isSubtitleActive ? "calcite-video-subtitle-active" : ""}
          appearance="transparent"
          color="dark"
          icon-start="speech-bubble"
          onClick={() => this.handleSubtitleToggle()}
          title={this.intlSubtitles}
          aria-label={this.intlSubtitles}
        >
          {this.isSubtitleActive
            ? `${this.currentSubtitleLang?.toUpperCase()}`
            : null}
        </calcite-button>
      </div>
    );

    const subtitleControlMultiple = (
      <div class="calcite-video-control-item calcite-video-subtitle-control-item">
        <calcite-dropdown alignment="end" width="s">
          <calcite-button
            slot="dropdown-trigger"
            scale="s"
            class={this.isSubtitleActive ? "calcite-video-subtitle-active" : ""}
            appearance="transparent"
            color="dark"
            icon-start="speech-bubbles"
            title={this.intlSubtitles}
            aria-label={this.intlSubtitles}
          >
            {this.isSubtitleActive
              ? `${this.currentSubtitleLang?.toUpperCase()}`
              : null}
          </calcite-button>
          <calcite-dropdown-group selection-mode="single">
            <calcite-dropdown-item
              active={!this.isSubtitleActive}
              onCalciteDropdownItemSelect={(e) =>
                this.handleSubtitleSelection(e)
              }
            >
              Off
            </calcite-dropdown-item>
            {this.subtitleDropdownItems}
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    );

    const progress = !this.disableScrubbing ? (
      <div class="calcite-video-scrubber-wrapper">
        <calcite-slider
          dir={dir}
          theme={this.theme}
          class="calcite-video-scrubber"
          ref={(el) => (this.scrubberEl = el)}
          onCalciteSliderUpdate={(e) => this.updatePlaybackPosition(e)}
          onKeyDown={(e) => this.handleScrubberKeyDown(e)}
        />
      </div>
    ) : (
      <calcite-progress
        dir={dir}
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
          active={this.isLoading}
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
  @Listen("click") clickListener() {
    if (!this.isLoading && !this.playOnHover && event.target === this.videoEl) {
      this.toggleVideo();
    }
  }

  @Listen("mouseenter") mouseEnterListener() {
    if (
      !this.isLoading &&
      this.playOnHover &&
      document.activeElement !== this.el
    )
      this.playVideo();
  }

  @Listen("mouseleave") mouseLeaveListener() {
    if (
      !this.isLoading &&
      this.playOnHover &&
      document.activeElement !== this.el
    )
      this.pauseVideo();
  }

  @Listen("focus") focusInListener() {
    if (!this.isLoading && this.playOnHover) this.playVideo();
  }

  @Listen("blur") focusOutListener() {
    if (!this.isLoading && this.playOnHover) this.pauseVideo();
  }

  @Listen("keydown") keydownListener(e: KeyboardEvent): void {
    if (
      !this.isLoading &&
      !this.playOnHover &&
      e.composedPath()[0] === this.el
    ) {
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
  subtitleDropdownItems: HTMLCalciteDropdownItemElement[] = [];

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
    this.getSubtitleDropdownItems();
  };

  getSubtitleDropdownItems = () => {
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
      this.subtitleDropdownItems = [...Array.from(new Set(items))];
    } else return;
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
          this.isSubtitleActive = false;
        }
      }
    } else return;
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
