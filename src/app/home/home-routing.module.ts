import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {​​​​​
        path: 'TablasBasicas',
        loadChildren: () => import('../tablasbasicas/tablasbasicas.module').then(mod => mod.TablasBasicasModule)
      }​​​​​
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
