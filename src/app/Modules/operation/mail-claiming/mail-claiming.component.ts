import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent, ValueFormatterParams, RowDoubleClickedEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { EmailOperationGridDto } from 'src/app/Models/EmailOperationGridDto';
import { KeyValueDto } from 'src/app/Models/KeyValueDto';
import { AGGridHelper } from '../../Common/AGGridHelper';
import { HttpCommonService } from '../../Common/http-common.service';
import { EmailMapClaimFormDto } from 'src/app/Models/EmailMapClaimFormDto';
import { EmailIssueFormDto } from 'src/app/Models/EmailIssueFormDto';

@Component({
  selector: 'app-mail-claiming',
  templateUrl: './mail-claiming.component.html',
  styleUrls: ['./mail-claiming.component.css']
})
export class MailClaimingComponent implements OnInit {


  private balkEmailGridApi!: GridApi;
  public paginationPageSize = 20;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData: any[] = [];

  public oEmailMapClaimFormDto: EmailMapClaimFormDto = new EmailMapClaimFormDto();
  public oEmailIssueFormDto: EmailIssueFormDto = new EmailIssueFormDto();
  public oEmailMapClaimFormDtoList: EmailMapClaimFormDto[] = [];
  public oEmailOperationGridDtoList: EmailOperationGridDto[] = [];
  public KeyValues: KeyValueDto[] = [];
  public CategoryKeyValues: KeyValueDto[] = [];

  public statusTag: any = "";
  public mailSystemId = 0;
  public mailOperationCompletionId = 0;

  public sFirstMapNumber: string = "";
  public sSecondMapNumber: string = "";

  public sFirstMapLink: string = "";
  public sSecondMapLink: string = "";

  public sEmailUserName: string = "";
  public sEmailPassword: string = "";
  public sEmailRecoveryEmail: string = "";

  public sFirstMapManualCurrentCategory: string;
  public sFirstMapRelatedVpnCityName: string;
  public sFirstMapRelatedVpnCityStateName: string;
  public sFirstMapRelatedVpnCityZipCode: string;
  public sSecondMapManualCurrentCategory: string;
  public sSecondMapRelatedVpnCityName: string;
  public sSecondMapRelatedVpnCityStateName: string;
  public sSecondMapRelatedVpnCityZipCode: string;

  passwordFieldType: string = 'password';
  recoveryFieldType: string = 'password';

  eyeIcon: string = '👁️';
  eyeIconRecovery: string = '👁️';


  public nFirstMapCategory: number = 0;
  public nSecondMapCategory: number = 0;
  public nSe: number;
  public sNumber: string = "";

  public totalRecord: number = 0;
  public bIsDisable: boolean = false;


