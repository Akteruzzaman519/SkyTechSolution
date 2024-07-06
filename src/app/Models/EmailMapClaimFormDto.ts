export class EmailMapClaimFormDto {
    constructor() {
        this.mapCurrentCategory = 0;
        this.mapCurrentMapLink = "";
        this.mapCurrentNumber = "";
    }


    public mapCurrentCategory: number
    public mapCurrentMapLink: string;
    public mapCurrentNumber: string;
}