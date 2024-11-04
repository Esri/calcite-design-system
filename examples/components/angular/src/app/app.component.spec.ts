import {
  ComponentFixtureAutoDetect,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { defineCustomElements } from '@esri/calcite-components/dist/loader';

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
      imports: [AppComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    defineCustomElements(window, {
      resourcesUrl: './assets',
    });
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have 'calcite-components-angular-example' as title`, () => {
    expect(component.title).toEqual('calcite-components-angular-example');
  });

  it('should render calcite-loader with label', () => {
    const loaderElement: HTMLCalciteLoaderElement =
      fixture.nativeElement.querySelector('calcite-loader')!;
    expect(loaderElement?.label).toBe('Loading...');
  });
});
