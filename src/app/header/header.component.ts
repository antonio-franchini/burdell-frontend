import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
	authenticated: boolean = false;

	constructor(private profileService: ProfileService) {}

	ngOnInit() {}

	logout() {
		this.profileService.setRole(null);
		console.log('logging out');
		console.log('this.profileService.getRole()', this.profileService.getRole());
		this.ngOnInit();
	}

	isAuthenticated() {
		return !(this.profileService.getRole() === null);
	}
}
