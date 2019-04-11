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

import { isDevMode } from '@angular/core';
import { environment } from '../../environments/environment';

const menu = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'fa fa-home',
            selected: false,
            expanded: false,
            order: 0,
          },
        },
      },
      {
        path: 'cases',
        data: {
          menu: {
            title: 'Cases',
            icon: 'fa fa-ambulance',
            selected: false,
            expanded: false,
            order: 1,
          },
        },
      },
      {
        path: 'finance',
        data: {
          menu: {
            title: 'Finance',
            icon: 'fa fa-dollar',
          },
        },
        children: [{
          path: 'conditions',
          data: {
            menu: {
              title: 'Conditions',
            },
          },
        }, {
          path: 'currencies',
          data: {
            menu: {
              title: 'Currencies',
            },
          },
        }],
      },
      {
        path: 'companions',
        data: {
          menu: {
            title: 'Address Book',
            icon: 'fa fa-address-book-o',
          },
        },
        children: [{
          path: 'patients',
          data: {
            menu: {
              title: 'Patients',
            },
          },
        }, {
            path: 'assistants',
            data: {
              menu: {
                title: 'Assistants',
              },
            },
        }],
      },
      {
        path: 'settings',
        data: {
          menu: {
            title: 'Settings',
            icon: 'fa fa-info-circle',
          },
        },
        children: [
          {
            path: 'periods',
            data: {
              menu: {
                title: 'Date Periods',
              },
            },
          },
          {
            path: 'forms',
            data: {
              menu: {
                title: 'Templates',
              },
            },
          },
          {
            path: 'checkpoints',
            data: {
              menu: {
                title: 'Checkpoints',
              },
            },
          },
        ],
      },
      {
        path: 'geo',
        data: {
          menu: {
            title: 'Geo',
            icon: 'fa fa-map-marker',
          },
        },
        children: [
          {
            path: 'cities',
            data: {
              menu: {
                title: 'Cities',
              },
            },
          },
          {
            path: 'hospitals',
            data: {
              menu: {
                title: 'Hospitals',
              },
            },
          },
        ],
      },
      {
        path: 'doctors',
        data: {
          menu: {
            title: 'Doctors',
            icon: 'fa fa-user-md',
          },
        },
        children: [
          {
            path: 'stuff',
            data: {
              menu: {
                title: 'Stuff',
              },
            },
          },
          {
            path: 'diagnostics',
            data: {
              menu: {
                title: 'Diagnostics',
              },
            },
          },
          {
            path: 'services',
            data: {
              menu: {
                title: 'Services',
              },
            },
          },
          {
            path: 'surveys',
            data: {
              menu: {
                title: 'Surveys',
              },
            },
          },
        ],
      },
      {
        path: 'profile',
        data: {
          menu: {
            title: 'Profile',
            icon: 'fa fa-user',
          },
        },
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Doctor',
            url: environment.doctorLink,
            icon: 'fa fa-sign-in',
            order: 800,
            target: '_blank',
          },
        },
      },
      {
        path: 'development',
        data: {
          menu: {
            title: 'Development',
            icon: 'fa fa-wrench',
          },
        },
        children: [{
          path: 'gui',
          data: {
            menu: {
              title: 'GUI',
            },
          },
        }],
      },
    ],
  },
];

if (!isDevMode) {
   menu[0].children.filter(v => v.path !== 'development');
}
export const PAGES_MENU = menu;
