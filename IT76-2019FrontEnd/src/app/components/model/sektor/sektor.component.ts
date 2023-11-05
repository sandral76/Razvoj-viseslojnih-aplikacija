import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Preduzece } from 'src/app/models/preduzece';

import { Sektor } from 'src/app/models/sektor';
import { SektorService } from 'src/app/services/sektor.service';
import { SektorDialogComponent } from '../../dialogs/sektor-dialog/sektor-dialog.component';
@Component({
  selector: 'app-sektor',
  templateUrl: './sektor.component.html',
  styleUrls: ['./sektor.component.css']
})
export class SektorComponent implements OnInit {
  dataSource!: MatTableDataSource<Sektor>;
  displayedColumns = ['id', 'naziv', 'oznka', 'preduzece', 'actions'];
  subscription!: Subscription;
  selectedSektorTop!:Sektor;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;   //posmatra sadrzaj html komponente i pretrazuje html po mat sortu i kada ga pronadje popunjava vr prop sort metapodacima koji se porsledjuju mat table data s
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;


  constructor(private sektorService: SektorService,
    //matd d-prostor za prikazivanje sadrzaja
    private dialog: MatDialog) { }



  //slicno kao main,, vrsimo inicijalizaciju vr propertija
  ngOnInit(): void {

    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public select(row:Sektor){
    console.log(row);
    this.selectedSektorTop=row;
  }
  //ucitavanje podataka
  public loadData() {

    this.subscription = this.sektorService.getAllSektors().subscribe   //pretplata na servis, da imamo pristup podacima iz observable
      (data => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      (error: Error) => { console.log(error.name + " " + error.message) }

  }

  // parameteri nisu obavezni, metoda se poziva i bez njih
  public openDialog(flag: number, id?: number, naziv?: string, oznka?: string, preduzece?: Preduzece) {
    //pravimo referencu da se otvori dialog
    const dialogRef = this.dialog.open(SektorDialogComponent, { data: { id, naziv, oznka, preduzece } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == 1) {
          this.loadData();

        }
      })

  }
  public applyFilter(filter: any) {
    filter = filter.target.value;
    filter = filter.trim();
    filter = filter.toLocaleLowerCase();
    this.dataSource.filter = filter;
  }

}
