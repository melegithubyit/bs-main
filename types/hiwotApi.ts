export interface creatingHiwotPayload {
    name: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    status: string;
    budget: number;
    teamMembers: string[];
    projectType: string;
    projectManager: string;
    createdAt?: Date;
    updatedAt?: Date;
}