import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
  State,
  VNode,
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { TEXT } from "./video.resources";
import { Scale } from "../interfaces";

@Component({
  tag: "calcite-video",
  styleUrl: "video.scss",
  shadow: false,
})
export class CalciteVideo {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  // todo buffer length indicator
  // quality hd etc toggle

  /** specify the scale of the video player, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** preload type */
  @Prop({ reflect: true }) preload: "auto" | "none" | "preload" = "auto";

  /** loop the media */
  @Prop({ reflect: true }) loop?: boolean;

  /** autoplay the media */
  @Prop({ reflect: true }) autoplay?: boolean;

  /** is the media muted */
  @Prop({ mutable: true, reflect: true }) muted?: boolean;

  /** allow play on hover  */
  @Prop({ reflect: true }) playOnHover?: boolean;

  /** show controls on hover */
  @Prop({ reflect: true }) showControlsOnHover?: boolean;

  /** is fullscreen mode disabled */
  @Prop({ reflect: true }) disableFullscreen?: boolean;

  /** is scrubbing mode disabled */
  @Prop({ reflect: true }) disableScrubbing?: boolean;

  /** disable progress */
  @Prop({ reflect: true }) disableProgress?: boolean;

  /** disable progress */
  @Prop({ reflect: true }) disablePlaybackRate?: boolean;

  /** disable controls */
  @Prop({ reflect: true }) disableControls?: boolean;

  /** disable timestamp */
  @Prop({ reflect: true }) disableTimestamp?: boolean;

  /** a desired height of the video */
  @Prop({ reflect: true }) height?: string;

  /** a desired width of the video */
  @Prop({ reflect: true }) width?: string;

  /** string to override English play text */
  @Prop() intlPlay: string = TEXT.intlPlay;

  /** string to override English pause text */
  @Prop() intlPause: string = TEXT.intlPause;

  /** string to override English restart text */
  @Prop() intlRestart: string = TEXT.intlRestart;

  /** string to override English enter fullscreen text */
  @Prop() intlEnterFullscreen: string = TEXT.intlEnterFullscreen;

  /** string to override English exit fullscreen text */
  @Prop() intlExitFullscreen: string = TEXT.intlExitFullscreen;

  /** string to override English mute text */
  @Prop() intlMute: string = TEXT.intlMute;

  /** string to override English unmute text */
  @Prop() intlUnmute: string = TEXT.intlUnmute;

  /** string to override English subtitles text */
  @Prop() intlSubtitles: string = TEXT.intlSubtitles;

  /** string to override English subtitles text */
  @Prop() intlVolume: string = TEXT.intlVolume;

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

  /**
   * This event is fired when the video begins to play
   */
  @Event() calciteVideoPlay: EventEmitter<any>;

  /**
   * This event is fired when the video is paused
   */
  @Event() calciteVideoPause: EventEmitter<any>;

