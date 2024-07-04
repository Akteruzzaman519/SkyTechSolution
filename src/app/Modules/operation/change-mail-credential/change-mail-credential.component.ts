import { Component, OnInit } from '@angular/core';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { EmailBaseInfo } from 'src/app/Models/EmailBaseInfo';
import { EmailFormDto } from 'src/app/Models/EmailFormDto';
import { KeyValueDto } from 'src/app/Models/KeyValueDto';
import { AGGridHelper } from '../../Common/AGGridHelper';
import { HttpCommonService } from '../../Common/http-common.service';
import { EmailOperationGridDto } from 'src/app/Models/EmailOperationGridDto';
import { EmailIssueFormDto } from 'src/app/Models/EmailIssueFormDto';

@Component({
  selector: 'app-change-mail-credential',
  templateUrl: './change-mail-credential.component.html',
  styleUrls: ['./change-mail-credential.component.css']
})
export class ChangeMailCredentialComponent {
  
  
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
  public totalRecord: number = 0;

  constructor(private service: HttpCommonService, private toast: ToastrService,) { }

  ApiGridReady(event: GridReadyEvent) {
    this.balkEmailGridApi = event.api;
    this.balkEmailGridApi.sizeColumnsToFit();
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: any[] = [
    { field: "mailUserName", headerName: 'Email' },
    { field: "mailOperationAssignedByFullName", headerName: 'Assign By' },
    { field: "mailOperationAssignedAt", headerName: 'Assign At' },
    { field: "SourcingName", headerName: 'Details' }
  ];

  addBulkEmailBtn() {
    document.getElementById('modalOpen')?.click();
    this.sEmailUserName = "";
    this.sEmailPassword = "";
    this.sEmailRecoveryEmail = "";
  }


  public GetEmailUsername(mailSystemId: any) {
  //{{baseURL}}/EmailManagement/GetEmailUsername/{mailSystemId}
    this.service.Get('/EmailManagement/GetEmailUsername/' + mailSystemId).subscribe((res: any) => {
      this.sEmailUserName = res;
    },
      (err: any) => {
        console.log(err);
      })
  }

  
  public GetEmailPassword(mailSystemId: any) {
    //{{baseURL}}/EmailManagement/GetEmailUsername/{mailSystemId}
      this.service.Get('/EmailManagement/GetEmailPassword/' + mailSystemId).subscribe((res: any) => {
        this.sEmailPassword = res;
      },
        (err: any) => {
          console.log(err);
        })
    }
    //{{baseURL}}/EmailManagement/GetEmailRcoveryEmail/{mailSystemId}
  public GetEmailRcoveryEmail(mailSystemId: any) {
    //{{baseURL}}/EmailManagement/GetEmailUsername/{mailSystemId}
      this.service.Get('/EmailManagement/GetEmailRcoveryEmail/' + mailSystemId).subscribe((res: any) => {
        this.sEmailRecoveryEmail = res;
      },
        (err: any) => {
          console.log(err);
        })
    }


  public GetEmailsByOperationTag(relatedModule: any) {
    //{{baseURL}}/EmailOperation/GetEmailsByOperationTag/{operationTag}
    this.service.Get('/EmailOperation/GetEmailsByOperationTag/' + relatedModule).subscribe((res: any) => {
      this.oEmailOperationGridDtoList = res;
    },
      (err: any) => {
        console.log(err);
      })
  }

  public ChangeEmailCredential(mailsystemId :any){
    this.oEmailBaseInfo
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

