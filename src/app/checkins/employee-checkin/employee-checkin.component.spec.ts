import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCheckinComponent } from './employee-checkin.component';

describe('EmployeeCheckinComponent', () => {
  let component: EmployeeCheckinComponent;
  let fixture: ComponentFixture<EmployeeCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
