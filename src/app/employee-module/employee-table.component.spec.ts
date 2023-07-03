import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpployeeTableComponent } from './employee-table.component';

describe('EmpployeeTableComponent', () => {
  let component: EmpployeeTableComponent;
  let fixture: ComponentFixture<EmpployeeTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpployeeTableComponent]
    });
    fixture = TestBed.createComponent(EmpployeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
