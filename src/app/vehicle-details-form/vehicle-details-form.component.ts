import { Component, OnInit } from '@angular/core';
import { Part } from '../models/Part';
import { MatTableDataSource } from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/Vehicle';
import { Customer } from '../models/Customer';
import { Loan } from '../models/Loan';
import { Profile } from 'selenium-webdriver/firefox';
import { ChangeDetectorRef } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
	selector: 'app-vehicle-details-form',
	templateUrl: './vehicle-details-form.component.html',
	styleUrls: [ './vehicle-details-form.component.css' ]
})
export class VehicleDetailsFormComponent implements OnInit {
	stateService: StateService;
	vin: string;
	vehicle: Vehicle = null;
	salesPrice: Number;
	saleperson: Profile = null;
	inventoryClerk: Profile = null;
	seller: Customer = null;
	buyer: Customer = null;
	loan: Loan = null;
	parts: Array<Part> = [];
	totalCostParts: number = 0;
	changedParts: Array<Part> = [];
	dataSource: MatTableDataSource<Part>;
	displayedColumns: string[] = [
		'partOrderNumber',
		'partNumber',
		'username',
		'description',
		'vendorName',
		'cost',
		'status'
	];

	jsonHeader() {
		return new HttpHeaders({
			'Content-Type': 'application/json'
		});
	}

	constructor(
		private httpClient: HttpClient,
		private router: Router,
		private route: ActivatedRoute,
		private changeDetectorRef: ChangeDetectorRef,
		stateService: StateService
	) {
		this.stateService = stateService;
		this.vin = this.route.snapshot.paramMap.get('vin');
	}

	ngOnInit() {
		this.getVehicle(this.vin);
		this.getParts(this.vin);
		this.getSaleperson(this.vin);
		this.getInventoryClerk(this.vin);
		this.getBuyer(this.vin);
		this.getSeller(this.vin);
		this.getLoan(this.vin);
	}

	getVehicle(vin: string) {
		this.httpClient
			.get(`${environment.baseUrl}/getVehicle/${vin}`, {
				headers: this.jsonHeader()
			})
			.subscribe((vehicle: Vehicle) => {
				this.vehicle = vehicle;
				this.salesPrice = 1.25 * Number(vehicle.purchasePrice);
				this.stateService.setCurrentVehicle(this.vehicle);
				console.log('vehicle', vehicle);
			});
	}

	getSaleperson(vin: String) {
		this.httpClient
			.get(`${environment.baseUrl}/getSaleperson/${vin}`, {
				headers: this.jsonHeader()
			})
			.subscribe((saleperson: Profile) => {
				this.saleperson = saleperson;
				console.log('saleperson', saleperson);
			});
	}

	getInventoryClerk(vin: String) {
		this.httpClient
			.get(`${environment.baseUrl}/getInventoryClerk/${vin}`, {
				headers: this.jsonHeader()
			})
			.subscribe((inventoryClerk: Profile) => {
				this.inventoryClerk = inventoryClerk;
				console.log('inventoryClerk', inventoryClerk);
			});
	}

	getParts(vin: String) {
		this.httpClient
			.get(`${environment.baseUrl}/getParts/${vin}`, {
				headers: this.jsonHeader()
			})
			.subscribe((parts: Array<Part>) => {
				this.parts = parts;
				this.dataSource = new MatTableDataSource(parts);
				parts.forEach((element) => {
					this.totalCostParts += parseFloat(element.cost);
				});
				console.log('parts', parts);
			});
	}

	getSeller(vin: String) {
		this.httpClient
			.get(`${environment.baseUrl}/getCustomerSeller/${vin}`, {
				headers: this.jsonHeader()
			})
			.subscribe((seller: Customer) => {
				this.seller = seller;
				console.log('seller', seller);
			});
	}

	getBuyer(vin: String) {
		this.httpClient
			.get(`${environment.baseUrl}/getCustomerBuyer/${vin}`, {
				headers: this.jsonHeader()
			})
			.subscribe((buyer: Customer) => {
				this.buyer = buyer;
				console.log('buyer', buyer);
			});
	}

	getLoan(vin: String) {
		this.httpClient
			.get(`${environment.baseUrl}/getLoan/${vin}`, {
				headers: this.jsonHeader()
			})
			.subscribe((loan: Loan) => {
				this.loan = loan;
				console.log('loan', loan);
			});
	}

	getNextStatus(currentStatus: string): string {
		if (currentStatus === 'ordered') {
			return 'received';
		}
		if (currentStatus === 'received') {
			return 'installed';
		} else {
			return 'installed';
		}
	}

	setStatus(part: Part) {
		const targetPart: Part = this.parts.find(function(element) {
			return element.partOrderNumber === part.partOrderNumber && element.partNumber === part.partNumber;
		});

		targetPart.status = this.getNextStatus(targetPart.status);
		this.changedParts.push(targetPart);
	}

	submitStatusChanges() {
		this.httpClient
			.post(`${environment.baseUrl}/submitPartStatusChanges`, this.changedParts, {
				headers: this.jsonHeader()
			})
			.subscribe(() => {});
	}

	cancelStatusChanges() {
		this.getParts(this.vin);
	}
}
