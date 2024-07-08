import { Component, OnInit } from '@angular/core';
import { HttpCommonService } from '../../Common/http-common.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AGGridHelper } from '../../Common/AGGridHelper';
import { VMailLifecycleDto } from 'src/app/Models/VMailLifecycleDto';
import { VActivityHistoryDto } from 'src/app/Models/VActivityHistoryDto';

@Component({
  selector: 'app-report-mail-history',
  templateUrl: './report-mail-history.component.html',
  styleUrls: ['./report-mail-history.component.css']
})
export class ReportMailHistoryComponent implements OnInit {

  mailSystemId: number = 2;
  search: string = "";

  public oVMailLifecycleDtoList: VMailLifecycleDto[] = [
    {
      lifecycleName: "Peding",
      mailLifecycleNote: "dfafadf note here data test data",
      mailLifecycleDatetime: new Date(),
      mailLifecycleOccuredByUniqueCode: "UUUHHT!@",
      mailLifecycleOccuredByFullName: " Full Name"
    },
    {
      lifecycleName: "Peding",
      mailLifecycleNote: "dfafadf note here data test data",
      mailLifecycleDatetime: new Date(),
      mailLifecycleOccuredByUniqueCode: "UUUHHT!@",
      mailLifecycleOccuredByFullName: " Full Name"
    },
    {
      lifecycleName: "Peding",
      mailLifecycleNote: "dfafadf note here data test data",
      mailLifecycleDatetime: new Date(),
      mailLifecycleOccuredByUniqueCode: "UUUHHT!@",
      mailLifecycleOccuredByFullName: " Full Name"
    },
    {
      lifecycleName: "Peding",
      mailLifecycleNote: "dfafadf note here data test data",
      mailLifecycleDatetime: new Date(),
      mailLifecycleOccuredByUniqueCode: "UUUHHT!@",
      mailLifecycleOccuredByFullName: " Full Name"
    },
  ]
  public oVActivityHistoryDtoList: VActivityHistoryDto[] = [
    {
      activityRelatedMailId: 0,
      activityByUniqueCode: "IUOIUOIfdlkf",
      activityByFullName: "Status",
      activityName: "Test name",
      activityNote: "note data here to do well in the",
      activityAt: new Date()
    },
    {
      activityRelatedMailId: 0,
      activityByUniqueCode: "IUOIUOIfdlkf",
      activityByFullName: "Status",
      activityName: "Test name",
      activityNote: "note data here to do well in the",
      activityAt: new Date()
    },
    {
      activityRelatedMailId: 0,
      activityByUniqueCode: "IUOIUOIfdlkf",
      activityByFullName: "Status q",
      activityName: "Test name d",
      activityNote: "note data here to do well in the",
      activityAt: new Date()
    }
  ]
  constructor(private httpServices: HttpCommonService) { }


  ngOnInit(): void {
    this.GetMailLifecycleHistory();
    this.GetMailActivityHistory();
  }


  GetMailLifecycleHistory() {
    this.httpServices.Get("/EmailReport/GetMailLifecycleHistory/" + this.mailSystemId).subscribe(
      (res: any) => {
        this.oVMailLifecycleDtoList = res;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  GetMailActivityHistory() {
    this.httpServices.Get("/EmailReport/GetMailActivityHistory/" + this.mailSystemId).subscribe(
      (res: any) => {
        this.oVActivityHistoryDtoList = res;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  searchEmail() {
    this.GetMailLifecycleHistory();
    this.GetMailActivityHistory();
  }


}
