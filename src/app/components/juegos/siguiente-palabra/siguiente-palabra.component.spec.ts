import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiguientePalabraComponent } from './siguiente-palabra.component';

describe('SiguientePalabraComponent', () => {
  let component: SiguientePalabraComponent;
  let fixture: ComponentFixture<SiguientePalabraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiguientePalabraComponent]
    });
    fixture = TestBed.createComponent(SiguientePalabraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
