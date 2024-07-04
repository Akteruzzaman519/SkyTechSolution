export class ParcleTranDeposit {
    parcelIdList: number[] = [];
    amount = 0;
    paymentMethodId = 0;
    merchantId = 0;
    userVoucherNo: string;
    statusIndicator: 'hub_deposit_confirm' | 'cwh_deposit_confirm' = 'cwh_deposit_confirm';
}