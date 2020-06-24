import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarNotasPageRoutingModule } from './adicionar-notas-routing.module';

import { AdicionarNotasPage } from './adicionar-notas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarNotasPageRoutingModule
  ],
  declarations: [AdicionarNotasPage]
})
export class AdicionarNotasPageModule {}
