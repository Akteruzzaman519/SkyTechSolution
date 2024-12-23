import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent, ValueFormatterParams, RowDoubleClickedEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { EmailBaseInfo } from 'src/app/Models/EmailBaseInfo';
import { EmailFormDto } from 'src/app/Models/EmailFormDto';
import { EmailIssueFormDto } from 'src/app/Models/EmailIssueFormDto';
import { EmailOperationGridDto } from 'src/app/Models/EmailOperationGridDto';
import { KeyValueDto } from 'src/app/Models/KeyValueDto';
import { AGGridHelper } from '../../Common/AGGridHelper';
import { HttpCommonService } from '../../Common/http-common.service';
import { EmailMapGridDto, EmailMapInfoChangeFormDto } from 'src/app/Models/EmailMapGridDto';

@Component({
  selector: 'app-change-map-info',
  templateUrl: './change-map-info.component.html',
  styleUrls: ['./change-map-info.component.css']
})
export class ChangeMapInfoComponent implements OnInit {


  private balkEmailGridApi!: GridApi;
  passwordFieldType: string = 'password';
  recoveryFieldType: string = 'password';
  eyeIcon: string = '👁️';
  eyeIconRecovery: string = '👁️';
  public nFirstMapCategory: number = 0;
  public sFirstMapNumber: string = "";
  public sFirstMapLink: string = "";
  public paginationPageSize = 20;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData: any[] = [];

  public oEmailMapGridDto: EmailMapGridDto = new EmailMapGridDto();
  public oEmailMap2GridDto: EmailMapGridDto = new EmailMapGridDto();
  public oEmailMapGridDtoList: EmailMapGridDto[] = [];

  public EmailMapInfoChangeFormDto: EmailMapInfoChangeFormDto = new EmailMapInfoChangeFormDto();
  public EmailMap2InfoChangeFormDto: EmailMapInfoChangeFormDto = new EmailMapInfoChangeFormDto();
  public EmailMapInfoChangeFormDtoList: EmailMapInfoChangeFormDto[] = [];

  public oEmailIssueFormDto: EmailIssueFormDto = new EmailIssueFormDto();
  public oEmailOperationGridDtoList: EmailOperationGridDto[] = [];
  public KeyValues: KeyValueDto[] = [];
  public KeyValuesCategory: KeyValueDto[] = [];
  public oEmailFormDto = new EmailFormDto();
  public sEmailUserName: string = "";
  public sEmailPassword: string = "";
  public sEmailRecoveryEmail: string = "";
  public statusTag: any = "";
  public mailSystemId = 0;
  public mailOperationCompletionId = 0;

  public sNewEmailPassword: string = "";
  public sNewRecoveryEmail: string = "";
  public sMailIssueNote: string = "";
  public totalRecord: number = 0;
  public bIsDisable: boolean = false;
  public nReportIssueId: number = -1;

  public sMap12FAPhone: string = "no";
  public sMap22FAPhone: string = "no";
  public sRemarksNote: string = "";
  constructor(private service: HttpCommonService, private toast: ToastrService, private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router) {
    this.route.url.subscribe(urlSegments => {
      this.statusTag = urlSegments[urlSegments.length - 1];
    });
  }

  ngOnInit(): void {
    this.GetEmailsByOperationTag(this.statusTag);
    this.GetIssuesInKeyValue()
    this.GetMapCategoriesInKeyValue();
  }

