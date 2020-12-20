import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'PCR_ClasificacionSolicitud',
//        loadChildren: () => import('./pcr.clasificacionsolicitud/pcr.clasificacionsolicitud.module').then(mod => mod.PcrClasificacionSolicitudModule)
    },
    {
        path: 'COLMAG_Casas',
        loadChildren: () => import('./colmag.casas/colmag.casas.module').then(mod => mod.ColmagCasasModule)
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
