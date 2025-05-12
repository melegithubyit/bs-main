export interface creatingTalentPayload {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    location: string;
    skills: string[];
    experience: number;
    resume: File | null; 
    coverLetter: File | null; 
}