import { Component, inject, OnInit } from '@angular/core';
import { GridApi, ColDef, GridReadyEvent, ValueFormatterParams } from 'ag-grid-community';
import { AGGridHelper } from '../../Common/AGGridHelper';
import { ToastrService } from 'ngx-toastr';
import { HttpCommonService } from '../../Common/http-common.service';
import { DatePipe } from '@angular/common';
import { EmailGridDto } from 'src/app/Models/EmailGridDto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asign-to-agent',
  templateUrl: './asign-to-agent.component.html',
  styleUrls: ['./asign-to-agent.component.css']
})
export class AsignToAgentComponent implements OnInit {


  private asignToAgentGridApi!: GridApi;
  private confirmToAgentGridApi!: GridApi;
  public paginationPageSize = 20;
  public DeafultCol = AGGridHelper.DeafultCol;
  public totalRecord = 0;
  public statusTag :any= "";

  public oEmailGridDto = new EmailGridDto();

  // Column Definitions: Defines the columns to be displayed.
  public colDefs: ColDef[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'SL', width: 100, editable: false, checkboxSelection: true, headerCheckboxSelection: true, },
    { field: 'mailUploadedDate', headerName: 'Updated At',
      cellRenderer: (params: ValueFormatterParams) => {
        return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
      }
     },
    { field: 'mailUploadedByFullName', headerName: 'Uploaded By' },
    { field: 'mailUploadedByUniqueCode', headerName: 'Code' },
    { field: 'sourceName', headerName: 'Source' },
    { field: 'mailBatch', headerName: 'Batch' },
    { field: 'mailUserName', headerName: 'Email' },
    { field: 'lifecycleRelatedName', headerName: 'Status' },
  ];

  public colDefsConfirmAssign: ColDef[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'SL', width: 100, editable: false, checkboxSelection: false, headerCheckboxSelection: false, showDisabledCheckboxes: false, },
    { field: 'userFullName', headerName: 'Full Name' },
    { field: 'countPendingCurrentTask', headerName: 'Pending Current Task' },
    { field: 'countPendingAllTask', headerName: 'Pending All Task' },
  ];
  constructor(private service: HttpCommonService, private toast: ToastrService,
    private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router) {
      this.route.url.subscribe(urlSegments => {
        this.statusTag = urlSegments[urlSegments.length - 1];
    });
  }
  ngOnInit(): void {
    this.GetEmailsByStatusTag( 0, 1, 20);
  }


  onGridReadyAsignToAgent(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    this.asignToAgentGridApi = params.api;
    this.asignToAgentGridApi.setRowData([]);
  }
  onGridReadyConfirmToAgent(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    this.confirmToAgentGridApi = params.api;
    this.confirmToAgentGridApi.setRowData([]);
  }

  onSelectionChanged(event: GridReadyEvent) {
    const selectedRows = AGGridHelper.GetSelectedRows(this.asignToAgentGridApi);
    this.totalRecord=selectedRows.length;
  }

  private GetEmailsByStatusTag( userSystemId: number, pageIndex: number, pageSize: number) {

    this.service.Get('/EmailOperation/GetEmailsByStatusTag/' + this.statusTag + '/' + userSystemId + '/' + pageIndex + '/' + pageSize).subscribe((res: any) => {
      this.oEmailGridDto = res;
      this.asignToAgentGridApi.setRowData(res.emailList)
    },
      (err: any) => {
        console.log(err);
      })

  }

  private GetUsersCurrentWorkloadCount() {
    this.confirmToAgentGridApi.setRowData([]);
    this.service.Get('/EmailOperation/GetUsersCurrentWorkloadCount/' + this.statusTag + '/mail_agent').subscribe((res: any) => {
      this.confirmToAgentGridApi.setRowData(res);
    },
      (err: any) => {
        console.log(err);
      })

  }

  public AssignToAgent() {
    
    // document.getElementById('modalOpen')?.click();
    var data = AGGridHelper.GetSelectedRows(this.asignToAgentGridApi);
    if (data.length == 0) {
      this.toast.warning("Please select an item!!", "Warning", { progressBar: true });
      return;
    }
    this.GetUsersCurrentWorkloadCount();

    document.getElementById("modalOpen")?.click();

  }

  public ConfirmAssign() {

    let selectedAgent= AGGridHelper.GetSelectedRow(this.confirmToAgentGridApi);
    if(selectedAgent==null){
      this.toast.warning("Please select  agent!!", "Warning", { progressBar: true });
      return;
    }
    this.AssignEmailOperation(Number(selectedAgent.userSystemId));

  }

  private AssignEmailOperation(assignedTo: number) {
    
    let payload: number[] = [];
    var getSelectedRow = AGGridHelper.GetSelectedRows(this.asignToAgentGridApi);
    getSelectedRow.forEach((element:any) => {
      payload.push(element.mailSystemId)
    })
    this.service.Post('/EmailOperation/AssignEmailOperation/' + this.statusTag + '/' + assignedTo, payload).subscribe((res: any) => {
      this.toast.success("Agent Email Assign Successfully!!", "success", { progressBar: true });
      document.getElementById("assignToAgentCloseModal")?.click();
      this.GetEmailsByStatusTag( 0, 1, 20);

    },
      (err: any) => {
        console.log(err);
      })

  }


}
