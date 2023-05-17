
import { Component ,OnInit,ViewChild,OnDestroy} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {DataSource, SelectionModel} from '@angular/cdk/collections';
import { MatSort,Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';


export interface PeriodicElement {
  position:number;
  name: string;
  email: string;
  role: string;
  actions:any;
  
  }
   
  export interface userFilter {
    names:string;
    value:string;
   emails:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
];

  // {position: 1 , name: 'Aaron Miles', email: 'aaron@geektrust.in', role: 'Member',actions:''},
  // {position: 2 , name: 'Aishwarya Naik', email: 'aishwarya@geektrust.in', role:'Member',actions:''},
  // {position: 3, name: 'Arvind kumar', email: 'arvind@geektrust.in', role: 'Admin',actions:''},
  // {position: 4 ,name: 'Catrina Binotoo', email: 'catrina@geektrust.in', role: 'Member',actions:''},
  // {position: 5, name: 'chetan kumar', email: 'chetan@geektrust.in', role: 'Member',actions:''},
  // {position: 6, name: 'Jim Mc Clain', email: 'jim@geektrust.in', role: 'Member',actions:''},
  // {position: 7, name: 'Mahavir singh', email: 'mahavir@geektrust.in', role: 'Member',actions:''},
  // {position: 8, name: 'Rahul Jain', email: 'rahul@geektrust.in', role: 'Member',actions:''},
  // {position: 9 ,name: 'Rizan Khan', email: 'rizan@geektrust.in', role: 'Member',actions:''},
  // {position: 10, name: 'Sarah Potter', email: 'sarah@geektrust.in', role: 'Member',actions:''}
  


  @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
   })
  
   export class AppComponent implements OnInit,OnDestroy{
   
    title = 'admin';
   displayedColumns: string[] = ['select',  'name', 'email', 'role', 'actions'];
   dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    
    selection = new SelectionModel<PeriodicElement>(true, []);
    userFilters: userFilter[]=[];
     filterDictionary= new Map<string,string>();
    subscription: any;
    data:any;
     constructor(private http: HttpClient) {
      }
     ngOnDestroy(): void {
       if (this.subscription) {
         this.subscription.unsubscribe();

    }
  }
  
  
  /** Whether the number of selected elements matches the total number of rows. */
  
  ngOnInit() {
    this.userFilters.push({names:'name',value:'role',emails:'email'});
    this.subscription = this.http.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json").subscribe({
      next: (data) => this.data = data,
      error: (e) => console.error(e),
      complete: () => {
        console.log(this.data);
        
             }
    }
    )
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  ngAfterViewInit(): void {

  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
  
 
 deletebut(){
   window.alert("delbutton");
 }
 editbut(){
   window.alert("editbutton");
 }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?:): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
