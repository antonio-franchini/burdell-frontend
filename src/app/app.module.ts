import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchPageComponent } from './search-page/search-page.component';
import { PurchasedVehicleFormComponent } from './purchased-vehicle-form/purchased-vehicle-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'search-page', component: SearchPageComponent },
	{ path: 'purchased-vehicle-form', component: PurchasedVehicleFormComponent }
];

@NgModule({
	declarations: [ AppComponent, HeaderComponent, LoginComponent, SearchPageComponent, PurchasedVehicleFormComponent ],
	imports: [
		RouterModule.forRoot(routes),
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		HttpClientModule,
		MatTableModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
