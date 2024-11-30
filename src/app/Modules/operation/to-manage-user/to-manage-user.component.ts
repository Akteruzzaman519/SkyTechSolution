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
  public statusType: string = "1";
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
    { field: "statusName", headerName: 'Status' },
  ];

  public GetUserCategoriesInKeyValue() {
    this.service.Get('/KeyValue/GetUserCategoriesInKeyValue').subscribe((res: any) => {
      this.categoryList = res;
      if (this.categoryList.length > 0) {
        this.category = this.categoryList[0].key;

      }
      this.categoryModalList = res;
      this.GetData();
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
  AddNewUser() {
    this.oUserFormGeneralDto = new UserFormGeneralDto();
  }

  onSelectionChanged(event: any) {
    const selectedData = AGGridHelper.GetSelectedRow(this.userManageGridApi);
    this.oUserFormGeneralDto = new UserFormGeneralDto();
    this.oUserFormGeneralDto.userSystemId = Number(selectedData?.userSystemId);
    this.oUserFormGeneralDto.userFirstName = selectedData?.userFirstName == undefined ? '' : selectedData?.userFirstName;
    this.oUserFormGeneralDto.userLastName = selectedData?.userLastName == undefined ? '' : selectedData?.userLastName;
    this.oUserFormGeneralDto.userCategoryId = Number(selectedData?.userCategoryId == undefined ? '' : selectedData?.userCategoryId);
    this.oUserFormGeneralDto.userActiveStatus = Number(selectedData.userActiveStatus);
    this.oUserFormGeneralDto.userName = selectedData.userName;
    this.oUserFormGeneralDto.userPassword = selectedData.userPassword;
  }
  UpdateUser() {
    this.ManaageGeneralUser();
  }

  public ManaageGeneralUser() {

    if (this.oUserFormGeneralDto.userFirstName == "") {
      this.toast.warning("Enter first name","Warning!!",{progressBar:true});
      return;
    }
    if (this.oUserFormGeneralDto.userLastName == "") {
      this.toast.warning("Enter last name","Warning!!",{progressBar:true});
      return;
    }
    if (this.oUserFormGeneralDto.userCategoryId ==0) {
      this.toast.warning("Please select category","Warning!!",{progressBar:true});
      return;
    }

    if (this.oUserFormGeneralDto.userName == "") {
      this.toast.warning("Enter user name","Warning!!",{progressBar:true});
      return;
    }
    if (this.oUserFormGeneralDto.userPassword == "") {
      this.toast.warning("Enter user password","Warning!!",{progressBar:true});
      return;
    }

    this.service.Post('/User/ManaageGeneralUser', this.oUserFormGeneralDto, true).subscribe((res: any) => {
      this.toast.success("Data" + (this.oUserFormGeneralDto.userSystemId == 0 ? ' Save' : ' Update') + " Successfully!!", "Success", { progressBar: true });
      this.oUserFormGeneralDto = new UserFormGeneralDto();
      this.GetData();
    },
      (err: any) => {
        console.log(err);
      })
  }


  public GetData() {
    this.service.Get("/User/GetUsers/" + this.category + "/" + this.statusType).subscribe(response => {
      this.rowData = response as any[];
      this.rowData = (response as any[]).map(item => ({
        ...item, // spread existing properties
        statusName: item.userActiveStatus == 1 ? 'Yes' : 'No' // add a new property with a default value
      }));
      this.oUserFormGeneralDto = new UserFormGeneralDto();
    }, error => {
      console.log(error);
    });
  }


}