import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColmagCasasTable } from './colmag.casas.table';

const routes: Routes = [
    {
        path: '',
        component: ColmagCasasTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ColmagCasasRoutingModule { }
