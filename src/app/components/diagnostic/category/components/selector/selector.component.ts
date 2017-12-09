/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DiagnosticCategory } from '../../category';
import { DiagnosticCategoryService } from '../../category.service';
import * as _ from 'lodash';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'diagnostic-category-selector',
  template: `
      <label for="categories">Category</label>
      <select id="categories" class="form-control" name="category" [(ngModel)]="category"
              (ngModelChange)="modelChanged($event)">
          <option *ngFor="let cat of categories" [ngValue]="cat">{{ cat.title }}</option>
      </select>
  `
})
export class DiagnosticCategorySelectorComponent {

  category: DiagnosticCategory;

  @Input()
  set categoryId (id: number) {
    this.category = this.changeCategory(+id);
  }

  @Output() categoryChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() loading: EventEmitter<any> = new EventEmitter<any>();
  @Output() loaded: EventEmitter<any> = new EventEmitter<any>();

  categories: DiagnosticCategory[] = [];

  constructor (
    private service: DiagnosticCategoryService,
    private loadingBar: SlimLoadingBarService,
    private _logger: Logger
  ) { }

  ngOnInit (): void {
    this.reloadCategories(this.category);
  }

  changeCategory (id): DiagnosticCategory {
    let changed = false;
    _.forEach(this.categories, (cat) => {
      if (+id === +cat.id) {
        this.category = cat;
        changed = true;
      }
    });

    if (!changed) {
      this.category = new DiagnosticCategory(0, '');
    }

    return this.category;
  }

  reloadCategories (category: DiagnosticCategory): DiagnosticCategory {
    this.loading.emit();
    this.loadingBar.start();
    this.service.getCategories().then((data) => {
      this.categories = data;
      if (!category && this.categories.length) {
        this.category = this.categories[ 0 ];
      } else {
        this.category = this.changeCategory(+category.id);
      }
      this.loaded.emit();
      this.loadingBar.complete();
    }).catch(error => {
      this._logger.error(error);
      this.loadingBar.complete();
    });
    return category;
  }

  reloadCategoriesWithCategoryId (id: number): void {
    this.loading.emit();
    this.service.getCategories().then((data) => {
      this.categories = data;
      this.category = this.changeCategory(id);
      this.loaded.emit();
    }).catch(error => {
      this._logger.error(error);
      this.loadingBar.complete();
    });
  }

  modelChanged (category): void {
    this.categoryChanged.emit(category.id);
  }

}
