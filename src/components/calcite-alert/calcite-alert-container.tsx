import { Component, Element, Event, EventEmitter, Listen, Method, Prop, State } from '@stencil/core';
import AlertInterface from '../../interfaces/AlertInterface';

@Component({
  tag: 'calcite-alert-container',
  styleUrl: 'calcite-alert-container.scss',
  shadow: true
})

export class AlertContainer {
  @Element() el: HTMLElement;

  @Prop() id: string = '1';

  @State() currentAlert: string = '';
  @State() isActive: boolean = false;
  @State() queue: string[] = [];

  @Event() alertContainerClose: EventEmitter;
  @Event() alertContainerOpen: EventEmitter;

  componentWillUpdate() {
    this.currentAlert = this.queue.length > 0 ? this.queue[0] : '';
    if (this.queue.length > 0 && !this.queue.includes(this.currentAlert)) {
      this.queue.push(this.currentAlert)
    }
  }

  @Method() async open(requestedAlert) {
    if (!this.queue.includes(requestedAlert)) {
      this.isActive = true;
      this.currentAlert = requestedAlert;
      this.queue.push(requestedAlert)
      this.alertContainerOpen.emit({id: this.id, currentAlert: this.currentAlert});
    }
  }

  @Listen('alertClose') updateQueue(event: CustomEvent) {
    this.isActive = this.queue.length > 0 ? true : false;
    this.queue = this.queue.includes(event.detail) ? this.queue.filter(e => e !== event.detail) : this.queue;
    if (this.queue.length < 1) {
      this.alertContainerClose.emit({id: this.id, currentAlert: this.currentAlert});
    }
  }

  hostData() {
    return {
      'is-active': !!this.isActive
    }
  }

  render() {
    const alertState = {
      currentAlert: this.currentAlert,
      queueLength: this.queue.length >= 2 ? this.queue.length - 1 : 0
    };

    return [
      <div class="alert-container">
        <AlertInterface.Provider state={alertState}>
          <slot />
        </AlertInterface.Provider>
      </div>
    ];
  }
}
