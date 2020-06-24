import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarNotaPage } from './visualizar-nota.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarNotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarNotaPageRoutingModule {}
