import { Component } from '@angular/core';

//dekorator(=anotacija) govori da je komponenta-osnovni gradivni blok aplikacije=prikaz, novi prikaz hocemo-pravimo novu komponentu
@Component({
  selector: 'app-root', //referenca za neki drugi html fajl(index.html) !!!
  templateUrl: './app.component.html', //koji html fajl selector referencira
  styleUrls: ['./app.component.css'] //koji css fajl selector referencira
})
export class AppComponent {
  title = 'IT76-2019FrontEnd';
}
