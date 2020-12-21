import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColMagPersonajesTable } from './colmag.personajes.table';

const routes: Routes = [
    {
        path: '',
        component: ColMagPersonajesTable
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ColMagPersonajesRoutingModule { }
