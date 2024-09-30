export class EmailMapGridDto {
    constructor() {
        this.mapClaimingId = 0;
        this.mapCurrentCategoryName = "";
        this.mapCurrentMapLink = "";
        this.mapCurrentNumber = "";
    }
    public mapClaimingId: number;
    public mapCurrentCategoryName: string;
    public mapCurrentMapLink: string;
    public mapCurrentNumber: string;
}


export class EmailMapInfoChangeFormDto {
    constructor() {
        this.mapClaimingId = 0;
        this.mapNewBusinessCategory = 0;
        this.mapNewBusinessName = "";
        this.mapNewBusinessAddress = "";
        this.mapNewWebsite = "";
        this.mapNewPhone = "";
        this.mapManualNewBusinessCategory = "";
        this.mapNewTwoFactorAuthRelatedPhone = "";
        this.mapNewReviewLink = "";
    }
    public mapClaimingId: number;
    public mapNewBusinessCategory: number;
    public mapNewBusinessName: string;
    public mapNewBusinessAddress: string;
    public mapNewWebsite: string;
    public mapNewPhone: string;
    public mapManualNewBusinessCategory: string;
    public mapNewTwoFactorAuthRelatedPhone: string;
    public mapNewReviewLink: string;
}
// public string? MapManualNewBusinessCategory { get; set; } // New Category
// public string? MapNewTwoFactorAuthRelatedPhone { get; set; } // 2FA Phone
// public string? MapNewReviewLink { get; set; } // Review Link