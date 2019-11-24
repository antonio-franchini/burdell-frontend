import { Injectable } from '@angular/core';
import { Vehicle } from '../models/Vehicle';
import { Profile } from '../models/Profile';

@Injectable({
	providedIn: 'root'
})
export class StateService {
	profile: Profile = null;
	currentVehicle: Vehicle = null;

	constructor() {}

	setCurrentProfile(profile: Profile) {
		this.profile = profile;
	}

	getCurrentProfile(): Profile {
		return this.profile;
	}

	isAuthenticated(): boolean {
		if (this.profile === null) {
			return false;
		} else {
			return true;
		}
	}

	getPermission(): string {
		if (this.profile === null) {
			return null;
		} else {
			return this.profile.permission;
		}
	}

	permissionMatches(p: string): boolean {
		if (this.profile === null) {
			return false;
		} else {
			return this.profile.permission === p || this.profile.permission === 'owner';
		}
	}

	setCurrentVehicle(vehicle: Vehicle) {
		this.currentVehicle = vehicle;
	}

	getCurrentVehicle(): Vehicle {
		return this.currentVehicle;
	}
}
