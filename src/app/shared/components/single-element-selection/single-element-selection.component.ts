import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { of, Subject } from 'rxjs';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { MultiSelect, SingleSelectWrapper } from '../../models/multi-select.model';
import { ISingleElementConfiguration } from '../../_interfaces/single-element-config.interface';

@Component({
	selector: 'app-ses',
	templateUrl: './single-element-selection.component.html',
	styleUrls: ['./single-element-selection.component.css']
})
export class SingleElementSelectionComponent implements OnInit, OnChanges, OnDestroy {

	/**
	 * Show/hide selection modal.
	 */
	@Input() showModal: boolean;

	/**
	 * Item will be marked as selected when item's key matched with this value.
	 */
	@Input() selectedOptionKey: string;


	@Input() configuration: ISingleElementConfiguration;

	/**
	 * This will be shown in the top Current value span.
	 */
	@Input() currentTitle: string;

	/**
	 * This value will be shown in the modal header.
	 */
	@Input() header: string;

	/**
	 * This value will determine if changing the find input field value refresh the dataset.
	 * If true, record set will br refreshed whenever find input field value changes.
	 */
	@Input() isFindEnabled: boolean = true;

	/**
	 * This value will be shown in the find input field whenever the modal is opened.
	 * And also during the modal open, dataset will be loaded basedd on this value.
	 */
	@Input() defaultTerm: string;


	// @Input() preloadData: boolean;
	@Input() recordSize: number = 100;

	@Output() buttonOneClicked = new EventEmitter<MultiSelect>();
	@Output() buttonTwoClicked = new EventEmitter<MultiSelect>();
	@Output() modalCloseEvent = new EventEmitter<SingleSelectWrapper>();
	@Output() masterButtonClicked = new EventEmitter<void>();


	@ViewChild('singleElementSelectModal', { static: true }) singleElementSelectModal: ModalDirective;


	allOptions: MultiSelect[] = [];
	pageSelectedOptionKey: string;

	searchTerm$ = new Subject<string>();
	searchTerm: string = "";
	optionSorter: string = "ASC";
	pageSize: number = 100;

	private subs = new SubSink();


	constructor() { }


	ngOnChanges() {

		if (this.showModal) {
			console.log(this.isFindEnabled);

			this.searchTerm = this.defaultTerm ? this.defaultTerm : "";
			this.optionSorter = "ASC";
			this.allOptions = [];

			this.pageSelectedOptionKey = this.selectedOptionKey;
			this.setRecordSize();

			console.log(this.searchTerm);

			if (this.configuration.preloadData) {
				this.loadDataOnPageLoad();
			}
			else {
				this.searchTerm$.next(this.searchTerm);
			}

			this.singleElementSelectModal.show();
		}
		else {
			this.singleElementSelectModal.hide();
		}


	}

	ngOnInit() {
		this.search();
	}

	private setRecordSize() {
		this.pageSize = this.configuration.preloadData ? 100 : this.recordSize;
	}


	private loadDataOnPageLoad() {
		this.subs.sink = this.configuration.search(this.searchTerm, this.pageSize)
			.subscribe({
				next: response => {
					this.allOptions = response;
					this.sortItems();
				},
				error: err => {
					console.log(err);
				}
			});
	}


	private search() {
		this.subs.sink = this.searchTerm$.pipe(
			debounceTime(400),
			filter(q => q != undefined && q != null),
			tap(console.log),
			switchMap(q => this.configuration.search(q, this.pageSize))
		).subscribe({
			next: response => {
				this.allOptions = response;
				this.sortItems();
			},
			error: err => {
				console.log(err);
			}
		});
	}

	onFindFieldChange() {
		if (this.isFindEnabled) {
			this.searchTerm$.next(this.searchTerm);
		}
	}

	onRecordSizeChange() {
		let q = this.searchTerm;

		// In pageload record size change
		if ((q == undefined || q == null || q == "") && this.allOptions.length > 0) {
			this.loadDataOnPageLoad();
		}
		else {
			this.onFindFieldChange();
		}
	}


	// Sort the allPageOptions rows.
	sortItems() {
		if (this.optionSorter == "ASC") {
			if (this.configuration.hasCustomOrder) {
				this.allOptions = this.allOptions.sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));
			}
			else {
				this.allOptions = this.allOptions.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
			}
		}
		else {
			if (this.configuration.hasCustomOrder) {
				this.allOptions = this.allOptions.sort((a, b) => (b?.order ?? 0) - (a?.order ?? 0));
			}
			else {
				this.allOptions = this.allOptions.sort((a, b) =>
					a.title.toLowerCase() < b.title.toLowerCase() ? 1 : a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 0
				);
			}
		}
	}










	onMasterButtonClicked() {
		this.masterButtonClicked.emit();
	}

	onRowSelect(item: MultiSelect) {
		// If the previosly selected item is clicked, unselect it
		// Otherwise mark this item as selected.
		this.pageSelectedOptionKey = this.pageSelectedOptionKey == item.key ? "" : item.key;
	}

	onFirstButtonClicked(key: string) {
		var selectedObject = this.allOptions.find(i => i.key == key);
		this.buttonOneClicked.emit(selectedObject)
	}


	onCloseSingleSelectModal(choice: any) {
		var selectedObject = this.allOptions.find(i => i.key == this.pageSelectedOptionKey);
		var obj = new SingleSelectWrapper(choice, selectedObject);
		this.modalCloseEvent.emit(obj);
	}

	onNullClicked() {
		var obj = new SingleSelectWrapper(true, null);
		this.modalCloseEvent.emit(obj);
	}


	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}
