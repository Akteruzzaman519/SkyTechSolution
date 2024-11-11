import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridApi, PaginationNumberFormatterParams, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { EmailBaseInfo } from 'src/app/Models/EmailBaseInfo';
import { EmailFormDto } from 'src/app/Models/EmailFormDto';
import { KeyValueDto } from 'src/app/Models/KeyValueDto';
import { AGGridHelper } from '../../Common/AGGridHelper';
import { HttpCommonService } from '../../Common/http-common.service';
import { UserFormGeneralDto } from 'src/app/Models/UserFormGeneralDto';

@Component({
  selector: 'app-to-manage-user',
  templateUrl: './to-manage-user.component.html',
  styleUrls: ['./to-manage-user.component.css']
})
export class ToManageUserComponent implements OnInit {

  private userManageGridApi!: GridApi;
  public paginationPageSize = 1000;

  public themeClass: string =
    "ag-theme-quartz";
  public paginationNumberFormatter: (
    params: PaginationNumberFormatterParams,
  ) => string = (params: PaginationNumberFormatterParams) => {
    return "[" + params.value.toLocaleString() + "]";
  };

  public DeafultCol = AGGridHelper.DeafultCol;
  public rowData: any[] = [];

  public oUserFormGeneralDto = new UserFormGeneralDto();
  public statusType: string = "";
  public category: string = "";
  public categoryList: any[] = [];
  public categoryModalList: any[] = [];

  @ViewChild('fileInput') fileUpload: any;

  constructor(private service: HttpCommonService, private toast: ToastrService) {
  }
  ngOnInit(): void {
    this.GetUserCategoriesInKeyValue();
  }


  ApiGridReady(event: GridReadyEvent) {
    this.userManageGridApi = event.api;
    this.userManageGridApi.sizeColumnsToFit();
  }

  colDefs: any[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'SL', width: 100 },
    { field: "userFullName", headerName: 'Full Name' },
    { field: "userCategoryName", headerName: 'Category' },
    { field: "userActiveStatus", headerName: 'Status' },
  ];

  public GetUserCategoriesInKeyValue() {
    this.service.Get('/KeyValue/GetUserCategoriesInKeyValue').subscribe((res: any) => {
      this.categoryList = res;
      this.categoryModalList = res;
    },
      (err: any) => {
        console.log(err);
      })
  }


  ChangeStatus() {
    this.GetData();
  }

  AddUser() {
    this.ManaageGeneralUser();
  }

  UpdateUser() {
    this.ManaageGeneralUser();
  }

  public ManaageGeneralUser() {
    this.service.Post('/User/ManaageGeneralUser', this.oUserFormGeneralDto, true).subscribe((res: any) => {
      this.toast.success("Data" + (this.oUserFormGeneralDto.userSystemId == 0 ? ' Save' : ' Update') + " Successfully!!", "Success", { progressBar: true });
      this.oUserFormGeneralDto = new UserFormGeneralDto();
    },
      (err: any) => {
        console.log(err);
      })
  }


  public GetData() {
    this.service.Get("/User/GetUsers/" + this.category + "/" + this.statusType).subscribe(response => {
      this.rowData = response as any[];
      this.oUserFormGeneralDto = new UserFormGeneralDto();
    }, error => {
      console.log(error);
    });
  }


}