  ApiGridReady(event: GridReadyEvent) {
    this.balkEmailGridApi = event.api;
    this.balkEmailGridApi.sizeColumnsToFit();
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: any[] = [
    { valueGetter: "node.rowIndex + 1", headerName: '', cellStyle: { 'border-right': '0.5px solid #e9ecef' }, filter: false, width: 20, editable: false },
    { field: "mailUserName", headerName: 'Email', width: 200 },
    { field: "mailOperationAssignedByFullName", headerName: 'Assign By', width: 180 },
    {
      field: "mailOperationAssignedAt", headerName: 'Assign At', width: 185, cellRenderer: (params: ValueFormatterParams) => {
        return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
      },
    },
    { field: 'Details', headerName: 'Details', width: 100, resizable: true, cellRenderer: this.detailToGrid.bind(this) },
  ];

  detailToGrid(params: any) {
    const eDiv = document.createElement('div');
    var sDisableed = ''
    if (this.bIsDisable) {
      sDisableed = params.data.mailOperationCompletionStatus != 2 ? 'style= "display: None"' : ''
    }
    eDiv.innerHTML = ' <button class="btn btn-success p-0 px-1" ' + sDisableed + '><i class="fa-solid fa-eye" aria-hidden="true"></i> Detail</button>'
    eDiv.addEventListener('click', () => {
      this.mailSystemId = params.data.mailSystemId;
      this.mailOperationCompletionId = params.data.mailOperationCompletionId;
      this.LoadDetails()
    });
    return eDiv;
  }

  public RowDoubleClick(params: RowDoubleClickedEvent) {
    this.mailSystemId = params.data.mailSystemId;
    this.mailOperationCompletionId = params.data.mailOperationCompletionId;
    this.LoadDetails();
  }

  LoadDetails() {
    this.GetEmailUsername();
    this.TrackOperationStart();
    this.GetEmailMaps();
    this.sEmailUserName = "";
    this.sEmailPassword = "";
    this.sEmailRecoveryEmail = "";
    this.sNewRecoveryEmail = "";
    this.sNewEmailPassword = "";
    this.sMailIssueNote = "";
    this.nReportIssueId = -1;
    this.eyeIcon = '👁️';
    this.eyeIconRecovery = '👁️';
  }

  onSelectionChanged() {
    this.sEmailUserName = "";
    this.sEmailPassword = "";
    this.sEmailRecoveryEmail = "";
    this.sNewRecoveryEmail = "";
    this.sNewEmailPassword = "";
    this.sMailIssueNote = "";
    this.nReportIssueId = -1;
    this.eyeIcon = '👁️';
    this.eyeIconRecovery = '👁️';
    this.oEmailMapGridDto = new EmailMapGridDto();
    this.oEmailMap2GridDto = new EmailMapGridDto();
    this.EmailMapInfoChangeFormDto = new EmailMapInfoChangeFormDto();
    this.EmailMap2InfoChangeFormDto = new EmailMapInfoChangeFormDto();
  }

  addBulkEmailBtn() {
    if (this.mailSystemId <= 0) {
      this.toast.warning("Select a mail from listt!!", "Warning", { progressBar: true });
      return;
    }
    document.getElementById('modalOpen')?.click();
    this.oEmailIssueFormDto = new EmailIssueFormDto();
  }

  public GetEmailsByOperationTag(relatedModule: any) {
    //{{baseURL}}/EmailOperation/GetEmailsByOperationTag/{operationTag}
    this.service.Get('/EmailOperation/GetEmailsByOperationTag/' + relatedModule).subscribe((res: any) => {
      this.oEmailOperationGridDtoList = res;
      this.totalRecord = this.oEmailOperationGridDtoList.length;
      this.bIsDisable = this.oEmailOperationGridDtoList.filter(x => x.mailOperationCompletionStatus == 2).length>4 ? true : false;
      // this.bIsDisable = this.oEmailOperationGridDtoList.find(x => x.mailOperationCompletionStatus == 2) ? true : false;
      this.balkEmailGridApi.setRowData(this.oEmailOperationGridDtoList);
      this.balkEmailGridApi.forEachNode(node => {
        if (node.data.mailOperationCompletionStatus == 2) {
          node.setSelected(true);
        }
      })
    },
      (err: any) => {
        console.log(err);
      })
  }

  public GetEmailUsername() {
    //{{baseURL}}/EmailManagement/GetEmailUsername/{mailSystemId}
    this.service.Get('/EmailManagement/GetEmailUsername/' + this.mailSystemId + "/" + this.statusTag).subscribe((res: any) => {
      this.sEmailUserName = res.data;
    },
      (err: any) => {
        console.log(err);
      })
  }
  public TrackOperationStart() {
    //{{baseURL}}/EmailOperation/TrackOperationStart/{mailOperationCompletionId}
    this.service.Get('/EmailOperation/TrackOperationStart/' + this.mailOperationCompletionId).subscribe((res: any) => {
      console.log(res)
    },
      (err: any) => {
        console.log(err);
      })
  }

  public GetEmailPassword() {
    //{{baseURL}}/EmailManagement/GetEmailUsername/{mailSystemId}
    this.service.Get('/EmailManagement/GetEmailPassword/' + this.mailSystemId + "/" + this.statusTag).subscribe((res: any) => {
      this.sEmailPassword = res.data;
    },
      (err: any) => {
        console.log(err);
      })
  }

  //{{baseURL}}/EmailManagement/GetEmailRcoveryEmail/{mailSystemId}
  public GetEmailRcoveryEmail() {
    //{{baseURL}}/EmailManagement/GetEmailUsername/{mailSystemId}
    this.service.Get('/EmailManagement/GetEmailRecoveryMail/' + this.mailSystemId + "/" + this.statusTag).subscribe((res: any) => {
      this.sEmailRecoveryEmail = res.data;
    },
      (err: any) => {
        console.log(err);
      })
  }

  public GetIssuesInKeyValue() {
    //{{baseURL}}/KeyValue/GetIssuesInKeyValue/{operationTag}
    this.service.Get('/KeyValue/GetIssuesInKeyValue/' + this.statusTag).subscribe((res: any) => {
      this.KeyValues = res;
    },
      (err: any) => {
        console.log(err);
      })
  }
  public GetMapCategoriesInKeyValue() {
    //{{baseURL}}/KeyValue/GetMapCategoriesInKeyValue/{operationTag}
    this.service.Get('/KeyValue/GetMapCategoriesInKeyValue/mail').subscribe((res: any) => {
      this.KeyValuesCategory = res;
    },
      (err: any) => {
        console.log(err);
      })
  }

  public GetEmailMaps() {
    //{{baseURL}}/EmailManagement/GetEmailMaps/{mailSystemId}
    this.oEmailMapGridDto = new EmailMapGridDto();
    this.oEmailMap2GridDto = new EmailMapGridDto();
    this.service.Get('/EmailManagement/GetEmailMaps/' + this.mailSystemId).subscribe((res: any) => {
      this.oEmailMapGridDtoList = res.data;
      if (this.oEmailMapGridDtoList.length > 0) {
        this.oEmailMapGridDto = this.oEmailMapGridDtoList[0];
      }
      if (this.oEmailMapGridDtoList.length > 1) {
        this.oEmailMap2GridDto = this.oEmailMapGridDtoList[1];
      }
    },
      (err: any) => {
        console.log(err);
      })
  }


  public ChangeMapInfoCloseModal() {

    if(this.EmailMapInfoChangeFormDto.mapNewBusinessName == ""){
      this.toast.warning("Please Provide New Password!!", "Warning", { progressBar: true });
      return;
    }
    if(this.sNewRecoveryEmail == ""){
      this.toast.warning("Please Provide New Recovery Email!!", "Warning", { progressBar: true });
      return;
    }
    
    document.getElementById("ConfirmationPopupRemarklOpen")?.click();
  }

  public ChangeMapInfo() {


    this.EmailMapInfoChangeFormDto.mapClaimingId = this.oEmailMapGridDto.mapClaimingId;
    this.EmailMap2InfoChangeFormDto.mapClaimingId = this.oEmailMap2GridDto.mapClaimingId;
    this.EmailMapInfoChangeFormDtoList.push(this.EmailMapInfoChangeFormDto);
    this.EmailMapInfoChangeFormDtoList.push(this.EmailMap2InfoChangeFormDto);


    //{{baseURL}}/ChangeEmailMapInfo/{mailSystemId}/{mailOperationCompletionId}/{statusTag}?remarks=
    this.service.Post('/EmailManagement/ChangeEmailMapInfo/' + this.mailSystemId + "/" + this.mailOperationCompletionId + "/" + this.statusTag+"?remarks="+this.sRemarksNote, this.EmailMapInfoChangeFormDtoList, true).subscribe((res: any) => {
      this.toast.success("Map Info Changed Successfully!!", "Success", { progressBar: true });
      this.GetEmailsByOperationTag(this.statusTag)
      this.onSelectionChanged();
      document.getElementById("ConfirmationPopupRemarkCloseModal")?.click();
    },
      (err: any) => {
        console.log(err);
        this.toast.error(err, "Error", { progressBar: true });
      })
  }

  public ReportMailIssue() {
    this.oEmailIssueFormDto.mailIssueId = this.nReportIssueId;
    this.oEmailIssueFormDto.mailSystemId = this.mailSystemId;
    this.oEmailIssueFormDto.mailIssueNote = this.sMailIssueNote;

    if (this.nReportIssueId == -1) {
      this.toast.warning("Please Select An Issue!!", "Warning", { progressBar: true });
      return;
    }
    if (this.oEmailIssueFormDto.mailIssueId == 0) {
      if (this.oEmailIssueFormDto.mailIssueNote == "") {
        this.toast.warning("Custom issue note required!!", "Warning", { progressBar: true });
        return;
      }
    }

    //{{baseURL}}/EmailOperation/ReportMailIssue
    this.service.Post('/EmailOperation/ReportMailIssue', this.oEmailIssueFormDto, true).subscribe((res: any) => {
      this.toast.success("Mail Report Issue  Successfully!!", "Success", { progressBar: true });
      this.rowData = [];
      this.totalRecord = 0;
      document.getElementById("BulkemailCloseModal")?.click();
    },
      (err: any) => {
        this.toast.error(err, "Error", { progressBar: true });
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

}


