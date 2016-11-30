import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { RootDiskSizeService } from '../shared/root-disk-size.service';

@Component({
  selector: 'cs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private title: string;
  private loggedIn: boolean;

  constructor (private auth: AuthService,
    private router: Router,
    private http: Http,
    private root: RootDiskSizeService) {
    this.title = this.auth.name;
    this.loggedIn = this.auth.isLoggedIn();

    this.auth.loginObservable.subscribe(() => {
      this.updateAccount();
    });
    this.auth.logoutObservable.subscribe(() => {
      this.updateAccount();
    });
  }

  public logout(): void {
    this.auth.logout()
      .then(() => this.handleLogout())
      .catch(error => alert(error));
  }

  private updateAccount(): void {
    this.title = this.auth.name;
    this.loggedIn = this.auth.isLoggedIn();
  }

  private handleLogout(): void {
    this.router.navigate(['/login']);
  }

  private test(): void {
    this.root.getAvailableRootDiskSize().then().catch(e => alert(e));
  }
}