import { Component, Element, h, Prop } from '@stencil/core';
import ConfigInterface from '../../interfaces/ConfigInterface';

@Component({
  tag: 'calcite-config'
})

export class CalciteConfig {
  @Element() el: HTMLElement;
  @Prop({ reflect: true }) theme: "light" | "dark" = "light";

  connectedCallback() {
    // prop validations
    let themes = ["dark", "light"];
    if (!themes.includes(this.theme)) this.theme = "light";
  }

  componentWillUpdate() {
    let themes = ["dark", "light"];
    if (!themes.includes(this.theme)) this.theme = "light";
    console.log(this.theme)
  }

  render() {
    const configState = {
      globalTheme: this.theme
    };

    return (
        <ConfigInterface.Provider state={configState} />
    );
  }
}
