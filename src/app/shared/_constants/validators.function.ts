export function IsValidEmail(email: string): [boolean, string | null] {

	if(!email)
		return [true, null];

	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
	const isValid = re.test(email.toLowerCase());

	if(!isValid)
		return [false, "Invalid email address"];

	return [true, null];
 }
