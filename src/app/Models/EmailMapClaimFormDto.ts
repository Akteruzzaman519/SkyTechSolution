export class EmailMapClaimFormDto {
    constructor() {
        this.mapCurrentCategory = 0;
        this.mapCurrentMapLink = "";
        this.mapCurrentNumber = "";
        this.mapManualCurrentCategory="";
        this.mapRelatedVpnCityName="";
        this.mapRelatedVpnCityStateName="";
        this.mapRelatedVpnCityZipCode="";
    }


    public mapCurrentCategory: number
    public mapCurrentMapLink: string;
    public mapCurrentNumber: string;

    public mapManualCurrentCategory: string;
    public mapRelatedVpnCityName: string;
    public mapRelatedVpnCityStateName: string;
    public mapRelatedVpnCityZipCode: string;
}
