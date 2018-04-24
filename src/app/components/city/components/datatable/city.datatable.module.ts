/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CityDatatableComponent } from './city.datatable.component';
import { CommonModule } from '@angular/common';
import { AppTranslationModule } from '../../../../app.translation.module';
import { CitiesService } from '../../cities.service';
import { DatatableModule } from '../../../ui/datatable/datatable.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DatatableModule,
    DialogModule,
  ],
  providers: [
    CitiesService,
  ],
  declarations: [
    CityDatatableComponent,
  ],
  exports: [
    CityDatatableComponent,
  ],
})
export class CityDatatableModule {
}
