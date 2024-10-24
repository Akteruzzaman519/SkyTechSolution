import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, ColDef, ValueFormatterParams, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { EmailGridDto } from 'src/app/Models/EmailGridDto';
import { AGGridHelper } from '../../Common/AGGridHelper';
import { HttpCommonService } from '../../Common/http-common.service';

@Component({
  selector: 'app-layered-routine-check',
  templateUrl: './layered-routine-check.component.html',
  styleUrls: ['./layered-routine-check.component.css']
})
export class LayeredRoutineCheckComponent implements OnInit {


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
    
    { field: 'mailUserName', headerName: 'Email' },
    { field: 'MailLastActionTakenAge', headerName: 'Age' },
    
    { field: 'mailRoutineTaskDate1', headerName: 'Claimed At',
      cellRenderer: (params: ValueFormatterParams) => {
        return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
      }
     },
     { field: 'mailRoutineTaskDate2', headerName: 'Check 1',
      cellRenderer: (params: ValueFormatterParams) => {
        return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
      }
     },
     { field: 'mailRoutineTaskDate3', headerName: 'Check 2',
      cellRenderer: (params: ValueFormatterParams) => {
        return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
      }
     },
     { field: 'mailRoutineTaskDate4', headerName: 'Check 3',
      cellRenderer: (params: ValueFormatterParams) => {
        return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
      }
     },
     { field: 'mailRoutineTaskDate5', headerName: 'Check 4',
      cellRenderer: (params: ValueFormatterParams) => {
        return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
      }
     },
     { field: 'mailRoutineTaskDate6', headerName: 'Check 5',
      cellRenderer: (params: ValueFormatterParams) => {
        return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
      }
     },
     { field: 'mailRoutineTaskDate7', headerName: 'Check 6',
      cellRenderer: (params: ValueFormatterParams) => {
        return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
      }
     },
     
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
    this.GetEmailsToAssignForLayeredRoutineTask( 1, 100000);
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

  private GetEmailsToAssignForLayeredRoutineTask( pageIndex: number, pageSize: number) {

    this.service.Get('/EmailOperation/GetEmailsToAssignForLayeredRoutineTask/' + pageIndex + '/' + pageSize).subscribe((res: any) => {
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
    });

    this.service.Post('/EmailOperation/AssignEmailsForLayeredRoutineTask/' + assignedTo, payload,true).subscribe((res: any) => {
      this.toast.success("Agent Email Assign Successfully!!", "success", { progressBar: true });
      document.getElementById("assignToAgentCloseModal")?.click();
      this.totalRecord=0;
      this.GetEmailsToAssignForLayeredRoutineTask(1, 100000);

    },
      (err: any) => {
        console.log(err);
      })

  }


}
