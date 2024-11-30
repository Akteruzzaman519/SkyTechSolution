import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent, ValueFormatterParams, RowDoubleClickedEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { EmailIssueFormDto } from 'src/app/Models/EmailIssueFormDto';
import { EmailOperationGridDto } from 'src/app/Models/EmailOperationGridDto';
import { KeyValueDto } from 'src/app/Models/KeyValueDto';
import { MailTasksManualFormDto } from 'src/app/Models/MailTasksManualFormDto';
import { AGGridHelper } from '../../Common/AGGridHelper';
import { HttpCommonService } from '../../Common/http-common.service';
import { EmailVerificationFormDto } from 'src/app/Models/EmailVerificationFormDto';
import { MailSystem } from 'src/app/Models/MailSystem';

@Component({
  selector: 'app-operation-verification-pending',
  templateUrl: './operation-verification-pending.component.html',
  styleUrls: ['./operation-verification-pending.component.css']
})
export class OperationVerificationPendingComponent implements OnInit {


  private balkEmailGridApi!: GridApi;
  private taskEmailGridApi!: GridApi;
  passwordFieldType: string = 'password';
  recoveryFieldType: string = 'password';
  eyeIcon: string = '👁️';
  eyeIconRecovery: string = '👁️';
  public paginationPageSize = 20;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData: any[] = [];

  public oMailTasksManualFormDto: MailTasksManualFormDto = new MailTasksManualFormDto()
  public oMailTasksManualFormDtoList: MailTasksManualFormDto[] = [];
  public oEmailIssueFormDto: EmailIssueFormDto = new EmailIssueFormDto();
  public oEmailOperationGridDtoList: EmailOperationGridDto[] = [];
  public KeyValues: KeyValueDto[] = [];
  public sEmailUserName: string = "";
  public sEmailPassword: string = "";
  public sEmailRecoveryEmail: string = "";
  public statusTag: any = "";
  public sTaskTitle: any = "Add";
  public mailSystemId = 0;
  public bIsEdit = false;
  public mailOperationCompletionId = 0;


  public totalRecord: number = 0;
  public bIsDisable: boolean = false;
  public nReportIssueId: number = 0;

  public oMailSystem = new MailSystem();
  public oEmailVerificationFormDto = new EmailVerificationFormDto()

  constructor(private service: HttpCommonService, private toast: ToastrService, private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router) {
    this.route.url.subscribe(urlSegments => {
      this.statusTag = urlSegments[urlSegments.length - 1];
    });
  }

  ngOnInit(): void {
    this.GetVerificationPendingEmailAfterRoutineTask();
  }

  ApiGridReady(event: GridReadyEvent) {
    this.balkEmailGridApi = event.api;
    this.balkEmailGridApi.sizeColumnsToFit();
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: any[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'SL', width: 100, editable: false, checkboxSelection: true, headerCheckboxSelection: true, },

    { field: 'mailUserName', headerName: 'Email' },
    { field: 'mailLastActionTakenAge', headerName: 'Age' },

    {
      field: 'mailRoutineTaskDate1', headerName: 'Claimed At',
      cellRenderer: (params: ValueFormatterParams) => {
        return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
      }
    },
    {
      field: 'mailRoutineTaskDate2', headerName: 'Check 1',
      cellRenderer: (params: ValueFormatterParams) => {
        return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
      }
    },
    {
      field: 'mailRoutineTaskDate3', headerName: 'Check 2',
      cellRenderer: (params: ValueFormatterParams) => {
        return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
      }
    },
    {
      field: 'mailRoutineTaskDate4', headerName: 'Check 3',
      cellRenderer: (params: ValueFormatterParams) => {
        return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
      }
    },
    {
      field: 'mailRoutineTaskDate5', headerName: 'Check 4',
      cellRenderer: (params: ValueFormatterParams) => {
        return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
      }
    },
    {
      field: 'mailRoutineTaskDate6', headerName: 'Check 5',
      cellRenderer: (params: ValueFormatterParams) => {
        return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
      }
    },
    {
      field: 'mailRoutineTaskDate7', headerName: 'Check 6',
      cellRenderer: (params: ValueFormatterParams) => {
        return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
      }
    }
  ];


