export class ParcelTransaction {
    trSystemId: number;           // PK
    trSystemCode: string;         
    trDateTime?: Date;             // SHOW IN GRID 
    riderName: string;             // SHOW IN GRID
    hubName: string;           // SHOW IN GRID
    trAmount?: number;            // SHOW IN GRID
    paymentMethodParentName: string;           // SHOW IN GRID

    trManualCode: string;          // Show In Detais Popup
    paymentMethodName: string;             // Show in Details PopUp
    paymentAccountNo: string;          // Show in Details PopUp
    paymentAccountName: string;            // Show in Details PopUp
    paymentAccountBranchName: string;          // Show in Details PopUp
    paymentRoutingNo: string;          // Show in Details PopUp
}