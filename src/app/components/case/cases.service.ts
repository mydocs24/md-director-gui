/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CaseAccident } from './case';
import { Service } from '../service/service';

@Injectable()
export class CasesService {

  private casesUrl = 'director/cases';  // URL to web api

  constructor(private http: Http) { }

  getCases(): Promise<CaseAccident[]> {

    return this.http.get(this.casesUrl)
        .toPromise()
        .then(response => response.json().data as CaseAccident[])
        .catch(this.handleError);
  }

  getCaseServices(caseId: number): Promise<Service[]> {
    const url = `${this.casesUrl}/${caseId}/services`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Service[])
      .catch(this.handleError);
  }

  getDoctorCase (caseId: number): Promise<Service[]> {
    const url = `${this.casesUrl}/${caseId}/doctorcase`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Service[])
      .catch(this.handleError);
  }

  getHospitalCase (caseId: number): Promise<Service[]> {
    const url = `${this.casesUrl}/${caseId}/hospitalcase`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Service[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
