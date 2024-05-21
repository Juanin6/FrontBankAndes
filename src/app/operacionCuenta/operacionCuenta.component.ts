import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-operacionCuenta',
  templateUrl: './operacionCuenta.component.html',
  styleUrls: ['./operacionCuenta.component.css']
})
export class OperacionCuentaComponent implements OnInit {

  mostrarCuentaDestino = true;
  cuentaorigenID:string="";
  cuentadestino:string="";
  puntoAtencion:string="";
  mes:number=0;
  fecha:Date | undefined;
  valor:number=0;
  tipoOperacion: string ="";
  saldoCuentaOrigen: number | undefined;
  saldoCuentaDestino: number | undefined;
  

  
  constructor(private Http:HttpClient) { }

  ngOnInit() {
  }
  onChangeTipoOperacion() {
    if (this.tipoOperacion === 'Consignar' || this.tipoOperacion === 'Retirar') {
      this.mostrarCuentaDestino = false; // Ocultar el campo Cuenta Destino ID
      
    } else {
      this.mostrarCuentaDestino = true; // Mostrar el campo Cuenta Destino ID
    }
  }
  register(): void {
    // Obtener saldo de cuenta origen
    this.getSaldoCuenta(this.cuentaorigenID).subscribe((saldoOrigen: number) => {
      // Una vez que se obtiene el saldo, asignarlo a saldoCuentaOrigen
      this.saldoCuentaOrigen = saldoOrigen;
      
      // Comprobar el tipo de operación y ajustar la cuenta destino y saldo destino si es necesario
      if (this.tipoOperacion !== 'Transferencia') {
        this.cuentadestino = this.cuentaorigenID;
        this.saldoCuentaDestino = this.saldoCuentaOrigen;
      } else {
        // Obtener saldo de cuenta destino para transferencia
        this.getSaldoCuenta(this.cuentadestino).subscribe((saldoDestino: number) => {
          this.saldoCuentaDestino = saldoDestino;
  
          // Una vez que se obtienen ambos saldos, construir el objeto JSON y realizar la solicitud HTTP
          this.constructAndSendRequest();
        });
      }
  
      // Si no es una transferencia, construir el objeto JSON y realizar la solicitud HTTP
      if (this.tipoOperacion !== 'Transferencia') {
        this.constructAndSendRequest();
      }
    });
  }
  constructAndSendRequest(): void {
    // Verificar si ambos saldos están definidos antes de proceder
    if (this.saldoCuentaOrigen !== undefined && this.saldoCuentaDestino !== undefined) {
      // Construir el objeto JSON con los valores obtenidos
      const json = {
        cuentaOrigen: this.cuentaorigenID,
        cuentaDestino: this.cuentadestino,
        puntoAtencion: this.puntoAtencion,
        mes: this.mes,
        fecha: this.fecha,
        valor: this.valor,
        tipoOperacion: this.tipoOperacion,
        saldoCuentaOrigen: this.saldoCuentaOrigen,
        saldoCuentaDestino: this.saldoCuentaDestino
      };
  
      // Enviar la solicitud HTTP con el objeto JSON
      this.Http.post("http://localhost:8080/api/operacionCuenta", json, { responseType: 'text' }).subscribe(
        (resultData: any) => {
          console.log(resultData);
          alert("OperacionCuenta Registered Successfully");
          this.resetForm(); // Reiniciar valores después de enviar la solicitud
        },
        (error) => {
          console.error('Error al enviar la operación de cuenta:', error);
        }
      );
    } else {
      console.error('No se han obtenido ambos saldos necesarios.');
    }
  }
  resetForm(): void {
    // Reiniciar los valores del formulario
    this.cuentaorigenID = "";
    this.cuentadestino = "";
    this.puntoAtencion = "";
    this.mes = 0;
    this.fecha = undefined;
    this.valor = 0;
    this.tipoOperacion = "";
  }
getSaldoCuenta(idCuenta: string): Observable<number> {
  return this.Http.get<number>("http://localhost:8080/api/cuenta/saldo/" + idCuenta).pipe(
    tap((saldo: number) => {
      console.log(`Saldo de ${idCuenta}: ${saldo}`);
    }),
    catchError((error) => {
      console.error(`Error al obtener saldo de ${idCuenta}:`, error);
      return of(0); // Manejar el error devolviendo un saldo predeterminado (por ejemplo, 0)
    })
  );
}
}
