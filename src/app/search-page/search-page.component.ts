import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/Vehicle';
import { MatTableDataSource } from '@angular/material';
import { StateService } from '../services/state.service';
import { Router } from '@angular/router';
import { VehicleSearch } from '../models/VehicleSearch';
import { Customer } from '../models/Customer';
import { VehicleType } from '../models/VehicleType';
import { VehicleMake } from '../models/VehicleMake';
import { Color } from '../models/Color';

@Component({
	selector: 'app-search-page',
	templateUrl: './search-page.component.html',
	styleUrls: [ './search-page.component.css' ]
})
export class SearchPageComponent implements OnInit {
	form: FormGroup;
	vehicles: Array<Vehicle> = [];
	dataSource = new MatTableDataSource(this.vehicles);
	displayedColumns: string[] = [ 'vin', 'type', 'make', 'model', 'year', 'colors', 'mileage', 'price' ];
	customerTypes: Array<string> = [ 'Business', 'Individual' ];
	vehicleMakes: Array<VehicleMake> = [];
	vehicleTypes: Array<VehicleType> = [];
	colors: Array<Color> = [];
	statuses: Array<string> = [ 'Sold', 'Unsold' ];

	productNames: string[];
	operationNames: string[];
	batchJobNames: string[];

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
		this.buildForm();
		this.dataSource.filterPredicate = (data: Vehicle, filter: string) => {
			const vin = data.vin.trim().toLowerCase().indexOf(this.form.value.vinFilter) !== -1;
			const type = data.type.trim().toLowerCase().indexOf(this.form.value.typeFilter) !== -1;
			const make = data.make.trim().toLowerCase().indexOf(this.form.value.makeFilter) !== -1;
			const model = data.model.trim().toLowerCase().indexOf(this.form.value.modelFilter) !== -1;
			const year = data.year.trim().toLowerCase().indexOf(this.form.value.yearFilter) !== -1;
			const colors = data.colors.trim().toLowerCase().indexOf(this.form.value.colorFilter) !== -1;
			return vin && type && make && model && year && colors;
		};
	}

	setFilter(filterNumber: string, filter: string) {
		this.form.controls[filterNumber].setValue(filter.trim().toLowerCase());

		/* this.dataSource.filter needs to be set to something other than the empty string,
		this triggers filterPredicate to be called */
		this.dataSource.filter = 'stub';
	}

	buildForm(): void {
		this.form = this.formBuilder.group({
			make: [ null ],
			model: [ null ],
			year: [ null ],
			type: [ null ],
			colors: [ null ],
			keyword: [ null ],
			vin: [ null ],
			status: [ null ],
			vinFilter: '',
			typeFilter: '',
			makeFilter: '',
			modelFilter: '',
			yearFilter: '',
			colorFilter: ''
		});
	}

	ngOnInit() {
		this.searchVehicles();
		this.getVehicleMakes();
		this.getVehicleTypes();
		this.getColors();
	}

	searchVehicles() {
		const vehicle: Vehicle = {
			vin: this.coalesce(this.form.controls['vin'].value),
			type: this.coalesce(this.form.controls['type'].value),
			make: this.coalesce(this.form.controls['make'].value),
			model: this.coalesce(this.form.controls['model'].value),
			year: this.coalesce(this.form.controls['year'].value),
			description: this.coalesce(this.form.controls['keyword'].value),
			inventoryClerkName: null,
			salepersonName: null,
			mileage: null,
			purchasePrice: null,
			condition: null,
			purchaseDate: null,
			saleDate: null,
			buyerCustomerId: null,
			sellerCustomerId: null,
			colors: this.coalesce(this.form.controls['colors'].value)
		};

		const vehicleSearch: VehicleSearch = {
			vehicle: vehicle,
			status: this.coalesce(this.form.controls['status'].value),
			permission: this.stateService.getPermission()
		};

		this.httpClient
			.post(`${environment.baseUrl}/searchVehicles`, vehicleSearch, {
				headers: this.jsonHeader()
			})
			.subscribe((vehicles: Array<Vehicle>) => {
				this.vehicles = vehicles;
				this.dataSource = new MatTableDataSource(vehicles);
			});
	}

	coalesce(str: string): string {
		return str == '' ? null : str;
	}

	viewDetails(vehicle: Vehicle) {
		this.router.navigate([ '/vehicle-details-form', vehicle.vin ]);
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
