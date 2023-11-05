import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { AutomobilComponent } from './components/example-components/automobil/automobil.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ObrazovanjeComponent } from './components/model/obrazovanje/obrazovanje.component';
import { PreduzeceComponent } from './components/model/preduzece/preduzece.component';
import { SektorComponent } from './components/model/sektor/sektor.component';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { HomeComponent } from './components/core/home/home.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import { ObrazovanjeDialogComponent } from './components/dialogs/obrazovanje-dialog/obrazovanje-dialog.component';
import {MatSnackBarModule} from  '@angular/material/snack-bar'
import {MatDialogModule} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { SektorDialogComponent } from './components/dialogs/sektor-dialog/sektor-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { PreduzeceDialogComponent } from './components/dialogs/preduzece-dialog/preduzece-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RadnikComponent } from './components/model/radnik/radnik.component';
import { RadnikDialogComponent } from './components/dialogs/radnik-dialog/radnik-dialog.component';




//u okviru jednog moduka mozemo imati neogranicen br kompnt, organizaciona jedinica koja ima daodtne funkcionalnosti
@NgModule({
  
  declarations: [ //sve komponente koje pripadaju modulu
    AppComponent,
    AutomobilComponent,
    ObrazovanjeComponent,
    PreduzeceComponent,
    SektorComponent,
    AboutComponent,
    AuthorComponent,
    HomeComponent,
    ObrazovanjeDialogComponent,
    PreduzeceDialogComponent,
    SektorDialogComponent,
    RadnikComponent,
    RadnikDialogComponent,
   
  ],
  imports: [ // omogucavanje koriscenja fukncionalnosti jedne komponete u okviru druge
    BrowserModule, //modul koji omogucava prikazivanje sadrzaja na browseru
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    HttpClientModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatSortModule,
    MatPaginatorModule
   ],
  providers: [], //sluzi da kazemo koju klasu zelimo da injektujemo(u Springu je to autowired)
  bootstrap: [AppComponent] //komonnte koje se nalaze ovde ce se takodje pokrenuti
})
export class AppModule { }
