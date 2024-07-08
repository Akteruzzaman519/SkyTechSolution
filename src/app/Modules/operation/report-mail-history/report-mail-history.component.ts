import { Component, OnInit } from '@angular/core';
import { HttpCommonService } from '../../Common/http-common.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AGGridHelper } from '../../Common/AGGridHelper';
import { VMailLifecycleDto } from 'src/app/Models/VMailLifecycleDto';
import { VActivityHistoryDto } from 'src/app/Models/VActivityHistoryDto';
import { EmailOptimizedDto } from 'src/app/Models/EmailOptimizedDto';

@Component({
  selector: 'app-report-mail-history',
  templateUrl: './report-mail-history.component.html',
  styleUrls: ['./report-mail-history.component.css']
})
export class ReportMailHistoryComponent implements OnInit {

  mailSystemId: number = 2;
  search: string = "";
  oEmailOptimizedDto = new EmailOptimizedDto();

  public oVMailLifecycleDtoList: VMailLifecycleDto[] = []
  public oVActivityHistoryDtoList: VActivityHistoryDto[] = []
  constructor(private httpServices: HttpCommonService) { }


  ngOnInit(): void {
    this.GetMailLifecycleHistory();
    this.GetMailActivityHistory();
  }


  GetMailLifecycleHistory() {
    this.httpServices.Get("/EmailReport/GetMailLifecycleHistory/" + this.search).subscribe(
      (res: any) => {
        this.oVMailLifecycleDtoList = res;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }
  
  GetMailBySearch() {
    this.httpServices.Post("/EmailReport/GetMailBySearch", this.oEmailOptimizedDto).subscribe(
      (res: any) => {
        // this.oVMailLifecycleDtoList = res;
      },
      (err: any) => {
        console.log(err);
      }
    )
  }

  GetMailActivityHistory() {
    this.httpServices.Get("/EmailReport/GetMailActivityHistory/" + this.search).subscribe(
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
