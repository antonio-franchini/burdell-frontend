import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	role: string = null;

	constructor() {}

	setRole(role: string) {
		this.role = role;
	}

	getRole(): string {
		return this.role;
	}
}
