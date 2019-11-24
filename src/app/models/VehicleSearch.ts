import { Vehicle } from './Vehicle';

export interface VehicleSearch {
	vehicle: Vehicle;
	status: string; // sold/unsold
	permission: string; // inventory clerk, manager, salesperson, owner
}
