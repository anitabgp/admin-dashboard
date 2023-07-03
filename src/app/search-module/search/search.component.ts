
import { Component, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

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
