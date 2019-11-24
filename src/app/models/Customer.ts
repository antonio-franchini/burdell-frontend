export interface Customer {
	/* individual or business */
	business: boolean;

	/* general info */
	customerId: string;
	email: string;
	phone: string;
	street: string;
	city: string;
	state: string;
	zipCode: string;

	/* individual info */
	driverLicense: string;
	firstName: string;
	lastName: string;

	/* business info */
	taxId: string;
	name: string;
	contactName: string;
	contactTitle: string;
}
