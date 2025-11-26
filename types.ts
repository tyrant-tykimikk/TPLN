export enum ApplicantType {
  INDIVIDUAL = 'INDIVIDUAL',
  BUSINESS = 'BUSINESS',
}

export interface FormData {
  // Step 1: ID Uploads
  idFront: File | null;
  idBack: File | null;
  
  // Step 1: Basic Info
  applicantName: string; // Surname + Name or Company Name
  applicantType: ApplicantType;
  idNumber: string; // Or Business Tax ID
  birthDateOrFoundingDate: string;
  email: string;
  phone: string;
  address: string;

  // Step 3: Bank Info
  bankName: string;
  branchName: string;
  accountName: string;
  accountNumber: string;
  bankCover: File | null;

  // Signatures
  signature1: string | null; // Base64 data URL
  signature2: string | null; // Base64 data URL
  
  // Agreement
  agreedToTerms: boolean;
}