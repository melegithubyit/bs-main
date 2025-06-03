export interface creatingStartupPayload {
  startupName: string;
  description: string;
  license: string;
  goalFund: number;
  currentFund: number;
  typeOfSupport: string;
  bankName: string;
  bankAccount: string;
  website: string;
  logo: string;
  industry: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
  foundedAt: string;
  numberOfEmployees: number;
  videoLink: string;
  pitchDeckLink: string;
  currentState: string;
}

export interface StartupApproval {
  postExpiryDate: string;
}
