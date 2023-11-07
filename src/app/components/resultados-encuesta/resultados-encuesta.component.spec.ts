import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosEncuestaComponent } from './resultados-encuesta.component';

describe('ResultadosEncuestaComponent', () => {
  let component: ResultadosEncuestaComponent;
  let fixture: ComponentFixture<ResultadosEncuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultadosEncuestaComponent]
    });
    fixture = TestBed.createComponent(ResultadosEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
