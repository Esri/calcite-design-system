import { TestBed } from '@angular/core/testing';
import { CalciteComponentsModule } from '@esri/calcite-components-angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [CalciteComponentsModule],
      declarations: [AppComponent],
    }).compileComponents(),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'calcite-components-angular-example'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('calcite-components-angular-example');
  });

  it('should render calcite-loader with label', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('calcite-loader')?.label).toBe('Loading...');
  });
});
