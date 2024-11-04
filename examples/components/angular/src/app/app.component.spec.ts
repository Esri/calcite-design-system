import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  TestBed,
} from '@angular/core/testing';
import { AppComponent } from './app.component';

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
