import { EmailGridBaseDto } from "./EmailGridBaseDto";

export class EmailUserCurrentWorkloadCount {
    constructor() {
        this.userSystemId = 0;
        this.userUniqueCode = "";
        this.userFullName = "";
        this.countPendingCurrentTask = 0;
        this.countPendingAllTask = 0;
    }
    public userSystemId: number;
    public userUniqueCode: string;
    public userFullName: string;
    public countPendingCurrentTask: number;
    public countPendingAllTask: number;

}