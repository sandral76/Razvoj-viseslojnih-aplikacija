import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {RADNIK_BY_SEKTOR_URI, RADNIK_URI } from '../constants';
import { Radnik } from '../models/radnik';

@Injectable({
  providedIn: 'root'
})
export class RadnikService {

  constructor(private httpClient:HttpClient) { }


  public getRadnikBySektor(sektor:number):Observable<any>{
    return this.httpClient.get(`${RADNIK_BY_SEKTOR_URI}/${sektor}`);
  }

  public getAllRadnik(): Observable<any>{
    return this.httpClient.get(`${RADNIK_URI}`)
  }

  public addRadnik(radnik:Radnik): Observable<any>{
    radnik.id=500000; //posto dodajemo id preko sekvence
    return this.httpClient.post(`${RADNIK_URI}`,radnik);
  }


  public updateRadnik(radnik:Radnik):Observable<any>{

    return this.httpClient.put(`${RADNIK_URI}`,radnik);  
  }

  public deleteRadnik(id:number):Observable<any>{
    
    return this.httpClient.delete(`${RADNIK_URI}/${id}`);  
  }
}

