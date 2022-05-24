import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewElectrictyComponent } from './view-electricty.component';

describe('ViewElectrictyComponent', () => {
  let component: ViewElectrictyComponent;
  let fixture: ComponentFixture<ViewElectrictyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewElectrictyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewElectrictyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
