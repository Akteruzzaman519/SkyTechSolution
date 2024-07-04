import { HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, delay, of } from 'rxjs';
import { CategoryTree } from 'shared/models/category-tree.model';
import { NumberKeyValuePair } from 'shared/models/key-value-pair.model';
import { MultiSelect } from 'shared/models/multi-select.model';
import { ProductGrid } from 'shared/models/product-grid.model';
import { CommonService } from 'shared/services/common.service';

@Injectable()
export class CrossModuleService extends CommonService {

	/**
	 *
	 * @returns Observable<NumberKeyValuePair[]>
	 */
	getAllCountries() {
		const countries: NumberKeyValuePair[] = [
			{ key: 1, value: 'Bangladesh' }
		];
		return of(countries);
		//return this.http.get<NumberKeyValuePair[]>
		//		(`${this.apiBaseUrl}/User/GetCountriesInKeyValueFormat/`);
	}


	/**
	* Upload an attachment file.
	*/
	uploadFile(file: File, destinationFolder: string | null = null) {
		const options = {
			headers: new HttpHeaders({
				'Show-Loader': 'true'
			})
		};
		const formData = new FormData();
		formData.append('iFile', file);

		let apiAddress = `File/UploadFile`;
		if (destinationFolder) {
			apiAddress += `/${destinationFolder}`;
		}

		return this.http.post<any>(`${this.apiBaseUrl}/${apiAddress}`, formData, options);
	}


	downloadFile(id: number) {
		const httpOptions = {
			observe: 'response' as 'response',
			responseType: 'blob' as 'json'
		};

		return this.http.get<any>(`${this.apiBaseUrl}/File/GetFileById/${id}`, httpOptions);
	}


	downloadFileByName(fileName: string) {
		const httpOptions = {
			observe: 'response' as 'response',
			responseType: 'blob' as 'json'
		};

		return this.http.get<any>(`${this.apiBaseUrl}/File/GetFileFromDirectoryByName/${fileName}`, httpOptions);
	}


	loadAllProductGroupsForSelection(): Observable<NumberKeyValuePair[]> {
		return this.http.get<NumberKeyValuePair[]>(`${this.apiBaseUrl}/ProductGroup/GetProductGroupsInKeyValue`);
	}

	getProductParentCategories(): Observable<NumberKeyValuePair[]> {
		return this.http.get<NumberKeyValuePair[]>(`${this.apiBaseUrl}/Product/GetProductParentCategories`);
	}

	getJobTypesInKeyValue(relatedModule: 'stock_in' | 'stock_out'): Observable<NumberKeyValuePair[]> {
		return this.http.get<NumberKeyValuePair[]>(`${this.apiBaseUrl}/JobType/GetJobTypesInKeyValue/${relatedModule}`);
	}

	/**
	 *
	 * @param term
	 * @param isCategory
	 * @param forGroup - true when called from Product group Child products tab, otherwise false.
	 * @param size
	 * @returns
	 */
	loadAllProductCategoriesForSelection(term: string, isCategory: boolean, forGroup: boolean, size: number = 500): Observable<MultiSelect[]> {
		let endpoint = `Product/GetProductsInMES/${isCategory}/${forGroup}`
		if(term) {
			endpoint += `?search=${encodeURIComponent(term)}`;
		}

		// return of(this.dummyMes);
		return this.http.get<MultiSelect[]>(`${this.apiBaseUrl}/${endpoint}`);
	}

	loadProductsForSelection(search: string): Observable<NumberKeyValuePair[]> {
		search = search.toLowerCase();
		if(this.isDevelopment) {
			const filteredProducts = this.dummyProducts.filter(a => a.value.toLowerCase().indexOf(search) >= 0);
			return of(filteredProducts).pipe(delay(300));
		}
		return this.http.get<NumberKeyValuePair[]>(`${this.apiBaseUrl}/Product/GetProductsBasedOnLoggedInUserInKeyValue?search=${search}`);
	}


	/**
	 * Returns all hubs
	 * @param status = 1 for active
	 * @param status = 0 for inactive
	 * @param status = -1 for hub users
	 * @returns
	 */
	getAllProductsForGrid(
		categoryId: number,
		status = 0 | 1 | -1,
		pageNumber: number,
		pageSize: number,
		search: string | null = null
	): Observable<ProductGrid[]> {
		const options = {
			headers: new HttpHeaders({
				'Show-Loader': 'true',
				'Loading-Message': "Loading product list"
			})
		};
		let endPoint = `${this.apiBaseUrl}/Product/GetProducts/${categoryId}/${status}/${pageNumber}/${pageSize}`;
		if (search) {
			endPoint += `?search=${encodeURIComponent(search)}`;
		}
		console.log(endPoint);

		// return of(this.dummyRows);
		return this.http.get<ProductGrid[]>(endPoint, options);
	}

	getProductCategoriesInTreeview(): Observable<CategoryTree[]> {
		// return of(this.TREE_DATA).pipe(delay(1000));
		return this.http.get<CategoryTree[]>(`${this.apiBaseUrl}/Product/GetProductCategoriesBasedOnLoggedInUserInTreeview`);
	}

	private dummyMes: MultiSelect[] = [
		{
			key: '1',
			title: 'Option 1',
			shortDescription: 'Short 1',
			fullDescription: 'Full 1',
			additionalDescription: 'Add 1',
			additionalDescription2: 'Add2 1',
			isChecked: false
		},
		{
			key: '2',
			title: 'Option 2',
			shortDescription: 'Short 2',
			fullDescription: 'Full 2',
			additionalDescription: 'Add 2',
			additionalDescription2: 'Add2 2',
			isChecked: false
		}
	];

