import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterViewTableComponent } from './water-view-table.component';

describe('WaterViewTableComponent', () => {
  let component: WaterViewTableComponent;
  let fixture: ComponentFixture<WaterViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterViewTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
