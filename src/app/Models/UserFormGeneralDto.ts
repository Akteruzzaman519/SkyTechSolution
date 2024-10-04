
export class UserFormGeneralDto {
    constructor() {
        this.userSystemId = 0;
        this.userFirstName = "";
        this.userLastName = "";
        this.userCategoryId = 0;
        this.userActiveStatus = 0;
        this.userName = "";
        this.userPassword = "";
    }

    public userSystemId: number;
    public userFirstName: string;
    public userLastName: string;
    public userCategoryId: number;
    public userActiveStatus: number;
    public userName: string;
    public userPassword: string;

}