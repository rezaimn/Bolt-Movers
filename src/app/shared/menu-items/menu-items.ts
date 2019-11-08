import {Injectable} from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

// { state: 'button',  type: 'link', name: 'Settings',   icon: 'settings'      },
const MENUITEMS = [
  {state: 'wizard', type: 'link', name: 'New Estimate', icon: 'av_timer'},
  {state: 'furniture-category', type: 'link', name: 'Furniture And Category', icon: 'view_list'},
  {state: 'dispatch', type: 'link', name: 'Dispatch', icon: 'home_work'},
  {state: 'question', type: 'link', name: 'Question', icon: 'live_help'},
  {state: 'customer-management', type: 'link', name: 'Customer Manage', icon: 'group'},
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
