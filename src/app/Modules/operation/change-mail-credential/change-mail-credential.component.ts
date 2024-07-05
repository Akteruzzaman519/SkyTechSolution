import { Component, OnInit } from '@angular/core';
import { GridApi, GridReadyEvent, RowDoubleClickedEvent, ValueFormatterParams } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { EmailBaseInfo } from 'src/app/Models/EmailBaseInfo';
import { EmailFormDto } from 'src/app/Models/EmailFormDto';
import { KeyValueDto } from 'src/app/Models/KeyValueDto';
import { AGGridHelper } from '../../Common/AGGridHelper';
import { HttpCommonService } from '../../Common/http-common.service';
import { EmailOperationGridDto } from 'src/app/Models/EmailOperationGridDto';
import { EmailIssueFormDto } from 'src/app/Models/EmailIssueFormDto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-change-mail-credential',
  templateUrl: './change-mail-credential.component.html',
  styleUrls: ['./change-mail-credential.component.css']
})
export class ChangeMailCredentialComponent  implements OnInit {
  
  
  private balkEmailGridApi!: GridApi;
  passwordFieldType: string = 'password';
  recoveryFieldType: string = 'password';
  eyeIcon: string = '👁️';
  eyeIconRecovery: string = '👁️';
  public paginationPageSize = 20;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData: any[] = [];

  public oEmailBaseInfo :EmailBaseInfo = new EmailBaseInfo();
  public oEmailIssueFormDto :EmailIssueFormDto = new EmailIssueFormDto();
  public oEmailOperationGridDtoList :EmailOperationGridDto[] = [];
  public oEmailFormDto = new EmailFormDto();
  public sEmailUserName :string = "";
  public sEmailPassword :string = "";
  public sEmailRecoveryEmail :string = "";
  public mailSystemId = 0;

  public sNewEmailPassword :string = "";
  public sNewRecoveryEmail :string = "";
  public totalRecord: number = 0;

  constructor(private service: HttpCommonService, private toast: ToastrService,private datePipe: DatePipe) { }
  ngOnInit(): void {
    this.GetEmailsByOperationTag("change_mail_credential");
  }

