
export class EmailFormDto {
    constructor() {
        this.mailSourcingId = 0;
        this.mailRelatedTag = "";;
        this.mailBaseInfoList =[];;
    }
    public mailSourcingId: number;
    public mailRelatedTag: string;
    public mailBaseInfoList: any[];

}