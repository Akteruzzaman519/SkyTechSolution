import { FlatTreeControl } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { CategoryTree } from 'shared/models/category-tree.model';
import { CrossModuleService } from 'shared/services/cross-module.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-category-tree',
	standalone: true,
	imports: [
		CommonModule,
		MatTreeModule,
		MatIconModule
	],
	providers: [
		CrossModuleService
	],
	templateUrl: './category-tree.component.html',
	styleUrls: ['./category-tree.component.css']
})
export class CategoryTreeComponent implements OnChanges, OnInit, OnDestroy {

	@Input() show = false;
	@Output() onCategorySelected = new EventEmitter<CategoryTree>();

	selectedId = -1;
	private subs = new SubSink();

	constructor(private crModuleService: CrossModuleService) {

	}

	ngOnChanges(changes: SimpleChanges): void {
		// this.selectedId = -1;
	}

	ngOnInit(): void {
		this.subs.sink = this.crModuleService.getProductCategoriesInTreeview()
			.subscribe({
				next: (response) => {
					this.dataSource.data = response;
				},
				error: (err) => {
					console.log(err);
				}
			});
	}

	private transformer = (node: CategoryTree, level: number) => {
		return {
			expandable: !!node.childCategories && node.childCategories.length > 0,
			name: node.categoryName,
			id: node.categoryId,
			level: level,
		};
	};

	treeControl = new FlatTreeControl<ExampleFlatNode>(
		(node) => node.level,
		(node) => node.expandable
	);

	treeFlattener = new MatTreeFlattener(
		this.transformer,
		(node) => node.level,
		(node) => node.expandable,
		(node) => node.childCategories
	);


	dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

	hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

	expandNode() {
		let expandableNodes: number[] = [];

		const nodeIndex = this.treeControl.dataNodes.findIndex(a => a.id == this.selectedId);
		if(nodeIndex >= 0) {

			expandableNodes.push(nodeIndex);
			let parentNodeLevel = (this.treeControl.dataNodes.at(nodeIndex)?.level ?? 0) - 1;

			for(let ind = nodeIndex-1; ind >= 0; ind--) {
				if(this.treeControl.dataNodes.at(ind)?.level === parentNodeLevel) {
					expandableNodes.push(ind);
					parentNodeLevel = parentNodeLevel - 1;
				}
			}
		}

		expandableNodes.forEach(node => {
			this.treeControl.expand(this.treeControl.dataNodes[node]);
		})
	}


	onNodeClicked(node: ExampleFlatNode) {
		this.selectedId = node.id;
		this.onCategorySelected.emit({
			categoryId: node.id,
			categoryName: node.name,
			childCategories: []
		});
	}

	ngOnDestroy(): void {
		 this.subs.unsubscribe();
	}
}


/** Flat node with expandable and level information */
interface ExampleFlatNode {
	expandable: boolean;
	id: number;
	name: string;
	level: number;
}
