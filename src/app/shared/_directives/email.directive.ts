import { AbstractControl, ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
	
		if(control.value == null)
			return null;
		const forbidden = re.test(control.value);
		return forbidden ? null : { forbiddenName: { value: control.value } } ;
	};
}