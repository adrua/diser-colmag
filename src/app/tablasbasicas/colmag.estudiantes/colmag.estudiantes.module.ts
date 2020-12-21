import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { ColmagEstudiantesRoutingModule } from './colmag.estudiantes-routing.module';

import { ColmagEstudiantesTable } from './colmag.estudiantes.table';
import { ColmagEstudiantesDialog } from './colmag.estudiantes.dialog';


@NgModule({
  declarations: [
    ColmagEstudiantesTable,
    ColmagEstudiantesDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ColmagEstudiantesRoutingModule
  ],
  entryComponents: [
    ColmagEstudiantesTable,
    ColmagEstudiantesDialog
  ],
  exports: [
    ColmagEstudiantesTable,
    ColmagEstudiantesDialog
  ]
})
export class ColmagEstudiantesModule { }
