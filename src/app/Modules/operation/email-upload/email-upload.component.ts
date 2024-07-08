import { Component, ViewChild } from '@angular/core';
import { ColDef, FirstDataRenderedEvent, GridApi, GridReadyEvent, ModuleRegistry, PaginationNumberFormatterParams } from 'ag-grid-community';
import { EmailBaseInfo } from 'src/app/Models/EmailBaseInfo';
import { EmailFormDto } from 'src/app/Models/EmailFormDto';
import { KeyValueDto } from 'src/app/Models/KeyValueDto';
import { AGGridHelper } from '../../Common/AGGridHelper';
import { HttpCommonService } from '../../Common/http-common.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-upload',
  templateUrl: './email-upload.component.html',
  styleUrls: ['./email-upload.component.css']
})
export class EmailUploadComponent {

  selectedFile: File | null = null;
  private balkEmailGridApi!: GridApi;
  public paginationPageSize = 500;
  public paginationPageSizeSelector: any[] = [5,10,15,20,25,30,50,100,500];

  public defaultColDef: ColDef = {
    editable: true,
    filter: true,
    flex: 1,
    minWidth: 190,
  };

  public themeClass: string =
  "ag-theme-quartz";
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams,
  ) => string = (params: PaginationNumberFormatterParams) => {
    return "[" + params.value.toLocaleString() + "]";
  };

  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData: any[] = [];
  public KeyValues: KeyValueDto[] = [];

  // Oobject Initialization 
  public oEmailFormDto = new EmailFormDto();
  public oEmailBaseInfos: EmailBaseInfo[] = [];
  public totalRecord: number = 0;
  public relatedModule: any = "";



  @ViewChild('fileInput') fileUpload: any;

  constructor(private service: HttpCommonService, private toast: ToastrService,
    private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router) {
    this.route.url.subscribe(urlSegments => {
      this.relatedModule = urlSegments[urlSegments.length - 1];
    });
  }


  onBtFirst() {
    this.balkEmailGridApi.paginationGoToFirstPage();
  }

  onBtLast() {
    this.balkEmailGridApi.paginationGoToLastPage();
  }

  onBtNext() {
    this.balkEmailGridApi.paginationGoToNextPage();
  }

  onBtPrevious() {
    this.balkEmailGridApi.paginationGoToPreviousPage();
  }

  onBtPageFive() {
    // we say page 4, as the first page is zero
    this.balkEmailGridApi.paginationGoToPage(4);
  }

  onBtPageFifty() {
    // we say page 49, as the first page is zero
    this.balkEmailGridApi.paginationGoToPage(49);
  }

  onPaginationChanged() {
    console.log("onPaginationPageLoaded");
    // Workaround for bug in events order
    if (this.balkEmailGridApi) {
      setText("#lbLastPageFound", this.balkEmailGridApi.paginationIsLastPageFound());
      setText("#lbPageSize", this.balkEmailGridApi.paginationGetPageSize());
      // we +1 to current page, as pages are zero based
      setText("#lbCurrentPage", this.balkEmailGridApi.paginationGetCurrentPage() + 1);
      setText("#lbTotalPages", this.balkEmailGridApi.paginationGetTotalPages());
      setLastButtonDisabled(!this.balkEmailGridApi.paginationIsLastPageFound());
    }
  }

  ApiGridReady(event: GridReadyEvent) {
    this.balkEmailGridApi = event.api;
    this.balkEmailGridApi.sizeColumnsToFit();
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: any[] = [
    {valueGetter: "node.rowIndex + 1", headerName: 'SL', width: 40, },
    { field: "mailUserName", headerName: 'Email' },
    { field: "mailUserPassword", HeaderName: 'Password' },
    { field: "mailRecoveryMail", HeaderName: 'Recovery Mail' },
    // { field: "sourcingName", HeaderName: 'Source' }
  ];

  addBulkEmailBtn() {
    this.oEmailFormDto = new EmailFormDto();
    if (this.fileUpload) {
      this.fileUpload.nativeElement.value = '';
    }
    this.GetSourcesInKeyValue();
    document.getElementById('modalOpen')?.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  SampleDownload() {
    this.service.SampleFileDownload();
    this.toast.success("Sample File Downloaded Successfully!!", "success", { progressBar: true });
  }

  public GetSourcesInKeyValue() {
    this.oEmailBaseInfos = AGGridHelper.GetRows(this.balkEmailGridApi);
    this.oEmailFormDto.mailBaseInfoList = this.oEmailBaseInfos;
    this.service.Get('/KeyValue/GetSourcesInKeyValue/mail').subscribe((res: any) => {
      this.KeyValues = res;
    },
      (err: any) => {
        console.log(err);
      })
  }

  public BulkEmailSave() {
    this.oEmailBaseInfos = AGGridHelper.GetRows(this.balkEmailGridApi);
    this.oEmailFormDto.mailBaseInfoList = this.oEmailBaseInfos;
    this.service.Post('/EmailOperation/AddFreshEmails', this.oEmailFormDto, true).subscribe((res: any) => {
      this.toast.success("Email Uploaded Successfully!!", "Success", { progressBar: true });
      this.rowData = [];
      this.totalRecord = 0;
    },
      (err: any) => {
        console.log(err);
      })
  }


  public BulkEmailLoadData() {

    if (this.oEmailFormDto.mailSourcingId == 0) {
      this.toast.warning("Please select source!!", "Warning", { progressBar: true });
      return;
    }

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      this.service.UploadFile('/FileReader/ReadFreshMailFromExcel', formData).subscribe(response => {
        this.rowData = response as any[];
        if (this.rowData.length > 0) {
          this.totalRecord = this.rowData.length;
        }
        document.getElementById("BulkemailCloseModal")?.click();
      }, error => {
        console.error('File upload error', error);
      });
    } else {
      this.toast.warning("Please select file!!", "Warning", { progressBar: true });
      return;
    }
  }

}


function setText(selector: string, text: any) {
  (document.querySelector(selector) as any).innerHTML = text;
}
function setLastButtonDisabled(disabled: boolean) {
  (document.querySelector("#btLast") as any).disabled = disabled;
}