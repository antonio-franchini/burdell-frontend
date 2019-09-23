import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onLogout() {
    //this.authService.logout();
  }

  isAuthenticated() {
    // return this.authService.isAuthenticated();
    return false;
  }

}
