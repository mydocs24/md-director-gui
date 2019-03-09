/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PatientsService } from '../../patients.service';
import { DateHelper } from '../../../../helpers/date.helper';
import { Patient } from '../../patient';
import { LoadingComponent } from '../../../core/components/componentLoader';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { PatientEditorComponent } from '../editor/patient.editor.component';
import {
  DatatableAction,
  DatatableCol,
  DatatableComponent,
  DatatableConfig,
  DatatableTransformer,
} from '../../../ui/datatable';

@Component({
  selector: 'nga-patient-datatable',
  templateUrl: './patient.datatable.html',
})
export class PatientDatatableComponent extends LoadingComponent implements OnInit {

  protected componentName: string = 'PatientDatatableComponent';

  @ViewChild('patientDatatable')
  private patientDatatable: DatatableComponent;

  @ViewChild('editPatientForm')
  private editPatientForm: PatientEditorComponent;

  datatableConfig: DatatableConfig;
  langLoaded: boolean = false;
  displayDialog: boolean = false;

  constructor(
    protected _logger: Logger,
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
    private translateService: TranslateService,
    private patientService: PatientsService,
    private dateHelper: DateHelper,
  ) {
    super();
  }

  ngOnInit(): void {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;
      const cols = [
        new DatatableCol('name', this.translateService.instant('Name')),
        new DatatableCol('address', this.translateService.instant('Address')),
        new DatatableCol('phones', this.translateService.instant('Phone')),
        new DatatableCol('birthday', this.translateService.instant('Birthday')),
      ];

      this.datatableConfig = DatatableConfig.factory({
        dataProvider: (filters: Object) => {
          return this.patientService.search(filters);
        },
        cols,
        refreshTitle: this.translateService.instant('Refresh'),
        controlPanel: true,
        controlPanelActions: [
          new DatatableAction(this.translateService.instant('Add'), 'fa fa-plus', () => {
            this.showDialogToAdd();
          }),
        ],
        transformers: [
          new DatatableTransformer('birthday', val => this.dateHelper.toEuropeFormat(val)),
        ],
        onRowSelect: event => {
          this.onRowSelect(event);
        },
        sort: true,
        sortBy: 'name',
      });
    });
  }

  showDialogToAdd() {
    this.setPatient(new Patient());
    this.displayDialog = true;
  }

  private setPatient(patient: Patient): void {
    this.editPatientForm.setPatient(patient);
  }

  onRowSelect(event) {
    this.setPatient(this.clonePatient(event.data));
    this.displayDialog = true;
  }

  private clonePatient(p: Patient): Patient {
    const patient = new Patient();
    for (const prop of Object.keys(p)) {
      patient[prop] = p[prop];
    }
    return patient;
  }

  onPatientChanged(event): void {
    this.displayDialog = false;
    this.patientDatatable.refresh();
  }
}