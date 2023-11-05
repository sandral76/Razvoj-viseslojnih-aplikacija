import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Preduzece } from 'src/app/models/preduzece';
import { PreduzeceService } from 'src/app/services/preduzece.service';

@Component({
  selector: 'app-preduzece-dialog',
  templateUrl: './preduzece-dialog.component.html',
  styleUrls: ['./preduzece-dialog.component.css']
})
export class PreduzeceDialogComponent implements OnInit {

  public  flag!: number;

  constructor(private snackaBar: MatSnackBar,  //u cosku ekrana kad se nesto iszvrsi iskacuca poruka, npr Email snet/izbrisan
    public dialogRef: MatDialogRef<PreduzeceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Preduzece,  //podaci iz forme dobijaju se odavde, vrsi se injekcija u property data, i data sa prosledjuje
    private preduzeceService: PreduzeceService) {


  }

  ngOnInit(): void {
  }
  //saljemo post request kada zelimo da dodamo nesto 
  public add() {

    this.preduzeceService.addPreduzece(this.data).subscribe(
      //ovaj data nije isiti data kao iz konstr 
      data => {
        this.snackaBar.open("Preduzece: " + this.data.naziv + " je uspesno dodato", "U redu", { duration: 3500 })
      }
    ),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackaBar.open("Dogodila se greska", "U redu", { duration: 3500 })
      }
     
  }   
   //saljemo post request kada zelimo da izmenimo nesto 
  public update() {


    this.preduzeceService.updatePreduzece(this.data).subscribe(
      //ovaj data nije isiti data kao iz konstr 
      data => {
        this.snackaBar.open("Preduzece: " + this.data.naziv + " je uspesno izmenjen", "U redu", { duration: 3500 })
      }
    ),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackaBar.open("Dogodila se greska", "U redu", { duration: 3500 })
      }
     

  }
    //saljemo post request kada zelimo da izbrisemo nesto 
  public delete() {

    this.preduzeceService.deletePreduzece(this.data.id).subscribe(
      //ovaj data nije isiti data kao iz konstr 
      ()=> {
        this.snackaBar.open("Preduzece je uspesno obrisano", "U redu", { duration: 3500 })
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
