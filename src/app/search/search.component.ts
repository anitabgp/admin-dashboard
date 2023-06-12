 
import { Component, OnInit, ViewChild,ViewEncapsulation,OnDestroy} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

  @Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
  })
 
  export class SearchComponent implements OnInit,OnDestroy{
  displayedColumns: string[] = ['select', 'name', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  userFilters: any[] = [];
  filterValue: any;
  data: any[] = [];
  subscription: any;
  mobileQuery: any;
  private mobileQueryListener: () => void;

  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;

  constructor(private http: HttpClient, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 400px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onKeydown(event: any, row: any, ele: any) {
    if (event.key === "Enter") {
      row['edit'] = false;
      row[ele] = event.target.value;
      this.dataSource = new MatTableDataSource(this.data);
      this.data = this.data.filter(data => data.id !== row.id);
    }
  }
   ngOnDestroy(): void {
    
  }
}