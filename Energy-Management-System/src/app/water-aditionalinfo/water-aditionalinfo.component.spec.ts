import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterAditionalinfoComponent } from './water-aditionalinfo.component';

describe('WaterAditionalinfoComponent', () => {
  let component: WaterAditionalinfoComponent;
  let fixture: ComponentFixture<WaterAditionalinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterAditionalinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterAditionalinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
