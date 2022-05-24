import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewableViewComponent } from './renewable-view.component';

describe('RenewableViewComponent', () => {
  let component: RenewableViewComponent;
  let fixture: ComponentFixture<RenewableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewableViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
