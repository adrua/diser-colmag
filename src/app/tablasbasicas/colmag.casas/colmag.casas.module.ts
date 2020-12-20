import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { ColmagCasasRoutingModule } from './colmag.casas-routing.module';

import { ColmagCasasTable } from './colmag.casas.table';
import { ColmagCasasDialog } from './colmag.casas.dialog';


@NgModule({
  declarations: [
    ColmagCasasTable,
    ColmagCasasDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ColmagCasasRoutingModule
  ],
  entryComponents: [
    ColmagCasasTable,
    ColmagCasasDialog
  ],
  exports: [
    ColmagCasasTable,
    ColmagCasasDialog
  ]
})
export class ColmagCasasModule { }
