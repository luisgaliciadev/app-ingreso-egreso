import { TestBed } from '@angular/core/testing';

import { IngresoEgresoService } from './ingreso-egreso.service';

describe('IngresoEgresoService', () => {
  let service: IngresoEgresoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresoEgresoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
