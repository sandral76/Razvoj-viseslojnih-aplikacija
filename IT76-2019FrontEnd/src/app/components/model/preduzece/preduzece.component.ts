import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Preduzece } from 'src/app/models/preduzece';
import { PreduzeceService } from 'src/app/services/preduzece.service';
import { PreduzeceDialogComponent } from '../../dialogs/preduzece-dialog/preduzece-dialog.component';

@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<Preduzece>;
  displayedColumns = ['id', 'naziv', 'opis', 'pib', 'sediste', 'actions'];
  subscription!: Subscription;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;   //posmatra sadrzaj html komponente i pretrazuje html po mat sortu i kada ga pronadje popunjava vr prop sort metapodacima koji se porsledjuju mat table data s
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private preduzeceService: PreduzeceService,
    //matd d-prostor za prikazivanje sadrzaja
    private dialog: MatDialog) { }



  //slicno kao main,, vrsimo inicijalizaciju vr propertija
  ngOnInit(): void {

    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  //ucitavanje podataka
  public loadData() {

    this.subscription = this.preduzeceService.getAllPreduzeces().subscribe   //pretplata na servis, da imamo pristup podacima iz observable
      (data => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      (error: Error) => { console.log(error.name + " " + error.message) }

  }


  // parameteri nisu obavezni, metoda se poziva i bez njih
  public openDialog(flag: number, id?: number, naziv?: string, opis?: string, pib?: number, sediste?: string) {
    //pravimo referencu da se otvori dialog
    const dialogRef = this.dialog.open(PreduzeceDialogComponent, {data:{ id, naziv, opis, pib, sediste}});
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == 1) 
        {
          this.loadData();
        }
      }
    )
  }

  public applyFilter(filter: any) {
    filter = filter.target.value;
    filter = filter.trim();
    filter = filter.toLocaleLowerCase();
    this.dataSource.filter = filter;
  }
}
