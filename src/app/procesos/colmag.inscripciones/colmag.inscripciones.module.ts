import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { ColmagInscripcionesRoutingModule } from './colmag.inscripciones-routing.module';

import { ColmagInscripcionesTable } from './colmag.inscripciones.table';
import { ColmagInscripcionesDialog } from './colmag.inscripciones.dialog';


@NgModule({
  declarations: [
    ColmagInscripcionesTable,
    ColmagInscripcionesDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ColmagInscripcionesRoutingModule
  ],
  entryComponents: [
    ColmagInscripcionesTable,
    ColmagInscripcionesDialog
  ],
  exports: [
    ColmagInscripcionesTable,
    ColmagInscripcionesDialog
  ]
})
export class ColmagInscripcionesModule { }
