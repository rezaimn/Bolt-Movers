import {MediaMatcher} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {MenuItems} from '../../shared/menu-items/menu-items';

/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private _router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {}

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['login']);
  }
}
