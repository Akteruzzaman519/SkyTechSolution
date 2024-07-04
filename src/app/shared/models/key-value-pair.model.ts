export class KeyValuePair {
	key: string;
	value: string;
	description?: string;
}

export class StringKeyValuePair {
	sKey: string;
	values: string;
}

export class NumberKeyValuePair {
	key: number;
	value: string;
	description?: string | null;
}
