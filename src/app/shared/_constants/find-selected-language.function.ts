export function getSelectedLanguageCode() {
	// let lang = localStorage.getItem('preferred-language');
	// if (!lang) {
	// 	lang = 'en-US';
	// 	localStorage.setItem('preferred-language', lang);
	// }
	// return lang;
    return "en-US";
}

export function getSelectedLanguageId() {
	let lang = localStorage.getItem('preferred-language');
	switch(lang) {
		case 'en-US' :
			return 1;
		case 'it' :
			return 2;			
		default:
			localStorage.setItem('preferred-language', 'it');
			return 2;
	}
}