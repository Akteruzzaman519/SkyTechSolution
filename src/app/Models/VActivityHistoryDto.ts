export class VActivityHistoryDto {

    constructor() {
        this.activityRelatedMailId = 0;
        this.activityByUniqueCode = "";
        this.activityByFullName = "";
        this.activityName = "";
        this.activityNote = "";
        this.activityAt = new Date();
    }
    public activityRelatedMailId: number;
    public activityByUniqueCode: string;
    public activityByFullName: string;
    public activityName: string;
    public activityNote: string;
    public activityAt: Date;
}