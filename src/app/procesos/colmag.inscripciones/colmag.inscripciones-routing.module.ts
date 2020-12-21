import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColmagInscripcionesTable } from './colmag.inscripciones.table';

const routes: Routes = [
    {
        path: '',
        component: ColmagInscripcionesTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ColmagInscripcionesRoutingModule { }
