import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { GroceryListCrudService } from "src/app/services/grocery-list-crud.service";

import { Grocery } from "src/app/models/Grocery";
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: "app-grocery-list",
  templateUrl: "./grocery-list.component.html",
  styleUrls: ["./grocery-list.component.scss"],

})
export class GroceryListComponent implements OnInit {
  groceries$: Observable<Grocery[]>;
  newItem: Grocery;
  editarFormulario=false;
  constructor(private groceryListCrudService: GroceryListCrudService) {}

  async ngOnInit(): Promise<void> {


    this.groceries$ = await this.fetchAll();
   
   

   
  }

  fetchAll(): Observable<Grocery[]> {
    return this.groceryListCrudService.fetchAll();
  }

  post(groceryItem: Partial<Grocery>,groceryItem2: Partial<Grocery>): void {
    console.log(groceryItem)
    
   
    const item = (<string>groceryItem).trim();
    let itemp:any= {
               item:groceryItem,
               nombre:groceryItem2}

    if (!item) return;
 
    this.groceries$ = this.groceryListCrudService.post(itemp)
      .pipe(tap(() => (this.groceries$ = this.fetchAll())));
  

  }

  update(id: number,item:string,nombre:string): void {
  
 
    
    let itempupdate:any= {
      id:id,
      item:item,
      nombre:nombre}
     console.log(itempupdate)
    this.groceries$ = this.groceryListCrudService
      .update(itempupdate)
      .pipe(tap(() => (this.groceries$ = this.fetchAll())));

      window.location.reload();
       
  }


  delete(id: number): void {
    this.groceries$ = this.groceryListCrudService
      .delete(id)
      .pipe(tap(() => (this.groceries$ = this.fetchAll())));
  }


  EditarForm(){
    this.editarFormulario=true;

  }
}
