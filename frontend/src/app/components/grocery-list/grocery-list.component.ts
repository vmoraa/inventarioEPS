import { Component, OnInit } from "@angular/core";

import { Observable } from "rxjs";

import { GroceryListCrudService } from "src/app/services/grocery-list-crud.service";

import { Grocery } from "src/app/models/Grocery";
import { tap } from "rxjs/operators";
import { Router } from '@angular/router';

import * as Highcharts from 'highcharts'

@Component({
  selector: "app-grocery-list",
  templateUrl: "./grocery-list.component.html",
  styleUrls: ["./grocery-list.component.scss"]

})
export class GroceryListComponent implements OnInit {
  groceries$: Observable<Grocery[]>;
  newItem: Grocery;
  editarFormulario=false;
  optionsbar:any;
  variableGrafico:any;
  varGrafico:boolean=false;
  
  constructor(private groceryListCrudService: GroceryListCrudService) {}

  async ngOnInit(): Promise<void> {

  
    this.groceries$ = await this.fetchAll();
    this.groceryListCrudService.fetchAll().subscribe(res=>{

   
      this.bar(res,'bar1','bar','Cantidad de Items Bar')
      this.bar(res,'bar2','pie','Cantidad de Items Pie')
     // this.bar(res,'bar2','pie','Cantidad de Items')
    })

   
   

   
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

      window.location.reload();
  

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


  async bar(dataR:any,id:any,tipo,titulo:any) {
  
    let datosGraficos=[]
  
  const repeticions = {};

   dataR.forEach(item => {
  const item2 = item.item;
  if (repeticions[item2]) {
    repeticions[item2]++;
  } else {
    repeticions[item2] = 1;
  }
});

for (const age in repeticions) {

  datosGraficos.push({'name':age, 'y':repeticions[age]})
}

    let bargraft:any="";
    
         this.optionsbar = {
          chart: {
              type: tipo,
               backgroundColor: "#151715",
               height: '450px',
       
              
          },
          plotOptions: {
               
                series: {
                  pointWidth: 35,
                  borderColor:'white',
                  
              },
                  
              
            },
            plotLines: [{
              color: '#edf6ee',
              
          }],
          
          title: {
              text: titulo,
             
              style: {
                color:"white"
                }
  
          },
          subtitle: {
            //  text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
          },
          xAxis: {
              type: 'category',
              labels: {
                  rotation: 0,
                  
                  style: {
                  color:"white",
                      fontSize: '13px',
                      fontFamily: 'Verdana, sans-serif'
                  }
              }
          },
          yAxis: {
              min: 0,
              gridLineColor:'#443c39',
              labels: {
               
                style: {
                
                backgroundColor:"white"}
            },
           
              title: {
                 // text: 'Population (millions)'
              }
              
          },
          legend: {
              enabled: false
          },
          tooltip: {
              pointFormat: ' <b>{point.y:.1f} item</b>'
          },
          series: [{
              name: 'Population',
               borderColor: 'white',
               borderRadius: '5px',
            
             opacity: 0.9,
          
              data:datosGraficos,
            
              dataLabels: {
                  enabled: true,
                  rotation: 0,
                  color: '#FFFFFF',
                  align: 'right',
        
                  y: 0, 
                  style: {
                      fontSize: '13px',
                      fontFamily: 'Verdana, sans-serif'
                  }
              }
          }]
         
      }
     
           bargraft= await Highcharts.chart(id, this.optionsbar);
  
          bargraft.setSize(null)
   
       
       }
// -----  eventos para graficos------------------------
 eventosgraficos(evento:any){
    console.log(evento.point.options)
    
    if(evento.point.options){
      this.varGrafico=true;
      this.variableGrafico=evento.point.options
    }

 }      
}
