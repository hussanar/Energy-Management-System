import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewableViewTableComponent } from './renewable-view-table.component';

describe('RenewableViewTableComponent', () => {
  let component: RenewableViewTableComponent;
  let fixture: ComponentFixture<RenewableViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewableViewTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewableViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
