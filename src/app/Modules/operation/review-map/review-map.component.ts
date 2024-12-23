import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, GridReadyEvent, ValueFormatterParams, RowDoubleClickedEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { EmailIssueFormDto } from 'src/app/Models/EmailIssueFormDto';
import { EmailOperationGridDto } from 'src/app/Models/EmailOperationGridDto';
import { KeyValueDto } from 'src/app/Models/KeyValueDto';
import { AGGridHelper } from '../../Common/AGGridHelper';
import { HttpCommonService } from '../../Common/http-common.service';
import { MapReviewFormDto } from 'src/app/Models/MapReviewFormDto';
import { EmailMapGridDto } from 'src/app/Models/EmailMapGridDto';

@Component({
  selector: 'app-review-map',
  templateUrl: './review-map.component.html',
  styleUrls: ['./review-map.component.css']
})
export class ReviewMapComponent implements OnInit {
  
  
  private balkEmailGridApi!: GridApi;
  private taskEmailGridApi!: GridApi;
  private taskMap2EmailGridApi!: GridApi;
  passwordFieldType: string = 'password';
  recoveryFieldType: string = 'password';
  eyeIcon: string = '👁️';
  eyeIconRecovery: string = '👁️';
  public tabID =1;
  public paginationPageSize = 20;
  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData: any[] = [];

  public oMapReviewFormDto :MapReviewFormDto = new MapReviewFormDto()
  public oMapReviewFormDtoList :MapReviewFormDto[] = [];
  public oEmailIssueFormDto :EmailIssueFormDto = new EmailIssueFormDto();
  public oEmailOperationGridDtoList :EmailOperationGridDto[] = [];
  public KeyValues: KeyValueDto[] = [];
  public sEmailUserName :string = "";
  public sEmailPassword :string = "";
  public sEmailRecoveryEmail :string = "";
  public statusTag :any= "";
  public sTitle :any= "Add";
  public mailSystemId = 0;
  public mailOperationCompletionId = 0;
  public bIsEdit = false;
  public oEmailMapGridDto :EmailMapGridDto = new EmailMapGridDto();
  public oEmailMap2GridDto :EmailMapGridDto = new EmailMapGridDto();
  public oEmailMapGridDtoList :EmailMapGridDto[] = [];


  public totalRecord: number = 0;
  public bIsDisable : boolean = false;
  public nReportIssueId: number = 0;

  constructor(private service: HttpCommonService, private toast: ToastrService,private datePipe: DatePipe,
    private route: ActivatedRoute, private router: Router) {
      this.route.url.subscribe(urlSegments => {
        this.statusTag = urlSegments[urlSegments.length - 1];
    });
  }

  ngOnInit(): void {
    this.GetEmailsByOperationTag(this.statusTag);
  }

  ApiGridReady(event: GridReadyEvent) {
    this.balkEmailGridApi = event.api;
    this.balkEmailGridApi.sizeColumnsToFit();
  }
  ApiGridReadyTask(event: GridReadyEvent) {
    this.taskEmailGridApi = event.api;
    this.taskEmailGridApi.sizeColumnsToFit();
  }
  ApiGridReadyTaskMap2(event: GridReadyEvent) {
    this.taskMap2EmailGridApi = event.api;
    this.taskEmailGridApi.sizeColumnsToFit();
  }

  // Column Definitions: Defines the columns to be displayed.
  colDefs: any[] = [
    { valueGetter: "node.rowIndex + 1", headerName: '', cellStyle: { 'border-right': '0.5px solid #e9ecef' }, filter:false, width: 20, editable: false},
    { field: "mailUserName", headerName: 'Email', width:200 },
    { field: "mailOperationAssignedByFullName", headerName: 'Assign By', width:180 },
    { field: "mailOperationAssignedAt", headerName: 'Assign At',width:185, cellRenderer: (params: ValueFormatterParams) => {
      return this.datePipe.transform(params.value, 'dd MMM y, h:mm:ss a');
    }, },
    { field: 'Details', headerName: 'Details',width:100, resizable: true, cellRenderer: this.detailToGrid.bind(this) },
  ];

