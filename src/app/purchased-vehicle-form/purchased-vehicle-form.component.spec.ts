import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedVehicleFormComponent } from './purchased-vehicle-form.component';

describe('PurchasedVehicleFormComponent', () => {
  let component: PurchasedVehicleFormComponent;
  let fixture: ComponentFixture<PurchasedVehicleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedVehicleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedVehicleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
