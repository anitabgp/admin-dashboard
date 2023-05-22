
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgModule } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'admin';
  displayedColumns: string[] = ['select', 'name', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  userFilters: any[] = [];
  filterValue: any;
  subscription: any;
  status: any;
  Observable: any;
  data: any[] = [];
  currentSelectedData:any[] = [];
  rowClicked:any;
    
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;
  constructor(private http: HttpClient) {
    
   }

  /** Whether the number of selected elements matches the total number of rows. */

  ngOnInit() {
    this.userFilters.push({ names: 'name', value: 'role', emails: 'email' });
    
    this.subscription = this.http.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json").subscribe({
      next: (data) => {
        this.data = JSON.parse(JSON.stringify(data));
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
            
      },
      error: (e) => console.error(e),
      complete: () => {
        console.log(this.data);
      }
       }
      )
     }
    
  
    changeTableRowColor(row: any) { 
      if(this.rowClicked === row) this.rowClicked = -1;
      else this.rowClicked = row;
    }

     toggle($event:any, row:any){
      $event ? this.selection.toggle(row) : null
     }

      ngAfterViewInit() {
       }

      isCurrentPageSelected() {
    
    const numSelected= this.selection.selected.length;
    const numRows = this.paginator.pageSize;
    return this.currentSelectedData[0] === this.data[this.paginator.pageIndex*this.paginator.pageSize] && numSelected === numRows;
       }
  

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isCurrentPageSelected()) {
      this.selection.clear();
      return;
    }
   // this.paginator.pageIndex*
   this.currentSelectedData = this.data.slice((this.paginator.pageIndex*this.paginator.pageSize),
    (this.paginator.pageIndex+1)*this.paginator.pageSize);
    this.selection.select(...this.currentSelectedData);
  }
   
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  deleteSelected() {
    this.selection.selected.forEach(user => {
      let index: number = this.data.findIndex(d => d === user);
      this.data.splice(index, 1)
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.selection.clear();
  }

  handleDelete(row: any) {
    this.data = this.data.filter(data => data.id !== row.id);
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  handleEdit(row: any) {
      row['edit'] = true;
       this.dataSource = new MatTableDataSource(this.data);
          
    }

    

  /** The label for the checkbox on the passed row */
     checkboxLabel(): string {
      return "area-label";
     }

     checkboxLabel1(row: any): string {
      if (!row) {
      return `${this.isCurrentPageSelected() ? 'deselect' : 'select'} 10`;
        }
       return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    
        }

     ngOnDestroy(): void {
       if (this.subscription) {
        this.subscription.unsubscribe();

         }
        }
      }
