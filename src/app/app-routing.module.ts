import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  {
    path: 'Inscripciones', 
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'Inscripciones'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

