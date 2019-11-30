import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/Customer';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PartsOrder } from '../models/PartsOrder';
import { Part } from '../models/Part';
import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { StateService } from '../services/state.service';
import { Vendor } from '../models/Vendor';
import { Loan } from '../models/Loan';
import { DatePipe } from '@angular/common';
import { SaleOrder } from '../models/SaleOrder';

@Component({
	selector: 'app-sale-order-form',
	templateUrl: './sale-order-form.component.html',
	styleUrls: [ './sale-order-form.component.css' ]
})
export class SaleOrderFormComponent implements OnInit {
	vin: string;
	username: string;
	form: FormGroup;
	setUpLoan: boolean = false;
	customers: Array<Customer> = [];

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
		const username = profile == null ? '' : profile.username;
		this.vin = vehicle.vin == null ? '' : vehicle.vin;
		this.username = username == null ? '' : username;

		this.buildForm();
	}

	ngOnInit() {
		this.getCustomers();
	}

	buildForm(): void {
		this.form = this.formBuilder.group({
			startMonth: '',
			term: '',
			payment: '',
			interest: '',
			downPayment: '',
			customerId: '',
			saleDate: ''
		});
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

	addLoan() {
		this.setUpLoan = !this.setUpLoan;
	}

	addSaleOrder() {
		const loan: Loan = {
			startMonth: new DatePipe('en-US').transform(this.form.get('startMonth').value, 'yyyy-MM-dd'),
			term: this.form.get('term').value,
			payment: this.form.get('payment').value,
			interest: this.form.get('interest').value,
			downPayment: this.form.get('downPayment').value,
			customerId: this.form.get('customerId').value,
			vin: this.vin
		};

		const saleOrder: SaleOrder = {
			vin: this.vin,
			salepersonName: this.username,
			saleDate: new DatePipe('en-US').transform(this.form.get('saleDate').value, 'yyyy-MM-dd'),
			buyerCustomerId: this.form.get('customerId').value,
			loan: this.setUpLoan ? loan : null
		};

		this.httpClient
			.post(`${environment.baseUrl}/addSaleOrder`, saleOrder, {
				headers: this.jsonHeader()
			})
			.subscribe((success) => {
				if (success) {
					alert('Success!');
				} else {
					alert('Failure!');
				}
			});
	}
}