  public sRemarksNote = "";
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
    this.sFirstMapNumber = "";
    this.sSecondMapNumber = "";
    this.nFirstMapCategory = 0;
    this.nSecondMapCategory = 0;
    this.sFirstMapLink = "";
    this.sSecondMapLink = "";
    this.sFirstMapManualCurrentCategory = "";
    this.sFirstMapRelatedVpnCityName = "";
    this.sFirstMapRelatedVpnCityStateName = "";
    this.sFirstMapRelatedVpnCityZipCode = "";
    this.sSecondMapManualCurrentCategory = "";
    this.sSecondMapRelatedVpnCityName = "";
    this.sSecondMapRelatedVpnCityStateName = "";
    this.sSecondMapRelatedVpnCityZipCode = "";

  }



  addBulkEmailBtn() {
    if (this.mailSystemId <= 0) {
      this.toast.warning("Select a mail from listt!!", "Warning", { progressBar: true });
      return;
    }
    document.getElementById('modalOpen')?.click();
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

  public GetMapCategoriesInKeyValue() {
    //{{baseURL}}/KeyValue/GetMapCategoriesInKeyValue/{relatedModule}
    this.service.Get('/KeyValue/GetMapCategoriesInKeyValue/mail').subscribe((res: any) => {
      this.CategoryKeyValues = res;
    },
      (err: any) => {
        console.log(err);
      })
  }


  public TrackOperationStart() {
    //{{baseURL}}/EmailOperation/TrackOperationStart/{mailOperationCompletionId}
    this.service.Get('/EmailOperation/TrackOperationStart/' + this.mailOperationCompletionId).subscribe((res: any) => {
      console.log(res)
      this.GetEmailsByOperationTag(this.statusTag);
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

  ChangeMapInfo() {

    if (this.sFirstMapManualCurrentCategory == "") {
      this.toast.warning("Please Provide Map 1 Category!!", "Warning", { progressBar: true });
      return;
    }
    if (this.sFirstMapNumber == "") {
      this.toast.warning("Please Provide Map 1 Number!!", "Warning", { progressBar: true });
      return;
    }
    if (this.sFirstMapLink == "") {
      this.toast.warning("Please Provide Map 1 Link!!", "Warning", { progressBar: true });
      return;
    }
    if (this.sSecondMapManualCurrentCategory == "") {
      this.toast.warning("Please Provide Map 2 Category!!", "Warning", { progressBar: true });
      return;
    }
    if (this.sSecondMapNumber == "") {
      this.toast.warning("Please Provide Map 2 Number!!", "Warning", { progressBar: true });
      return;
    }
    if (this.sSecondMapLink == "") {
      this.toast.warning("Please Provide Map 2 Link!!", "Warning", { progressBar: true });
      return;
    }

    document.getElementById("ConfirmationPopupRemarklOpen")?.click();
  }


  public ClaimEmailMaps() {


    this.oEmailMapClaimFormDto = new EmailMapClaimFormDto();
    this.oEmailMapClaimFormDto.mapCurrentCategory = this.nFirstMapCategory;
    this.oEmailMapClaimFormDto.mapCurrentMapLink = this.sFirstMapLink;
    this.oEmailMapClaimFormDto.mapCurrentNumber = this.sFirstMapNumber;

    this.oEmailMapClaimFormDto.mapManualCurrentCategory = this.sFirstMapManualCurrentCategory;
    this.oEmailMapClaimFormDto.mapRelatedVpnCityName = this.sFirstMapRelatedVpnCityName;
    this.oEmailMapClaimFormDto.mapRelatedVpnCityStateName = this.sFirstMapRelatedVpnCityStateName;
    this.oEmailMapClaimFormDto.mapRelatedVpnCityZipCode = this.sFirstMapRelatedVpnCityZipCode;
    this.oEmailMapClaimFormDtoList.push(this.oEmailMapClaimFormDto);

    this.oEmailMapClaimFormDto = new EmailMapClaimFormDto();

    this.oEmailMapClaimFormDto.mapCurrentCategory = this.nSecondMapCategory;
    this.oEmailMapClaimFormDto.mapCurrentMapLink = this.sSecondMapLink;
    this.oEmailMapClaimFormDto.mapCurrentNumber = this.sSecondMapNumber;

    this.oEmailMapClaimFormDto.mapManualCurrentCategory = this.sSecondMapManualCurrentCategory;
    this.oEmailMapClaimFormDto.mapRelatedVpnCityName = this.sSecondMapRelatedVpnCityName;
    this.oEmailMapClaimFormDto.mapRelatedVpnCityStateName = this.sSecondMapRelatedVpnCityStateName;
    this.oEmailMapClaimFormDto.mapRelatedVpnCityZipCode = this.sSecondMapRelatedVpnCityZipCode;
    this.oEmailMapClaimFormDtoList.push(this.oEmailMapClaimFormDto);

    //{{baseURL}}/EmailManagement/ClaimEmailMaps/{mailSystemId}/{mailOperationCompletionId}/{statusTag}
    this.service.Post('/EmailManagement/ClaimEmailMaps/' + this.mailSystemId + "/" + this.mailOperationCompletionId + "/" + this.statusTag + "?remarks=" + this.sRemarksNote, this.oEmailMapClaimFormDtoList, true).subscribe((res: any) => {
      this.toast.success("Map Climing Info Saved!!", "Success", { progressBar: true });
      this.sFirstMapNumber = "";
      this.sSecondMapNumber = "";
      this.nFirstMapCategory = 0;
      this.nSecondMapCategory = 0;
      this.sFirstMapLink = "";
      this.sSecondMapLink = "";
      this.GetEmailsByOperationTag(this.statusTag);
      this.oEmailMapClaimFormDto = new EmailMapClaimFormDto();
      this.oEmailMapClaimFormDtoList = [];
      document.getElementById("ConfirmationPopupRemarkCloseModal")?.click();

      this.rowData = [];
      this.totalRecord = 0;
    },
      (err: any) => {
        console.log(err);
        this.toast.error(err, "Error", { progressBar: true });
      })
  }

  public ReportMailIssue() {

    this.oEmailIssueFormDto.mailSystemId = this.mailSystemId;


    if (this.oEmailIssueFormDto.mailIssueId == -1) {
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
    this.service.Post('/EmailOperation/ReportMailIssue/' + this.statusTag, this.oEmailIssueFormDto, true).subscribe((res: any) => {
      this.toast.success("Mail Report Issue  Successfully!!", "Success", { progressBar: true });
      document.getElementById("BulkemailCloseModal")?.click();
      this.oEmailIssueFormDto = new EmailIssueFormDto();
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


