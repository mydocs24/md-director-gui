/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { PeriodDatatableComponent } from '../../components/period/components/datatable/period.datatable.component';
import { AccidentCheckpointDatatableComponent }
  from '../../components/accident/components/checkpoint/components/datatable/accident.checkpoint.datatable.component';
import { FinanceDatatableComponent } from '../../components/finance/components/datatable';
import { FinanceEditorPageComponent } from './finance/editor';
import { FormDatatableComponent } from '../../components/forms/components/datatable';
import { FormEditorPageComponent } from './form/editor/form.editor.page.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'checkpoints', component: AccidentCheckpointDatatableComponent },
      { path: 'finance', component: FinanceDatatableComponent },
      { path: 'finance/new', component: FinanceEditorPageComponent },
      { path: 'finance/:id', component: FinanceEditorPageComponent },
      { path: 'periods', component: PeriodDatatableComponent },
      { path: 'forms', component: FormDatatableComponent },
      { path: 'forms/new', component: FormEditorPageComponent },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
