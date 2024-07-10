import { Component, OnInit } from '@angular/core';
import { HttpCommonService } from '../../Common/http-common.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AGGridHelper } from '../../Common/AGGridHelper';
import { VMailLifecycleDto } from 'src/app/Models/VMailLifecycleDto';
import { VActivityHistoryDto } from 'src/app/Models/VActivityHistoryDto';
import { EmailOptimizedDto } from 'src/app/Models/EmailOptimizedDto';

@Component({
  selector: 'app-report-mail-history',
  templateUrl: './report-mail-history.component.html',
  styleUrls: ['./report-mail-history.component.css']
})
export class ReportMailHistoryComponent implements OnInit {

  mailSystemId: number = 1;
  searchBy='mail'
  search: string = "1";
  oEmailOptimizedDto = new EmailOptimizedDto();

  public oVMailLifecycleDtoList: VMailLifecycleDto[] = []
  public oVActivityHistoryDtoList: VActivityHistoryDto[] = []


  public DeafultCol = AGGridHelper.DeafultCol;
  private task1GridApi!: GridApi;
  private review1GridApi!: GridApi;
  private task2GridApi!: GridApi;
  private review2GridApi!: GridApi;
  constructor(private httpServices: HttpCommonService) { }


  ngOnInit(): void {
    this.GetMailHistory();
    this.searchEmail()
  }


  colDefs: any[] = [
    { field: "mailUserName", headerName: 'Name' },
    { field: "mailOperationAssignedByFullName", headerName: 'Description' },
    { field: "mailOperationAssignedByFullName", headerName: 'Note' },
  ];

  Task1GridReady(event: GridReadyEvent) {
    this.task1GridApi = event.api;
    this.task1GridApi.sizeColumnsToFit();
    this.task1GridApi.setRowData([]);

  }
  Review1GridReady(event: GridReadyEvent) {
    this.review1GridApi = event.api;
    this.review1GridApi.sizeColumnsToFit();
    this.review1GridApi.setRowData([]);
  }

  Task2GridReady(event: GridReadyEvent) {
    this.task2GridApi = event.api;
    this.task2GridApi.sizeColumnsToFit();
    this.task2GridApi.setRowData([]);
  }
  Review2GridReady(event: GridReadyEvent) {
    this.review2GridApi = event.api;
    this.review2GridApi.sizeColumnsToFit();
    this.review2GridApi.setRowData([]);
  }

  GetMailHistory() {
    this.httpServices.Get("/EmailReport/GetMailHistory/" + this.mailSystemId).subscribe(
      (res: any) => {
        this.oVMailLifecycleDtoList = res;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }


  GetMailLifecycleHistory() {
    this.httpServices.Get("/EmailReport/GetMailLifecycleHistory/" + this.mailSystemId).subscribe(
      (res: any) => {
        this.oVMailLifecycleDtoList = res;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }


  GetMailBySearch() {
    this.httpServices.Post("/EmailReport/GetMailBySearch/"+this.searchBy+"?search=", this.oEmailOptimizedDto).subscribe(
      (res: any) => {
        // this.oVMailLifecycleDtoList = res;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  GetMailActivityHistory() {
    this.httpServices.Get("/EmailReport/GetMailActivityHistory/" + this.mailSystemId).subscribe(
      (res: any) => {
        this.oVActivityHistoryDtoList = res;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  searchEmail() {
    this.GetMailLifecycleHistory();
    this.GetMailActivityHistory();
  }


}
