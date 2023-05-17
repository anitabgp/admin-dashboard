
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';






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
  filterDictionary: any;
  subscription: any;
  data: any[] = [];
  @ViewChild(MatPaginator) paginator: any;

  constructor(private http: HttpClient) { }

  /** Whether the number of selected elements matches the total number of rows. */

  ngOnInit() {
    this.userFilters.push({ names: 'name', value: 'role', emails: 'email' });
    this.subscription = this.http.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json").subscribe({
      next: (data) => {
        this.data = JSON.parse(JSON.stringify(data));
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;

      },
      error: (e) => console.error(e),
      complete: () => {
        console.log(this.data);
      }
    }
    )
  }

  ngAfterViewInit() {
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }


  deletebut() {
    window.alert("delbutton");
  }
  editbut() {
    window.alert("editbutton");
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(): string {
    return "area-label";
  }

  checkboxLabel1(row: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();

    }
  }
}
