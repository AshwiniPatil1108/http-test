import { Injectable } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    private _snackBar :MatSnackBarModule
  ) { }

  openSnackBar(msg:string){
  
      
    
  }
}
