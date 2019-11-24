import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/Profile';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	form: FormGroup;

	jsonHeader() {
		return new HttpHeaders({
			'Content-Type': 'application/json'
		});
	}

	constructor(
		private formBuilder: FormBuilder,
		private httpClient: HttpClient,
		private stateService: StateService,
		private router: Router
	) {
		this.buildForm();
	}

	buildForm(): void {
		this.form = this.formBuilder.group({
			username: [ '', Validators.required ],
			password: [ '', Validators.required ]
		});
	}

	ngOnInit() {}

	login() {
		const loginData = {
			username: this.form.controls['username'].value,
			password: this.form.controls['password'].value
		};

		this.httpClient
			.post(`${environment.baseUrl}/login`, loginData, {
				headers: this.jsonHeader()
			})
			.subscribe((profile: Profile) => {
				this.stateService.setCurrentProfile(profile);
				if (profile.permission !== null) {
					this.router.navigate([ '/search-page' ]);
				}
			});
	}
}
