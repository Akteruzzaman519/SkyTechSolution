import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'shared/models/menu.model';
import { CommonService } from 'shared/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class HttpCommonService extends CommonService {

  //over all gets 
  Get(URL: string, loadingIndegator?: boolean, loadingMessage?: string): Observable<any[]> {
    var token = localStorage.getItem('jwtToken');
    let options;
    if (loadingIndegator) {
      let message = "Loading Data ";
      if (loadingMessage) message += loadingMessage;

      options = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          'Show-Loader': 'true',
          'Loading-Message': message,
          Authorization: `Bearer ${token}`
        })
      };
    } else {
      options = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        })
      };
    }
    return this.http.get<any>(this.apiBaseUrl + URL, options);
  }

  getPaymentType(paymentType: number): string {
    let paymentTypeD = "";

    if (paymentType == 1) {
      paymentTypeD = "Cash"
    } else if (paymentType == 2) {
      paymentTypeD = "Pay"
    }
    else if (paymentType == 3) {
      paymentTypeD = "Credit"
    } else if (paymentType == 4) {
      paymentTypeD = "VAT";
    }
    return paymentTypeD;
  }

  /// over all post
  Post(URL: string, object: any, loadingIndegator?: boolean, loadingMessage?: string): Observable<any[]> {
    var token = localStorage.getItem('jwtToken');
    let options;
    if (loadingIndegator) {
      let message = "Loading Data";
      if (loadingMessage) message += loadingMessage;

      options = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        })
      };
    } else {
      let message = "Loading Data";
      options = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          'Show-Loader': 'true',
          'Loading-Message': message,
          Authorization: `Bearer ${token}`
        })
      };
    }
    return this.http.post<any>(this.apiBaseUrl + URL, object, options);
  }

  /// over all Put
  Put(URL: string, object: any, loadingIndegator?: boolean, loadingMessage?: string): Observable<any[]> {
    var token = localStorage.getItem('jwtToken');
    let options;
    if (loadingIndegator) {
      let message = "Loading ";
      if (loadingMessage) message += loadingMessage;

      options = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          'Show-Loader': 'true',
          'Loading-Message': message,
        })
      };
    } else {
      options = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        })
      };
    }
    return this.http.put<any>(this.apiBaseUrl + URL, object, options);
  }



  UploadFile(URL:string,fromdata: FormData) {
    var token = localStorage.getItem('accesstoken');
    // 'Content-type': 'multipart/form-data',
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    }
    return this.http.post(this.apiBaseUrl + URL, fromdata, { headers: new HttpHeaders({ 'Show-Loader': 'true' }) });
  }

  FileDownloadPost(URL: string, object: any, loadingIndegator?: boolean, loadingMessage?: string): Observable<any[]> {
    var token = localStorage.getItem('accesstoken');
    let options;
    if (loadingIndegator) {
      let message = "Loading ";
      if (loadingMessage) message += loadingMessage;

      options = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          'Show-Loader': 'true',
          'Loading-Message': message,
          Authorization: `Bearer ${token}`
        }),
        responseType: 'blob' as 'json'
      };
    } else {
      options = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }),
        responseType: 'blob' as 'json'
      };
    }
    return this.http.post<any>(this.apiBaseUrl + URL, object, options);
  }

  downloadFileByName(url: string) {
    const httpOptions = {
      observe: 'response' as 'response',
      responseType: 'blob' as 'json'
    };
    return this.http.get<any>(this.apiBaseUrl + url, httpOptions);
  }

  getRandomNumber() {
    return Math.floor(Math.random() * (200 - 1 + 1) + 1);
  }

  SampleFileDownload() {
    this.http.get("./assets/Upload_Fresh_Email_Sample.xlsx", { responseType: "blob" }).subscribe((res: Blob) => {
      this.saveExcelFile(res);
    });
  }
  private saveExcelFile(blob: Blob) {
    const fileName = 'Upload_Fresh_Email_Sample.xlsx'; // Replace with the filename you set in the Web API response
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href); // Clean up the object URL
  }


  IsFullPermission(){
   var oTempMenu :Menu ;
    var tempstring = localStorage.getItem("menuPermission") == null ? "" : localStorage.getItem("menuPermission");
    if (tempstring) {
      oTempMenu = JSON.parse(tempstring);
      if(oTempMenu.MenuPermission == "R,W,D"){
        return true;
      }
      else{
        return false;
      }
    }
    return false
  }

}
