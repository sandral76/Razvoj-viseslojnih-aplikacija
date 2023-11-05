import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { Radnik } from 'src/app/models/radnik';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';
import { RadnikService } from 'src/app/services/radnik.service';

@Component({
  selector: 'app-radnik-dialog',
  templateUrl: './radnik-dialog.component.html',
  styleUrls: ['./radnik-dialog.component.css']
})
export class RadnikDialogComponent implements OnInit {

  public flag!: number;
  obrazovanja!: Obrazovanje[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RadnikDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Radnik,
    public radnikService: RadnikService,
    public obrazovanjeService: ObrazovanjeService) { }

  ngOnInit(): void {
    this.obrazovanjeService.getAllObrazvanjes().subscribe(
      result => {
        this.obrazovanja = result;
      }
    )
  }

  public compare(a: any, b: any) {
    return a.id == b.id;
  }

  public add() {

    this.radnikService.addRadnik(this.data).subscribe(
      //ovaj data nije isiti data kao iz konstr 
      data => {
        this.snackBar.open("Radnik: " + this.data.ime + " je uspesno dodato", "U redu", { duration: 3500 })
      }
    ),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackBar.open("Dogodila se greska", "U redu", { duration: 3500 })
      }

  }
  public update() {


    this.radnikService.updateRadnik(this.data).subscribe(
      //ovaj data nije isiti data kao iz konstr 
      data => {
        this.snackBar.open("Radnik " + this.data.ime + " je uspesno izmenjen", "U redu", { duration: 3500 })
      }
    ),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackBar.open("Dogodila se greska", "U redu", { duration: 3500 })
      }


  }
  public delete() {

    this.radnikService.deleteRadnik(this.data.id).subscribe(
      //ovaj data nije isiti data kao iz konstr 
      () => {
        this.snackBar.open("Radnik je uspesno obrisano", "U redu", { duration: 3500 })
      }
    ),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackBar.open("Dogodila se greska", "U redu", { duration: 3500 })
      }


  }

  public cancel() {
    this.dialogRef.close();
    this.snackBar.open("Odustali ste od promena", "U redu", { duration: 3500 });
  }
}
