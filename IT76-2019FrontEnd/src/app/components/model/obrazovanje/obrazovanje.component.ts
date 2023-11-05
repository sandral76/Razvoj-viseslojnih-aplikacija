import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';
import { ObrazovanjeDialogComponent } from '../../dialogs/obrazovanje-dialog/obrazovanje-dialog.component';


@Component({
  selector: 'app-obrazovanje',
  templateUrl: './obrazovanje.component.html',
  styleUrls: ['./obrazovanje.component.css']
})
export class ObrazovanjeComponent implements OnInit, OnDestroy {

  dataSource!: MatTableDataSource<Obrazovanje>;
  displayedColumns = ['id', 'naziv', 'opis', 'stepenStrucneSpreme', 'actions'];
  subscription!: Subscription;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;   //posmatra sadrzaj html komponente i pretrazuje html po mat sortu i kada ga pronadje popunjava vr prop sort metapodacima koji se porsledjuju mat table data s
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  constructor(private obrazovanjeService: ObrazovanjeService,
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

    this.subscription = this.obrazovanjeService.getAllObrazvanjes().subscribe   //pretplata na servis, da imamo pristup podacima iz observable
      (data => {
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }),
      (error: Error) => { console.log(error.name + " " + error.message) }

  }
  // parameteri nisu obavezni, metoda se poziva i bez njih
  public openDialog(flag: number, id?: number, naziv?: string, opis?: string, stepenStrucneSpreme?: string) {
    //pravimo referencu da se otvori dialog
    const dialogRef = this.dialog.open(ObrazovanjeDialogComponent, { data: { id, naziv, opis, stepenStrucneSpreme}});
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
