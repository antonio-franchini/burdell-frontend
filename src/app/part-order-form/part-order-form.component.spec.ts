import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartOrderFormComponent } from './part-order-form.component';

describe('PartOrderFormComponent', () => {
  let component: PartOrderFormComponent;
  let fixture: ComponentFixture<PartOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartOrderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
