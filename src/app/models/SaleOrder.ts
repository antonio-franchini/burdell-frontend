import { Loan } from './Loan';

export interface SaleOrder {
	vin: string;
	salepersonName: string;
	saleDate: string;
	buyerCustomerId: string;
	loan: Loan;
}
