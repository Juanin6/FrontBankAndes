import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioComponent } from './usuario/usuario.component';
import { OficinaComponent } from './oficina/oficina.component';
import { PuntoAtencionComponent } from './puntoAtencion/puntoAtencion.component';
import { OperacionCuentaComponent } from './operacionCuenta/operacionCuenta.component';

@NgModule({
  
  declarations: [					
    AppComponent,
      CuentaComponent,
      UsuarioComponent,
      OficinaComponent,
      PuntoAtencionComponent,
      OperacionCuentaComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
