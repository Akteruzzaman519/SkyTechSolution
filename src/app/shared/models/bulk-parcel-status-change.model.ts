export class BulkParcelStatusChange {
    parcelIdList: number[];
    parcelStatusIndicator: "assigned_to_hub" | "assigned_to_rider" | "air" | "custom" | "cwh" | 
    "received_cancelled_parcel_by_hub" | "returned_to_cwh" | "received_cancelled_parcel_by_cwh" | "returned_to_merchant" | "received_cancelled_parcel_by_merchant";
    parcelStatusChangeRemarks?: string;
    parcelRiderId?: number = 0;
    parcelStatusChangeReasonId?: number = 0;
    parcelHubId?: number = 0;

    constructor() {
        this.parcelIdList = [];
    }
}