import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleViewTableComponent } from './ele-view-table.component';

describe('EleViewTableComponent', () => {
  let component: EleViewTableComponent;
  let fixture: ComponentFixture<EleViewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EleViewTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EleViewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
