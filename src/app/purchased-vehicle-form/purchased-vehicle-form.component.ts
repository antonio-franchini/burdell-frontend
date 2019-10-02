import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-purchased-vehicle-form',
	templateUrl: './purchased-vehicle-form.component.html',
	styleUrls: [ './purchased-vehicle-form.component.css' ]
})
export class PurchasedVehicleFormComponent implements OnInit {
	form: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.buildForm();
	}

	buildForm(): void {
		this.form = this.formBuilder.group({
			make: [ '', Validators.required ],
			model: [ '', Validators.required ],
			year: [ '', Validators.required ],
			type: [ '', Validators.required ],
			color: [ '', Validators.required ],
			keyword: [ '', Validators.required ]
		});
	}

	ngOnInit() {}
}
