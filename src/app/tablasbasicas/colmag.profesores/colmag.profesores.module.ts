import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { ColmagProfesoresRoutingModule } from './colmag.profesores-routing.module';

import { ColmagProfesoresTable } from './colmag.profesores.table';
import { ColmagProfesoresDialog } from './colmag.profesores.dialog';


@NgModule({
  declarations: [
    ColmagProfesoresTable,
    ColmagProfesoresDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ColmagProfesoresRoutingModule
  ],
  entryComponents: [
    ColmagProfesoresTable,
    ColmagProfesoresDialog
  ],
  exports: [
    ColmagProfesoresTable,
    ColmagProfesoresDialog
  ]
})
export class ColmagProfesoresModule { }
