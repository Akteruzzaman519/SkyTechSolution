
export class MailHistoryReportDto {

    constructor() {
        this.mailMapDetails = new MailMapReportDto();
        this.mailTasks = [];
        this.mailReviews  = [];
    }
    public mailMapDetails: MailMapReportDto;
    public mailTasks: MailTaskReportDto[];
    public mailReviews: MailReviewReportDto[];
}

export class MailMapReportDto {
    constructor() {
        this.mapCurrentCategoryName = "";
        this.mapCurrentNumber = "";
        this.mapCurrentMapLink = "";
        this.mapNewBusinessCategoryName = "";
        this.mapNewBusinessName = "";
        this.mapNewBusinessAddress = "";
        this.mapNewWebsite = "";
        this.mapNewPhone = "";
    }
    public mapCurrentCategoryName: string; // Category
    public mapCurrentNumber: string; // Number
    public mapCurrentMapLink: string; // Link
    public mapNewBusinessCategoryName: string; // Category
    public mapNewBusinessName: string; // Name
    public mapNewBusinessAddress: string; // Adress
    public mapNewWebsite: string; // Web
    public mapNewPhone: string; // Phone
}

export class MailTaskReportDto {
    constructor() {
        this.mailTaskName = "";
        this.mailTaskDescription = "";
        this.mailTaskNote = "";
        this.mailTaskCompletedAt = "";
        this.mailTaskCompletedByUniqueCode = "";
        this.mailTaskCompletedByFullName = "";
    }
    public mailTaskName: string; // Task 
    public mailTaskDescription: string; // Description
    public mailTaskNote: string; // Note
    public mailTaskCompletedAt: string; // Task Added
    public mailTaskCompletedByUniqueCode: string;
    public mailTaskCompletedByFullName: string; // Task By
}


export class MailReviewReportDto {
    constructor() {
        this.mapReviewName = "";
        this.mapReviewDetails = "";
        this.mapReviewNote = "";
        this.mapReviewedAt = new Date();
        this.mapReviewedByUniqueCode = "";
        this.mapReviewedByFullName = "";
    }
    public mapReviewName: string; // Indentifier
    public mapReviewDetails: string; // Review
    public mapReviewNote: string; // Note
    public mapReviewedAt: Date; // Reviewed At
    public mapReviewedByUniqueCode: string;
    public mapReviewedByFullName: string; // Reviewed By
}