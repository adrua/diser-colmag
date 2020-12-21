import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'COLMAG_Casas',
        loadChildren: () => import('./colmag.casas/colmag.casas.module').then(mod => mod.ColmagCasasModule)
    },
    {
        path: 'COLMAG_Personajes',
        loadChildren: () => import('./colmag.personajes/colmag.personajes.module').then(mod => mod.ColMagPersonajesModule)
    },
    {
        path: 'COLMAG_Estudiantes',
        loadChildren: () => import('./colmag.estudiantes/colmag.estudiantes.module').then(mod => mod.ColmagEstudiantesModule)
    },
    {
        path: 'COLMAG_Profesores',
        loadChildren: () => import('./colmag.profesores/colmag.profesores.module').then(mod => mod.ColmagProfesoresModule)
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