  colDefsTask: any[] = [
    { valueGetter: "node.rowIndex + 1", headerName: '', cellStyle: { 'border-right': '0.5px solid #e9ecef' }, filter:false, width: 20, editable: false},
    { field: "mapReviewName", headerName: 'Review Name', width:200 },
    { field: "mapReviewDetails", headerName: 'Review Details', width:180 },
    { field: "mapReviewNote", headerName: 'Note',width:185},
  ];
  colDefsReviewMap2: any[] = [
    { valueGetter: "node.rowIndex + 1", headerName: '', cellStyle: { 'border-right': '0.5px solid #e9ecef' }, filter:false, width: 20, editable: false},
    { field: "mapReviewName", headerName: 'Review Name', width:200 },
    { field: "mapReviewDetails", headerName: 'Review Details', width:180 },
    { field: "mapReviewNote", headerName: 'Note',width:185},
  ];

  detailToGrid(params: any) {
    const eDiv = document.createElement('div');
    var sDisableed = ''
    if( this.bIsDisable ){
      sDisableed =  params.data.mailOperationCompletionStatus  != 2 ? 'style= "display: None"' : ''
    }
    eDiv.innerHTML = ' <button class="btn btn-success p-0 px-1" '+sDisableed+'><i class="fa-solid fa-eye" aria-hidden="true"></i> Detail</button>'
    eDiv.addEventListener('click', () => {
      this.mailSystemId = params.data.mailSystemId;
      this.mailOperationCompletionId = params.data.mailOperationCompletionId;
      this.LoadDetails()
    });
    return eDiv;
  }
  TaskdetailToGrid(params: any) {
    const eDiv = document.createElement('div');
    eDiv.innerHTML = ' <button class="btn btn-success p-0 px-1" ><i class="fa-solid fa-eye" aria-hidden="true"></i> Detail</button>'
    eDiv.addEventListener('click', () => {
      // this.mailSystemId = params.data.mailSystemId;
      // this.mailOperationCompletionId = params.data.mailOperationCompletionId;
      // this.LoadDetails()
    });
    return eDiv;
  }
  TaskdetailToGridMap2(params: any) {
    const eDiv = document.createElement('div');
  
    eDiv.innerHTML = ' <button class="btn btn-success p-0 px-1"><i class="fa-solid fa-eye" aria-hidden="true"></i> Detail</button>'
    eDiv.addEventListener('click', () => {
      //this.LoadDetails()
    });
    return eDiv;
  }

  public RowDoubleClickTaskMap2(params: RowDoubleClickedEvent){
    this.oMapReviewFormDto =params.data;
    this.tabID = 2;
    this.bIsEdit = true;
    this.sTitle = "Update";
    this.oMapReviewFormDto =params.data;
    document.getElementById('modalOpen')?.click();
    
  }
  public RowDoubleClickTask(params: RowDoubleClickedEvent){
    this.oMapReviewFormDto =params.data;
    this.tabID = 1;
    this.bIsEdit = true;
    this.sTitle = "Update";
    this.oMapReviewFormDto =params.data;
    document.getElementById('modalOpen')?.click();
  }

  LoadDetails(){
    this.GetEmailUsername();
    this.TrackOperationStart();
    this.GetEmailMaps()
    this.sEmailUserName = "";
    this.sEmailPassword = "";
    this.sEmailRecoveryEmail = "";
    
    this.nReportIssueId = 0;
    this.eyeIcon = '👁️';
    this.eyeIconRecovery = '👁️';
  }
  AddReportIssue(){
    if(this.mailSystemId <= 0){
      this.toast.warning("Select a mail from listt!!", "Warning", { progressBar: true });
      return;
    }
    document.getElementById('reportmodalOpen')?.click();
    this.oEmailIssueFormDto =new EmailIssueFormDto();
    
  }
  onSelectionChanged(){
    this.sEmailUserName = "";
    this.sEmailPassword = "";
    this.sEmailRecoveryEmail = "";
    this.nReportIssueId = 0;
    this.eyeIcon = '👁️';
    this.eyeIconRecovery = '👁️';
    this.oEmailMapGridDto =new EmailMapGridDto();
    this.oEmailMap2GridDto =new EmailMapGridDto();
  }


