import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectrictyComponent } from './electricty.component';

describe('ElectrictyComponent', () => {
  let component: ElectrictyComponent;
  let fixture: ComponentFixture<ElectrictyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectrictyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectrictyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
