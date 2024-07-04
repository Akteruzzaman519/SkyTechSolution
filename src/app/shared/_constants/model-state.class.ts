export class ModelState {
	private isAllValid = true;
	private errorMessages: string[] = [];

	addError(errorMsg?: string) {
		this.isAllValid = false;
		if (errorMsg) {
			this.errorMessages.push(errorMsg);
		}
	}

	get errorMessage(): string {
		if (this.errorMessages.length === 0) {
			return '';
		}

		return this.errorMessages.join('<br>');
	}

	get hasErrorMessage(): boolean {
		return this.errorMessages.length > 0;
	}

	get modelState(): boolean {
		return this.isAllValid;
	}
}
