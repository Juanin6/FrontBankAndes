import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-puntoAtencion',
  templateUrl: './puntoAtencion.component.html',
  styleUrls: ['./puntoAtencion.component.css']
})
export class PuntoAtencionComponent implements OnInit {

  ubicacion:string="";
  tipoPuntoAtencion:string="";
  oficinaId:string="";
  constructor(private Http : HttpClient) { }

  ngOnInit() {
  }

  register(){
    const json ={
      "ubicacion":this.ubicacion,
      "tipoPuntoAtencion":this.tipoPuntoAtencion,
      "oficinaId":this.oficinaId
    }
    this.Http.post("http://localhost:8080/api/puntoAtencion",json,{responseType:"text"}).subscribe((resultData:any)=>{
      console.log(resultData);
      alert("Punto de Atencion Registered Successfully");
      this.ubicacion = "";
      this.tipoPuntoAtencion ="";
      this.oficinaId ="";
    })
  }

}
