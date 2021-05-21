import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoEgresoComponent } from './ingreso-egreso.component';

describe('IngresoEgresoComponent', () => {
  let component: IngresoEgresoComponent;
  let fixture: ComponentFixture<IngresoEgresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoEgresoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoEgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
