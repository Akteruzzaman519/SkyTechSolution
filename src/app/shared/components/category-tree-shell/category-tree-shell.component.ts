import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ModalDirective, ModalModule } from 'ngx-bootstrap/modal';
import { map } from 'rxjs';
import { MultiSelect } from 'shared/models/multi-select.model';
import { ProductGrid } from 'shared/models/product-grid.model';
import { CrossModuleService } from 'shared/services/cross-module.service';
import { SubSink } from 'subsink';
import { CategoryTreeComponent } from '../category-tree/category-tree.component';
import { NumberKeyValuePair } from 'shared/models/key-value-pair.model';
import { CategoryTree } from 'shared/models/category-tree.model';

@Component({
	selector: 'app-category-tree-shell',
	standalone: true,
	imports: [
		CommonModule,
		ModalModule,
		CategoryTreeComponent
	],
	providers: [CrossModuleService],
	templateUrl: './category-tree-shell.component.html',
	styleUrls: ['./category-tree-shell.component.css']
})
export class CategoryTreeShellComponent implements OnChanges {

	@Input() show = false;
	@Input() maxSelectable = 999999;
	@Input() selectedItemIds: number[] = [];

	@Output() onClose = new EventEmitter<NumberKeyValuePair[]>();

	@ViewChild('confirmationModal', { static: false })
	confirmationModal: ModalDirective;

	componentId = 'cat_tree'
	selectedCategoryId = 0;
	selectedCategoryName = '';
	public SearchProduct = "";
	allItems: MultiSelect[] = [];
	TempALlItems: MultiSelect[] = [];
	private subs = new SubSink();

	constructor(private crModuleService: CrossModuleService) {

	}

	ngOnChanges(changes: SimpleChanges): void {
		if(this.confirmationModal) {
			if(this.show) {
				this.loadProducts();
				this.confirmationModal.show();
			}
			else {
				this.confirmationModal.hide();
			}
		}
	}

	private loadProducts() {
		if(this.selectedCategoryId > 0) {
			this.subs.sink = this.crModuleService.getAllProductsForGrid(this.selectedCategoryId, 1, 1, 10000, '')
				.pipe(
					map((resItems: ProductGrid[]) => {
						return resItems.map(item => {
							return {
								key: item.productId.toString(),
								title: item.productName,
								isChecked: this.selectedItemIds.some(a => a == item.productId)
							} as MultiSelect
						})
					})
				).subscribe({
					next: (response) => {
						console.log(response);
						this.allItems = response;
						this.TempALlItems = response;
						var inputElement = document.getElementById("txtSearchProduct") as any;
						if(inputElement){
							inputElement.value = "";
						}
					},
					error: (err) => {
						console.log(err);
						this.allItems = [];
						this.TempALlItems = [];
						var inputElement = document.getElementById("txtSearchProduct") as any;
						if(inputElement){
							inputElement.value = "";
						}
					}
				});
		}
		else {
			this.allItems = [];
			this.TempALlItems = [];
			var inputElement = document.getElementById("txtSearchProduct") as any;
			if (inputElement) {
				inputElement.value = "";
			}
		}
	}

	onCategorySelected(category: CategoryTree) {
		this.selectedCategoryId = category.categoryId;
		this.selectedCategoryName = category.categoryName;
		this.loadProducts();
	}

	onOptionChange($event: any, option: MultiSelect) {
		if($event.target.checked) {
			option.isChecked = true;
		}
      else {
			option.isChecked = true;
		}
	}

	onKeyUpSearch(){
		
		var inputElement = document.getElementById("txtSearchProduct") as any;
		if (inputElement) {
			this.SearchProduct = inputElement.value == null ? "" : inputElement.value;
			this.allItems = this.TempALlItems.filter(c => c.title.toLowerCase().includes(this.SearchProduct.toLowerCase()) )
		  } 
		  else{
			this.allItems = this.TempALlItems;
		  }
	}
	
	onChoose(choice: boolean) {
		if(choice) {
			const selectedItems = this.allItems
					.filter(a => a.isChecked)
					.map(itm => {
						return {
							key: Number.parseInt(itm.key),
							value:  this.selectedCategoryName + " | " +itm.title
						} as NumberKeyValuePair
					})
			this.onClose.emit(selectedItems);
		}
		else {
			this.onClose.emit([]);
		}
	}


	ngOnDestroy() {
		this.subs.unsubscribe();
	}
}
