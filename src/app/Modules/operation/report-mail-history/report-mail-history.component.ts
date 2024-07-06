import { Component, OnInit } from '@angular/core';
import { HttpCommonService } from '../../Common/http-common.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AGGridHelper } from '../../Common/AGGridHelper';

@Component({
  selector: 'app-report-mail-history',
  templateUrl: './report-mail-history.component.html',
  styleUrls: ['./report-mail-history.component.css']
})
export class ReportMailHistoryComponent implements OnInit {

  private asignToAgentGridApi!: GridApi;
  public DeafultCol = AGGridHelper.DeafultCol;
  public totalRecord = 0;
  public paginationPageSize = 20;

constructor(private httpServices: HttpCommonService){}


  ngOnInit(): void {
   
  }





Get_mail_history(){

}

public colDefs: ColDef[] = [
  { field: 'mailUploadedByFullName', headerName: 'Id' },
  { field: 'mailUploadedByUniqueCode', headerName: 'Assinged' },
  { field: 'sourceName', headerName: 'Project' },
  { field: 'mailBatch', headerName: 'Priority' },
  { field: 'mailUserName', headerName: 'Budget' },
];

onGridReadyAsignToAgent(params: GridReadyEvent) {
  params.api.sizeColumnsToFit();
  this.asignToAgentGridApi = params.api;
  this.asignToAgentGridApi.setRowData([]);
}

onSelectionChanged(event: GridReadyEvent) {
  const selectedRows = AGGridHelper.GetSelectedRows(this.asignToAgentGridApi);
  this.totalRecord=selectedRows.length;
}




}
