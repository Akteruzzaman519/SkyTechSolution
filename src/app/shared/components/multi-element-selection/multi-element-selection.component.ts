import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MultiSelect, MultiSelectWrapper } from '../../models/multi-select.model';
import { IMESConfiguration } from '../../_interfaces/multi-element-config.interface';

@Component({
	selector: 'app-mes',
	templateUrl: './multi-element-selection.component.html',
	styleUrls: ['./multi-element-selection.component.css']
})
export class MultiElementSelectionComponent implements OnChanges, OnInit {

	@Input() showModal: boolean;
	@Input() allOptions: MultiSelect[];
	@Input() allSelectedOptions: MultiSelect[];
	@Input() maxSelectable: number = 99999;
	@Input() configuration: IMESConfiguration;
	@Input() componentId: string = "";


	@Output() modalCloseEvent = new EventEmitter<MultiSelectWrapper>();

	@ViewChild('multiSelectModal', { static: true }) multiSelectModal: ModalDirective;


	allPageOptions: MultiSelect[] = [];
	allPageSelectedOptions: MultiSelect[] = [];

	searchTerm: string = "";
	showSelectedToo: boolean = false;

	optionSorter: string = "ASC";
	selectedSorter: string = "ASC";


	constructor(
		private toastr: ToastrService
	) {

	}

	ngOnInit() {

	}


	ngOnChanges() {

		if (this.showModal) {

			this.searchTerm = "";
			// this.showSelectedToo = false;
			this.optionSorter = "ASC";
			this.selectedSorter = "ASC";

			this.setAllPageSelectedOptions();
			this.setAllPageOptions();
			this.multiSelectModal.show();
		}
		else {
			this.multiSelectModal.hide();
		}
	}

	setAllPageOptions() {

		this.allPageOptions = [];
		this.allOptions.forEach( opt => {
			var tempObj = Object.assign({}, opt);

			// check if selected option contain this item
			if(this.allPageSelectedOptions.some(a => a.key == opt.key)) {
				tempObj.isChecked = true;
			}
			else {
				tempObj.isChecked = false;
			}

			if(tempObj.isChecked && !this.showSelectedToo) {

			}
			else {
				if(!this.searchTerm) {
					this.allPageOptions.push(tempObj);
				}
				else {
					var isMatched = false;
					var tempTerm = this.searchTerm.toLowerCase();
					if(tempObj.title && tempObj.title.toLowerCase().includes(tempTerm))
						isMatched = true;
					else if(tempObj.shortDescription &&  tempObj.shortDescription.toLowerCase().includes(tempTerm))
						isMatched = true;
					else if(tempObj.fullDescription && tempObj.fullDescription.toLowerCase().includes(tempTerm))
						isMatched = true;

					if(isMatched) {
						this.allPageOptions.push(tempObj);
					}
				}
			}

		});

		this.leftSort();

	}



	private setAllPageSelectedOptions() {

		this.allPageSelectedOptions = [];
		this.allSelectedOptions.forEach( opt => {
			var tempObj = Object.assign({}, opt);
			tempObj.isChecked = true;
			this.allPageSelectedOptions.push(tempObj);
		});

		this.rightSort();
	}


	onOptionChange($event: any, option: any) {

		if($event.target.checked) {

			if(this.allPageSelectedOptions.length < this.maxSelectable) {
				var selectedObj = this.allPageOptions.find(a => a.key == option);
				var tempObj = Object.assign({}, selectedObj);
				tempObj.isChecked = true;
				this.allPageSelectedOptions.push(tempObj);
			}
			else {
				this.toastr.error(`Maximum of ${this.maxSelectable} items can be selected`);
			}
		}
        else {
			var index = this.allPageSelectedOptions.findIndex(a => a.key == option);
			this.allPageSelectedOptions.splice(index, 1);
		}

		this.rightSort();
		// this.reorderSelectedOption();
		this.setAllPageOptions();
	}

	onSelectedOptionChange($event: any, option: any) {
		var index = this.allPageSelectedOptions.findIndex(a => a.key == option);
		this.allPageSelectedOptions.splice(index, 1);

		this.rightSort();
		// this.reorderSelectedOption();

		this.setAllPageOptions();
	}


	private reorderSelectedOption() {
		this.allPageSelectedOptions.forEach((item, index) => {
			item.order = index + 1;
		});
	}


	onReordered(direction: string, index: number) {
		var selectedObj = this.allPageSelectedOptions[index];

		switch(direction) {
			case 'up' :
				if(index > 0) {
					this.allPageSelectedOptions.splice((index - 1), 0, selectedObj);
					this.allPageSelectedOptions.splice((index + 1), 1);
				}
				break;
			case 'down' :
				if(index < ( this.allPageSelectedOptions.length - 1)) {
					this.allPageSelectedOptions.splice((index + 2), 0, selectedObj);
					this.allPageSelectedOptions.splice(index, 1);
				}
				break;
			default :
				break;
		}

		this.reorderSelectedOption();
	}


	toggleShowSelected() {
		this.showSelectedToo = !this.showSelectedToo;
		this.setAllPageOptions();
	}

	leftSort() {
		if(this.optionSorter == "ASC") {
			// If data needs to be orderedd by custom prder provided in configuration,
			// Order all the elements according to order property.
			// Else order all the elements according to title.
			if(this.configuration.hasCustomOrder) {
				this.allPageOptions = this.allPageOptions.sort((a, b) => (a?.order??0) - (b.order??0));
			}
			else {
				this.allPageOptions = this.allPageOptions.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
			}
		}
		else {
			if(this.configuration.hasCustomOrder) {
				this.allPageOptions = this.allPageOptions.sort((a, b) => (b.order??0) -(a?.order??0));
			}
			else {
				this.allPageOptions = this.allPageOptions.sort((a, b) =>
					a.title.toLowerCase() < b.title.toLowerCase() ? 1 : a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 0
				);
			}

		}

	}

	rightSort() {
		if(this.configuration.rightAutoOrder) {
			if(this.selectedSorter == "ASC") {
				this.allPageSelectedOptions = this.allPageSelectedOptions.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
			}
			else {
				this.allPageSelectedOptions = this.allPageSelectedOptions.sort((a, b) =>
					a.title.toLowerCase() < b.title.toLowerCase() ? 1 : a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 0
				);
			}

			this.reorderSelectedOption();
		}

	}

	onFilterOptions() {
		var tempOptions: MultiSelect[] = [];

	}



	onCloseMultiSelectModal(save: boolean = false) {

		var obj = new MultiSelectWrapper(save, this.allPageSelectedOptions);
		this.modalCloseEvent.emit(obj);
	}

	onFirstButtonClicked(item: any) {

	}

}