  public OpenModalDialog() {
    var selectedRow = AGGridHelper.GetSelectedRow(this.balkEmailGridApi);
    console.log(selectedRow)
    if (selectedRow == null) {
      this.toast.warning("Select a mail from listt!!", "Warning", { progressBar: true });
      return;
    }
    this.oEmailVerificationFormDto = new EmailVerificationFormDto();
    this.oEmailVerificationFormDto.mailSystemId = selectedRow.mailSystemId;
    this.sEmailUserName = selectedRow.mailUserName;
    this.mailSystemId = selectedRow.mailSystemId;

    document.getElementById('reportmodalOpen')?.click();
  }

  LoadDetails() {
    this.oEmailVerificationFormDto = new EmailVerificationFormDto();
    this.sEmailUserName = "";
    this.sEmailPassword = "";
    this.sEmailRecoveryEmail = "";
    this.eyeIcon = '👁️';
    this.eyeIconRecovery = '👁️';
  }

  public GetVerificationPendingEmailAfterRoutineTask() {
    this.service.Get('/EmailOperation/GetVerificationPendingEmailAfterRoutineTask/' + 1 + '/' + 100000).subscribe((res: any) => {
      this.balkEmailGridApi.setRowData(res.emailList);
      this.totalRecord = res.noOfTotalRecord;
    },
      (err: any) => {
        console.log(err);
      })
  }

  public GetEmailUsername() {
    this.service.Get('/EmailManagement/GetEmailUsername/' + this.mailSystemId + "/" + this.statusTag).subscribe((res: any) => {
      this.sEmailUserName = res.data;
    },
      (err: any) => {
        console.log(err);
      })
  }

  togglePasswordVisibility(): void {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.eyeIcon = '';
      this.GetEmailPassword()
    } else {
      this.passwordFieldType = 'password';
      this.eyeIcon = '👁️';
    }
  }

  public GetEmailPassword() {
    this.service.Get('/EmailManagement/GetEmailPassword/' + this.mailSystemId + "/" + this.statusTag).subscribe((res: any) => {
      this.sEmailPassword = res.data;
    },
      (err: any) => {
        console.log(err);
      })
  }

  public GetEmailRcoveryEmail() {
    this.service.Get('/EmailManagement/GetEmailRecoveryMail/' + this.mailSystemId + "/" + this.statusTag).subscribe((res: any) => {
      this.sEmailRecoveryEmail = res.data;
    },
      (err: any) => {
        console.log(err);
      })
  }


  toggleRecoveryEmailVisibility(): void {
    if (this.recoveryFieldType === 'password') {
      this.recoveryFieldType = 'text';
      this.eyeIconRecovery = '';
      this.GetEmailRcoveryEmail()
    } else {
      this.recoveryFieldType = 'password';
      this.eyeIconRecovery = '👁️';
    }
  }


  public VerifyEmailAfterRoutineTask() {

    if (this.oEmailVerificationFormDto.mailRoutineTaskVerificationStatus == 0) {
      this.toast.warning("Please select status!!", "Warning", { progressBar: true });
      return;
    }

    if (this.oEmailVerificationFormDto.mailRoutineTaskVerificationStatus == 1 || this.oEmailVerificationFormDto.mailRoutineTaskVerificationStatus == 1) {
      if (this.oEmailVerificationFormDto.mailRoutineTaskVerificationNotes == "") {
        this.toast.warning("Please provide custom vefification note!!", "Warning", { progressBar: true });
        return;
      }
    }

    this.service.Post('/EmailManagement/VerifyEmailAfterRoutineTask', this.oEmailVerificationFormDto).subscribe((res: any) => {
      this.LoadDetails()
      this.toast.success("Vefification save successfully!!", "Success", { progressBar: true });
      document.getElementById("reportCloseModal")?.click();
      this.GetVerificationPendingEmailAfterRoutineTask();
    },
      (err: any) => {
        console.log(err);
      })
  }


}