  ApiGridReady(event: GridReadyEvent) {
    this.balkEmailGridApi = event.api;
    this.balkEmailGridApi.sizeColumnsToFit();
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: any[] = [
    { field: "mailUserName", headerName: 'Email' },
    { field: "mailOperationAssignedByFullName", headerName: 'Assign By' },
    { field: "mailOperationAssignedAt", headerName: 'Assign At', cellRenderer: (params: ValueFormatterParams) => {
      return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
    }, },
    { field: 'Details', minWidth: 120, headerName: 'Details', resizable: true, cellRenderer: this.detailToGrid.bind(this) },
  ];

  detailToGrid(params: any) {
    const eDiv = document.createElement('div');
    eDiv.innerHTML = ' <button class="btn btn-success p-0 px-1"><i class="fa-solid fa-eye" aria-hidden="true"></i> Detail</button>'
    eDiv.addEventListener('click', () => {
      this.mailSystemId = params.data.bookingSystemId;
      this.addBulkEmailBtn();
    });
    return eDiv;
  }

  public RowDoubleClick(params: RowDoubleClickedEvent){
    console.log(params);
    this.addBulkEmailBtn();
  }

  addBulkEmailBtn() {
    var oSelectedList = this.balkEmailGridApi.getSelectedRows();
    if(oSelectedList.length <= 0){
      this.toast.warning("Please Select One From List!!", "Warning", { progressBar: true });
    }
    this.mailSystemId = oSelectedList[0].mailSystemId;
    this.GetEmailUsername(this.mailSystemId)
    document.getElementById('modalOpen')?.click();
    this.sEmailUserName = "";
    this.sEmailPassword = "";
    this.sEmailRecoveryEmail = "";
    this.eyeIcon = '👁️';
    this.eyeIconRecovery = '👁️';
  }

  public GetEmailsByOperationTag(relatedModule: any) {
    //{{baseURL}}/EmailOperation/GetEmailsByOperationTag/{operationTag}
    this.service.Get('/EmailOperation/GetEmailsByOperationTag/' + relatedModule).subscribe((res: any) => {
      this.oEmailOperationGridDtoList = res;
      this.balkEmailGridApi.setRowData(this.oEmailOperationGridDtoList);
    },
      (err: any) => {
        console.log(err);
      })
  }

  public GetEmailUsername(mailSystemId: any) {
  //{{baseURL}}/EmailManagement/GetEmailUsername/{mailSystemId}
    this.service.Get('/EmailManagement/GetEmailUsername/' + mailSystemId).subscribe((res: any) => {
      this.sEmailUserName = res.data;
    },
      (err: any) => {
        console.log(err);
      })
  }

  public GetEmailPassword(mailSystemId: any) {
    //{{baseURL}}/EmailManagement/GetEmailUsername/{mailSystemId}
      this.service.Get('/EmailManagement/GetEmailPassword/' + mailSystemId).subscribe((res: any) => {
        this.sEmailPassword = res.data;
      },
        (err: any) => {
          console.log(err);
        })
    }

    //{{baseURL}}/EmailManagement/GetEmailRcoveryEmail/{mailSystemId}
  public GetEmailRcoveryEmail(mailSystemId: any) {
    //{{baseURL}}/EmailManagement/GetEmailUsername/{mailSystemId}
      this.service.Get('/EmailManagement/GetEmailRecoveryMail/' + mailSystemId).subscribe((res: any) => {
        this.sEmailRecoveryEmail = res.data;
      },
        (err: any) => {
          console.log(err);
        })
    }

  public ChangeEmailCredential(mailsystemId :any){

    if(this.sNewEmailPassword == ""){
      this.toast.warning("Please Provide New Password!!", "Warning", { progressBar: true });
      return;
    }
    if(this.sNewRecoveryEmail == ""){
      this.toast.warning("Please Provide New Recovery Email!!", "Warning", { progressBar: true });
      return;
    }

    this.oEmailBaseInfo.mailUserName = this.sEmailUserName;
    this.oEmailBaseInfo.mailRecoveryMail = this.sNewRecoveryEmail;
    this.oEmailBaseInfo.mailUserPassword = this.sNewEmailPassword;
    //{{baseURL}}/EmailManagement/ChangeEmailCredential/{mailSystemId}
    this.service.Post('EmailManagement/ChangeEmailCredential/'+mailsystemId, this.oEmailBaseInfo, true).subscribe((res: any) => {
      this.toast.success("Email Uploaded Successfully!!", "Success", { progressBar: true });
      this.rowData = [];
      this.totalRecord = 0;
    },
      (err: any) => {
        console.log(err);
      })
  }

  public ReportMailIssue(){
    this.oEmailIssueFormDto
    //{{baseURL}}/EmailManagement/ChangeEmailCredential/{mailSystemId}
    this.service.Post('EmailOperation/ReportMailIssue', this.oEmailIssueFormDto, true).subscribe((res: any) => {
      this.toast.success("Email Uploaded Successfully!!", "Success", { progressBar: true });
      this.rowData = [];
      this.totalRecord = 0;
    },
      (err: any) => {
        console.log(err);
      })
  }

  togglePasswordVisibility(): void {
    if (this.passwordFieldType === 'password') {
      this.passwordFieldType = 'text';
      this.eyeIcon = '';
      this.GetEmailPassword(1)
    } else {
      this.passwordFieldType = 'password';
      this.eyeIcon = '👁️';
    }
  }
  toggleRecoveryEmailVisibility(): void {
    if (this.recoveryFieldType === 'password') {
      this.recoveryFieldType = 'text';
      this.eyeIconRecovery = '';
      this.GetEmailRcoveryEmail(1)
    } else {
      this.recoveryFieldType = 'password';
      this.eyeIconRecovery = '👁️';
    }
  }

}

