import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';
import { AppComponent } from './app.component';

@NgModule({
  imports: [AppComponent, BrowserModule, CalciteComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
