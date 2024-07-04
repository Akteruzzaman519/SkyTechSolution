
export class EmailGridBaseDto {
    constructor() {
        this.mailSystemId = 0;
        this.mailUserName = "";
        this.mailUploadedDate = new Date();
        this.mailUploadedByUniqueCode = "";
        this.mailUploadedByFullName = "";
        this.sourceName = "";
        this.mailBatch = 0;
        this.lifecycleRelatedName = "";
    }
    public mailSystemId: number;
    public mailUserName:string;// Email
    public mailUploadedDate:Date;// Added At
    public mailUploadedByUniqueCode:string;
    public mailUploadedByFullName:string;// Added By
    public sourceName:string; // Source
    public mailBatch:number;// Batch
    public lifecycleRelatedName:string;// Status

}
