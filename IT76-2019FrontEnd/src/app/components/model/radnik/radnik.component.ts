import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { Radnik } from 'src/app/models/radnik';
import { Sektor } from 'src/app/models/sektor';
import { RadnikService } from 'src/app/services/radnik.service';
import { RadnikDialogComponent } from '../../dialogs/radnik-dialog/radnik-dialog.component';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit, OnChanges {


  displayedColumns = ['id', 'brojLk', 'ime', 'prezime', 'obrazovanje', 'actions'];
  dataSource!: MatTableDataSource<Radnik>;
  subscription!: Subscription;
  @Input() selectedSektorBottom!: Sektor;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;   //posmatra sadrzaj html komponente i pretrazuje html po mat sortu i kada ga pronadje popunjava vr prop sort metapodacima koji se porsledjuju mat table data s
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private radnikService: RadnikService,
    private dialog: MatDialog) { }
  
  
    ngOnChanges(): void {
    this.loadData();
  }
  

  ngOnInit(): void {
    this.loadData();
  }
  public loadData() {
    this.subscription = this.radnikService.
      getRadnikBySektor(this.selectedSektorBottom.id).subscribe
      (data => { this.dataSource = new MatTableDataSource(data) }),
      (error: Error) => { console.log(error.name + " " + error.message) }
  }

  public openDialog(flag: number, id?: number, brojLk?: number, ime?: string, prezime?: string, obrazovanje?:Obrazovanje) {
    const dialogRef = this.dialog.open(RadnikDialogComponent, { data: { id, brojLk, ime, prezime, obrazovanje } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.componentInstance.data.sektor = this.selectedSektorBottom
    dialogRef.afterClosed().subscribe(result => {
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
