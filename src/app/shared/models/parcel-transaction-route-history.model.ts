export class ParcelTransactionRouteHistory {
    parcelSystemId: number;
    parcelTrackingId: string;
    parcelCodAmount?: number;
    customerPaymentDate?: Date;
    riderReceiveDate?: Date;
    riderDepositDate?: Date;
    hubReceiveDate?: Date;
    hubDepositDate?: Date;
    cwhReceiveDate?: Date;
    cwhDepositDate?: Date;
    merchantReceiveDate?: Date;
    isChecked: boolean;
}