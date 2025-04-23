export interface Candidate {
    id: string
    firstName: string
    lastName: string
    department: string
    field: string
    phoneNumber: string
    email: string
    location: string
    address: string
    educationCertificates: string[]
    CV: string
    identification: string
    photo: string
    typeOfEmployment: string
    videoLink: string
  }
  
export interface CandidateCardProps {
    candidate: Candidate
    index: number
    layout: "list" | "grid"
}