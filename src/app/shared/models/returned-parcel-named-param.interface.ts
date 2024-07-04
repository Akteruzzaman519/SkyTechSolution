export interface ReturnedParcelNamedParam {
    status: "returned_to_hub" | "received_cancelled_parcel_by_hub" | "returned_to_cwh" | "received_cancelled_parcel_by_cwh" | "returned_to_merchant";
    riderId?: number;
    hubId?: number; 
    merchantId?: number;
    cwhId?: number;
}