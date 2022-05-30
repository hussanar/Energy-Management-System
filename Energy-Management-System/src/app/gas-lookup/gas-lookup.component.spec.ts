import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasLookupComponent } from './gas-lookup.component';

describe('GasLookupComponent', () => {
  let component: GasLookupComponent;
  let fixture: ComponentFixture<GasLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
