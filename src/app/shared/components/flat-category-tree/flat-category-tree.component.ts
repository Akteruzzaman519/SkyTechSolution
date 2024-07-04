import { FlatTreeControl } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';

@Component({
	selector: 'app-flat-category-tree',
	standalone: true,
	imports: [
		CommonModule,
		MatTreeModule,
		MatIconModule
	],
	templateUrl: './flat-category-tree.component.html',
	styleUrls: ['./flat-category-tree.component.css']
})
export class FlatCategoryTreeComponent implements AfterViewInit {

	selectedId = 'Pumpkins';

	private transformer = (node: FoodNode, level: number) => {
		return {
			expandable: !!node.children && node.children.length > 0,
			name: node.name,
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
		(node) => node.children
	);

	dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

	constructor() {
		this.dataSource.data = TREE_DATA;
	}

	ngAfterViewInit(): void {
		console.log(this.treeControl);
	}

	hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

	expandNode() {
		console.log(this.treeControl.dataNodes);

		let expandableNodes: number[] = [];


		const nodeIndex = this.treeControl.dataNodes.findIndex(a => a.name == this.selectedId);
		if(nodeIndex >= 0) {

			expandableNodes.push(nodeIndex);
			let parentNodeLevel = (this.treeControl.dataNodes.at(nodeIndex)?.level ?? 0) - 1;

			for(let ind = nodeIndex-1; ind >= 0; ind--) {
				if(this.treeControl.dataNodes.at(ind)?.level === parentNodeLevel) {
					expandableNodes.push(ind);
					parentNodeLevel = parentNodeLevel - 1;
				}
			}

			console.log(expandableNodes);
		}

		expandableNodes.forEach(node => {
			this.treeControl.expand(this.treeControl.dataNodes[node]);
		})
	}


	onNodeClicked(node: FoodNode) {
		console.log(node);
		console.log(this.treeControl);
	}

	testExpand() {

		// this.treeControl.collapseAll();		// Working
		// this.treeControl.expandAll();

		// this.treeControl.expand(this.dataSource.data.find(a => a.name == this.selectedId)!)

		// this.treeControl.expandDescendants({
		// 	name: 'Fruit',
		// 	children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
		//  });
	}
}




/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
	name: string;
	children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
	{
		name: 'Fruit',
		children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
	},
	{
		name: 'Vegetables',
		children: [
			{
				name: 'Green',
				children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
			},
			{
				name: 'Orange',
				children: [
					{ name: 'Pumpkins', children: [{ name: 'Pumpkin a' }, { name: 'Pumpkin B' }] },
					{ name: 'Carrots' }],
			},
		],
	},
];


/** Flat node with expandable and level information */
interface ExampleFlatNode {
	expandable: boolean;
	name: string;
	level: number;
}
