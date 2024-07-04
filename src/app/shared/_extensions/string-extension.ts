export {}

declare global {
	interface String {
        /**
         * Convert 'dd/MM/yyyy' format string to date object.
         */
		toCustomDate(): Date;
		isValidEmail(): boolean;
	}
}

String.prototype.toCustomDate = function (): Date {
  const dd = Number(this.substr(0, 2));
  const mm = Number(this.substr(3, 2)) - 1;
  const yy = Number(this.substr(6, 4));
	return new Date(yy, mm, dd, 12, 0, 0);
}

String.prototype.isValidEmail = function (): boolean {
	if(!this)
		return true;

	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
	return re.test(String(this).toLowerCase());
}

export { };   
