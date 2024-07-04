import { Component } from '@angular/core';
import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { EmailBaseInfo } from 'src/app/Models/EmailBaseInfo';
import { EmailFormDto } from 'src/app/Models/EmailFormDto';
import { KeyValueDto } from 'src/app/Models/KeyValueDto';
import { AGGridHelper } from '../../Common/AGGridHelper';
import { HttpCommonService } from '../../Common/http-common.service';

@Component({
  selector: 'app-email-upload',
  templateUrl: './email-upload.component.html',
  styleUrls: ['./email-upload.component.css']
})
export class EmailUploadComponent {


  selectedFile: File | null = null;
  private balkEmailGridApi!: GridApi;
  public paginationPageSize = 20;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData: any[] = [];
  public KeyValues: KeyValueDto[] = [];

  // Oobject Initialization 
  public oEmailFormDto = new EmailFormDto();
  public oEmailBaseInfos: EmailBaseInfo[] = [];
  public totalRecord:number = 0;

  constructor(private service: HttpCommonService) { }

  ApiGridReady(event: GridReadyEvent) {
    this.balkEmailGridApi = event.api;
    this.balkEmailGridApi.sizeColumnsToFit();
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: any[] = [
    { field: "UserName", headerName: 'Email' },
    { field: "Password", HeaderName: 'Password' },
    { field: "RecoveryMail", HeaderName: 'Password' },
    { field: "SourcingName", HeaderName: 'Source' }
  ];

  addBulkEmailBtn() {
    document.getElementById('modalOpen')?.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  public GetSourcesInKeyValue(relatedModule: any) {
    this.oEmailBaseInfos = AGGridHelper.GetRows(this.balkEmailGridApi);
    this.oEmailFormDto.mailBaseInfoList = this.oEmailBaseInfos;
    this.service.Get('KeyValue/GetSourcesInKeyValue/' + relatedModule).subscribe((res: any) => {
      this.KeyValues = res;
    },
      (err: any) => {
        console.log(err);
      })
  }

  public BulkEmailSave() {
    this.oEmailBaseInfos = AGGridHelper.GetRows(this.balkEmailGridApi);
    this.oEmailFormDto.mailBaseInfoList = this.oEmailBaseInfos;
    this.service.Post('EmailOperation/AddFreshEmails', this.oEmailFormDto, true).subscribe((res: any) => {
      this.rowData = [];
    },
      (err: any) => {
        console.log(err);
      })
  }


  public BulkEmailLoadData() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.service.UploadFile('MailInfo/ExcelFileReader', formData).subscribe(response => {
        this.rowData = response as any[]
        document.getElementById("BulkemailCloseModal")?.click();
      }, error => {
        console.error('File upload error', error);
      });
    }
  }

}
