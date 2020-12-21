import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColmagProfesoresTable } from './colmag.profesores.table';

const routes: Routes = [
    {
        path: '',
        component: ColmagProfesoresTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ColmagProfesoresRoutingModule { }
