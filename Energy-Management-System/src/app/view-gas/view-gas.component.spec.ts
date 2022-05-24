import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGasComponent } from './view-gas.component';

describe('ViewGasComponent', () => {
  let component: ViewGasComponent;
  let fixture: ComponentFixture<ViewGasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
