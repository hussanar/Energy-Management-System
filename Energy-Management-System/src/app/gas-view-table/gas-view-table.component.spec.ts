import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasViewTableComponent } from './gas-view-table.component';

describe('GasViewTableComponent', () => {
  let component: GasViewTableComponent;
  let fixture: ComponentFixture<GasViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GasViewTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GasViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
