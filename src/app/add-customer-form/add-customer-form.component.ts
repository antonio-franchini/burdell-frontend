import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';
import { Customer } from '../models/Customer';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-add-customer-form',
	templateUrl: './add-customer-form.component.html',
	styleUrls: [ './add-customer-form.component.css' ]
})
export class AddCustomerFormComponent implements OnInit {
	customerForm: FormGroup;
	newCustomerType: string = 'Business';
	customerTypes: Array<string> = [ 'Business', 'Individual' ];
	showCustomerForm: boolean;

	@Output() customerSaved = new EventEmitter<string>();

	uploadComplete() {
		this.customerSaved.emit('complete');
	}
	jsonHeader() {
		return new HttpHeaders({
			'Content-Type': 'application/json'
		});
	}

	constructor(
		private formBuilder: FormBuilder,
		private httpClient: HttpClient,
		private router: Router,
		private stateService: StateService
	) {
		this.buildCustomerForm();
	}

	ngOnInit() {}

	buildCustomerForm(): void {
		this.customerForm = this.formBuilder.group({
			/* individual or business */
			type: '',

			/* general info */
			customerId: '',
			email: '',
			phone: '',
			street: '',
			city: '',
			state: '',
			zipCode: '',

			/* individual info */
			driverLicense: '',
			firstName: '',
			lastName: '',

			/* business info */
			taxId: '',
			name: '',
			contactName: '',
			contactTitle: ''
		});
	}

	addCustomer() {
		this.showCustomerForm = !this.showCustomerForm;
	}

	setNewCustomerType(type: string) {
		console.log('setNewCustomerType', type);

		this.newCustomerType = type;
	}

	saveCustomer() {
		const customer: Customer = {
			/* general */
			business: this.newCustomerType === 'Business',
			customerId: '',
			email: this.customerForm.get('email').value,
			phone: this.customerForm.get('phone').value,
			street: this.customerForm.get('street').value,
			city: this.customerForm.get('city').value,
			state: this.customerForm.get('state').value,
			zipCode: this.customerForm.get('zipCode').value,
			/* individual */
			driverLicense: this.customerForm.get('driverLicense').value,
			firstName: this.customerForm.get('firstName').value,
			lastName: this.customerForm.get('lastName').value,
			/* business */
			taxId: this.customerForm.get('taxId').value,
			name: this.customerForm.get('name').value,
			contactName: this.customerForm.get('contactName').value,
			contactTitle: this.customerForm.get('contactTitle').value
		};

		this.httpClient
			.post(`${environment.baseUrl}/saveCustomer`, customer, {
				headers: this.jsonHeader()
			})
			.subscribe(() => {
				this.showCustomerForm = false;
				this.customerSaved.emit();
			});
	}
}
