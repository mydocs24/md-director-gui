/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

import { OnInit } from '@angular/core';
import {
  DatatableAction,
  DatatableCol, DatatableComponent,
  DatatableConfig, DatatableTransformer,
} from '../datatable';
import { TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from '../../core/components/componentLoader';
import { ObjectHelper } from '../../../helpers/object.helper';
import { LoadableServiceInterface } from '../../core/loadable';
import { FilterMetadata } from 'primeng/components/common/filtermetadata';

export abstract class AbstractDatatableController extends LoadingComponent implements OnInit {
  displayDialog: boolean;
  langLoaded: boolean = false;
  datatableConfig: DatatableConfig;

  /**
   * class which describe the model
   */
  model: any;

  protected abstract getTranslateService(): TranslateService;
  protected abstract getDatatableComponent(): DatatableComponent;
  abstract getService(): LoadableServiceInterface;
  abstract getColumns(): DatatableCol[];
  abstract getActions(): DatatableAction[];
  abstract getSortBy(): string;
  abstract getEmptyModel(): Object;

  getFilters(): { [s: string]: FilterMetadata } {
    return {};
  }

  /**
   * @return {DatatableTransformer[]}
   */
  getTransformers(): DatatableTransformer[] {
    return [];
  }

  ngOnInit() {
    this.getTranslateService().get('Yes').subscribe(() => {
      this.langLoaded = true;
      this.datatableConfig = DatatableConfig.factory({
        dataProvider: (filters: any) => {
          return this.getService().search(filters);
        },
        cols: this.getColumns(),
        refreshTitle: this.getTranslateService().instant('Refresh'),
        controlPanel: true,
        controlPanelActions: this.getActions(),
        captionPanel: this.hasCaptionPanel(),
        captionPanelActions: this.getCaptionActions(),
        onRowSelect: event => {
          this.onRowSelect(event);
        },
        sortBy: this.getSortBy(),
        transformers: this.getTransformers(),
        filters: this.getFilters(), // default filters
      });
    });
  }

  protected hasCaptionPanel(): boolean {
    return false;
  }

  protected getCaptionActions(): DatatableAction[] {
    return [];
  }

  protected setModel(model: Object = null): void {
    this.model = model;
  }

  save() {
    const postfix = 'Save';
    this.startLoader(postfix);
    this.getService().save(this.model)
      .then((model: Object) => {
        this.displayDialog = false;
        if (!this.model.id) {
          // refresh on adding
          this.refresh();
        } else {
          this.updateModel(model);
        }
        // to close popup
        this.setModel();
        this.stopLoader(postfix);
      })
      .catch(e => {
        console.error(e);
        this.stopLoader(postfix);
      });
  }

  protected onRowSelect(event) {
    if (this.model && event.data && this.model.id === event.data.id && this.displayDialog) {
      // do nothing, already opened
    } else {
      this.setModel(this.cloneModel(event.data));
      this.displayDialog = true;
    }
  }

  protected cloneModel(model: Object): Object {
    const cloned = this.getEmptyModel();
    ObjectHelper.clone(model, cloned);
    return cloned;
  }

  refresh(): void {
    this.getDatatableComponent().refresh();
  }

  updateModel(model: Object): boolean {
    return this.getDatatableComponent().updateModel(model);
  }

  delete(): void {
    const postfix = 'Delete';
    this.startLoader(postfix);
    this.getService().destroy(this.model)
      .then(() => {
        this.stopLoader(postfix);
        this.setModel();
        this.displayDialog = false;
        this.getDatatableComponent().refresh();
      })
      .catch(() => this.stopLoader(postfix));
  }

  /**
   * Change filters and reload table data
   * @param filters
   */
  protected applyFilters(filters: Object): void {
    this.datatableConfig = this.getDatatableComponent().getConfig();
    this.datatableConfig.update( 'filters', { filters } );
    this.getDatatableComponent().refresh();
  }
}
