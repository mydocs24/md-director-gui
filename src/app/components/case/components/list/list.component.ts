/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Response } from '@angular/http';
import { ModalComponent } from 'ng2-bs3-modal/components/modal';
import { Router } from '@angular/router';
import { CasesService } from '../../cases.service';
import { CaseAccident } from '../../case';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ImporterComponent } from '../../../importer/importer.component';
import { Pagination } from '../../../ui/pagination';
import { ExporterService } from '../../../exporter/exporter.service';
import { TranslateService } from '@ngx-translate/core';
import { DateHelper } from '../../../../helpers/date.helper';

@Component({
    selector: 'nga-cases-list',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './list.html',
})
export class CasesListComponent implements OnInit {

    @ViewChild('errorDialog')
    errorDialog: ModalComponent;

    @ViewChild('importer')
    importer: ImporterComponent;

    query: string = '';
    pagination: Pagination = new Pagination();

    deleteDialogEvent: any = null;
    titleForDeletion: string = '';
    deleteProcess: boolean = false;
    errorMessage: string = '';

    settings = {
        pager: {
            display: false,
        },
        mode: 'external',
        hideSubHeader: false,
        actions: false,
        add: {
            addButtonContent: '<i class="ion-ios-plus-outline"></i>',
        },
        edit: {
            editButtonContent: '<i class="ion-ios-arrow-right"></i>',
        },
        columns: null,
        noDataMessage: 'No data found',
    };

    source: LocalDataSource = new LocalDataSource();

    constructor(public service: CasesService,
                public router: Router,
                private slimLoader: SlimLoadingBarService,
                private exporterService: ExporterService,
                private translate: TranslateService,
                private dateHelper: DateHelper,
                ) {
    }

    ngOnInit(): void {
        this.translate.get('Yes').subscribe(() => {
            this.loadColumns();
        });

        this.reloadDatatable({});
    }

    loadColumns(): void {
        this.settings.columns = {
            patient_name: {
                title: this.translate.instant('Patient Name'),
                type: 'string',
            },
            ref_num: {
                title: this.translate.instant('Ref. Number'),
                type: 'string',
            },
            assistant_ref_num: {
                title: this.translate.instant('Assistant Ref Num'),
                type: 'string',
            },
            created_at: {
                title: this.translate.instant('Created at'),
                type: 'string',
                valuePrepareFunction: (cell) => {
                    let val = cell.toString();
                    if (val.length) {
                        val = this.dateHelper.toEuropeFormatWithTime(val);
                    }
                    return val;
                },
            },
            status: {
                title: this.translate.instant('Status'),
                type: 'string',
                valuePrepareFunction: (cell) => {
                    let val = cell.toString();
                    if (val.length) {
                        val = this.translate.instant(val);
                    }
                    return val;
                },
            },
            checkpoints: {
                title: this.translate.instant('Checkpoints'),
                type: 'string',
            },
            fee: {
                title: this.translate.instant('Doctors fee'),
                type: 'number',
            },
            price: {
                title: this.translate.instant('Price'),
                type: 'number',
            },
            case_type: {
                title: this.translate.instant('Case Type'),
                type: 'string',
                valuePrepareFunction: (cell) => {
                    let val = cell.toString();
                    if (val === 'App\\DoctorAccident') {
                        val = this.translate.instant('Doctor Case');
                    }
                    return val;
                },
            },
        };
        this.settings.noDataMessage = this.translate.instant('No data found');
    }

    startLoading(): void {
        this.slimLoader.start();
    }

    completeLoading(): void {
        this.slimLoader.complete();
    }

    errorLoading(): void {
        this.slimLoader.color = 'firebrick';
        this.slimLoader.complete();
    }

    handleEdit(event): void {
        this.router.navigate(['pages/cases/', event.data.id]);
    }

    handleCreate(): void {
        this.router.navigate(['pages/cases/new']);
    }

    reloadDatatable(params): void {
        this.startLoading();
        this.service.getCases(params).then(response => {
            const paginator = response.meta.pagination;
            const accidents = response.data as CaseAccident[];
            this.source.load(accidents);

            this.pagination.rows = paginator.per_page;
            this.pagination.total = paginator.total;
            this.pagination.first = (paginator.current_page - 1) * paginator.per_page;
            this.pagination.show = true;

            this.completeLoading();
        }).catch((response) => {
            this.errorLoading();
        });
    }

    openImporter(): void {
        this.importer.showImporter();
    }

    exportCases(): void {
        this.exporterService.form1({});
    }

    handlePageChanged(event): void {
        this.reloadDatatable(event);
    }
}