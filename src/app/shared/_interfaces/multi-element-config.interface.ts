import { ISingleElementTableColumn } from './single-element-config.interface';

export interface IMESConfiguration {

	mainColHeader : string;
	column1 : ISingleElementTableColumn;
	column2 : ISingleElementTableColumn;
	action : ISingleElementTableColumn;

	hasCustomOrder : boolean;

	rightAutoOrder : boolean;

}