  addBulkEmailBtn(nTabID:number) {
    if(this.mailSystemId <= 0){
      this.toast.warning("Select a mail from listt!!", "Warning", { progressBar: true });
      return;
    }
    this.tabID = nTabID;
    this.bIsEdit = false;
    this.sTitle = "Add";
    document.getElementById('modalOpen')?.click();
    this.oMapReviewFormDto =new MapReviewFormDto();
    if( this.tabID == 1){
    this.oMapReviewFormDto.mapClaimingId = this.oEmailMapGridDto.mapClaimingId;
    }
    else{
      this.oMapReviewFormDto.mapClaimingId = this.oEmailMap2GridDto.mapClaimingId;
    }
    
  }

  public GetEmailsByOperationTag(relatedModule: any) {
    //{{baseURL}}/EmailOperation/GetEmailsByOperationTag/{operationTag}
    this.service.Get('/EmailOperation/GetEmailsByOperationTag/' + relatedModule).subscribe((res: any) => {
      this.oEmailOperationGridDtoList = res;
      this.totalRecord =  this.oEmailOperationGridDtoList.length;
      this.bIsDisable = this.oEmailOperationGridDtoList.filter(x => x.mailOperationCompletionStatus == 2).length>4 ? true : false;
      // this.bIsDisable = this.oEmailOperationGridDtoList.find(x => x.mailOperationCompletionStatus == 2) ?  true : false;

      this.balkEmailGridApi.setRowData(this.oEmailOperationGridDtoList);
      this.balkEmailGridApi.forEachNode(node => {
        if(node.data.mailOperationCompletionStatus == 2) {
          node.setSelected(true);
        }
      })
    },
      (err: any) => {
        console.log(err);
      })
  }

  public GetEmailMaps() {
    //{{baseURL}}/EmailManagement/GetEmailMaps/{mailSystemId}
    this.oEmailMapGridDto = new EmailMapGridDto();
    this.oEmailMap2GridDto = new EmailMapGridDto();
      this.service.Get('/EmailManagement/GetEmailMaps/' +  this.mailSystemId).subscribe((res: any) => {
        this.oEmailMapGridDtoList =  res.data;
        if(this.oEmailMapGridDtoList.length > 0){
          this.oEmailMapGridDto =  this.oEmailMapGridDtoList[0];
        }
        if(this.oEmailMapGridDtoList.length > 1){
          this.oEmailMap2GridDto =  this.oEmailMapGridDtoList[1];
        }
      },
        (err: any) => {
          console.log(err);
        })
    }

  public GetEmailUsername() {
  //{{baseURL}}/EmailManagement/GetEmailUsername/{mailSystemId}
    this.service.Get('/EmailManagement/GetEmailUsername/' + this.mailSystemId +"/"+this.statusTag).subscribe((res: any) => {
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
      this.GetEmailsByOperationTag(this.statusTag);
    },
      (err: any) => {
        console.log(err);
      })
  }

  public GetEmailPassword() {
    //{{baseURL}}/EmailManagement/GetEmailUsername/{mailSystemId}
      this.service.Get('/EmailManagement/GetEmailPassword/' +  this.mailSystemId+"/"+this.statusTag).subscribe((res: any) => {
        this.sEmailPassword = res.data;
      },
        (err: any) => {
          console.log(err);
        })
    }

    //{{baseURL}}/EmailManagement/GetEmailRcoveryEmail/{mailSystemId}
  public GetEmailRcoveryEmail() {
    //{{baseURL}}/EmailManagement/GetEmailUsername/{mailSystemId}
      this.service.Get('/EmailManagement/GetEmailRecoveryMail/' +  this.mailSystemId+"/"+this.statusTag).subscribe((res: any) => {
        this.sEmailRecoveryEmail = res.data;
      },
        (err: any) => {
          console.log(err);
        })
    }

