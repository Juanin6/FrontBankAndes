import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oficina',
  templateUrl: './oficina.component.html',
  styleUrls: ['./oficina.component.css']
})
export class OficinaComponent implements OnInit {

  nombre:string ="";
  direccion:string="";
  maxPuntosAtencion=0;
  
  constructor(private Http:HttpClient) { }

  ngOnInit() {
  }
  register(){

    const json ={
      "nombre":this.nombre,
      "direccion":this.direccion,
      "puntosAtencion":[],
      "maxPuntosAtencion":this.maxPuntosAtencion
      
    }
    this.Http.post("http://localhost:8080/api/oficina",json,{responseType:"text"}).subscribe((resultData:any) =>{

        console.log(resultData);
        alert("Oficina Registered Successfully");
        this.nombre = "";
        this.direccion ="";
        this.maxPuntosAtencion=0;

    })
    
  }

}
