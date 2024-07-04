
import { Observable } from "rxjs";
import { MultiSelect } from "../models/multi-select.model";

export interface ISingleElementConfiguration {

	showMasterButton: boolean;
	showNullSelectionButton: boolean;
	preloadData: boolean;

	mainColHeader : string;
	column1 : ISingleElementTableColumn;
	column2 : ISingleElementTableColumn;
	action : ISingleElementTableColumn;

	hasCustomOrder : boolean;

	search : (term : string, size : number) => Observable<MultiSelect[]>;
}



export interface ISingleElementTableColumn {
	isVisible : boolean;
	header : string;
}