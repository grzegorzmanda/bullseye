import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BullseyeComponent } from './bullseye.component';

describe('BullseyeComponent', () => {
  let component: BullseyeComponent;
  let fixture: ComponentFixture<BullseyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BullseyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BullseyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
