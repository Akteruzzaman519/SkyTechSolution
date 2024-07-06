export class VMailLifecycleDto {

    constructor() {
        this.lifecycleName = ""
        this.mailLifecycleNote = ""
        this.mailLifecycleDatetime = new Date();
        this.mailLifecycleOccuredByUniqueCode = ""
        this.mailLifecycleOccuredByFullName = ""

    }
    public lifecycleName: string;
    public mailLifecycleNote: string;
    public mailLifecycleDatetime: Date;
    public mailLifecycleOccuredByUniqueCode: string;
    public mailLifecycleOccuredByFullName: string;
}