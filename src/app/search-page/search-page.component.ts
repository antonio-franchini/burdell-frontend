import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle';
import { MatTableDataSource } from '@angular/material';

@Component({
	selector: 'app-search-page',
	templateUrl: './search-page.component.html',
	styleUrls: [ './search-page.component.css' ]
})
export class SearchPageComponent implements OnInit {
	form: FormGroup;
	vehicles: Array<Vehicle>;
	dataSource: MatTableDataSource<Vehicle>;
	displayedColumns: string[] = [ 'vin', 'type', 'make', 'model', 'year', 'colors', 'mileage', 'price' ];

	jsonHeader() {
		return new HttpHeaders({
			'Content-Type': 'application/json'
		});
	}

	constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
		this.buildForm();
	}

	buildForm(): void {
		this.form = this.formBuilder.group({
			make: [ '' ],
			model: [ '' ],
			year: [ '' ],
			type: [ '' ],
			colors: [ '' ],
			keyword: [ '' ],
			vin: [ '' ]
		});
	}

	ngOnInit() {
		this.searchVehicles();
	}

	searchVehicles() {
		const searchData = {
			vin: this.form.controls['vin'].value,
			type: this.form.controls['type'].value,
			make: this.form.controls['make'].value,
			model: this.form.controls['model'].value,
			year: this.form.controls['year'].value,
			colors: this.form.controls['colors'].value,
			keyword: this.form.controls['keyword'].value
		};

		this.httpClient
			.post(`${environment.baseUrl}/searchVehicles`, searchData, {
				headers: this.jsonHeader()
			})
			.subscribe((vehicles: Array<Vehicle>) => {
				this.vehicles = vehicles;
				this.dataSource = new MatTableDataSource(vehicles);
			});
	}
}
