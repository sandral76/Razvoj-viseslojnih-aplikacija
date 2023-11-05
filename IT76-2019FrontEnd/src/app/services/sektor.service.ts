import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SEKTOR_URI } from '../constants';
import { Sektor } from '../models/sektor';

@Injectable({
  providedIn: 'root'
})
export class SektorService {

  constructor(private httpClient:HttpClient) { }


  public getAllSektors(): Observable<any>{
    return this.httpClient.get(`${SEKTOR_URI}`)
  }



  public addSektor(sektor:Sektor): Observable<any>{
    sektor.id=500000; //posto dodajemo id preko sekvence
    return this.httpClient.post(`${SEKTOR_URI}`,sektor);
  }


  public updateSektor(sektor:Sektor):Observable<any>{

    return this.httpClient.put(`${SEKTOR_URI}`,sektor);  
  }

  public deleteSektor(id:number):Observable<any>{
    
    return this.httpClient.delete(`${SEKTOR_URI}/${id}`);  
  }
}

