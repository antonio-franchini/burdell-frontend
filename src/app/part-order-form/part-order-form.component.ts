import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PartsOrder } from '../models/PartsOrder';
import { Part } from '../models/Part';
import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../services/state.service';
import { Vendor } from '../models/Vendor';

@Component({
	selector: 'app-part-order-form',
	templateUrl: './part-order-form.component.html',
	styleUrls: [ './part-order-form.component.css' ]
})
export class PartOrderFormComponent implements OnInit {
	vin: string;
	username: string;
	form: FormGroup;
	vendorForm: FormGroup;
	showVendorForm: boolean = false;
	parts: FormArray;

	options: Array<Part> = [];
	vendors: Array<Vendor> = [];

	jsonHeader() {
		return new HttpHeaders({
			'Content-Type': 'application/json'
		});
	}

	constructor(
		private formBuilder: FormBuilder,
		private httpClient: HttpClient,
		private router: Router,
		private route: ActivatedRoute,
		private stateService: StateService
	) {
		const vehicle = this.stateService.getCurrentVehicle();
		const profile = this.stateService.getCurrentProfile();

		this.vin = vehicle.vin == null ? '' : vehicle.vin;
		this.username = profile.username == null ? '' : profile.username;

		this.buildForm();
		this.buildVendorForm();
	}

	ngOnInit() {
		this.getOptions();
		this.getVendors();
	}

	buildForm(): void {
		this.form = this.formBuilder.group({
			vendorName: '',
			parts: this.formBuilder.array([ this.createPart() ])
		});
	}

	buildVendorForm(): void {
		this.vendorForm = this.formBuilder.group({
			name: '',
			phone: '',
			street: '',
			city: '',
			state: '',
			zipCode: ''
		});
	}

	getOptions() {
		this.httpClient
			.get(`${environment.baseUrl}/getParts`, {
				headers: this.jsonHeader()
			})
			.subscribe((options: Array<Part>) => {
				this.options = options;
			});
	}

	getVendors() {
		this.httpClient
			.get(`${environment.baseUrl}/getVendors`, {
				headers: this.jsonHeader()
			})
			.subscribe((vendors: Array<Vendor>) => {
				this.vendors = vendors;
			});
	}

	addPart() {
		this.parts = this.form.get('parts') as FormArray;
		this.parts.push(this.createPart());
	}

	addVendor() {
		this.showVendorForm = !this.showVendorForm;
	}

	createPart(): FormGroup {
		return this.formBuilder.group({
			part: ''
		});
	}

	addPartsOrder() {
		const partsOrderData: PartsOrder = {
			username: this.username,
			vin: this.vin,
			vendorName: this.form.get('vendorName').value,
			parts: this.form.get('parts').value.map(function(obj) {
				return obj.part;
			})
		};

		this.httpClient
			.post(`${environment.baseUrl}/addPartsOrder`, partsOrderData, {
				headers: this.jsonHeader()
			})
			.subscribe(() => {});
	}

	saveVendor() {
		const newVendor: Vendor = {
			name: this.vendorForm.get('name').value,
			phone: this.vendorForm.get('phone').value,
			street: this.vendorForm.get('street').value,
			city: this.vendorForm.get('city').value,
			state: this.vendorForm.get('state').value,
			zipCode: this.vendorForm.get('zipCode').value
		};

		this.httpClient
			.post(`${environment.baseUrl}/saveVendor`, newVendor, {
				headers: this.jsonHeader()
			})
			.subscribe(() => {
				this.getVendors();
				this.showVendorForm = false;
			});
	}
}
