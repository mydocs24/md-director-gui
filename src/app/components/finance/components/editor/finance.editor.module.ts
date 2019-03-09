/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule, SelectButtonModule } from 'primeng/primeng';
import { AppTranslationModule } from '../../../../app.translation.module';
import { DoctorSelectModule } from '../../../doctors/components/select';
import { HospitalsService } from '../../../hospital';
import { AutocompleterModule } from '../../../ui/selector/components/autocompleter';
import { FinanceEditorComponent } from './finance.editor.component';
import { AssistantSelectModule } from '../../../assistant/components/select';
import { CitySelectModule } from '../../../city/components/select';
import { ServiceSelectModule } from '../../../service/components/select';
import { NgaModule } from '../../../../theme/nga.module';
import { FinanceService } from '../../finance.service';
import { PeriodSelectModule } from '../../../period/components/select';
import { DoctorsService } from '../../../doctors';
import { CitiesService } from '../../../city';
import { MultiSelectorModule } from '../../../ui/selector/components/multiSelector';
import { AssistantsService } from '../../../assistant';
import { PeriodService } from '../../../period';
import { ServicesService } from '../../../service';
import { FinanceInfoModule } from '../info';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DoctorSelectModule,
    AssistantSelectModule,
    CitySelectModule,
    ServiceSelectModule,
    NgaModule,
    PeriodSelectModule,
    MultiSelectorModule,
    FinanceInfoModule,
    SelectButtonModule,
    InputSwitchModule,
    AutocompleterModule,
  ],
  providers: [
    FinanceService,
    DoctorsService,
    CitiesService,
    AssistantsService,
    PeriodService,
    ServicesService,
    HospitalsService,
  ],
  declarations: [
    FinanceEditorComponent,
  ],
  exports: [
    FinanceEditorComponent,
  ],
})
export class FinanceEditorModule {
}