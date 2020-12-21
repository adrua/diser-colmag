import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'COLMAG_Casas',
        loadChildren: () => import('./colmag.casas/colmag.casas.module').then(mod => mod.ColmagCasasModule)
    },
    {
        path: 'ColMag_Personajes',
        loadChildren: () => import('./colmag.personajes/colmag.personajes.module').then(mod => mod.ColmagPersonajesModule)
    },
    {
        path: '',
        children: [
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TablasBasicasRoutingModule { }
