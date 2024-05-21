import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  login :string ="";
  password:string ="";
  nombre:string="";
  correo:string="";
  telefono:number=0;
  tipoUsuario:string="";
  constructor(private http : HttpClient) { }

  ngOnInit() {
  }
  register(){
    let json = {
      "login":this.login,
      "password":this.password,
      "nombre":this.nombre,
      "correo":this.correo,
      "telefono":this.telefono,
      "tipoUsuario":this.tipoUsuario,
      "cuentas":[]
    }
    this.http.post("http://localhost:8080/api/usuario",json,{responseType :'text'}).subscribe((resultData: any)=>{

        console.log(resultData);
        alert("Usuario Registered Successfully");
        //this.getAllStudent();
      
        this.login  ="";
        this.password ="";
        this.nombre="";
        this.correo="";
        this.telefono=0;
        this.tipoUsuario="";
    })
  }

}
