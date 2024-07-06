export class MailTasksManualFormDto {
    constructor() {
        this.mailTaskName = "";
        this.mailTaskDescription = "";
        this.mailTaskNote = "";
    }
    public mailTaskName: string;
    public mailTaskDescription: string;
    public mailTaskNote: string;
}