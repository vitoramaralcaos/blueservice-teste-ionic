import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarNotaPageRoutingModule } from './visualizar-nota-routing.module';

import { VisualizarNotaPage } from './visualizar-nota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarNotaPageRoutingModule
  ],
  declarations: [VisualizarNotaPage]
})
export class VisualizarNotaPageModule {}
