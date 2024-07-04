import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnChanges {

	@Input() showDialog: boolean;
	@Input() confirmationMessage: string;

	@Output() onConfirm = new EventEmitter<boolean>();

	@ViewChild('confirmationModal', { static: false }) confirmationModal: ModalDirective;

	message: string;

	constructor() {	}

	ngOnChanges() {
		// If showModal=true is setted by the parent component, open the modal
		// else close the modal.

		if (this.confirmationModal != undefined) {

			if (this.showDialog) {
				if(this.confirmationMessage) {
					this.message = this.confirmationMessage
				}
				else {
					this.message = "Do you want to continue?";
				}

				this.confirmationModal.show();
			}
			else {
				this.confirmationModal.hide();
			}
		}

	}

	// Emit the selected choice (yes/no).
	onChoose(choice: boolean) {
		this.onConfirm.emit(choice);
	}

}
