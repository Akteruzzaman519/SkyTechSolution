/**
 * Return the string representation of a Date object.
 * @param format 'D' for "dd/MM/yyyy", 'T' for "HH:mm:ss", 'DT(default)' for "dd/MM/yyyy HH:mm:ss"
 */
export function formatDateTimeString(val?: any, format?: string): string {
	var dateTimeVal = new Date(val);
	if (dateTimeVal.toDateString() === "Invalid Date" || val === null) {
		return "";
	}

	if (format == null)
		format = "DT";

	// Extracting date portion.
	var dd = dateTimeVal.getDate() < 10 ? "0" : "";
	dd += dateTimeVal.getDate().toString();

	// Extracting month portion.
	var month = dateTimeVal.getMonth() + 1;
	var MM = month < 10 ? "0" : "";
	MM += month.toString();

	// Extracting year portion.
	var yyyy = dateTimeVal.getFullYear().toString();

	// Extracting hour portion.
	var hh = dateTimeVal.getHours() < 10 ? "0" : "";
	hh += dateTimeVal.getHours().toString();

	// Extracting miniute portion.
	var min = dateTimeVal.getMinutes() < 10 ? "0" : "";
	min += dateTimeVal.getMinutes().toString();

	// Extracting  seconds portion.
	var ss = dateTimeVal.getSeconds() < 10 ? "0" : "";
	ss += dateTimeVal.getSeconds().toString();

	// Extracting miliseconds portion.
	var milSs = dateTimeVal.getMilliseconds().toString();

	switch(format.toUpperCase()) {
		case "D" :
			return dd + "/" + MM + "/" + yyyy;
		case "T" :
			return hh + ":" + min + ":" + ss;
		case "DT" :
			return dd + "/" + MM + "/" + yyyy + " " + hh + ":" + min + ":" + ss;
		case "DTH" :
			return dd + "/" + MM + "/" + yyyy + " " + hh + ":" + min;
		default:
			return dd + "/" + MM + "/" + yyyy;
	}
}