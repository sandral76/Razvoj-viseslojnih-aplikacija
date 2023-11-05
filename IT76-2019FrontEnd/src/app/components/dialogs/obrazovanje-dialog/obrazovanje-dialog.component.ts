//ova komponenta predstavlja sadrzaj dialoga

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';

@Component({
  selector: 'app-obrazovanje-dialog',
  templateUrl: './obrazovanje-dialog.component.html',
  styleUrls: ['./obrazovanje-dialog.component.css']
})
export class ObrazovanjeDialogComponent implements OnInit {

public  flag!: number;

  constructor(private snackaBar: MatSnackBar,  //u cosku ekrana kad se nesto iszvrsi iskacuca poruka, npr Email snet/izbrisan
    public dialogRef: MatDialogRef<ObrazovanjeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Obrazovanje,  //podaci iz forme dobijaju se odavde, vrsi se injekcija u property data, i data sa prosledjuje
    private obrazovanjeService: ObrazovanjeService) {


  }

  ngOnInit(): void {
  }
  //saljemo post request kada zelimo da dodamo nesto 
  public add() {

    this.obrazovanjeService.addObrazovanje(this.data).subscribe(
      //ovaj data nije isiti data kao iz konstr 
      data => {
        this.snackaBar.open("Obrazovanje: " + this.data.naziv + " je uspesno dodato", "U redu", { duration: 3500 })
      }
    ),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackaBar.open("Dogodila se greska", "U redu", { duration: 3500 })
      }
     
  }   
   //saljemo post request kada zelimo da izmenimo nesto 
  public update() {


    this.obrazovanjeService.updateObrazovanje(this.data).subscribe(
      //ovaj data nije isiti data kao iz konstr 
      data => {
        this.snackaBar.open("Obrazovanje: " + this.data.naziv + " je uspesno izmenjen", "U redu", { duration: 3500 })
      }
    ),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackaBar.open("Dogodila se greska", "U redu", { duration: 3500 })
      }
     

  }
    //saljemo post request kada zelimo da izbrisemo nesto 
  public delete() {

    this.obrazovanjeService.deleteObrazovanje(this.data.id).subscribe(
      //ovaj data nije isiti data kao iz konstr 
      ()=> {
        this.snackaBar.open("Obrazovanje je uspesno obrisano", "U redu", { duration: 3500 })
      }
    ),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackaBar.open("Dogodila se greska", "U redu", { duration: 3500 })
      }
     

  }

  public cancel() {
    this.dialogRef.close();
    this.snackaBar.open("Odustali ste od izmena","U redu",{duration:35000});

  }

}
