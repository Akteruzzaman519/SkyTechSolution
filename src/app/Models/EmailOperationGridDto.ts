export class EmailOperationGridDto {
    constructor() {
        this.mailOperationCompletionId = 0;
        this.mailSystemId = 0;
        this.mailUserName = "";
        this.mailOperationAssignedByFullName = ""
        this.mailOperationAssignedAt = new Date();

    }
    public mailOperationCompletionId: number;// PK DO NOT SHOW
    public mailSystemId: number;// DO NOT SHOW
    public mailUserName: string;// Email
    public mailOperationAssignedByFullName: string;// Assigned By
    public mailOperationAssignedAt: Date;// Assigned At
}