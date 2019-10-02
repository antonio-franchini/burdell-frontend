import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-purchased-vehicle-form',
	templateUrl: './purchased-vehicle-form.component.html',
	styleUrls: [ './purchased-vehicle-form.component.css' ]
})
export class PurchasedVehicleFormComponent implements OnInit {
	form: FormGroup;

	jsonHeader() {
		return new HttpHeaders({
			'Content-Type': 'application/json'
		});
	}

	constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
		this.buildForm();
	}

	ngOnInit() {}

	buildForm(): void {
		this.form = this.formBuilder.group({
			make: [ '', Validators.required ],
			model: [ '', Validators.required ],
			year: [ '', Validators.required ],
			type: [ '', Validators.required ],
			colors: [ '', Validators.required ],
			vin: [ '', Validators.required ],
			purchaseDate: [ '', Validators.required ],
			price: [ '', Validators.required ]
		});
	}

	addVehicle() {
		const vehicleData = {
			type: this.form.controls['type'].value,
			make: this.form.controls['make'].value,
			model: this.form.controls['model'].value,
			year: this.form.controls['year'].value,
			colors: this.form.controls['colors'].value,
			vin: this.form.controls['vin'].value,
			purchaseDate: this.form.controls['purchaseDate'].value,
			price: this.form.controls['price'].value
		};

		console.log('here');

		this.httpClient
			.post(`${environment.baseUrl}/addVehicle`, vehicleData, {
				headers: this.jsonHeader()
			})
			.subscribe((vehicle: Vehicle) => {
				console.log('here 2');

				console.log(vehicle);
			});
	}
}
