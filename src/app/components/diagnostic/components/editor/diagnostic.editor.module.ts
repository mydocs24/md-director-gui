/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../../../app.translation.module';
import { DiagnosticCategoryEditorModule } from '../../category/components/editor';
import { DiagnosticEditorComponent } from './diagnostic.editor.component';
import { NgaModule } from '../../../../theme/nga.module';
import { DiagnosticService } from '../../diagnostic.service';
import { DiagnosticCategorySelectorModule } from '../../category/components/selector';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    DiagnosticCategoryEditorModule,
    NgaModule,
    DiagnosticCategorySelectorModule,
  ],
  providers: [
    DiagnosticService,
  ],
  declarations: [
    DiagnosticEditorComponent,
  ],
  exports: [
    DiagnosticEditorComponent,
  ],
})
export class DiagnosticEditorModule {
}