  public MapReviewSubmit(){
    this.oMapReviewFormDtoList = [];

    this.taskEmailGridApi.forEachNode(node => {
      this.oMapReviewFormDtoList.push(node.data);
    })
    if (this.oMapReviewFormDtoList.length <= 0) {
      this.toast.warning("Atleast One List Required For Map1!!", "Warning", { progressBar: true });
      return
    }
    var Map3List =[];
    this.taskMap2EmailGridApi.forEachNode(node => {
      this.oMapReviewFormDtoList.push(node.data);
      Map3List.push(node.data);
    })
    if (Map3List.length <= 0) {
      this.toast.warning("Atleast One List Required for Map2!!", "Warning", { progressBar: true });
      return
    }
    //{{baseURL}}/EmailManagement/AddMapReviews/{mailSystemId}/{mailOperationCompletionId}/{statusTag}
    this.service.Post('/EmailManagement/AddMapReviews/'+ this.mailSystemId+ "/"+ this.mailOperationCompletionId+"/" + this.statusTag, this.oMapReviewFormDtoList, true).subscribe((res: any) => {
      this.toast.success("Map Review Added Successfully!!", "Success", { progressBar: true });
      this.GetEmailsByOperationTag(this.statusTag)
      this.onSelectionChanged();
      this.rowData = [];
      this.totalRecord = 0;
    },
      (err: any) => {
        console.log(err);
        this.toast.error(err, "Error", { progressBar: true });
      })
  }

  public AddReviewIntoGrid(){
    if(this.oMapReviewFormDto.mapReviewName == ""){
      this.toast.warning("Map Review Name Required!!", "Warning", { progressBar: true });
      return
    }
    if(this.oMapReviewFormDto.mapReviewDetails == ""){
      this.toast.warning("Map Review Details Required!!", "Warning", { progressBar: true });
      return
    }
    if(this.oMapReviewFormDto.mapReviewNote == ""){
      this.toast.warning("Map Review Note Required!!", "Warning", { progressBar: true });
      return
    }
    
    if (this.tabID == 1) {
      if(this.bIsEdit){
        this.taskEmailGridApi.applyTransaction({ update: [this.oMapReviewFormDto] })  
      }
      else{
        this.taskEmailGridApi.applyTransaction({ add: [this.oMapReviewFormDto] })
      }
      
    } else {
      if(this.bIsEdit){
        this.taskMap2EmailGridApi.applyTransaction({ update: [this.oMapReviewFormDto] })
      }
      else{
        this.taskMap2EmailGridApi.applyTransaction({ add: [this.oMapReviewFormDto] })
      }      
    }
    document.getElementById("BulkemailCloseModal")?.click();
  }
  public DeleteReviewIntoGrid(){
    if (this.tabID == 1) {
      this.taskEmailGridApi.applyTransaction({ remove: [this.oMapReviewFormDto] })
    } else {
      this.taskMap2EmailGridApi.applyTransaction({ remove: [this.oMapReviewFormDto] })
    }
  }

  public ReportMailIssue(){

    this.oEmailIssueFormDto.mailSystemId = this.mailSystemId;
    if(this.oEmailIssueFormDto.mailIssueId ==  -1 ){
      this.toast.warning("Please Select An Issue!!", "Warning", { progressBar: true });
      return;
    }

    if(this.oEmailIssueFormDto.mailIssueId == 0) {
      if(this.oEmailIssueFormDto.mailIssueNote ==  "" ){
        this.toast.warning("Custom issue note required!!", "Warning", { progressBar: true });
        return;
      }
    }

    //{{baseURL}}/EmailOperation/ReportMailIssue
    this.service.Post('/EmailOperation/ReportMailIssue/'+this.statusTag, this.oEmailIssueFormDto, true).subscribe((res: any) => {
      this.toast.success("Mail Report Issue  Successfully!!", "Success", { progressBar: true });
      this.rowData = [];
      this.totalRecord = 0;
      document.getElementById("reportCloseModal")?.click();
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