	private dummyKeyVals: NumberKeyValuePair[] = [
		{ key: 1, value: 'Option 1' },
		{ key: 2, value: 'Option 2' },
		{ key: 3, value: 'Option 3' }
	];

	private dummyProducts: NumberKeyValuePair[] = [
		{ key: 1, value: 'Alabama' },
		{ key: 2, value: 'Alaska', description: 'West' },
		{ key: 3, value: 'Arizona', description: 'West' },
		{ key: 4, value: 'Arkansas', description: 'South' },
		{ key: 5, value: 'California', description: 'West' },
		{ key: 6, value: 'Colorado', description: 'West' },
		{ key: 7, value: 'Connecticut', description: 'Northeast' },
		{ key: 8, value: 'Delaware', description: 'South' },
		{ key: 9, value: 'Florida', description: 'South' },
		{ key: 10, value: 'Georgia', description: 'South' },
		{ key: 11, value: 'Hawaii', description: 'West' },
		{ key: 12, value: 'Idaho', description: 'West' },
		{ key: 13, value: 'Illinois', description: 'Midwest' },
		{ key: 14, value: 'Indiana', description: 'Midwest' },
		{ key: 15, value: 'Iowa', description: 'Midwest' },
		{ key: 16, value: 'Kansas', description: 'Midwest' },
		{ key: 17, value: 'Kentucky', description: 'South' },
		{ key: 18, value: 'Louisiana', description: 'South' },
		{ key: 19, value: 'Maine', description: 'Northeast' },
		{ key: 21, value: 'Maryland', description: 'South' },
		{ key: 22, value: 'Massachusetts', description: 'Northeast' },
		{ key: 23, value: 'Michigan', description: 'Midwest' },
		{ key: 24, value: 'Minnesota', description: 'Midwest' },
		{ key: 25, value: 'Mississippi', description: 'South' },
		{ key: 26, value: 'Missouri', description: 'Midwest' },
		{ key: 27, value: 'Montana', description: 'West' },
		{ key: 28, value: 'Nebraska', description: 'Midwest' },
		{ key: 29, value: 'Nevada', description: 'West' },
		{ key: 30, value: 'New Hampshire', description: 'Northeast' },
		{ key: 31, value: 'New Jersey', description: 'Northeast' },
		{ key: 32, value: 'New Mexico', description: 'West' },
		{ key: 33, value: 'New York', description: 'Northeast' },
		{ key: 34, value: 'North Dakota', description: 'Midwest' },
		{ key: 35, value: 'North Carolina', description: 'South' },
		{ key: 36, value: 'Ohio', description: 'Midwest' },
		{ key: 37, value: 'Oklahoma', description: 'South' },
		{ key: 38, value: 'Oregon', description: 'West' },
		{ key: 39, value: 'Pennsylvania', description: 'Northeast' },
		{ key: 40, value: 'Rhode Island', description: 'Northeast' },
		{ key: 41, value: 'South Carolina', description: 'South' },
		{ key: 42, value: 'South Dakota', description: 'Midwest' },
		{ key: 43, value: 'Tennessee', description: 'South' },
		{ key: 44, value: 'Texas', description: 'South' },
		{ key: 45, value: 'Utah', description: 'West' },
		{ key: 46, value: 'Vermont', description: 'Northeast' },
		{ key: 47, value: 'Virginia', description: 'South' },
		{ key: 48, value: 'Washington', description: 'South' },
		{ key: 49, value: 'West Virginia', description: 'South' },
		{ key: 50, value: 'Wisconsin', description: 'Midwest' },
		{ key: 51, value: 'Wyoming', description: 'West' }
	 ];


	 private readonly dummyRows: ProductGrid[] = [
		{
			productId: 1,
			productName: "S1",
			productCode: '123456789',
			productExternalCode: 'EXT-007',
			productParentName: 'address 1',
			productGroupName: 'Dhaka',
			productTag: 'T1'
		},
		{
			productId: 2,
			productName: "S2",
			productCode: '123456789',
			productExternalCode: 'EXT-008',
			productParentName: 'address 2',
			productGroupName: 'Dhaka',
			productTag: 'T2'
		}
	];

	private TREE_DATA: CategoryTree[] = [
		{
			categoryId : 1,
			categoryName : 'Category-A',
			childCategories : [
				{
					categoryId: 11,
					categoryName: 'category A-11',
					childCategories: [
						{
							categoryId: 101,
							categoryName: 'Category-A-101',
							childCategories: []
						}
					]
				},
				{
					categoryId: 21,
					categoryName: 'category A-21',
					childCategories: [
						{
							categoryId: 101,
							categoryName: 'Category-A-201',
							childCategories: [
								{
									categoryId: 2011,
									categoryName: 'Category-A-2011',
									childCategories: [
										{
											categoryId: 20111,
											categoryName: 'Category-A-20111',
											childCategories: []
										}
									]
								},
								{
									categoryId: 2012,
									categoryName: 'Category-A-2012',
									childCategories: []
								}
							]
						}
					]
				}

			]
		},
		{
			categoryId : 2,
			categoryName : 'Category-B',
			childCategories : []
		}
	];
}
