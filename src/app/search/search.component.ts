
import { Component, OnInit, ViewEncapsulation, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SearchComponent {

  @Output() newItemEvent = new EventEmitter<string>();

  constructor() {

  }

  onSearchChange(event: Event) {
    debugger
    console.log("here")
    const filterValue = (event.target as HTMLInputElement).value;
    this.newItemEvent.emit(filterValue.trim().toLowerCase());
  }

}
