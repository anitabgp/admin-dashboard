import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeTableComponent } from './employee-table.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [EmployeeTableComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[EmployeeTableComponent]
})
export class EmployeeTableModule { }
