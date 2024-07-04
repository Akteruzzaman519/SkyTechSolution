export class ParcelGrid {
    parcelId: string;               // Parcel Id
    parcelSystemId?: number;
    parcelTrackingId: string;       // Tracking Id

    parcelDescription: string;      // Description
    parcelBillingAmount?: number;   // Bill
    parcelCodAmount?: number;       // COD

    parcelCustomerName: string;     // Customer
    parcelCustomerAddress: string;
    parcelCustomerContact: string;

    statusName: string;
    parcelAge?: number;
    parcelFailedAttempt?: number;

    isChecked: boolean = false;


    parcelNote: string;             // Category
    parcelItems: string             // Goods Info 
    parcelWeight?: number;          
    merchantCompanyName: string;
    riderName: string;

    hubName: string;
}
