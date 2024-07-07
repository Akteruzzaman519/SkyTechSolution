export class MapReviewFormDto {
    constructor() {
        this.mapClaimingId = 0;
        this.mapReviewName = "";
        this.mapReviewDetails = "";
        this.mapReviewNote = "";
    }
    public mapClaimingId: number;
    public mapReviewName: string;
    public mapReviewDetails: string;
    public mapReviewNote: string;
}