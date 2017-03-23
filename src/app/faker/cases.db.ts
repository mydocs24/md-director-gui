/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {CaseAccident} from "../components/case/case";
export const CasesDb: CaseAccident[] = [
    {
        id: 1, // accident id
        repeated: 'Second time',
        ref_num: 'G001-0101-TFF',
        case_type: 'DoctorAccident',
        created_at: '2017-03-23 10:40:11',
        checkpoints: 'guarantee,checkedLDM,paidLDM',
        status: 'new',
        accidentStatus: 'new'
    },
    {
        id: 2, // accident id
        repeated: 'First time',
        ref_num: 'G002-0101-TFF',
        case_type: 'DoctorAccident',
        created_at: '2017-03-23 10:40:11',
        checkpoints: '',
        status: 'new',
        accidentStatus: 'new'
    }
].map(x => new CaseAccident(x.id, x.repeated, x.ref_num, x.case_type, x.created_at, x.checkpoints, x.status, x.accidentStatus));
