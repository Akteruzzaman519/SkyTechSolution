import { EmailGridBaseDto } from "./EmailGridBaseDto";

export class EmailGridDto {
    constructor() {
        this.noOfTotalRecord = 0;
        this.emailList = [];;
    }
    public noOfTotalRecord: number;
    public emailList: EmailGridBaseDto[];

}
