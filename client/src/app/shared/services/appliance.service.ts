import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IAppliance} from '../models/appliance.model'


@Injectable({
  providedIn: 'root'
})
export class ApplianceService {
  
  API_URL: string = "http://localhost:5000";
  private applianceUri = '/api/appliances';

  constructor(private http: HttpClient) { }

  getAppliances(): Observable<IAppliance[]> {
    return this.http.get<IAppliance[]>(this.API_URL + this.applianceUri)
  }

  postAppliance(appliance) {
    return this.http.post<any>(this.API_URL + this.applianceUri, appliance, {  
        reportProgress: true,
        observe: 'events'  
      });
  }

  putAppliance(appliance: IAppliance) {
    var url = this.API_URL + this.applianceUri + '/' + appliance.appliance_id;
    return this.http.put(url, appliance, {
        reportProgress: true,
        observe: 'events'
      });
  }

  deleteAppliance(appliance) {
    return this.http.delete<any>(this.API_URL + this.applianceUri + '/' + appliance.appliance_id, {  
        reportProgress: true,
        observe: 'events'  
      });
  }

  retrieveApplianceReport(applianceFilter) {
    const headers = new HttpHeaders();
    return this.http.post<any>(this.API_URL + this.applianceUri + '/reports', 
    applianceFilter,
    {headers,  responseType: 'blob' as 'json'}).subscribe(
      (response: any) =>{
          let dataType = "text/html";
          let binaryData = [];
          binaryData.push(response);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          downloadLink.setAttribute('download', "appliance-report.html");
          document.body.appendChild(downloadLink);
          downloadLink.click();
      });
  }
}
