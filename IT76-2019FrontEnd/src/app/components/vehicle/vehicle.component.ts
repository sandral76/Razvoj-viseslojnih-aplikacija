import { Component } from '@angular/core';

//dekorator(=anotacija) govori da je komponenta-osnovni gradivni blok aplikacije=prikaz, novi prikaz hocemo-pravimo novu komponentu
@Component({
  selector: 'app-vehicle', //referenca za neki drugi html fajl(index.html)
  templateUrl: './vehicle.component.html', //koji html fajl selector referencira
  styleUrls: ['./vehicle.component.css'] //koji css fajl selector referencira
})

export class VehicleComponent{


}