import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-slider';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'calcite-components-angular-example';
  sliderValue = 50;

  public isLoading: boolean = true;

  ngOnInit() {
    this.fetch();
  }

  ngOnDestroy(): void {
    this.clearSliderValue();
  }

  async fetch() {
    await new Promise((r) => setTimeout(r, 2000));
    this.isLoading = false;
  }

  onSliderInput(event: Event) {
    const value = (event.target as HTMLCalciteSliderElement).value;
    if (typeof value === 'number') {
      this.sliderValue = value;
    }
  }

  clearSliderValue() {
    this.sliderValue = 0;
  }
}
