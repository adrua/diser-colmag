import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColmagEstudiantesTable } from './colmag.estudiantes.table';

const routes: Routes = [
    {
        path: '',
        component: ColmagEstudiantesTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ColmagEstudiantesRoutingModule { }
