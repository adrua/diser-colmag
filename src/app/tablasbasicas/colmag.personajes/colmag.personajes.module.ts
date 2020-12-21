import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/app.shared.module';
import { AppMaterialModule } from 'src/app/app.material.module';

import { ColMagPersonajesRoutingModule } from './colmag.personajes-routing.module';

import { ColMagPersonajesTable } from './colmag.personajes.table';
import { ColMagPersonajesDialog } from './colmag.personajes.dialog';

import { ColMagVaritaMagicaTable } from './colmag.varitamagica/colmag.varitamagica.table';
import { ColMagVaritaMagicaDialog } from './colmag.varitamagica/colmag.varitamagica.dialog';


@NgModule({
  declarations: [
    ColMagPersonajesTable,
    ColMagPersonajesDialog,
    ColMagVaritaMagicaTable,
    ColMagVaritaMagicaDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    ColMagPersonajesRoutingModule
  ],
  entryComponents: [
    ColMagPersonajesTable,
    ColMagPersonajesDialog,
    ColMagVaritaMagicaTable,
    ColMagVaritaMagicaDialog
  ],
  exports: [
    ColMagPersonajesTable,
    ColMagPersonajesDialog,
    ColMagVaritaMagicaTable,
    ColMagVaritaMagicaDialog
  ]
})
export class ColMagPersonajesModule { }
