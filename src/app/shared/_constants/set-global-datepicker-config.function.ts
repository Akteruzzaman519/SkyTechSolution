import { BsDatepickerConfig, BsDaterangepickerConfig } from "ngx-bootstrap/datepicker";

export function getDatepickerConfig(): BsDatepickerConfig {
	return Object.assign(new BsDatepickerConfig(), {
		dateInputFormat: 'DD/MM/YYYY',
		useUtc: false,
		showWeekNumbers: false,
		isAnimated: true,
		containerClass: 'theme-dark-blue',
		customTodayClass: 'custom-today-class'
	});
}

export function getDaterangepickerConfig(): BsDaterangepickerConfig {
	return Object.assign(new BsDaterangepickerConfig(), {
		dateInputFormat: 'DD/MM/YYYY',
    rangeInputFormat: 'DD/MM/YYYY',
		useUtc: false,
		showWeekNumbers: false,
		isAnimated: true,
		containerClass: 'theme-dark-blue',
		customTodayClass: 'custom-today-class'
	});
}
