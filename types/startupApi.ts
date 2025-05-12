export interface creatingStartupPayload{
    startupName: string;
    description: string;
    license: string;
    goalFund: number;
    currentFund: number;
    typeOfSupport: string;
    bankName: string;
    bankAccount: string;

}


export interface StartupApproval{
    postExpiryDate: string;
}