  /**
   * This event is fired when the video is complete
   */
  @Event() calciteVideoComplete: EventEmitter<any>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  render(): VNode {
    const dir = getElementDir(this.el);

    const playControl = (
      <div class="calcite-video-control-item">
        <calcite-action
          icon={this.isComplete ? "reset" : this.isPlaying ? "pause" : "play"}
          onClick={() => this.toggleVideo()}
          text={
            this.isComplete ? this.intlRestart : this.isPlaying ? this.intlPause : this.intlPlay
          }
        />
      </div>
    );

    const volumeControl = (
      <div class="calcite-video-control-item calcite-video-volume-control-item">
        <calcite-action
          icon={this.muted ? "sound-unavailable" : this.volumeLevel < 0.5 ? "sound-low" : "sound"}
          icon-flip-rtl
          onClick={() => this.toggleMuted()}
          text={!this.muted ? this.intlMute : this.intlUnmute}
        />
        <calcite-slider
          max={1}
          min={0}
          onCalciteSliderInput={(event) => this.updateVolumeLevel(event)}
          onKeyDown={(event) => this.handleVolumeSliderKeyDown(event)}
          step={0.1}
          value={!this.muted ? (this.volumeLevel as number) : 0}
        />
      </div>
    );

    const fullscreenControl = (
      <div class="calcite-video-control-item calcite-video-fullscreen-control-item">
        <calcite-action
          icon={!this.isFullscreen ? "extent" : "full-screen-exit"}
          onClick={() => this.toggleFullscreen()}
          text={!this.isFullscreen ? this.intlEnterFullscreen : this.intlExitFullscreen}
        />
      </div>
    );

    const subtitleControlSingle = (
      <div class="calcite-video-control-item calcite-video-subtitle-control-item">
        <calcite-action
          class={this.isSubtitleActive ? "calcite-video-subtitle-active" : ""}
          icon="speech-bubble"
          icon-flip-rtl
          indicator={this.isSubtitleActive}
          onClick={() => this.handleSubtitleToggle()}
          text={this.isSubtitleActive ? `${this.subLang?.toUpperCase()}` : null}
        />
      </div>
    );

    const subtitleControlMultiple = (
      <div class="calcite-video-control-item calcite-video-subtitle-control-item">
        <calcite-dropdown widthScale="s">
          <calcite-action
            class={this.isSubtitleActive ? "calcite-video-subtitle-active" : ""}
            icon="speech-bubbles"
            icon-flip-rtl
            indicator={this.isSubtitleActive}
            slot="trigger"
            text={this.isSubtitleActive ? `${this.subLang?.toUpperCase()}` : null}
          >
            {this.isSubtitleActive && (
              <calcite-chip appearance="outline" scale="s" value={this.subLang?.toUpperCase()}>
                {this.subLang?.toUpperCase()}
              </calcite-chip>
            )}
          </calcite-action>
          <calcite-dropdown-group selection-mode="single">
            <calcite-dropdown-item
              onCalciteDropdownItemSelect={() => this.handleSubtitleSelection("")}
              selected={!this.isSubtitleActive}
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
        ref={(el) => (this.subContainer = el)}
      />
    );

    const progress = !this.disableScrubbing ? (
      <div class="calcite-video-scrubber-wrapper">
        <calcite-slider
          class="calcite-video-scrubber"
          onCalciteSliderInput={(event) => this.updatePlaybackPosition(event)}
          onKeyDown={(event) => this.handleScrubberKeyDown(event)}
          ref={(el) => (this.scrubberEl = el)}
        />
      </div>
    ) : (
      // progress should always be ltr so explicitly set dir
      <calcite-progress dir="ltr" ref={(el) => (this.progressEl = el)} />
    );

    const time = (
      <div class="calcite-video-time">
        <span>{this.formatTime(this.currentTime)}</span>
        <span>&nbsp;/&nbsp;{this.formatTime(this.duration)}</span>
      </div>
    );

    const playbackRateSelector = (
      <div class="calcite-video-control-item calcite-video-playback-rate-control-item">
        <calcite-dropdown widthScale="s">
          <calcite-action
            icon={
              this.currentPlaybackRate === 0.25
                ? "1-4x"
                : this.currentPlaybackRate === 0.5
                  ? "1-2x"
                  : this.currentPlaybackRate === 1
                    ? "1x"
                    : "2x"
            }
            icon-flip-rtl
            indicator={this.currentPlaybackRate !== 1}
            slot="trigger"
            text={this.isSubtitleActive ? `${this.subLang?.toUpperCase()}` : null}
          />
          <calcite-dropdown-group selection-mode="single">
            <calcite-dropdown-item
              icon-start="1-4x"
              onCalciteDropdownItemSelect={() => this.handlePlaybackRateUpdate(0.25)}
              selected={this.currentPlaybackRate === 0.25}
            >
              Quarter
            </calcite-dropdown-item>
            <calcite-dropdown-item
              icon-start="1-2x"
              onCalciteDropdownItemSelect={() => this.handlePlaybackRateUpdate(0.5)}
              selected={this.currentPlaybackRate === 0.5}
            >
              Half
            </calcite-dropdown-item>
            <calcite-dropdown-item
              icon-start="1x"
              onCalciteDropdownItemSelect={() => this.handlePlaybackRateUpdate(1)}
              selected={this.currentPlaybackRate === 1}
            >
              Default
            </calcite-dropdown-item>
            <calcite-dropdown-item
              icon-start="2x"
              onCalciteDropdownItemSelect={() => this.handlePlaybackRateUpdate(2)}
              selected={this.currentPlaybackRate === 2}
            >
              Double
            </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      </div>
    );

    return (
      <Host>
        <div
          class={`container ${this.isFullscreen ? " container-fullscreen" : ""}`}
          dir={dir}
          onBlur={() => this.handleBlur()}
          onClick={() => this.handleClick()}
          onFocus={() => this.handleFocus()}
          onKeyDown={(event) => this.handleKeydown(event)}
          onMouseEnter={() => this.handleMouseEnter()}
          onMouseLeave={() => this.handleMouseLeave()}
          tabIndex={0}
        >
          <calcite-loader hidden={!this.isLoading} label="video loading" type="indeterminate" />

          <video
            // ensure video is muted if autoplay is requested
            // not sure if autoplay requires a fake interaction event
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
            width={this.width}
            // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
            ref={(el) => (this.videoEl = el)}
          >
            <slot />
          </video>
          {this.hasSubtitle ? subtitleContainer : null}
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
                {!this.disablePlaybackRate ? playbackRateSelector : null}
                {!this.disableFullscreen ? fullscreenControl : null}
              </div>
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------

  // pause other instances of video on page when another starts
  @Listen("calciteVideoPlay", { target: "window" })
  videoPlayListener(event: CustomEvent): void {
    if (event.target !== this.el) {
      this.pauseVideo();
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
  private subContainer?: HTMLElement;

  /** the unformatted video duration */
  private duration?: number = 0;

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

  /** the videos available subtitles */
  @State() currentPlaybackRate?: number = 1;

  /** the track of the current subtitle */
  @State() subTrack?: TextTrack;

  /** the track cue list of the current subtitle */
  @State() subTrackCue: TextTrackCue;

  /** the language of the current subtitle */
  @State() subLang?: string;

  @State()
  subtitleDropdownItems: HTMLCalciteDropdownItemElement[] = [];

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private handleMouseEnter() {
    return !this.isLoading && this.playOnHover && document.activeElement !== this.el
      ? this.playVideo()
      : undefined;
  }

  private handleMouseLeave() {
    return !this.isLoading && this.playOnHover && document.activeElement !== this.el
      ? this.pauseVideo()
      : undefined;
  }

  private handleClick() {
    if (!this.isLoading && !this.playOnHover && event.target === this.videoEl) {
      this.toggleVideo;
    }
  }

  private handleFocus() {
    if (!this.isLoading && this.playOnHover) {
      return this.playVideo();
    }
  }

  private handleBlur() {
    if (!this.isLoading && this.playOnHover) {
      return this.pauseVideo();
    }
  }

  private handleKeydown(event: KeyboardEvent) {
    if (!this.isLoading && !this.playOnHover && event.composedPath()[0] === this.el) {
      const key = event.key;
      if (key === " " || key === "Enter") {
        event.preventDefault();
        this.toggleVideo;
      }
    }
  }

  videoLoadStart(): void {
    this.isLoading = true;
  }

  videoLoadFinish(): void {
    this.isLoading = false;
    if (this.autoplay) {
      this.toggleVideo();
    }
  }

  getVideoInfo(): void {
    this.duration = this.videoEl?.duration;
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
          this.subTrack = item;
          this.subLang = item.language;
        }
      }
      this.getSubtitleDropdownItems();
      if (this.subContainer) {
        this.subContainer.innerHTML = (this.subTrack?.cues[0] as any)?.text;
      }
    }
  }

  getSubtitleDropdownItems(): void {
    // create the list of available subtitles for the dropdown
    if (this.availableSubtitles) {
      const items = [];
      Object.values(this.availableSubtitles).map((item) => {
        const node = (
          <calcite-dropdown-item
            onCalciteDropdownItemSelect={() => this.handleSubtitleSelection(item.language)}
            selected={this.isSubtitleActive && this.subLang === item.language}
          >
            {item.language.toUpperCase()}
          </calcite-dropdown-item>
        );
        items.push(node);
      });
      this.subtitleDropdownItems = [...Array.from(new Set(items))];
    } else {
      return;
    }
  }

  handleSubtitleToggle(): void {
    // if one language, toggle and don't show a menu
    if (
      this.availableSubtitles &&
      Object.values(this.availableSubtitles).some((item) => item.language === this.subLang)
    ) {
      this.isSubtitleActive = !this.isSubtitleActive;
      this.handleSubtitleUpdate();
    }
  }

  handleSubtitleSelection(requestedLang: string): void {
    // if more than one language, show a menu and toggle on selection
    // if user selects "off" - disable all
    if (this.availableSubtitles) {
      for (const item of Object.values(this.availableSubtitles)) {
        item.mode = "hidden";
        if (requestedLang) {
          this.subLang = requestedLang;
          this.isSubtitleActive = true;
          if (this.subLang === item.language) {
            this.subTrack = item;
          }
        } else {
          this.isSubtitleActive = false;
        }
      }
      this.handleSubtitleUpdate();
    } else {
      return;
    }
  }

  toggleVideo(): void {
    if (this.isComplete || !this.isPlaying) {
      this.playVideo();
    } else {
      this.pauseVideo();
    }
  }

  playVideo(): any {
    this.videoEl?.play();
    this.isPlaying = true;
    this.calciteVideoPlay.emit();
  }

  pauseVideo(): any {
    this.videoEl?.pause();
    this.isPlaying = false;
    this.calciteVideoPause.emit();
  }

  toggleMuted(): void {
    this.muted = !this.muted;
  }

  updateVolumeLevel(event: any): void {
    this.volumeLevel = event.target.value;
    this.videoEl.volume = this.volumeLevel as number;
    this.muted = this.volumeLevel === 0;
  }

  handleScrubberKeyDown(event: any): void {
    const key = event.key;
    if (key === " " || key === "Enter") {
      event.preventDefault();
      this.toggleVideo();
    }
  }

  handleVolumeSliderKeyDown(event: any): void {
    const key = event.key;
    if (key === " " || key === "Enter") {
      event.preventDefault();
      this.toggleMuted();
    }
  }

  updatePlaybackPosition(event: any): void {
    const requestedTime = (event.target.value / 100) * (this.duration as number);
    this.currentTime = requestedTime;
    this.videoEl.currentTime = this.currentTime as number;
  }

  toggleFullscreen(): void {
    // todo a better way of doing this w/o browser speciic items
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

  handlePlaybackRateUpdate(rate: number): any {
    this.videoEl.playbackRate = rate;
    this.currentPlaybackRate = rate;
  }

  formatTime(currentTime: number): any {
    // this is probably wrong
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
    } else {
      return `0:00`;
    }
  }

  handleVideoUpdate(): void {
    this.subTrackCue = this.subTrack?.activeCues[0];
    if (this.isSubtitleActive && (this.subTrackCue as any)?.text !== undefined) {
      if (this.subContainer) {
        this.subContainer.innerHTML = (this.subTrackCue as any)?.text;
      }
      this.handleSubtitleUpdate();
    }

    if (!this.disableProgress) {
      this.isComplete = this.currentTime === this.duration;
      this.currentTime = this.videoEl?.currentTime;
      if (!this.disableScrubbing) {
        const position = ((this.currentTime as number) / (this.duration as number)) * 100;
        this.scrubberEl?.setAttribute("value", `${position}`);
      } else {
        const position = (this.currentTime as number) / (this.duration as number);
        this.progressEl?.setAttribute("value", `${position}`);
      }
      if (this.isComplete) {
        this.calciteVideoComplete.emit();
      }
    }
  }

  handleSubtitleUpdate(): void {
    // replace current lang with the active cue if change occurs mid-cue
    if ((this.subTrackCue as any)?.text !== undefined) {
      if (this.subContainer) {
        this.subContainer.innerHTML = (this.subTrackCue as any)?.text;
      }
    }
    // and update on any change
    this.subTrack.oncuechange = () => {
      if ((this.subTrackCue as any)?.text !== undefined) {
        if (this.subContainer) {
          this.subContainer.innerHTML = (this.subTrackCue as any)?.text;
        }
      }
    };
  }
}
