export class EmailIssueFormDto
{
    constructor(){
        this.mailSystemId = 0;
        this.mailIssueId = -1;
        this.mailIssueNote = ""
    }
    public  mailSystemId :number;
    public  mailIssueId :number;
    public  mailIssueNote:string;
}