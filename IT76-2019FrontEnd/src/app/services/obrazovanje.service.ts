import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OBRAZOVANJE_URI } from '../constants';
import { Obrazovanje } from '../models/obrazovanje';

//servisi-da mozemo da saljemo zahteve

//karakteristican za servise, da injektujemo zavisnost
@Injectable({
  providedIn: 'root'
})
export class ObrazovanjeService {

  //u konst vrsimo injekciju zavisnosti
  constructor(private httpClient:HttpClient) { }


  public getAllObrazvanjes(): Observable<any>{
    return this.httpClient.get(`${OBRAZOVANJE_URI}`)
  }



  public addObrazovanje(obrazovanje:Obrazovanje): Observable<any>{
    obrazovanje.id=500000; //posto dodajemo id preko sekvence
    return this.httpClient.post(`${OBRAZOVANJE_URI}`,obrazovanje);
  }


  public updateObrazovanje(obrazovanje:Obrazovanje):Observable<any>{

    return this.httpClient.put(`${OBRAZOVANJE_URI}`,obrazovanje);  
  }

  public deleteObrazovanje(id:number):Observable<any>{
    
    return this.httpClient.delete(`${OBRAZOVANJE_URI}/${id}`);  
  }
}
