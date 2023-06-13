 
import { Component, OnInit,ViewEncapsulation,ViewChild} from '@angular/core';
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
 
  export class SearchComponent implements OnInit{
  displayedColumns: string[] = ['select', 'name', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);
  userFilters: any[] = [];
  filterValue: any;
  data: any[] = [];
  subscription: any;
  filterDictionary= new Map<string,string>();
  dataSourceFilters = new MatTableDataSource(this.data);

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
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
        
      }
      
    }
