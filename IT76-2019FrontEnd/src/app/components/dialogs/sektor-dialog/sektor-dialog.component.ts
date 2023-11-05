import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Preduzece } from 'src/app/models/preduzece';
import { Sektor } from 'src/app/models/sektor';
import { PreduzeceService } from 'src/app/services/preduzece.service';
import { SektorService } from 'src/app/services/sektor.service';

@Component({
  selector: 'app-sektor-dialog',
  templateUrl: './sektor-dialog.component.html',
  styleUrls: ['./sektor-dialog.component.css']
})
export class SektorDialogComponent implements OnInit {


  public  flag!: number;
  preduzeca!:Preduzece[];   //kad se pokrene dialog, niz ce se popuniti dostupnim stranim kljucevima


  constructor(private snackaBar: MatSnackBar,  //u cosku ekrana kad se nesto iszvrsi iskacuca poruka, npr Email snet/izbrisan
    public dialogRef: MatDialogRef<SektorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Sektor,  //podaci iz forme dobijaju se odavde, vrsi se injekcija u property data, i data sa prosledjuje
    private sektorService: SektorService,
    private preduzeceService:PreduzeceService) {


  }
  
  //kad napravimoo novu instancu komponente pokrece se onInit
  ngOnInit(): void {
    this.preduzeceService.getAllPreduzeces().subscribe(
      preduzeca=>{
        this.preduzeca=preduzeca;
      }
    )
  }

  

  public compare(a:Sektor,b:Sektor){
    return a.id==b.id;
  }

  //saljemo post request kada zelimo da dodamo nesto 
  public add() {

    this.sektorService.addSektor(this.data).subscribe(
      //ovaj data nije isiti data kao iz konstr 
      data => {
        this.snackaBar.open("Sektor: " + this.data.naziv + " je uspesno dodato", "U redu", { duration: 3500 })
      }
    ),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackaBar.open("Dogodila se greska", "U redu", { duration: 3500 })
      }
     
  }   
   //saljemo post request kada zelimo da izmenimo nesto 
  public update() {


    this.sektorService.updateSektor(this.data).subscribe(
      //ovaj data nije isiti data kao iz konstr 
      data => {
        this.snackaBar.open("Sektor: " + this.data.naziv + " je uspesno izmenjen", "U redu", { duration: 3500 })
      }
    ),
      (error: Error) => {
        console.log(error.name + " " + error.message),
          this.snackaBar.open("Dogodila se greska", "U redu", { duration: 3500 })
      }
     

  }
    //saljemo post request kada zelimo da izbrisemo nesto 
  public delete() {

    this.sektorService.deleteSektor(this.data.id).subscribe(
      //ovaj data nije isiti data kao iz konstr 
      ()=> {
        this.snackaBar.open("Sektor je uspesno obrisano", "U redu", { duration: 3500 })
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

