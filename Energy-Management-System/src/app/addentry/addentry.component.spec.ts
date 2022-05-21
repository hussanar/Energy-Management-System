import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddentryComponent } from './addentry.component';

describe('AddentryComponent', () => {
  let component: AddentryComponent;
  let fixture: ComponentFixture<AddentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
