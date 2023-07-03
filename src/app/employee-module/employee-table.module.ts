import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeTableComponent } from './employee-table.component';
import { MaterialModule } from '../material/material.module';
import { EmployeeService } from './service/employee.service';

@NgModule({
  declarations: [EmployeeTableComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[EmployeeTableComponent],
  
  providers: [EmployeeService],
})
export class EmployeeTableModule { }
