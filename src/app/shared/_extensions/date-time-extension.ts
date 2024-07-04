declare global {
  interface Date {

    /**
     * Return the string representation of a Date object.
     * @param format 'D' for "dd/MM/yyyy", 'T' for "HH:mm:ss", 'DT' for "dd/MM/yyyy HH:mm:ss"
     */
    getDatePortion(format?: string): string;


    addDays(days: number): Date;
    addMonths(months: number): Date;
    addHours(hours: number): Date;
    addMinutes(minutes: number): Date;
  }
}

Date.prototype.getDatePortion = function (format?: string): string {
  //if (this === null || this === undefined)
  if (!this)
    return "";
  // Extracting date portion.
  let dd = this.getDate() < 10 ? "0" : "";
  dd += this.getDate().toString();

  // Extracting month portion.
  const month = this.getMonth() + 1;
  let MM = month < 10 ? "0" : "";
  MM += month.toString();

  // Extracting year portion.
  const yyyy = this.getFullYear().toString();

  // Extracting hour portion.
  let hh = this.getHours() < 10 ? "0" : "";
  hh += this.getHours().toString();

  // Extracting miniute portion.
  let min = this.getMinutes() < 10 ? "0" : "";
  min += this.getMinutes().toString();

  // Extracting  seconds portion.
  let ss = this.getSeconds() < 10 ? "0" : "";
  ss += this.getSeconds().toString();

  // Extracting miliseconds portion.
  //const milSs = this.getMilliseconds().toString();

  // return yyyy + "-" + MM + "-" + dd ; 
  format = format || "D";

  switch (format.toUpperCase()) {
    case "D":
      return dd + "/" + MM + "/" + yyyy;
    case "T":
      return hh + ":" + min + ":" + ss;
    case "DT":
      return dd + "/" + MM + "/" + yyyy + " " + hh + ":" + min + ":" + ss;
    case "DTH":
      return dd + "/" + MM + "/" + yyyy + " " + hh + ":" + min;
    default:
      return dd + "/" + MM + "/" + yyyy;
  }

}

Date.prototype.addMonths = function (months: number): Date {
  const dt = new Date(this.getTime() + (months * 30 * 24 * 60 * 60 * 1000));
  return dt;
}

Date.prototype.addDays = function (days: number): Date {
  const dt = new Date(this.getTime() + (days * 24 * 60 * 60 * 1000));
  return dt;
}

Date.prototype.addHours = function (hours: number): Date {
  const dt = new Date(this.getTime() + (hours * 60 * 60 * 1000));
  return dt;
}

Date.prototype.addMinutes = function (minutes: number): Date {
  const dt = new Date(this.getTime() + (minutes * 60 * 1000));
  return dt;
}

export { };
