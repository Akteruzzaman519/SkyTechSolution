export class MultiSelect {
	key: string;
	title: string;
	shortDescription: string;
	fullDescription: string;
	additionalDescription: string;
	additionalDescription2: string;
	order?: number;

	isChecked: boolean = false;
}




export class MultiSelectWrapper {
	isSaved: boolean;
	selectedOptions: MultiSelect[] = [];

	/**
	 *
	 */
	constructor(choice: boolean, options: MultiSelect[]) {
		this.isSaved = choice;
		if (choice) {
			this.selectedOptions = options;
		}
	}
}



export class SingleSelectWrapper {
	isSaved: boolean;
	selectedOption?: MultiSelect | null;

	/**
	 *
	 */
	constructor(choice: boolean, option?: MultiSelect | null) {
		this.isSaved = choice;
		if (choice) {
			this.selectedOption = option;
		}
	}
}
