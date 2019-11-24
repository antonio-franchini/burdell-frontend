import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/Vehicle';
import { VehicleMake } from '../models/VehicleMake';
import { VehicleType } from '../models/VehicleType';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Customer } from '../models/Customer';
import { Color } from '../models/Color';
import { StateService } from '../services/state.service';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-purchased-vehicle-form',
	templateUrl: './purchased-vehicle-form.component.html',
	styleUrls: [ './purchased-vehicle-form.component.css' ]
})
export class PurchasedVehicleFormComponent implements OnInit {
	form: FormGroup;
	customers: Array<Customer> = [];
	vehicleMakes: Array<VehicleMake> = [];
	vehicleTypes: Array<VehicleType> = [];
	colors: Array<Color> = [];
	conditions: Array<string> = [ 'Excellent', 'Very Good', 'Good', 'Fair' ];
	username: string;

	jsonHeader() {
		return new HttpHeaders({
			'Content-Type': 'application/json'
		});
	}

	constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private stateService: StateService) {
		const profile = this.stateService.getCurrentProfile();
		this.username = profile.username == null ? '' : profile.username;

		this.buildForm();
	}

	ngOnInit() {
		this.getCustomers();
		this.getVehicleMakes();
		this.getVehicleTypes();
		this.getColors();
	}

	getCustomers() {
		this.httpClient
			.get(`${environment.baseUrl}/getAllCustomers`, {
				headers: this.jsonHeader()
			})
			.subscribe((customers: Array<Customer>) => {
				this.customers = customers;
			});
	}

	buildForm(): void {
		this.form = this.formBuilder.group({
			vin: [ '', Validators.required ],
			type: [ '', Validators.required ],
			make: [ '', Validators.required ],
			model: [ '', Validators.required ],
			year: [ '', Validators.required ],
			inventoryClerkName: this.username,
			mileage: [ '', Validators.required ],
			description: [ '', Validators.required ],
			purchasePrice: [ '', Validators.required ],
			condition: [ '', Validators.required ],
			purchaseDate: [ '', Validators.required ],
			sellerCustomerId: [ '', Validators.required ],
			colors: [ '', Validators.required ]
		});
	}

	addVehicle() {
		const vehicleData = {
			vin: this.form.controls['vin'].value,
			type: this.form.controls['type'].value,
			make: this.form.controls['make'].value,
			model: this.form.controls['model'].value,
			year: this.form.controls['year'].value,
			inventoryClerkName: this.form.controls['inventoryClerkName'].value,
			mileage: this.form.controls['mileage'].value,
			description: this.form.controls['description'].value,
			purchasePrice: this.form.controls['purchasePrice'].value,
			condition: this.form.controls['condition'].value,
			purchaseDate: new DatePipe('en-US').transform(this.form.get('purchaseDate').value, 'yyyy-MM-dd'),
			sellerCustomerId: this.form.controls['sellerCustomerId'].value,
			colors: this.form.controls['colors'].value.join(',')
		};

		this.httpClient
			.post(`${environment.baseUrl}/addVehicle`, vehicleData, {
				headers: this.jsonHeader()
			})
			.subscribe((vehicle: Vehicle) => {});
	}

	getVehicleTypes() {
		this.httpClient
			.get(`${environment.baseUrl}/getVehicleTypes`, {
				headers: this.jsonHeader()
			})
			.subscribe((vehicleTypes: Array<VehicleType>) => {
				this.vehicleTypes = vehicleTypes;
			});
	}

	getVehicleMakes() {
		this.httpClient
			.get(`${environment.baseUrl}/getVehicleMakes`, {
				headers: this.jsonHeader()
			})
			.subscribe((vehicleMakes: Array<VehicleMake>) => {
				this.vehicleMakes = vehicleMakes;
			});
	}

	getColors() {
		this.httpClient
			.get(`${environment.baseUrl}/getColors`, {
				headers: this.jsonHeader()
			})
			.subscribe((colors: Array<Color>) => {
				this.colors = colors;
			});
	}
}
