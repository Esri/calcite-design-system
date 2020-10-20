import {
  Component,
  h,
  Host,
  Prop,
  Event,
  EventEmitter,
  Element,
  Listen,
  State
} from "@stencil/core";
import { Mouse } from "puppeteer";
import { getElementDir } from "../../utils/dom";
import { getKey } from "../../utils/key";
import { TEXT } from "./calcite-video.resources";

@Component({
  tag: "calcite-video",
  styleUrl: "calcite-video.scss",
  shadow: false
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
  @Prop({ reflect: true }) loop: boolean;

  /** autoplay the media */
  @Prop({ reflect: true }) autoplay: boolean;

  /** is the media muted */
  @Prop({ reflect: true }) muted: boolean;

  /** allow play on hover  */
  @Prop({ reflect: true }) playOnHover: boolean;

  /** show controls on hover */
  @Prop({ reflect: true }) showControlsOnHover: boolean;

  /** is fullscreen mode disabled */
  @Prop({ reflect: true }) disableFullscreen: boolean;

  /** is scrubbing mode disabled */
  @Prop({ reflect: true }) disableScrubbing: boolean;

  /** disable progress */
  @Prop({ reflect: true }) disableProgress: boolean;

  /** disable controls */
  @Prop({ reflect: true }) disableControls: boolean;

  /** disable timestamp */
  @Prop({ reflect: true }) disableTimestamp: boolean;

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
          appearance="transparent"
          aria-label={
            this.isComplete ? this.intlRestart : this.isPlaying ? this.intlPause : this.intlPlay
          }
          color="dark"
          icon-start={this.isComplete ? "reset" : this.isPlaying ? "pause" : "play"}
          onClick={() => this.toggleVideo()}
          scale="s"
          title={
            this.isComplete ? this.intlRestart : this.isPlaying ? this.intlPause : this.intlPlay
          }
        />
      </div>
    );

    const volumeControl = (
      <div class="calcite-video-control-item calcite-video-volume-control-item">
        <calcite-button
          appearance="transparent"
          aria-label={!this.muted ? this.intlMute : this.intlUnmute}
          color="dark"
          icon-flip-rtl={dir == "rtl" ? "start" : null}
          icon-start={this.muted ? "sound-unavailable" : "sound"}
          onClick={() => this.toggleMuted()}
          scale="s"
          title={!this.muted ? this.intlMute : this.intlUnmute}
        />
        <calcite-slider
          max={1}
          min={0}
          onCalciteSliderUpdate={(e) => this.updateVolumeLevel(e)}
          onKeyDown={(e) => this.handleVolumeSliderKeyDown(e)}
          step={0.1}
          theme={this.theme}
          value={!this.muted ? (this.volumeLevel as number) : 0}
        />
      </div>
    );

    const fullscreenControl = (
      <div class="calcite-video-control-item calcite-video-fullscreen-control-item">
        <calcite-button
          appearance="transparent"
          aria-label={!this.isFullscreen ? this.intlEnterFullscreen : this.intlExitFullscreen}
          color="dark"
          icon-start={!this.isFullscreen ? "extent" : "full-screen-exit"}
          onClick={() => this.toggleFullscreen()}
          scale="s"
          title={!this.isFullscreen ? this.intlEnterFullscreen : this.intlExitFullscreen}
        />
      </div>
    );

    const subtitleControlSingle = (
      <div class="calcite-video-control-item calcite-video-subtitle-control-item">
        <calcite-button
          appearance="transparent"
          aria-label={this.intlSubtitles}
          class={this.isSubtitleActive ? "calcite-video-subtitle-active" : ""}
          color="dark"
          icon-flip-rtl={dir == "rtl" ? "start" : null}
          icon-start="speech-bubble"
          onClick={() => this.handleSubtitleToggle()}
          scale="s"
          title={this.intlSubtitles}
        >
          {this.isSubtitleActive ? `${this.currentSubtitleLang?.toUpperCase()}` : null}
        </calcite-button>
      </div>
    );

    const subtitleControlMultiple = (
      <div class="calcite-video-control-item calcite-video-subtitle-control-item">
        <calcite-dropdown alignment="end" width="s">
          <calcite-button
            appearance="transparent"
            aria-label={this.intlSubtitles}
            class={this.isSubtitleActive ? "calcite-video-subtitle-active" : ""}
            color="dark"
            icon-flip-rtl={dir == "rtl" ? "start" : null}
            icon-start="speech-bubbles"
            scale="s"
            slot="dropdown-trigger"
            title={this.intlSubtitles}
          >
            {this.isSubtitleActive ? `${this.currentSubtitleLang?.toUpperCase()}` : null}
          </calcite-button>
          <calcite-dropdown-group selection-mode="single">
            <calcite-dropdown-item
              active={!this.isSubtitleActive}
              onCalciteDropdownItemSelect={(e) => this.handleSubtitleSelection(e)}
            >
              Off
            </calcite-dropdown-item>
            {this.subtitleDropdownItems}
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    );

    const subtitleContainer = (
      <div
        class={`calcite-video-subtitle-container ${
          this.isSubtitleActive ? "calcite-video-subtitle-container-active" : ""
        }`}
        ref={(el) => (this.subtitleContainerEl = el)}
      />
    );

    const progress = !this.disableScrubbing ? (
      <div class="calcite-video-scrubber-wrapper">
        <calcite-slider
          class="calcite-video-scrubber"
          onCalciteSliderUpdate={(e) => this.updatePlaybackPosition(e)}
          onKeyDown={(e) => this.handleScrubberKeyDown(e)}
          ref={(el) => (this.scrubberEl = el)}
          theme={this.theme}
        />
      </div>
    ) : (
      // progress should always be ltr so explicitly set dir
      <calcite-progress dir="ltr" ref={(el) => (this.progressEl = el)} theme={this.theme} />
    );

    const time = (
      <div class="calcite-video-time">
        <span>{this.formatTime(this.currentTime)}</span>
        <span>&nbsp;/&nbsp;{this.formatTime(this.videoDuration)}</span>
      </div>
    );

    return (
      <Host dir={dir} tabIndex={0}>
        <calcite-loader active={this.isLoading} type="indeterminate" />
        <div
          class={`calcite-video-wrapper ${this.isFullscreen ? " calcite-video-fullscreen" : ""}`}
        >
          <video
            // ensure video is muted if autoplay is requested
            autoplay={this.autoplay}
            controls={false}
            height={this.height}
            loop={this.loop}
            muted={this.muted || this.autoplay}
            onCanPlay={() => this.videoLoadFinish()}
            onEnded={() => this.handleVideoUpdate()}
            onLoadStart={() => this.videoLoadStart()}
            onLoadedMetaData={() => this.getVideoInfo()}
            onTimeUpdate={() => this.handleVideoUpdate()}
            preload={this.preload}
            ref={(el) => (this.videoEl = el)}
            width={this.width}
          >
            <slot />
          </video>
          {subtitleContainer}
        </div>
        {!this.disableControls ? (
          <div class="calcite-video-footer">
            {!this.disableProgress ? progress : null}
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
  @Listen("calciteVideoPlay", { target: "window" }) videoPlayListener(e: CustomEvent): void {
    if (e.target !== this.el) {
      this.pauseVideo();
    }
  }

  @Listen("click") clickListener(event: MouseEvent): void {
    if (!this.isLoading && !this.playOnHover && event.target === this.videoEl) {
      this.toggleVideo();
    }
  }

  @Listen("mouseenter") mouseEnterListener(): MouseEvent {
    if (!this.isLoading && this.playOnHover && document.activeElement !== this.el) this.playVideo();
  }

  @Listen("mouseleave") mouseLeaveListener(): MouseEvent {
    if (!this.isLoading && this.playOnHover && document.activeElement !== this.el)
      this.pauseVideo();
  }

  @Listen("focus") focusInListener(): FocusEvent {
    if (!this.isLoading && this.playOnHover) return this.playVideo();
  }

  @Listen("blur") focusOutListener(): FocusEvent {
    if (!this.isLoading && this.playOnHover) return this.pauseVideo();
  }

  @Listen("keydown") keydownListener(e: KeyboardEvent): void {
    if (!this.isLoading && !this.playOnHover && e.composedPath()[0] === this.el) {
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

  /** the container element for custom subtitle placement */
  private subtitleContainerEl?: HTMLElement;

  /** the unformatted video duration */
  private videoDuration?: number = 0;

  /** volume level */
  @State() volumeLevel?: number = 0.5;

  /** is the video playing in fullscreen */
  @State() isFullscreen?: boolean;

  /** the unformatted current time value of the video player */
  @State() currentTime?: number = 0;

  /** show loading until sufficiently loaded */
  @State() isLoading: boolean;

  /** is the video playing */
  @State() isPlaying?: boolean;

  /** is the video complete */
  @State() isComplete?: boolean;

  /** does the video have an audio track */
  // todo determine if there is an audio track, if not, hide volume control
  @State() hasAudio?: boolean = true;

  /** does the video have availble subtitle */
  @State() hasSubtitle?: boolean;

  /** is a subtitle currently active */
  @State() isSubtitleActive?: boolean;

  /** the videos available subtitles */
  @State() availableSubtitles?: TextTrackList;

  /** the track of the current subtitle */
  @State() currentSubtitleTrack?: TextTrack;

  /** the track cue list of the current subtitle */
  @State() currentSubtitleTrackCue: TextTrackCue;

  /** the language of the current subtitle */
  @State() currentSubtitleLang?: string;

  @State()
  subtitleDropdownItems: HTMLCalciteDropdownItemElement[] = [];

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  videoLoadStart(): void {
    this.isLoading = true;
  }

  videoLoadFinish(): void {
    this.isLoading = false;
    if (this.autoplay) this.toggleVideo();
  }

  getVideoInfo(): void {
    this.videoDuration = this.videoEl?.duration;
    this.availableSubtitles = this.videoEl?.textTracks;
    this.hasSubtitle = this.availableSubtitles?.length > 0;
    this.initializeSubtitles();
  }

  initializeSubtitles(): void {
    if (this.availableSubtitles) {
      // get the default track language and hide all so we can use our own
      const subtitles = Object.values(this.availableSubtitles);
      for (const item of subtitles) {
        if (item.mode === "showing") {
          item.mode = "hidden";
          this.currentSubtitleTrack = item;
          this.currentSubtitleLang = item.language;
        }
      }
      this.getSubtitleDropdownItems();
      this.subtitleContainerEl.innerHTML = (this.currentSubtitleTrack?.cues[0] as any)?.text;
    }
  }

  getSubtitleDropdownItems(): void {
    // create the list of abailable subtitles for the dropdown
    if (this.availableSubtitles) {
      const items = [];
      Object.values(this.availableSubtitles).map((item) => {
        const node = (
          <calcite-dropdown-item
            active={this.isSubtitleActive && this.currentSubtitleLang === item.language}
            data-language={item.language}
            onCalciteDropdownItemSelect={(e) => this.handleSubtitleSelection(e)}
          >
            {item.language.toUpperCase()}
          </calcite-dropdown-item>
        );
        items.push(node);
      });
      this.subtitleDropdownItems = [...Array.from(new Set(items))];
    } else return;
  }

  handleSubtitleToggle(): void {
    // if one language, toggle and don't show a menu
    if (this.availableSubtitles) {
      for (const item of Object.values(this.availableSubtitles)) {
        if (item.language === this.currentSubtitleLang) {
          this.isSubtitleActive = !this.isSubtitleActive;
        }
      }
      this.handleSubtitleUpdate();
    } else return;
  }

  handleSubtitleSelection(e: any): void {
    // if more than one language, show a menu and toggle on selection
    // if user selects "off" - disable all
    const requestedLang = e.target.dataset.language;
    if (this.availableSubtitles) {
      for (const item of Object.values(this.availableSubtitles)) {
        item.mode = "hidden";
        if (requestedLang) {
          this.currentSubtitleLang = requestedLang;
          this.isSubtitleActive = true;
          if (this.currentSubtitleLang === item.language) this.currentSubtitleTrack = item;
        } else {
          this.isSubtitleActive = false;
        }
      }
      this.handleSubtitleUpdate();
    } else return;
  }

  toggleVideo(): void {
    if (this.isComplete || !this.isPlaying) {
      this.playVideo();
    } else {
      this.pauseVideo();
    }
  }

  playVideo(): void {
    this.videoEl?.play();
    this.isPlaying = true;
    this.calciteVideoPlay.emit();
  }

  pauseVideo(): void {
    this.videoEl?.pause();
    this.isPlaying = false;
    this.calciteVideoPause.emit();
  }

  toggleMuted(): void {
    this.muted = !this.muted;
  }

  updateVolumeLevel(e: any): void {
    this.volumeLevel = e.target.value;
    this.videoEl.volume = this.volumeLevel as number;
    this.muted = this.volumeLevel === 0;
  }

  handleScrubberKeyDown(e: any): void {
    const key = getKey(e.key);
    if (key === " " || key === "Enter") {
      e.preventDefault();
      this.toggleVideo();
    }
  }

  handleVolumeSliderKeyDown(e: any): void {
    const key = getKey(e.key);
    if (key === " " || key === "Enter") {
      e.preventDefault();
      this.toggleMuted();
    }
  }

  updatePlaybackPosition(e: any): void {
    const requestedTime = (e.target.value / 100) * (this.videoDuration as number);
    this.currentTime = requestedTime;
    this.videoEl.currentTime = this.currentTime as number;
  }

  toggleFullscreen(): void {
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
  }

  formatTime(currentTime: number): any {
    // todo fix the flash of :60 seconds
    if (currentTime) {
      const hours = Math.floor(currentTime / 3600);
      const minutes = Math.floor((currentTime % 3600) / 60);
      const seconds = Math.round(currentTime % 60);
      return [
        hours,
        minutes > 9 ? minutes : hours ? `0${minutes}` : minutes || `0`,
        seconds > 9 ? seconds : `0${seconds}`
      ]
        .filter(Boolean)
        .join(":");
    } else return `0:00`;
  }

  handleVideoUpdate(): void {
    this.currentSubtitleTrackCue = this.currentSubtitleTrack?.activeCues[0];
    if (this.isSubtitleActive && (this.currentSubtitleTrackCue as any)?.text !== undefined) {
      this.subtitleContainerEl.innerHTML = (this.currentSubtitleTrackCue as any)?.text;
      this.handleSubtitleUpdate();
    }

    if (!this.disableProgress) {
      this.isComplete = this.currentTime === this.videoDuration;
      this.currentTime = this.videoEl?.currentTime;
      if (!this.disableScrubbing) {
        const position = ((this.currentTime as number) / (this.videoDuration as number)) * 100;
        this.scrubberEl?.setAttribute("value", `${position}`);
      } else {
        const position = (this.currentTime as number) / (this.videoDuration as number);
        this.progressEl?.setAttribute("value", `${position}`);
      }
      if (this.isComplete) this.calciteVideoComplete.emit();
    }
  }

  handleSubtitleUpdate(): void {
    // replace current lang with the active cue if change occurs mid-cue
    if ((this.currentSubtitleTrackCue as any)?.text !== undefined)
      this.subtitleContainerEl.innerHTML = (this.currentSubtitleTrackCue as any)?.text;
    // and update on any change
    this.currentSubtitleTrack.oncuechange = () => {
      if ((this.currentSubtitleTrackCue as any)?.text !== undefined)
        this.subtitleContainerEl.innerHTML = (this.currentSubtitleTrackCue as any)?.text;
    };
  }
}
