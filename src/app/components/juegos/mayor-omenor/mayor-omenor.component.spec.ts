import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorOMenorComponent } from './mayor-omenor.component';

describe('MayorOMenorComponent', () => {
  let component: MayorOMenorComponent;
  let fixture: ComponentFixture<MayorOMenorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MayorOMenorComponent]
    });
    fixture = TestBed.createComponent(MayorOMenorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
