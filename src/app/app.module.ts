import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchPageComponent } from './search-page/search-page.component';
import { PurchasedVehicleFormComponent } from './purchased-vehicle-form/purchased-vehicle-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { VehicleDetailsFormComponent } from './vehicle-details-form/vehicle-details-form.component';
import { PartOrderFormComponent } from './part-order-form/part-order-form.component';
import { SaleOrderFormComponent } from './sale-order-form/sale-order-form.component';
import { ReportsPageComponent } from './reports-page/reports-page.component';
import {
	MatRippleModule,
	MatInputModule,
	MatFormFieldModule,
	MatSelectModule,
	MatDatepickerModule,
	MatNativeDateModule
} from '@angular/material';
import { AddCustomerFormComponent } from './add-customer-form/add-customer-form.component';

const routes: Routes = [
	{ path: '', component: SearchPageComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'search-page', component: SearchPageComponent },
	{ path: 'purchased-vehicle-form', component: PurchasedVehicleFormComponent },
	{ path: 'vehicle-details-form/:vin', component: VehicleDetailsFormComponent },
	{ path: 'part-order-form', component: PartOrderFormComponent },
	{ path: 'sale-order-form', component: SaleOrderFormComponent },
	{ path: 'reports-page', component: ReportsPageComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		LoginComponent,
		SearchPageComponent,
		PurchasedVehicleFormComponent,
		VehicleDetailsFormComponent,
		PartOrderFormComponent,
		SaleOrderFormComponent,
		ReportsPageComponent,
		AddCustomerFormComponent
	],
	imports: [
		RouterModule.forRoot(routes),
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MatTableModule,
		MatInputModule,
		MatFormFieldModule,
		MatSelectModule,
		FormsModule,
		MatRippleModule,
		MatDatepickerModule,
		MatNativeDateModule
	],
	providers: [ { provide: LOCALE_ID, useValue: 'en-US' } ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
