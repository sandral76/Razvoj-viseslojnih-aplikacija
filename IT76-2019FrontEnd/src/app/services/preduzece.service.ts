import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PREDUZECE_URI } from '../constants';
import { Preduzece } from '../models/preduzece';

@Injectable({
  providedIn: 'root'
})
export class PreduzeceService {

  constructor(private httpClient:HttpClient) { }


  public getAllPreduzeces(): Observable<any>{
    return this.httpClient.get(`${PREDUZECE_URI}`)
  }



  public addPreduzece(preduzece:Preduzece): Observable<any>{
    preduzece.id=500000; //posto dodajemo id preko sekvence
    return this.httpClient.post(`${PREDUZECE_URI}`,preduzece);
  }


  public updatePreduzece(preduzece:Preduzece):Observable<any>{

    return this.httpClient.put(`${PREDUZECE_URI}`,preduzece);  
  }

  public deletePreduzece(id:number):Observable<any>{
    
    return this.httpClient.delete(`${PREDUZECE_URI}/${id}`);  
  }
}
