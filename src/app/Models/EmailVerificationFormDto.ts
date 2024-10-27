
export class EmailVerificationFormDto {
    constructor() {
        this.mailSystemId = 0;
        this.mailOperationCompletionId = 0;
        this.mailRoutineTaskVerificationStatus = 0;
        this.mailRoutineTaskVerificationNotes = "";
    }
    public mailSystemId: number;
    public mailOperationCompletionId: number;
    public mailRoutineTaskVerificationStatus: number;
    public mailRoutineTaskVerificationNotes: string;
}