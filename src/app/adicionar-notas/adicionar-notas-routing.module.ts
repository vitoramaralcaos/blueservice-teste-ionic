import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarNotasPage } from './adicionar-notas.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarNotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarNotasPageRoutingModule {}
