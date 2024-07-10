import { Component, OnInit } from '@angular/core';
import { HttpCommonService } from '../../Common/http-common.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AGGridHelper } from '../../Common/AGGridHelper';
import { VMailLifecycleDto } from 'src/app/Models/VMailLifecycleDto';
import { VActivityHistoryDto } from 'src/app/Models/VActivityHistoryDto';
import { EmailOptimizedDto } from 'src/app/Models/EmailOptimizedDto';
import { MailHistoryReportDto, MailTaskReportDto } from 'src/app/Models/MailReviewReportDto';
import { MailTasksManualFormDto } from 'src/app/Models/MailTasksManualFormDto';

@Component({
  selector: 'app-report-mail-history',
  templateUrl: './report-mail-history.component.html',
  styleUrls: ['./report-mail-history.component.css']
})
export class ReportMailHistoryComponent implements OnInit {

  mailSystemId: number = 0;
  searchBy = 'mail'
  search: string = "";
  oEmailOptimizedDto = new EmailOptimizedDto();

  public oVMailLifecycleDtoList: VMailLifecycleDto[] = []
  public oVActivityHistoryDtoList: VActivityHistoryDto[] = []


  oMailHistoryReportDto = new MailHistoryReportDto();
  oMailHistoryReportDto1 = new MailHistoryReportDto();
  oMailTaskReportDto = new MailTaskReportDto();


  public DeafultCol = AGGridHelper.DeafultCol;
  private task1GridApi!: GridApi;
  private review1GridApi!: GridApi;
  private review2GridApi!: GridApi;
  private emailGridApi!: GridApi;


  oMailTasksManualFormDto= new MailTasksManualFormDto();


  constructor(private httpServices: HttpCommonService) { }


  ngOnInit(): void {

  }


  colDefs: any[] = [
    { field: "mapReviewName", headerName: 'Name' },
    { field: "mapReviewDetails", headerName: 'Description' },
    { field: "mapReviewNote", headerName: 'Note' },
  ];

  colDefstask: any[] = [
    { field: "mailTaskName", headerName: 'Name' },
    { field: "mailTaskDescription", headerName: 'Description' },
    { field: "mailTaskNote", headerName: 'Note' },
  ];
  colDefsEmail: any[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'SL'},
    { field: "mailUserName", headerName: 'Email' },
    { field: 'Details', headerName: 'Details', resizable: true, cellRenderer: this.detailToGrid.bind(this) },
  ];


  detailToGrid(params: any) {
    const eDiv = document.createElement('div');

    eDiv.innerHTML = ' <button class="btn btn-success p-0 px-1"><i class="fa-solid fa-eye" aria-hidden="true"></i> Detail</button>'
    eDiv.addEventListener('click', () => {
      this.mailSystemId = params.data.mailSystemId;
      this.GetMailHistory();
      this.GetMailLifecycleHistory();
      this.GetMailActivityHistory();
    });
    return eDiv;
  }

  openNewWindow(url: string): void {
    window.open(url, '_blank');
  }

  Map2(){

    this.review2GridApi.setRowData([]);
    this.review2GridApi.setRowData(this.oMailHistoryReportDto1.mailReviews);
    this.review2GridApi.sizeColumnsToFit();
  }
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


  Review2GridReady(event: GridReadyEvent) {
    this.review2GridApi = event.api;
    this.review2GridApi.sizeColumnsToFit();
    this.review2GridApi.setRowData([]);
  }
  emailGridReady(event: GridReadyEvent) {
    this.emailGridApi = event.api;
    this.emailGridApi.sizeColumnsToFit();
    this.emailGridApi.setRowData([]);
  }

  GetMailHistory() {
    this.httpServices.Get("/EmailReport/GetMailHistory/" + this.mailSystemId).subscribe(
      (res: any) => {
        if(res.length>0) {
          this.oMailHistoryReportDto = res[0];
          this.oMailHistoryReportDto1 = res[1];
          this.review1GridApi.setRowData(this.oMailHistoryReportDto.mailReviews);
          this.review1GridApi.sizeColumnsToFit();
          this.review2GridApi.setRowData(this.oMailHistoryReportDto1.mailReviews);
          this.review2GridApi.sizeColumnsToFit();
        }else{
          this.oMailHistoryReportDto = new MailHistoryReportDto(); 
          this.oMailHistoryReportDto1 =new MailHistoryReportDto();
          this.review1GridApi.setRowData([]);
          this.review1GridApi.sizeColumnsToFit();
          this.review2GridApi.setRowData([]);
          this.review2GridApi.sizeColumnsToFit();
        }

      },
      (err: any) => {
        console.log(err);
      }
    )
  }
  GetMailTasks() {
    this.httpServices.Get("/EmailReport/GetMailTasks/" + this.mailSystemId).subscribe(
      (res: any) => {
        this.task1GridApi.setRowData(res);
        this.task1GridApi.sizeColumnsToFit();
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



  GetMailBySearch() {
    this.httpServices.Get("/EmailReport/GetMailBySearch/" + this.searchBy + "?search=" + this.search, true).subscribe(
      (res: any) => {

  res.forEach((element:any) => {
    element.mailUserName=element.mailUserName+ " | "+element.mailSystemId
  });
        this.emailGridApi.setRowData(res);
      },
      (err: any) => {
        console.log(err);
      }
    )
  }


}
