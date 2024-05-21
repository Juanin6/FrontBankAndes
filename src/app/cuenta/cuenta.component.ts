import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ObjectId } from 'mongodb';



@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  ngOnInit() {
    
  }
  operacionesCuentaArray: any[] = [];
  cuentaArray : any[] = [];
  saldo : number = 0;
  tipoCuenta : string ='';
  cliente :string='';
  estadoCuenta:string='';
  
  mes :number =0;
  cuentaID :string="";

  tipoCuentaFilter:string | undefined
  clienteFilter :number | undefined;
  saldoMinFilter:number | undefined;
  saldoMaxFilter : number | undefined;
  estadoCuentaFilter : string | undefined;
  iDCuentaFilter  : string | undefined;

  
  

  
  
  
  
  constructor(private http: HttpClient )
  {
    this.getAllCuentas();
    this.getAllOperaciones();
  }

  operacionesMensuales(){
    if(this.cuentaID!=="" && this.mes!==0){
    this.http.get("http://localhost:8080/api/cuenta"+ "/"+this.cuentaID+"/"+this.mes).subscribe((resultData:any)=>{
      console.log(resultData);
      this.operacionesCuentaArray = resultData;
    })}
    else{
      this.getAllOperaciones();
    }

  }
  buscarCuentas(tipoCuenta?:string,saldoMin?:number,saldoMax?:number,cliente?:number,estadoCuenta?:string,idCuenta?:string){
    
    
    console.log(tipoCuenta)
    console.log(saldoMin)
    console.log(saldoMax)
    console.log(cliente)

    if(tipoCuenta && tipoCuenta!==''){
      
      this.cuentaArray= this.cuentaArray.filter(cuenta =>cuenta.tipoCuenta===tipoCuenta)
      

    }
    if (saldoMin !== undefined && saldoMin !== null) {
      this.cuentaArray = this.cuentaArray.filter(cuenta => cuenta.saldo>=saldoMin   )
    }

    if (saldoMax !== undefined && saldoMax !== null) {
      this.cuentaArray = this.cuentaArray.filter(cuenta => cuenta.saldo <= saldoMax)
    }
    if (cliente!== undefined && cliente !== null  ) {
      this.cuentaArray = this.cuentaArray.filter(cuenta => cuenta.cliente.timestamp === cliente );
    }
    if(estadoCuenta && estadoCuenta!==""){
      this.cuentaArray = this.cuentaArray.filter(cuenta => cuenta.estadoCuenta === estadoCuenta )
    }
    if(idCuenta && idCuenta!==""){
      this.cuentaArray = this.cuentaArray.filter(cuenta => cuenta.idString === idCuenta )
    }
    
    
  }

  getAllOperaciones(){
    this.http.get("http://localhost:8080/api/operaciones")
  
    .subscribe((resultData: any)=>
    {
    
        console.log(resultData);
        this.operacionesCuentaArray = resultData;
    });
  }

  register()
  {
    
    let bodyData = {
      "cliente":this.cliente,
      "tipoCuenta": this.tipoCuenta,
      "saldo": this.saldo,
      "estadoCuenta": this.estadoCuenta = "Activa"
    };

    
 
    this.http.post("http://localhost:8080/api/cuenta",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Cuenta Registered Successfully");
        //this.getAllStudent();
      
        this.tipoCuenta = '';
        this.cliente = '';
        this.estadoCuenta = '';
        this.saldo  = 0;
    });
    
  }
  getAllCuentas()
  {
    
    this.http.get("http://localhost:8080/api/cuentas")
  
    .subscribe((resultData: any)=>
    {
    
        console.log(resultData);
        this.cuentaArray = resultData;
    });
  }
  
  setCuentaToCerrada(data: any)

  {
    this.http.delete("http://localhost:8080/api/cuenta/cerrar"+ "/"+ data.idString,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Cuenta cerrada")
        this.getAllCuentas();
 
        this.tipoCuenta = '';
        this.cliente = '';
        this.estadoCuenta = '';
        this.saldo  = 0;
  
    });
 
  }
  setCuentaToDesactivada(data: any)
  {
    this.http.delete("http://localhost:8080/api/cuenta/desactivar"+ "/"+ data.idString,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Cuenta desactivada")
        this.getAllCuentas();
 
        this.tipoCuenta = '';
        this.cliente = '';
        this.estadoCuenta = '';
        this.saldo  = 0;
  
    });
 
  }
  
  

  
}

