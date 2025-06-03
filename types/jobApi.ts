import { StaticImageData } from "next/image";

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


export interface Candidate {
    id: string;
    firstName: string;
    lastName: string;
    department: string;
    field: string;
    phoneNumber: string;
    email: string;
    location: string;
    address: string;
    bank: string;
    bankAccount: string;
    educationCertificates: string[];
    CV: string;
    identification: string;
    photo: StaticImageData;
    typeOfEmployment: string;
    videoLink: string;
}