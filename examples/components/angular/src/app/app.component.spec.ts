import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { setAssetPath } from '@esri/calcite-components';
import { AppComponent } from './app.component';

let app: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
      imports: [AppComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    setAssetPath(window.location.href);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have 'calcite-components-angular-example' as title`, () => {
    expect(app.title).toEqual('calcite-components-angular-example');
  });

  it('should render calcite-loader with label', () => {
    const loaderElement: HTMLCalciteLoaderElement =
      fixture.nativeElement.querySelector('calcite-loader')!;

    expect(loaderElement?.label).toBe('Loading...');
  });
});
