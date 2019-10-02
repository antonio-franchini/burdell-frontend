import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	form: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.buildForm();
	}

	buildForm(): void {
		this.form = this.formBuilder.group({
			email: [ '', Validators.compose([ Validators.required, Validators.email ]) ],
			password: [ '', Validators.required ]
		});
	}

	ngOnInit() {}
}
