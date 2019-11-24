import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StateService } from '../services/state.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
	authenticated: boolean = false;
	permission: string = '';

	constructor(private stateService: StateService) {
		const profile = this.stateService.getCurrentProfile();
		this.permission = profile == null ? null : profile.permission;
	}

	ngOnInit() {}

	logout() {
		this.stateService.setCurrentProfile(null);
		this.ngOnInit();
	}
}
