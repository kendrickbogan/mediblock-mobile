import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/client/react/components';
import * as ApolloReactHoc from '@apollo/client/react/hoc';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
};

export type AcademicAppointment = {
  __typename?: 'AcademicAppointment';
  addressLine1: Scalars['String'];
  addressLine2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  departmentHeadFirstName?: Maybe<Scalars['String']>;
  departmentHeadLastName?: Maybe<Scalars['String']>;
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
  faxNumber?: Maybe<Scalars['String']>;
  institutionName: Scalars['String'];
  institutionUrl?: Maybe<Scalars['String']>;
  person: Person;
  phoneNumber?: Maybe<Scalars['String']>;
  position: Scalars['String'];
  startedAt: Scalars['ISO8601DateTime'];
  state?: Maybe<Scalars['String']>;
  zip: Scalars['String'];
};

/** Input to create or edit academic appointments */
export type AcademicAppointmentInput = {
  position: Scalars['String'];
  institutionName: Scalars['String'];
  institutionUrl?: Maybe<Scalars['String']>;
  addressLine1: Scalars['String'];
  addressLine2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  zip: Scalars['String'];
  country: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  faxNumber?: Maybe<Scalars['String']>;
  departmentHeadFirstName?: Maybe<Scalars['String']>;
  departmentHeadLastName?: Maybe<Scalars['String']>;
  startedAt: Scalars['ISO8601DateTime'];
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
};

export type AdministrativeLeadershipPosition = {
  __typename?: 'AdministrativeLeadershipPosition';
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
  person: Person;
  startedAt?: Maybe<Scalars['ISO8601DateTime']>;
  title?: Maybe<Scalars['String']>;
};

/** Input to create or edit administrative leadership positions */
export type AdministrativeLeadershipPositionsInput = {
  title?: Maybe<Scalars['String']>;
  startedAt: Scalars['ISO8601DateTime'];
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
};

export type Attachment = {
  __typename?: 'Attachment';
  contentType: Scalars['String'];
  expiresWithinTimeframe: Scalars['Boolean'];
  id: Scalars['ID'];
  previewUrl: Scalars['String'];
  url: Scalars['String'];
};

/** Input to create or edit document attachments */
export type AttachmentInput = {
  data: Scalars['String'];
};

export type BoardCertification = {
  __typename?: 'BoardCertification';
  boardCertificationQuestionnaire?: Maybe<BoardCertificationQuestionnaire>;
  boardCertified: Scalars['Boolean'];
  certifyingBoardName?: Maybe<Scalars['String']>;
  expiresAt: Scalars['ISO8601DateTime'];
  expiresWithinTimeframe: Scalars['Boolean'];
  initialCertificationDate: Scalars['ISO8601DateTime'];
  recertificationDate: Scalars['ISO8601DateTime'];
  specialty: Scalars['String'];
  specialtyRank: SpecialtyRankEnum;
};

export type BoardCertificationQuestionnaire = {
  __typename?: 'BoardCertificationQuestionnaire';
  comments?: Maybe<Scalars['String']>;
  expectedExamDate?: Maybe<Scalars['ISO8601DateTime']>;
  hasTakenCertificationExam: Scalars['Boolean'];
  hasTakenCertificationExamBoardName?: Maybe<Scalars['String']>;
  planningToTakeExam: Scalars['Boolean'];
  takenPartOnePartTwoEligible: Scalars['Boolean'];
  takenPartOnePartTwoEligibleBoardName?: Maybe<Scalars['String']>;
};

export type CmeCreditHour = {
  __typename?: 'CMECreditHour';
  activityDate: Scalars['ISO8601DateTime'];
  activityName: Scalars['String'];
  hoursEarned: Scalars['Float'];
  methodOfEducation: Scalars['String'];
  person: Person;
  sponsorName?: Maybe<Scalars['String']>;
};

/** Input to create or edit CME credit hours */
export type CmeCreditHourInput = {
  activityDate: Scalars['ISO8601DateTime'];
  activityName?: Maybe<Scalars['String']>;
  hoursEarned: Scalars['Float'];
  methodOfEducation?: Maybe<Scalars['String']>;
  sponsorName?: Maybe<Scalars['String']>;
};

export type ComlexusaScore = {
  __typename?: 'COMLEXUSAScore';
  level1ExamDate?: Maybe<Scalars['ISO8601DateTime']>;
  level1Passed: Scalars['Boolean'];
  level1Score?: Maybe<Scalars['Int']>;
  level2CeExamDate?: Maybe<Scalars['ISO8601DateTime']>;
  level2CePassed: Scalars['Boolean'];
  level2CeScore?: Maybe<Scalars['Int']>;
  level2PeExamDate?: Maybe<Scalars['ISO8601DateTime']>;
  level2PePassed: Scalars['Boolean'];
  level2PeScore?: Maybe<Scalars['Int']>;
  level3ExamDate?: Maybe<Scalars['ISO8601DateTime']>;
  level3Passed: Scalars['Boolean'];
  level3Score?: Maybe<Scalars['Int']>;
  nbomeIdNumber: Scalars['String'];
  person: Person;
};

export type CovidVaccination = {
  __typename?: 'COVIDVaccination';
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  facilityName: Scalars['String'];
  person: Person;
  state?: Maybe<Scalars['String']>;
  vaccinationDate1: Scalars['ISO8601DateTime'];
  vaccinationDate2: Scalars['ISO8601DateTime'];
  zip?: Maybe<Scalars['String']>;
};

export type Certification = {
  __typename?: 'Certification';
  expiresAt?: Maybe<Scalars['ISO8601DateTime']>;
  expiresWithinTimeframe: Scalars['Boolean'];
  issuedAt: Scalars['ISO8601DateTime'];
  kind: CertificationKindEnum;
  name: Scalars['String'];
  person: Person;
};

export enum CertificationKindEnum {
  Acls = 'ACLS',
  Atls = 'ATLS',
  Bls = 'BLS',
  Cpr = 'CPR',
  Corec = 'COREC',
  Nals = 'NALS',
  Nrp = 'NRP',
  Pals = 'PALS',
  Other = 'OTHER'
}

/** Input for creating or editing a board certification questionnaire */
export type CertificationQuestionnaireInput = {
  hasTakenCertificationExam?: Maybe<Scalars['Boolean']>;
  hasTakenCertificationExamBoardName?: Maybe<Scalars['String']>;
  takenPartOnePartTwoEligible?: Maybe<Scalars['Boolean']>;
  takenPartOnePartTwoEligibleBoardName?: Maybe<Scalars['String']>;
  planningToTakeExam?: Maybe<Scalars['Boolean']>;
  expectedExamDate?: Maybe<Scalars['ISO8601DateTime']>;
  comments?: Maybe<Scalars['String']>;
};

export enum ClaimsCoverageTypeEnum {
  Unknown = 'UNKNOWN',
  ClaimsMade = 'CLAIMS_MADE',
  Occurrence = 'OCCURRENCE'
}

export enum CompletionStatusEnum {
  NotStarted = 'NOT_STARTED',
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED',
  NotApplicable = 'NOT_APPLICABLE'
}

export enum CoverageTypeEnum {
  Unknown = 'UNKNOWN',
  Individual = 'INDIVIDUAL',
  Shared = 'SHARED'
}

/** Autogenerated input type of CreateDocumentMutation */
export type CreateDocumentMutationInput = {
  attachment: AttachmentInput;
  category: DocumentCategoryEnum;
  expiresAt?: Maybe<Scalars['ISO8601DateTime']>;
  kind: DocumentKindEnum;
  name: Scalars['String'];
  otherKind?: Maybe<Scalars['String']>;
  profileSection: ProfileSectionEnum;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateDocumentMutation */
export type CreateDocumentMutationPayload = {
  __typename?: 'CreateDocumentMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  document?: Maybe<Document>;
};

/** Autogenerated input type of CreateJumioIdentityVerificationMutation */
export type CreateJumioIdentityVerificationMutationInput = {
  jumioScanReference: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateJumioIdentityVerificationMutation */
export type CreateJumioIdentityVerificationMutationPayload = {
  __typename?: 'CreateJumioIdentityVerificationMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type DeaLicense = {
  __typename?: 'DEALicense';
  expiresAt: Scalars['ISO8601DateTime'];
  expiresWithinTimeframe: Scalars['Boolean'];
  person: Person;
  registrationNumber: Scalars['String'];
  status: Scalars['String'];
  unrestricted: Scalars['Boolean'];
};

export type Degree = {
  __typename?: 'Degree';
  dateOfGraduation: Scalars['ISO8601DateTime'];
  degree: Scalars['String'];
  endedAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  institutionAddressCity: Scalars['String'];
  institutionAddressCountry: Scalars['String'];
  institutionAddressLine1: Scalars['String'];
  institutionAddressLine2?: Maybe<Scalars['String']>;
  institutionAddressLine3?: Maybe<Scalars['String']>;
  institutionAddressState: Scalars['String'];
  institutionAddressZip: Scalars['String'];
  institutionName: Scalars['String'];
  kind: DegreeKind;
  major?: Maybe<Scalars['String']>;
  minor?: Maybe<Scalars['String']>;
  person: Person;
  registrarPhoneNumber: Scalars['String'];
  registrarUrl: Scalars['String'];
  startedAt: Scalars['ISO8601DateTime'];
};

export enum DegreeKind {
  Undergraduate = 'UNDERGRADUATE',
  Other = 'OTHER'
}

/** Autogenerated input type of DeleteDocumentMutation */
export type DeleteDocumentMutationInput = {
  id: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of DeleteDocumentMutation */
export type DeleteDocumentMutationPayload = {
  __typename?: 'DeleteDocumentMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};

/** Autogenerated return type of DeleteHealthProfessionsScholarshipMutation */
export type DeleteHealthProfessionsScholarshipMutationPayload = {
  __typename?: 'DeleteHealthProfessionsScholarshipMutationPayload';
  success: Scalars['Boolean'];
};

/** Autogenerated return type of DeleteLoanRepaymentDetailMutation */
export type DeleteLoanRepaymentDetailMutationPayload = {
  __typename?: 'DeleteLoanRepaymentDetailMutationPayload';
  success: Scalars['Boolean'];
};

/** Autogenerated return type of DeleteMilitaryServiceMutation */
export type DeleteMilitaryServiceMutationPayload = {
  __typename?: 'DeleteMilitaryServiceMutationPayload';
  success: Scalars['Boolean'];
};

/** Autogenerated return type of DeleteNationHealthServiceCorpsScholarshipMutation */
export type DeleteNationHealthServiceCorpsScholarshipMutationPayload = {
  __typename?: 'DeleteNationHealthServiceCorpsScholarshipMutationPayload';
  success: Scalars['Boolean'];
};

/** Autogenerated return type of DeleteUnitedStatesPublicHealthServiceMutation */
export type DeleteUnitedStatesPublicHealthServiceMutationPayload = {
  __typename?: 'DeleteUnitedStatesPublicHealthServiceMutationPayload';
  success: Scalars['Boolean'];
};

export type DemographicDetail = {
  __typename?: 'DemographicDetail';
  ethnicity: EthnicityEnum;
  race: Array<RaceEnum>;
};

export type Document = {
  __typename?: 'Document';
  attachment: Attachment;
  category: DocumentCategoryEnum;
  expiresAt?: Maybe<Scalars['ISO8601DateTime']>;
  expiresWithinTimeframe: Scalars['Boolean'];
  id: Scalars['ID'];
  kind: DocumentKindEnum;
  name: Scalars['String'];
  otherKind?: Maybe<Scalars['String']>;
  person: Person;
  profileSection: ProfileSectionEnum;
};

export enum DocumentCategoryEnum {
  GeneralInformation = 'GENERAL_INFORMATION',
  EducationAndTraining = 'EDUCATION_AND_TRAINING',
  BoardCertification = 'BOARD_CERTIFICATION',
  ProfessionalLicense = 'PROFESSIONAL_LICENSE',
  ProfessionalLiabilityInsuranceDetail = 'PROFESSIONAL_LIABILITY_INSURANCE_DETAIL',
  MedicalLicensingExamination = 'MEDICAL_LICENSING_EXAMINATION',
  PeerReference = 'PEER_REFERENCE',
  OtherCertification = 'OTHER_CERTIFICATION',
  HospitalAffiliation = 'HOSPITAL_AFFILIATION',
  HealthcareFacilityAffiliation = 'HEALTHCARE_FACILITY_AFFILIATION',
  AcademicAppointment = 'ACADEMIC_APPOINTMENT',
  ResearchAndPublicBenefitData = 'RESEARCH_AND_PUBLIC_BENEFIT_DATA',
  PpdOrVaccination = 'PPD_OR_VACCINATION',
  EmploymentHistory = 'EMPLOYMENT_HISTORY'
}

export enum DocumentKindEnum {
  StateDriversLicenseOrId = 'STATE_DRIVERS_LICENSE_OR_ID',
  Passport = 'PASSPORT',
  Dd214 = 'DD214',
  UndergraduateDiploma = 'UNDERGRADUATE_DIPLOMA',
  MedicalSchoolDiploma = 'MEDICAL_SCHOOL_DIPLOMA',
  OsteopathicSchoolDiploma = 'OSTEOPATHIC_SCHOOL_DIPLOMA',
  OtherProfessionalSchoolDiploma = 'OTHER_PROFESSIONAL_SCHOOL_DIPLOMA',
  InternshipCertificate = 'INTERNSHIP_CERTIFICATE',
  ResidencyCertificate = 'RESIDENCY_CERTIFICATE',
  FellowshipCertificate = 'FELLOWSHIP_CERTIFICATE',
  BoardCertification = 'BOARD_CERTIFICATION',
  PhysicianStateMedicalLicense = 'PHYSICIAN_STATE_MEDICAL_LICENSE',
  PhysicianStateFluoroscopyLicense = 'PHYSICIAN_STATE_FLUOROSCOPY_LICENSE',
  DrugEnforcementAgency = 'DRUG_ENFORCEMENT_AGENCY',
  OtherStateProfessionalLicense = 'OTHER_STATE_PROFESSIONAL_LICENSE',
  CertificationCard = 'CERTIFICATION_CARD',
  MalpracticeCertificateOfInsurance = 'MALPRACTICE_CERTIFICATE_OF_INSURANCE',
  ContinuingMedicalEducation = 'CONTINUING_MEDICAL_EDUCATION',
  CurriculumVitae = 'CURRICULUM_VITAE',
  Other = 'OTHER'
}

export type DriversLicense = {
  __typename?: 'DriversLicense';
  expiresAt: Scalars['ISO8601DateTime'];
  expiresWithinTimeframe: Scalars['Boolean'];
  id: Scalars['ID'];
  issuingState: Scalars['String'];
  number: Scalars['String'];
  person: Person;
};

export type EmploymentGap = {
  __typename?: 'EmploymentGap';
  person: Person;
  text?: Maybe<Scalars['String']>;
};

export enum EthnicityEnum {
  NotHispanicOrLatino = 'NOT_HISPANIC_OR_LATINO',
  HispanicOrLatino = 'HISPANIC_OR_LATINO'
}

/** Objects which have may have an expiration date */
export type Expirable = BoardCertification | Certification | DeaLicense | Document | DriversLicense | Passport | ProfessionalLicense;

export type Expiration = {
  __typename?: 'Expiration';
  expirable: Expirable;
  expiresAt: Scalars['ISO8601DateTime'];
  id: Scalars['String'];
  person: Person;
};

export type ExpirationCategoryCount = {
  __typename?: 'ExpirationCategoryCount';
  count: Scalars['Int'];
  id: DocumentCategoryEnum;
};

export enum ExpirationKindEnum {
  Document = 'DOCUMENT',
  Form = 'FORM'
}

export type ExpirationProfileSectionCount = {
  __typename?: 'ExpirationProfileSectionCount';
  count: Scalars['Int'];
  id?: Maybe<ProfileSectionEnum>;
};

export enum ExpirationWarningTimeUnitsEnum {
  Weeks = 'WEEKS',
  Months = 'MONTHS'
}

export type FormCompletion = {
  __typename?: 'FormCompletion';
  category: DocumentCategoryEnum;
  id: Scalars['ID'];
  profileSection: ProfileSectionEnum;
  status: CompletionStatusEnum;
};

export type FormCompletionCategoryCount = {
  __typename?: 'FormCompletionCategoryCount';
  count: Scalars['Int'];
  id: DocumentCategoryEnum;
};

export type HealthProfessionsScholarship = {
  __typename?: 'HealthProfessionsScholarship';
  endedAt: Scalars['ISO8601DateTime'];
  militaryBranchScholarshipSponsor: Scalars['String'];
  person: Person;
  startedAt: Scalars['ISO8601DateTime'];
};

export type HealthcareFacilityAffiliation = {
  __typename?: 'HealthcareFacilityAffiliation';
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  comments?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  departmentOrDivisionName?: Maybe<Scalars['String']>;
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
  facilityLegalBusinessName?: Maybe<Scalars['String']>;
  facilityName: Scalars['String'];
  facilityType?: Maybe<Scalars['String']>;
  medicalStaffOfficeFaxNumber?: Maybe<Scalars['String']>;
  medicalStaffOfficePhoneNumber?: Maybe<Scalars['String']>;
  membershipStatus: HealthcareFacilityMembershipStatus;
  person: Person;
  privilegeLimitations?: Maybe<Scalars['Boolean']>;
  startedAt: Scalars['ISO8601DateTime'];
  state?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
};

/** Input to create or edit healthcare affiliations */
export type HealthcareFacilityAffiliationInput = {
  facilityName: Scalars['String'];
  facilityLegalBusinessName?: Maybe<Scalars['String']>;
  facilityType?: Maybe<Scalars['String']>;
  departmentOrDivisionName?: Maybe<Scalars['String']>;
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  membershipStatus: HealthcareFacilityMembershipStatus;
  medicalStaffOfficePhoneNumber?: Maybe<Scalars['String']>;
  medicalStaffOfficeFaxNumber?: Maybe<Scalars['String']>;
  privilegeLimitations?: Maybe<Scalars['Boolean']>;
  comments?: Maybe<Scalars['String']>;
  startedAt: Scalars['ISO8601DateTime'];
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
};

export enum HealthcareFacilityMembershipStatus {
  Inactive = 'INACTIVE',
  Active = 'ACTIVE',
  Provisional = 'PROVISIONAL',
  Courtesy = 'COURTESY',
  Temporary = 'TEMPORARY'
}

export type HospitalAffiliation = {
  __typename?: 'HospitalAffiliation';
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  comments?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  departmentName?: Maybe<Scalars['String']>;
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
  hospitalLegalBusinessName?: Maybe<Scalars['String']>;
  hospitalName?: Maybe<Scalars['String']>;
  membershipStatus: HospitalMembershipStatus;
  person: Person;
  privilegeLimitations?: Maybe<Scalars['Boolean']>;
  staffOfficeFaxNumber?: Maybe<Scalars['String']>;
  staffOfficePhoneNumber?: Maybe<Scalars['String']>;
  startedAt: Scalars['ISO8601DateTime'];
  state?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
};

/** Input to create or edit hospital affiliations */
export type HospitalAffiliationInput = {
  hospitalName?: Maybe<Scalars['String']>;
  hospitalLegalBusinessName?: Maybe<Scalars['String']>;
  departmentName?: Maybe<Scalars['String']>;
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  membershipStatus: HospitalMembershipStatus;
  staffOfficePhoneNumber?: Maybe<Scalars['String']>;
  staffOfficeFaxNumber?: Maybe<Scalars['String']>;
  privilegeLimitations?: Maybe<Scalars['Boolean']>;
  comments?: Maybe<Scalars['String']>;
  startedAt: Scalars['ISO8601DateTime'];
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
};

export enum HospitalMembershipStatus {
  Inactive = 'INACTIVE',
  Active = 'ACTIVE',
  Provisional = 'PROVISIONAL',
  Courtesy = 'COURTESY',
  Temporary = 'TEMPORARY'
}


export type InfluenzaVaccination = {
  __typename?: 'InfluenzaVaccination';
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  facilityName?: Maybe<Scalars['String']>;
  fluSeason?: Maybe<Scalars['String']>;
  hasBeenVaccinated: Scalars['Boolean'];
  noVaccinationComment?: Maybe<Scalars['String']>;
  person: Person;
  state?: Maybe<Scalars['String']>;
  vaccinatedAt?: Maybe<Scalars['ISO8601DateTime']>;
  zip?: Maybe<Scalars['String']>;
};

export type InsurancePolicy = {
  __typename?: 'InsurancePolicy';
  aggregateAmount: Scalars['Float'];
  city?: Maybe<Scalars['String']>;
  claimsCoverageType?: Maybe<ClaimsCoverageTypeEnum>;
  coverageType?: Maybe<CoverageTypeEnum>;
  coveredByFtca: Scalars['Boolean'];
  email?: Maybe<Scalars['String']>;
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
  entityName?: Maybe<Scalars['String']>;
  faxNumber?: Maybe<Scalars['String']>;
  perClaimAmount: Scalars['Float'];
  person: Person;
  phoneNumber?: Maybe<Scalars['String']>;
  policyNumber?: Maybe<Scalars['String']>;
  selfInsured: Scalars['Boolean'];
  startedAt?: Maybe<Scalars['ISO8601DateTime']>;
  state?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  tailCoverage: Scalars['Boolean'];
  url?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
};

/** Input to create or edit insurance policies */
export type InsurancePolicyInput = {
  aggregateAmount?: Maybe<Scalars['Float']>;
  city?: Maybe<Scalars['String']>;
  claimsCoverageType?: Maybe<ClaimsCoverageTypeEnum>;
  coverageType?: Maybe<CoverageTypeEnum>;
  coveredByFtca: Scalars['Boolean'];
  email?: Maybe<Scalars['String']>;
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
  entityName?: Maybe<Scalars['String']>;
  faxNumber?: Maybe<Scalars['String']>;
  perClaimAmount?: Maybe<Scalars['Float']>;
  phoneNumber?: Maybe<Scalars['String']>;
  policyNumber?: Maybe<Scalars['String']>;
  selfInsured: Scalars['Boolean'];
  startedAt: Scalars['ISO8601DateTime'];
  state?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  tailCoverage: Scalars['Boolean'];
  url?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
};

export type JumioIdentityVerification = {
  __typename?: 'JumioIdentityVerification';
  scanReference: Scalars['String'];
  user: User;
  verificationStatus: VerificationStatusEnum;
};

export enum LanguageProficiencyEnum {
  None = 'NONE',
  Elementary = 'ELEMENTARY',
  Limited = 'LIMITED',
  Working = 'WORKING',
  Professional = 'PROFESSIONAL',
  Native = 'NATIVE'
}

export enum LegalGender {
  Male = 'MALE',
  Female = 'FEMALE',
  NotKnown = 'NOT_KNOWN',
  NotApplicable = 'NOT_APPLICABLE'
}

export type LoanRepaymentDetail = {
  __typename?: 'LoanRepaymentDetail';
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
  nameOfInstitution?: Maybe<Scalars['String']>;
  person: Person;
  repaymentProgramName?: Maybe<Scalars['String']>;
  startedAt?: Maybe<Scalars['ISO8601DateTime']>;
  state?: Maybe<Scalars['String']>;
  yearsWorkedForRepayment?: Maybe<Scalars['Int']>;
  zip?: Maybe<Scalars['String']>;
};

export type MalpracticeClaim = {
  __typename?: 'MalpracticeClaim';
  allegedIncidentDate: Scalars['ISO8601DateTime'];
  amountPaid?: Maybe<Scalars['Float']>;
  claimFiledAt: Scalars['ISO8601DateTime'];
  claimStatus?: Maybe<Scalars['String']>;
  defendantType?: Maybe<MalpracticeDefendantEnum>;
  descriptionOfAllegations?: Maybe<Scalars['String']>;
  descriptionOfAllegedInjury?: Maybe<Scalars['String']>;
  includedInNpdb?: Maybe<Scalars['Boolean']>;
  insuranceCarrierInvolved?: Maybe<Scalars['String']>;
  involvementDescription?: Maybe<Scalars['String']>;
  methodOfResolution?: Maybe<MalpracticeResolutionEnum>;
  numberOfCoDefendants: Scalars['Int'];
  person: Person;
  policyNumberCoveredBy?: Maybe<Scalars['String']>;
  resolutionComment?: Maybe<Scalars['String']>;
  settlementAmount?: Maybe<Scalars['Float']>;
};

/** Input to create or edit malpractice claims */
export type MalpracticeClaimInput = {
  allegedIncidentDate: Scalars['ISO8601DateTime'];
  amountPaid: Scalars['Float'];
  claimFiledAt: Scalars['ISO8601DateTime'];
  claimStatus?: Maybe<Scalars['String']>;
  defendantType: MalpracticeDefendantEnum;
  descriptionOfAllegations?: Maybe<Scalars['String']>;
  descriptionOfAllegedInjury?: Maybe<Scalars['String']>;
  includedInNpdb: Scalars['Boolean'];
  insuranceCarrierInvolved?: Maybe<Scalars['String']>;
  involvementDescription?: Maybe<Scalars['String']>;
  methodOfResolution: MalpracticeResolutionEnum;
  numberOfCoDefendants: Scalars['Int'];
  policyNumberCoveredBy?: Maybe<Scalars['String']>;
  resolutionComment?: Maybe<Scalars['String']>;
  settlementAmount: Scalars['Float'];
};

export enum MalpracticeDefendantEnum {
  Primary = 'PRIMARY',
  Co = 'CO'
}

export enum MalpracticeResolutionEnum {
  Dismissed = 'DISMISSED',
  SettledWithPrejudice = 'SETTLED_WITH_PREJUDICE',
  SettledWithoutPrejudice = 'SETTLED_WITHOUT_PREJUDICE',
  JudgementForPlantiff = 'JUDGEMENT_FOR_PLANTIFF',
  JudgementForDefendant = 'JUDGEMENT_FOR_DEFENDANT',
  MediationOrArbitration = 'MEDIATION_OR_ARBITRATION',
  Other = 'OTHER'
}

export type MedicalDegree = {
  __typename?: 'MedicalDegree';
  dateOfGraduation: Scalars['ISO8601DateTime'];
  ecfmgCertified: Scalars['Boolean'];
  ecfmgCertifiedAt?: Maybe<Scalars['ISO8601DateTime']>;
  endedAt: Scalars['ISO8601DateTime'];
  foreignMedicalSchool: Scalars['Boolean'];
  id: Scalars['ID'];
  institutionAddressCity: Scalars['String'];
  institutionAddressCountry: Scalars['String'];
  institutionAddressLine1: Scalars['String'];
  institutionAddressLine2?: Maybe<Scalars['String']>;
  institutionAddressLine3?: Maybe<Scalars['String']>;
  institutionAddressState: Scalars['String'];
  institutionAddressZip: Scalars['String'];
  institutionName: Scalars['String'];
  kind: MedicalDegreeKind;
  person: Person;
  registrarPhoneNumber: Scalars['String'];
  registrarUrl: Scalars['String'];
  startedAt: Scalars['ISO8601DateTime'];
};

export enum MedicalDegreeKind {
  Medical = 'MEDICAL',
  Osteopathic = 'OSTEOPATHIC'
}

export type MedicalGroupEmployer = {
  __typename?: 'MedicalGroupEmployer';
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
  legalBusinessName?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  person: Person;
  phoneNumber?: Maybe<Scalars['String']>;
  startedAt: Scalars['ISO8601DateTime'];
  state?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

/** Input to create or edit medical group employers */
export type MedicalGroupEmployerInput = {
  name?: Maybe<Scalars['String']>;
  legalBusinessName?: Maybe<Scalars['String']>;
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  startedAt: Scalars['ISO8601DateTime'];
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
};

export type MilitaryService = {
  __typename?: 'MilitaryService';
  activeDuty: Scalars['Boolean'];
  branchOfService: Scalars['String'];
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
  hasDd214: Scalars['Boolean'];
  id: Scalars['ID'];
  person: Person;
  startedAt: Scalars['ISO8601DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDocument?: Maybe<CreateDocumentMutationPayload>;
  createJumioIdentityVerification?: Maybe<CreateJumioIdentityVerificationMutationPayload>;
  deleteDocument?: Maybe<DeleteDocumentMutationPayload>;
  deleteHealthProfessionsScholarship?: Maybe<DeleteHealthProfessionsScholarshipMutationPayload>;
  deleteLoanRepaymentDetail?: Maybe<DeleteLoanRepaymentDetailMutationPayload>;
  deleteMilitaryService?: Maybe<DeleteMilitaryServiceMutationPayload>;
  deleteNationHealthServiceCorpsScholarship?: Maybe<DeleteNationHealthServiceCorpsScholarshipMutationPayload>;
  deleteUnitedStatesPublicHealthService?: Maybe<DeleteUnitedStatesPublicHealthServiceMutationPayload>;
  shareDocuments?: Maybe<ShareDocumentsMutationPayload>;
  signIn?: Maybe<SignInMutationPayload>;
  signOut?: Maybe<SignOutMutationPayload>;
  signUp?: Maybe<SignUpMutationPayload>;
  updateAcademicAppointments?: Maybe<UpdateAcademicAppointmentsMutationPayload>;
  updateAddresses?: Maybe<UpdateAddressesMutationPayload>;
  updateAdministrativeLeadershipPositions?: Maybe<UpdateAdministrativeLeadershipPositionsMutationPayload>;
  updateBirthAndCitizenship?: Maybe<UpdateBirthAndCitizenshipMutationPayload>;
  updateBoardCertification?: Maybe<UpdateBoardCertificationMutationPayload>;
  updateCertification?: Maybe<UpdateCertificationMutationPayload>;
  updateCmeCreditHours?: Maybe<UpdateCmeCreditHoursMutationPayload>;
  updateComlexScores?: Maybe<UpdateComlexScoresMutationPayload>;
  updateCovidVaccination?: Maybe<UpdateCovidVaccinationMutationPayload>;
  updateDeaLicense?: Maybe<UpdateDeaLicenseMutationPayload>;
  updateDegree?: Maybe<UpdateDegreeMutationPayload>;
  updateDemographicDetail?: Maybe<UpdateDemographicDetailMutationPayload>;
  updateDocument?: Maybe<UpdateDocumentMutationPayload>;
  updateDriversLicense?: Maybe<UpdateDriversLicenseMutationPayload>;
  updateEmploymentGap?: Maybe<UpdateEmploymentGapMutationPayload>;
  updateFormCompletionStatus?: Maybe<UpdateFormCompletionStatusMutationPayload>;
  updateHealthProfessionsScholarship?: Maybe<UpdateHealthProfessionsScholarshipMutationPayload>;
  updateHealthcareFacilityAffiliations?: Maybe<UpdateHealthcareFacilityAffiliationsMutationPayload>;
  updateHospitalAffiliations?: Maybe<UpdateHospitalAffiliationsMutationPayload>;
  updateIdNumbers?: Maybe<UpdateIdNumbersMutationPayload>;
  updateInfluenzaVaccination?: Maybe<UpdateInfluenzaVaccinationMutationPayload>;
  updateInsurancePolicies?: Maybe<UpdateInsurancePoliciesMutationPayload>;
  updateLoanRepaymentDetail?: Maybe<UpdateLoanRepaymentDetailMutationPayload>;
  updateMalpracticeClaims?: Maybe<UpdateMalpracticeClaimsMutationPayload>;
  updateMedicalDegree?: Maybe<UpdateMedicalDegreeMutationPayload>;
  updateMedicalGroupEmployers?: Maybe<UpdateMedicalGroupEmployersMutationPayload>;
  updateMilitaryService?: Maybe<UpdateMilitaryServiceMutationPayload>;
  updateNationalHealthServiceCorpsScholarship?: Maybe<UpdateNationalHealthServiceCorpsScholarshipMutationPayload>;
  updateOtherCertifications?: Maybe<UpdateOtherCertificationsMutationPayload>;
  updatePassport?: Maybe<UpdatePassportMutationPayload>;
  updatePeerReference?: Maybe<UpdatePeerReferenceMutationPayload>;
  updatePersonalDetails?: Maybe<UpdatePersonalDetailsMutationPayload>;
  updatePostGraduateTraining?: Maybe<UpdatePostGraduateTrainingMutationPayload>;
  updatePpdTuberculosisTesting?: Maybe<UpdatePpdTuberculosisTestingMutationPayload>;
  updatePriorNames?: Maybe<UpdatePriorNamesMutationPayload>;
  updateProfessionalLiabilityInsuranceCarrier?: Maybe<UpdateProfessionalLiabilityInsuranceCarrierMutationPayload>;
  updateProfessionalLiabilityJudgmentsQuestionnaire?: Maybe<UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationPayload>;
  updateProfessionalLicenses?: Maybe<UpdateProfessionalLicensesMutationPayload>;
  updateSpokenLanguages?: Maybe<UpdateSpokenLanguagesMutationPayload>;
  updateUnitedStatesPublicHealthService?: Maybe<UpdateUnitedStatesPublicHealthServiceMutationPayload>;
  updateUser?: Maybe<UpdateUserMutationPayload>;
  updateUsmleScores?: Maybe<UpdateUsmleScoresMutationPayload>;
};


export type MutationCreateDocumentArgs = {
  input: CreateDocumentMutationInput;
};


export type MutationCreateJumioIdentityVerificationArgs = {
  input: CreateJumioIdentityVerificationMutationInput;
};


export type MutationDeleteDocumentArgs = {
  input: DeleteDocumentMutationInput;
};


export type MutationShareDocumentsArgs = {
  input: ShareDocumentsMutationInput;
};


export type MutationSignInArgs = {
  input: SignInMutationInput;
};


export type MutationSignUpArgs = {
  input: SignUpMutationInput;
};


export type MutationUpdateAcademicAppointmentsArgs = {
  input: UpdateAcademicAppointmentsMutationInput;
};


export type MutationUpdateAddressesArgs = {
  input: UpdateAddressesMutationInput;
};


export type MutationUpdateAdministrativeLeadershipPositionsArgs = {
  input: UpdateAdministrativeLeadershipPositionsMutationInput;
};


export type MutationUpdateBirthAndCitizenshipArgs = {
  input: UpdateBirthAndCitizenshipMutationInput;
};


export type MutationUpdateBoardCertificationArgs = {
  input: UpdateBoardCertificationMutationInput;
};


export type MutationUpdateCertificationArgs = {
  input: UpdateCertificationMutationInput;
};


export type MutationUpdateCmeCreditHoursArgs = {
  input: UpdateCmeCreditHoursMutationInput;
};


export type MutationUpdateComlexScoresArgs = {
  input: UpdateComlexScoresMutationInput;
};


export type MutationUpdateCovidVaccinationArgs = {
  input: UpdateCovidVaccinationMutationInput;
};


export type MutationUpdateDeaLicenseArgs = {
  input: UpdateDeaLicenseMutationInput;
};


export type MutationUpdateDegreeArgs = {
  input: UpdateDegreeMutationInput;
};


export type MutationUpdateDemographicDetailArgs = {
  input: UpdateDemographicDetailMutationInput;
};


export type MutationUpdateDocumentArgs = {
  input: UpdateDocumentMutationInput;
};


export type MutationUpdateDriversLicenseArgs = {
  input: UpdateDriversLicenseMutationInput;
};


export type MutationUpdateEmploymentGapArgs = {
  input: UpdateEmploymentGapMutationInput;
};


export type MutationUpdateFormCompletionStatusArgs = {
  input: UpdateFormCompletionStatusMutationInput;
};


export type MutationUpdateHealthProfessionsScholarshipArgs = {
  input: UpdateHealthProfessionsScholarshipMutationInput;
};


export type MutationUpdateHealthcareFacilityAffiliationsArgs = {
  input: UpdateHealthcareFacilityAffiliationsMutationInput;
};


export type MutationUpdateHospitalAffiliationsArgs = {
  input: UpdateHospitalAffiliationsMutationInput;
};


export type MutationUpdateIdNumbersArgs = {
  input: UpdateIdNumbersMutationInput;
};


export type MutationUpdateInfluenzaVaccinationArgs = {
  input: UpdateInfluenzaVaccinationMutationInput;
};


export type MutationUpdateInsurancePoliciesArgs = {
  input: UpdateInsurancePoliciesMutationInput;
};


export type MutationUpdateLoanRepaymentDetailArgs = {
  input: UpdateLoanRepaymentDetailMutationInput;
};


export type MutationUpdateMalpracticeClaimsArgs = {
  input: UpdateMalpracticeClaimsMutationInput;
};


export type MutationUpdateMedicalDegreeArgs = {
  input: UpdateMedicalDegreeMutationInput;
};


export type MutationUpdateMedicalGroupEmployersArgs = {
  input: UpdateMedicalGroupEmployersMutationInput;
};


export type MutationUpdateMilitaryServiceArgs = {
  input: UpdateMilitaryServiceMutationInput;
};


export type MutationUpdateNationalHealthServiceCorpsScholarshipArgs = {
  input: UpdateNationalHealthServiceCorpsScholarshipMutationInput;
};


export type MutationUpdateOtherCertificationsArgs = {
  input: UpdateOtherCertificationsMutationInput;
};


export type MutationUpdatePassportArgs = {
  input: UpdatePassportMutationInput;
};


export type MutationUpdatePeerReferenceArgs = {
  input: UpdatePeerReferenceMutationInput;
};


export type MutationUpdatePersonalDetailsArgs = {
  input: UpdatePersonalDetailsMutationInput;
};


export type MutationUpdatePostGraduateTrainingArgs = {
  input: UpdatePostGraduateTrainingMutationInput;
};


export type MutationUpdatePpdTuberculosisTestingArgs = {
  input: UpdatePpdTuberculosisTestingMutationInput;
};


export type MutationUpdatePriorNamesArgs = {
  input: UpdatePriorNamesMutationInput;
};


export type MutationUpdateProfessionalLiabilityInsuranceCarrierArgs = {
  input: UpdateProfessionalLiabilityInsuranceCarrierMutationInput;
};


export type MutationUpdateProfessionalLiabilityJudgmentsQuestionnaireArgs = {
  input: UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationInput;
};


export type MutationUpdateProfessionalLicensesArgs = {
  input: UpdateProfessionalLicensesMutationInput;
};


export type MutationUpdateSpokenLanguagesArgs = {
  input: UpdateSpokenLanguagesMutationInput;
};


export type MutationUpdateUnitedStatesPublicHealthServiceArgs = {
  input: UpdateUnitedStatesPublicHealthServiceMutationInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserMutationInput;
};


export type MutationUpdateUsmleScoresArgs = {
  input: UpdateUsmleScoresMutationInput;
};

export type NationalHealthServiceCorpsScholarship = {
  __typename?: 'NationalHealthServiceCorpsScholarship';
  endedAt: Scalars['ISO8601DateTime'];
  person: Person;
  startedAt: Scalars['ISO8601DateTime'];
};

export enum OnboardingStatusEnum {
  AccountCreated = 'ACCOUNT_CREATED',
  AwaitingVerification = 'AWAITING_VERIFICATION',
  IdentityVerified = 'IDENTITY_VERIFIED',
  IdentityVerificationFailed = 'IDENTITY_VERIFICATION_FAILED',
  VerificationAttemptsExceeded = 'VERIFICATION_ATTEMPTS_EXCEEDED',
  OnboardingComplete = 'ONBOARDING_COMPLETE'
}

/** Input to create or edit other certifications */
export type OtherCertificationInput = {
  otherName?: Maybe<Scalars['String']>;
  issuedAt: Scalars['ISO8601DateTime'];
  expiresAt?: Maybe<Scalars['ISO8601DateTime']>;
};

export enum PpdInterpretationEnum {
  Negative = 'NEGATIVE',
  Positive = 'POSITIVE'
}

export type PpdTuberculosisTesting = {
  __typename?: 'PPDTuberculosisTesting';
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  hadPositiveTbSkinTest: Scalars['Boolean'];
  hadTbDiseaseDiagnosis: Scalars['Boolean'];
  hasTakenInhOrRifampin: Scalars['Boolean'];
  lastChestXrayAt?: Maybe<Scalars['ISO8601DateTime']>;
  person: Person;
  ppdInduration?: Maybe<Scalars['Int']>;
  ppdInterpretation?: Maybe<PpdInterpretationEnum>;
  receivedBcgVaccine: Scalars['Boolean'];
  state?: Maybe<Scalars['String']>;
  testDate?: Maybe<Scalars['ISO8601DateTime']>;
  testReactionSize?: Maybe<Scalars['Int']>;
  testedInTheLastYear: Scalars['Boolean'];
  testedMoreThan5YearsAgo: Scalars['Boolean'];
  testedPositiveAt?: Maybe<Scalars['ISO8601DateTime']>;
  testingSiteName?: Maybe<Scalars['String']>;
  treatmentCompletedAt?: Maybe<Scalars['ISO8601DateTime']>;
  treatmentCompletedMoreThan5YearsAgo?: Maybe<Scalars['Boolean']>;
  yearTestedPositive?: Maybe<Scalars['String']>;
  yearTreatmentCompleted?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type Passport = {
  __typename?: 'Passport';
  countryOfIssue: Scalars['String'];
  expiresAt: Scalars['ISO8601DateTime'];
  expiresWithinTimeframe: Scalars['Boolean'];
  id: Scalars['String'];
  number: Scalars['String'];
  person: Person;
};

export type PeerReference = {
  __typename?: 'PeerReference';
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  degree?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  hasWorkedWithInThePastTwoYears?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  person: Person;
  phoneNumber?: Maybe<Scalars['String']>;
  position: Scalars['Int'];
  relationship?: Maybe<Scalars['String']>;
  specialty?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  yearsKnown?: Maybe<Scalars['Int']>;
  zip?: Maybe<Scalars['String']>;
};

export type Person = {
  __typename?: 'Person';
  academicAppointments: Array<AcademicAppointment>;
  administrativeLeadershipPositions: Array<AdministrativeLeadershipPosition>;
  /** Fetch board certification details for the given specialty rank */
  boardCertification?: Maybe<BoardCertification>;
  cellPhoneNumber?: Maybe<Scalars['String']>;
  certification?: Maybe<Certification>;
  cmeCreditHours: Array<CmeCreditHour>;
  comlexUsaScores?: Maybe<ComlexusaScore>;
  countryOfCitizenship?: Maybe<Scalars['String']>;
  covidVaccination?: Maybe<CovidVaccination>;
  dateOfBirth?: Maybe<Scalars['ISO8601DateTime']>;
  deaLicense?: Maybe<DeaLicense>;
  /** Fetch degree details for the given kind */
  degree?: Maybe<Degree>;
  demographicDetail?: Maybe<DemographicDetail>;
  document?: Maybe<Document>;
  documents: Array<Document>;
  driversLicense?: Maybe<DriversLicense>;
  emergencyContactNumber?: Maybe<Scalars['String']>;
  employmentGap?: Maybe<EmploymentGap>;
  expirations: Array<Expiration>;
  expirationsByCategory: Array<ExpirationCategoryCount>;
  expirationsByProfileSection: Array<ExpirationProfileSectionCount>;
  firstName: Scalars['String'];
  formCompletion?: Maybe<FormCompletion>;
  formCompletionByCategory: Array<FormCompletionCategoryCount>;
  formCompletions: Array<FormCompletion>;
  healthProfessionsScholarship?: Maybe<HealthProfessionsScholarship>;
  healthcareFacilityAffiliations: Array<HealthcareFacilityAffiliation>;
  homeAddressCity?: Maybe<Scalars['String']>;
  homeAddressCountry?: Maybe<Scalars['String']>;
  homeAddressLine1?: Maybe<Scalars['String']>;
  homeAddressLine2?: Maybe<Scalars['String']>;
  homeAddressLine3?: Maybe<Scalars['String']>;
  homeAddressState?: Maybe<Scalars['String']>;
  homeAddressZip?: Maybe<Scalars['String']>;
  hospitalAffiliations: Array<HospitalAffiliation>;
  id: Scalars['ID'];
  influenzaVaccination?: Maybe<InfluenzaVaccination>;
  insurancePolicies: Array<InsurancePolicy>;
  lastName: Scalars['String'];
  legalGender: LegalGender;
  loanRepaymentDetail?: Maybe<LoanRepaymentDetail>;
  maidenName?: Maybe<Scalars['String']>;
  mailingAddressCity?: Maybe<Scalars['String']>;
  mailingAddressCountry?: Maybe<Scalars['String']>;
  mailingAddressLine1?: Maybe<Scalars['String']>;
  mailingAddressLine2?: Maybe<Scalars['String']>;
  mailingAddressLine3?: Maybe<Scalars['String']>;
  mailingAddressSameAsHome: Scalars['Boolean'];
  mailingAddressState?: Maybe<Scalars['String']>;
  mailingAddressZip?: Maybe<Scalars['String']>;
  malpracticeClaims: Array<MalpracticeClaim>;
  medicalDegree?: Maybe<MedicalDegree>;
  medicalGroupEmployers: Array<MedicalGroupEmployer>;
  middleName?: Maybe<Scalars['String']>;
  militaryService?: Maybe<MilitaryService>;
  nationalHealthServiceCorpsScholarship?: Maybe<NationalHealthServiceCorpsScholarship>;
  npiNumber?: Maybe<Scalars['String']>;
  orcidId?: Maybe<Scalars['String']>;
  otherCertifications: Array<Certification>;
  passport?: Maybe<Passport>;
  peerReference?: Maybe<PeerReference>;
  personalMedicaidNumber?: Maybe<Scalars['String']>;
  personalMedicareNumber?: Maybe<Scalars['String']>;
  placeOfBirthCity?: Maybe<Scalars['String']>;
  placeOfBirthCountry?: Maybe<Scalars['String']>;
  placeOfBirthState?: Maybe<Scalars['String']>;
  /** Fetch post graduate training details for the given kind */
  postGraduateTraining?: Maybe<PostGraduateTraining>;
  ppdTuberculosisTesting?: Maybe<PpdTuberculosisTesting>;
  primaryCertification?: Maybe<BoardCertification>;
  priorNames: Array<PriorName>;
  professionalLiabilityInsuranceCarrier?: Maybe<ProfessionalLiabilityInsuranceCarrier>;
  professionalLiabilityJudgmentsQuestionnaire?: Maybe<ProfessionalLiabilityJudgmentsQuestionnaire>;
  professionalLicenses: Array<ProfessionalLicense>;
  providerProfessionType?: Maybe<Scalars['String']>;
  researcherId?: Maybe<Scalars['String']>;
  scopusAuthorId?: Maybe<Scalars['String']>;
  secondaryCertification?: Maybe<BoardCertification>;
  sharingEvent?: Maybe<SharingEvent>;
  sharingEvents: Array<SharingEvent>;
  socialSecurityNumber?: Maybe<Scalars['String']>;
  spokenLanguages: Array<SpokenLanguage>;
  suffix?: Maybe<Scalars['String']>;
  unitedStatesPublicHealthService?: Maybe<UnitedStatesPublicHealthService>;
  upinNumber?: Maybe<Scalars['String']>;
  usPermanentResident?: Maybe<Scalars['Boolean']>;
  usmleScores?: Maybe<UsmleScore>;
  visaExpiresAt?: Maybe<Scalars['ISO8601DateTime']>;
  visaNumber?: Maybe<Scalars['String']>;
  visaStatus?: Maybe<Scalars['String']>;
  visaType?: Maybe<Scalars['String']>;
};


export type PersonBoardCertificationArgs = {
  specialtyRank: SpecialtyRankEnum;
};


export type PersonCertificationArgs = {
  kind: CertificationKindEnum;
};


export type PersonDegreeArgs = {
  kind: DegreeKind;
};


export type PersonDocumentArgs = {
  id: Scalars['ID'];
};


export type PersonDocumentsArgs = {
  category?: Maybe<DocumentCategoryEnum>;
  profileSection?: Maybe<ProfileSectionEnum>;
};


export type PersonExpirationsArgs = {
  kind: ExpirationKindEnum;
  category?: Maybe<DocumentCategoryEnum>;
};


export type PersonFormCompletionArgs = {
  profileSection: ProfileSectionEnum;
};


export type PersonFormCompletionsArgs = {
  profileSections: Array<ProfileSectionEnum>;
};


export type PersonPeerReferenceArgs = {
  position: Scalars['Int'];
};


export type PersonPostGraduateTrainingArgs = {
  kind: PostGraduateTrainingKind;
};


export type PersonProfessionalLicensesArgs = {
  kind: ProfessionalLicenseKind;
};


export type PersonSharingEventArgs = {
  id: Scalars['ID'];
};

export type PostGraduateTraining = {
  __typename?: 'PostGraduateTraining';
  acgmeAccredited: Scalars['Boolean'];
  attendanceEndDate?: Maybe<Scalars['ISO8601DateTime']>;
  attendanceStartDate: Scalars['ISO8601DateTime'];
  currentProgramDirectorFirstName?: Maybe<Scalars['String']>;
  currentProgramDirectorLastName?: Maybe<Scalars['String']>;
  directorContactEmail?: Maybe<Scalars['String']>;
  directorContactNumber?: Maybe<Scalars['String']>;
  directorDuringFirstName?: Maybe<Scalars['String']>;
  directorDuringLastName?: Maybe<Scalars['String']>;
  fellowshipKind?: Maybe<Scalars['String']>;
  gmeOfficeEmail?: Maybe<Scalars['String']>;
  gmeOfficePhone?: Maybe<Scalars['String']>;
  gmeOfficeUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  institutionName: Scalars['String'];
  internshipKind?: Maybe<Scalars['String']>;
  kind: PostGraduateTrainingKind;
  person: Person;
  programAdminEmail?: Maybe<Scalars['String']>;
  programAdminName?: Maybe<Scalars['String']>;
  programAdminPhone?: Maybe<Scalars['String']>;
  programDirectorAddressCity?: Maybe<Scalars['String']>;
  programDirectorAddressCountry?: Maybe<Scalars['String']>;
  programDirectorAddressLine1?: Maybe<Scalars['String']>;
  programDirectorAddressLine2?: Maybe<Scalars['String']>;
  programDirectorAddressLine3?: Maybe<Scalars['String']>;
  programDirectorAddressState?: Maybe<Scalars['String']>;
  programDirectorAddressZip?: Maybe<Scalars['String']>;
  residencyKind?: Maybe<Scalars['String']>;
  successfullyCompletedProgram: Scalars['Boolean'];
};

export enum PostGraduateTrainingKind {
  Internship = 'INTERNSHIP',
  Fellowship = 'FELLOWSHIP',
  Residency = 'RESIDENCY'
}

export type PriorName = {
  __typename?: 'PriorName';
  comment?: Maybe<Scalars['String']>;
  endedAt: Scalars['ISO8601DateTime'];
  name: Scalars['String'];
  person: Person;
  startedAt: Scalars['ISO8601DateTime'];
};

/** Input to create or edit prior names */
export type PriorNameInput = {
  startedAt: Scalars['ISO8601DateTime'];
  endedAt: Scalars['ISO8601DateTime'];
  name: Scalars['String'];
  comment?: Maybe<Scalars['String']>;
};

export type ProfessionalLiabilityInsuranceCarrier = {
  __typename?: 'ProfessionalLiabilityInsuranceCarrier';
  contactPersonEmailAddress?: Maybe<Scalars['String']>;
  contactPersonFaxNumber?: Maybe<Scalars['String']>;
  contactPersonFirstName?: Maybe<Scalars['String']>;
  contactPersonLastName?: Maybe<Scalars['String']>;
  contactPersonPhoneNumber?: Maybe<Scalars['String']>;
  contactPersonRole?: Maybe<Scalars['String']>;
  malpracticeType?: Maybe<Scalars['String']>;
  organizationAddressLine1?: Maybe<Scalars['String']>;
  organizationAddressLine2?: Maybe<Scalars['String']>;
  organizationCity?: Maybe<Scalars['String']>;
  organizationEmailAddress?: Maybe<Scalars['String']>;
  organizationFaxNumber?: Maybe<Scalars['String']>;
  organizationName: Scalars['String'];
  organizationPhoneNumber?: Maybe<Scalars['String']>;
  organizationState?: Maybe<Scalars['String']>;
  organizationZip?: Maybe<Scalars['String']>;
};

export type ProfessionalLiabilityJudgmentsQuestionnaire = {
  __typename?: 'ProfessionalLiabilityJudgmentsQuestionnaire';
  anyLegalActionDueToClinicalActions: Scalars['Boolean'];
  judgmentsEntered: Scalars['Boolean'];
  liabilityClaimSettlementsPaid: Scalars['Boolean'];
  pendingLiabilityActions: Scalars['Boolean'];
  person: Person;
};

export type ProfessionalLicense = {
  __typename?: 'ProfessionalLicense';
  dateOfIssue: Scalars['ISO8601DateTime'];
  expiresAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  issuingAuthority: Scalars['String'];
  issuingState: Scalars['String'];
  kind: ProfessionalLicenseKind;
  licenseVerificationUrl: Scalars['String'];
  nonMedicalLicenseKind?: Maybe<Scalars['String']>;
  number: Scalars['String'];
  person: Person;
  status: Scalars['String'];
  unrestrictedLicense: Scalars['Boolean'];
};

/** Input to create or edit professional licenses */
export type ProfessionalLicenseInput = {
  issuingState?: Maybe<Scalars['String']>;
  issuingAuthority?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  licenseVerificationUrl: Scalars['String'];
  dateOfIssue: Scalars['ISO8601DateTime'];
  expiresAt: Scalars['ISO8601DateTime'];
  status?: Maybe<Scalars['String']>;
  unrestrictedLicense: Scalars['Boolean'];
  nonMedicalLicenseKind?: Maybe<Scalars['String']>;
};

export enum ProfessionalLicenseKind {
  Medical = 'MEDICAL',
  XrayFluoroscopy = 'XRAY_FLUOROSCOPY',
  Other = 'OTHER'
}

export enum ProfileSectionEnum {
  AcademicAppointments = 'ACADEMIC_APPOINTMENTS',
  Acls = 'ACLS',
  Address = 'ADDRESS',
  AdministrativeLeadershipPositions = 'ADMINISTRATIVE_LEADERSHIP_POSITIONS',
  Atls = 'ATLS',
  BirthAndCitizenship = 'BIRTH_AND_CITIZENSHIP',
  Bls = 'BLS',
  CmeCreditHours = 'CME_CREDIT_HOURS',
  ComlexusaScores = 'COMLEXUSA_SCORES',
  CoreC = 'CORE_C',
  Covid19Vaccine = 'COVID19_VACCINE',
  Cpr = 'CPR',
  DeaLicense = 'DEA_LICENSE',
  DemographicInformation = 'DEMOGRAPHIC_INFORMATION',
  DriversLicense = 'DRIVERS_LICENSE',
  EmploymentGap = 'EMPLOYMENT_GAP',
  Fellowship = 'FELLOWSHIP',
  HealthcareFacilityAffiliations = 'HEALTHCARE_FACILITY_AFFILIATIONS',
  HealthProfessionsScholarship = 'HEALTH_PROFESSIONS_SCHOLARSHIP',
  HospitalAffiliations = 'HOSPITAL_AFFILIATIONS',
  IdentifyingNumbers = 'IDENTIFYING_NUMBERS',
  InfluenzaVaccination = 'INFLUENZA_VACCINATION',
  InsuranceCarrier = 'INSURANCE_CARRIER',
  Internship = 'INTERNSHIP',
  LoanRepayment = 'LOAN_REPAYMENT',
  MalpracticeClaims = 'MALPRACTICE_CLAIMS',
  MedicalDegree = 'MEDICAL_DEGREE',
  MedicalGroupEmployer = 'MEDICAL_GROUP_EMPLOYER',
  MilitaryService = 'MILITARY_SERVICE',
  Nals = 'NALS',
  NationalHealthServiceCorpsScholarship = 'NATIONAL_HEALTH_SERVICE_CORPS_SCHOLARSHIP',
  Nrp = 'NRP',
  Other = 'OTHER',
  OtherCertification = 'OTHER_CERTIFICATION',
  OtherDegree = 'OTHER_DEGREE',
  OtherStateProfessionalLicenses = 'OTHER_STATE_PROFESSIONAL_LICENSES',
  Pals = 'PALS',
  Passport = 'PASSPORT',
  PeerReference_1 = 'PEER_REFERENCE_1',
  PeerReference_2 = 'PEER_REFERENCE_2',
  PeerReference_3 = 'PEER_REFERENCE_3',
  Personal = 'PERSONAL',
  PpdTuberculosisTesting = 'PPD_TUBERCULOSIS_TESTING',
  PrimarySpecialty = 'PRIMARY_SPECIALTY',
  PriorNames = 'PRIOR_NAMES',
  ProfessionalLiabilityInsuranceCarrier = 'PROFESSIONAL_LIABILITY_INSURANCE_CARRIER',
  ProfessionalLiabilityJudgmentsQuestionnaire = 'PROFESSIONAL_LIABILITY_JUDGMENTS_QUESTIONNAIRE',
  Residency = 'RESIDENCY',
  SecondarySpecialty = 'SECONDARY_SPECIALTY',
  SpokenLanguages = 'SPOKEN_LANGUAGES',
  StateMedicalLicenses = 'STATE_MEDICAL_LICENSES',
  StateXrayFluoroscopyLicense = 'STATE_XRAY_FLUOROSCOPY_LICENSE',
  UndergraduateDegree = 'UNDERGRADUATE_DEGREE',
  UnitedStatesPublicHealthService = 'UNITED_STATES_PUBLIC_HEALTH_SERVICE',
  UsmleScores = 'USMLE_SCORES'
}

export type Query = {
  __typename?: 'Query';
  /** Fetch a list of countries for use in autocomplete fields */
  countries: Array<Scalars['String']>;
  /** Fetch account details for the current user */
  me?: Maybe<User>;
  /** Fetch personal details for the current user */
  personalDetails?: Maybe<Person>;
  /** Fetch a list of states for use in autocomplete fields */
  states: Array<Scalars['String']>;
};

export enum RaceEnum {
  White = 'WHITE',
  BlackOrAfricanAmerican = 'BLACK_OR_AFRICAN_AMERICAN',
  AmericanIndianOrAlaskaNative = 'AMERICAN_INDIAN_OR_ALASKA_NATIVE',
  Asian = 'ASIAN',
  NativeHawaiianOrOther = 'NATIVE_HAWAIIAN_OR_OTHER'
}

/** Autogenerated input type of ShareDocumentsMutation */
export type ShareDocumentsMutationInput = {
  sentFromEmail: Scalars['String'];
  recipientEmails: Array<Scalars['String']>;
  categoriesIncluded: Array<DocumentCategoryEnum>;
  documentIds: Array<Scalars['ID']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of ShareDocumentsMutation */
export type ShareDocumentsMutationPayload = {
  __typename?: 'ShareDocumentsMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  sharingEvent?: Maybe<SharingEvent>;
};

export type SharingEvent = {
  __typename?: 'SharingEvent';
  categoriesIncluded: Array<DocumentCategoryEnum>;
  createdAt: Scalars['ISO8601DateTime'];
  documentSent: Scalars['Boolean'];
  documents: Array<Document>;
  id: Scalars['ID'];
  person: Person;
  recipientEmails: Array<Scalars['String']>;
  sentFromEmail: Scalars['String'];
};

/** Autogenerated input type of SignInMutation */
export type SignInMutationInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of SignInMutation */
export type SignInMutationPayload = {
  __typename?: 'SignInMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

/** Autogenerated return type of SignOutMutation */
export type SignOutMutationPayload = {
  __typename?: 'SignOutMutationPayload';
  success: Scalars['Boolean'];
};

/** Autogenerated input type of SignUpMutation */
export type SignUpMutationInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of SignUpMutation */
export type SignUpMutationPayload = {
  __typename?: 'SignUpMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  user: User;
};

export enum SpecialtyRankEnum {
  Primary = 'PRIMARY',
  Secondary = 'SECONDARY'
}

export type SpokenLanguage = {
  __typename?: 'SpokenLanguage';
  id: Scalars['ID'];
  language: Scalars['String'];
  readingProficiency: LanguageProficiencyEnum;
  speakingProficiency: LanguageProficiencyEnum;
  writingProficiency: LanguageProficiencyEnum;
};

/** Input to create or edit spoken_languages */
export type SpokenLanguageInput = {
  language: Scalars['String'];
  readingProficiency: LanguageProficiencyEnum;
  speakingProficiency: LanguageProficiencyEnum;
  writingProficiency: LanguageProficiencyEnum;
};

export type UsmleScore = {
  __typename?: 'USMLEScore';
  person: Person;
  step1ExamDate?: Maybe<Scalars['ISO8601DateTime']>;
  step1ExamPassed?: Maybe<Scalars['Boolean']>;
  step1ExamScore?: Maybe<Scalars['String']>;
  step2ExamDate?: Maybe<Scalars['ISO8601DateTime']>;
  step2ExamPassed?: Maybe<Scalars['Boolean']>;
  step2ExamScore?: Maybe<Scalars['String']>;
  step3ExamDate?: Maybe<Scalars['ISO8601DateTime']>;
  step3ExamPassed?: Maybe<Scalars['Boolean']>;
  step3ExamScore?: Maybe<Scalars['String']>;
  usmleIdNumber: Scalars['String'];
};

export type UnitedStatesPublicHealthService = {
  __typename?: 'UnitedStatesPublicHealthService';
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
  person: Person;
  startedAt: Scalars['ISO8601DateTime'];
};

/** Autogenerated input type of UpdateAcademicAppointmentsMutation */
export type UpdateAcademicAppointmentsMutationInput = {
  academicAppointmentsAttributes: Array<AcademicAppointmentInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateAcademicAppointmentsMutation */
export type UpdateAcademicAppointmentsMutationPayload = {
  __typename?: 'UpdateAcademicAppointmentsMutationPayload';
  academicAppointments?: Maybe<Array<AcademicAppointment>>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateAddressesMutation */
export type UpdateAddressesMutationInput = {
  homeAddressLine1?: Maybe<Scalars['String']>;
  homeAddressLine2?: Maybe<Scalars['String']>;
  homeAddressLine3?: Maybe<Scalars['String']>;
  homeAddressCity?: Maybe<Scalars['String']>;
  homeAddressState?: Maybe<Scalars['String']>;
  homeAddressZip?: Maybe<Scalars['String']>;
  homeAddressCountry?: Maybe<Scalars['String']>;
  mailingAddressSameAsHome: Scalars['Boolean'];
  mailingAddressLine1?: Maybe<Scalars['String']>;
  mailingAddressLine2?: Maybe<Scalars['String']>;
  mailingAddressLine3?: Maybe<Scalars['String']>;
  mailingAddressCity?: Maybe<Scalars['String']>;
  mailingAddressState?: Maybe<Scalars['String']>;
  mailingAddressZip?: Maybe<Scalars['String']>;
  mailingAddressCountry?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateAddressesMutation */
export type UpdateAddressesMutationPayload = {
  __typename?: 'UpdateAddressesMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  personalDetails?: Maybe<Person>;
};

/** Autogenerated input type of UpdateAdministrativeLeadershipPositionsMutation */
export type UpdateAdministrativeLeadershipPositionsMutationInput = {
  administrativeLeadershipPositionsAttributes: Array<AdministrativeLeadershipPositionsInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateAdministrativeLeadershipPositionsMutation */
export type UpdateAdministrativeLeadershipPositionsMutationPayload = {
  __typename?: 'UpdateAdministrativeLeadershipPositionsMutationPayload';
  administrativeLeadershipPositions?: Maybe<Array<AdministrativeLeadershipPosition>>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateBirthAndCitizenshipMutation */
export type UpdateBirthAndCitizenshipMutationInput = {
  dateOfBirth: Scalars['ISO8601DateTime'];
  placeOfBirthCity: Scalars['String'];
  placeOfBirthState?: Maybe<Scalars['String']>;
  placeOfBirthCountry: Scalars['String'];
  countryOfCitizenship: Scalars['String'];
  usPermanentResident?: Maybe<Scalars['Boolean']>;
  visaType?: Maybe<Scalars['String']>;
  visaNumber?: Maybe<Scalars['String']>;
  visaStatus?: Maybe<Scalars['String']>;
  visaExpiresAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateBirthAndCitizenshipMutation */
export type UpdateBirthAndCitizenshipMutationPayload = {
  __typename?: 'UpdateBirthAndCitizenshipMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  personalDetails?: Maybe<Person>;
};

/** Autogenerated input type of UpdateBoardCertificationMutation */
export type UpdateBoardCertificationMutationInput = {
  specialty?: Maybe<Scalars['String']>;
  specialtyRank: SpecialtyRankEnum;
  boardCertified: Scalars['Boolean'];
  certifyingBoardName?: Maybe<Scalars['String']>;
  initialCertificationDate?: Maybe<Scalars['ISO8601DateTime']>;
  recertificationDate?: Maybe<Scalars['ISO8601DateTime']>;
  expiresAt?: Maybe<Scalars['ISO8601DateTime']>;
  boardCertificationQuestionnaireAttributes?: Maybe<CertificationQuestionnaireInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateBoardCertificationMutation */
export type UpdateBoardCertificationMutationPayload = {
  __typename?: 'UpdateBoardCertificationMutationPayload';
  boardCertification?: Maybe<BoardCertification>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateCMECreditHoursMutation */
export type UpdateCmeCreditHoursMutationInput = {
  cmeCreditHoursAttributes: Array<CmeCreditHourInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateCMECreditHoursMutation */
export type UpdateCmeCreditHoursMutationPayload = {
  __typename?: 'UpdateCMECreditHoursMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  cmeCreditHours?: Maybe<Array<CmeCreditHour>>;
};

/** Autogenerated input type of UpdateCOMLEXScoresMutation */
export type UpdateComlexScoresMutationInput = {
  nbomeIdNumber?: Maybe<Scalars['String']>;
  level1Passed: Scalars['Boolean'];
  level1Score?: Maybe<Scalars['Int']>;
  level1ExamDate?: Maybe<Scalars['ISO8601DateTime']>;
  level2CePassed: Scalars['Boolean'];
  level2CeScore?: Maybe<Scalars['Int']>;
  level2CeExamDate?: Maybe<Scalars['ISO8601DateTime']>;
  level2PePassed: Scalars['Boolean'];
  level2PeScore?: Maybe<Scalars['Int']>;
  level2PeExamDate?: Maybe<Scalars['ISO8601DateTime']>;
  level3Passed: Scalars['Boolean'];
  level3Score?: Maybe<Scalars['Int']>;
  level3ExamDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateCOMLEXScoresMutation */
export type UpdateComlexScoresMutationPayload = {
  __typename?: 'UpdateCOMLEXScoresMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  comlexScores?: Maybe<ComlexusaScore>;
};

/** Autogenerated input type of UpdateCOVIDVaccinationMutation */
export type UpdateCovidVaccinationMutationInput = {
  vaccinationDate1: Scalars['ISO8601DateTime'];
  vaccinationDate2?: Maybe<Scalars['ISO8601DateTime']>;
  facilityName?: Maybe<Scalars['String']>;
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateCOVIDVaccinationMutation */
export type UpdateCovidVaccinationMutationPayload = {
  __typename?: 'UpdateCOVIDVaccinationMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  covidVaccination?: Maybe<CovidVaccination>;
};

/** Autogenerated input type of UpdateCertificationMutation */
export type UpdateCertificationMutationInput = {
  kind: CertificationKindEnum;
  issuedAt: Scalars['ISO8601DateTime'];
  expiresAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateCertificationMutation */
export type UpdateCertificationMutationPayload = {
  __typename?: 'UpdateCertificationMutationPayload';
  certification?: Maybe<Certification>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of UpdateDEALicenseMutation */
export type UpdateDeaLicenseMutationInput = {
  registrationNumber: Scalars['String'];
  expiresAt: Scalars['ISO8601DateTime'];
  status: Scalars['String'];
  unrestricted: Scalars['Boolean'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateDEALicenseMutation */
export type UpdateDeaLicenseMutationPayload = {
  __typename?: 'UpdateDEALicenseMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  deaLicense?: Maybe<DeaLicense>;
};

/** Autogenerated input type of UpdateDegreeMutation */
export type UpdateDegreeMutationInput = {
  institutionName?: Maybe<Scalars['String']>;
  kind: DegreeKind;
  degree?: Maybe<Scalars['String']>;
  major?: Maybe<Scalars['String']>;
  minor?: Maybe<Scalars['String']>;
  dateOfGraduation: Scalars['ISO8601DateTime'];
  startedAt: Scalars['ISO8601DateTime'];
  endedAt: Scalars['ISO8601DateTime'];
  registrarPhoneNumber?: Maybe<Scalars['String']>;
  registrarUrl?: Maybe<Scalars['String']>;
  institutionAddressLine1?: Maybe<Scalars['String']>;
  institutionAddressLine2?: Maybe<Scalars['String']>;
  institutionAddressLine3?: Maybe<Scalars['String']>;
  institutionAddressCity?: Maybe<Scalars['String']>;
  institutionAddressState?: Maybe<Scalars['String']>;
  institutionAddressZip?: Maybe<Scalars['String']>;
  institutionAddressCountry?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateDegreeMutation */
export type UpdateDegreeMutationPayload = {
  __typename?: 'UpdateDegreeMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  degree?: Maybe<Degree>;
};

/** Autogenerated input type of UpdateDemographicDetailMutation */
export type UpdateDemographicDetailMutationInput = {
  race: Array<RaceEnum>;
  ethnicity: EthnicityEnum;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateDemographicDetailMutation */
export type UpdateDemographicDetailMutationPayload = {
  __typename?: 'UpdateDemographicDetailMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  demographicDetail?: Maybe<DemographicDetail>;
};

/** Autogenerated input type of UpdateDocumentMutation */
export type UpdateDocumentMutationInput = {
  attachment?: Maybe<AttachmentInput>;
  category: DocumentCategoryEnum;
  expiresAt?: Maybe<Scalars['ISO8601DateTime']>;
  id: Scalars['ID'];
  kind: DocumentKindEnum;
  name: Scalars['String'];
  otherKind?: Maybe<Scalars['String']>;
  profileSection: ProfileSectionEnum;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateDocumentMutation */
export type UpdateDocumentMutationPayload = {
  __typename?: 'UpdateDocumentMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  document?: Maybe<Document>;
};

/** Autogenerated input type of UpdateDriversLicenseMutation */
export type UpdateDriversLicenseMutationInput = {
  number?: Maybe<Scalars['String']>;
  issuingState?: Maybe<Scalars['String']>;
  expiresAt: Scalars['ISO8601DateTime'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateDriversLicenseMutation */
export type UpdateDriversLicenseMutationPayload = {
  __typename?: 'UpdateDriversLicenseMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  driversLicense?: Maybe<DriversLicense>;
};

/** Autogenerated input type of UpdateEmploymentGapMutation */
export type UpdateEmploymentGapMutationInput = {
  text: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateEmploymentGapMutation */
export type UpdateEmploymentGapMutationPayload = {
  __typename?: 'UpdateEmploymentGapMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  employmentGap?: Maybe<EmploymentGap>;
};

/** Autogenerated input type of UpdateFormCompletionStatusMutation */
export type UpdateFormCompletionStatusMutationInput = {
  status: CompletionStatusEnum;
  profileSection: ProfileSectionEnum;
  category: DocumentCategoryEnum;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateFormCompletionStatusMutation */
export type UpdateFormCompletionStatusMutationPayload = {
  __typename?: 'UpdateFormCompletionStatusMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  formCompletion?: Maybe<FormCompletion>;
};

/** Autogenerated input type of UpdateHealthProfessionsScholarshipMutation */
export type UpdateHealthProfessionsScholarshipMutationInput = {
  militaryBranchScholarshipSponsor?: Maybe<Scalars['String']>;
  startedAt: Scalars['ISO8601DateTime'];
  endedAt: Scalars['ISO8601DateTime'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateHealthProfessionsScholarshipMutation */
export type UpdateHealthProfessionsScholarshipMutationPayload = {
  __typename?: 'UpdateHealthProfessionsScholarshipMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  healthProfessionsScholarship?: Maybe<HealthProfessionsScholarship>;
};

/** Autogenerated input type of UpdateHealthcareFacilityAffiliationsMutation */
export type UpdateHealthcareFacilityAffiliationsMutationInput = {
  healthcareFacilityAffiliationsAttributes: Array<HealthcareFacilityAffiliationInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateHealthcareFacilityAffiliationsMutation */
export type UpdateHealthcareFacilityAffiliationsMutationPayload = {
  __typename?: 'UpdateHealthcareFacilityAffiliationsMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  healthcareFacilityAffiliations?: Maybe<Array<HealthcareFacilityAffiliation>>;
};

/** Autogenerated input type of UpdateHospitalAffiliationsMutation */
export type UpdateHospitalAffiliationsMutationInput = {
  hospitalAffiliationsAttributes: Array<HospitalAffiliationInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateHospitalAffiliationsMutation */
export type UpdateHospitalAffiliationsMutationPayload = {
  __typename?: 'UpdateHospitalAffiliationsMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  hospitalAffiliations?: Maybe<Array<HospitalAffiliation>>;
};

/** Autogenerated input type of UpdateIdNumbersMutation */
export type UpdateIdNumbersMutationInput = {
  npiNumber?: Maybe<Scalars['String']>;
  socialSecurityNumber?: Maybe<Scalars['String']>;
  upinNumber?: Maybe<Scalars['String']>;
  personalMedicaidNumber?: Maybe<Scalars['String']>;
  personalMedicareNumber?: Maybe<Scalars['String']>;
  orcidId?: Maybe<Scalars['String']>;
  researcherId?: Maybe<Scalars['String']>;
  scopusAuthorId?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateIdNumbersMutation */
export type UpdateIdNumbersMutationPayload = {
  __typename?: 'UpdateIdNumbersMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  personalDetails?: Maybe<Person>;
};

/** Autogenerated input type of UpdateInfluenzaVaccinationMutation */
export type UpdateInfluenzaVaccinationMutationInput = {
  vaccinatedAt?: Maybe<Scalars['ISO8601DateTime']>;
  facilityName?: Maybe<Scalars['String']>;
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  hasBeenVaccinated: Scalars['Boolean'];
  noVaccinationComment?: Maybe<Scalars['String']>;
  fluSeason?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateInfluenzaVaccinationMutation */
export type UpdateInfluenzaVaccinationMutationPayload = {
  __typename?: 'UpdateInfluenzaVaccinationMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  influenzaVaccination?: Maybe<InfluenzaVaccination>;
};

/** Autogenerated input type of UpdateInsurancePoliciesMutation */
export type UpdateInsurancePoliciesMutationInput = {
  insurancePoliciesAttributes: Array<InsurancePolicyInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateInsurancePoliciesMutation */
export type UpdateInsurancePoliciesMutationPayload = {
  __typename?: 'UpdateInsurancePoliciesMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  insurancePolicies?: Maybe<Array<InsurancePolicy>>;
};

/** Autogenerated input type of UpdateLoanRepaymentDetailMutation */
export type UpdateLoanRepaymentDetailMutationInput = {
  repaymentProgramName?: Maybe<Scalars['String']>;
  nameOfInstitution?: Maybe<Scalars['String']>;
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  yearsWorkedForRepayment?: Maybe<Scalars['Int']>;
  startedAt?: Maybe<Scalars['ISO8601DateTime']>;
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateLoanRepaymentDetailMutation */
export type UpdateLoanRepaymentDetailMutationPayload = {
  __typename?: 'UpdateLoanRepaymentDetailMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  loanRepaymentDetail?: Maybe<LoanRepaymentDetail>;
};

/** Autogenerated input type of UpdateMalpracticeClaimsMutation */
export type UpdateMalpracticeClaimsMutationInput = {
  malpracticeClaimsAttributes: Array<MalpracticeClaimInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateMalpracticeClaimsMutation */
export type UpdateMalpracticeClaimsMutationPayload = {
  __typename?: 'UpdateMalpracticeClaimsMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  malpracticeClaims?: Maybe<Array<MalpracticeClaim>>;
};

/** Autogenerated input type of UpdateMedicalDegreeMutation */
export type UpdateMedicalDegreeMutationInput = {
  institutionName?: Maybe<Scalars['String']>;
  kind: MedicalDegreeKind;
  dateOfGraduation: Scalars['ISO8601DateTime'];
  startedAt: Scalars['ISO8601DateTime'];
  endedAt: Scalars['ISO8601DateTime'];
  registrarPhoneNumber?: Maybe<Scalars['String']>;
  registrarUrl?: Maybe<Scalars['String']>;
  foreignMedicalSchool: Scalars['Boolean'];
  ecfmgCertified: Scalars['Boolean'];
  ecfmgCertifiedAt?: Maybe<Scalars['ISO8601DateTime']>;
  institutionAddressLine1?: Maybe<Scalars['String']>;
  institutionAddressLine2?: Maybe<Scalars['String']>;
  institutionAddressLine3?: Maybe<Scalars['String']>;
  institutionAddressCity?: Maybe<Scalars['String']>;
  institutionAddressState?: Maybe<Scalars['String']>;
  institutionAddressZip?: Maybe<Scalars['String']>;
  institutionAddressCountry?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateMedicalDegreeMutation */
export type UpdateMedicalDegreeMutationPayload = {
  __typename?: 'UpdateMedicalDegreeMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  medicalDegree?: Maybe<MedicalDegree>;
};

/** Autogenerated input type of UpdateMedicalGroupEmployersMutation */
export type UpdateMedicalGroupEmployersMutationInput = {
  medicalGroupEmployersAttributes: Array<MedicalGroupEmployerInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateMedicalGroupEmployersMutation */
export type UpdateMedicalGroupEmployersMutationPayload = {
  __typename?: 'UpdateMedicalGroupEmployersMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  medicalGroupEmployers?: Maybe<Array<MedicalGroupEmployer>>;
};

/** Autogenerated input type of UpdateMilitaryServiceMutation */
export type UpdateMilitaryServiceMutationInput = {
  branchOfService?: Maybe<Scalars['String']>;
  startedAt: Scalars['ISO8601DateTime'];
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
  activeDuty: Scalars['Boolean'];
  hasDd214: Scalars['Boolean'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateMilitaryServiceMutation */
export type UpdateMilitaryServiceMutationPayload = {
  __typename?: 'UpdateMilitaryServiceMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  militaryService?: Maybe<MilitaryService>;
};

/** Autogenerated input type of UpdateNationalHealthServiceCorpsScholarshipMutation */
export type UpdateNationalHealthServiceCorpsScholarshipMutationInput = {
  startedAt: Scalars['ISO8601DateTime'];
  endedAt: Scalars['ISO8601DateTime'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateNationalHealthServiceCorpsScholarshipMutation */
export type UpdateNationalHealthServiceCorpsScholarshipMutationPayload = {
  __typename?: 'UpdateNationalHealthServiceCorpsScholarshipMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  scholarship?: Maybe<NationalHealthServiceCorpsScholarship>;
};

/** Autogenerated input type of UpdateOtherCertificationsMutation */
export type UpdateOtherCertificationsMutationInput = {
  certificationsAttributes: Array<OtherCertificationInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateOtherCertificationsMutation */
export type UpdateOtherCertificationsMutationPayload = {
  __typename?: 'UpdateOtherCertificationsMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  otherCertifications?: Maybe<Array<Certification>>;
};

/** Autogenerated input type of UpdatePPDTuberculosisTestingMutation */
export type UpdatePpdTuberculosisTestingMutationInput = {
  receivedBcgVaccine: Scalars['Boolean'];
  testedInTheLastYear: Scalars['Boolean'];
  hadPositiveTbSkinTest: Scalars['Boolean'];
  testedMoreThan5YearsAgo: Scalars['Boolean'];
  testedPositiveAt?: Maybe<Scalars['ISO8601DateTime']>;
  yearTestedPositive?: Maybe<Scalars['String']>;
  testReactionSize?: Maybe<Scalars['Int']>;
  hadTbDiseaseDiagnosis: Scalars['Boolean'];
  hasTakenInhOrRifampin: Scalars['Boolean'];
  treatmentCompletedMoreThan5YearsAgo?: Maybe<Scalars['Boolean']>;
  treatmentCompletedAt?: Maybe<Scalars['ISO8601DateTime']>;
  yearTreatmentCompleted?: Maybe<Scalars['String']>;
  lastChestXrayAt?: Maybe<Scalars['ISO8601DateTime']>;
  testingSiteName?: Maybe<Scalars['String']>;
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
  ppdInduration?: Maybe<Scalars['Int']>;
  ppdInterpretation?: Maybe<PpdInterpretationEnum>;
  testDate?: Maybe<Scalars['ISO8601DateTime']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdatePPDTuberculosisTestingMutation */
export type UpdatePpdTuberculosisTestingMutationPayload = {
  __typename?: 'UpdatePPDTuberculosisTestingMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  ppdTuberculosisTesting?: Maybe<PpdTuberculosisTesting>;
};

/** Autogenerated input type of UpdatePassportMutation */
export type UpdatePassportMutationInput = {
  countryOfIssue?: Maybe<Scalars['String']>;
  expiresAt: Scalars['ISO8601DateTime'];
  number?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdatePassportMutation */
export type UpdatePassportMutationPayload = {
  __typename?: 'UpdatePassportMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  passport?: Maybe<Passport>;
};

/** Autogenerated input type of UpdatePeerReferenceMutation */
export type UpdatePeerReferenceMutationInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  title: Scalars['String'];
  degree: Scalars['String'];
  specialty: Scalars['String'];
  relationship: Scalars['String'];
  phoneNumber: Scalars['String'];
  emailAddress: Scalars['String'];
  addressLine1: Scalars['String'];
  addressLine2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  state: Scalars['String'];
  country: Scalars['String'];
  zip: Scalars['String'];
  hasWorkedWithInThePastTwoYears: Scalars['Boolean'];
  yearsKnown: Scalars['Int'];
  position: Scalars['Int'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdatePeerReferenceMutation */
export type UpdatePeerReferenceMutationPayload = {
  __typename?: 'UpdatePeerReferenceMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  peerReference?: Maybe<PeerReference>;
};

/** Autogenerated input type of UpdatePersonalDetailsMutation */
export type UpdatePersonalDetailsMutationInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  maidenName?: Maybe<Scalars['String']>;
  suffix?: Maybe<Scalars['String']>;
  providerProfessionType?: Maybe<Scalars['String']>;
  legalGender: LegalGender;
  cellPhoneNumber?: Maybe<Scalars['String']>;
  emergencyContactNumber?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdatePersonalDetailsMutation */
export type UpdatePersonalDetailsMutationPayload = {
  __typename?: 'UpdatePersonalDetailsMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  personalDetails?: Maybe<Person>;
};

/** Autogenerated input type of UpdatePostGraduateTrainingMutation */
export type UpdatePostGraduateTrainingMutationInput = {
  acgmeAccredited: Scalars['Boolean'];
  attendanceEndDate?: Maybe<Scalars['ISO8601DateTime']>;
  attendanceStartDate: Scalars['ISO8601DateTime'];
  currentProgramDirectorFirstName?: Maybe<Scalars['String']>;
  currentProgramDirectorLastName?: Maybe<Scalars['String']>;
  directorContactEmail?: Maybe<Scalars['String']>;
  directorContactNumber?: Maybe<Scalars['String']>;
  directorDuringFirstName?: Maybe<Scalars['String']>;
  directorDuringLastName?: Maybe<Scalars['String']>;
  fellowshipKind?: Maybe<Scalars['String']>;
  gmeOfficeEmail?: Maybe<Scalars['String']>;
  gmeOfficePhone?: Maybe<Scalars['String']>;
  gmeOfficeUrl?: Maybe<Scalars['String']>;
  institutionName?: Maybe<Scalars['String']>;
  internshipKind?: Maybe<Scalars['String']>;
  kind: PostGraduateTrainingKind;
  programAdminEmail?: Maybe<Scalars['String']>;
  programAdminName?: Maybe<Scalars['String']>;
  programAdminPhone?: Maybe<Scalars['String']>;
  programDirectorAddressCity?: Maybe<Scalars['String']>;
  programDirectorAddressCountry?: Maybe<Scalars['String']>;
  programDirectorAddressLine1?: Maybe<Scalars['String']>;
  programDirectorAddressLine2?: Maybe<Scalars['String']>;
  programDirectorAddressLine3?: Maybe<Scalars['String']>;
  programDirectorAddressState?: Maybe<Scalars['String']>;
  programDirectorAddressZip?: Maybe<Scalars['String']>;
  residencyKind?: Maybe<Scalars['String']>;
  successfullyCompletedProgram: Scalars['Boolean'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdatePostGraduateTrainingMutation */
export type UpdatePostGraduateTrainingMutationPayload = {
  __typename?: 'UpdatePostGraduateTrainingMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  postGraduateTraining?: Maybe<PostGraduateTraining>;
};

/** Autogenerated input type of UpdatePriorNamesMutation */
export type UpdatePriorNamesMutationInput = {
  priorNamesAttributes: Array<PriorNameInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdatePriorNamesMutation */
export type UpdatePriorNamesMutationPayload = {
  __typename?: 'UpdatePriorNamesMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  priorNames?: Maybe<Array<PriorName>>;
};

/** Autogenerated input type of UpdateProfessionalLiabilityInsuranceCarrierMutation */
export type UpdateProfessionalLiabilityInsuranceCarrierMutationInput = {
  malpracticeType?: Maybe<Scalars['String']>;
  organizationName?: Maybe<Scalars['String']>;
  organizationAddressLine1?: Maybe<Scalars['String']>;
  organizationAddressLine2?: Maybe<Scalars['String']>;
  organizationCity?: Maybe<Scalars['String']>;
  organizationState?: Maybe<Scalars['String']>;
  organizationZip?: Maybe<Scalars['String']>;
  organizationPhoneNumber?: Maybe<Scalars['String']>;
  organizationEmailAddress?: Maybe<Scalars['String']>;
  organizationFaxNumber?: Maybe<Scalars['String']>;
  contactPersonFirstName?: Maybe<Scalars['String']>;
  contactPersonLastName?: Maybe<Scalars['String']>;
  contactPersonRole?: Maybe<Scalars['String']>;
  contactPersonPhoneNumber?: Maybe<Scalars['String']>;
  contactPersonEmailAddress?: Maybe<Scalars['String']>;
  contactPersonFaxNumber?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateProfessionalLiabilityInsuranceCarrierMutation */
export type UpdateProfessionalLiabilityInsuranceCarrierMutationPayload = {
  __typename?: 'UpdateProfessionalLiabilityInsuranceCarrierMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  professionalLiabilityInsuranceCarrier?: Maybe<ProfessionalLiabilityInsuranceCarrier>;
};

/** Autogenerated input type of UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation */
export type UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationInput = {
  judgmentsEntered: Scalars['Boolean'];
  liabilityClaimSettlementsPaid: Scalars['Boolean'];
  pendingLiabilityActions: Scalars['Boolean'];
  anyLegalActionDueToClinicalActions: Scalars['Boolean'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation */
export type UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationPayload = {
  __typename?: 'UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  professionalLiabilityJudgmentsQuestionnaire?: Maybe<ProfessionalLiabilityJudgmentsQuestionnaire>;
};

/** Autogenerated input type of UpdateProfessionalLicensesMutation */
export type UpdateProfessionalLicensesMutationInput = {
  kind: ProfessionalLicenseKind;
  professionalLicensesAttributes: Array<ProfessionalLicenseInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateProfessionalLicensesMutation */
export type UpdateProfessionalLicensesMutationPayload = {
  __typename?: 'UpdateProfessionalLicensesMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  professionalLicenses?: Maybe<Array<ProfessionalLicense>>;
};

/** Autogenerated input type of UpdateSpokenLanguagesMutation */
export type UpdateSpokenLanguagesMutationInput = {
  spokenLanguagesAttributes: Array<SpokenLanguageInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateSpokenLanguagesMutation */
export type UpdateSpokenLanguagesMutationPayload = {
  __typename?: 'UpdateSpokenLanguagesMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  spokenLanguages?: Maybe<Array<SpokenLanguage>>;
};

/** Autogenerated input type of UpdateUSMLEScoresMutation */
export type UpdateUsmleScoresMutationInput = {
  usmleIdNumber?: Maybe<Scalars['String']>;
  step1ExamPassed: Scalars['Boolean'];
  step1ExamScore: Scalars['String'];
  step1ExamDate: Scalars['ISO8601DateTime'];
  step2ExamPassed: Scalars['Boolean'];
  step2ExamScore: Scalars['String'];
  step2ExamDate: Scalars['ISO8601DateTime'];
  step3ExamPassed: Scalars['Boolean'];
  step3ExamScore: Scalars['String'];
  step3ExamDate: Scalars['ISO8601DateTime'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateUSMLEScoresMutation */
export type UpdateUsmleScoresMutationPayload = {
  __typename?: 'UpdateUSMLEScoresMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  usmleScores?: Maybe<UsmleScore>;
};

/** Autogenerated input type of UpdateUnitedStatesPublicHealthServiceMutation */
export type UpdateUnitedStatesPublicHealthServiceMutationInput = {
  startedAt: Scalars['ISO8601DateTime'];
  endedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateUnitedStatesPublicHealthServiceMutation */
export type UpdateUnitedStatesPublicHealthServiceMutationPayload = {
  __typename?: 'UpdateUnitedStatesPublicHealthServiceMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  service?: Maybe<UnitedStatesPublicHealthService>;
};

/** Autogenerated input type of UpdateUserMutation */
export type UpdateUserMutationInput = {
  onboardingStatus?: Maybe<OnboardingStatusEnum>;
  expirationWarningTimeUnits?: Maybe<ExpirationWarningTimeUnitsEnum>;
  expirationWarningTime?: Maybe<Scalars['Int']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateUserMutation */
export type UpdateUserMutationPayload = {
  __typename?: 'UpdateUserMutationPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  authorizationToken: Scalars['String'];
  expirationWarningTime: Scalars['Int'];
  expirationWarningTimeUnits: ExpirationWarningTimeUnitsEnum;
  id: Scalars['ID'];
  lastVerification?: Maybe<JumioIdentityVerification>;
  onboardingStatus: OnboardingStatusEnum;
  person: Person;
  verificationAttempts: Scalars['Int'];
};

export enum VerificationStatusEnum {
  Pending = 'PENDING',
  ApprovedVerified = 'APPROVED_VERIFIED',
  DeniedFraud = 'DENIED_FRAUD',
  DeniedUnsupportedIdType = 'DENIED_UNSUPPORTED_ID_TYPE',
  DeniedUnsupportedIdCountry = 'DENIED_UNSUPPORTED_ID_COUNTRY',
  ErrorNotReadableId = 'ERROR_NOT_READABLE_ID',
  NoIdUploaded = 'NO_ID_UPLOADED'
}

export type SignInVariables = SignInMutationVariables;
export type SignInSignIn = (NonNullable<SignInMutation['signIn']>);
export type SignInUser = (NonNullable<(NonNullable<SignInMutation['signIn']>)['user']>);
export const SignInHOC = withSignIn;
export type SignUpVariables = SignUpMutationVariables;
export type SignUpSignUp = (NonNullable<SignUpMutation['signUp']>);
export type SignUpUser = (NonNullable<(NonNullable<SignUpMutation['signUp']>)['user']>);
export const SignUpHOC = withSignUp;
export type CreateDocumentVariables = CreateDocumentMutationVariables;
export type CreateDocumentCreateDocument = (NonNullable<CreateDocumentMutation['createDocument']>);
export const CreateDocumentHOC = withCreateDocument;
export type GetCategoryMenuDataVariables = GetCategoryMenuDataQueryVariables;
export type GetCategoryMenuDataPersonalDetails = (NonNullable<GetCategoryMenuDataQuery['personalDetails']>);
export type GetCategoryMenuDataExpirationsByProfileSection = NonNullable<(NonNullable<(NonNullable<GetCategoryMenuDataQuery['personalDetails']>)['expirationsByProfileSection']>)[number]>;
export type GetCategoryMenuDataFormCompletions = NonNullable<(NonNullable<(NonNullable<GetCategoryMenuDataQuery['personalDetails']>)['formCompletions']>)[number]>;
export const GetCategoryMenuDataHOC = withGetCategoryMenuData;
export type GetDocumentsVariables = GetDocumentsQueryVariables;
export type GetDocumentsPersonalDetails = (NonNullable<GetDocumentsQuery['personalDetails']>);
export type GetDocumentsDocuments = NonNullable<(NonNullable<(NonNullable<GetDocumentsQuery['personalDetails']>)['documents']>)[number]>;
export type GetDocumentsAttachment = (NonNullable<NonNullable<(NonNullable<(NonNullable<GetDocumentsQuery['personalDetails']>)['documents']>)[number]>['attachment']>);
export const GetDocumentsHOC = withGetDocuments;
export type GetDocumentVariables = GetDocumentQueryVariables;
export type GetDocumentPersonalDetails = (NonNullable<GetDocumentQuery['personalDetails']>);
export type GetDocumentAttachment = (NonNullable<(NonNullable<(NonNullable<GetDocumentQuery['personalDetails']>)['document']>)['attachment']>);
export const GetDocumentHOC = withGetDocument;
export type UpdateDocumentVariables = UpdateDocumentMutationVariables;
export type UpdateDocumentUpdateDocument = (NonNullable<UpdateDocumentMutation['updateDocument']>);
export type UpdateDocumentAttachment = (NonNullable<(NonNullable<(NonNullable<UpdateDocumentMutation['updateDocument']>)['document']>)['attachment']>);
export const UpdateDocumentHOC = withUpdateDocument;
export type DeleteDocumentVariables = DeleteDocumentMutationVariables;
export type DeleteDocumentDeleteDocument = (NonNullable<DeleteDocumentMutation['deleteDocument']>);
export const DeleteDocumentHOC = withDeleteDocument;
export type UpdateFormCompletionStatusVariables = UpdateFormCompletionStatusMutationVariables;
export type UpdateFormCompletionStatusUpdateFormCompletionStatus = (NonNullable<UpdateFormCompletionStatusMutation['updateFormCompletionStatus']>);
export type UpdateFormCompletionStatusFormCompletion = (NonNullable<(NonNullable<UpdateFormCompletionStatusMutation['updateFormCompletionStatus']>)['formCompletion']>);
export const UpdateFormCompletionStatusHOC = withUpdateFormCompletionStatus;
export type GetFormCompletionStatusVariables = GetFormCompletionStatusQueryVariables;
export type GetFormCompletionStatusPersonalDetails = (NonNullable<GetFormCompletionStatusQuery['personalDetails']>);
export type GetFormCompletionStatusFormCompletion = (NonNullable<(NonNullable<GetFormCompletionStatusQuery['personalDetails']>)['formCompletion']>);
export const GetFormCompletionStatusHOC = withGetFormCompletionStatus;
export type GetMenuDataByCategoryVariables = GetMenuDataByCategoryQueryVariables;
export type GetMenuDataByCategoryPersonalDetails = (NonNullable<GetMenuDataByCategoryQuery['personalDetails']>);
export type GetMenuDataByCategoryExpirationsByCategory = NonNullable<(NonNullable<(NonNullable<GetMenuDataByCategoryQuery['personalDetails']>)['expirationsByCategory']>)[number]>;
export type GetMenuDataByCategoryFormCompletionByCategory = NonNullable<(NonNullable<(NonNullable<GetMenuDataByCategoryQuery['personalDetails']>)['formCompletionByCategory']>)[number]>;
export const GetMenuDataByCategoryHOC = withGetMenuDataByCategory;
export type GetAcademicAppointmentsVariables = GetAcademicAppointmentsQueryVariables;
export type GetAcademicAppointmentsPersonalDetails = (NonNullable<GetAcademicAppointmentsQuery['personalDetails']>);
export type GetAcademicAppointmentsAcademicAppointments = NonNullable<(NonNullable<(NonNullable<GetAcademicAppointmentsQuery['personalDetails']>)['academicAppointments']>)[number]>;
export const GetAcademicAppointmentsHOC = withGetAcademicAppointments;
export type UpdateAcademicAppointmentsVariables = UpdateAcademicAppointmentsMutationVariables;
export type UpdateAcademicAppointmentsUpdateAcademicAppointments = (NonNullable<UpdateAcademicAppointmentsMutation['updateAcademicAppointments']>);
export type UpdateAcademicAppointmentsAcademicAppointments = NonNullable<(NonNullable<(NonNullable<UpdateAcademicAppointmentsMutation['updateAcademicAppointments']>)['academicAppointments']>)[number]>;
export const UpdateAcademicAppointmentsHOC = withUpdateAcademicAppointments;
export type GetAddressesVariables = GetAddressesQueryVariables;
export type GetAddressesPersonalDetails = (NonNullable<GetAddressesQuery['personalDetails']>);
export const GetAddressesHOC = withGetAddresses;
export type UpdateAddressesVariables = UpdateAddressesMutationVariables;
export type UpdateAddressesUpdateAddresses = (NonNullable<UpdateAddressesMutation['updateAddresses']>);
export type UpdateAddressesPersonalDetails = (NonNullable<(NonNullable<UpdateAddressesMutation['updateAddresses']>)['personalDetails']>);
export const UpdateAddressesHOC = withUpdateAddresses;
export type GetAdministrativeLeadershipPositionsVariables = GetAdministrativeLeadershipPositionsQueryVariables;
export type GetAdministrativeLeadershipPositionsPersonalDetails = (NonNullable<GetAdministrativeLeadershipPositionsQuery['personalDetails']>);
export type GetAdministrativeLeadershipPositionsAdministrativeLeadershipPositions = NonNullable<(NonNullable<(NonNullable<GetAdministrativeLeadershipPositionsQuery['personalDetails']>)['administrativeLeadershipPositions']>)[number]>;
export const GetAdministrativeLeadershipPositionsHOC = withGetAdministrativeLeadershipPositions;
export type UpdateAdministrativeLeadershipPositionsVariables = UpdateAdministrativeLeadershipPositionsMutationVariables;
export type UpdateAdministrativeLeadershipPositionsUpdateAdministrativeLeadershipPositions = (NonNullable<UpdateAdministrativeLeadershipPositionsMutation['updateAdministrativeLeadershipPositions']>);
export type UpdateAdministrativeLeadershipPositionsAdministrativeLeadershipPositions = NonNullable<(NonNullable<(NonNullable<UpdateAdministrativeLeadershipPositionsMutation['updateAdministrativeLeadershipPositions']>)['administrativeLeadershipPositions']>)[number]>;
export const UpdateAdministrativeLeadershipPositionsHOC = withUpdateAdministrativeLeadershipPositions;
export type GetBirthAndCitizenshipDetailsVariables = GetBirthAndCitizenshipDetailsQueryVariables;
export type GetBirthAndCitizenshipDetailsPersonalDetails = (NonNullable<GetBirthAndCitizenshipDetailsQuery['personalDetails']>);
export const GetBirthAndCitizenshipDetailsHOC = withGetBirthAndCitizenshipDetails;
export type UpdateBirthAndCitizenshipVariables = UpdateBirthAndCitizenshipMutationVariables;
export type UpdateBirthAndCitizenshipUpdateBirthAndCitizenship = (NonNullable<UpdateBirthAndCitizenshipMutation['updateBirthAndCitizenship']>);
export type UpdateBirthAndCitizenshipPersonalDetails = (NonNullable<(NonNullable<UpdateBirthAndCitizenshipMutation['updateBirthAndCitizenship']>)['personalDetails']>);
export const UpdateBirthAndCitizenshipHOC = withUpdateBirthAndCitizenship;
export type GetBoardCertificationDetailsVariables = GetBoardCertificationDetailsQueryVariables;
export type GetBoardCertificationDetailsPersonalDetails = (NonNullable<GetBoardCertificationDetailsQuery['personalDetails']>);
export type GetBoardCertificationDetailsBoardCertification = (NonNullable<(NonNullable<GetBoardCertificationDetailsQuery['personalDetails']>)['boardCertification']>);
export type GetBoardCertificationDetailsBoardCertificationQuestionnaire = (NonNullable<(NonNullable<(NonNullable<GetBoardCertificationDetailsQuery['personalDetails']>)['boardCertification']>)['boardCertificationQuestionnaire']>);
export const GetBoardCertificationDetailsHOC = withGetBoardCertificationDetails;
export type UpdateBoardCertificationVariables = UpdateBoardCertificationMutationVariables;
export type UpdateBoardCertificationUpdateBoardCertification = (NonNullable<UpdateBoardCertificationMutation['updateBoardCertification']>);
export type UpdateBoardCertificationBoardCertification = (NonNullable<(NonNullable<UpdateBoardCertificationMutation['updateBoardCertification']>)['boardCertification']>);
export const UpdateBoardCertificationHOC = withUpdateBoardCertification;
export type GetCmeCreditHoursDetailsVariables = GetCmeCreditHoursDetailsQueryVariables;
export type GetCmeCreditHoursDetailsPersonalDetails = (NonNullable<GetCmeCreditHoursDetailsQuery['personalDetails']>);
export type GetCmeCreditHoursDetailsCmeCreditHours = NonNullable<(NonNullable<(NonNullable<GetCmeCreditHoursDetailsQuery['personalDetails']>)['cmeCreditHours']>)[number]>;
export const GetCmeCreditHoursDetailsHOC = withGetCmeCreditHoursDetails;
export type UpdateCmeCreditHoursVariables = UpdateCmeCreditHoursMutationVariables;
export type UpdateCmeCreditHoursUpdateCmeCreditHours = (NonNullable<UpdateCmeCreditHoursMutation['updateCmeCreditHours']>);
export type UpdateCmeCreditHoursCmeCreditHours = NonNullable<(NonNullable<(NonNullable<UpdateCmeCreditHoursMutation['updateCmeCreditHours']>)['cmeCreditHours']>)[number]>;
export const UpdateCmeCreditHoursHOC = withUpdateCmeCreditHours;
export type GetComlexScoresDetailsVariables = GetComlexScoresDetailsQueryVariables;
export type GetComlexScoresDetailsPersonalDetails = (NonNullable<GetComlexScoresDetailsQuery['personalDetails']>);
export type GetComlexScoresDetailsComlexUsaScores = (NonNullable<(NonNullable<GetComlexScoresDetailsQuery['personalDetails']>)['comlexUsaScores']>);
export const GetComlexScoresDetailsHOC = withGetComlexScoresDetails;
export type UpdateComlexScoresVariables = UpdateComlexScoresMutationVariables;
export type UpdateComlexScoresUpdateComlexScores = (NonNullable<UpdateComlexScoresMutation['updateComlexScores']>);
export type UpdateComlexScoresComlexScores = (NonNullable<(NonNullable<UpdateComlexScoresMutation['updateComlexScores']>)['comlexScores']>);
export const UpdateComlexScoresHOC = withUpdateComlexScores;
export type GetCertificationDetailsVariables = GetCertificationDetailsQueryVariables;
export type GetCertificationDetailsPersonalDetails = (NonNullable<GetCertificationDetailsQuery['personalDetails']>);
export type GetCertificationDetailsCertification = (NonNullable<(NonNullable<GetCertificationDetailsQuery['personalDetails']>)['certification']>);
export const GetCertificationDetailsHOC = withGetCertificationDetails;
export type UpdateCertificationVariables = UpdateCertificationMutationVariables;
export type UpdateCertificationUpdateCertification = (NonNullable<UpdateCertificationMutation['updateCertification']>);
export type UpdateCertificationCertification = (NonNullable<(NonNullable<UpdateCertificationMutation['updateCertification']>)['certification']>);
export const UpdateCertificationHOC = withUpdateCertification;
export type GetCovidVaccinationDetailsVariables = GetCovidVaccinationDetailsQueryVariables;
export type GetCovidVaccinationDetailsPersonalDetails = (NonNullable<GetCovidVaccinationDetailsQuery['personalDetails']>);
export type GetCovidVaccinationDetailsCovidVaccination = (NonNullable<(NonNullable<GetCovidVaccinationDetailsQuery['personalDetails']>)['covidVaccination']>);
export const GetCovidVaccinationDetailsHOC = withGetCovidVaccinationDetails;
export type UpdateCovidVaccinationVariables = UpdateCovidVaccinationMutationVariables;
export type UpdateCovidVaccinationUpdateCovidVaccination = (NonNullable<UpdateCovidVaccinationMutation['updateCovidVaccination']>);
export type UpdateCovidVaccinationCovidVaccination = (NonNullable<(NonNullable<UpdateCovidVaccinationMutation['updateCovidVaccination']>)['covidVaccination']>);
export const UpdateCovidVaccinationHOC = withUpdateCovidVaccination;
export type GetOtherCertificationsVariables = GetOtherCertificationsQueryVariables;
export type GetOtherCertificationsPersonalDetails = (NonNullable<GetOtherCertificationsQuery['personalDetails']>);
export type GetOtherCertificationsOtherCertifications = NonNullable<(NonNullable<(NonNullable<GetOtherCertificationsQuery['personalDetails']>)['otherCertifications']>)[number]>;
export const GetOtherCertificationsHOC = withGetOtherCertifications;
export type UpdateOtherCertificationsVariables = UpdateOtherCertificationsMutationVariables;
export type UpdateOtherCertificationsUpdateOtherCertifications = (NonNullable<UpdateOtherCertificationsMutation['updateOtherCertifications']>);
export type UpdateOtherCertificationsOtherCertifications = NonNullable<(NonNullable<(NonNullable<UpdateOtherCertificationsMutation['updateOtherCertifications']>)['otherCertifications']>)[number]>;
export const UpdateOtherCertificationsHOC = withUpdateOtherCertifications;
export type GetDeaLicenseDetailsVariables = GetDeaLicenseDetailsQueryVariables;
export type GetDeaLicenseDetailsPersonalDetails = (NonNullable<GetDeaLicenseDetailsQuery['personalDetails']>);
export type GetDeaLicenseDetailsDeaLicense = (NonNullable<(NonNullable<GetDeaLicenseDetailsQuery['personalDetails']>)['deaLicense']>);
export const GetDeaLicenseDetailsHOC = withGetDeaLicenseDetails;
export type UpdateDeaLicenseVariables = UpdateDeaLicenseMutationVariables;
export type UpdateDeaLicenseUpdateDeaLicense = (NonNullable<UpdateDeaLicenseMutation['updateDeaLicense']>);
export type UpdateDeaLicenseDeaLicense = (NonNullable<(NonNullable<UpdateDeaLicenseMutation['updateDeaLicense']>)['deaLicense']>);
export const UpdateDeaLicenseHOC = withUpdateDeaLicense;
export type GetDegreeDetailsVariables = GetDegreeDetailsQueryVariables;
export type GetDegreeDetailsPersonalDetails = (NonNullable<GetDegreeDetailsQuery['personalDetails']>);
export type GetDegreeDetailsDegree = (NonNullable<(NonNullable<GetDegreeDetailsQuery['personalDetails']>)['degree']>);
export const GetDegreeDetailsHOC = withGetDegreeDetails;
export type UpdateDegreeVariables = UpdateDegreeMutationVariables;
export type UpdateDegreeUpdateDegree = (NonNullable<UpdateDegreeMutation['updateDegree']>);
export type UpdateDegreeDegree = (NonNullable<(NonNullable<UpdateDegreeMutation['updateDegree']>)['degree']>);
export const UpdateDegreeHOC = withUpdateDegree;
export type GetDemographicDetailVariables = GetDemographicDetailQueryVariables;
export type GetDemographicDetailPersonalDetails = (NonNullable<GetDemographicDetailQuery['personalDetails']>);
export type GetDemographicDetailDemographicDetail = (NonNullable<(NonNullable<GetDemographicDetailQuery['personalDetails']>)['demographicDetail']>);
export const GetDemographicDetailHOC = withGetDemographicDetail;
export type UpdateDemographicDetailVariables = UpdateDemographicDetailMutationVariables;
export type UpdateDemographicDetailUpdateDemographicDetail = (NonNullable<UpdateDemographicDetailMutation['updateDemographicDetail']>);
export type UpdateDemographicDetailDemographicDetail = (NonNullable<(NonNullable<UpdateDemographicDetailMutation['updateDemographicDetail']>)['demographicDetail']>);
export const UpdateDemographicDetailHOC = withUpdateDemographicDetail;
export type GetDriversLicenseDetailsVariables = GetDriversLicenseDetailsQueryVariables;
export type GetDriversLicenseDetailsPersonalDetails = (NonNullable<GetDriversLicenseDetailsQuery['personalDetails']>);
export type GetDriversLicenseDetailsDriversLicense = (NonNullable<(NonNullable<GetDriversLicenseDetailsQuery['personalDetails']>)['driversLicense']>);
export const GetDriversLicenseDetailsHOC = withGetDriversLicenseDetails;
export type UpdateDriversLicenseVariables = UpdateDriversLicenseMutationVariables;
export type UpdateDriversLicenseUpdateDriversLicense = (NonNullable<UpdateDriversLicenseMutation['updateDriversLicense']>);
export type UpdateDriversLicenseDriversLicense = (NonNullable<(NonNullable<UpdateDriversLicenseMutation['updateDriversLicense']>)['driversLicense']>);
export const UpdateDriversLicenseHOC = withUpdateDriversLicense;
export type GetEmploymentGapDetailsVariables = GetEmploymentGapDetailsQueryVariables;
export type GetEmploymentGapDetailsPersonalDetails = (NonNullable<GetEmploymentGapDetailsQuery['personalDetails']>);
export type GetEmploymentGapDetailsEmploymentGap = (NonNullable<(NonNullable<GetEmploymentGapDetailsQuery['personalDetails']>)['employmentGap']>);
export const GetEmploymentGapDetailsHOC = withGetEmploymentGapDetails;
export type UpdateEmploymentGapDetailsVariables = UpdateEmploymentGapDetailsMutationVariables;
export type UpdateEmploymentGapDetailsUpdateEmploymentGap = (NonNullable<UpdateEmploymentGapDetailsMutation['updateEmploymentGap']>);
export type UpdateEmploymentGapDetailsEmploymentGap = (NonNullable<(NonNullable<UpdateEmploymentGapDetailsMutation['updateEmploymentGap']>)['employmentGap']>);
export const UpdateEmploymentGapDetailsHOC = withUpdateEmploymentGapDetails;
export type GetHealthProfessionsScholarshipsVariables = GetHealthProfessionsScholarshipsQueryVariables;
export type GetHealthProfessionsScholarshipsPersonalDetails = (NonNullable<GetHealthProfessionsScholarshipsQuery['personalDetails']>);
export type GetHealthProfessionsScholarshipsHealthProfessionsScholarship = (NonNullable<(NonNullable<GetHealthProfessionsScholarshipsQuery['personalDetails']>)['healthProfessionsScholarship']>);
export const GetHealthProfessionsScholarshipsHOC = withGetHealthProfessionsScholarships;
export type UpdateHealthProfessionsScholarshipVariables = UpdateHealthProfessionsScholarshipMutationVariables;
export type UpdateHealthProfessionsScholarshipUpdateHealthProfessionsScholarship = (NonNullable<UpdateHealthProfessionsScholarshipMutation['updateHealthProfessionsScholarship']>);
export type UpdateHealthProfessionsScholarshipHealthProfessionsScholarship = (NonNullable<(NonNullable<UpdateHealthProfessionsScholarshipMutation['updateHealthProfessionsScholarship']>)['healthProfessionsScholarship']>);
export const UpdateHealthProfessionsScholarshipHOC = withUpdateHealthProfessionsScholarship;
export type DeleteHealthProfessionsScholarshipVariables = DeleteHealthProfessionsScholarshipMutationVariables;
export type DeleteHealthProfessionsScholarshipDeleteHealthProfessionsScholarship = (NonNullable<DeleteHealthProfessionsScholarshipMutation['deleteHealthProfessionsScholarship']>);
export const DeleteHealthProfessionsScholarshipHOC = withDeleteHealthProfessionsScholarship;
export type GetHealthcareFacilityAffiliationsVariables = GetHealthcareFacilityAffiliationsQueryVariables;
export type GetHealthcareFacilityAffiliationsPersonalDetails = (NonNullable<GetHealthcareFacilityAffiliationsQuery['personalDetails']>);
export type GetHealthcareFacilityAffiliationsHealthcareFacilityAffiliations = NonNullable<(NonNullable<(NonNullable<GetHealthcareFacilityAffiliationsQuery['personalDetails']>)['healthcareFacilityAffiliations']>)[number]>;
export const GetHealthcareFacilityAffiliationsHOC = withGetHealthcareFacilityAffiliations;
export type UpdateHealthcareFacilityAffiliationsVariables = UpdateHealthcareFacilityAffiliationsMutationVariables;
export type UpdateHealthcareFacilityAffiliationsUpdateHealthcareFacilityAffiliations = (NonNullable<UpdateHealthcareFacilityAffiliationsMutation['updateHealthcareFacilityAffiliations']>);
export type UpdateHealthcareFacilityAffiliationsHealthcareFacilityAffiliations = NonNullable<(NonNullable<(NonNullable<UpdateHealthcareFacilityAffiliationsMutation['updateHealthcareFacilityAffiliations']>)['healthcareFacilityAffiliations']>)[number]>;
export const UpdateHealthcareFacilityAffiliationsHOC = withUpdateHealthcareFacilityAffiliations;
export type GetHospitalAffiliationsVariables = GetHospitalAffiliationsQueryVariables;
export type GetHospitalAffiliationsPersonalDetails = (NonNullable<GetHospitalAffiliationsQuery['personalDetails']>);
export type GetHospitalAffiliationsHospitalAffiliations = NonNullable<(NonNullable<(NonNullable<GetHospitalAffiliationsQuery['personalDetails']>)['hospitalAffiliations']>)[number]>;
export const GetHospitalAffiliationsHOC = withGetHospitalAffiliations;
export type UpdateHospitalAffiliationsVariables = UpdateHospitalAffiliationsMutationVariables;
export type UpdateHospitalAffiliationsUpdateHospitalAffiliations = (NonNullable<UpdateHospitalAffiliationsMutation['updateHospitalAffiliations']>);
export type UpdateHospitalAffiliationsHospitalAffiliations = NonNullable<(NonNullable<(NonNullable<UpdateHospitalAffiliationsMutation['updateHospitalAffiliations']>)['hospitalAffiliations']>)[number]>;
export const UpdateHospitalAffiliationsHOC = withUpdateHospitalAffiliations;
export type GetIdNumbersVariables = GetIdNumbersQueryVariables;
export type GetIdNumbersPersonalDetails = (NonNullable<GetIdNumbersQuery['personalDetails']>);
export const GetIdNumbersHOC = withGetIdNumbers;
export type UpdateIdNumbersVariables = UpdateIdNumbersMutationVariables;
export type UpdateIdNumbersUpdateIdNumbers = (NonNullable<UpdateIdNumbersMutation['updateIdNumbers']>);
export type UpdateIdNumbersPersonalDetails = (NonNullable<(NonNullable<UpdateIdNumbersMutation['updateIdNumbers']>)['personalDetails']>);
export const UpdateIdNumbersHOC = withUpdateIdNumbers;
export type GetInfluenzaVaccinationVariables = GetInfluenzaVaccinationQueryVariables;
export type GetInfluenzaVaccinationPersonalDetails = (NonNullable<GetInfluenzaVaccinationQuery['personalDetails']>);
export type GetInfluenzaVaccinationInfluenzaVaccination = (NonNullable<(NonNullable<GetInfluenzaVaccinationQuery['personalDetails']>)['influenzaVaccination']>);
export const GetInfluenzaVaccinationHOC = withGetInfluenzaVaccination;
export type UpdateInfluenzaVaccinationVariables = UpdateInfluenzaVaccinationMutationVariables;
export type UpdateInfluenzaVaccinationUpdateInfluenzaVaccination = (NonNullable<UpdateInfluenzaVaccinationMutation['updateInfluenzaVaccination']>);
export type UpdateInfluenzaVaccinationInfluenzaVaccination = (NonNullable<(NonNullable<UpdateInfluenzaVaccinationMutation['updateInfluenzaVaccination']>)['influenzaVaccination']>);
export const UpdateInfluenzaVaccinationHOC = withUpdateInfluenzaVaccination;
export type GetInsurancePoliciesVariables = GetInsurancePoliciesQueryVariables;
export type GetInsurancePoliciesPersonalDetails = (NonNullable<GetInsurancePoliciesQuery['personalDetails']>);
export type GetInsurancePoliciesInsurancePolicies = NonNullable<(NonNullable<(NonNullable<GetInsurancePoliciesQuery['personalDetails']>)['insurancePolicies']>)[number]>;
export const GetInsurancePoliciesHOC = withGetInsurancePolicies;
export type UpdateInsurancePoliciesVariables = UpdateInsurancePoliciesMutationVariables;
export type UpdateInsurancePoliciesUpdateInsurancePolicies = (NonNullable<UpdateInsurancePoliciesMutation['updateInsurancePolicies']>);
export type UpdateInsurancePoliciesInsurancePolicies = NonNullable<(NonNullable<(NonNullable<UpdateInsurancePoliciesMutation['updateInsurancePolicies']>)['insurancePolicies']>)[number]>;
export const UpdateInsurancePoliciesHOC = withUpdateInsurancePolicies;
export type GetLoanRepaymentDetailDetailsVariables = GetLoanRepaymentDetailDetailsQueryVariables;
export type GetLoanRepaymentDetailDetailsPersonalDetails = (NonNullable<GetLoanRepaymentDetailDetailsQuery['personalDetails']>);
export type GetLoanRepaymentDetailDetailsLoanRepaymentDetail = (NonNullable<(NonNullable<GetLoanRepaymentDetailDetailsQuery['personalDetails']>)['loanRepaymentDetail']>);
export const GetLoanRepaymentDetailDetailsHOC = withGetLoanRepaymentDetailDetails;
export type UpdateLoanRepaymentDetailVariables = UpdateLoanRepaymentDetailMutationVariables;
export type UpdateLoanRepaymentDetailUpdateLoanRepaymentDetail = (NonNullable<UpdateLoanRepaymentDetailMutation['updateLoanRepaymentDetail']>);
export type UpdateLoanRepaymentDetailLoanRepaymentDetail = (NonNullable<(NonNullable<UpdateLoanRepaymentDetailMutation['updateLoanRepaymentDetail']>)['loanRepaymentDetail']>);
export const UpdateLoanRepaymentDetailHOC = withUpdateLoanRepaymentDetail;
export type DeleteLoanRepaymentDetailVariables = DeleteLoanRepaymentDetailMutationVariables;
export type DeleteLoanRepaymentDetailDeleteLoanRepaymentDetail = (NonNullable<DeleteLoanRepaymentDetailMutation['deleteLoanRepaymentDetail']>);
export const DeleteLoanRepaymentDetailHOC = withDeleteLoanRepaymentDetail;
export type GetMalpracticeClaimsVariables = GetMalpracticeClaimsQueryVariables;
export type GetMalpracticeClaimsPersonalDetails = (NonNullable<GetMalpracticeClaimsQuery['personalDetails']>);
export type GetMalpracticeClaimsMalpracticeClaims = NonNullable<(NonNullable<(NonNullable<GetMalpracticeClaimsQuery['personalDetails']>)['malpracticeClaims']>)[number]>;
export const GetMalpracticeClaimsHOC = withGetMalpracticeClaims;
export type UpdateMalpracticeClaimsVariables = UpdateMalpracticeClaimsMutationVariables;
export type UpdateMalpracticeClaimsUpdateMalpracticeClaims = (NonNullable<UpdateMalpracticeClaimsMutation['updateMalpracticeClaims']>);
export type UpdateMalpracticeClaimsMalpracticeClaims = NonNullable<(NonNullable<(NonNullable<UpdateMalpracticeClaimsMutation['updateMalpracticeClaims']>)['malpracticeClaims']>)[number]>;
export const UpdateMalpracticeClaimsHOC = withUpdateMalpracticeClaims;
export type GetMedicalDegreeDetailsVariables = GetMedicalDegreeDetailsQueryVariables;
export type GetMedicalDegreeDetailsPersonalDetails = (NonNullable<GetMedicalDegreeDetailsQuery['personalDetails']>);
export type GetMedicalDegreeDetailsMedicalDegree = (NonNullable<(NonNullable<GetMedicalDegreeDetailsQuery['personalDetails']>)['medicalDegree']>);
export const GetMedicalDegreeDetailsHOC = withGetMedicalDegreeDetails;
export type UpdateMedicalDegreeVariables = UpdateMedicalDegreeMutationVariables;
export type UpdateMedicalDegreeUpdateMedicalDegree = (NonNullable<UpdateMedicalDegreeMutation['updateMedicalDegree']>);
export type UpdateMedicalDegreeMedicalDegree = (NonNullable<(NonNullable<UpdateMedicalDegreeMutation['updateMedicalDegree']>)['medicalDegree']>);
export const UpdateMedicalDegreeHOC = withUpdateMedicalDegree;
export type GetMedicalGroupEmployersVariables = GetMedicalGroupEmployersQueryVariables;
export type GetMedicalGroupEmployersPersonalDetails = (NonNullable<GetMedicalGroupEmployersQuery['personalDetails']>);
export type GetMedicalGroupEmployersMedicalGroupEmployers = NonNullable<(NonNullable<(NonNullable<GetMedicalGroupEmployersQuery['personalDetails']>)['medicalGroupEmployers']>)[number]>;
export const GetMedicalGroupEmployersHOC = withGetMedicalGroupEmployers;
export type UpdateMedicalGroupEmployersVariables = UpdateMedicalGroupEmployersMutationVariables;
export type UpdateMedicalGroupEmployersUpdateMedicalGroupEmployers = (NonNullable<UpdateMedicalGroupEmployersMutation['updateMedicalGroupEmployers']>);
export type UpdateMedicalGroupEmployersMedicalGroupEmployers = NonNullable<(NonNullable<(NonNullable<UpdateMedicalGroupEmployersMutation['updateMedicalGroupEmployers']>)['medicalGroupEmployers']>)[number]>;
export const UpdateMedicalGroupEmployersHOC = withUpdateMedicalGroupEmployers;
export type GetMilitaryServiceDetailsVariables = GetMilitaryServiceDetailsQueryVariables;
export type GetMilitaryServiceDetailsPersonalDetails = (NonNullable<GetMilitaryServiceDetailsQuery['personalDetails']>);
export type GetMilitaryServiceDetailsMilitaryService = (NonNullable<(NonNullable<GetMilitaryServiceDetailsQuery['personalDetails']>)['militaryService']>);
export const GetMilitaryServiceDetailsHOC = withGetMilitaryServiceDetails;
export type UpdateMilitaryServiceVariables = UpdateMilitaryServiceMutationVariables;
export type UpdateMilitaryServiceUpdateMilitaryService = (NonNullable<UpdateMilitaryServiceMutation['updateMilitaryService']>);
export type UpdateMilitaryServiceMilitaryService = (NonNullable<(NonNullable<UpdateMilitaryServiceMutation['updateMilitaryService']>)['militaryService']>);
export const UpdateMilitaryServiceHOC = withUpdateMilitaryService;
export type DeleteMilitaryServiceVariables = DeleteMilitaryServiceMutationVariables;
export type DeleteMilitaryServiceDeleteMilitaryService = (NonNullable<DeleteMilitaryServiceMutation['deleteMilitaryService']>);
export const DeleteMilitaryServiceHOC = withDeleteMilitaryService;
export type GetNationalHealthServiceCorpsScholarshipsVariables = GetNationalHealthServiceCorpsScholarshipsQueryVariables;
export type GetNationalHealthServiceCorpsScholarshipsPersonalDetails = (NonNullable<GetNationalHealthServiceCorpsScholarshipsQuery['personalDetails']>);
export type GetNationalHealthServiceCorpsScholarshipsNationalHealthServiceCorpsScholarship = (NonNullable<(NonNullable<GetNationalHealthServiceCorpsScholarshipsQuery['personalDetails']>)['nationalHealthServiceCorpsScholarship']>);
export const GetNationalHealthServiceCorpsScholarshipsHOC = withGetNationalHealthServiceCorpsScholarships;
export type UpdateNationalHealthServiceCorpsScholarshipVariables = UpdateNationalHealthServiceCorpsScholarshipMutationVariables;
export type UpdateNationalHealthServiceCorpsScholarshipUpdateNationalHealthServiceCorpsScholarship = (NonNullable<UpdateNationalHealthServiceCorpsScholarshipMutation['updateNationalHealthServiceCorpsScholarship']>);
export type UpdateNationalHealthServiceCorpsScholarshipScholarship = (NonNullable<(NonNullable<UpdateNationalHealthServiceCorpsScholarshipMutation['updateNationalHealthServiceCorpsScholarship']>)['scholarship']>);
export const UpdateNationalHealthServiceCorpsScholarshipHOC = withUpdateNationalHealthServiceCorpsScholarship;
export type DeleteNationalHealthServiceCorpScholarshipVariables = DeleteNationalHealthServiceCorpScholarshipMutationVariables;
export type DeleteNationalHealthServiceCorpScholarshipDeleteNationHealthServiceCorpsScholarship = (NonNullable<DeleteNationalHealthServiceCorpScholarshipMutation['deleteNationHealthServiceCorpsScholarship']>);
export const DeleteNationalHealthServiceCorpScholarshipHOC = withDeleteNationalHealthServiceCorpScholarship;
export type GetPpdTuberculosisTestingVariables = GetPpdTuberculosisTestingQueryVariables;
export type GetPpdTuberculosisTestingPersonalDetails = (NonNullable<GetPpdTuberculosisTestingQuery['personalDetails']>);
export type GetPpdTuberculosisTestingPpdTuberculosisTesting = (NonNullable<(NonNullable<GetPpdTuberculosisTestingQuery['personalDetails']>)['ppdTuberculosisTesting']>);
export const GetPpdTuberculosisTestingHOC = withGetPpdTuberculosisTesting;
export type UpdatePpdTuberculosisTestingVariables = UpdatePpdTuberculosisTestingMutationVariables;
export type UpdatePpdTuberculosisTestingUpdatePpdTuberculosisTesting = (NonNullable<UpdatePpdTuberculosisTestingMutation['updatePpdTuberculosisTesting']>);
export type UpdatePpdTuberculosisTestingPpdTuberculosisTesting = (NonNullable<(NonNullable<UpdatePpdTuberculosisTestingMutation['updatePpdTuberculosisTesting']>)['ppdTuberculosisTesting']>);
export const UpdatePpdTuberculosisTestingHOC = withUpdatePpdTuberculosisTesting;
export type GetPassportDetailsVariables = GetPassportDetailsQueryVariables;
export type GetPassportDetailsPersonalDetails = (NonNullable<GetPassportDetailsQuery['personalDetails']>);
export type GetPassportDetailsPassport = (NonNullable<(NonNullable<GetPassportDetailsQuery['personalDetails']>)['passport']>);
export const GetPassportDetailsHOC = withGetPassportDetails;
export type UpdatePassportVariables = UpdatePassportMutationVariables;
export type UpdatePassportUpdatePassport = (NonNullable<UpdatePassportMutation['updatePassport']>);
export type UpdatePassportPassport = (NonNullable<(NonNullable<UpdatePassportMutation['updatePassport']>)['passport']>);
export const UpdatePassportHOC = withUpdatePassport;
export type GetPeerReferenceDetailsVariables = GetPeerReferenceDetailsQueryVariables;
export type GetPeerReferenceDetailsPersonalDetails = (NonNullable<GetPeerReferenceDetailsQuery['personalDetails']>);
export type GetPeerReferenceDetailsPeerReference = (NonNullable<(NonNullable<GetPeerReferenceDetailsQuery['personalDetails']>)['peerReference']>);
export const GetPeerReferenceDetailsHOC = withGetPeerReferenceDetails;
export type UpdatePeerReferenceVariables = UpdatePeerReferenceMutationVariables;
export type UpdatePeerReferenceUpdatePeerReference = (NonNullable<UpdatePeerReferenceMutation['updatePeerReference']>);
export type UpdatePeerReferencePeerReference = (NonNullable<(NonNullable<UpdatePeerReferenceMutation['updatePeerReference']>)['peerReference']>);
export const UpdatePeerReferenceHOC = withUpdatePeerReference;
export type GetPersonalDetailsVariables = GetPersonalDetailsQueryVariables;
export type GetPersonalDetailsPersonalDetails = (NonNullable<GetPersonalDetailsQuery['personalDetails']>);
export const GetPersonalDetailsHOC = withGetPersonalDetails;
export type UpdatePersonalDetailsVariables = UpdatePersonalDetailsMutationVariables;
export type UpdatePersonalDetailsUpdatePersonalDetails = (NonNullable<UpdatePersonalDetailsMutation['updatePersonalDetails']>);
export type UpdatePersonalDetailsPersonalDetails = (NonNullable<(NonNullable<UpdatePersonalDetailsMutation['updatePersonalDetails']>)['personalDetails']>);
export const UpdatePersonalDetailsHOC = withUpdatePersonalDetails;
export type GetPostGraduateTrainingVariables = GetPostGraduateTrainingQueryVariables;
export type GetPostGraduateTrainingPersonalDetails = (NonNullable<GetPostGraduateTrainingQuery['personalDetails']>);
export type GetPostGraduateTrainingPostGraduateTraining = (NonNullable<(NonNullable<GetPostGraduateTrainingQuery['personalDetails']>)['postGraduateTraining']>);
export const GetPostGraduateTrainingHOC = withGetPostGraduateTraining;
export type UpdatePostGraduateTrainingVariables = UpdatePostGraduateTrainingMutationVariables;
export type UpdatePostGraduateTrainingUpdatePostGraduateTraining = (NonNullable<UpdatePostGraduateTrainingMutation['updatePostGraduateTraining']>);
export type UpdatePostGraduateTrainingPostGraduateTraining = (NonNullable<(NonNullable<UpdatePostGraduateTrainingMutation['updatePostGraduateTraining']>)['postGraduateTraining']>);
export const UpdatePostGraduateTrainingHOC = withUpdatePostGraduateTraining;
export type GetPriorNamesVariables = GetPriorNamesQueryVariables;
export type GetPriorNamesPersonalDetails = (NonNullable<GetPriorNamesQuery['personalDetails']>);
export type GetPriorNamesPriorNames = NonNullable<(NonNullable<(NonNullable<GetPriorNamesQuery['personalDetails']>)['priorNames']>)[number]>;
export const GetPriorNamesHOC = withGetPriorNames;
export type UpdatePriorNamesVariables = UpdatePriorNamesMutationVariables;
export type UpdatePriorNamesUpdatePriorNames = (NonNullable<UpdatePriorNamesMutation['updatePriorNames']>);
export type UpdatePriorNamesPriorNames = NonNullable<(NonNullable<(NonNullable<UpdatePriorNamesMutation['updatePriorNames']>)['priorNames']>)[number]>;
export const UpdatePriorNamesHOC = withUpdatePriorNames;
export type GetProfessionalLiabilityInsuranceCarrierDetailsVariables = GetProfessionalLiabilityInsuranceCarrierDetailsQueryVariables;
export type GetProfessionalLiabilityInsuranceCarrierDetailsPersonalDetails = (NonNullable<GetProfessionalLiabilityInsuranceCarrierDetailsQuery['personalDetails']>);
export type GetProfessionalLiabilityInsuranceCarrierDetailsProfessionalLiabilityInsuranceCarrier = (NonNullable<(NonNullable<GetProfessionalLiabilityInsuranceCarrierDetailsQuery['personalDetails']>)['professionalLiabilityInsuranceCarrier']>);
export const GetProfessionalLiabilityInsuranceCarrierDetailsHOC = withGetProfessionalLiabilityInsuranceCarrierDetails;
export type UpdateProfessionalLiabilityInsuranceCarrierVariables = UpdateProfessionalLiabilityInsuranceCarrierMutationVariables;
export type UpdateProfessionalLiabilityInsuranceCarrierUpdateProfessionalLiabilityInsuranceCarrier = (NonNullable<UpdateProfessionalLiabilityInsuranceCarrierMutation['updateProfessionalLiabilityInsuranceCarrier']>);
export type UpdateProfessionalLiabilityInsuranceCarrierProfessionalLiabilityInsuranceCarrier = (NonNullable<(NonNullable<UpdateProfessionalLiabilityInsuranceCarrierMutation['updateProfessionalLiabilityInsuranceCarrier']>)['professionalLiabilityInsuranceCarrier']>);
export const UpdateProfessionalLiabilityInsuranceCarrierHOC = withUpdateProfessionalLiabilityInsuranceCarrier;
export type GetProfessionalLiabilityJudgmentsQuestionnaireDetailsVariables = GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQueryVariables;
export type GetProfessionalLiabilityJudgmentsQuestionnaireDetailsPersonalDetails = (NonNullable<GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery['personalDetails']>);
export type GetProfessionalLiabilityJudgmentsQuestionnaireDetailsProfessionalLiabilityJudgmentsQuestionnaire = (NonNullable<(NonNullable<GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery['personalDetails']>)['professionalLiabilityJudgmentsQuestionnaire']>);
export const GetProfessionalLiabilityJudgmentsQuestionnaireDetailsHOC = withGetProfessionalLiabilityJudgmentsQuestionnaireDetails;
export type UpdateProfessionalLiabilityJudgmentsQuestionnaireVariables = UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationVariables;
export type UpdateProfessionalLiabilityJudgmentsQuestionnaireUpdateProfessionalLiabilityJudgmentsQuestionnaire = (NonNullable<UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation['updateProfessionalLiabilityJudgmentsQuestionnaire']>);
export type UpdateProfessionalLiabilityJudgmentsQuestionnaireProfessionalLiabilityJudgmentsQuestionnaire = (NonNullable<(NonNullable<UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation['updateProfessionalLiabilityJudgmentsQuestionnaire']>)['professionalLiabilityJudgmentsQuestionnaire']>);
export const UpdateProfessionalLiabilityJudgmentsQuestionnaireHOC = withUpdateProfessionalLiabilityJudgmentsQuestionnaire;
export type GetProfessionalLicensesVariables = GetProfessionalLicensesQueryVariables;
export type GetProfessionalLicensesPersonalDetails = (NonNullable<GetProfessionalLicensesQuery['personalDetails']>);
export type GetProfessionalLicensesProfessionalLicenses = NonNullable<(NonNullable<(NonNullable<GetProfessionalLicensesQuery['personalDetails']>)['professionalLicenses']>)[number]>;
export const GetProfessionalLicensesHOC = withGetProfessionalLicenses;
export type UpdateProfessionalLicensesVariables = UpdateProfessionalLicensesMutationVariables;
export type UpdateProfessionalLicensesUpdateProfessionalLicenses = (NonNullable<UpdateProfessionalLicensesMutation['updateProfessionalLicenses']>);
export type UpdateProfessionalLicensesProfessionalLicenses = NonNullable<(NonNullable<(NonNullable<UpdateProfessionalLicensesMutation['updateProfessionalLicenses']>)['professionalLicenses']>)[number]>;
export const UpdateProfessionalLicensesHOC = withUpdateProfessionalLicenses;
export type GetSpokenLanguagesVariables = GetSpokenLanguagesQueryVariables;
export type GetSpokenLanguagesPersonalDetails = (NonNullable<GetSpokenLanguagesQuery['personalDetails']>);
export type GetSpokenLanguagesSpokenLanguages = NonNullable<(NonNullable<(NonNullable<GetSpokenLanguagesQuery['personalDetails']>)['spokenLanguages']>)[number]>;
export const GetSpokenLanguagesHOC = withGetSpokenLanguages;
export type UpdateSpokenLanguagesVariables = UpdateSpokenLanguagesMutationVariables;
export type UpdateSpokenLanguagesUpdateSpokenLanguages = (NonNullable<UpdateSpokenLanguagesMutation['updateSpokenLanguages']>);
export type UpdateSpokenLanguagesSpokenLanguages = NonNullable<(NonNullable<(NonNullable<UpdateSpokenLanguagesMutation['updateSpokenLanguages']>)['spokenLanguages']>)[number]>;
export const UpdateSpokenLanguagesHOC = withUpdateSpokenLanguages;
export type GetUsmleScoresDetailsVariables = GetUsmleScoresDetailsQueryVariables;
export type GetUsmleScoresDetailsPersonalDetails = (NonNullable<GetUsmleScoresDetailsQuery['personalDetails']>);
export type GetUsmleScoresDetailsUsmleScores = (NonNullable<(NonNullable<GetUsmleScoresDetailsQuery['personalDetails']>)['usmleScores']>);
export const GetUsmleScoresDetailsHOC = withGetUsmleScoresDetails;
export type UpdateUsmleScoresVariables = UpdateUsmleScoresMutationVariables;
export type UpdateUsmleScoresUpdateUsmleScores = (NonNullable<UpdateUsmleScoresMutation['updateUsmleScores']>);
export type UpdateUsmleScoresUsmleScores = (NonNullable<(NonNullable<UpdateUsmleScoresMutation['updateUsmleScores']>)['usmleScores']>);
export const UpdateUsmleScoresHOC = withUpdateUsmleScores;
export type GetUsPublicHealthServiceDetailsVariables = GetUsPublicHealthServiceDetailsQueryVariables;
export type GetUsPublicHealthServiceDetailsPersonalDetails = (NonNullable<GetUsPublicHealthServiceDetailsQuery['personalDetails']>);
export type GetUsPublicHealthServiceDetailsUnitedStatesPublicHealthService = (NonNullable<(NonNullable<GetUsPublicHealthServiceDetailsQuery['personalDetails']>)['unitedStatesPublicHealthService']>);
export const GetUsPublicHealthServiceDetailsHOC = withGetUsPublicHealthServiceDetails;
export type UpdateUsPublicHealthServiceDetailsVariables = UpdateUsPublicHealthServiceDetailsMutationVariables;
export type UpdateUsPublicHealthServiceDetailsUpdateUnitedStatesPublicHealthService = (NonNullable<UpdateUsPublicHealthServiceDetailsMutation['updateUnitedStatesPublicHealthService']>);
export type UpdateUsPublicHealthServiceDetailsService = (NonNullable<(NonNullable<UpdateUsPublicHealthServiceDetailsMutation['updateUnitedStatesPublicHealthService']>)['service']>);
export const UpdateUsPublicHealthServiceDetailsHOC = withUpdateUsPublicHealthServiceDetails;
export type DeleteUsPublicHealthServiceDetailsVariables = DeleteUsPublicHealthServiceDetailsMutationVariables;
export type DeleteUsPublicHealthServiceDetailsDeleteUnitedStatesPublicHealthService = (NonNullable<DeleteUsPublicHealthServiceDetailsMutation['deleteUnitedStatesPublicHealthService']>);
export const DeleteUsPublicHealthServiceDetailsHOC = withDeleteUsPublicHealthServiceDetails;
export type UpdateUserVariables = UpdateUserMutationVariables;
export type UpdateUserUpdateUser = (NonNullable<UpdateUserMutation['updateUser']>);
export type UpdateUserUser = (NonNullable<(NonNullable<UpdateUserMutation['updateUser']>)['user']>);
export const UpdateUserHOC = withUpdateUser;
export type CreateJumioIdentityVerificationVariables = CreateJumioIdentityVerificationMutationVariables;
export type CreateJumioIdentityVerificationCreateJumioIdentityVerification = (NonNullable<CreateJumioIdentityVerificationMutation['createJumioIdentityVerification']>);
export type CreateJumioIdentityVerificationUser = (NonNullable<(NonNullable<CreateJumioIdentityVerificationMutation['createJumioIdentityVerification']>)['user']>);
export const CreateJumioIdentityVerificationHOC = withCreateJumioIdentityVerification;
export type GetCurrentUserVariables = GetCurrentUserQueryVariables;
export type GetCurrentUserMe = (NonNullable<GetCurrentUserQuery['me']>);
export type GetCurrentUserLastVerification = (NonNullable<(NonNullable<GetCurrentUserQuery['me']>)['lastVerification']>);
export const GetCurrentUserHOC = withGetCurrentUser;
export type GetUserExpirationWarningTimeVariables = GetUserExpirationWarningTimeQueryVariables;
export type GetUserExpirationWarningTimeMe = (NonNullable<GetUserExpirationWarningTimeQuery['me']>);
export const GetUserExpirationWarningTimeHOC = withGetUserExpirationWarningTime;
export type UpdateUserExpirationWarningTimeVariables = UpdateUserExpirationWarningTimeMutationVariables;
export type UpdateUserExpirationWarningTimeUpdateUser = (NonNullable<UpdateUserExpirationWarningTimeMutation['updateUser']>);
export type UpdateUserExpirationWarningTimeUser = (NonNullable<(NonNullable<UpdateUserExpirationWarningTimeMutation['updateUser']>)['user']>);
export const UpdateUserExpirationWarningTimeHOC = withUpdateUserExpirationWarningTime;
export type SignOutVariables = SignOutMutationVariables;
export type SignOutSignOut = (NonNullable<SignOutMutation['signOut']>);
export const SignOutHOC = withSignOut;
export type ShareDocumentsVariables = ShareDocumentsMutationVariables;
export type ShareDocumentsShareDocuments = (NonNullable<ShareDocumentsMutation['shareDocuments']>);
export type ShareDocumentsSharingEvent = (NonNullable<(NonNullable<ShareDocumentsMutation['shareDocuments']>)['sharingEvent']>);
export const ShareDocumentsHOC = withShareDocuments;
export type GetAllDocumentsVariables = GetAllDocumentsQueryVariables;
export type GetAllDocumentsPersonalDetails = (NonNullable<GetAllDocumentsQuery['personalDetails']>);
export type GetAllDocumentsDocuments = NonNullable<(NonNullable<(NonNullable<GetAllDocumentsQuery['personalDetails']>)['documents']>)[number]>;
export type GetAllDocumentsAttachment = (NonNullable<NonNullable<(NonNullable<(NonNullable<GetAllDocumentsQuery['personalDetails']>)['documents']>)[number]>['attachment']>);
export const GetAllDocumentsHOC = withGetAllDocuments;
export type GetSharingEventsVariables = GetSharingEventsQueryVariables;
export type GetSharingEventsPersonalDetails = (NonNullable<GetSharingEventsQuery['personalDetails']>);
export type GetSharingEventsSharingEvents = NonNullable<(NonNullable<(NonNullable<GetSharingEventsQuery['personalDetails']>)['sharingEvents']>)[number]>;
export type GetSharingEventsDocuments = NonNullable<(NonNullable<NonNullable<(NonNullable<(NonNullable<GetSharingEventsQuery['personalDetails']>)['sharingEvents']>)[number]>['documents']>)[number]>;
export const GetSharingEventsHOC = withGetSharingEvents;
export type SignInMutationVariables = Exact<{
  input: SignInMutationInput;
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signIn?: Maybe<(
    { __typename?: 'SignInMutationPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & BaseUserFieldsFragment
    )> }
  )> }
);

export type SignUpMutationVariables = Exact<{
  input: SignUpMutationInput;
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp?: Maybe<(
    { __typename?: 'SignUpMutationPayload' }
    & { user: (
      { __typename?: 'User' }
      & BaseUserFieldsFragment
    ) }
  )> }
);

export type CreateDocumentMutationVariables = Exact<{
  input: CreateDocumentMutationInput;
}>;


export type CreateDocumentMutation = (
  { __typename?: 'Mutation' }
  & { createDocument?: Maybe<(
    { __typename?: 'CreateDocumentMutationPayload' }
    & { document?: Maybe<(
      { __typename?: 'Document' }
      & Pick<Document, 'id'>
    )> }
  )> }
);

export type GetCategoryMenuDataQueryVariables = Exact<{
  profileSections: Array<ProfileSectionEnum> | ProfileSectionEnum;
}>;


export type GetCategoryMenuDataQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { expirationsByProfileSection: Array<(
      { __typename?: 'ExpirationProfileSectionCount' }
      & Pick<ExpirationProfileSectionCount, 'id' | 'count'>
    )>, formCompletions: Array<(
      { __typename?: 'FormCompletion' }
      & Pick<FormCompletion, 'id' | 'profileSection' | 'status'>
    )> }
  )> }
);

export type GetDocumentsQueryVariables = Exact<{
  category: DocumentCategoryEnum;
  profileSection: ProfileSectionEnum;
}>;


export type GetDocumentsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { documents: Array<(
      { __typename?: 'Document' }
      & Pick<Document, 'id' | 'name' | 'expiresAt'>
      & { attachment: (
        { __typename?: 'Attachment' }
        & Pick<Attachment, 'id' | 'previewUrl'>
      ) }
    )> }
  )> }
);

export type GetDocumentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetDocumentQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { document?: Maybe<(
      { __typename?: 'Document' }
      & Pick<Document, 'id' | 'name' | 'category' | 'expiresAt' | 'kind' | 'otherKind' | 'profileSection'>
      & { attachment: (
        { __typename?: 'Attachment' }
        & Pick<Attachment, 'id' | 'previewUrl' | 'url' | 'contentType'>
      ) }
    )> }
  )> }
);

export type UpdateDocumentMutationVariables = Exact<{
  input: UpdateDocumentMutationInput;
}>;


export type UpdateDocumentMutation = (
  { __typename?: 'Mutation' }
  & { updateDocument?: Maybe<(
    { __typename?: 'UpdateDocumentMutationPayload' }
    & { document?: Maybe<(
      { __typename?: 'Document' }
      & Pick<Document, 'id'>
      & { attachment: (
        { __typename?: 'Attachment' }
        & Pick<Attachment, 'id'>
      ) }
    )> }
  )> }
);

export type DeleteDocumentMutationVariables = Exact<{
  input: DeleteDocumentMutationInput;
}>;


export type DeleteDocumentMutation = (
  { __typename?: 'Mutation' }
  & { deleteDocument?: Maybe<(
    { __typename?: 'DeleteDocumentMutationPayload' }
    & Pick<DeleteDocumentMutationPayload, 'id'>
  )> }
);

export type UpdateFormCompletionStatusMutationVariables = Exact<{
  input: UpdateFormCompletionStatusMutationInput;
}>;


export type UpdateFormCompletionStatusMutation = (
  { __typename?: 'Mutation' }
  & { updateFormCompletionStatus?: Maybe<(
    { __typename?: 'UpdateFormCompletionStatusMutationPayload' }
    & { formCompletion?: Maybe<(
      { __typename?: 'FormCompletion' }
      & Pick<FormCompletion, 'id'>
    )> }
  )> }
);

export type GetFormCompletionStatusQueryVariables = Exact<{
  profileSection: ProfileSectionEnum;
}>;


export type GetFormCompletionStatusQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { formCompletion?: Maybe<(
      { __typename?: 'FormCompletion' }
      & Pick<FormCompletion, 'id' | 'status'>
    )> }
  )> }
);

export type GetMenuDataByCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMenuDataByCategoryQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { expirationsByCategory: Array<(
      { __typename?: 'ExpirationCategoryCount' }
      & Pick<ExpirationCategoryCount, 'id' | 'count'>
    )>, formCompletionByCategory: Array<(
      { __typename?: 'FormCompletionCategoryCount' }
      & Pick<FormCompletionCategoryCount, 'id' | 'count'>
    )> }
  )> }
);

export type GetAcademicAppointmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAcademicAppointmentsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'states' | 'countries'>
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { academicAppointments: Array<(
      { __typename?: 'AcademicAppointment' }
      & Pick<AcademicAppointment, 'position' | 'institutionName' | 'institutionUrl' | 'addressLine1' | 'addressLine2' | 'city' | 'state' | 'zip' | 'country' | 'phoneNumber' | 'faxNumber' | 'departmentHeadFirstName' | 'departmentHeadLastName' | 'startedAt' | 'endedAt'>
    )> }
  )> }
);

export type UpdateAcademicAppointmentsMutationVariables = Exact<{
  input: UpdateAcademicAppointmentsMutationInput;
}>;


export type UpdateAcademicAppointmentsMutation = (
  { __typename?: 'Mutation' }
  & { updateAcademicAppointments?: Maybe<(
    { __typename?: 'UpdateAcademicAppointmentsMutationPayload' }
    & { academicAppointments?: Maybe<Array<(
      { __typename?: 'AcademicAppointment' }
      & Pick<AcademicAppointment, 'institutionName'>
    )>> }
  )> }
);

export type GetAddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAddressesQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'homeAddressLine1' | 'homeAddressLine2' | 'homeAddressLine3' | 'homeAddressCity' | 'homeAddressState' | 'homeAddressZip' | 'homeAddressCountry' | 'mailingAddressSameAsHome' | 'mailingAddressLine1' | 'mailingAddressLine2' | 'mailingAddressLine3' | 'mailingAddressCity' | 'mailingAddressState' | 'mailingAddressZip' | 'mailingAddressCountry'>
  )> }
);

export type UpdateAddressesMutationVariables = Exact<{
  input: UpdateAddressesMutationInput;
}>;


export type UpdateAddressesMutation = (
  { __typename?: 'Mutation' }
  & { updateAddresses?: Maybe<(
    { __typename?: 'UpdateAddressesMutationPayload' }
    & { personalDetails?: Maybe<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'homeAddressLine1'>
    )> }
  )> }
);

export type GetAdministrativeLeadershipPositionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdministrativeLeadershipPositionsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { administrativeLeadershipPositions: Array<(
      { __typename?: 'AdministrativeLeadershipPosition' }
      & Pick<AdministrativeLeadershipPosition, 'title' | 'startedAt' | 'endedAt'>
    )> }
  )> }
);

export type UpdateAdministrativeLeadershipPositionsMutationVariables = Exact<{
  input: UpdateAdministrativeLeadershipPositionsMutationInput;
}>;


export type UpdateAdministrativeLeadershipPositionsMutation = (
  { __typename?: 'Mutation' }
  & { updateAdministrativeLeadershipPositions?: Maybe<(
    { __typename?: 'UpdateAdministrativeLeadershipPositionsMutationPayload' }
    & { administrativeLeadershipPositions?: Maybe<Array<(
      { __typename?: 'AdministrativeLeadershipPosition' }
      & Pick<AdministrativeLeadershipPosition, 'title'>
    )>> }
  )> }
);

export type GetBirthAndCitizenshipDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBirthAndCitizenshipDetailsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'countries'>
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'countryOfCitizenship' | 'dateOfBirth' | 'placeOfBirthCity' | 'placeOfBirthState' | 'placeOfBirthCountry' | 'visaType' | 'visaNumber' | 'visaStatus' | 'visaExpiresAt' | 'usPermanentResident'>
  )> }
);

export type UpdateBirthAndCitizenshipMutationVariables = Exact<{
  input: UpdateBirthAndCitizenshipMutationInput;
}>;


export type UpdateBirthAndCitizenshipMutation = (
  { __typename?: 'Mutation' }
  & { updateBirthAndCitizenship?: Maybe<(
    { __typename?: 'UpdateBirthAndCitizenshipMutationPayload' }
    & { personalDetails?: Maybe<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'dateOfBirth'>
    )> }
  )> }
);

export type GetBoardCertificationDetailsQueryVariables = Exact<{
  specialtyRank: SpecialtyRankEnum;
}>;


export type GetBoardCertificationDetailsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { boardCertification?: Maybe<(
      { __typename?: 'BoardCertification' }
      & Pick<BoardCertification, 'boardCertified' | 'certifyingBoardName' | 'expiresAt' | 'initialCertificationDate' | 'recertificationDate' | 'specialty' | 'specialtyRank'>
      & { boardCertificationQuestionnaire?: Maybe<(
        { __typename?: 'BoardCertificationQuestionnaire' }
        & Pick<BoardCertificationQuestionnaire, 'comments' | 'expectedExamDate' | 'hasTakenCertificationExam' | 'hasTakenCertificationExamBoardName' | 'planningToTakeExam' | 'takenPartOnePartTwoEligible' | 'takenPartOnePartTwoEligibleBoardName'>
      )> }
    )> }
  )> }
);

export type UpdateBoardCertificationMutationVariables = Exact<{
  input: UpdateBoardCertificationMutationInput;
}>;


export type UpdateBoardCertificationMutation = (
  { __typename?: 'Mutation' }
  & { updateBoardCertification?: Maybe<(
    { __typename?: 'UpdateBoardCertificationMutationPayload' }
    & { boardCertification?: Maybe<(
      { __typename?: 'BoardCertification' }
      & Pick<BoardCertification, 'specialty'>
    )> }
  )> }
);

export type GetCmeCreditHoursDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCmeCreditHoursDetailsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { cmeCreditHours: Array<(
      { __typename?: 'CMECreditHour' }
      & Pick<CmeCreditHour, 'activityDate' | 'activityName' | 'sponsorName' | 'hoursEarned' | 'methodOfEducation'>
    )> }
  )> }
);

export type UpdateCmeCreditHoursMutationVariables = Exact<{
  input: UpdateCmeCreditHoursMutationInput;
}>;


export type UpdateCmeCreditHoursMutation = (
  { __typename?: 'Mutation' }
  & { updateCmeCreditHours?: Maybe<(
    { __typename?: 'UpdateCMECreditHoursMutationPayload' }
    & { cmeCreditHours?: Maybe<Array<(
      { __typename?: 'CMECreditHour' }
      & Pick<CmeCreditHour, 'activityName'>
    )>> }
  )> }
);

export type GetComlexScoresDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetComlexScoresDetailsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { comlexUsaScores?: Maybe<(
      { __typename?: 'COMLEXUSAScore' }
      & Pick<ComlexusaScore, 'nbomeIdNumber' | 'level1Passed' | 'level1Score' | 'level1ExamDate' | 'level2CePassed' | 'level2CeScore' | 'level2CeExamDate' | 'level2PePassed' | 'level2PeScore' | 'level2PeExamDate' | 'level3Passed' | 'level3Score' | 'level3ExamDate'>
    )> }
  )> }
);

export type UpdateComlexScoresMutationVariables = Exact<{
  input: UpdateComlexScoresMutationInput;
}>;


export type UpdateComlexScoresMutation = (
  { __typename?: 'Mutation' }
  & { updateComlexScores?: Maybe<(
    { __typename?: 'UpdateCOMLEXScoresMutationPayload' }
    & { comlexScores?: Maybe<(
      { __typename?: 'COMLEXUSAScore' }
      & Pick<ComlexusaScore, 'nbomeIdNumber'>
    )> }
  )> }
);

export type GetCertificationDetailsQueryVariables = Exact<{
  kind: CertificationKindEnum;
}>;


export type GetCertificationDetailsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { certification?: Maybe<(
      { __typename?: 'Certification' }
      & Pick<Certification, 'issuedAt' | 'expiresAt'>
    )> }
  )> }
);

export type UpdateCertificationMutationVariables = Exact<{
  input: UpdateCertificationMutationInput;
}>;


export type UpdateCertificationMutation = (
  { __typename?: 'Mutation' }
  & { updateCertification?: Maybe<(
    { __typename?: 'UpdateCertificationMutationPayload' }
    & { certification?: Maybe<(
      { __typename?: 'Certification' }
      & Pick<Certification, 'kind'>
    )> }
  )> }
);

export type GetCovidVaccinationDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCovidVaccinationDetailsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'states'>
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { covidVaccination?: Maybe<(
      { __typename?: 'COVIDVaccination' }
      & Pick<CovidVaccination, 'vaccinationDate1' | 'vaccinationDate2' | 'facilityName' | 'addressLine1' | 'addressLine2' | 'city' | 'state' | 'zip'>
    )> }
  )> }
);

export type UpdateCovidVaccinationMutationVariables = Exact<{
  input: UpdateCovidVaccinationMutationInput;
}>;


export type UpdateCovidVaccinationMutation = (
  { __typename?: 'Mutation' }
  & { updateCovidVaccination?: Maybe<(
    { __typename?: 'UpdateCOVIDVaccinationMutationPayload' }
    & { covidVaccination?: Maybe<(
      { __typename?: 'COVIDVaccination' }
      & Pick<CovidVaccination, 'vaccinationDate1'>
    )> }
  )> }
);

export type GetOtherCertificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOtherCertificationsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { otherCertifications: Array<(
      { __typename?: 'Certification' }
      & Pick<Certification, 'name' | 'issuedAt' | 'expiresAt'>
    )> }
  )> }
);

export type UpdateOtherCertificationsMutationVariables = Exact<{
  input: UpdateOtherCertificationsMutationInput;
}>;


export type UpdateOtherCertificationsMutation = (
  { __typename?: 'Mutation' }
  & { updateOtherCertifications?: Maybe<(
    { __typename?: 'UpdateOtherCertificationsMutationPayload' }
    & { otherCertifications?: Maybe<Array<(
      { __typename?: 'Certification' }
      & Pick<Certification, 'name'>
    )>> }
  )> }
);

export type GetDeaLicenseDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDeaLicenseDetailsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { deaLicense?: Maybe<(
      { __typename?: 'DEALicense' }
      & Pick<DeaLicense, 'registrationNumber' | 'expiresAt' | 'status' | 'unrestricted'>
    )> }
  )> }
);

export type UpdateDeaLicenseMutationVariables = Exact<{
  input: UpdateDeaLicenseMutationInput;
}>;


export type UpdateDeaLicenseMutation = (
  { __typename?: 'Mutation' }
  & { updateDeaLicense?: Maybe<(
    { __typename?: 'UpdateDEALicenseMutationPayload' }
    & { deaLicense?: Maybe<(
      { __typename?: 'DEALicense' }
      & Pick<DeaLicense, 'registrationNumber'>
    )> }
  )> }
);

export type GetDegreeDetailsQueryVariables = Exact<{
  kind: DegreeKind;
}>;


export type GetDegreeDetailsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'states' | 'countries'>
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { degree?: Maybe<(
      { __typename?: 'Degree' }
      & Pick<Degree, 'institutionName' | 'degree' | 'major' | 'minor' | 'dateOfGraduation' | 'startedAt' | 'endedAt' | 'registrarPhoneNumber' | 'registrarUrl' | 'institutionAddressLine1' | 'institutionAddressLine2' | 'institutionAddressLine3' | 'institutionAddressCity' | 'institutionAddressState' | 'institutionAddressZip' | 'institutionAddressCountry'>
    )> }
  )> }
);

export type UpdateDegreeMutationVariables = Exact<{
  input: UpdateDegreeMutationInput;
}>;


export type UpdateDegreeMutation = (
  { __typename?: 'Mutation' }
  & { updateDegree?: Maybe<(
    { __typename?: 'UpdateDegreeMutationPayload' }
    & { degree?: Maybe<(
      { __typename?: 'Degree' }
      & Pick<Degree, 'institutionName'>
    )> }
  )> }
);

export type GetDemographicDetailQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDemographicDetailQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { demographicDetail?: Maybe<(
      { __typename?: 'DemographicDetail' }
      & Pick<DemographicDetail, 'race' | 'ethnicity'>
    )> }
  )> }
);

export type UpdateDemographicDetailMutationVariables = Exact<{
  input: UpdateDemographicDetailMutationInput;
}>;


export type UpdateDemographicDetailMutation = (
  { __typename?: 'Mutation' }
  & { updateDemographicDetail?: Maybe<(
    { __typename?: 'UpdateDemographicDetailMutationPayload' }
    & { demographicDetail?: Maybe<(
      { __typename?: 'DemographicDetail' }
      & Pick<DemographicDetail, 'race'>
    )> }
  )> }
);

export type GetDriversLicenseDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDriversLicenseDetailsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { driversLicense?: Maybe<(
      { __typename?: 'DriversLicense' }
      & Pick<DriversLicense, 'expiresAt' | 'issuingState' | 'number'>
    )> }
  )> }
);

export type UpdateDriversLicenseMutationVariables = Exact<{
  input: UpdateDriversLicenseMutationInput;
}>;


export type UpdateDriversLicenseMutation = (
  { __typename?: 'Mutation' }
  & { updateDriversLicense?: Maybe<(
    { __typename?: 'UpdateDriversLicenseMutationPayload' }
    & { driversLicense?: Maybe<(
      { __typename?: 'DriversLicense' }
      & Pick<DriversLicense, 'number'>
    )> }
  )> }
);

export type GetEmploymentGapDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEmploymentGapDetailsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { employmentGap?: Maybe<(
      { __typename?: 'EmploymentGap' }
      & Pick<EmploymentGap, 'text'>
    )> }
  )> }
);

export type UpdateEmploymentGapDetailsMutationVariables = Exact<{
  input: UpdateEmploymentGapMutationInput;
}>;


export type UpdateEmploymentGapDetailsMutation = (
  { __typename?: 'Mutation' }
  & { updateEmploymentGap?: Maybe<(
    { __typename?: 'UpdateEmploymentGapMutationPayload' }
    & { employmentGap?: Maybe<(
      { __typename?: 'EmploymentGap' }
      & Pick<EmploymentGap, 'text'>
    )> }
  )> }
);

export type GetHealthProfessionsScholarshipsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHealthProfessionsScholarshipsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { healthProfessionsScholarship?: Maybe<(
      { __typename?: 'HealthProfessionsScholarship' }
      & Pick<HealthProfessionsScholarship, 'militaryBranchScholarshipSponsor' | 'startedAt' | 'endedAt'>
    )> }
  )> }
);

export type UpdateHealthProfessionsScholarshipMutationVariables = Exact<{
  input: UpdateHealthProfessionsScholarshipMutationInput;
}>;


export type UpdateHealthProfessionsScholarshipMutation = (
  { __typename?: 'Mutation' }
  & { updateHealthProfessionsScholarship?: Maybe<(
    { __typename?: 'UpdateHealthProfessionsScholarshipMutationPayload' }
    & { healthProfessionsScholarship?: Maybe<(
      { __typename?: 'HealthProfessionsScholarship' }
      & Pick<HealthProfessionsScholarship, 'militaryBranchScholarshipSponsor'>
    )> }
  )> }
);

export type DeleteHealthProfessionsScholarshipMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteHealthProfessionsScholarshipMutation = (
  { __typename?: 'Mutation' }
  & { deleteHealthProfessionsScholarship?: Maybe<(
    { __typename?: 'DeleteHealthProfessionsScholarshipMutationPayload' }
    & Pick<DeleteHealthProfessionsScholarshipMutationPayload, 'success'>
  )> }
);

export type GetHealthcareFacilityAffiliationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHealthcareFacilityAffiliationsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'states' | 'countries'>
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { healthcareFacilityAffiliations: Array<(
      { __typename?: 'HealthcareFacilityAffiliation' }
      & Pick<HealthcareFacilityAffiliation, 'facilityName' | 'facilityLegalBusinessName' | 'facilityType' | 'departmentOrDivisionName' | 'addressLine1' | 'addressLine2' | 'city' | 'state' | 'zipCode' | 'country' | 'membershipStatus' | 'medicalStaffOfficePhoneNumber' | 'medicalStaffOfficeFaxNumber' | 'privilegeLimitations' | 'comments' | 'startedAt' | 'endedAt'>
    )> }
  )> }
);

export type UpdateHealthcareFacilityAffiliationsMutationVariables = Exact<{
  input: UpdateHealthcareFacilityAffiliationsMutationInput;
}>;


export type UpdateHealthcareFacilityAffiliationsMutation = (
  { __typename?: 'Mutation' }
  & { updateHealthcareFacilityAffiliations?: Maybe<(
    { __typename?: 'UpdateHealthcareFacilityAffiliationsMutationPayload' }
    & { healthcareFacilityAffiliations?: Maybe<Array<(
      { __typename?: 'HealthcareFacilityAffiliation' }
      & Pick<HealthcareFacilityAffiliation, 'facilityName'>
    )>> }
  )> }
);

export type GetHospitalAffiliationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHospitalAffiliationsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'states' | 'countries'>
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { hospitalAffiliations: Array<(
      { __typename?: 'HospitalAffiliation' }
      & Pick<HospitalAffiliation, 'hospitalName' | 'hospitalLegalBusinessName' | 'departmentName' | 'addressLine1' | 'addressLine2' | 'city' | 'state' | 'country' | 'zipCode' | 'membershipStatus' | 'staffOfficePhoneNumber' | 'staffOfficeFaxNumber' | 'privilegeLimitations' | 'comments' | 'startedAt' | 'endedAt'>
    )> }
  )> }
);

export type UpdateHospitalAffiliationsMutationVariables = Exact<{
  input: UpdateHospitalAffiliationsMutationInput;
}>;


export type UpdateHospitalAffiliationsMutation = (
  { __typename?: 'Mutation' }
  & { updateHospitalAffiliations?: Maybe<(
    { __typename?: 'UpdateHospitalAffiliationsMutationPayload' }
    & { hospitalAffiliations?: Maybe<Array<(
      { __typename?: 'HospitalAffiliation' }
      & Pick<HospitalAffiliation, 'hospitalName'>
    )>> }
  )> }
);

export type GetIdNumbersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIdNumbersQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'socialSecurityNumber' | 'npiNumber' | 'upinNumber' | 'personalMedicareNumber' | 'personalMedicaidNumber' | 'orcidId' | 'researcherId' | 'scopusAuthorId'>
  )> }
);

export type UpdateIdNumbersMutationVariables = Exact<{
  input: UpdateIdNumbersMutationInput;
}>;


export type UpdateIdNumbersMutation = (
  { __typename?: 'Mutation' }
  & { updateIdNumbers?: Maybe<(
    { __typename?: 'UpdateIdNumbersMutationPayload' }
    & { personalDetails?: Maybe<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'npiNumber'>
    )> }
  )> }
);

export type GetInfluenzaVaccinationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInfluenzaVaccinationQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'states'>
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { influenzaVaccination?: Maybe<(
      { __typename?: 'InfluenzaVaccination' }
      & Pick<InfluenzaVaccination, 'hasBeenVaccinated' | 'noVaccinationComment' | 'vaccinatedAt' | 'fluSeason' | 'facilityName' | 'addressLine1' | 'addressLine2' | 'city' | 'state' | 'zip'>
    )> }
  )> }
);

export type UpdateInfluenzaVaccinationMutationVariables = Exact<{
  input: UpdateInfluenzaVaccinationMutationInput;
}>;


export type UpdateInfluenzaVaccinationMutation = (
  { __typename?: 'Mutation' }
  & { updateInfluenzaVaccination?: Maybe<(
    { __typename?: 'UpdateInfluenzaVaccinationMutationPayload' }
    & { influenzaVaccination?: Maybe<(
      { __typename?: 'InfluenzaVaccination' }
      & Pick<InfluenzaVaccination, 'hasBeenVaccinated'>
    )> }
  )> }
);

export type GetInsurancePoliciesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInsurancePoliciesQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'states'>
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { insurancePolicies: Array<(
      { __typename?: 'InsurancePolicy' }
      & Pick<InsurancePolicy, 'aggregateAmount' | 'city' | 'claimsCoverageType' | 'coverageType' | 'coveredByFtca' | 'email' | 'endedAt' | 'entityName' | 'faxNumber' | 'perClaimAmount' | 'phoneNumber' | 'policyNumber' | 'selfInsured' | 'startedAt' | 'state' | 'streetAddress' | 'tailCoverage' | 'url' | 'zipCode'>
    )> }
  )> }
);

export type UpdateInsurancePoliciesMutationVariables = Exact<{
  input: UpdateInsurancePoliciesMutationInput;
}>;


export type UpdateInsurancePoliciesMutation = (
  { __typename?: 'Mutation' }
  & { updateInsurancePolicies?: Maybe<(
    { __typename?: 'UpdateInsurancePoliciesMutationPayload' }
    & { insurancePolicies?: Maybe<Array<(
      { __typename?: 'InsurancePolicy' }
      & Pick<InsurancePolicy, 'entityName'>
    )>> }
  )> }
);

export type GetLoanRepaymentDetailDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoanRepaymentDetailDetailsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'states'>
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { loanRepaymentDetail?: Maybe<(
      { __typename?: 'LoanRepaymentDetail' }
      & Pick<LoanRepaymentDetail, 'repaymentProgramName' | 'nameOfInstitution' | 'addressLine1' | 'addressLine2' | 'city' | 'state' | 'zip' | 'yearsWorkedForRepayment' | 'startedAt' | 'endedAt'>
    )> }
  )> }
);

export type UpdateLoanRepaymentDetailMutationVariables = Exact<{
  input: UpdateLoanRepaymentDetailMutationInput;
}>;


export type UpdateLoanRepaymentDetailMutation = (
  { __typename?: 'Mutation' }
  & { updateLoanRepaymentDetail?: Maybe<(
    { __typename?: 'UpdateLoanRepaymentDetailMutationPayload' }
    & { loanRepaymentDetail?: Maybe<(
      { __typename?: 'LoanRepaymentDetail' }
      & Pick<LoanRepaymentDetail, 'repaymentProgramName'>
    )> }
  )> }
);

export type DeleteLoanRepaymentDetailMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteLoanRepaymentDetailMutation = (
  { __typename?: 'Mutation' }
  & { deleteLoanRepaymentDetail?: Maybe<(
    { __typename?: 'DeleteLoanRepaymentDetailMutationPayload' }
    & Pick<DeleteLoanRepaymentDetailMutationPayload, 'success'>
  )> }
);

export type GetMalpracticeClaimsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMalpracticeClaimsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { malpracticeClaims: Array<(
      { __typename?: 'MalpracticeClaim' }
      & Pick<MalpracticeClaim, 'allegedIncidentDate' | 'amountPaid' | 'claimFiledAt' | 'claimStatus' | 'defendantType' | 'descriptionOfAllegations' | 'descriptionOfAllegedInjury' | 'includedInNpdb' | 'insuranceCarrierInvolved' | 'involvementDescription' | 'methodOfResolution' | 'numberOfCoDefendants' | 'policyNumberCoveredBy' | 'resolutionComment' | 'settlementAmount'>
    )> }
  )> }
);

export type UpdateMalpracticeClaimsMutationVariables = Exact<{
  input: UpdateMalpracticeClaimsMutationInput;
}>;


export type UpdateMalpracticeClaimsMutation = (
  { __typename?: 'Mutation' }
  & { updateMalpracticeClaims?: Maybe<(
    { __typename?: 'UpdateMalpracticeClaimsMutationPayload' }
    & { malpracticeClaims?: Maybe<Array<(
      { __typename?: 'MalpracticeClaim' }
      & Pick<MalpracticeClaim, 'defendantType'>
    )>> }
  )> }
);

export type GetMedicalDegreeDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMedicalDegreeDetailsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'states' | 'countries'>
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { medicalDegree?: Maybe<(
      { __typename?: 'MedicalDegree' }
      & Pick<MedicalDegree, 'institutionName' | 'kind' | 'dateOfGraduation' | 'startedAt' | 'endedAt' | 'registrarPhoneNumber' | 'registrarUrl' | 'foreignMedicalSchool' | 'ecfmgCertified' | 'ecfmgCertifiedAt' | 'institutionAddressLine1' | 'institutionAddressLine2' | 'institutionAddressLine3' | 'institutionAddressCity' | 'institutionAddressState' | 'institutionAddressZip' | 'institutionAddressCountry'>
    )> }
  )> }
);

export type UpdateMedicalDegreeMutationVariables = Exact<{
  input: UpdateMedicalDegreeMutationInput;
}>;


export type UpdateMedicalDegreeMutation = (
  { __typename?: 'Mutation' }
  & { updateMedicalDegree?: Maybe<(
    { __typename?: 'UpdateMedicalDegreeMutationPayload' }
    & { medicalDegree?: Maybe<(
      { __typename?: 'MedicalDegree' }
      & Pick<MedicalDegree, 'kind'>
    )> }
  )> }
);

export type GetMedicalGroupEmployersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMedicalGroupEmployersQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'states' | 'countries'>
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { medicalGroupEmployers: Array<(
      { __typename?: 'MedicalGroupEmployer' }
      & Pick<MedicalGroupEmployer, 'name' | 'legalBusinessName' | 'addressLine1' | 'addressLine2' | 'city' | 'state' | 'country' | 'zip' | 'phoneNumber' | 'startedAt' | 'endedAt'>
    )> }
  )> }
);

export type UpdateMedicalGroupEmployersMutationVariables = Exact<{
  input: UpdateMedicalGroupEmployersMutationInput;
}>;


export type UpdateMedicalGroupEmployersMutation = (
  { __typename?: 'Mutation' }
  & { updateMedicalGroupEmployers?: Maybe<(
    { __typename?: 'UpdateMedicalGroupEmployersMutationPayload' }
    & { medicalGroupEmployers?: Maybe<Array<(
      { __typename?: 'MedicalGroupEmployer' }
      & Pick<MedicalGroupEmployer, 'name'>
    )>> }
  )> }
);

export type GetMilitaryServiceDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMilitaryServiceDetailsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { militaryService?: Maybe<(
      { __typename?: 'MilitaryService' }
      & Pick<MilitaryService, 'startedAt' | 'endedAt' | 'branchOfService' | 'activeDuty' | 'hasDd214'>
    )> }
  )> }
);

export type UpdateMilitaryServiceMutationVariables = Exact<{
  input: UpdateMilitaryServiceMutationInput;
}>;


export type UpdateMilitaryServiceMutation = (
  { __typename?: 'Mutation' }
  & { updateMilitaryService?: Maybe<(
    { __typename?: 'UpdateMilitaryServiceMutationPayload' }
    & { militaryService?: Maybe<(
      { __typename?: 'MilitaryService' }
      & Pick<MilitaryService, 'startedAt'>
    )> }
  )> }
);

export type DeleteMilitaryServiceMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteMilitaryServiceMutation = (
  { __typename?: 'Mutation' }
  & { deleteMilitaryService?: Maybe<(
    { __typename?: 'DeleteMilitaryServiceMutationPayload' }
    & Pick<DeleteMilitaryServiceMutationPayload, 'success'>
  )> }
);

export type GetNationalHealthServiceCorpsScholarshipsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNationalHealthServiceCorpsScholarshipsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { nationalHealthServiceCorpsScholarship?: Maybe<(
      { __typename?: 'NationalHealthServiceCorpsScholarship' }
      & Pick<NationalHealthServiceCorpsScholarship, 'startedAt' | 'endedAt'>
    )> }
  )> }
);

export type UpdateNationalHealthServiceCorpsScholarshipMutationVariables = Exact<{
  input: UpdateNationalHealthServiceCorpsScholarshipMutationInput;
}>;


export type UpdateNationalHealthServiceCorpsScholarshipMutation = (
  { __typename?: 'Mutation' }
  & { updateNationalHealthServiceCorpsScholarship?: Maybe<(
    { __typename?: 'UpdateNationalHealthServiceCorpsScholarshipMutationPayload' }
    & { scholarship?: Maybe<(
      { __typename?: 'NationalHealthServiceCorpsScholarship' }
      & Pick<NationalHealthServiceCorpsScholarship, 'startedAt'>
    )> }
  )> }
);

export type DeleteNationalHealthServiceCorpScholarshipMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteNationalHealthServiceCorpScholarshipMutation = (
  { __typename?: 'Mutation' }
  & { deleteNationHealthServiceCorpsScholarship?: Maybe<(
    { __typename?: 'DeleteNationHealthServiceCorpsScholarshipMutationPayload' }
    & Pick<DeleteNationHealthServiceCorpsScholarshipMutationPayload, 'success'>
  )> }
);

export type GetPpdTuberculosisTestingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPpdTuberculosisTestingQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'states'>
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { ppdTuberculosisTesting?: Maybe<(
      { __typename?: 'PPDTuberculosisTesting' }
      & Pick<PpdTuberculosisTesting, 'receivedBcgVaccine' | 'hadPositiveTbSkinTest' | 'testedMoreThan5YearsAgo' | 'testedPositiveAt' | 'yearTestedPositive' | 'testReactionSize' | 'hadTbDiseaseDiagnosis' | 'hasTakenInhOrRifampin' | 'treatmentCompletedMoreThan5YearsAgo' | 'treatmentCompletedAt' | 'yearTreatmentCompleted' | 'lastChestXrayAt' | 'testingSiteName' | 'addressLine1' | 'addressLine2' | 'city' | 'state' | 'zip' | 'ppdInduration' | 'ppdInterpretation' | 'testDate' | 'testedInTheLastYear'>
    )> }
  )> }
);

export type UpdatePpdTuberculosisTestingMutationVariables = Exact<{
  input: UpdatePpdTuberculosisTestingMutationInput;
}>;


export type UpdatePpdTuberculosisTestingMutation = (
  { __typename?: 'Mutation' }
  & { updatePpdTuberculosisTesting?: Maybe<(
    { __typename?: 'UpdatePPDTuberculosisTestingMutationPayload' }
    & { ppdTuberculosisTesting?: Maybe<(
      { __typename?: 'PPDTuberculosisTesting' }
      & Pick<PpdTuberculosisTesting, 'receivedBcgVaccine'>
    )> }
  )> }
);

export type GetPassportDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPassportDetailsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { passport?: Maybe<(
      { __typename?: 'Passport' }
      & Pick<Passport, 'expiresAt' | 'countryOfIssue' | 'number'>
    )> }
  )> }
);

export type UpdatePassportMutationVariables = Exact<{
  input: UpdatePassportMutationInput;
}>;


export type UpdatePassportMutation = (
  { __typename?: 'Mutation' }
  & { updatePassport?: Maybe<(
    { __typename?: 'UpdatePassportMutationPayload' }
    & { passport?: Maybe<(
      { __typename?: 'Passport' }
      & Pick<Passport, 'number'>
    )> }
  )> }
);

export type GetPeerReferenceDetailsQueryVariables = Exact<{
  position: Scalars['Int'];
}>;


export type GetPeerReferenceDetailsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'countries' | 'states'>
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { peerReference?: Maybe<(
      { __typename?: 'PeerReference' }
      & Pick<PeerReference, 'firstName' | 'lastName' | 'title' | 'degree' | 'specialty' | 'relationship' | 'phoneNumber' | 'emailAddress' | 'addressLine1' | 'addressLine2' | 'city' | 'state' | 'country' | 'zip' | 'hasWorkedWithInThePastTwoYears' | 'yearsKnown' | 'position'>
    )> }
  )> }
);

export type UpdatePeerReferenceMutationVariables = Exact<{
  input: UpdatePeerReferenceMutationInput;
}>;


export type UpdatePeerReferenceMutation = (
  { __typename?: 'Mutation' }
  & { updatePeerReference?: Maybe<(
    { __typename?: 'UpdatePeerReferenceMutationPayload' }
    & { peerReference?: Maybe<(
      { __typename?: 'PeerReference' }
      & Pick<PeerReference, 'firstName'>
    )> }
  )> }
);

export type GetPersonalDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersonalDetailsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id' | 'firstName' | 'lastName' | 'middleName' | 'maidenName' | 'suffix' | 'providerProfessionType' | 'legalGender' | 'cellPhoneNumber' | 'emergencyContactNumber'>
  )> }
);

export type UpdatePersonalDetailsMutationVariables = Exact<{
  input: UpdatePersonalDetailsMutationInput;
}>;


export type UpdatePersonalDetailsMutation = (
  { __typename?: 'Mutation' }
  & { updatePersonalDetails?: Maybe<(
    { __typename?: 'UpdatePersonalDetailsMutationPayload' }
    & { personalDetails?: Maybe<(
      { __typename?: 'Person' }
      & Pick<Person, 'id' | 'firstName'>
    )> }
  )> }
);

export type GetPostGraduateTrainingQueryVariables = Exact<{
  kind: PostGraduateTrainingKind;
}>;


export type GetPostGraduateTrainingQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { postGraduateTraining?: Maybe<(
      { __typename?: 'PostGraduateTraining' }
      & Pick<PostGraduateTraining, 'acgmeAccredited' | 'attendanceEndDate' | 'attendanceStartDate' | 'currentProgramDirectorFirstName' | 'currentProgramDirectorLastName' | 'directorContactEmail' | 'directorContactNumber' | 'directorDuringFirstName' | 'directorDuringLastName' | 'fellowshipKind' | 'gmeOfficeEmail' | 'gmeOfficePhone' | 'gmeOfficeUrl' | 'institutionName' | 'internshipKind' | 'programDirectorAddressCity' | 'programDirectorAddressCountry' | 'programDirectorAddressLine1' | 'programDirectorAddressLine2' | 'programDirectorAddressLine3' | 'programDirectorAddressState' | 'programDirectorAddressZip' | 'programAdminEmail' | 'programAdminName' | 'programAdminPhone' | 'residencyKind' | 'successfullyCompletedProgram'>
    )> }
  )> }
);

export type UpdatePostGraduateTrainingMutationVariables = Exact<{
  input: UpdatePostGraduateTrainingMutationInput;
}>;


export type UpdatePostGraduateTrainingMutation = (
  { __typename?: 'Mutation' }
  & { updatePostGraduateTraining?: Maybe<(
    { __typename?: 'UpdatePostGraduateTrainingMutationPayload' }
    & { postGraduateTraining?: Maybe<(
      { __typename?: 'PostGraduateTraining' }
      & Pick<PostGraduateTraining, 'institutionName'>
    )> }
  )> }
);

export type GetPriorNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPriorNamesQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { priorNames: Array<(
      { __typename?: 'PriorName' }
      & Pick<PriorName, 'name' | 'startedAt' | 'endedAt' | 'comment'>
    )> }
  )> }
);

export type UpdatePriorNamesMutationVariables = Exact<{
  input: UpdatePriorNamesMutationInput;
}>;


export type UpdatePriorNamesMutation = (
  { __typename?: 'Mutation' }
  & { updatePriorNames?: Maybe<(
    { __typename?: 'UpdatePriorNamesMutationPayload' }
    & { priorNames?: Maybe<Array<(
      { __typename?: 'PriorName' }
      & Pick<PriorName, 'name'>
    )>> }
  )> }
);

export type GetProfessionalLiabilityInsuranceCarrierDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfessionalLiabilityInsuranceCarrierDetailsQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'countries' | 'states'>
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { professionalLiabilityInsuranceCarrier?: Maybe<(
      { __typename?: 'ProfessionalLiabilityInsuranceCarrier' }
      & Pick<ProfessionalLiabilityInsuranceCarrier, 'malpracticeType' | 'organizationName' | 'organizationAddressLine1' | 'organizationAddressLine2' | 'organizationCity' | 'organizationState' | 'organizationZip' | 'organizationPhoneNumber' | 'organizationEmailAddress' | 'organizationFaxNumber' | 'contactPersonFirstName' | 'contactPersonLastName' | 'contactPersonRole' | 'contactPersonPhoneNumber' | 'contactPersonEmailAddress' | 'contactPersonFaxNumber'>
    )> }
  )> }
);

export type UpdateProfessionalLiabilityInsuranceCarrierMutationVariables = Exact<{
  input: UpdateProfessionalLiabilityInsuranceCarrierMutationInput;
}>;


export type UpdateProfessionalLiabilityInsuranceCarrierMutation = (
  { __typename?: 'Mutation' }
  & { updateProfessionalLiabilityInsuranceCarrier?: Maybe<(
    { __typename?: 'UpdateProfessionalLiabilityInsuranceCarrierMutationPayload' }
    & { professionalLiabilityInsuranceCarrier?: Maybe<(
      { __typename?: 'ProfessionalLiabilityInsuranceCarrier' }
      & Pick<ProfessionalLiabilityInsuranceCarrier, 'malpracticeType'>
    )> }
  )> }
);

export type GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { professionalLiabilityJudgmentsQuestionnaire?: Maybe<(
      { __typename?: 'ProfessionalLiabilityJudgmentsQuestionnaire' }
      & Pick<ProfessionalLiabilityJudgmentsQuestionnaire, 'judgmentsEntered' | 'liabilityClaimSettlementsPaid' | 'pendingLiabilityActions' | 'anyLegalActionDueToClinicalActions'>
    )> }
  )> }
);

export type UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationVariables = Exact<{
  input: UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationInput;
}>;


export type UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation = (
  { __typename?: 'Mutation' }
  & { updateProfessionalLiabilityJudgmentsQuestionnaire?: Maybe<(
    { __typename?: 'UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationPayload' }
    & { professionalLiabilityJudgmentsQuestionnaire?: Maybe<(
      { __typename?: 'ProfessionalLiabilityJudgmentsQuestionnaire' }
      & Pick<ProfessionalLiabilityJudgmentsQuestionnaire, 'judgmentsEntered'>
    )> }
  )> }
);

export type GetProfessionalLicensesQueryVariables = Exact<{
  kind: ProfessionalLicenseKind;
}>;


export type GetProfessionalLicensesQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'states'>
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { professionalLicenses: Array<(
      { __typename?: 'ProfessionalLicense' }
      & Pick<ProfessionalLicense, 'issuingState' | 'issuingAuthority' | 'number' | 'licenseVerificationUrl' | 'dateOfIssue' | 'expiresAt' | 'status' | 'unrestrictedLicense' | 'nonMedicalLicenseKind'>
    )> }
  )> }
);

export type UpdateProfessionalLicensesMutationVariables = Exact<{
  input: UpdateProfessionalLicensesMutationInput;
}>;


export type UpdateProfessionalLicensesMutation = (
  { __typename?: 'Mutation' }
  & { updateProfessionalLicenses?: Maybe<(
    { __typename?: 'UpdateProfessionalLicensesMutationPayload' }
    & { professionalLicenses?: Maybe<Array<(
      { __typename?: 'ProfessionalLicense' }
      & Pick<ProfessionalLicense, 'status'>
    )>> }
  )> }
);

export type GetSpokenLanguagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSpokenLanguagesQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { spokenLanguages: Array<(
      { __typename?: 'SpokenLanguage' }
      & Pick<SpokenLanguage, 'language' | 'readingProficiency' | 'writingProficiency' | 'speakingProficiency'>
    )> }
  )> }
);

export type UpdateSpokenLanguagesMutationVariables = Exact<{
  input: UpdateSpokenLanguagesMutationInput;
}>;


export type UpdateSpokenLanguagesMutation = (
  { __typename?: 'Mutation' }
  & { updateSpokenLanguages?: Maybe<(
    { __typename?: 'UpdateSpokenLanguagesMutationPayload' }
    & { spokenLanguages?: Maybe<Array<(
      { __typename?: 'SpokenLanguage' }
      & Pick<SpokenLanguage, 'language'>
    )>> }
  )> }
);

export type GetUsmleScoresDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsmleScoresDetailsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { usmleScores?: Maybe<(
      { __typename?: 'USMLEScore' }
      & Pick<UsmleScore, 'usmleIdNumber' | 'step1ExamPassed' | 'step1ExamScore' | 'step1ExamDate' | 'step2ExamPassed' | 'step2ExamScore' | 'step2ExamDate' | 'step3ExamPassed' | 'step3ExamScore' | 'step3ExamDate'>
    )> }
  )> }
);

export type UpdateUsmleScoresMutationVariables = Exact<{
  input: UpdateUsmleScoresMutationInput;
}>;


export type UpdateUsmleScoresMutation = (
  { __typename?: 'Mutation' }
  & { updateUsmleScores?: Maybe<(
    { __typename?: 'UpdateUSMLEScoresMutationPayload' }
    & { usmleScores?: Maybe<(
      { __typename?: 'USMLEScore' }
      & Pick<UsmleScore, 'usmleIdNumber'>
    )> }
  )> }
);

export type GetUsPublicHealthServiceDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsPublicHealthServiceDetailsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { unitedStatesPublicHealthService?: Maybe<(
      { __typename?: 'UnitedStatesPublicHealthService' }
      & Pick<UnitedStatesPublicHealthService, 'startedAt' | 'endedAt'>
    )> }
  )> }
);

export type UpdateUsPublicHealthServiceDetailsMutationVariables = Exact<{
  input: UpdateUnitedStatesPublicHealthServiceMutationInput;
}>;


export type UpdateUsPublicHealthServiceDetailsMutation = (
  { __typename?: 'Mutation' }
  & { updateUnitedStatesPublicHealthService?: Maybe<(
    { __typename?: 'UpdateUnitedStatesPublicHealthServiceMutationPayload' }
    & { service?: Maybe<(
      { __typename?: 'UnitedStatesPublicHealthService' }
      & Pick<UnitedStatesPublicHealthService, 'startedAt'>
    )> }
  )> }
);

export type DeleteUsPublicHealthServiceDetailsMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUsPublicHealthServiceDetailsMutation = (
  { __typename?: 'Mutation' }
  & { deleteUnitedStatesPublicHealthService?: Maybe<(
    { __typename?: 'DeleteUnitedStatesPublicHealthServiceMutationPayload' }
    & Pick<DeleteUnitedStatesPublicHealthServiceMutationPayload, 'success'>
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserMutationInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'UpdateUserMutationPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & BaseUserFieldsFragment
    )> }
  )> }
);

export type CreateJumioIdentityVerificationMutationVariables = Exact<{
  input: CreateJumioIdentityVerificationMutationInput;
}>;


export type CreateJumioIdentityVerificationMutation = (
  { __typename?: 'Mutation' }
  & { createJumioIdentityVerification?: Maybe<(
    { __typename?: 'CreateJumioIdentityVerificationMutationPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & BaseUserFieldsFragment
    )> }
  )> }
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & { lastVerification?: Maybe<(
      { __typename?: 'JumioIdentityVerification' }
      & Pick<JumioIdentityVerification, 'verificationStatus'>
    )> }
    & BaseUserFieldsFragment
  )> }
);

export type GetUserExpirationWarningTimeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserExpirationWarningTimeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'expirationWarningTimeUnits' | 'expirationWarningTime'>
  )> }
);

export type UpdateUserExpirationWarningTimeMutationVariables = Exact<{
  input: UpdateUserMutationInput;
}>;


export type UpdateUserExpirationWarningTimeMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'UpdateUserMutationPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & BaseUserFieldsFragment
    )> }
  )> }
);

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = (
  { __typename?: 'Mutation' }
  & { signOut?: Maybe<(
    { __typename?: 'SignOutMutationPayload' }
    & Pick<SignOutMutationPayload, 'success'>
  )> }
);

export type ShareDocumentsMutationVariables = Exact<{
  input: ShareDocumentsMutationInput;
}>;


export type ShareDocumentsMutation = (
  { __typename?: 'Mutation' }
  & { shareDocuments?: Maybe<(
    { __typename?: 'ShareDocumentsMutationPayload' }
    & { sharingEvent?: Maybe<(
      { __typename?: 'SharingEvent' }
      & Pick<SharingEvent, 'id'>
    )> }
  )> }
);

export type GetAllDocumentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDocumentsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { documents: Array<(
      { __typename?: 'Document' }
      & Pick<Document, 'id' | 'name' | 'category'>
      & { attachment: (
        { __typename?: 'Attachment' }
        & Pick<Attachment, 'id' | 'previewUrl'>
      ) }
    )> }
  )> }
);

export type GetSharingEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSharingEventsQuery = (
  { __typename?: 'Query' }
  & { personalDetails?: Maybe<(
    { __typename?: 'Person' }
    & Pick<Person, 'id'>
    & { sharingEvents: Array<(
      { __typename?: 'SharingEvent' }
      & Pick<SharingEvent, 'id' | 'sentFromEmail' | 'recipientEmails' | 'categoriesIncluded' | 'createdAt' | 'documentSent'>
      & { documents: Array<(
        { __typename?: 'Document' }
        & Pick<Document, 'name'>
      )> }
    )> }
  )> }
);

export type BaseUserFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'authorizationToken' | 'expirationWarningTimeUnits' | 'expirationWarningTime' | 'onboardingStatus'>
);

export const BaseUserFieldsFragmentDoc = gql`
    fragment BaseUserFields on User {
  id
  authorizationToken
  expirationWarningTimeUnits
  expirationWarningTime
  onboardingStatus
}
    `;
export const SignInDocument = gql`
    mutation SignIn($input: SignInMutationInput!) {
  signIn(input: $input) {
    user {
      ...BaseUserFields
    }
  }
}
    ${BaseUserFieldsFragmentDoc}`;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;
export type SignInComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SignInMutation, SignInMutationVariables>, 'mutation'>;

    export const SignInComponent = (props: SignInComponentProps) => (
      <ApolloReactComponents.Mutation<SignInMutation, SignInMutationVariables> mutation={SignInDocument} {...props} />
    );
    
export type SignInProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<SignInMutation, SignInMutationVariables>
    } & TChildProps;
export function withSignIn<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SignInMutation,
  SignInMutationVariables,
  SignInProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, SignInMutation, SignInMutationVariables, SignInProps<TChildProps, TDataName>>(SignInDocument, {
      alias: 'signIn',
      ...operationOptions
    });
};

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpMutationInput!) {
  signUp(input: $input) {
    user {
      ...BaseUserFields
    }
  }
}
    ${BaseUserFieldsFragmentDoc}`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;
export type SignUpComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SignUpMutation, SignUpMutationVariables>, 'mutation'>;

    export const SignUpComponent = (props: SignUpComponentProps) => (
      <ApolloReactComponents.Mutation<SignUpMutation, SignUpMutationVariables> mutation={SignUpDocument} {...props} />
    );
    
export type SignUpProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>
    } & TChildProps;
export function withSignUp<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SignUpMutation,
  SignUpMutationVariables,
  SignUpProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, SignUpMutation, SignUpMutationVariables, SignUpProps<TChildProps, TDataName>>(SignUpDocument, {
      alias: 'signUp',
      ...operationOptions
    });
};

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const CreateDocumentDocument = gql`
    mutation CreateDocument($input: CreateDocumentMutationInput!) {
  createDocument(input: $input) {
    document {
      id
    }
  }
}
    `;
export type CreateDocumentMutationFn = Apollo.MutationFunction<CreateDocumentMutation, CreateDocumentMutationVariables>;
export type CreateDocumentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateDocumentMutation, CreateDocumentMutationVariables>, 'mutation'>;

    export const CreateDocumentComponent = (props: CreateDocumentComponentProps) => (
      <ApolloReactComponents.Mutation<CreateDocumentMutation, CreateDocumentMutationVariables> mutation={CreateDocumentDocument} {...props} />
    );
    
export type CreateDocumentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<CreateDocumentMutation, CreateDocumentMutationVariables>
    } & TChildProps;
export function withCreateDocument<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateDocumentMutation,
  CreateDocumentMutationVariables,
  CreateDocumentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateDocumentMutation, CreateDocumentMutationVariables, CreateDocumentProps<TChildProps, TDataName>>(CreateDocumentDocument, {
      alias: 'createDocument',
      ...operationOptions
    });
};

/**
 * __useCreateDocumentMutation__
 *
 * To run a mutation, you first call `useCreateDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDocumentMutation, { data, loading, error }] = useCreateDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDocumentMutation(baseOptions?: Apollo.MutationHookOptions<CreateDocumentMutation, CreateDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDocumentMutation, CreateDocumentMutationVariables>(CreateDocumentDocument, options);
      }
export type CreateDocumentMutationHookResult = ReturnType<typeof useCreateDocumentMutation>;
export type CreateDocumentMutationResult = Apollo.MutationResult<CreateDocumentMutation>;
export type CreateDocumentMutationOptions = Apollo.BaseMutationOptions<CreateDocumentMutation, CreateDocumentMutationVariables>;
export const GetCategoryMenuDataDocument = gql`
    query GetCategoryMenuData($profileSections: [ProfileSectionEnum!]!) {
  personalDetails {
    id
    expirationsByProfileSection {
      id
      count
    }
    formCompletions(profileSections: $profileSections) {
      id
      profileSection
      status
    }
  }
}
    `;
export type GetCategoryMenuDataComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCategoryMenuDataQuery, GetCategoryMenuDataQueryVariables>, 'query'> & ({ variables: GetCategoryMenuDataQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetCategoryMenuDataComponent = (props: GetCategoryMenuDataComponentProps) => (
      <ApolloReactComponents.Query<GetCategoryMenuDataQuery, GetCategoryMenuDataQueryVariables> query={GetCategoryMenuDataDocument} {...props} />
    );
    
export type GetCategoryMenuDataProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetCategoryMenuDataQuery, GetCategoryMenuDataQueryVariables>
    } & TChildProps;
export function withGetCategoryMenuData<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetCategoryMenuDataQuery,
  GetCategoryMenuDataQueryVariables,
  GetCategoryMenuDataProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetCategoryMenuDataQuery, GetCategoryMenuDataQueryVariables, GetCategoryMenuDataProps<TChildProps, TDataName>>(GetCategoryMenuDataDocument, {
      alias: 'getCategoryMenuData',
      ...operationOptions
    });
};

/**
 * __useGetCategoryMenuDataQuery__
 *
 * To run a query within a React component, call `useGetCategoryMenuDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryMenuDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryMenuDataQuery({
 *   variables: {
 *      profileSections: // value for 'profileSections'
 *   },
 * });
 */
export function useGetCategoryMenuDataQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryMenuDataQuery, GetCategoryMenuDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryMenuDataQuery, GetCategoryMenuDataQueryVariables>(GetCategoryMenuDataDocument, options);
      }
export function useGetCategoryMenuDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryMenuDataQuery, GetCategoryMenuDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryMenuDataQuery, GetCategoryMenuDataQueryVariables>(GetCategoryMenuDataDocument, options);
        }
export type GetCategoryMenuDataQueryHookResult = ReturnType<typeof useGetCategoryMenuDataQuery>;
export type GetCategoryMenuDataLazyQueryHookResult = ReturnType<typeof useGetCategoryMenuDataLazyQuery>;
export type GetCategoryMenuDataQueryResult = Apollo.QueryResult<GetCategoryMenuDataQuery, GetCategoryMenuDataQueryVariables>;
export const GetDocumentsDocument = gql`
    query GetDocuments($category: DocumentCategoryEnum!, $profileSection: ProfileSectionEnum!) {
  personalDetails {
    id
    documents(category: $category, profileSection: $profileSection) {
      id
      name
      expiresAt
      attachment {
        id
        previewUrl
      }
    }
  }
}
    `;
export type GetDocumentsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetDocumentsQuery, GetDocumentsQueryVariables>, 'query'> & ({ variables: GetDocumentsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetDocumentsComponent = (props: GetDocumentsComponentProps) => (
      <ApolloReactComponents.Query<GetDocumentsQuery, GetDocumentsQueryVariables> query={GetDocumentsDocument} {...props} />
    );
    
export type GetDocumentsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetDocumentsQuery, GetDocumentsQueryVariables>
    } & TChildProps;
export function withGetDocuments<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetDocumentsQuery,
  GetDocumentsQueryVariables,
  GetDocumentsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetDocumentsQuery, GetDocumentsQueryVariables, GetDocumentsProps<TChildProps, TDataName>>(GetDocumentsDocument, {
      alias: 'getDocuments',
      ...operationOptions
    });
};

/**
 * __useGetDocumentsQuery__
 *
 * To run a query within a React component, call `useGetDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentsQuery({
 *   variables: {
 *      category: // value for 'category'
 *      profileSection: // value for 'profileSection'
 *   },
 * });
 */
export function useGetDocumentsQuery(baseOptions: Apollo.QueryHookOptions<GetDocumentsQuery, GetDocumentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentsQuery, GetDocumentsQueryVariables>(GetDocumentsDocument, options);
      }
export function useGetDocumentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDocumentsQuery, GetDocumentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentsQuery, GetDocumentsQueryVariables>(GetDocumentsDocument, options);
        }
export type GetDocumentsQueryHookResult = ReturnType<typeof useGetDocumentsQuery>;
export type GetDocumentsLazyQueryHookResult = ReturnType<typeof useGetDocumentsLazyQuery>;
export type GetDocumentsQueryResult = Apollo.QueryResult<GetDocumentsQuery, GetDocumentsQueryVariables>;
export const GetDocumentDocument = gql`
    query GetDocument($id: ID!) {
  personalDetails {
    id
    document(id: $id) {
      id
      name
      category
      expiresAt
      kind
      otherKind
      profileSection
      attachment {
        id
        previewUrl
        url
        contentType
      }
    }
  }
}
    `;
export type GetDocumentComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetDocumentQuery, GetDocumentQueryVariables>, 'query'> & ({ variables: GetDocumentQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetDocumentComponent = (props: GetDocumentComponentProps) => (
      <ApolloReactComponents.Query<GetDocumentQuery, GetDocumentQueryVariables> query={GetDocumentDocument} {...props} />
    );
    
export type GetDocumentProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetDocumentQuery, GetDocumentQueryVariables>
    } & TChildProps;
export function withGetDocument<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetDocumentQuery,
  GetDocumentQueryVariables,
  GetDocumentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetDocumentQuery, GetDocumentQueryVariables, GetDocumentProps<TChildProps, TDataName>>(GetDocumentDocument, {
      alias: 'getDocument',
      ...operationOptions
    });
};

/**
 * __useGetDocumentQuery__
 *
 * To run a query within a React component, call `useGetDocumentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDocumentQuery(baseOptions: Apollo.QueryHookOptions<GetDocumentQuery, GetDocumentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDocumentQuery, GetDocumentQueryVariables>(GetDocumentDocument, options);
      }
export function useGetDocumentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDocumentQuery, GetDocumentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDocumentQuery, GetDocumentQueryVariables>(GetDocumentDocument, options);
        }
export type GetDocumentQueryHookResult = ReturnType<typeof useGetDocumentQuery>;
export type GetDocumentLazyQueryHookResult = ReturnType<typeof useGetDocumentLazyQuery>;
export type GetDocumentQueryResult = Apollo.QueryResult<GetDocumentQuery, GetDocumentQueryVariables>;
export const UpdateDocumentDocument = gql`
    mutation UpdateDocument($input: UpdateDocumentMutationInput!) {
  updateDocument(input: $input) {
    document {
      id
      attachment {
        id
      }
    }
  }
}
    `;
export type UpdateDocumentMutationFn = Apollo.MutationFunction<UpdateDocumentMutation, UpdateDocumentMutationVariables>;
export type UpdateDocumentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateDocumentMutation, UpdateDocumentMutationVariables>, 'mutation'>;

    export const UpdateDocumentComponent = (props: UpdateDocumentComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateDocumentMutation, UpdateDocumentMutationVariables> mutation={UpdateDocumentDocument} {...props} />
    );
    
export type UpdateDocumentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateDocumentMutation, UpdateDocumentMutationVariables>
    } & TChildProps;
export function withUpdateDocument<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateDocumentMutation,
  UpdateDocumentMutationVariables,
  UpdateDocumentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateDocumentMutation, UpdateDocumentMutationVariables, UpdateDocumentProps<TChildProps, TDataName>>(UpdateDocumentDocument, {
      alias: 'updateDocument',
      ...operationOptions
    });
};

/**
 * __useUpdateDocumentMutation__
 *
 * To run a mutation, you first call `useUpdateDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDocumentMutation, { data, loading, error }] = useUpdateDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDocumentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDocumentMutation, UpdateDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDocumentMutation, UpdateDocumentMutationVariables>(UpdateDocumentDocument, options);
      }
export type UpdateDocumentMutationHookResult = ReturnType<typeof useUpdateDocumentMutation>;
export type UpdateDocumentMutationResult = Apollo.MutationResult<UpdateDocumentMutation>;
export type UpdateDocumentMutationOptions = Apollo.BaseMutationOptions<UpdateDocumentMutation, UpdateDocumentMutationVariables>;
export const DeleteDocumentDocument = gql`
    mutation DeleteDocument($input: DeleteDocumentMutationInput!) {
  deleteDocument(input: $input) {
    id
  }
}
    `;
export type DeleteDocumentMutationFn = Apollo.MutationFunction<DeleteDocumentMutation, DeleteDocumentMutationVariables>;
export type DeleteDocumentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteDocumentMutation, DeleteDocumentMutationVariables>, 'mutation'>;

    export const DeleteDocumentComponent = (props: DeleteDocumentComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteDocumentMutation, DeleteDocumentMutationVariables> mutation={DeleteDocumentDocument} {...props} />
    );
    
export type DeleteDocumentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<DeleteDocumentMutation, DeleteDocumentMutationVariables>
    } & TChildProps;
export function withDeleteDocument<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteDocumentMutation,
  DeleteDocumentMutationVariables,
  DeleteDocumentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteDocumentMutation, DeleteDocumentMutationVariables, DeleteDocumentProps<TChildProps, TDataName>>(DeleteDocumentDocument, {
      alias: 'deleteDocument',
      ...operationOptions
    });
};

/**
 * __useDeleteDocumentMutation__
 *
 * To run a mutation, you first call `useDeleteDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDocumentMutation, { data, loading, error }] = useDeleteDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteDocumentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDocumentMutation, DeleteDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDocumentMutation, DeleteDocumentMutationVariables>(DeleteDocumentDocument, options);
      }
export type DeleteDocumentMutationHookResult = ReturnType<typeof useDeleteDocumentMutation>;
export type DeleteDocumentMutationResult = Apollo.MutationResult<DeleteDocumentMutation>;
export type DeleteDocumentMutationOptions = Apollo.BaseMutationOptions<DeleteDocumentMutation, DeleteDocumentMutationVariables>;
export const UpdateFormCompletionStatusDocument = gql`
    mutation UpdateFormCompletionStatus($input: UpdateFormCompletionStatusMutationInput!) {
  updateFormCompletionStatus(input: $input) {
    formCompletion {
      id
    }
  }
}
    `;
export type UpdateFormCompletionStatusMutationFn = Apollo.MutationFunction<UpdateFormCompletionStatusMutation, UpdateFormCompletionStatusMutationVariables>;
export type UpdateFormCompletionStatusComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateFormCompletionStatusMutation, UpdateFormCompletionStatusMutationVariables>, 'mutation'>;

    export const UpdateFormCompletionStatusComponent = (props: UpdateFormCompletionStatusComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateFormCompletionStatusMutation, UpdateFormCompletionStatusMutationVariables> mutation={UpdateFormCompletionStatusDocument} {...props} />
    );
    
export type UpdateFormCompletionStatusProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateFormCompletionStatusMutation, UpdateFormCompletionStatusMutationVariables>
    } & TChildProps;
export function withUpdateFormCompletionStatus<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateFormCompletionStatusMutation,
  UpdateFormCompletionStatusMutationVariables,
  UpdateFormCompletionStatusProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateFormCompletionStatusMutation, UpdateFormCompletionStatusMutationVariables, UpdateFormCompletionStatusProps<TChildProps, TDataName>>(UpdateFormCompletionStatusDocument, {
      alias: 'updateFormCompletionStatus',
      ...operationOptions
    });
};

/**
 * __useUpdateFormCompletionStatusMutation__
 *
 * To run a mutation, you first call `useUpdateFormCompletionStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFormCompletionStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFormCompletionStatusMutation, { data, loading, error }] = useUpdateFormCompletionStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFormCompletionStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFormCompletionStatusMutation, UpdateFormCompletionStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFormCompletionStatusMutation, UpdateFormCompletionStatusMutationVariables>(UpdateFormCompletionStatusDocument, options);
      }
export type UpdateFormCompletionStatusMutationHookResult = ReturnType<typeof useUpdateFormCompletionStatusMutation>;
export type UpdateFormCompletionStatusMutationResult = Apollo.MutationResult<UpdateFormCompletionStatusMutation>;
export type UpdateFormCompletionStatusMutationOptions = Apollo.BaseMutationOptions<UpdateFormCompletionStatusMutation, UpdateFormCompletionStatusMutationVariables>;
export const GetFormCompletionStatusDocument = gql`
    query GetFormCompletionStatus($profileSection: ProfileSectionEnum!) {
  personalDetails {
    id
    formCompletion(profileSection: $profileSection) {
      id
      status
    }
  }
}
    `;
export type GetFormCompletionStatusComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetFormCompletionStatusQuery, GetFormCompletionStatusQueryVariables>, 'query'> & ({ variables: GetFormCompletionStatusQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetFormCompletionStatusComponent = (props: GetFormCompletionStatusComponentProps) => (
      <ApolloReactComponents.Query<GetFormCompletionStatusQuery, GetFormCompletionStatusQueryVariables> query={GetFormCompletionStatusDocument} {...props} />
    );
    
export type GetFormCompletionStatusProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetFormCompletionStatusQuery, GetFormCompletionStatusQueryVariables>
    } & TChildProps;
export function withGetFormCompletionStatus<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetFormCompletionStatusQuery,
  GetFormCompletionStatusQueryVariables,
  GetFormCompletionStatusProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetFormCompletionStatusQuery, GetFormCompletionStatusQueryVariables, GetFormCompletionStatusProps<TChildProps, TDataName>>(GetFormCompletionStatusDocument, {
      alias: 'getFormCompletionStatus',
      ...operationOptions
    });
};

/**
 * __useGetFormCompletionStatusQuery__
 *
 * To run a query within a React component, call `useGetFormCompletionStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFormCompletionStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFormCompletionStatusQuery({
 *   variables: {
 *      profileSection: // value for 'profileSection'
 *   },
 * });
 */
export function useGetFormCompletionStatusQuery(baseOptions: Apollo.QueryHookOptions<GetFormCompletionStatusQuery, GetFormCompletionStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFormCompletionStatusQuery, GetFormCompletionStatusQueryVariables>(GetFormCompletionStatusDocument, options);
      }
export function useGetFormCompletionStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFormCompletionStatusQuery, GetFormCompletionStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFormCompletionStatusQuery, GetFormCompletionStatusQueryVariables>(GetFormCompletionStatusDocument, options);
        }
export type GetFormCompletionStatusQueryHookResult = ReturnType<typeof useGetFormCompletionStatusQuery>;
export type GetFormCompletionStatusLazyQueryHookResult = ReturnType<typeof useGetFormCompletionStatusLazyQuery>;
export type GetFormCompletionStatusQueryResult = Apollo.QueryResult<GetFormCompletionStatusQuery, GetFormCompletionStatusQueryVariables>;
export const GetMenuDataByCategoryDocument = gql`
    query GetMenuDataByCategory {
  personalDetails {
    id
    expirationsByCategory {
      id
      count
    }
    formCompletionByCategory {
      id
      count
    }
  }
}
    `;
export type GetMenuDataByCategoryComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMenuDataByCategoryQuery, GetMenuDataByCategoryQueryVariables>, 'query'>;

    export const GetMenuDataByCategoryComponent = (props: GetMenuDataByCategoryComponentProps) => (
      <ApolloReactComponents.Query<GetMenuDataByCategoryQuery, GetMenuDataByCategoryQueryVariables> query={GetMenuDataByCategoryDocument} {...props} />
    );
    
export type GetMenuDataByCategoryProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetMenuDataByCategoryQuery, GetMenuDataByCategoryQueryVariables>
    } & TChildProps;
export function withGetMenuDataByCategory<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMenuDataByCategoryQuery,
  GetMenuDataByCategoryQueryVariables,
  GetMenuDataByCategoryProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetMenuDataByCategoryQuery, GetMenuDataByCategoryQueryVariables, GetMenuDataByCategoryProps<TChildProps, TDataName>>(GetMenuDataByCategoryDocument, {
      alias: 'getMenuDataByCategory',
      ...operationOptions
    });
};

/**
 * __useGetMenuDataByCategoryQuery__
 *
 * To run a query within a React component, call `useGetMenuDataByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMenuDataByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMenuDataByCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMenuDataByCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetMenuDataByCategoryQuery, GetMenuDataByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMenuDataByCategoryQuery, GetMenuDataByCategoryQueryVariables>(GetMenuDataByCategoryDocument, options);
      }
export function useGetMenuDataByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMenuDataByCategoryQuery, GetMenuDataByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMenuDataByCategoryQuery, GetMenuDataByCategoryQueryVariables>(GetMenuDataByCategoryDocument, options);
        }
export type GetMenuDataByCategoryQueryHookResult = ReturnType<typeof useGetMenuDataByCategoryQuery>;
export type GetMenuDataByCategoryLazyQueryHookResult = ReturnType<typeof useGetMenuDataByCategoryLazyQuery>;
export type GetMenuDataByCategoryQueryResult = Apollo.QueryResult<GetMenuDataByCategoryQuery, GetMenuDataByCategoryQueryVariables>;
export const GetAcademicAppointmentsDocument = gql`
    query GetAcademicAppointments {
  personalDetails {
    id
    academicAppointments {
      position
      institutionName
      institutionUrl
      addressLine1
      addressLine2
      city
      state
      zip
      country
      phoneNumber
      faxNumber
      departmentHeadFirstName
      departmentHeadLastName
      startedAt
      endedAt
    }
  }
  states
  countries
}
    `;
export type GetAcademicAppointmentsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAcademicAppointmentsQuery, GetAcademicAppointmentsQueryVariables>, 'query'>;

    export const GetAcademicAppointmentsComponent = (props: GetAcademicAppointmentsComponentProps) => (
      <ApolloReactComponents.Query<GetAcademicAppointmentsQuery, GetAcademicAppointmentsQueryVariables> query={GetAcademicAppointmentsDocument} {...props} />
    );
    
export type GetAcademicAppointmentsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetAcademicAppointmentsQuery, GetAcademicAppointmentsQueryVariables>
    } & TChildProps;
export function withGetAcademicAppointments<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAcademicAppointmentsQuery,
  GetAcademicAppointmentsQueryVariables,
  GetAcademicAppointmentsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetAcademicAppointmentsQuery, GetAcademicAppointmentsQueryVariables, GetAcademicAppointmentsProps<TChildProps, TDataName>>(GetAcademicAppointmentsDocument, {
      alias: 'getAcademicAppointments',
      ...operationOptions
    });
};

/**
 * __useGetAcademicAppointmentsQuery__
 *
 * To run a query within a React component, call `useGetAcademicAppointmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAcademicAppointmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAcademicAppointmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAcademicAppointmentsQuery(baseOptions?: Apollo.QueryHookOptions<GetAcademicAppointmentsQuery, GetAcademicAppointmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAcademicAppointmentsQuery, GetAcademicAppointmentsQueryVariables>(GetAcademicAppointmentsDocument, options);
      }
export function useGetAcademicAppointmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAcademicAppointmentsQuery, GetAcademicAppointmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAcademicAppointmentsQuery, GetAcademicAppointmentsQueryVariables>(GetAcademicAppointmentsDocument, options);
        }
export type GetAcademicAppointmentsQueryHookResult = ReturnType<typeof useGetAcademicAppointmentsQuery>;
export type GetAcademicAppointmentsLazyQueryHookResult = ReturnType<typeof useGetAcademicAppointmentsLazyQuery>;
export type GetAcademicAppointmentsQueryResult = Apollo.QueryResult<GetAcademicAppointmentsQuery, GetAcademicAppointmentsQueryVariables>;
export const UpdateAcademicAppointmentsDocument = gql`
    mutation UpdateAcademicAppointments($input: UpdateAcademicAppointmentsMutationInput!) {
  updateAcademicAppointments(input: $input) {
    academicAppointments {
      institutionName
    }
  }
}
    `;
export type UpdateAcademicAppointmentsMutationFn = Apollo.MutationFunction<UpdateAcademicAppointmentsMutation, UpdateAcademicAppointmentsMutationVariables>;
export type UpdateAcademicAppointmentsComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateAcademicAppointmentsMutation, UpdateAcademicAppointmentsMutationVariables>, 'mutation'>;

    export const UpdateAcademicAppointmentsComponent = (props: UpdateAcademicAppointmentsComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateAcademicAppointmentsMutation, UpdateAcademicAppointmentsMutationVariables> mutation={UpdateAcademicAppointmentsDocument} {...props} />
    );
    
export type UpdateAcademicAppointmentsProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateAcademicAppointmentsMutation, UpdateAcademicAppointmentsMutationVariables>
    } & TChildProps;
export function withUpdateAcademicAppointments<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateAcademicAppointmentsMutation,
  UpdateAcademicAppointmentsMutationVariables,
  UpdateAcademicAppointmentsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateAcademicAppointmentsMutation, UpdateAcademicAppointmentsMutationVariables, UpdateAcademicAppointmentsProps<TChildProps, TDataName>>(UpdateAcademicAppointmentsDocument, {
      alias: 'updateAcademicAppointments',
      ...operationOptions
    });
};

/**
 * __useUpdateAcademicAppointmentsMutation__
 *
 * To run a mutation, you first call `useUpdateAcademicAppointmentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAcademicAppointmentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAcademicAppointmentsMutation, { data, loading, error }] = useUpdateAcademicAppointmentsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAcademicAppointmentsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAcademicAppointmentsMutation, UpdateAcademicAppointmentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAcademicAppointmentsMutation, UpdateAcademicAppointmentsMutationVariables>(UpdateAcademicAppointmentsDocument, options);
      }
export type UpdateAcademicAppointmentsMutationHookResult = ReturnType<typeof useUpdateAcademicAppointmentsMutation>;
export type UpdateAcademicAppointmentsMutationResult = Apollo.MutationResult<UpdateAcademicAppointmentsMutation>;
export type UpdateAcademicAppointmentsMutationOptions = Apollo.BaseMutationOptions<UpdateAcademicAppointmentsMutation, UpdateAcademicAppointmentsMutationVariables>;
export const GetAddressesDocument = gql`
    query GetAddresses {
  personalDetails {
    id
    homeAddressLine1
    homeAddressLine2
    homeAddressLine3
    homeAddressCity
    homeAddressState
    homeAddressZip
    homeAddressCountry
    mailingAddressSameAsHome
    mailingAddressLine1
    mailingAddressLine2
    mailingAddressLine3
    mailingAddressCity
    mailingAddressState
    mailingAddressZip
    mailingAddressCountry
  }
}
    `;
export type GetAddressesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAddressesQuery, GetAddressesQueryVariables>, 'query'>;

    export const GetAddressesComponent = (props: GetAddressesComponentProps) => (
      <ApolloReactComponents.Query<GetAddressesQuery, GetAddressesQueryVariables> query={GetAddressesDocument} {...props} />
    );
    
export type GetAddressesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetAddressesQuery, GetAddressesQueryVariables>
    } & TChildProps;
export function withGetAddresses<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAddressesQuery,
  GetAddressesQueryVariables,
  GetAddressesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetAddressesQuery, GetAddressesQueryVariables, GetAddressesProps<TChildProps, TDataName>>(GetAddressesDocument, {
      alias: 'getAddresses',
      ...operationOptions
    });
};

/**
 * __useGetAddressesQuery__
 *
 * To run a query within a React component, call `useGetAddressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAddressesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAddressesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAddressesQuery(baseOptions?: Apollo.QueryHookOptions<GetAddressesQuery, GetAddressesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAddressesQuery, GetAddressesQueryVariables>(GetAddressesDocument, options);
      }
export function useGetAddressesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAddressesQuery, GetAddressesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAddressesQuery, GetAddressesQueryVariables>(GetAddressesDocument, options);
        }
export type GetAddressesQueryHookResult = ReturnType<typeof useGetAddressesQuery>;
export type GetAddressesLazyQueryHookResult = ReturnType<typeof useGetAddressesLazyQuery>;
export type GetAddressesQueryResult = Apollo.QueryResult<GetAddressesQuery, GetAddressesQueryVariables>;
export const UpdateAddressesDocument = gql`
    mutation UpdateAddresses($input: UpdateAddressesMutationInput!) {
  updateAddresses(input: $input) {
    personalDetails {
      id
      homeAddressLine1
    }
  }
}
    `;
export type UpdateAddressesMutationFn = Apollo.MutationFunction<UpdateAddressesMutation, UpdateAddressesMutationVariables>;
export type UpdateAddressesComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateAddressesMutation, UpdateAddressesMutationVariables>, 'mutation'>;

    export const UpdateAddressesComponent = (props: UpdateAddressesComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateAddressesMutation, UpdateAddressesMutationVariables> mutation={UpdateAddressesDocument} {...props} />
    );
    
export type UpdateAddressesProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateAddressesMutation, UpdateAddressesMutationVariables>
    } & TChildProps;
export function withUpdateAddresses<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateAddressesMutation,
  UpdateAddressesMutationVariables,
  UpdateAddressesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateAddressesMutation, UpdateAddressesMutationVariables, UpdateAddressesProps<TChildProps, TDataName>>(UpdateAddressesDocument, {
      alias: 'updateAddresses',
      ...operationOptions
    });
};

/**
 * __useUpdateAddressesMutation__
 *
 * To run a mutation, you first call `useUpdateAddressesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressesMutation, { data, loading, error }] = useUpdateAddressesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAddressesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAddressesMutation, UpdateAddressesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAddressesMutation, UpdateAddressesMutationVariables>(UpdateAddressesDocument, options);
      }
export type UpdateAddressesMutationHookResult = ReturnType<typeof useUpdateAddressesMutation>;
export type UpdateAddressesMutationResult = Apollo.MutationResult<UpdateAddressesMutation>;
export type UpdateAddressesMutationOptions = Apollo.BaseMutationOptions<UpdateAddressesMutation, UpdateAddressesMutationVariables>;
export const GetAdministrativeLeadershipPositionsDocument = gql`
    query GetAdministrativeLeadershipPositions {
  personalDetails {
    id
    administrativeLeadershipPositions {
      title
      startedAt
      endedAt
    }
  }
}
    `;
export type GetAdministrativeLeadershipPositionsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAdministrativeLeadershipPositionsQuery, GetAdministrativeLeadershipPositionsQueryVariables>, 'query'>;

    export const GetAdministrativeLeadershipPositionsComponent = (props: GetAdministrativeLeadershipPositionsComponentProps) => (
      <ApolloReactComponents.Query<GetAdministrativeLeadershipPositionsQuery, GetAdministrativeLeadershipPositionsQueryVariables> query={GetAdministrativeLeadershipPositionsDocument} {...props} />
    );
    
export type GetAdministrativeLeadershipPositionsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetAdministrativeLeadershipPositionsQuery, GetAdministrativeLeadershipPositionsQueryVariables>
    } & TChildProps;
export function withGetAdministrativeLeadershipPositions<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAdministrativeLeadershipPositionsQuery,
  GetAdministrativeLeadershipPositionsQueryVariables,
  GetAdministrativeLeadershipPositionsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetAdministrativeLeadershipPositionsQuery, GetAdministrativeLeadershipPositionsQueryVariables, GetAdministrativeLeadershipPositionsProps<TChildProps, TDataName>>(GetAdministrativeLeadershipPositionsDocument, {
      alias: 'getAdministrativeLeadershipPositions',
      ...operationOptions
    });
};

/**
 * __useGetAdministrativeLeadershipPositionsQuery__
 *
 * To run a query within a React component, call `useGetAdministrativeLeadershipPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdministrativeLeadershipPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdministrativeLeadershipPositionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdministrativeLeadershipPositionsQuery(baseOptions?: Apollo.QueryHookOptions<GetAdministrativeLeadershipPositionsQuery, GetAdministrativeLeadershipPositionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdministrativeLeadershipPositionsQuery, GetAdministrativeLeadershipPositionsQueryVariables>(GetAdministrativeLeadershipPositionsDocument, options);
      }
export function useGetAdministrativeLeadershipPositionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdministrativeLeadershipPositionsQuery, GetAdministrativeLeadershipPositionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdministrativeLeadershipPositionsQuery, GetAdministrativeLeadershipPositionsQueryVariables>(GetAdministrativeLeadershipPositionsDocument, options);
        }
export type GetAdministrativeLeadershipPositionsQueryHookResult = ReturnType<typeof useGetAdministrativeLeadershipPositionsQuery>;
export type GetAdministrativeLeadershipPositionsLazyQueryHookResult = ReturnType<typeof useGetAdministrativeLeadershipPositionsLazyQuery>;
export type GetAdministrativeLeadershipPositionsQueryResult = Apollo.QueryResult<GetAdministrativeLeadershipPositionsQuery, GetAdministrativeLeadershipPositionsQueryVariables>;
export const UpdateAdministrativeLeadershipPositionsDocument = gql`
    mutation UpdateAdministrativeLeadershipPositions($input: UpdateAdministrativeLeadershipPositionsMutationInput!) {
  updateAdministrativeLeadershipPositions(input: $input) {
    administrativeLeadershipPositions {
      title
    }
  }
}
    `;
export type UpdateAdministrativeLeadershipPositionsMutationFn = Apollo.MutationFunction<UpdateAdministrativeLeadershipPositionsMutation, UpdateAdministrativeLeadershipPositionsMutationVariables>;
export type UpdateAdministrativeLeadershipPositionsComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateAdministrativeLeadershipPositionsMutation, UpdateAdministrativeLeadershipPositionsMutationVariables>, 'mutation'>;

    export const UpdateAdministrativeLeadershipPositionsComponent = (props: UpdateAdministrativeLeadershipPositionsComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateAdministrativeLeadershipPositionsMutation, UpdateAdministrativeLeadershipPositionsMutationVariables> mutation={UpdateAdministrativeLeadershipPositionsDocument} {...props} />
    );
    
export type UpdateAdministrativeLeadershipPositionsProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateAdministrativeLeadershipPositionsMutation, UpdateAdministrativeLeadershipPositionsMutationVariables>
    } & TChildProps;
export function withUpdateAdministrativeLeadershipPositions<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateAdministrativeLeadershipPositionsMutation,
  UpdateAdministrativeLeadershipPositionsMutationVariables,
  UpdateAdministrativeLeadershipPositionsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateAdministrativeLeadershipPositionsMutation, UpdateAdministrativeLeadershipPositionsMutationVariables, UpdateAdministrativeLeadershipPositionsProps<TChildProps, TDataName>>(UpdateAdministrativeLeadershipPositionsDocument, {
      alias: 'updateAdministrativeLeadershipPositions',
      ...operationOptions
    });
};

/**
 * __useUpdateAdministrativeLeadershipPositionsMutation__
 *
 * To run a mutation, you first call `useUpdateAdministrativeLeadershipPositionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAdministrativeLeadershipPositionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAdministrativeLeadershipPositionsMutation, { data, loading, error }] = useUpdateAdministrativeLeadershipPositionsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAdministrativeLeadershipPositionsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAdministrativeLeadershipPositionsMutation, UpdateAdministrativeLeadershipPositionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAdministrativeLeadershipPositionsMutation, UpdateAdministrativeLeadershipPositionsMutationVariables>(UpdateAdministrativeLeadershipPositionsDocument, options);
      }
export type UpdateAdministrativeLeadershipPositionsMutationHookResult = ReturnType<typeof useUpdateAdministrativeLeadershipPositionsMutation>;
export type UpdateAdministrativeLeadershipPositionsMutationResult = Apollo.MutationResult<UpdateAdministrativeLeadershipPositionsMutation>;
export type UpdateAdministrativeLeadershipPositionsMutationOptions = Apollo.BaseMutationOptions<UpdateAdministrativeLeadershipPositionsMutation, UpdateAdministrativeLeadershipPositionsMutationVariables>;
export const GetBirthAndCitizenshipDetailsDocument = gql`
    query GetBirthAndCitizenshipDetails {
  personalDetails {
    id
    countryOfCitizenship
    dateOfBirth
    placeOfBirthCity
    placeOfBirthState
    placeOfBirthCountry
    visaType
    visaNumber
    visaStatus
    visaExpiresAt
    usPermanentResident
  }
  countries
}
    `;
export type GetBirthAndCitizenshipDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetBirthAndCitizenshipDetailsQuery, GetBirthAndCitizenshipDetailsQueryVariables>, 'query'>;

    export const GetBirthAndCitizenshipDetailsComponent = (props: GetBirthAndCitizenshipDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetBirthAndCitizenshipDetailsQuery, GetBirthAndCitizenshipDetailsQueryVariables> query={GetBirthAndCitizenshipDetailsDocument} {...props} />
    );
    
export type GetBirthAndCitizenshipDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetBirthAndCitizenshipDetailsQuery, GetBirthAndCitizenshipDetailsQueryVariables>
    } & TChildProps;
export function withGetBirthAndCitizenshipDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetBirthAndCitizenshipDetailsQuery,
  GetBirthAndCitizenshipDetailsQueryVariables,
  GetBirthAndCitizenshipDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetBirthAndCitizenshipDetailsQuery, GetBirthAndCitizenshipDetailsQueryVariables, GetBirthAndCitizenshipDetailsProps<TChildProps, TDataName>>(GetBirthAndCitizenshipDetailsDocument, {
      alias: 'getBirthAndCitizenshipDetails',
      ...operationOptions
    });
};

/**
 * __useGetBirthAndCitizenshipDetailsQuery__
 *
 * To run a query within a React component, call `useGetBirthAndCitizenshipDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBirthAndCitizenshipDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBirthAndCitizenshipDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBirthAndCitizenshipDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetBirthAndCitizenshipDetailsQuery, GetBirthAndCitizenshipDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBirthAndCitizenshipDetailsQuery, GetBirthAndCitizenshipDetailsQueryVariables>(GetBirthAndCitizenshipDetailsDocument, options);
      }
export function useGetBirthAndCitizenshipDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBirthAndCitizenshipDetailsQuery, GetBirthAndCitizenshipDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBirthAndCitizenshipDetailsQuery, GetBirthAndCitizenshipDetailsQueryVariables>(GetBirthAndCitizenshipDetailsDocument, options);
        }
export type GetBirthAndCitizenshipDetailsQueryHookResult = ReturnType<typeof useGetBirthAndCitizenshipDetailsQuery>;
export type GetBirthAndCitizenshipDetailsLazyQueryHookResult = ReturnType<typeof useGetBirthAndCitizenshipDetailsLazyQuery>;
export type GetBirthAndCitizenshipDetailsQueryResult = Apollo.QueryResult<GetBirthAndCitizenshipDetailsQuery, GetBirthAndCitizenshipDetailsQueryVariables>;
export const UpdateBirthAndCitizenshipDocument = gql`
    mutation UpdateBirthAndCitizenship($input: UpdateBirthAndCitizenshipMutationInput!) {
  updateBirthAndCitizenship(input: $input) {
    personalDetails {
      id
      dateOfBirth
    }
  }
}
    `;
export type UpdateBirthAndCitizenshipMutationFn = Apollo.MutationFunction<UpdateBirthAndCitizenshipMutation, UpdateBirthAndCitizenshipMutationVariables>;
export type UpdateBirthAndCitizenshipComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateBirthAndCitizenshipMutation, UpdateBirthAndCitizenshipMutationVariables>, 'mutation'>;

    export const UpdateBirthAndCitizenshipComponent = (props: UpdateBirthAndCitizenshipComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateBirthAndCitizenshipMutation, UpdateBirthAndCitizenshipMutationVariables> mutation={UpdateBirthAndCitizenshipDocument} {...props} />
    );
    
export type UpdateBirthAndCitizenshipProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateBirthAndCitizenshipMutation, UpdateBirthAndCitizenshipMutationVariables>
    } & TChildProps;
export function withUpdateBirthAndCitizenship<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateBirthAndCitizenshipMutation,
  UpdateBirthAndCitizenshipMutationVariables,
  UpdateBirthAndCitizenshipProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateBirthAndCitizenshipMutation, UpdateBirthAndCitizenshipMutationVariables, UpdateBirthAndCitizenshipProps<TChildProps, TDataName>>(UpdateBirthAndCitizenshipDocument, {
      alias: 'updateBirthAndCitizenship',
      ...operationOptions
    });
};

/**
 * __useUpdateBirthAndCitizenshipMutation__
 *
 * To run a mutation, you first call `useUpdateBirthAndCitizenshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBirthAndCitizenshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBirthAndCitizenshipMutation, { data, loading, error }] = useUpdateBirthAndCitizenshipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBirthAndCitizenshipMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBirthAndCitizenshipMutation, UpdateBirthAndCitizenshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBirthAndCitizenshipMutation, UpdateBirthAndCitizenshipMutationVariables>(UpdateBirthAndCitizenshipDocument, options);
      }
export type UpdateBirthAndCitizenshipMutationHookResult = ReturnType<typeof useUpdateBirthAndCitizenshipMutation>;
export type UpdateBirthAndCitizenshipMutationResult = Apollo.MutationResult<UpdateBirthAndCitizenshipMutation>;
export type UpdateBirthAndCitizenshipMutationOptions = Apollo.BaseMutationOptions<UpdateBirthAndCitizenshipMutation, UpdateBirthAndCitizenshipMutationVariables>;
export const GetBoardCertificationDetailsDocument = gql`
    query GetBoardCertificationDetails($specialtyRank: SpecialtyRankEnum!) {
  personalDetails {
    id
    boardCertification(specialtyRank: $specialtyRank) {
      boardCertificationQuestionnaire {
        comments
        expectedExamDate
        hasTakenCertificationExam
        hasTakenCertificationExamBoardName
        planningToTakeExam
        takenPartOnePartTwoEligible
        takenPartOnePartTwoEligibleBoardName
      }
      boardCertified
      certifyingBoardName
      expiresAt
      initialCertificationDate
      recertificationDate
      specialty
      specialtyRank
    }
  }
}
    `;
export type GetBoardCertificationDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetBoardCertificationDetailsQuery, GetBoardCertificationDetailsQueryVariables>, 'query'> & ({ variables: GetBoardCertificationDetailsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetBoardCertificationDetailsComponent = (props: GetBoardCertificationDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetBoardCertificationDetailsQuery, GetBoardCertificationDetailsQueryVariables> query={GetBoardCertificationDetailsDocument} {...props} />
    );
    
export type GetBoardCertificationDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetBoardCertificationDetailsQuery, GetBoardCertificationDetailsQueryVariables>
    } & TChildProps;
export function withGetBoardCertificationDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetBoardCertificationDetailsQuery,
  GetBoardCertificationDetailsQueryVariables,
  GetBoardCertificationDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetBoardCertificationDetailsQuery, GetBoardCertificationDetailsQueryVariables, GetBoardCertificationDetailsProps<TChildProps, TDataName>>(GetBoardCertificationDetailsDocument, {
      alias: 'getBoardCertificationDetails',
      ...operationOptions
    });
};

/**
 * __useGetBoardCertificationDetailsQuery__
 *
 * To run a query within a React component, call `useGetBoardCertificationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardCertificationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardCertificationDetailsQuery({
 *   variables: {
 *      specialtyRank: // value for 'specialtyRank'
 *   },
 * });
 */
export function useGetBoardCertificationDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetBoardCertificationDetailsQuery, GetBoardCertificationDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardCertificationDetailsQuery, GetBoardCertificationDetailsQueryVariables>(GetBoardCertificationDetailsDocument, options);
      }
export function useGetBoardCertificationDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardCertificationDetailsQuery, GetBoardCertificationDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardCertificationDetailsQuery, GetBoardCertificationDetailsQueryVariables>(GetBoardCertificationDetailsDocument, options);
        }
export type GetBoardCertificationDetailsQueryHookResult = ReturnType<typeof useGetBoardCertificationDetailsQuery>;
export type GetBoardCertificationDetailsLazyQueryHookResult = ReturnType<typeof useGetBoardCertificationDetailsLazyQuery>;
export type GetBoardCertificationDetailsQueryResult = Apollo.QueryResult<GetBoardCertificationDetailsQuery, GetBoardCertificationDetailsQueryVariables>;
export const UpdateBoardCertificationDocument = gql`
    mutation UpdateBoardCertification($input: UpdateBoardCertificationMutationInput!) {
  updateBoardCertification(input: $input) {
    boardCertification {
      specialty
    }
  }
}
    `;
export type UpdateBoardCertificationMutationFn = Apollo.MutationFunction<UpdateBoardCertificationMutation, UpdateBoardCertificationMutationVariables>;
export type UpdateBoardCertificationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateBoardCertificationMutation, UpdateBoardCertificationMutationVariables>, 'mutation'>;

    export const UpdateBoardCertificationComponent = (props: UpdateBoardCertificationComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateBoardCertificationMutation, UpdateBoardCertificationMutationVariables> mutation={UpdateBoardCertificationDocument} {...props} />
    );
    
export type UpdateBoardCertificationProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateBoardCertificationMutation, UpdateBoardCertificationMutationVariables>
    } & TChildProps;
export function withUpdateBoardCertification<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateBoardCertificationMutation,
  UpdateBoardCertificationMutationVariables,
  UpdateBoardCertificationProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateBoardCertificationMutation, UpdateBoardCertificationMutationVariables, UpdateBoardCertificationProps<TChildProps, TDataName>>(UpdateBoardCertificationDocument, {
      alias: 'updateBoardCertification',
      ...operationOptions
    });
};

/**
 * __useUpdateBoardCertificationMutation__
 *
 * To run a mutation, you first call `useUpdateBoardCertificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoardCertificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoardCertificationMutation, { data, loading, error }] = useUpdateBoardCertificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBoardCertificationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoardCertificationMutation, UpdateBoardCertificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoardCertificationMutation, UpdateBoardCertificationMutationVariables>(UpdateBoardCertificationDocument, options);
      }
export type UpdateBoardCertificationMutationHookResult = ReturnType<typeof useUpdateBoardCertificationMutation>;
export type UpdateBoardCertificationMutationResult = Apollo.MutationResult<UpdateBoardCertificationMutation>;
export type UpdateBoardCertificationMutationOptions = Apollo.BaseMutationOptions<UpdateBoardCertificationMutation, UpdateBoardCertificationMutationVariables>;
export const GetCmeCreditHoursDetailsDocument = gql`
    query GetCmeCreditHoursDetails {
  personalDetails {
    id
    cmeCreditHours {
      activityDate
      activityName
      sponsorName
      hoursEarned
      methodOfEducation
    }
  }
}
    `;
export type GetCmeCreditHoursDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCmeCreditHoursDetailsQuery, GetCmeCreditHoursDetailsQueryVariables>, 'query'>;

    export const GetCmeCreditHoursDetailsComponent = (props: GetCmeCreditHoursDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetCmeCreditHoursDetailsQuery, GetCmeCreditHoursDetailsQueryVariables> query={GetCmeCreditHoursDetailsDocument} {...props} />
    );
    
export type GetCmeCreditHoursDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetCmeCreditHoursDetailsQuery, GetCmeCreditHoursDetailsQueryVariables>
    } & TChildProps;
export function withGetCmeCreditHoursDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetCmeCreditHoursDetailsQuery,
  GetCmeCreditHoursDetailsQueryVariables,
  GetCmeCreditHoursDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetCmeCreditHoursDetailsQuery, GetCmeCreditHoursDetailsQueryVariables, GetCmeCreditHoursDetailsProps<TChildProps, TDataName>>(GetCmeCreditHoursDetailsDocument, {
      alias: 'getCmeCreditHoursDetails',
      ...operationOptions
    });
};

/**
 * __useGetCmeCreditHoursDetailsQuery__
 *
 * To run a query within a React component, call `useGetCmeCreditHoursDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCmeCreditHoursDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCmeCreditHoursDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCmeCreditHoursDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetCmeCreditHoursDetailsQuery, GetCmeCreditHoursDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCmeCreditHoursDetailsQuery, GetCmeCreditHoursDetailsQueryVariables>(GetCmeCreditHoursDetailsDocument, options);
      }
export function useGetCmeCreditHoursDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCmeCreditHoursDetailsQuery, GetCmeCreditHoursDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCmeCreditHoursDetailsQuery, GetCmeCreditHoursDetailsQueryVariables>(GetCmeCreditHoursDetailsDocument, options);
        }
export type GetCmeCreditHoursDetailsQueryHookResult = ReturnType<typeof useGetCmeCreditHoursDetailsQuery>;
export type GetCmeCreditHoursDetailsLazyQueryHookResult = ReturnType<typeof useGetCmeCreditHoursDetailsLazyQuery>;
export type GetCmeCreditHoursDetailsQueryResult = Apollo.QueryResult<GetCmeCreditHoursDetailsQuery, GetCmeCreditHoursDetailsQueryVariables>;
export const UpdateCmeCreditHoursDocument = gql`
    mutation UpdateCmeCreditHours($input: UpdateCMECreditHoursMutationInput!) {
  updateCmeCreditHours(input: $input) {
    cmeCreditHours {
      activityName
    }
  }
}
    `;
export type UpdateCmeCreditHoursMutationFn = Apollo.MutationFunction<UpdateCmeCreditHoursMutation, UpdateCmeCreditHoursMutationVariables>;
export type UpdateCmeCreditHoursComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateCmeCreditHoursMutation, UpdateCmeCreditHoursMutationVariables>, 'mutation'>;

    export const UpdateCmeCreditHoursComponent = (props: UpdateCmeCreditHoursComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateCmeCreditHoursMutation, UpdateCmeCreditHoursMutationVariables> mutation={UpdateCmeCreditHoursDocument} {...props} />
    );
    
export type UpdateCmeCreditHoursProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateCmeCreditHoursMutation, UpdateCmeCreditHoursMutationVariables>
    } & TChildProps;
export function withUpdateCmeCreditHours<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateCmeCreditHoursMutation,
  UpdateCmeCreditHoursMutationVariables,
  UpdateCmeCreditHoursProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateCmeCreditHoursMutation, UpdateCmeCreditHoursMutationVariables, UpdateCmeCreditHoursProps<TChildProps, TDataName>>(UpdateCmeCreditHoursDocument, {
      alias: 'updateCmeCreditHours',
      ...operationOptions
    });
};

/**
 * __useUpdateCmeCreditHoursMutation__
 *
 * To run a mutation, you first call `useUpdateCmeCreditHoursMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCmeCreditHoursMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCmeCreditHoursMutation, { data, loading, error }] = useUpdateCmeCreditHoursMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCmeCreditHoursMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCmeCreditHoursMutation, UpdateCmeCreditHoursMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCmeCreditHoursMutation, UpdateCmeCreditHoursMutationVariables>(UpdateCmeCreditHoursDocument, options);
      }
export type UpdateCmeCreditHoursMutationHookResult = ReturnType<typeof useUpdateCmeCreditHoursMutation>;
export type UpdateCmeCreditHoursMutationResult = Apollo.MutationResult<UpdateCmeCreditHoursMutation>;
export type UpdateCmeCreditHoursMutationOptions = Apollo.BaseMutationOptions<UpdateCmeCreditHoursMutation, UpdateCmeCreditHoursMutationVariables>;
export const GetComlexScoresDetailsDocument = gql`
    query GetCOMLEXScoresDetails {
  personalDetails {
    id
    comlexUsaScores {
      nbomeIdNumber
      level1Passed
      level1Score
      level1ExamDate
      level2CePassed
      level2CeScore
      level2CeExamDate
      level2PePassed
      level2PeScore
      level2PeExamDate
      level3Passed
      level3Score
      level3ExamDate
    }
  }
}
    `;
export type GetComlexScoresDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetComlexScoresDetailsQuery, GetComlexScoresDetailsQueryVariables>, 'query'>;

    export const GetComlexScoresDetailsComponent = (props: GetComlexScoresDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetComlexScoresDetailsQuery, GetComlexScoresDetailsQueryVariables> query={GetComlexScoresDetailsDocument} {...props} />
    );
    
export type GetComlexScoresDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetComlexScoresDetailsQuery, GetComlexScoresDetailsQueryVariables>
    } & TChildProps;
export function withGetComlexScoresDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetComlexScoresDetailsQuery,
  GetComlexScoresDetailsQueryVariables,
  GetComlexScoresDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetComlexScoresDetailsQuery, GetComlexScoresDetailsQueryVariables, GetComlexScoresDetailsProps<TChildProps, TDataName>>(GetComlexScoresDetailsDocument, {
      alias: 'getComlexScoresDetails',
      ...operationOptions
    });
};

/**
 * __useGetComlexScoresDetailsQuery__
 *
 * To run a query within a React component, call `useGetComlexScoresDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComlexScoresDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComlexScoresDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetComlexScoresDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetComlexScoresDetailsQuery, GetComlexScoresDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetComlexScoresDetailsQuery, GetComlexScoresDetailsQueryVariables>(GetComlexScoresDetailsDocument, options);
      }
export function useGetComlexScoresDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetComlexScoresDetailsQuery, GetComlexScoresDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetComlexScoresDetailsQuery, GetComlexScoresDetailsQueryVariables>(GetComlexScoresDetailsDocument, options);
        }
export type GetComlexScoresDetailsQueryHookResult = ReturnType<typeof useGetComlexScoresDetailsQuery>;
export type GetComlexScoresDetailsLazyQueryHookResult = ReturnType<typeof useGetComlexScoresDetailsLazyQuery>;
export type GetComlexScoresDetailsQueryResult = Apollo.QueryResult<GetComlexScoresDetailsQuery, GetComlexScoresDetailsQueryVariables>;
export const UpdateComlexScoresDocument = gql`
    mutation UpdateComlexScores($input: UpdateCOMLEXScoresMutationInput!) {
  updateComlexScores(input: $input) {
    comlexScores {
      nbomeIdNumber
    }
  }
}
    `;
export type UpdateComlexScoresMutationFn = Apollo.MutationFunction<UpdateComlexScoresMutation, UpdateComlexScoresMutationVariables>;
export type UpdateComlexScoresComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateComlexScoresMutation, UpdateComlexScoresMutationVariables>, 'mutation'>;

    export const UpdateComlexScoresComponent = (props: UpdateComlexScoresComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateComlexScoresMutation, UpdateComlexScoresMutationVariables> mutation={UpdateComlexScoresDocument} {...props} />
    );
    
export type UpdateComlexScoresProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateComlexScoresMutation, UpdateComlexScoresMutationVariables>
    } & TChildProps;
export function withUpdateComlexScores<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateComlexScoresMutation,
  UpdateComlexScoresMutationVariables,
  UpdateComlexScoresProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateComlexScoresMutation, UpdateComlexScoresMutationVariables, UpdateComlexScoresProps<TChildProps, TDataName>>(UpdateComlexScoresDocument, {
      alias: 'updateComlexScores',
      ...operationOptions
    });
};

/**
 * __useUpdateComlexScoresMutation__
 *
 * To run a mutation, you first call `useUpdateComlexScoresMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateComlexScoresMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateComlexScoresMutation, { data, loading, error }] = useUpdateComlexScoresMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateComlexScoresMutation(baseOptions?: Apollo.MutationHookOptions<UpdateComlexScoresMutation, UpdateComlexScoresMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateComlexScoresMutation, UpdateComlexScoresMutationVariables>(UpdateComlexScoresDocument, options);
      }
export type UpdateComlexScoresMutationHookResult = ReturnType<typeof useUpdateComlexScoresMutation>;
export type UpdateComlexScoresMutationResult = Apollo.MutationResult<UpdateComlexScoresMutation>;
export type UpdateComlexScoresMutationOptions = Apollo.BaseMutationOptions<UpdateComlexScoresMutation, UpdateComlexScoresMutationVariables>;
export const GetCertificationDetailsDocument = gql`
    query GetCertificationDetails($kind: CertificationKindEnum!) {
  personalDetails {
    id
    certification(kind: $kind) {
      issuedAt
      expiresAt
    }
  }
}
    `;
export type GetCertificationDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCertificationDetailsQuery, GetCertificationDetailsQueryVariables>, 'query'> & ({ variables: GetCertificationDetailsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetCertificationDetailsComponent = (props: GetCertificationDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetCertificationDetailsQuery, GetCertificationDetailsQueryVariables> query={GetCertificationDetailsDocument} {...props} />
    );
    
export type GetCertificationDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetCertificationDetailsQuery, GetCertificationDetailsQueryVariables>
    } & TChildProps;
export function withGetCertificationDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetCertificationDetailsQuery,
  GetCertificationDetailsQueryVariables,
  GetCertificationDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetCertificationDetailsQuery, GetCertificationDetailsQueryVariables, GetCertificationDetailsProps<TChildProps, TDataName>>(GetCertificationDetailsDocument, {
      alias: 'getCertificationDetails',
      ...operationOptions
    });
};

/**
 * __useGetCertificationDetailsQuery__
 *
 * To run a query within a React component, call `useGetCertificationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCertificationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCertificationDetailsQuery({
 *   variables: {
 *      kind: // value for 'kind'
 *   },
 * });
 */
export function useGetCertificationDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetCertificationDetailsQuery, GetCertificationDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCertificationDetailsQuery, GetCertificationDetailsQueryVariables>(GetCertificationDetailsDocument, options);
      }
export function useGetCertificationDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCertificationDetailsQuery, GetCertificationDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCertificationDetailsQuery, GetCertificationDetailsQueryVariables>(GetCertificationDetailsDocument, options);
        }
export type GetCertificationDetailsQueryHookResult = ReturnType<typeof useGetCertificationDetailsQuery>;
export type GetCertificationDetailsLazyQueryHookResult = ReturnType<typeof useGetCertificationDetailsLazyQuery>;
export type GetCertificationDetailsQueryResult = Apollo.QueryResult<GetCertificationDetailsQuery, GetCertificationDetailsQueryVariables>;
export const UpdateCertificationDocument = gql`
    mutation UpdateCertification($input: UpdateCertificationMutationInput!) {
  updateCertification(input: $input) {
    certification {
      kind
    }
  }
}
    `;
export type UpdateCertificationMutationFn = Apollo.MutationFunction<UpdateCertificationMutation, UpdateCertificationMutationVariables>;
export type UpdateCertificationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateCertificationMutation, UpdateCertificationMutationVariables>, 'mutation'>;

    export const UpdateCertificationComponent = (props: UpdateCertificationComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateCertificationMutation, UpdateCertificationMutationVariables> mutation={UpdateCertificationDocument} {...props} />
    );
    
export type UpdateCertificationProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateCertificationMutation, UpdateCertificationMutationVariables>
    } & TChildProps;
export function withUpdateCertification<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateCertificationMutation,
  UpdateCertificationMutationVariables,
  UpdateCertificationProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateCertificationMutation, UpdateCertificationMutationVariables, UpdateCertificationProps<TChildProps, TDataName>>(UpdateCertificationDocument, {
      alias: 'updateCertification',
      ...operationOptions
    });
};

/**
 * __useUpdateCertificationMutation__
 *
 * To run a mutation, you first call `useUpdateCertificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCertificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCertificationMutation, { data, loading, error }] = useUpdateCertificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCertificationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCertificationMutation, UpdateCertificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCertificationMutation, UpdateCertificationMutationVariables>(UpdateCertificationDocument, options);
      }
export type UpdateCertificationMutationHookResult = ReturnType<typeof useUpdateCertificationMutation>;
export type UpdateCertificationMutationResult = Apollo.MutationResult<UpdateCertificationMutation>;
export type UpdateCertificationMutationOptions = Apollo.BaseMutationOptions<UpdateCertificationMutation, UpdateCertificationMutationVariables>;
export const GetCovidVaccinationDetailsDocument = gql`
    query GetCovidVaccinationDetails {
  personalDetails {
    id
    covidVaccination {
      vaccinationDate1
      vaccinationDate2
      facilityName
      addressLine1
      addressLine2
      city
      state
      zip
    }
  }
  states
}
    `;
export type GetCovidVaccinationDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCovidVaccinationDetailsQuery, GetCovidVaccinationDetailsQueryVariables>, 'query'>;

    export const GetCovidVaccinationDetailsComponent = (props: GetCovidVaccinationDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetCovidVaccinationDetailsQuery, GetCovidVaccinationDetailsQueryVariables> query={GetCovidVaccinationDetailsDocument} {...props} />
    );
    
export type GetCovidVaccinationDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetCovidVaccinationDetailsQuery, GetCovidVaccinationDetailsQueryVariables>
    } & TChildProps;
export function withGetCovidVaccinationDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetCovidVaccinationDetailsQuery,
  GetCovidVaccinationDetailsQueryVariables,
  GetCovidVaccinationDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetCovidVaccinationDetailsQuery, GetCovidVaccinationDetailsQueryVariables, GetCovidVaccinationDetailsProps<TChildProps, TDataName>>(GetCovidVaccinationDetailsDocument, {
      alias: 'getCovidVaccinationDetails',
      ...operationOptions
    });
};

/**
 * __useGetCovidVaccinationDetailsQuery__
 *
 * To run a query within a React component, call `useGetCovidVaccinationDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCovidVaccinationDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCovidVaccinationDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCovidVaccinationDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetCovidVaccinationDetailsQuery, GetCovidVaccinationDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCovidVaccinationDetailsQuery, GetCovidVaccinationDetailsQueryVariables>(GetCovidVaccinationDetailsDocument, options);
      }
export function useGetCovidVaccinationDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCovidVaccinationDetailsQuery, GetCovidVaccinationDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCovidVaccinationDetailsQuery, GetCovidVaccinationDetailsQueryVariables>(GetCovidVaccinationDetailsDocument, options);
        }
export type GetCovidVaccinationDetailsQueryHookResult = ReturnType<typeof useGetCovidVaccinationDetailsQuery>;
export type GetCovidVaccinationDetailsLazyQueryHookResult = ReturnType<typeof useGetCovidVaccinationDetailsLazyQuery>;
export type GetCovidVaccinationDetailsQueryResult = Apollo.QueryResult<GetCovidVaccinationDetailsQuery, GetCovidVaccinationDetailsQueryVariables>;
export const UpdateCovidVaccinationDocument = gql`
    mutation UpdateCovidVaccination($input: UpdateCOVIDVaccinationMutationInput!) {
  updateCovidVaccination(input: $input) {
    covidVaccination {
      vaccinationDate1
    }
  }
}
    `;
export type UpdateCovidVaccinationMutationFn = Apollo.MutationFunction<UpdateCovidVaccinationMutation, UpdateCovidVaccinationMutationVariables>;
export type UpdateCovidVaccinationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateCovidVaccinationMutation, UpdateCovidVaccinationMutationVariables>, 'mutation'>;

    export const UpdateCovidVaccinationComponent = (props: UpdateCovidVaccinationComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateCovidVaccinationMutation, UpdateCovidVaccinationMutationVariables> mutation={UpdateCovidVaccinationDocument} {...props} />
    );
    
export type UpdateCovidVaccinationProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateCovidVaccinationMutation, UpdateCovidVaccinationMutationVariables>
    } & TChildProps;
export function withUpdateCovidVaccination<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateCovidVaccinationMutation,
  UpdateCovidVaccinationMutationVariables,
  UpdateCovidVaccinationProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateCovidVaccinationMutation, UpdateCovidVaccinationMutationVariables, UpdateCovidVaccinationProps<TChildProps, TDataName>>(UpdateCovidVaccinationDocument, {
      alias: 'updateCovidVaccination',
      ...operationOptions
    });
};

/**
 * __useUpdateCovidVaccinationMutation__
 *
 * To run a mutation, you first call `useUpdateCovidVaccinationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCovidVaccinationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCovidVaccinationMutation, { data, loading, error }] = useUpdateCovidVaccinationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCovidVaccinationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCovidVaccinationMutation, UpdateCovidVaccinationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCovidVaccinationMutation, UpdateCovidVaccinationMutationVariables>(UpdateCovidVaccinationDocument, options);
      }
export type UpdateCovidVaccinationMutationHookResult = ReturnType<typeof useUpdateCovidVaccinationMutation>;
export type UpdateCovidVaccinationMutationResult = Apollo.MutationResult<UpdateCovidVaccinationMutation>;
export type UpdateCovidVaccinationMutationOptions = Apollo.BaseMutationOptions<UpdateCovidVaccinationMutation, UpdateCovidVaccinationMutationVariables>;
export const GetOtherCertificationsDocument = gql`
    query GetOtherCertifications {
  personalDetails {
    id
    otherCertifications {
      name
      issuedAt
      expiresAt
    }
  }
}
    `;
export type GetOtherCertificationsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetOtherCertificationsQuery, GetOtherCertificationsQueryVariables>, 'query'>;

    export const GetOtherCertificationsComponent = (props: GetOtherCertificationsComponentProps) => (
      <ApolloReactComponents.Query<GetOtherCertificationsQuery, GetOtherCertificationsQueryVariables> query={GetOtherCertificationsDocument} {...props} />
    );
    
export type GetOtherCertificationsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetOtherCertificationsQuery, GetOtherCertificationsQueryVariables>
    } & TChildProps;
export function withGetOtherCertifications<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetOtherCertificationsQuery,
  GetOtherCertificationsQueryVariables,
  GetOtherCertificationsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetOtherCertificationsQuery, GetOtherCertificationsQueryVariables, GetOtherCertificationsProps<TChildProps, TDataName>>(GetOtherCertificationsDocument, {
      alias: 'getOtherCertifications',
      ...operationOptions
    });
};

/**
 * __useGetOtherCertificationsQuery__
 *
 * To run a query within a React component, call `useGetOtherCertificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOtherCertificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOtherCertificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOtherCertificationsQuery(baseOptions?: Apollo.QueryHookOptions<GetOtherCertificationsQuery, GetOtherCertificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOtherCertificationsQuery, GetOtherCertificationsQueryVariables>(GetOtherCertificationsDocument, options);
      }
export function useGetOtherCertificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOtherCertificationsQuery, GetOtherCertificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOtherCertificationsQuery, GetOtherCertificationsQueryVariables>(GetOtherCertificationsDocument, options);
        }
export type GetOtherCertificationsQueryHookResult = ReturnType<typeof useGetOtherCertificationsQuery>;
export type GetOtherCertificationsLazyQueryHookResult = ReturnType<typeof useGetOtherCertificationsLazyQuery>;
export type GetOtherCertificationsQueryResult = Apollo.QueryResult<GetOtherCertificationsQuery, GetOtherCertificationsQueryVariables>;
export const UpdateOtherCertificationsDocument = gql`
    mutation UpdateOtherCertifications($input: UpdateOtherCertificationsMutationInput!) {
  updateOtherCertifications(input: $input) {
    otherCertifications {
      name
    }
  }
}
    `;
export type UpdateOtherCertificationsMutationFn = Apollo.MutationFunction<UpdateOtherCertificationsMutation, UpdateOtherCertificationsMutationVariables>;
export type UpdateOtherCertificationsComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateOtherCertificationsMutation, UpdateOtherCertificationsMutationVariables>, 'mutation'>;

    export const UpdateOtherCertificationsComponent = (props: UpdateOtherCertificationsComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateOtherCertificationsMutation, UpdateOtherCertificationsMutationVariables> mutation={UpdateOtherCertificationsDocument} {...props} />
    );
    
export type UpdateOtherCertificationsProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateOtherCertificationsMutation, UpdateOtherCertificationsMutationVariables>
    } & TChildProps;
export function withUpdateOtherCertifications<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateOtherCertificationsMutation,
  UpdateOtherCertificationsMutationVariables,
  UpdateOtherCertificationsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateOtherCertificationsMutation, UpdateOtherCertificationsMutationVariables, UpdateOtherCertificationsProps<TChildProps, TDataName>>(UpdateOtherCertificationsDocument, {
      alias: 'updateOtherCertifications',
      ...operationOptions
    });
};

/**
 * __useUpdateOtherCertificationsMutation__
 *
 * To run a mutation, you first call `useUpdateOtherCertificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOtherCertificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOtherCertificationsMutation, { data, loading, error }] = useUpdateOtherCertificationsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOtherCertificationsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOtherCertificationsMutation, UpdateOtherCertificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOtherCertificationsMutation, UpdateOtherCertificationsMutationVariables>(UpdateOtherCertificationsDocument, options);
      }
export type UpdateOtherCertificationsMutationHookResult = ReturnType<typeof useUpdateOtherCertificationsMutation>;
export type UpdateOtherCertificationsMutationResult = Apollo.MutationResult<UpdateOtherCertificationsMutation>;
export type UpdateOtherCertificationsMutationOptions = Apollo.BaseMutationOptions<UpdateOtherCertificationsMutation, UpdateOtherCertificationsMutationVariables>;
export const GetDeaLicenseDetailsDocument = gql`
    query GetDeaLicenseDetails {
  personalDetails {
    id
    deaLicense {
      registrationNumber
      expiresAt
      status
      unrestricted
    }
  }
}
    `;
export type GetDeaLicenseDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetDeaLicenseDetailsQuery, GetDeaLicenseDetailsQueryVariables>, 'query'>;

    export const GetDeaLicenseDetailsComponent = (props: GetDeaLicenseDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetDeaLicenseDetailsQuery, GetDeaLicenseDetailsQueryVariables> query={GetDeaLicenseDetailsDocument} {...props} />
    );
    
export type GetDeaLicenseDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetDeaLicenseDetailsQuery, GetDeaLicenseDetailsQueryVariables>
    } & TChildProps;
export function withGetDeaLicenseDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetDeaLicenseDetailsQuery,
  GetDeaLicenseDetailsQueryVariables,
  GetDeaLicenseDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetDeaLicenseDetailsQuery, GetDeaLicenseDetailsQueryVariables, GetDeaLicenseDetailsProps<TChildProps, TDataName>>(GetDeaLicenseDetailsDocument, {
      alias: 'getDeaLicenseDetails',
      ...operationOptions
    });
};

/**
 * __useGetDeaLicenseDetailsQuery__
 *
 * To run a query within a React component, call `useGetDeaLicenseDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeaLicenseDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeaLicenseDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDeaLicenseDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetDeaLicenseDetailsQuery, GetDeaLicenseDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeaLicenseDetailsQuery, GetDeaLicenseDetailsQueryVariables>(GetDeaLicenseDetailsDocument, options);
      }
export function useGetDeaLicenseDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeaLicenseDetailsQuery, GetDeaLicenseDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeaLicenseDetailsQuery, GetDeaLicenseDetailsQueryVariables>(GetDeaLicenseDetailsDocument, options);
        }
export type GetDeaLicenseDetailsQueryHookResult = ReturnType<typeof useGetDeaLicenseDetailsQuery>;
export type GetDeaLicenseDetailsLazyQueryHookResult = ReturnType<typeof useGetDeaLicenseDetailsLazyQuery>;
export type GetDeaLicenseDetailsQueryResult = Apollo.QueryResult<GetDeaLicenseDetailsQuery, GetDeaLicenseDetailsQueryVariables>;
export const UpdateDeaLicenseDocument = gql`
    mutation UpdateDeaLicense($input: UpdateDEALicenseMutationInput!) {
  updateDeaLicense(input: $input) {
    deaLicense {
      registrationNumber
    }
  }
}
    `;
export type UpdateDeaLicenseMutationFn = Apollo.MutationFunction<UpdateDeaLicenseMutation, UpdateDeaLicenseMutationVariables>;
export type UpdateDeaLicenseComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateDeaLicenseMutation, UpdateDeaLicenseMutationVariables>, 'mutation'>;

    export const UpdateDeaLicenseComponent = (props: UpdateDeaLicenseComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateDeaLicenseMutation, UpdateDeaLicenseMutationVariables> mutation={UpdateDeaLicenseDocument} {...props} />
    );
    
export type UpdateDeaLicenseProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateDeaLicenseMutation, UpdateDeaLicenseMutationVariables>
    } & TChildProps;
export function withUpdateDeaLicense<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateDeaLicenseMutation,
  UpdateDeaLicenseMutationVariables,
  UpdateDeaLicenseProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateDeaLicenseMutation, UpdateDeaLicenseMutationVariables, UpdateDeaLicenseProps<TChildProps, TDataName>>(UpdateDeaLicenseDocument, {
      alias: 'updateDeaLicense',
      ...operationOptions
    });
};

/**
 * __useUpdateDeaLicenseMutation__
 *
 * To run a mutation, you first call `useUpdateDeaLicenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDeaLicenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDeaLicenseMutation, { data, loading, error }] = useUpdateDeaLicenseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDeaLicenseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDeaLicenseMutation, UpdateDeaLicenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDeaLicenseMutation, UpdateDeaLicenseMutationVariables>(UpdateDeaLicenseDocument, options);
      }
export type UpdateDeaLicenseMutationHookResult = ReturnType<typeof useUpdateDeaLicenseMutation>;
export type UpdateDeaLicenseMutationResult = Apollo.MutationResult<UpdateDeaLicenseMutation>;
export type UpdateDeaLicenseMutationOptions = Apollo.BaseMutationOptions<UpdateDeaLicenseMutation, UpdateDeaLicenseMutationVariables>;
export const GetDegreeDetailsDocument = gql`
    query GetDegreeDetails($kind: DegreeKind!) {
  personalDetails {
    id
    degree(kind: $kind) {
      institutionName
      degree
      major
      minor
      dateOfGraduation
      startedAt
      endedAt
      registrarPhoneNumber
      registrarUrl
      institutionAddressLine1
      institutionAddressLine2
      institutionAddressLine3
      institutionAddressCity
      institutionAddressState
      institutionAddressZip
      institutionAddressCountry
    }
  }
  states
  countries
}
    `;
export type GetDegreeDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetDegreeDetailsQuery, GetDegreeDetailsQueryVariables>, 'query'> & ({ variables: GetDegreeDetailsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetDegreeDetailsComponent = (props: GetDegreeDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetDegreeDetailsQuery, GetDegreeDetailsQueryVariables> query={GetDegreeDetailsDocument} {...props} />
    );
    
export type GetDegreeDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetDegreeDetailsQuery, GetDegreeDetailsQueryVariables>
    } & TChildProps;
export function withGetDegreeDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetDegreeDetailsQuery,
  GetDegreeDetailsQueryVariables,
  GetDegreeDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetDegreeDetailsQuery, GetDegreeDetailsQueryVariables, GetDegreeDetailsProps<TChildProps, TDataName>>(GetDegreeDetailsDocument, {
      alias: 'getDegreeDetails',
      ...operationOptions
    });
};

/**
 * __useGetDegreeDetailsQuery__
 *
 * To run a query within a React component, call `useGetDegreeDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDegreeDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDegreeDetailsQuery({
 *   variables: {
 *      kind: // value for 'kind'
 *   },
 * });
 */
export function useGetDegreeDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetDegreeDetailsQuery, GetDegreeDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDegreeDetailsQuery, GetDegreeDetailsQueryVariables>(GetDegreeDetailsDocument, options);
      }
export function useGetDegreeDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDegreeDetailsQuery, GetDegreeDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDegreeDetailsQuery, GetDegreeDetailsQueryVariables>(GetDegreeDetailsDocument, options);
        }
export type GetDegreeDetailsQueryHookResult = ReturnType<typeof useGetDegreeDetailsQuery>;
export type GetDegreeDetailsLazyQueryHookResult = ReturnType<typeof useGetDegreeDetailsLazyQuery>;
export type GetDegreeDetailsQueryResult = Apollo.QueryResult<GetDegreeDetailsQuery, GetDegreeDetailsQueryVariables>;
export const UpdateDegreeDocument = gql`
    mutation UpdateDegree($input: UpdateDegreeMutationInput!) {
  updateDegree(input: $input) {
    degree {
      institutionName
    }
  }
}
    `;
export type UpdateDegreeMutationFn = Apollo.MutationFunction<UpdateDegreeMutation, UpdateDegreeMutationVariables>;
export type UpdateDegreeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateDegreeMutation, UpdateDegreeMutationVariables>, 'mutation'>;

    export const UpdateDegreeComponent = (props: UpdateDegreeComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateDegreeMutation, UpdateDegreeMutationVariables> mutation={UpdateDegreeDocument} {...props} />
    );
    
export type UpdateDegreeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateDegreeMutation, UpdateDegreeMutationVariables>
    } & TChildProps;
export function withUpdateDegree<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateDegreeMutation,
  UpdateDegreeMutationVariables,
  UpdateDegreeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateDegreeMutation, UpdateDegreeMutationVariables, UpdateDegreeProps<TChildProps, TDataName>>(UpdateDegreeDocument, {
      alias: 'updateDegree',
      ...operationOptions
    });
};

/**
 * __useUpdateDegreeMutation__
 *
 * To run a mutation, you first call `useUpdateDegreeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDegreeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDegreeMutation, { data, loading, error }] = useUpdateDegreeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDegreeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDegreeMutation, UpdateDegreeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDegreeMutation, UpdateDegreeMutationVariables>(UpdateDegreeDocument, options);
      }
export type UpdateDegreeMutationHookResult = ReturnType<typeof useUpdateDegreeMutation>;
export type UpdateDegreeMutationResult = Apollo.MutationResult<UpdateDegreeMutation>;
export type UpdateDegreeMutationOptions = Apollo.BaseMutationOptions<UpdateDegreeMutation, UpdateDegreeMutationVariables>;
export const GetDemographicDetailDocument = gql`
    query GetDemographicDetail {
  personalDetails {
    id
    demographicDetail {
      race
      ethnicity
    }
  }
}
    `;
export type GetDemographicDetailComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetDemographicDetailQuery, GetDemographicDetailQueryVariables>, 'query'>;

    export const GetDemographicDetailComponent = (props: GetDemographicDetailComponentProps) => (
      <ApolloReactComponents.Query<GetDemographicDetailQuery, GetDemographicDetailQueryVariables> query={GetDemographicDetailDocument} {...props} />
    );
    
export type GetDemographicDetailProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetDemographicDetailQuery, GetDemographicDetailQueryVariables>
    } & TChildProps;
export function withGetDemographicDetail<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetDemographicDetailQuery,
  GetDemographicDetailQueryVariables,
  GetDemographicDetailProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetDemographicDetailQuery, GetDemographicDetailQueryVariables, GetDemographicDetailProps<TChildProps, TDataName>>(GetDemographicDetailDocument, {
      alias: 'getDemographicDetail',
      ...operationOptions
    });
};

/**
 * __useGetDemographicDetailQuery__
 *
 * To run a query within a React component, call `useGetDemographicDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDemographicDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDemographicDetailQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDemographicDetailQuery(baseOptions?: Apollo.QueryHookOptions<GetDemographicDetailQuery, GetDemographicDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDemographicDetailQuery, GetDemographicDetailQueryVariables>(GetDemographicDetailDocument, options);
      }
export function useGetDemographicDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDemographicDetailQuery, GetDemographicDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDemographicDetailQuery, GetDemographicDetailQueryVariables>(GetDemographicDetailDocument, options);
        }
export type GetDemographicDetailQueryHookResult = ReturnType<typeof useGetDemographicDetailQuery>;
export type GetDemographicDetailLazyQueryHookResult = ReturnType<typeof useGetDemographicDetailLazyQuery>;
export type GetDemographicDetailQueryResult = Apollo.QueryResult<GetDemographicDetailQuery, GetDemographicDetailQueryVariables>;
export const UpdateDemographicDetailDocument = gql`
    mutation UpdateDemographicDetail($input: UpdateDemographicDetailMutationInput!) {
  updateDemographicDetail(input: $input) {
    demographicDetail {
      race
    }
  }
}
    `;
export type UpdateDemographicDetailMutationFn = Apollo.MutationFunction<UpdateDemographicDetailMutation, UpdateDemographicDetailMutationVariables>;
export type UpdateDemographicDetailComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateDemographicDetailMutation, UpdateDemographicDetailMutationVariables>, 'mutation'>;

    export const UpdateDemographicDetailComponent = (props: UpdateDemographicDetailComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateDemographicDetailMutation, UpdateDemographicDetailMutationVariables> mutation={UpdateDemographicDetailDocument} {...props} />
    );
    
export type UpdateDemographicDetailProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateDemographicDetailMutation, UpdateDemographicDetailMutationVariables>
    } & TChildProps;
export function withUpdateDemographicDetail<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateDemographicDetailMutation,
  UpdateDemographicDetailMutationVariables,
  UpdateDemographicDetailProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateDemographicDetailMutation, UpdateDemographicDetailMutationVariables, UpdateDemographicDetailProps<TChildProps, TDataName>>(UpdateDemographicDetailDocument, {
      alias: 'updateDemographicDetail',
      ...operationOptions
    });
};

/**
 * __useUpdateDemographicDetailMutation__
 *
 * To run a mutation, you first call `useUpdateDemographicDetailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDemographicDetailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDemographicDetailMutation, { data, loading, error }] = useUpdateDemographicDetailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDemographicDetailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDemographicDetailMutation, UpdateDemographicDetailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDemographicDetailMutation, UpdateDemographicDetailMutationVariables>(UpdateDemographicDetailDocument, options);
      }
export type UpdateDemographicDetailMutationHookResult = ReturnType<typeof useUpdateDemographicDetailMutation>;
export type UpdateDemographicDetailMutationResult = Apollo.MutationResult<UpdateDemographicDetailMutation>;
export type UpdateDemographicDetailMutationOptions = Apollo.BaseMutationOptions<UpdateDemographicDetailMutation, UpdateDemographicDetailMutationVariables>;
export const GetDriversLicenseDetailsDocument = gql`
    query GetDriversLicenseDetails {
  personalDetails {
    id
    driversLicense {
      expiresAt
      issuingState
      number
    }
  }
}
    `;
export type GetDriversLicenseDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetDriversLicenseDetailsQuery, GetDriversLicenseDetailsQueryVariables>, 'query'>;

    export const GetDriversLicenseDetailsComponent = (props: GetDriversLicenseDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetDriversLicenseDetailsQuery, GetDriversLicenseDetailsQueryVariables> query={GetDriversLicenseDetailsDocument} {...props} />
    );
    
export type GetDriversLicenseDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetDriversLicenseDetailsQuery, GetDriversLicenseDetailsQueryVariables>
    } & TChildProps;
export function withGetDriversLicenseDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetDriversLicenseDetailsQuery,
  GetDriversLicenseDetailsQueryVariables,
  GetDriversLicenseDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetDriversLicenseDetailsQuery, GetDriversLicenseDetailsQueryVariables, GetDriversLicenseDetailsProps<TChildProps, TDataName>>(GetDriversLicenseDetailsDocument, {
      alias: 'getDriversLicenseDetails',
      ...operationOptions
    });
};

/**
 * __useGetDriversLicenseDetailsQuery__
 *
 * To run a query within a React component, call `useGetDriversLicenseDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDriversLicenseDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDriversLicenseDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDriversLicenseDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetDriversLicenseDetailsQuery, GetDriversLicenseDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDriversLicenseDetailsQuery, GetDriversLicenseDetailsQueryVariables>(GetDriversLicenseDetailsDocument, options);
      }
export function useGetDriversLicenseDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDriversLicenseDetailsQuery, GetDriversLicenseDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDriversLicenseDetailsQuery, GetDriversLicenseDetailsQueryVariables>(GetDriversLicenseDetailsDocument, options);
        }
export type GetDriversLicenseDetailsQueryHookResult = ReturnType<typeof useGetDriversLicenseDetailsQuery>;
export type GetDriversLicenseDetailsLazyQueryHookResult = ReturnType<typeof useGetDriversLicenseDetailsLazyQuery>;
export type GetDriversLicenseDetailsQueryResult = Apollo.QueryResult<GetDriversLicenseDetailsQuery, GetDriversLicenseDetailsQueryVariables>;
export const UpdateDriversLicenseDocument = gql`
    mutation UpdateDriversLicense($input: UpdateDriversLicenseMutationInput!) {
  updateDriversLicense(input: $input) {
    driversLicense {
      number
    }
  }
}
    `;
export type UpdateDriversLicenseMutationFn = Apollo.MutationFunction<UpdateDriversLicenseMutation, UpdateDriversLicenseMutationVariables>;
export type UpdateDriversLicenseComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateDriversLicenseMutation, UpdateDriversLicenseMutationVariables>, 'mutation'>;

    export const UpdateDriversLicenseComponent = (props: UpdateDriversLicenseComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateDriversLicenseMutation, UpdateDriversLicenseMutationVariables> mutation={UpdateDriversLicenseDocument} {...props} />
    );
    
export type UpdateDriversLicenseProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateDriversLicenseMutation, UpdateDriversLicenseMutationVariables>
    } & TChildProps;
export function withUpdateDriversLicense<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateDriversLicenseMutation,
  UpdateDriversLicenseMutationVariables,
  UpdateDriversLicenseProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateDriversLicenseMutation, UpdateDriversLicenseMutationVariables, UpdateDriversLicenseProps<TChildProps, TDataName>>(UpdateDriversLicenseDocument, {
      alias: 'updateDriversLicense',
      ...operationOptions
    });
};

/**
 * __useUpdateDriversLicenseMutation__
 *
 * To run a mutation, you first call `useUpdateDriversLicenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDriversLicenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDriversLicenseMutation, { data, loading, error }] = useUpdateDriversLicenseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDriversLicenseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDriversLicenseMutation, UpdateDriversLicenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDriversLicenseMutation, UpdateDriversLicenseMutationVariables>(UpdateDriversLicenseDocument, options);
      }
export type UpdateDriversLicenseMutationHookResult = ReturnType<typeof useUpdateDriversLicenseMutation>;
export type UpdateDriversLicenseMutationResult = Apollo.MutationResult<UpdateDriversLicenseMutation>;
export type UpdateDriversLicenseMutationOptions = Apollo.BaseMutationOptions<UpdateDriversLicenseMutation, UpdateDriversLicenseMutationVariables>;
export const GetEmploymentGapDetailsDocument = gql`
    query GetEmploymentGapDetails {
  personalDetails {
    id
    employmentGap {
      text
    }
  }
}
    `;
export type GetEmploymentGapDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetEmploymentGapDetailsQuery, GetEmploymentGapDetailsQueryVariables>, 'query'>;

    export const GetEmploymentGapDetailsComponent = (props: GetEmploymentGapDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetEmploymentGapDetailsQuery, GetEmploymentGapDetailsQueryVariables> query={GetEmploymentGapDetailsDocument} {...props} />
    );
    
export type GetEmploymentGapDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetEmploymentGapDetailsQuery, GetEmploymentGapDetailsQueryVariables>
    } & TChildProps;
export function withGetEmploymentGapDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetEmploymentGapDetailsQuery,
  GetEmploymentGapDetailsQueryVariables,
  GetEmploymentGapDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetEmploymentGapDetailsQuery, GetEmploymentGapDetailsQueryVariables, GetEmploymentGapDetailsProps<TChildProps, TDataName>>(GetEmploymentGapDetailsDocument, {
      alias: 'getEmploymentGapDetails',
      ...operationOptions
    });
};

/**
 * __useGetEmploymentGapDetailsQuery__
 *
 * To run a query within a React component, call `useGetEmploymentGapDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmploymentGapDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmploymentGapDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEmploymentGapDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetEmploymentGapDetailsQuery, GetEmploymentGapDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmploymentGapDetailsQuery, GetEmploymentGapDetailsQueryVariables>(GetEmploymentGapDetailsDocument, options);
      }
export function useGetEmploymentGapDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmploymentGapDetailsQuery, GetEmploymentGapDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmploymentGapDetailsQuery, GetEmploymentGapDetailsQueryVariables>(GetEmploymentGapDetailsDocument, options);
        }
export type GetEmploymentGapDetailsQueryHookResult = ReturnType<typeof useGetEmploymentGapDetailsQuery>;
export type GetEmploymentGapDetailsLazyQueryHookResult = ReturnType<typeof useGetEmploymentGapDetailsLazyQuery>;
export type GetEmploymentGapDetailsQueryResult = Apollo.QueryResult<GetEmploymentGapDetailsQuery, GetEmploymentGapDetailsQueryVariables>;
export const UpdateEmploymentGapDetailsDocument = gql`
    mutation UpdateEmploymentGapDetails($input: UpdateEmploymentGapMutationInput!) {
  updateEmploymentGap(input: $input) {
    employmentGap {
      text
    }
  }
}
    `;
export type UpdateEmploymentGapDetailsMutationFn = Apollo.MutationFunction<UpdateEmploymentGapDetailsMutation, UpdateEmploymentGapDetailsMutationVariables>;
export type UpdateEmploymentGapDetailsComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateEmploymentGapDetailsMutation, UpdateEmploymentGapDetailsMutationVariables>, 'mutation'>;

    export const UpdateEmploymentGapDetailsComponent = (props: UpdateEmploymentGapDetailsComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateEmploymentGapDetailsMutation, UpdateEmploymentGapDetailsMutationVariables> mutation={UpdateEmploymentGapDetailsDocument} {...props} />
    );
    
export type UpdateEmploymentGapDetailsProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateEmploymentGapDetailsMutation, UpdateEmploymentGapDetailsMutationVariables>
    } & TChildProps;
export function withUpdateEmploymentGapDetails<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateEmploymentGapDetailsMutation,
  UpdateEmploymentGapDetailsMutationVariables,
  UpdateEmploymentGapDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateEmploymentGapDetailsMutation, UpdateEmploymentGapDetailsMutationVariables, UpdateEmploymentGapDetailsProps<TChildProps, TDataName>>(UpdateEmploymentGapDetailsDocument, {
      alias: 'updateEmploymentGapDetails',
      ...operationOptions
    });
};

/**
 * __useUpdateEmploymentGapDetailsMutation__
 *
 * To run a mutation, you first call `useUpdateEmploymentGapDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEmploymentGapDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEmploymentGapDetailsMutation, { data, loading, error }] = useUpdateEmploymentGapDetailsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEmploymentGapDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEmploymentGapDetailsMutation, UpdateEmploymentGapDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEmploymentGapDetailsMutation, UpdateEmploymentGapDetailsMutationVariables>(UpdateEmploymentGapDetailsDocument, options);
      }
export type UpdateEmploymentGapDetailsMutationHookResult = ReturnType<typeof useUpdateEmploymentGapDetailsMutation>;
export type UpdateEmploymentGapDetailsMutationResult = Apollo.MutationResult<UpdateEmploymentGapDetailsMutation>;
export type UpdateEmploymentGapDetailsMutationOptions = Apollo.BaseMutationOptions<UpdateEmploymentGapDetailsMutation, UpdateEmploymentGapDetailsMutationVariables>;
export const GetHealthProfessionsScholarshipsDocument = gql`
    query GetHealthProfessionsScholarships {
  personalDetails {
    id
    healthProfessionsScholarship {
      militaryBranchScholarshipSponsor
      startedAt
      endedAt
    }
  }
}
    `;
export type GetHealthProfessionsScholarshipsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetHealthProfessionsScholarshipsQuery, GetHealthProfessionsScholarshipsQueryVariables>, 'query'>;

    export const GetHealthProfessionsScholarshipsComponent = (props: GetHealthProfessionsScholarshipsComponentProps) => (
      <ApolloReactComponents.Query<GetHealthProfessionsScholarshipsQuery, GetHealthProfessionsScholarshipsQueryVariables> query={GetHealthProfessionsScholarshipsDocument} {...props} />
    );
    
export type GetHealthProfessionsScholarshipsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetHealthProfessionsScholarshipsQuery, GetHealthProfessionsScholarshipsQueryVariables>
    } & TChildProps;
export function withGetHealthProfessionsScholarships<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetHealthProfessionsScholarshipsQuery,
  GetHealthProfessionsScholarshipsQueryVariables,
  GetHealthProfessionsScholarshipsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetHealthProfessionsScholarshipsQuery, GetHealthProfessionsScholarshipsQueryVariables, GetHealthProfessionsScholarshipsProps<TChildProps, TDataName>>(GetHealthProfessionsScholarshipsDocument, {
      alias: 'getHealthProfessionsScholarships',
      ...operationOptions
    });
};

/**
 * __useGetHealthProfessionsScholarshipsQuery__
 *
 * To run a query within a React component, call `useGetHealthProfessionsScholarshipsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHealthProfessionsScholarshipsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHealthProfessionsScholarshipsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHealthProfessionsScholarshipsQuery(baseOptions?: Apollo.QueryHookOptions<GetHealthProfessionsScholarshipsQuery, GetHealthProfessionsScholarshipsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHealthProfessionsScholarshipsQuery, GetHealthProfessionsScholarshipsQueryVariables>(GetHealthProfessionsScholarshipsDocument, options);
      }
export function useGetHealthProfessionsScholarshipsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHealthProfessionsScholarshipsQuery, GetHealthProfessionsScholarshipsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHealthProfessionsScholarshipsQuery, GetHealthProfessionsScholarshipsQueryVariables>(GetHealthProfessionsScholarshipsDocument, options);
        }
export type GetHealthProfessionsScholarshipsQueryHookResult = ReturnType<typeof useGetHealthProfessionsScholarshipsQuery>;
export type GetHealthProfessionsScholarshipsLazyQueryHookResult = ReturnType<typeof useGetHealthProfessionsScholarshipsLazyQuery>;
export type GetHealthProfessionsScholarshipsQueryResult = Apollo.QueryResult<GetHealthProfessionsScholarshipsQuery, GetHealthProfessionsScholarshipsQueryVariables>;
export const UpdateHealthProfessionsScholarshipDocument = gql`
    mutation UpdateHealthProfessionsScholarship($input: UpdateHealthProfessionsScholarshipMutationInput!) {
  updateHealthProfessionsScholarship(input: $input) {
    healthProfessionsScholarship {
      militaryBranchScholarshipSponsor
    }
  }
}
    `;
export type UpdateHealthProfessionsScholarshipMutationFn = Apollo.MutationFunction<UpdateHealthProfessionsScholarshipMutation, UpdateHealthProfessionsScholarshipMutationVariables>;
export type UpdateHealthProfessionsScholarshipComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateHealthProfessionsScholarshipMutation, UpdateHealthProfessionsScholarshipMutationVariables>, 'mutation'>;

    export const UpdateHealthProfessionsScholarshipComponent = (props: UpdateHealthProfessionsScholarshipComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateHealthProfessionsScholarshipMutation, UpdateHealthProfessionsScholarshipMutationVariables> mutation={UpdateHealthProfessionsScholarshipDocument} {...props} />
    );
    
export type UpdateHealthProfessionsScholarshipProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateHealthProfessionsScholarshipMutation, UpdateHealthProfessionsScholarshipMutationVariables>
    } & TChildProps;
export function withUpdateHealthProfessionsScholarship<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateHealthProfessionsScholarshipMutation,
  UpdateHealthProfessionsScholarshipMutationVariables,
  UpdateHealthProfessionsScholarshipProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateHealthProfessionsScholarshipMutation, UpdateHealthProfessionsScholarshipMutationVariables, UpdateHealthProfessionsScholarshipProps<TChildProps, TDataName>>(UpdateHealthProfessionsScholarshipDocument, {
      alias: 'updateHealthProfessionsScholarship',
      ...operationOptions
    });
};

/**
 * __useUpdateHealthProfessionsScholarshipMutation__
 *
 * To run a mutation, you first call `useUpdateHealthProfessionsScholarshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHealthProfessionsScholarshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHealthProfessionsScholarshipMutation, { data, loading, error }] = useUpdateHealthProfessionsScholarshipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateHealthProfessionsScholarshipMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHealthProfessionsScholarshipMutation, UpdateHealthProfessionsScholarshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHealthProfessionsScholarshipMutation, UpdateHealthProfessionsScholarshipMutationVariables>(UpdateHealthProfessionsScholarshipDocument, options);
      }
export type UpdateHealthProfessionsScholarshipMutationHookResult = ReturnType<typeof useUpdateHealthProfessionsScholarshipMutation>;
export type UpdateHealthProfessionsScholarshipMutationResult = Apollo.MutationResult<UpdateHealthProfessionsScholarshipMutation>;
export type UpdateHealthProfessionsScholarshipMutationOptions = Apollo.BaseMutationOptions<UpdateHealthProfessionsScholarshipMutation, UpdateHealthProfessionsScholarshipMutationVariables>;
export const DeleteHealthProfessionsScholarshipDocument = gql`
    mutation DeleteHealthProfessionsScholarship {
  deleteHealthProfessionsScholarship {
    success
  }
}
    `;
export type DeleteHealthProfessionsScholarshipMutationFn = Apollo.MutationFunction<DeleteHealthProfessionsScholarshipMutation, DeleteHealthProfessionsScholarshipMutationVariables>;
export type DeleteHealthProfessionsScholarshipComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteHealthProfessionsScholarshipMutation, DeleteHealthProfessionsScholarshipMutationVariables>, 'mutation'>;

    export const DeleteHealthProfessionsScholarshipComponent = (props: DeleteHealthProfessionsScholarshipComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteHealthProfessionsScholarshipMutation, DeleteHealthProfessionsScholarshipMutationVariables> mutation={DeleteHealthProfessionsScholarshipDocument} {...props} />
    );
    
export type DeleteHealthProfessionsScholarshipProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<DeleteHealthProfessionsScholarshipMutation, DeleteHealthProfessionsScholarshipMutationVariables>
    } & TChildProps;
export function withDeleteHealthProfessionsScholarship<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteHealthProfessionsScholarshipMutation,
  DeleteHealthProfessionsScholarshipMutationVariables,
  DeleteHealthProfessionsScholarshipProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteHealthProfessionsScholarshipMutation, DeleteHealthProfessionsScholarshipMutationVariables, DeleteHealthProfessionsScholarshipProps<TChildProps, TDataName>>(DeleteHealthProfessionsScholarshipDocument, {
      alias: 'deleteHealthProfessionsScholarship',
      ...operationOptions
    });
};

/**
 * __useDeleteHealthProfessionsScholarshipMutation__
 *
 * To run a mutation, you first call `useDeleteHealthProfessionsScholarshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHealthProfessionsScholarshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHealthProfessionsScholarshipMutation, { data, loading, error }] = useDeleteHealthProfessionsScholarshipMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteHealthProfessionsScholarshipMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHealthProfessionsScholarshipMutation, DeleteHealthProfessionsScholarshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHealthProfessionsScholarshipMutation, DeleteHealthProfessionsScholarshipMutationVariables>(DeleteHealthProfessionsScholarshipDocument, options);
      }
export type DeleteHealthProfessionsScholarshipMutationHookResult = ReturnType<typeof useDeleteHealthProfessionsScholarshipMutation>;
export type DeleteHealthProfessionsScholarshipMutationResult = Apollo.MutationResult<DeleteHealthProfessionsScholarshipMutation>;
export type DeleteHealthProfessionsScholarshipMutationOptions = Apollo.BaseMutationOptions<DeleteHealthProfessionsScholarshipMutation, DeleteHealthProfessionsScholarshipMutationVariables>;
export const GetHealthcareFacilityAffiliationsDocument = gql`
    query GetHealthcareFacilityAffiliations {
  personalDetails {
    id
    healthcareFacilityAffiliations {
      facilityName
      facilityLegalBusinessName
      facilityType
      departmentOrDivisionName
      addressLine1
      addressLine2
      city
      state
      zipCode
      country
      membershipStatus
      medicalStaffOfficePhoneNumber
      medicalStaffOfficeFaxNumber
      privilegeLimitations
      comments
      startedAt
      endedAt
    }
  }
  states
  countries
}
    `;
export type GetHealthcareFacilityAffiliationsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetHealthcareFacilityAffiliationsQuery, GetHealthcareFacilityAffiliationsQueryVariables>, 'query'>;

    export const GetHealthcareFacilityAffiliationsComponent = (props: GetHealthcareFacilityAffiliationsComponentProps) => (
      <ApolloReactComponents.Query<GetHealthcareFacilityAffiliationsQuery, GetHealthcareFacilityAffiliationsQueryVariables> query={GetHealthcareFacilityAffiliationsDocument} {...props} />
    );
    
export type GetHealthcareFacilityAffiliationsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetHealthcareFacilityAffiliationsQuery, GetHealthcareFacilityAffiliationsQueryVariables>
    } & TChildProps;
export function withGetHealthcareFacilityAffiliations<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetHealthcareFacilityAffiliationsQuery,
  GetHealthcareFacilityAffiliationsQueryVariables,
  GetHealthcareFacilityAffiliationsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetHealthcareFacilityAffiliationsQuery, GetHealthcareFacilityAffiliationsQueryVariables, GetHealthcareFacilityAffiliationsProps<TChildProps, TDataName>>(GetHealthcareFacilityAffiliationsDocument, {
      alias: 'getHealthcareFacilityAffiliations',
      ...operationOptions
    });
};

/**
 * __useGetHealthcareFacilityAffiliationsQuery__
 *
 * To run a query within a React component, call `useGetHealthcareFacilityAffiliationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHealthcareFacilityAffiliationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHealthcareFacilityAffiliationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHealthcareFacilityAffiliationsQuery(baseOptions?: Apollo.QueryHookOptions<GetHealthcareFacilityAffiliationsQuery, GetHealthcareFacilityAffiliationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHealthcareFacilityAffiliationsQuery, GetHealthcareFacilityAffiliationsQueryVariables>(GetHealthcareFacilityAffiliationsDocument, options);
      }
export function useGetHealthcareFacilityAffiliationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHealthcareFacilityAffiliationsQuery, GetHealthcareFacilityAffiliationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHealthcareFacilityAffiliationsQuery, GetHealthcareFacilityAffiliationsQueryVariables>(GetHealthcareFacilityAffiliationsDocument, options);
        }
export type GetHealthcareFacilityAffiliationsQueryHookResult = ReturnType<typeof useGetHealthcareFacilityAffiliationsQuery>;
export type GetHealthcareFacilityAffiliationsLazyQueryHookResult = ReturnType<typeof useGetHealthcareFacilityAffiliationsLazyQuery>;
export type GetHealthcareFacilityAffiliationsQueryResult = Apollo.QueryResult<GetHealthcareFacilityAffiliationsQuery, GetHealthcareFacilityAffiliationsQueryVariables>;
export const UpdateHealthcareFacilityAffiliationsDocument = gql`
    mutation UpdateHealthcareFacilityAffiliations($input: UpdateHealthcareFacilityAffiliationsMutationInput!) {
  updateHealthcareFacilityAffiliations(input: $input) {
    healthcareFacilityAffiliations {
      facilityName
    }
  }
}
    `;
export type UpdateHealthcareFacilityAffiliationsMutationFn = Apollo.MutationFunction<UpdateHealthcareFacilityAffiliationsMutation, UpdateHealthcareFacilityAffiliationsMutationVariables>;
export type UpdateHealthcareFacilityAffiliationsComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateHealthcareFacilityAffiliationsMutation, UpdateHealthcareFacilityAffiliationsMutationVariables>, 'mutation'>;

    export const UpdateHealthcareFacilityAffiliationsComponent = (props: UpdateHealthcareFacilityAffiliationsComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateHealthcareFacilityAffiliationsMutation, UpdateHealthcareFacilityAffiliationsMutationVariables> mutation={UpdateHealthcareFacilityAffiliationsDocument} {...props} />
    );
    
export type UpdateHealthcareFacilityAffiliationsProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateHealthcareFacilityAffiliationsMutation, UpdateHealthcareFacilityAffiliationsMutationVariables>
    } & TChildProps;
export function withUpdateHealthcareFacilityAffiliations<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateHealthcareFacilityAffiliationsMutation,
  UpdateHealthcareFacilityAffiliationsMutationVariables,
  UpdateHealthcareFacilityAffiliationsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateHealthcareFacilityAffiliationsMutation, UpdateHealthcareFacilityAffiliationsMutationVariables, UpdateHealthcareFacilityAffiliationsProps<TChildProps, TDataName>>(UpdateHealthcareFacilityAffiliationsDocument, {
      alias: 'updateHealthcareFacilityAffiliations',
      ...operationOptions
    });
};

/**
 * __useUpdateHealthcareFacilityAffiliationsMutation__
 *
 * To run a mutation, you first call `useUpdateHealthcareFacilityAffiliationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHealthcareFacilityAffiliationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHealthcareFacilityAffiliationsMutation, { data, loading, error }] = useUpdateHealthcareFacilityAffiliationsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateHealthcareFacilityAffiliationsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHealthcareFacilityAffiliationsMutation, UpdateHealthcareFacilityAffiliationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHealthcareFacilityAffiliationsMutation, UpdateHealthcareFacilityAffiliationsMutationVariables>(UpdateHealthcareFacilityAffiliationsDocument, options);
      }
export type UpdateHealthcareFacilityAffiliationsMutationHookResult = ReturnType<typeof useUpdateHealthcareFacilityAffiliationsMutation>;
export type UpdateHealthcareFacilityAffiliationsMutationResult = Apollo.MutationResult<UpdateHealthcareFacilityAffiliationsMutation>;
export type UpdateHealthcareFacilityAffiliationsMutationOptions = Apollo.BaseMutationOptions<UpdateHealthcareFacilityAffiliationsMutation, UpdateHealthcareFacilityAffiliationsMutationVariables>;
export const GetHospitalAffiliationsDocument = gql`
    query GetHospitalAffiliations {
  personalDetails {
    id
    hospitalAffiliations {
      hospitalName
      hospitalLegalBusinessName
      departmentName
      addressLine1
      addressLine2
      city
      state
      country
      zipCode
      membershipStatus
      staffOfficePhoneNumber
      staffOfficeFaxNumber
      privilegeLimitations
      comments
      startedAt
      endedAt
    }
  }
  states
  countries
}
    `;
export type GetHospitalAffiliationsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetHospitalAffiliationsQuery, GetHospitalAffiliationsQueryVariables>, 'query'>;

    export const GetHospitalAffiliationsComponent = (props: GetHospitalAffiliationsComponentProps) => (
      <ApolloReactComponents.Query<GetHospitalAffiliationsQuery, GetHospitalAffiliationsQueryVariables> query={GetHospitalAffiliationsDocument} {...props} />
    );
    
export type GetHospitalAffiliationsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetHospitalAffiliationsQuery, GetHospitalAffiliationsQueryVariables>
    } & TChildProps;
export function withGetHospitalAffiliations<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetHospitalAffiliationsQuery,
  GetHospitalAffiliationsQueryVariables,
  GetHospitalAffiliationsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetHospitalAffiliationsQuery, GetHospitalAffiliationsQueryVariables, GetHospitalAffiliationsProps<TChildProps, TDataName>>(GetHospitalAffiliationsDocument, {
      alias: 'getHospitalAffiliations',
      ...operationOptions
    });
};

/**
 * __useGetHospitalAffiliationsQuery__
 *
 * To run a query within a React component, call `useGetHospitalAffiliationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHospitalAffiliationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHospitalAffiliationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHospitalAffiliationsQuery(baseOptions?: Apollo.QueryHookOptions<GetHospitalAffiliationsQuery, GetHospitalAffiliationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHospitalAffiliationsQuery, GetHospitalAffiliationsQueryVariables>(GetHospitalAffiliationsDocument, options);
      }
export function useGetHospitalAffiliationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHospitalAffiliationsQuery, GetHospitalAffiliationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHospitalAffiliationsQuery, GetHospitalAffiliationsQueryVariables>(GetHospitalAffiliationsDocument, options);
        }
export type GetHospitalAffiliationsQueryHookResult = ReturnType<typeof useGetHospitalAffiliationsQuery>;
export type GetHospitalAffiliationsLazyQueryHookResult = ReturnType<typeof useGetHospitalAffiliationsLazyQuery>;
export type GetHospitalAffiliationsQueryResult = Apollo.QueryResult<GetHospitalAffiliationsQuery, GetHospitalAffiliationsQueryVariables>;
export const UpdateHospitalAffiliationsDocument = gql`
    mutation UpdateHospitalAffiliations($input: UpdateHospitalAffiliationsMutationInput!) {
  updateHospitalAffiliations(input: $input) {
    hospitalAffiliations {
      hospitalName
    }
  }
}
    `;
export type UpdateHospitalAffiliationsMutationFn = Apollo.MutationFunction<UpdateHospitalAffiliationsMutation, UpdateHospitalAffiliationsMutationVariables>;
export type UpdateHospitalAffiliationsComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateHospitalAffiliationsMutation, UpdateHospitalAffiliationsMutationVariables>, 'mutation'>;

    export const UpdateHospitalAffiliationsComponent = (props: UpdateHospitalAffiliationsComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateHospitalAffiliationsMutation, UpdateHospitalAffiliationsMutationVariables> mutation={UpdateHospitalAffiliationsDocument} {...props} />
    );
    
export type UpdateHospitalAffiliationsProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateHospitalAffiliationsMutation, UpdateHospitalAffiliationsMutationVariables>
    } & TChildProps;
export function withUpdateHospitalAffiliations<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateHospitalAffiliationsMutation,
  UpdateHospitalAffiliationsMutationVariables,
  UpdateHospitalAffiliationsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateHospitalAffiliationsMutation, UpdateHospitalAffiliationsMutationVariables, UpdateHospitalAffiliationsProps<TChildProps, TDataName>>(UpdateHospitalAffiliationsDocument, {
      alias: 'updateHospitalAffiliations',
      ...operationOptions
    });
};

/**
 * __useUpdateHospitalAffiliationsMutation__
 *
 * To run a mutation, you first call `useUpdateHospitalAffiliationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHospitalAffiliationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHospitalAffiliationsMutation, { data, loading, error }] = useUpdateHospitalAffiliationsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateHospitalAffiliationsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHospitalAffiliationsMutation, UpdateHospitalAffiliationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHospitalAffiliationsMutation, UpdateHospitalAffiliationsMutationVariables>(UpdateHospitalAffiliationsDocument, options);
      }
export type UpdateHospitalAffiliationsMutationHookResult = ReturnType<typeof useUpdateHospitalAffiliationsMutation>;
export type UpdateHospitalAffiliationsMutationResult = Apollo.MutationResult<UpdateHospitalAffiliationsMutation>;
export type UpdateHospitalAffiliationsMutationOptions = Apollo.BaseMutationOptions<UpdateHospitalAffiliationsMutation, UpdateHospitalAffiliationsMutationVariables>;
export const GetIdNumbersDocument = gql`
    query GetIdNumbers {
  personalDetails {
    id
    socialSecurityNumber
    npiNumber
    upinNumber
    personalMedicareNumber
    personalMedicaidNumber
    orcidId
    researcherId
    scopusAuthorId
  }
}
    `;
export type GetIdNumbersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetIdNumbersQuery, GetIdNumbersQueryVariables>, 'query'>;

    export const GetIdNumbersComponent = (props: GetIdNumbersComponentProps) => (
      <ApolloReactComponents.Query<GetIdNumbersQuery, GetIdNumbersQueryVariables> query={GetIdNumbersDocument} {...props} />
    );
    
export type GetIdNumbersProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetIdNumbersQuery, GetIdNumbersQueryVariables>
    } & TChildProps;
export function withGetIdNumbers<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetIdNumbersQuery,
  GetIdNumbersQueryVariables,
  GetIdNumbersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetIdNumbersQuery, GetIdNumbersQueryVariables, GetIdNumbersProps<TChildProps, TDataName>>(GetIdNumbersDocument, {
      alias: 'getIdNumbers',
      ...operationOptions
    });
};

/**
 * __useGetIdNumbersQuery__
 *
 * To run a query within a React component, call `useGetIdNumbersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIdNumbersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIdNumbersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetIdNumbersQuery(baseOptions?: Apollo.QueryHookOptions<GetIdNumbersQuery, GetIdNumbersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIdNumbersQuery, GetIdNumbersQueryVariables>(GetIdNumbersDocument, options);
      }
export function useGetIdNumbersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIdNumbersQuery, GetIdNumbersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIdNumbersQuery, GetIdNumbersQueryVariables>(GetIdNumbersDocument, options);
        }
export type GetIdNumbersQueryHookResult = ReturnType<typeof useGetIdNumbersQuery>;
export type GetIdNumbersLazyQueryHookResult = ReturnType<typeof useGetIdNumbersLazyQuery>;
export type GetIdNumbersQueryResult = Apollo.QueryResult<GetIdNumbersQuery, GetIdNumbersQueryVariables>;
export const UpdateIdNumbersDocument = gql`
    mutation UpdateIdNumbers($input: UpdateIdNumbersMutationInput!) {
  updateIdNumbers(input: $input) {
    personalDetails {
      id
      npiNumber
    }
  }
}
    `;
export type UpdateIdNumbersMutationFn = Apollo.MutationFunction<UpdateIdNumbersMutation, UpdateIdNumbersMutationVariables>;
export type UpdateIdNumbersComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateIdNumbersMutation, UpdateIdNumbersMutationVariables>, 'mutation'>;

    export const UpdateIdNumbersComponent = (props: UpdateIdNumbersComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateIdNumbersMutation, UpdateIdNumbersMutationVariables> mutation={UpdateIdNumbersDocument} {...props} />
    );
    
export type UpdateIdNumbersProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateIdNumbersMutation, UpdateIdNumbersMutationVariables>
    } & TChildProps;
export function withUpdateIdNumbers<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateIdNumbersMutation,
  UpdateIdNumbersMutationVariables,
  UpdateIdNumbersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateIdNumbersMutation, UpdateIdNumbersMutationVariables, UpdateIdNumbersProps<TChildProps, TDataName>>(UpdateIdNumbersDocument, {
      alias: 'updateIdNumbers',
      ...operationOptions
    });
};

/**
 * __useUpdateIdNumbersMutation__
 *
 * To run a mutation, you first call `useUpdateIdNumbersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIdNumbersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIdNumbersMutation, { data, loading, error }] = useUpdateIdNumbersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateIdNumbersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIdNumbersMutation, UpdateIdNumbersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIdNumbersMutation, UpdateIdNumbersMutationVariables>(UpdateIdNumbersDocument, options);
      }
export type UpdateIdNumbersMutationHookResult = ReturnType<typeof useUpdateIdNumbersMutation>;
export type UpdateIdNumbersMutationResult = Apollo.MutationResult<UpdateIdNumbersMutation>;
export type UpdateIdNumbersMutationOptions = Apollo.BaseMutationOptions<UpdateIdNumbersMutation, UpdateIdNumbersMutationVariables>;
export const GetInfluenzaVaccinationDocument = gql`
    query GetInfluenzaVaccination {
  personalDetails {
    id
    influenzaVaccination {
      hasBeenVaccinated
      noVaccinationComment
      vaccinatedAt
      fluSeason
      facilityName
      addressLine1
      addressLine2
      city
      state
      zip
    }
  }
  states
}
    `;
export type GetInfluenzaVaccinationComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetInfluenzaVaccinationQuery, GetInfluenzaVaccinationQueryVariables>, 'query'>;

    export const GetInfluenzaVaccinationComponent = (props: GetInfluenzaVaccinationComponentProps) => (
      <ApolloReactComponents.Query<GetInfluenzaVaccinationQuery, GetInfluenzaVaccinationQueryVariables> query={GetInfluenzaVaccinationDocument} {...props} />
    );
    
export type GetInfluenzaVaccinationProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetInfluenzaVaccinationQuery, GetInfluenzaVaccinationQueryVariables>
    } & TChildProps;
export function withGetInfluenzaVaccination<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetInfluenzaVaccinationQuery,
  GetInfluenzaVaccinationQueryVariables,
  GetInfluenzaVaccinationProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetInfluenzaVaccinationQuery, GetInfluenzaVaccinationQueryVariables, GetInfluenzaVaccinationProps<TChildProps, TDataName>>(GetInfluenzaVaccinationDocument, {
      alias: 'getInfluenzaVaccination',
      ...operationOptions
    });
};

/**
 * __useGetInfluenzaVaccinationQuery__
 *
 * To run a query within a React component, call `useGetInfluenzaVaccinationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInfluenzaVaccinationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInfluenzaVaccinationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInfluenzaVaccinationQuery(baseOptions?: Apollo.QueryHookOptions<GetInfluenzaVaccinationQuery, GetInfluenzaVaccinationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInfluenzaVaccinationQuery, GetInfluenzaVaccinationQueryVariables>(GetInfluenzaVaccinationDocument, options);
      }
export function useGetInfluenzaVaccinationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInfluenzaVaccinationQuery, GetInfluenzaVaccinationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInfluenzaVaccinationQuery, GetInfluenzaVaccinationQueryVariables>(GetInfluenzaVaccinationDocument, options);
        }
export type GetInfluenzaVaccinationQueryHookResult = ReturnType<typeof useGetInfluenzaVaccinationQuery>;
export type GetInfluenzaVaccinationLazyQueryHookResult = ReturnType<typeof useGetInfluenzaVaccinationLazyQuery>;
export type GetInfluenzaVaccinationQueryResult = Apollo.QueryResult<GetInfluenzaVaccinationQuery, GetInfluenzaVaccinationQueryVariables>;
export const UpdateInfluenzaVaccinationDocument = gql`
    mutation UpdateInfluenzaVaccination($input: UpdateInfluenzaVaccinationMutationInput!) {
  updateInfluenzaVaccination(input: $input) {
    influenzaVaccination {
      hasBeenVaccinated
    }
  }
}
    `;
export type UpdateInfluenzaVaccinationMutationFn = Apollo.MutationFunction<UpdateInfluenzaVaccinationMutation, UpdateInfluenzaVaccinationMutationVariables>;
export type UpdateInfluenzaVaccinationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateInfluenzaVaccinationMutation, UpdateInfluenzaVaccinationMutationVariables>, 'mutation'>;

    export const UpdateInfluenzaVaccinationComponent = (props: UpdateInfluenzaVaccinationComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateInfluenzaVaccinationMutation, UpdateInfluenzaVaccinationMutationVariables> mutation={UpdateInfluenzaVaccinationDocument} {...props} />
    );
    
export type UpdateInfluenzaVaccinationProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateInfluenzaVaccinationMutation, UpdateInfluenzaVaccinationMutationVariables>
    } & TChildProps;
export function withUpdateInfluenzaVaccination<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateInfluenzaVaccinationMutation,
  UpdateInfluenzaVaccinationMutationVariables,
  UpdateInfluenzaVaccinationProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateInfluenzaVaccinationMutation, UpdateInfluenzaVaccinationMutationVariables, UpdateInfluenzaVaccinationProps<TChildProps, TDataName>>(UpdateInfluenzaVaccinationDocument, {
      alias: 'updateInfluenzaVaccination',
      ...operationOptions
    });
};

/**
 * __useUpdateInfluenzaVaccinationMutation__
 *
 * To run a mutation, you first call `useUpdateInfluenzaVaccinationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInfluenzaVaccinationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInfluenzaVaccinationMutation, { data, loading, error }] = useUpdateInfluenzaVaccinationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateInfluenzaVaccinationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInfluenzaVaccinationMutation, UpdateInfluenzaVaccinationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInfluenzaVaccinationMutation, UpdateInfluenzaVaccinationMutationVariables>(UpdateInfluenzaVaccinationDocument, options);
      }
export type UpdateInfluenzaVaccinationMutationHookResult = ReturnType<typeof useUpdateInfluenzaVaccinationMutation>;
export type UpdateInfluenzaVaccinationMutationResult = Apollo.MutationResult<UpdateInfluenzaVaccinationMutation>;
export type UpdateInfluenzaVaccinationMutationOptions = Apollo.BaseMutationOptions<UpdateInfluenzaVaccinationMutation, UpdateInfluenzaVaccinationMutationVariables>;
export const GetInsurancePoliciesDocument = gql`
    query GetInsurancePolicies {
  personalDetails {
    id
    insurancePolicies {
      aggregateAmount
      city
      claimsCoverageType
      coverageType
      coveredByFtca
      email
      endedAt
      entityName
      faxNumber
      perClaimAmount
      phoneNumber
      policyNumber
      selfInsured
      startedAt
      state
      streetAddress
      tailCoverage
      url
      zipCode
    }
  }
  states
}
    `;
export type GetInsurancePoliciesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetInsurancePoliciesQuery, GetInsurancePoliciesQueryVariables>, 'query'>;

    export const GetInsurancePoliciesComponent = (props: GetInsurancePoliciesComponentProps) => (
      <ApolloReactComponents.Query<GetInsurancePoliciesQuery, GetInsurancePoliciesQueryVariables> query={GetInsurancePoliciesDocument} {...props} />
    );
    
export type GetInsurancePoliciesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetInsurancePoliciesQuery, GetInsurancePoliciesQueryVariables>
    } & TChildProps;
export function withGetInsurancePolicies<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetInsurancePoliciesQuery,
  GetInsurancePoliciesQueryVariables,
  GetInsurancePoliciesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetInsurancePoliciesQuery, GetInsurancePoliciesQueryVariables, GetInsurancePoliciesProps<TChildProps, TDataName>>(GetInsurancePoliciesDocument, {
      alias: 'getInsurancePolicies',
      ...operationOptions
    });
};

/**
 * __useGetInsurancePoliciesQuery__
 *
 * To run a query within a React component, call `useGetInsurancePoliciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInsurancePoliciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInsurancePoliciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetInsurancePoliciesQuery(baseOptions?: Apollo.QueryHookOptions<GetInsurancePoliciesQuery, GetInsurancePoliciesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInsurancePoliciesQuery, GetInsurancePoliciesQueryVariables>(GetInsurancePoliciesDocument, options);
      }
export function useGetInsurancePoliciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInsurancePoliciesQuery, GetInsurancePoliciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInsurancePoliciesQuery, GetInsurancePoliciesQueryVariables>(GetInsurancePoliciesDocument, options);
        }
export type GetInsurancePoliciesQueryHookResult = ReturnType<typeof useGetInsurancePoliciesQuery>;
export type GetInsurancePoliciesLazyQueryHookResult = ReturnType<typeof useGetInsurancePoliciesLazyQuery>;
export type GetInsurancePoliciesQueryResult = Apollo.QueryResult<GetInsurancePoliciesQuery, GetInsurancePoliciesQueryVariables>;
export const UpdateInsurancePoliciesDocument = gql`
    mutation UpdateInsurancePolicies($input: UpdateInsurancePoliciesMutationInput!) {
  updateInsurancePolicies(input: $input) {
    insurancePolicies {
      entityName
    }
  }
}
    `;
export type UpdateInsurancePoliciesMutationFn = Apollo.MutationFunction<UpdateInsurancePoliciesMutation, UpdateInsurancePoliciesMutationVariables>;
export type UpdateInsurancePoliciesComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateInsurancePoliciesMutation, UpdateInsurancePoliciesMutationVariables>, 'mutation'>;

    export const UpdateInsurancePoliciesComponent = (props: UpdateInsurancePoliciesComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateInsurancePoliciesMutation, UpdateInsurancePoliciesMutationVariables> mutation={UpdateInsurancePoliciesDocument} {...props} />
    );
    
export type UpdateInsurancePoliciesProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateInsurancePoliciesMutation, UpdateInsurancePoliciesMutationVariables>
    } & TChildProps;
export function withUpdateInsurancePolicies<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateInsurancePoliciesMutation,
  UpdateInsurancePoliciesMutationVariables,
  UpdateInsurancePoliciesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateInsurancePoliciesMutation, UpdateInsurancePoliciesMutationVariables, UpdateInsurancePoliciesProps<TChildProps, TDataName>>(UpdateInsurancePoliciesDocument, {
      alias: 'updateInsurancePolicies',
      ...operationOptions
    });
};

/**
 * __useUpdateInsurancePoliciesMutation__
 *
 * To run a mutation, you first call `useUpdateInsurancePoliciesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInsurancePoliciesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInsurancePoliciesMutation, { data, loading, error }] = useUpdateInsurancePoliciesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateInsurancePoliciesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInsurancePoliciesMutation, UpdateInsurancePoliciesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInsurancePoliciesMutation, UpdateInsurancePoliciesMutationVariables>(UpdateInsurancePoliciesDocument, options);
      }
export type UpdateInsurancePoliciesMutationHookResult = ReturnType<typeof useUpdateInsurancePoliciesMutation>;
export type UpdateInsurancePoliciesMutationResult = Apollo.MutationResult<UpdateInsurancePoliciesMutation>;
export type UpdateInsurancePoliciesMutationOptions = Apollo.BaseMutationOptions<UpdateInsurancePoliciesMutation, UpdateInsurancePoliciesMutationVariables>;
export const GetLoanRepaymentDetailDetailsDocument = gql`
    query GetLoanRepaymentDetailDetails {
  personalDetails {
    id
    loanRepaymentDetail {
      repaymentProgramName
      nameOfInstitution
      addressLine1
      addressLine2
      city
      state
      zip
      yearsWorkedForRepayment
      startedAt
      endedAt
    }
  }
  states
}
    `;
export type GetLoanRepaymentDetailDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetLoanRepaymentDetailDetailsQuery, GetLoanRepaymentDetailDetailsQueryVariables>, 'query'>;

    export const GetLoanRepaymentDetailDetailsComponent = (props: GetLoanRepaymentDetailDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetLoanRepaymentDetailDetailsQuery, GetLoanRepaymentDetailDetailsQueryVariables> query={GetLoanRepaymentDetailDetailsDocument} {...props} />
    );
    
export type GetLoanRepaymentDetailDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetLoanRepaymentDetailDetailsQuery, GetLoanRepaymentDetailDetailsQueryVariables>
    } & TChildProps;
export function withGetLoanRepaymentDetailDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetLoanRepaymentDetailDetailsQuery,
  GetLoanRepaymentDetailDetailsQueryVariables,
  GetLoanRepaymentDetailDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetLoanRepaymentDetailDetailsQuery, GetLoanRepaymentDetailDetailsQueryVariables, GetLoanRepaymentDetailDetailsProps<TChildProps, TDataName>>(GetLoanRepaymentDetailDetailsDocument, {
      alias: 'getLoanRepaymentDetailDetails',
      ...operationOptions
    });
};

/**
 * __useGetLoanRepaymentDetailDetailsQuery__
 *
 * To run a query within a React component, call `useGetLoanRepaymentDetailDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoanRepaymentDetailDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoanRepaymentDetailDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoanRepaymentDetailDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetLoanRepaymentDetailDetailsQuery, GetLoanRepaymentDetailDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoanRepaymentDetailDetailsQuery, GetLoanRepaymentDetailDetailsQueryVariables>(GetLoanRepaymentDetailDetailsDocument, options);
      }
export function useGetLoanRepaymentDetailDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoanRepaymentDetailDetailsQuery, GetLoanRepaymentDetailDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoanRepaymentDetailDetailsQuery, GetLoanRepaymentDetailDetailsQueryVariables>(GetLoanRepaymentDetailDetailsDocument, options);
        }
export type GetLoanRepaymentDetailDetailsQueryHookResult = ReturnType<typeof useGetLoanRepaymentDetailDetailsQuery>;
export type GetLoanRepaymentDetailDetailsLazyQueryHookResult = ReturnType<typeof useGetLoanRepaymentDetailDetailsLazyQuery>;
export type GetLoanRepaymentDetailDetailsQueryResult = Apollo.QueryResult<GetLoanRepaymentDetailDetailsQuery, GetLoanRepaymentDetailDetailsQueryVariables>;
export const UpdateLoanRepaymentDetailDocument = gql`
    mutation UpdateLoanRepaymentDetail($input: UpdateLoanRepaymentDetailMutationInput!) {
  updateLoanRepaymentDetail(input: $input) {
    loanRepaymentDetail {
      repaymentProgramName
    }
  }
}
    `;
export type UpdateLoanRepaymentDetailMutationFn = Apollo.MutationFunction<UpdateLoanRepaymentDetailMutation, UpdateLoanRepaymentDetailMutationVariables>;
export type UpdateLoanRepaymentDetailComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateLoanRepaymentDetailMutation, UpdateLoanRepaymentDetailMutationVariables>, 'mutation'>;

    export const UpdateLoanRepaymentDetailComponent = (props: UpdateLoanRepaymentDetailComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateLoanRepaymentDetailMutation, UpdateLoanRepaymentDetailMutationVariables> mutation={UpdateLoanRepaymentDetailDocument} {...props} />
    );
    
export type UpdateLoanRepaymentDetailProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateLoanRepaymentDetailMutation, UpdateLoanRepaymentDetailMutationVariables>
    } & TChildProps;
export function withUpdateLoanRepaymentDetail<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateLoanRepaymentDetailMutation,
  UpdateLoanRepaymentDetailMutationVariables,
  UpdateLoanRepaymentDetailProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateLoanRepaymentDetailMutation, UpdateLoanRepaymentDetailMutationVariables, UpdateLoanRepaymentDetailProps<TChildProps, TDataName>>(UpdateLoanRepaymentDetailDocument, {
      alias: 'updateLoanRepaymentDetail',
      ...operationOptions
    });
};

/**
 * __useUpdateLoanRepaymentDetailMutation__
 *
 * To run a mutation, you first call `useUpdateLoanRepaymentDetailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLoanRepaymentDetailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLoanRepaymentDetailMutation, { data, loading, error }] = useUpdateLoanRepaymentDetailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLoanRepaymentDetailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLoanRepaymentDetailMutation, UpdateLoanRepaymentDetailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLoanRepaymentDetailMutation, UpdateLoanRepaymentDetailMutationVariables>(UpdateLoanRepaymentDetailDocument, options);
      }
export type UpdateLoanRepaymentDetailMutationHookResult = ReturnType<typeof useUpdateLoanRepaymentDetailMutation>;
export type UpdateLoanRepaymentDetailMutationResult = Apollo.MutationResult<UpdateLoanRepaymentDetailMutation>;
export type UpdateLoanRepaymentDetailMutationOptions = Apollo.BaseMutationOptions<UpdateLoanRepaymentDetailMutation, UpdateLoanRepaymentDetailMutationVariables>;
export const DeleteLoanRepaymentDetailDocument = gql`
    mutation DeleteLoanRepaymentDetail {
  deleteLoanRepaymentDetail {
    success
  }
}
    `;
export type DeleteLoanRepaymentDetailMutationFn = Apollo.MutationFunction<DeleteLoanRepaymentDetailMutation, DeleteLoanRepaymentDetailMutationVariables>;
export type DeleteLoanRepaymentDetailComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteLoanRepaymentDetailMutation, DeleteLoanRepaymentDetailMutationVariables>, 'mutation'>;

    export const DeleteLoanRepaymentDetailComponent = (props: DeleteLoanRepaymentDetailComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteLoanRepaymentDetailMutation, DeleteLoanRepaymentDetailMutationVariables> mutation={DeleteLoanRepaymentDetailDocument} {...props} />
    );
    
export type DeleteLoanRepaymentDetailProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<DeleteLoanRepaymentDetailMutation, DeleteLoanRepaymentDetailMutationVariables>
    } & TChildProps;
export function withDeleteLoanRepaymentDetail<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteLoanRepaymentDetailMutation,
  DeleteLoanRepaymentDetailMutationVariables,
  DeleteLoanRepaymentDetailProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteLoanRepaymentDetailMutation, DeleteLoanRepaymentDetailMutationVariables, DeleteLoanRepaymentDetailProps<TChildProps, TDataName>>(DeleteLoanRepaymentDetailDocument, {
      alias: 'deleteLoanRepaymentDetail',
      ...operationOptions
    });
};

/**
 * __useDeleteLoanRepaymentDetailMutation__
 *
 * To run a mutation, you first call `useDeleteLoanRepaymentDetailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLoanRepaymentDetailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLoanRepaymentDetailMutation, { data, loading, error }] = useDeleteLoanRepaymentDetailMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteLoanRepaymentDetailMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLoanRepaymentDetailMutation, DeleteLoanRepaymentDetailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLoanRepaymentDetailMutation, DeleteLoanRepaymentDetailMutationVariables>(DeleteLoanRepaymentDetailDocument, options);
      }
export type DeleteLoanRepaymentDetailMutationHookResult = ReturnType<typeof useDeleteLoanRepaymentDetailMutation>;
export type DeleteLoanRepaymentDetailMutationResult = Apollo.MutationResult<DeleteLoanRepaymentDetailMutation>;
export type DeleteLoanRepaymentDetailMutationOptions = Apollo.BaseMutationOptions<DeleteLoanRepaymentDetailMutation, DeleteLoanRepaymentDetailMutationVariables>;
export const GetMalpracticeClaimsDocument = gql`
    query GetMalpracticeClaims {
  personalDetails {
    id
    malpracticeClaims {
      allegedIncidentDate
      amountPaid
      claimFiledAt
      claimStatus
      defendantType
      descriptionOfAllegations
      descriptionOfAllegedInjury
      includedInNpdb
      insuranceCarrierInvolved
      involvementDescription
      methodOfResolution
      numberOfCoDefendants
      policyNumberCoveredBy
      resolutionComment
      settlementAmount
    }
  }
}
    `;
export type GetMalpracticeClaimsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMalpracticeClaimsQuery, GetMalpracticeClaimsQueryVariables>, 'query'>;

    export const GetMalpracticeClaimsComponent = (props: GetMalpracticeClaimsComponentProps) => (
      <ApolloReactComponents.Query<GetMalpracticeClaimsQuery, GetMalpracticeClaimsQueryVariables> query={GetMalpracticeClaimsDocument} {...props} />
    );
    
export type GetMalpracticeClaimsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetMalpracticeClaimsQuery, GetMalpracticeClaimsQueryVariables>
    } & TChildProps;
export function withGetMalpracticeClaims<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMalpracticeClaimsQuery,
  GetMalpracticeClaimsQueryVariables,
  GetMalpracticeClaimsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetMalpracticeClaimsQuery, GetMalpracticeClaimsQueryVariables, GetMalpracticeClaimsProps<TChildProps, TDataName>>(GetMalpracticeClaimsDocument, {
      alias: 'getMalpracticeClaims',
      ...operationOptions
    });
};

/**
 * __useGetMalpracticeClaimsQuery__
 *
 * To run a query within a React component, call `useGetMalpracticeClaimsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMalpracticeClaimsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMalpracticeClaimsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMalpracticeClaimsQuery(baseOptions?: Apollo.QueryHookOptions<GetMalpracticeClaimsQuery, GetMalpracticeClaimsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMalpracticeClaimsQuery, GetMalpracticeClaimsQueryVariables>(GetMalpracticeClaimsDocument, options);
      }
export function useGetMalpracticeClaimsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMalpracticeClaimsQuery, GetMalpracticeClaimsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMalpracticeClaimsQuery, GetMalpracticeClaimsQueryVariables>(GetMalpracticeClaimsDocument, options);
        }
export type GetMalpracticeClaimsQueryHookResult = ReturnType<typeof useGetMalpracticeClaimsQuery>;
export type GetMalpracticeClaimsLazyQueryHookResult = ReturnType<typeof useGetMalpracticeClaimsLazyQuery>;
export type GetMalpracticeClaimsQueryResult = Apollo.QueryResult<GetMalpracticeClaimsQuery, GetMalpracticeClaimsQueryVariables>;
export const UpdateMalpracticeClaimsDocument = gql`
    mutation UpdateMalpracticeClaims($input: UpdateMalpracticeClaimsMutationInput!) {
  updateMalpracticeClaims(input: $input) {
    malpracticeClaims {
      defendantType
    }
  }
}
    `;
export type UpdateMalpracticeClaimsMutationFn = Apollo.MutationFunction<UpdateMalpracticeClaimsMutation, UpdateMalpracticeClaimsMutationVariables>;
export type UpdateMalpracticeClaimsComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateMalpracticeClaimsMutation, UpdateMalpracticeClaimsMutationVariables>, 'mutation'>;

    export const UpdateMalpracticeClaimsComponent = (props: UpdateMalpracticeClaimsComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateMalpracticeClaimsMutation, UpdateMalpracticeClaimsMutationVariables> mutation={UpdateMalpracticeClaimsDocument} {...props} />
    );
    
export type UpdateMalpracticeClaimsProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateMalpracticeClaimsMutation, UpdateMalpracticeClaimsMutationVariables>
    } & TChildProps;
export function withUpdateMalpracticeClaims<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateMalpracticeClaimsMutation,
  UpdateMalpracticeClaimsMutationVariables,
  UpdateMalpracticeClaimsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateMalpracticeClaimsMutation, UpdateMalpracticeClaimsMutationVariables, UpdateMalpracticeClaimsProps<TChildProps, TDataName>>(UpdateMalpracticeClaimsDocument, {
      alias: 'updateMalpracticeClaims',
      ...operationOptions
    });
};

/**
 * __useUpdateMalpracticeClaimsMutation__
 *
 * To run a mutation, you first call `useUpdateMalpracticeClaimsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMalpracticeClaimsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMalpracticeClaimsMutation, { data, loading, error }] = useUpdateMalpracticeClaimsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMalpracticeClaimsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMalpracticeClaimsMutation, UpdateMalpracticeClaimsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMalpracticeClaimsMutation, UpdateMalpracticeClaimsMutationVariables>(UpdateMalpracticeClaimsDocument, options);
      }
export type UpdateMalpracticeClaimsMutationHookResult = ReturnType<typeof useUpdateMalpracticeClaimsMutation>;
export type UpdateMalpracticeClaimsMutationResult = Apollo.MutationResult<UpdateMalpracticeClaimsMutation>;
export type UpdateMalpracticeClaimsMutationOptions = Apollo.BaseMutationOptions<UpdateMalpracticeClaimsMutation, UpdateMalpracticeClaimsMutationVariables>;
export const GetMedicalDegreeDetailsDocument = gql`
    query GetMedicalDegreeDetails {
  personalDetails {
    id
    medicalDegree {
      institutionName
      kind
      dateOfGraduation
      startedAt
      endedAt
      registrarPhoneNumber
      registrarUrl
      foreignMedicalSchool
      ecfmgCertified
      ecfmgCertifiedAt
      institutionAddressLine1
      institutionAddressLine2
      institutionAddressLine3
      institutionAddressCity
      institutionAddressState
      institutionAddressZip
      institutionAddressCountry
    }
  }
  states
  countries
}
    `;
export type GetMedicalDegreeDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMedicalDegreeDetailsQuery, GetMedicalDegreeDetailsQueryVariables>, 'query'>;

    export const GetMedicalDegreeDetailsComponent = (props: GetMedicalDegreeDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetMedicalDegreeDetailsQuery, GetMedicalDegreeDetailsQueryVariables> query={GetMedicalDegreeDetailsDocument} {...props} />
    );
    
export type GetMedicalDegreeDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetMedicalDegreeDetailsQuery, GetMedicalDegreeDetailsQueryVariables>
    } & TChildProps;
export function withGetMedicalDegreeDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMedicalDegreeDetailsQuery,
  GetMedicalDegreeDetailsQueryVariables,
  GetMedicalDegreeDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetMedicalDegreeDetailsQuery, GetMedicalDegreeDetailsQueryVariables, GetMedicalDegreeDetailsProps<TChildProps, TDataName>>(GetMedicalDegreeDetailsDocument, {
      alias: 'getMedicalDegreeDetails',
      ...operationOptions
    });
};

/**
 * __useGetMedicalDegreeDetailsQuery__
 *
 * To run a query within a React component, call `useGetMedicalDegreeDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMedicalDegreeDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMedicalDegreeDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMedicalDegreeDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetMedicalDegreeDetailsQuery, GetMedicalDegreeDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMedicalDegreeDetailsQuery, GetMedicalDegreeDetailsQueryVariables>(GetMedicalDegreeDetailsDocument, options);
      }
export function useGetMedicalDegreeDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMedicalDegreeDetailsQuery, GetMedicalDegreeDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMedicalDegreeDetailsQuery, GetMedicalDegreeDetailsQueryVariables>(GetMedicalDegreeDetailsDocument, options);
        }
export type GetMedicalDegreeDetailsQueryHookResult = ReturnType<typeof useGetMedicalDegreeDetailsQuery>;
export type GetMedicalDegreeDetailsLazyQueryHookResult = ReturnType<typeof useGetMedicalDegreeDetailsLazyQuery>;
export type GetMedicalDegreeDetailsQueryResult = Apollo.QueryResult<GetMedicalDegreeDetailsQuery, GetMedicalDegreeDetailsQueryVariables>;
export const UpdateMedicalDegreeDocument = gql`
    mutation UpdateMedicalDegree($input: UpdateMedicalDegreeMutationInput!) {
  updateMedicalDegree(input: $input) {
    medicalDegree {
      kind
    }
  }
}
    `;
export type UpdateMedicalDegreeMutationFn = Apollo.MutationFunction<UpdateMedicalDegreeMutation, UpdateMedicalDegreeMutationVariables>;
export type UpdateMedicalDegreeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateMedicalDegreeMutation, UpdateMedicalDegreeMutationVariables>, 'mutation'>;

    export const UpdateMedicalDegreeComponent = (props: UpdateMedicalDegreeComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateMedicalDegreeMutation, UpdateMedicalDegreeMutationVariables> mutation={UpdateMedicalDegreeDocument} {...props} />
    );
    
export type UpdateMedicalDegreeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateMedicalDegreeMutation, UpdateMedicalDegreeMutationVariables>
    } & TChildProps;
export function withUpdateMedicalDegree<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateMedicalDegreeMutation,
  UpdateMedicalDegreeMutationVariables,
  UpdateMedicalDegreeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateMedicalDegreeMutation, UpdateMedicalDegreeMutationVariables, UpdateMedicalDegreeProps<TChildProps, TDataName>>(UpdateMedicalDegreeDocument, {
      alias: 'updateMedicalDegree',
      ...operationOptions
    });
};

/**
 * __useUpdateMedicalDegreeMutation__
 *
 * To run a mutation, you first call `useUpdateMedicalDegreeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMedicalDegreeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMedicalDegreeMutation, { data, loading, error }] = useUpdateMedicalDegreeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMedicalDegreeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMedicalDegreeMutation, UpdateMedicalDegreeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMedicalDegreeMutation, UpdateMedicalDegreeMutationVariables>(UpdateMedicalDegreeDocument, options);
      }
export type UpdateMedicalDegreeMutationHookResult = ReturnType<typeof useUpdateMedicalDegreeMutation>;
export type UpdateMedicalDegreeMutationResult = Apollo.MutationResult<UpdateMedicalDegreeMutation>;
export type UpdateMedicalDegreeMutationOptions = Apollo.BaseMutationOptions<UpdateMedicalDegreeMutation, UpdateMedicalDegreeMutationVariables>;
export const GetMedicalGroupEmployersDocument = gql`
    query GetMedicalGroupEmployers {
  personalDetails {
    id
    medicalGroupEmployers {
      name
      legalBusinessName
      addressLine1
      addressLine2
      city
      state
      country
      zip
      phoneNumber
      startedAt
      endedAt
    }
  }
  states
  countries
}
    `;
export type GetMedicalGroupEmployersComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMedicalGroupEmployersQuery, GetMedicalGroupEmployersQueryVariables>, 'query'>;

    export const GetMedicalGroupEmployersComponent = (props: GetMedicalGroupEmployersComponentProps) => (
      <ApolloReactComponents.Query<GetMedicalGroupEmployersQuery, GetMedicalGroupEmployersQueryVariables> query={GetMedicalGroupEmployersDocument} {...props} />
    );
    
export type GetMedicalGroupEmployersProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetMedicalGroupEmployersQuery, GetMedicalGroupEmployersQueryVariables>
    } & TChildProps;
export function withGetMedicalGroupEmployers<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMedicalGroupEmployersQuery,
  GetMedicalGroupEmployersQueryVariables,
  GetMedicalGroupEmployersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetMedicalGroupEmployersQuery, GetMedicalGroupEmployersQueryVariables, GetMedicalGroupEmployersProps<TChildProps, TDataName>>(GetMedicalGroupEmployersDocument, {
      alias: 'getMedicalGroupEmployers',
      ...operationOptions
    });
};

/**
 * __useGetMedicalGroupEmployersQuery__
 *
 * To run a query within a React component, call `useGetMedicalGroupEmployersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMedicalGroupEmployersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMedicalGroupEmployersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMedicalGroupEmployersQuery(baseOptions?: Apollo.QueryHookOptions<GetMedicalGroupEmployersQuery, GetMedicalGroupEmployersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMedicalGroupEmployersQuery, GetMedicalGroupEmployersQueryVariables>(GetMedicalGroupEmployersDocument, options);
      }
export function useGetMedicalGroupEmployersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMedicalGroupEmployersQuery, GetMedicalGroupEmployersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMedicalGroupEmployersQuery, GetMedicalGroupEmployersQueryVariables>(GetMedicalGroupEmployersDocument, options);
        }
export type GetMedicalGroupEmployersQueryHookResult = ReturnType<typeof useGetMedicalGroupEmployersQuery>;
export type GetMedicalGroupEmployersLazyQueryHookResult = ReturnType<typeof useGetMedicalGroupEmployersLazyQuery>;
export type GetMedicalGroupEmployersQueryResult = Apollo.QueryResult<GetMedicalGroupEmployersQuery, GetMedicalGroupEmployersQueryVariables>;
export const UpdateMedicalGroupEmployersDocument = gql`
    mutation UpdateMedicalGroupEmployers($input: UpdateMedicalGroupEmployersMutationInput!) {
  updateMedicalGroupEmployers(input: $input) {
    medicalGroupEmployers {
      name
    }
  }
}
    `;
export type UpdateMedicalGroupEmployersMutationFn = Apollo.MutationFunction<UpdateMedicalGroupEmployersMutation, UpdateMedicalGroupEmployersMutationVariables>;
export type UpdateMedicalGroupEmployersComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateMedicalGroupEmployersMutation, UpdateMedicalGroupEmployersMutationVariables>, 'mutation'>;

    export const UpdateMedicalGroupEmployersComponent = (props: UpdateMedicalGroupEmployersComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateMedicalGroupEmployersMutation, UpdateMedicalGroupEmployersMutationVariables> mutation={UpdateMedicalGroupEmployersDocument} {...props} />
    );
    
export type UpdateMedicalGroupEmployersProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateMedicalGroupEmployersMutation, UpdateMedicalGroupEmployersMutationVariables>
    } & TChildProps;
export function withUpdateMedicalGroupEmployers<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateMedicalGroupEmployersMutation,
  UpdateMedicalGroupEmployersMutationVariables,
  UpdateMedicalGroupEmployersProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateMedicalGroupEmployersMutation, UpdateMedicalGroupEmployersMutationVariables, UpdateMedicalGroupEmployersProps<TChildProps, TDataName>>(UpdateMedicalGroupEmployersDocument, {
      alias: 'updateMedicalGroupEmployers',
      ...operationOptions
    });
};

/**
 * __useUpdateMedicalGroupEmployersMutation__
 *
 * To run a mutation, you first call `useUpdateMedicalGroupEmployersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMedicalGroupEmployersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMedicalGroupEmployersMutation, { data, loading, error }] = useUpdateMedicalGroupEmployersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMedicalGroupEmployersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMedicalGroupEmployersMutation, UpdateMedicalGroupEmployersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMedicalGroupEmployersMutation, UpdateMedicalGroupEmployersMutationVariables>(UpdateMedicalGroupEmployersDocument, options);
      }
export type UpdateMedicalGroupEmployersMutationHookResult = ReturnType<typeof useUpdateMedicalGroupEmployersMutation>;
export type UpdateMedicalGroupEmployersMutationResult = Apollo.MutationResult<UpdateMedicalGroupEmployersMutation>;
export type UpdateMedicalGroupEmployersMutationOptions = Apollo.BaseMutationOptions<UpdateMedicalGroupEmployersMutation, UpdateMedicalGroupEmployersMutationVariables>;
export const GetMilitaryServiceDetailsDocument = gql`
    query GetMilitaryServiceDetails {
  personalDetails {
    id
    militaryService {
      startedAt
      endedAt
      branchOfService
      activeDuty
      hasDd214
    }
  }
}
    `;
export type GetMilitaryServiceDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetMilitaryServiceDetailsQuery, GetMilitaryServiceDetailsQueryVariables>, 'query'>;

    export const GetMilitaryServiceDetailsComponent = (props: GetMilitaryServiceDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetMilitaryServiceDetailsQuery, GetMilitaryServiceDetailsQueryVariables> query={GetMilitaryServiceDetailsDocument} {...props} />
    );
    
export type GetMilitaryServiceDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetMilitaryServiceDetailsQuery, GetMilitaryServiceDetailsQueryVariables>
    } & TChildProps;
export function withGetMilitaryServiceDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetMilitaryServiceDetailsQuery,
  GetMilitaryServiceDetailsQueryVariables,
  GetMilitaryServiceDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetMilitaryServiceDetailsQuery, GetMilitaryServiceDetailsQueryVariables, GetMilitaryServiceDetailsProps<TChildProps, TDataName>>(GetMilitaryServiceDetailsDocument, {
      alias: 'getMilitaryServiceDetails',
      ...operationOptions
    });
};

/**
 * __useGetMilitaryServiceDetailsQuery__
 *
 * To run a query within a React component, call `useGetMilitaryServiceDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMilitaryServiceDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMilitaryServiceDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMilitaryServiceDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetMilitaryServiceDetailsQuery, GetMilitaryServiceDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMilitaryServiceDetailsQuery, GetMilitaryServiceDetailsQueryVariables>(GetMilitaryServiceDetailsDocument, options);
      }
export function useGetMilitaryServiceDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMilitaryServiceDetailsQuery, GetMilitaryServiceDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMilitaryServiceDetailsQuery, GetMilitaryServiceDetailsQueryVariables>(GetMilitaryServiceDetailsDocument, options);
        }
export type GetMilitaryServiceDetailsQueryHookResult = ReturnType<typeof useGetMilitaryServiceDetailsQuery>;
export type GetMilitaryServiceDetailsLazyQueryHookResult = ReturnType<typeof useGetMilitaryServiceDetailsLazyQuery>;
export type GetMilitaryServiceDetailsQueryResult = Apollo.QueryResult<GetMilitaryServiceDetailsQuery, GetMilitaryServiceDetailsQueryVariables>;
export const UpdateMilitaryServiceDocument = gql`
    mutation UpdateMilitaryService($input: UpdateMilitaryServiceMutationInput!) {
  updateMilitaryService(input: $input) {
    militaryService {
      startedAt
    }
  }
}
    `;
export type UpdateMilitaryServiceMutationFn = Apollo.MutationFunction<UpdateMilitaryServiceMutation, UpdateMilitaryServiceMutationVariables>;
export type UpdateMilitaryServiceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateMilitaryServiceMutation, UpdateMilitaryServiceMutationVariables>, 'mutation'>;

    export const UpdateMilitaryServiceComponent = (props: UpdateMilitaryServiceComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateMilitaryServiceMutation, UpdateMilitaryServiceMutationVariables> mutation={UpdateMilitaryServiceDocument} {...props} />
    );
    
export type UpdateMilitaryServiceProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateMilitaryServiceMutation, UpdateMilitaryServiceMutationVariables>
    } & TChildProps;
export function withUpdateMilitaryService<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateMilitaryServiceMutation,
  UpdateMilitaryServiceMutationVariables,
  UpdateMilitaryServiceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateMilitaryServiceMutation, UpdateMilitaryServiceMutationVariables, UpdateMilitaryServiceProps<TChildProps, TDataName>>(UpdateMilitaryServiceDocument, {
      alias: 'updateMilitaryService',
      ...operationOptions
    });
};

/**
 * __useUpdateMilitaryServiceMutation__
 *
 * To run a mutation, you first call `useUpdateMilitaryServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMilitaryServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMilitaryServiceMutation, { data, loading, error }] = useUpdateMilitaryServiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMilitaryServiceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMilitaryServiceMutation, UpdateMilitaryServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMilitaryServiceMutation, UpdateMilitaryServiceMutationVariables>(UpdateMilitaryServiceDocument, options);
      }
export type UpdateMilitaryServiceMutationHookResult = ReturnType<typeof useUpdateMilitaryServiceMutation>;
export type UpdateMilitaryServiceMutationResult = Apollo.MutationResult<UpdateMilitaryServiceMutation>;
export type UpdateMilitaryServiceMutationOptions = Apollo.BaseMutationOptions<UpdateMilitaryServiceMutation, UpdateMilitaryServiceMutationVariables>;
export const DeleteMilitaryServiceDocument = gql`
    mutation DeleteMilitaryService {
  deleteMilitaryService {
    success
  }
}
    `;
export type DeleteMilitaryServiceMutationFn = Apollo.MutationFunction<DeleteMilitaryServiceMutation, DeleteMilitaryServiceMutationVariables>;
export type DeleteMilitaryServiceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteMilitaryServiceMutation, DeleteMilitaryServiceMutationVariables>, 'mutation'>;

    export const DeleteMilitaryServiceComponent = (props: DeleteMilitaryServiceComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteMilitaryServiceMutation, DeleteMilitaryServiceMutationVariables> mutation={DeleteMilitaryServiceDocument} {...props} />
    );
    
export type DeleteMilitaryServiceProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<DeleteMilitaryServiceMutation, DeleteMilitaryServiceMutationVariables>
    } & TChildProps;
export function withDeleteMilitaryService<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteMilitaryServiceMutation,
  DeleteMilitaryServiceMutationVariables,
  DeleteMilitaryServiceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteMilitaryServiceMutation, DeleteMilitaryServiceMutationVariables, DeleteMilitaryServiceProps<TChildProps, TDataName>>(DeleteMilitaryServiceDocument, {
      alias: 'deleteMilitaryService',
      ...operationOptions
    });
};

/**
 * __useDeleteMilitaryServiceMutation__
 *
 * To run a mutation, you first call `useDeleteMilitaryServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMilitaryServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMilitaryServiceMutation, { data, loading, error }] = useDeleteMilitaryServiceMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteMilitaryServiceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMilitaryServiceMutation, DeleteMilitaryServiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMilitaryServiceMutation, DeleteMilitaryServiceMutationVariables>(DeleteMilitaryServiceDocument, options);
      }
export type DeleteMilitaryServiceMutationHookResult = ReturnType<typeof useDeleteMilitaryServiceMutation>;
export type DeleteMilitaryServiceMutationResult = Apollo.MutationResult<DeleteMilitaryServiceMutation>;
export type DeleteMilitaryServiceMutationOptions = Apollo.BaseMutationOptions<DeleteMilitaryServiceMutation, DeleteMilitaryServiceMutationVariables>;
export const GetNationalHealthServiceCorpsScholarshipsDocument = gql`
    query GetNationalHealthServiceCorpsScholarships {
  personalDetails {
    id
    nationalHealthServiceCorpsScholarship {
      startedAt
      endedAt
    }
  }
}
    `;
export type GetNationalHealthServiceCorpsScholarshipsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetNationalHealthServiceCorpsScholarshipsQuery, GetNationalHealthServiceCorpsScholarshipsQueryVariables>, 'query'>;

    export const GetNationalHealthServiceCorpsScholarshipsComponent = (props: GetNationalHealthServiceCorpsScholarshipsComponentProps) => (
      <ApolloReactComponents.Query<GetNationalHealthServiceCorpsScholarshipsQuery, GetNationalHealthServiceCorpsScholarshipsQueryVariables> query={GetNationalHealthServiceCorpsScholarshipsDocument} {...props} />
    );
    
export type GetNationalHealthServiceCorpsScholarshipsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetNationalHealthServiceCorpsScholarshipsQuery, GetNationalHealthServiceCorpsScholarshipsQueryVariables>
    } & TChildProps;
export function withGetNationalHealthServiceCorpsScholarships<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetNationalHealthServiceCorpsScholarshipsQuery,
  GetNationalHealthServiceCorpsScholarshipsQueryVariables,
  GetNationalHealthServiceCorpsScholarshipsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetNationalHealthServiceCorpsScholarshipsQuery, GetNationalHealthServiceCorpsScholarshipsQueryVariables, GetNationalHealthServiceCorpsScholarshipsProps<TChildProps, TDataName>>(GetNationalHealthServiceCorpsScholarshipsDocument, {
      alias: 'getNationalHealthServiceCorpsScholarships',
      ...operationOptions
    });
};

/**
 * __useGetNationalHealthServiceCorpsScholarshipsQuery__
 *
 * To run a query within a React component, call `useGetNationalHealthServiceCorpsScholarshipsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNationalHealthServiceCorpsScholarshipsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNationalHealthServiceCorpsScholarshipsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNationalHealthServiceCorpsScholarshipsQuery(baseOptions?: Apollo.QueryHookOptions<GetNationalHealthServiceCorpsScholarshipsQuery, GetNationalHealthServiceCorpsScholarshipsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNationalHealthServiceCorpsScholarshipsQuery, GetNationalHealthServiceCorpsScholarshipsQueryVariables>(GetNationalHealthServiceCorpsScholarshipsDocument, options);
      }
export function useGetNationalHealthServiceCorpsScholarshipsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNationalHealthServiceCorpsScholarshipsQuery, GetNationalHealthServiceCorpsScholarshipsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNationalHealthServiceCorpsScholarshipsQuery, GetNationalHealthServiceCorpsScholarshipsQueryVariables>(GetNationalHealthServiceCorpsScholarshipsDocument, options);
        }
export type GetNationalHealthServiceCorpsScholarshipsQueryHookResult = ReturnType<typeof useGetNationalHealthServiceCorpsScholarshipsQuery>;
export type GetNationalHealthServiceCorpsScholarshipsLazyQueryHookResult = ReturnType<typeof useGetNationalHealthServiceCorpsScholarshipsLazyQuery>;
export type GetNationalHealthServiceCorpsScholarshipsQueryResult = Apollo.QueryResult<GetNationalHealthServiceCorpsScholarshipsQuery, GetNationalHealthServiceCorpsScholarshipsQueryVariables>;
export const UpdateNationalHealthServiceCorpsScholarshipDocument = gql`
    mutation UpdateNationalHealthServiceCorpsScholarship($input: UpdateNationalHealthServiceCorpsScholarshipMutationInput!) {
  updateNationalHealthServiceCorpsScholarship(input: $input) {
    scholarship {
      startedAt
    }
  }
}
    `;
export type UpdateNationalHealthServiceCorpsScholarshipMutationFn = Apollo.MutationFunction<UpdateNationalHealthServiceCorpsScholarshipMutation, UpdateNationalHealthServiceCorpsScholarshipMutationVariables>;
export type UpdateNationalHealthServiceCorpsScholarshipComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateNationalHealthServiceCorpsScholarshipMutation, UpdateNationalHealthServiceCorpsScholarshipMutationVariables>, 'mutation'>;

    export const UpdateNationalHealthServiceCorpsScholarshipComponent = (props: UpdateNationalHealthServiceCorpsScholarshipComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateNationalHealthServiceCorpsScholarshipMutation, UpdateNationalHealthServiceCorpsScholarshipMutationVariables> mutation={UpdateNationalHealthServiceCorpsScholarshipDocument} {...props} />
    );
    
export type UpdateNationalHealthServiceCorpsScholarshipProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateNationalHealthServiceCorpsScholarshipMutation, UpdateNationalHealthServiceCorpsScholarshipMutationVariables>
    } & TChildProps;
export function withUpdateNationalHealthServiceCorpsScholarship<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateNationalHealthServiceCorpsScholarshipMutation,
  UpdateNationalHealthServiceCorpsScholarshipMutationVariables,
  UpdateNationalHealthServiceCorpsScholarshipProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateNationalHealthServiceCorpsScholarshipMutation, UpdateNationalHealthServiceCorpsScholarshipMutationVariables, UpdateNationalHealthServiceCorpsScholarshipProps<TChildProps, TDataName>>(UpdateNationalHealthServiceCorpsScholarshipDocument, {
      alias: 'updateNationalHealthServiceCorpsScholarship',
      ...operationOptions
    });
};

/**
 * __useUpdateNationalHealthServiceCorpsScholarshipMutation__
 *
 * To run a mutation, you first call `useUpdateNationalHealthServiceCorpsScholarshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNationalHealthServiceCorpsScholarshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNationalHealthServiceCorpsScholarshipMutation, { data, loading, error }] = useUpdateNationalHealthServiceCorpsScholarshipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNationalHealthServiceCorpsScholarshipMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNationalHealthServiceCorpsScholarshipMutation, UpdateNationalHealthServiceCorpsScholarshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNationalHealthServiceCorpsScholarshipMutation, UpdateNationalHealthServiceCorpsScholarshipMutationVariables>(UpdateNationalHealthServiceCorpsScholarshipDocument, options);
      }
export type UpdateNationalHealthServiceCorpsScholarshipMutationHookResult = ReturnType<typeof useUpdateNationalHealthServiceCorpsScholarshipMutation>;
export type UpdateNationalHealthServiceCorpsScholarshipMutationResult = Apollo.MutationResult<UpdateNationalHealthServiceCorpsScholarshipMutation>;
export type UpdateNationalHealthServiceCorpsScholarshipMutationOptions = Apollo.BaseMutationOptions<UpdateNationalHealthServiceCorpsScholarshipMutation, UpdateNationalHealthServiceCorpsScholarshipMutationVariables>;
export const DeleteNationalHealthServiceCorpScholarshipDocument = gql`
    mutation DeleteNationalHealthServiceCorpScholarship {
  deleteNationHealthServiceCorpsScholarship {
    success
  }
}
    `;
export type DeleteNationalHealthServiceCorpScholarshipMutationFn = Apollo.MutationFunction<DeleteNationalHealthServiceCorpScholarshipMutation, DeleteNationalHealthServiceCorpScholarshipMutationVariables>;
export type DeleteNationalHealthServiceCorpScholarshipComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteNationalHealthServiceCorpScholarshipMutation, DeleteNationalHealthServiceCorpScholarshipMutationVariables>, 'mutation'>;

    export const DeleteNationalHealthServiceCorpScholarshipComponent = (props: DeleteNationalHealthServiceCorpScholarshipComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteNationalHealthServiceCorpScholarshipMutation, DeleteNationalHealthServiceCorpScholarshipMutationVariables> mutation={DeleteNationalHealthServiceCorpScholarshipDocument} {...props} />
    );
    
export type DeleteNationalHealthServiceCorpScholarshipProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<DeleteNationalHealthServiceCorpScholarshipMutation, DeleteNationalHealthServiceCorpScholarshipMutationVariables>
    } & TChildProps;
export function withDeleteNationalHealthServiceCorpScholarship<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteNationalHealthServiceCorpScholarshipMutation,
  DeleteNationalHealthServiceCorpScholarshipMutationVariables,
  DeleteNationalHealthServiceCorpScholarshipProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteNationalHealthServiceCorpScholarshipMutation, DeleteNationalHealthServiceCorpScholarshipMutationVariables, DeleteNationalHealthServiceCorpScholarshipProps<TChildProps, TDataName>>(DeleteNationalHealthServiceCorpScholarshipDocument, {
      alias: 'deleteNationalHealthServiceCorpScholarship',
      ...operationOptions
    });
};

/**
 * __useDeleteNationalHealthServiceCorpScholarshipMutation__
 *
 * To run a mutation, you first call `useDeleteNationalHealthServiceCorpScholarshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNationalHealthServiceCorpScholarshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNationalHealthServiceCorpScholarshipMutation, { data, loading, error }] = useDeleteNationalHealthServiceCorpScholarshipMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteNationalHealthServiceCorpScholarshipMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNationalHealthServiceCorpScholarshipMutation, DeleteNationalHealthServiceCorpScholarshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNationalHealthServiceCorpScholarshipMutation, DeleteNationalHealthServiceCorpScholarshipMutationVariables>(DeleteNationalHealthServiceCorpScholarshipDocument, options);
      }
export type DeleteNationalHealthServiceCorpScholarshipMutationHookResult = ReturnType<typeof useDeleteNationalHealthServiceCorpScholarshipMutation>;
export type DeleteNationalHealthServiceCorpScholarshipMutationResult = Apollo.MutationResult<DeleteNationalHealthServiceCorpScholarshipMutation>;
export type DeleteNationalHealthServiceCorpScholarshipMutationOptions = Apollo.BaseMutationOptions<DeleteNationalHealthServiceCorpScholarshipMutation, DeleteNationalHealthServiceCorpScholarshipMutationVariables>;
export const GetPpdTuberculosisTestingDocument = gql`
    query GetPpdTuberculosisTesting {
  personalDetails {
    id
    ppdTuberculosisTesting {
      receivedBcgVaccine
      hadPositiveTbSkinTest
      testedMoreThan5YearsAgo
      testedPositiveAt
      yearTestedPositive
      testReactionSize
      hadTbDiseaseDiagnosis
      hasTakenInhOrRifampin
      treatmentCompletedMoreThan5YearsAgo
      treatmentCompletedAt
      yearTreatmentCompleted
      lastChestXrayAt
      testingSiteName
      addressLine1
      addressLine2
      city
      state
      zip
      ppdInduration
      ppdInterpretation
      testDate
      testedInTheLastYear
    }
  }
  states
}
    `;
export type GetPpdTuberculosisTestingComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetPpdTuberculosisTestingQuery, GetPpdTuberculosisTestingQueryVariables>, 'query'>;

    export const GetPpdTuberculosisTestingComponent = (props: GetPpdTuberculosisTestingComponentProps) => (
      <ApolloReactComponents.Query<GetPpdTuberculosisTestingQuery, GetPpdTuberculosisTestingQueryVariables> query={GetPpdTuberculosisTestingDocument} {...props} />
    );
    
export type GetPpdTuberculosisTestingProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetPpdTuberculosisTestingQuery, GetPpdTuberculosisTestingQueryVariables>
    } & TChildProps;
export function withGetPpdTuberculosisTesting<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetPpdTuberculosisTestingQuery,
  GetPpdTuberculosisTestingQueryVariables,
  GetPpdTuberculosisTestingProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetPpdTuberculosisTestingQuery, GetPpdTuberculosisTestingQueryVariables, GetPpdTuberculosisTestingProps<TChildProps, TDataName>>(GetPpdTuberculosisTestingDocument, {
      alias: 'getPpdTuberculosisTesting',
      ...operationOptions
    });
};

/**
 * __useGetPpdTuberculosisTestingQuery__
 *
 * To run a query within a React component, call `useGetPpdTuberculosisTestingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPpdTuberculosisTestingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPpdTuberculosisTestingQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPpdTuberculosisTestingQuery(baseOptions?: Apollo.QueryHookOptions<GetPpdTuberculosisTestingQuery, GetPpdTuberculosisTestingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPpdTuberculosisTestingQuery, GetPpdTuberculosisTestingQueryVariables>(GetPpdTuberculosisTestingDocument, options);
      }
export function useGetPpdTuberculosisTestingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPpdTuberculosisTestingQuery, GetPpdTuberculosisTestingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPpdTuberculosisTestingQuery, GetPpdTuberculosisTestingQueryVariables>(GetPpdTuberculosisTestingDocument, options);
        }
export type GetPpdTuberculosisTestingQueryHookResult = ReturnType<typeof useGetPpdTuberculosisTestingQuery>;
export type GetPpdTuberculosisTestingLazyQueryHookResult = ReturnType<typeof useGetPpdTuberculosisTestingLazyQuery>;
export type GetPpdTuberculosisTestingQueryResult = Apollo.QueryResult<GetPpdTuberculosisTestingQuery, GetPpdTuberculosisTestingQueryVariables>;
export const UpdatePpdTuberculosisTestingDocument = gql`
    mutation UpdatePpdTuberculosisTesting($input: UpdatePPDTuberculosisTestingMutationInput!) {
  updatePpdTuberculosisTesting(input: $input) {
    ppdTuberculosisTesting {
      receivedBcgVaccine
    }
  }
}
    `;
export type UpdatePpdTuberculosisTestingMutationFn = Apollo.MutationFunction<UpdatePpdTuberculosisTestingMutation, UpdatePpdTuberculosisTestingMutationVariables>;
export type UpdatePpdTuberculosisTestingComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdatePpdTuberculosisTestingMutation, UpdatePpdTuberculosisTestingMutationVariables>, 'mutation'>;

    export const UpdatePpdTuberculosisTestingComponent = (props: UpdatePpdTuberculosisTestingComponentProps) => (
      <ApolloReactComponents.Mutation<UpdatePpdTuberculosisTestingMutation, UpdatePpdTuberculosisTestingMutationVariables> mutation={UpdatePpdTuberculosisTestingDocument} {...props} />
    );
    
export type UpdatePpdTuberculosisTestingProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdatePpdTuberculosisTestingMutation, UpdatePpdTuberculosisTestingMutationVariables>
    } & TChildProps;
export function withUpdatePpdTuberculosisTesting<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdatePpdTuberculosisTestingMutation,
  UpdatePpdTuberculosisTestingMutationVariables,
  UpdatePpdTuberculosisTestingProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdatePpdTuberculosisTestingMutation, UpdatePpdTuberculosisTestingMutationVariables, UpdatePpdTuberculosisTestingProps<TChildProps, TDataName>>(UpdatePpdTuberculosisTestingDocument, {
      alias: 'updatePpdTuberculosisTesting',
      ...operationOptions
    });
};

/**
 * __useUpdatePpdTuberculosisTestingMutation__
 *
 * To run a mutation, you first call `useUpdatePpdTuberculosisTestingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePpdTuberculosisTestingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePpdTuberculosisTestingMutation, { data, loading, error }] = useUpdatePpdTuberculosisTestingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePpdTuberculosisTestingMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePpdTuberculosisTestingMutation, UpdatePpdTuberculosisTestingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePpdTuberculosisTestingMutation, UpdatePpdTuberculosisTestingMutationVariables>(UpdatePpdTuberculosisTestingDocument, options);
      }
export type UpdatePpdTuberculosisTestingMutationHookResult = ReturnType<typeof useUpdatePpdTuberculosisTestingMutation>;
export type UpdatePpdTuberculosisTestingMutationResult = Apollo.MutationResult<UpdatePpdTuberculosisTestingMutation>;
export type UpdatePpdTuberculosisTestingMutationOptions = Apollo.BaseMutationOptions<UpdatePpdTuberculosisTestingMutation, UpdatePpdTuberculosisTestingMutationVariables>;
export const GetPassportDetailsDocument = gql`
    query GetPassportDetails {
  personalDetails {
    id
    passport {
      expiresAt
      countryOfIssue
      number
    }
  }
}
    `;
export type GetPassportDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetPassportDetailsQuery, GetPassportDetailsQueryVariables>, 'query'>;

    export const GetPassportDetailsComponent = (props: GetPassportDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetPassportDetailsQuery, GetPassportDetailsQueryVariables> query={GetPassportDetailsDocument} {...props} />
    );
    
export type GetPassportDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetPassportDetailsQuery, GetPassportDetailsQueryVariables>
    } & TChildProps;
export function withGetPassportDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetPassportDetailsQuery,
  GetPassportDetailsQueryVariables,
  GetPassportDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetPassportDetailsQuery, GetPassportDetailsQueryVariables, GetPassportDetailsProps<TChildProps, TDataName>>(GetPassportDetailsDocument, {
      alias: 'getPassportDetails',
      ...operationOptions
    });
};

/**
 * __useGetPassportDetailsQuery__
 *
 * To run a query within a React component, call `useGetPassportDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPassportDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPassportDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPassportDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetPassportDetailsQuery, GetPassportDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPassportDetailsQuery, GetPassportDetailsQueryVariables>(GetPassportDetailsDocument, options);
      }
export function useGetPassportDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPassportDetailsQuery, GetPassportDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPassportDetailsQuery, GetPassportDetailsQueryVariables>(GetPassportDetailsDocument, options);
        }
export type GetPassportDetailsQueryHookResult = ReturnType<typeof useGetPassportDetailsQuery>;
export type GetPassportDetailsLazyQueryHookResult = ReturnType<typeof useGetPassportDetailsLazyQuery>;
export type GetPassportDetailsQueryResult = Apollo.QueryResult<GetPassportDetailsQuery, GetPassportDetailsQueryVariables>;
export const UpdatePassportDocument = gql`
    mutation UpdatePassport($input: UpdatePassportMutationInput!) {
  updatePassport(input: $input) {
    passport {
      number
    }
  }
}
    `;
export type UpdatePassportMutationFn = Apollo.MutationFunction<UpdatePassportMutation, UpdatePassportMutationVariables>;
export type UpdatePassportComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdatePassportMutation, UpdatePassportMutationVariables>, 'mutation'>;

    export const UpdatePassportComponent = (props: UpdatePassportComponentProps) => (
      <ApolloReactComponents.Mutation<UpdatePassportMutation, UpdatePassportMutationVariables> mutation={UpdatePassportDocument} {...props} />
    );
    
export type UpdatePassportProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdatePassportMutation, UpdatePassportMutationVariables>
    } & TChildProps;
export function withUpdatePassport<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdatePassportMutation,
  UpdatePassportMutationVariables,
  UpdatePassportProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdatePassportMutation, UpdatePassportMutationVariables, UpdatePassportProps<TChildProps, TDataName>>(UpdatePassportDocument, {
      alias: 'updatePassport',
      ...operationOptions
    });
};

/**
 * __useUpdatePassportMutation__
 *
 * To run a mutation, you first call `useUpdatePassportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePassportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePassportMutation, { data, loading, error }] = useUpdatePassportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePassportMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePassportMutation, UpdatePassportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePassportMutation, UpdatePassportMutationVariables>(UpdatePassportDocument, options);
      }
export type UpdatePassportMutationHookResult = ReturnType<typeof useUpdatePassportMutation>;
export type UpdatePassportMutationResult = Apollo.MutationResult<UpdatePassportMutation>;
export type UpdatePassportMutationOptions = Apollo.BaseMutationOptions<UpdatePassportMutation, UpdatePassportMutationVariables>;
export const GetPeerReferenceDetailsDocument = gql`
    query GetPeerReferenceDetails($position: Int!) {
  personalDetails {
    id
    peerReference(position: $position) {
      firstName
      lastName
      title
      degree
      specialty
      relationship
      phoneNumber
      emailAddress
      addressLine1
      addressLine2
      city
      state
      country
      zip
      hasWorkedWithInThePastTwoYears
      yearsKnown
      position
    }
  }
  countries
  states
}
    `;
export type GetPeerReferenceDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetPeerReferenceDetailsQuery, GetPeerReferenceDetailsQueryVariables>, 'query'> & ({ variables: GetPeerReferenceDetailsQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetPeerReferenceDetailsComponent = (props: GetPeerReferenceDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetPeerReferenceDetailsQuery, GetPeerReferenceDetailsQueryVariables> query={GetPeerReferenceDetailsDocument} {...props} />
    );
    
export type GetPeerReferenceDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetPeerReferenceDetailsQuery, GetPeerReferenceDetailsQueryVariables>
    } & TChildProps;
export function withGetPeerReferenceDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetPeerReferenceDetailsQuery,
  GetPeerReferenceDetailsQueryVariables,
  GetPeerReferenceDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetPeerReferenceDetailsQuery, GetPeerReferenceDetailsQueryVariables, GetPeerReferenceDetailsProps<TChildProps, TDataName>>(GetPeerReferenceDetailsDocument, {
      alias: 'getPeerReferenceDetails',
      ...operationOptions
    });
};

/**
 * __useGetPeerReferenceDetailsQuery__
 *
 * To run a query within a React component, call `useGetPeerReferenceDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPeerReferenceDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPeerReferenceDetailsQuery({
 *   variables: {
 *      position: // value for 'position'
 *   },
 * });
 */
export function useGetPeerReferenceDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetPeerReferenceDetailsQuery, GetPeerReferenceDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPeerReferenceDetailsQuery, GetPeerReferenceDetailsQueryVariables>(GetPeerReferenceDetailsDocument, options);
      }
export function useGetPeerReferenceDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPeerReferenceDetailsQuery, GetPeerReferenceDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPeerReferenceDetailsQuery, GetPeerReferenceDetailsQueryVariables>(GetPeerReferenceDetailsDocument, options);
        }
export type GetPeerReferenceDetailsQueryHookResult = ReturnType<typeof useGetPeerReferenceDetailsQuery>;
export type GetPeerReferenceDetailsLazyQueryHookResult = ReturnType<typeof useGetPeerReferenceDetailsLazyQuery>;
export type GetPeerReferenceDetailsQueryResult = Apollo.QueryResult<GetPeerReferenceDetailsQuery, GetPeerReferenceDetailsQueryVariables>;
export const UpdatePeerReferenceDocument = gql`
    mutation UpdatePeerReference($input: UpdatePeerReferenceMutationInput!) {
  updatePeerReference(input: $input) {
    peerReference {
      firstName
    }
  }
}
    `;
export type UpdatePeerReferenceMutationFn = Apollo.MutationFunction<UpdatePeerReferenceMutation, UpdatePeerReferenceMutationVariables>;
export type UpdatePeerReferenceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdatePeerReferenceMutation, UpdatePeerReferenceMutationVariables>, 'mutation'>;

    export const UpdatePeerReferenceComponent = (props: UpdatePeerReferenceComponentProps) => (
      <ApolloReactComponents.Mutation<UpdatePeerReferenceMutation, UpdatePeerReferenceMutationVariables> mutation={UpdatePeerReferenceDocument} {...props} />
    );
    
export type UpdatePeerReferenceProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdatePeerReferenceMutation, UpdatePeerReferenceMutationVariables>
    } & TChildProps;
export function withUpdatePeerReference<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdatePeerReferenceMutation,
  UpdatePeerReferenceMutationVariables,
  UpdatePeerReferenceProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdatePeerReferenceMutation, UpdatePeerReferenceMutationVariables, UpdatePeerReferenceProps<TChildProps, TDataName>>(UpdatePeerReferenceDocument, {
      alias: 'updatePeerReference',
      ...operationOptions
    });
};

/**
 * __useUpdatePeerReferenceMutation__
 *
 * To run a mutation, you first call `useUpdatePeerReferenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePeerReferenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePeerReferenceMutation, { data, loading, error }] = useUpdatePeerReferenceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePeerReferenceMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePeerReferenceMutation, UpdatePeerReferenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePeerReferenceMutation, UpdatePeerReferenceMutationVariables>(UpdatePeerReferenceDocument, options);
      }
export type UpdatePeerReferenceMutationHookResult = ReturnType<typeof useUpdatePeerReferenceMutation>;
export type UpdatePeerReferenceMutationResult = Apollo.MutationResult<UpdatePeerReferenceMutation>;
export type UpdatePeerReferenceMutationOptions = Apollo.BaseMutationOptions<UpdatePeerReferenceMutation, UpdatePeerReferenceMutationVariables>;
export const GetPersonalDetailsDocument = gql`
    query GetPersonalDetails {
  personalDetails {
    id
    firstName
    lastName
    middleName
    maidenName
    suffix
    providerProfessionType
    legalGender
    cellPhoneNumber
    emergencyContactNumber
  }
}
    `;
export type GetPersonalDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetPersonalDetailsQuery, GetPersonalDetailsQueryVariables>, 'query'>;

    export const GetPersonalDetailsComponent = (props: GetPersonalDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetPersonalDetailsQuery, GetPersonalDetailsQueryVariables> query={GetPersonalDetailsDocument} {...props} />
    );
    
export type GetPersonalDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetPersonalDetailsQuery, GetPersonalDetailsQueryVariables>
    } & TChildProps;
export function withGetPersonalDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetPersonalDetailsQuery,
  GetPersonalDetailsQueryVariables,
  GetPersonalDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetPersonalDetailsQuery, GetPersonalDetailsQueryVariables, GetPersonalDetailsProps<TChildProps, TDataName>>(GetPersonalDetailsDocument, {
      alias: 'getPersonalDetails',
      ...operationOptions
    });
};

/**
 * __useGetPersonalDetailsQuery__
 *
 * To run a query within a React component, call `useGetPersonalDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPersonalDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPersonalDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPersonalDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetPersonalDetailsQuery, GetPersonalDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPersonalDetailsQuery, GetPersonalDetailsQueryVariables>(GetPersonalDetailsDocument, options);
      }
export function useGetPersonalDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPersonalDetailsQuery, GetPersonalDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPersonalDetailsQuery, GetPersonalDetailsQueryVariables>(GetPersonalDetailsDocument, options);
        }
export type GetPersonalDetailsQueryHookResult = ReturnType<typeof useGetPersonalDetailsQuery>;
export type GetPersonalDetailsLazyQueryHookResult = ReturnType<typeof useGetPersonalDetailsLazyQuery>;
export type GetPersonalDetailsQueryResult = Apollo.QueryResult<GetPersonalDetailsQuery, GetPersonalDetailsQueryVariables>;
export const UpdatePersonalDetailsDocument = gql`
    mutation UpdatePersonalDetails($input: UpdatePersonalDetailsMutationInput!) {
  updatePersonalDetails(input: $input) {
    personalDetails {
      id
      firstName
    }
  }
}
    `;
export type UpdatePersonalDetailsMutationFn = Apollo.MutationFunction<UpdatePersonalDetailsMutation, UpdatePersonalDetailsMutationVariables>;
export type UpdatePersonalDetailsComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdatePersonalDetailsMutation, UpdatePersonalDetailsMutationVariables>, 'mutation'>;

    export const UpdatePersonalDetailsComponent = (props: UpdatePersonalDetailsComponentProps) => (
      <ApolloReactComponents.Mutation<UpdatePersonalDetailsMutation, UpdatePersonalDetailsMutationVariables> mutation={UpdatePersonalDetailsDocument} {...props} />
    );
    
export type UpdatePersonalDetailsProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdatePersonalDetailsMutation, UpdatePersonalDetailsMutationVariables>
    } & TChildProps;
export function withUpdatePersonalDetails<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdatePersonalDetailsMutation,
  UpdatePersonalDetailsMutationVariables,
  UpdatePersonalDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdatePersonalDetailsMutation, UpdatePersonalDetailsMutationVariables, UpdatePersonalDetailsProps<TChildProps, TDataName>>(UpdatePersonalDetailsDocument, {
      alias: 'updatePersonalDetails',
      ...operationOptions
    });
};

/**
 * __useUpdatePersonalDetailsMutation__
 *
 * To run a mutation, you first call `useUpdatePersonalDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonalDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonalDetailsMutation, { data, loading, error }] = useUpdatePersonalDetailsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePersonalDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePersonalDetailsMutation, UpdatePersonalDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePersonalDetailsMutation, UpdatePersonalDetailsMutationVariables>(UpdatePersonalDetailsDocument, options);
      }
export type UpdatePersonalDetailsMutationHookResult = ReturnType<typeof useUpdatePersonalDetailsMutation>;
export type UpdatePersonalDetailsMutationResult = Apollo.MutationResult<UpdatePersonalDetailsMutation>;
export type UpdatePersonalDetailsMutationOptions = Apollo.BaseMutationOptions<UpdatePersonalDetailsMutation, UpdatePersonalDetailsMutationVariables>;
export const GetPostGraduateTrainingDocument = gql`
    query GetPostGraduateTraining($kind: PostGraduateTrainingKind!) {
  personalDetails {
    id
    postGraduateTraining(kind: $kind) {
      acgmeAccredited
      attendanceEndDate
      attendanceStartDate
      currentProgramDirectorFirstName
      currentProgramDirectorLastName
      directorContactEmail
      directorContactNumber
      directorDuringFirstName
      directorDuringLastName
      fellowshipKind
      gmeOfficeEmail
      gmeOfficePhone
      gmeOfficeUrl
      institutionName
      internshipKind
      programDirectorAddressCity
      programDirectorAddressCountry
      programDirectorAddressLine1
      programDirectorAddressLine2
      programDirectorAddressLine3
      programDirectorAddressState
      programDirectorAddressZip
      programAdminEmail
      programAdminName
      programAdminPhone
      residencyKind
      successfullyCompletedProgram
    }
  }
}
    `;
export type GetPostGraduateTrainingComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetPostGraduateTrainingQuery, GetPostGraduateTrainingQueryVariables>, 'query'> & ({ variables: GetPostGraduateTrainingQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetPostGraduateTrainingComponent = (props: GetPostGraduateTrainingComponentProps) => (
      <ApolloReactComponents.Query<GetPostGraduateTrainingQuery, GetPostGraduateTrainingQueryVariables> query={GetPostGraduateTrainingDocument} {...props} />
    );
    
export type GetPostGraduateTrainingProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetPostGraduateTrainingQuery, GetPostGraduateTrainingQueryVariables>
    } & TChildProps;
export function withGetPostGraduateTraining<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetPostGraduateTrainingQuery,
  GetPostGraduateTrainingQueryVariables,
  GetPostGraduateTrainingProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetPostGraduateTrainingQuery, GetPostGraduateTrainingQueryVariables, GetPostGraduateTrainingProps<TChildProps, TDataName>>(GetPostGraduateTrainingDocument, {
      alias: 'getPostGraduateTraining',
      ...operationOptions
    });
};

/**
 * __useGetPostGraduateTrainingQuery__
 *
 * To run a query within a React component, call `useGetPostGraduateTrainingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostGraduateTrainingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostGraduateTrainingQuery({
 *   variables: {
 *      kind: // value for 'kind'
 *   },
 * });
 */
export function useGetPostGraduateTrainingQuery(baseOptions: Apollo.QueryHookOptions<GetPostGraduateTrainingQuery, GetPostGraduateTrainingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostGraduateTrainingQuery, GetPostGraduateTrainingQueryVariables>(GetPostGraduateTrainingDocument, options);
      }
export function useGetPostGraduateTrainingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostGraduateTrainingQuery, GetPostGraduateTrainingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostGraduateTrainingQuery, GetPostGraduateTrainingQueryVariables>(GetPostGraduateTrainingDocument, options);
        }
export type GetPostGraduateTrainingQueryHookResult = ReturnType<typeof useGetPostGraduateTrainingQuery>;
export type GetPostGraduateTrainingLazyQueryHookResult = ReturnType<typeof useGetPostGraduateTrainingLazyQuery>;
export type GetPostGraduateTrainingQueryResult = Apollo.QueryResult<GetPostGraduateTrainingQuery, GetPostGraduateTrainingQueryVariables>;
export const UpdatePostGraduateTrainingDocument = gql`
    mutation UpdatePostGraduateTraining($input: UpdatePostGraduateTrainingMutationInput!) {
  updatePostGraduateTraining(input: $input) {
    postGraduateTraining {
      institutionName
    }
  }
}
    `;
export type UpdatePostGraduateTrainingMutationFn = Apollo.MutationFunction<UpdatePostGraduateTrainingMutation, UpdatePostGraduateTrainingMutationVariables>;
export type UpdatePostGraduateTrainingComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdatePostGraduateTrainingMutation, UpdatePostGraduateTrainingMutationVariables>, 'mutation'>;

    export const UpdatePostGraduateTrainingComponent = (props: UpdatePostGraduateTrainingComponentProps) => (
      <ApolloReactComponents.Mutation<UpdatePostGraduateTrainingMutation, UpdatePostGraduateTrainingMutationVariables> mutation={UpdatePostGraduateTrainingDocument} {...props} />
    );
    
export type UpdatePostGraduateTrainingProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdatePostGraduateTrainingMutation, UpdatePostGraduateTrainingMutationVariables>
    } & TChildProps;
export function withUpdatePostGraduateTraining<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdatePostGraduateTrainingMutation,
  UpdatePostGraduateTrainingMutationVariables,
  UpdatePostGraduateTrainingProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdatePostGraduateTrainingMutation, UpdatePostGraduateTrainingMutationVariables, UpdatePostGraduateTrainingProps<TChildProps, TDataName>>(UpdatePostGraduateTrainingDocument, {
      alias: 'updatePostGraduateTraining',
      ...operationOptions
    });
};

/**
 * __useUpdatePostGraduateTrainingMutation__
 *
 * To run a mutation, you first call `useUpdatePostGraduateTrainingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostGraduateTrainingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostGraduateTrainingMutation, { data, loading, error }] = useUpdatePostGraduateTrainingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostGraduateTrainingMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostGraduateTrainingMutation, UpdatePostGraduateTrainingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostGraduateTrainingMutation, UpdatePostGraduateTrainingMutationVariables>(UpdatePostGraduateTrainingDocument, options);
      }
export type UpdatePostGraduateTrainingMutationHookResult = ReturnType<typeof useUpdatePostGraduateTrainingMutation>;
export type UpdatePostGraduateTrainingMutationResult = Apollo.MutationResult<UpdatePostGraduateTrainingMutation>;
export type UpdatePostGraduateTrainingMutationOptions = Apollo.BaseMutationOptions<UpdatePostGraduateTrainingMutation, UpdatePostGraduateTrainingMutationVariables>;
export const GetPriorNamesDocument = gql`
    query GetPriorNames {
  personalDetails {
    id
    priorNames {
      name
      startedAt
      endedAt
      comment
    }
  }
}
    `;
export type GetPriorNamesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetPriorNamesQuery, GetPriorNamesQueryVariables>, 'query'>;

    export const GetPriorNamesComponent = (props: GetPriorNamesComponentProps) => (
      <ApolloReactComponents.Query<GetPriorNamesQuery, GetPriorNamesQueryVariables> query={GetPriorNamesDocument} {...props} />
    );
    
export type GetPriorNamesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetPriorNamesQuery, GetPriorNamesQueryVariables>
    } & TChildProps;
export function withGetPriorNames<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetPriorNamesQuery,
  GetPriorNamesQueryVariables,
  GetPriorNamesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetPriorNamesQuery, GetPriorNamesQueryVariables, GetPriorNamesProps<TChildProps, TDataName>>(GetPriorNamesDocument, {
      alias: 'getPriorNames',
      ...operationOptions
    });
};

/**
 * __useGetPriorNamesQuery__
 *
 * To run a query within a React component, call `useGetPriorNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPriorNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPriorNamesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPriorNamesQuery(baseOptions?: Apollo.QueryHookOptions<GetPriorNamesQuery, GetPriorNamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPriorNamesQuery, GetPriorNamesQueryVariables>(GetPriorNamesDocument, options);
      }
export function useGetPriorNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPriorNamesQuery, GetPriorNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPriorNamesQuery, GetPriorNamesQueryVariables>(GetPriorNamesDocument, options);
        }
export type GetPriorNamesQueryHookResult = ReturnType<typeof useGetPriorNamesQuery>;
export type GetPriorNamesLazyQueryHookResult = ReturnType<typeof useGetPriorNamesLazyQuery>;
export type GetPriorNamesQueryResult = Apollo.QueryResult<GetPriorNamesQuery, GetPriorNamesQueryVariables>;
export const UpdatePriorNamesDocument = gql`
    mutation UpdatePriorNames($input: UpdatePriorNamesMutationInput!) {
  updatePriorNames(input: $input) {
    priorNames {
      name
    }
  }
}
    `;
export type UpdatePriorNamesMutationFn = Apollo.MutationFunction<UpdatePriorNamesMutation, UpdatePriorNamesMutationVariables>;
export type UpdatePriorNamesComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdatePriorNamesMutation, UpdatePriorNamesMutationVariables>, 'mutation'>;

    export const UpdatePriorNamesComponent = (props: UpdatePriorNamesComponentProps) => (
      <ApolloReactComponents.Mutation<UpdatePriorNamesMutation, UpdatePriorNamesMutationVariables> mutation={UpdatePriorNamesDocument} {...props} />
    );
    
export type UpdatePriorNamesProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdatePriorNamesMutation, UpdatePriorNamesMutationVariables>
    } & TChildProps;
export function withUpdatePriorNames<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdatePriorNamesMutation,
  UpdatePriorNamesMutationVariables,
  UpdatePriorNamesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdatePriorNamesMutation, UpdatePriorNamesMutationVariables, UpdatePriorNamesProps<TChildProps, TDataName>>(UpdatePriorNamesDocument, {
      alias: 'updatePriorNames',
      ...operationOptions
    });
};

/**
 * __useUpdatePriorNamesMutation__
 *
 * To run a mutation, you first call `useUpdatePriorNamesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePriorNamesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePriorNamesMutation, { data, loading, error }] = useUpdatePriorNamesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePriorNamesMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePriorNamesMutation, UpdatePriorNamesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePriorNamesMutation, UpdatePriorNamesMutationVariables>(UpdatePriorNamesDocument, options);
      }
export type UpdatePriorNamesMutationHookResult = ReturnType<typeof useUpdatePriorNamesMutation>;
export type UpdatePriorNamesMutationResult = Apollo.MutationResult<UpdatePriorNamesMutation>;
export type UpdatePriorNamesMutationOptions = Apollo.BaseMutationOptions<UpdatePriorNamesMutation, UpdatePriorNamesMutationVariables>;
export const GetProfessionalLiabilityInsuranceCarrierDetailsDocument = gql`
    query GetProfessionalLiabilityInsuranceCarrierDetails {
  personalDetails {
    id
    professionalLiabilityInsuranceCarrier {
      malpracticeType
      organizationName
      organizationAddressLine1
      organizationAddressLine2
      organizationCity
      organizationState
      organizationZip
      organizationPhoneNumber
      organizationEmailAddress
      organizationFaxNumber
      contactPersonFirstName
      contactPersonLastName
      contactPersonRole
      contactPersonPhoneNumber
      contactPersonEmailAddress
      contactPersonFaxNumber
    }
  }
  countries
  states
}
    `;
export type GetProfessionalLiabilityInsuranceCarrierDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetProfessionalLiabilityInsuranceCarrierDetailsQuery, GetProfessionalLiabilityInsuranceCarrierDetailsQueryVariables>, 'query'>;

    export const GetProfessionalLiabilityInsuranceCarrierDetailsComponent = (props: GetProfessionalLiabilityInsuranceCarrierDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetProfessionalLiabilityInsuranceCarrierDetailsQuery, GetProfessionalLiabilityInsuranceCarrierDetailsQueryVariables> query={GetProfessionalLiabilityInsuranceCarrierDetailsDocument} {...props} />
    );
    
export type GetProfessionalLiabilityInsuranceCarrierDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetProfessionalLiabilityInsuranceCarrierDetailsQuery, GetProfessionalLiabilityInsuranceCarrierDetailsQueryVariables>
    } & TChildProps;
export function withGetProfessionalLiabilityInsuranceCarrierDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetProfessionalLiabilityInsuranceCarrierDetailsQuery,
  GetProfessionalLiabilityInsuranceCarrierDetailsQueryVariables,
  GetProfessionalLiabilityInsuranceCarrierDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetProfessionalLiabilityInsuranceCarrierDetailsQuery, GetProfessionalLiabilityInsuranceCarrierDetailsQueryVariables, GetProfessionalLiabilityInsuranceCarrierDetailsProps<TChildProps, TDataName>>(GetProfessionalLiabilityInsuranceCarrierDetailsDocument, {
      alias: 'getProfessionalLiabilityInsuranceCarrierDetails',
      ...operationOptions
    });
};

/**
 * __useGetProfessionalLiabilityInsuranceCarrierDetailsQuery__
 *
 * To run a query within a React component, call `useGetProfessionalLiabilityInsuranceCarrierDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfessionalLiabilityInsuranceCarrierDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfessionalLiabilityInsuranceCarrierDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfessionalLiabilityInsuranceCarrierDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetProfessionalLiabilityInsuranceCarrierDetailsQuery, GetProfessionalLiabilityInsuranceCarrierDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfessionalLiabilityInsuranceCarrierDetailsQuery, GetProfessionalLiabilityInsuranceCarrierDetailsQueryVariables>(GetProfessionalLiabilityInsuranceCarrierDetailsDocument, options);
      }
export function useGetProfessionalLiabilityInsuranceCarrierDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfessionalLiabilityInsuranceCarrierDetailsQuery, GetProfessionalLiabilityInsuranceCarrierDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfessionalLiabilityInsuranceCarrierDetailsQuery, GetProfessionalLiabilityInsuranceCarrierDetailsQueryVariables>(GetProfessionalLiabilityInsuranceCarrierDetailsDocument, options);
        }
export type GetProfessionalLiabilityInsuranceCarrierDetailsQueryHookResult = ReturnType<typeof useGetProfessionalLiabilityInsuranceCarrierDetailsQuery>;
export type GetProfessionalLiabilityInsuranceCarrierDetailsLazyQueryHookResult = ReturnType<typeof useGetProfessionalLiabilityInsuranceCarrierDetailsLazyQuery>;
export type GetProfessionalLiabilityInsuranceCarrierDetailsQueryResult = Apollo.QueryResult<GetProfessionalLiabilityInsuranceCarrierDetailsQuery, GetProfessionalLiabilityInsuranceCarrierDetailsQueryVariables>;
export const UpdateProfessionalLiabilityInsuranceCarrierDocument = gql`
    mutation UpdateProfessionalLiabilityInsuranceCarrier($input: UpdateProfessionalLiabilityInsuranceCarrierMutationInput!) {
  updateProfessionalLiabilityInsuranceCarrier(input: $input) {
    professionalLiabilityInsuranceCarrier {
      malpracticeType
    }
  }
}
    `;
export type UpdateProfessionalLiabilityInsuranceCarrierMutationFn = Apollo.MutationFunction<UpdateProfessionalLiabilityInsuranceCarrierMutation, UpdateProfessionalLiabilityInsuranceCarrierMutationVariables>;
export type UpdateProfessionalLiabilityInsuranceCarrierComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateProfessionalLiabilityInsuranceCarrierMutation, UpdateProfessionalLiabilityInsuranceCarrierMutationVariables>, 'mutation'>;

    export const UpdateProfessionalLiabilityInsuranceCarrierComponent = (props: UpdateProfessionalLiabilityInsuranceCarrierComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateProfessionalLiabilityInsuranceCarrierMutation, UpdateProfessionalLiabilityInsuranceCarrierMutationVariables> mutation={UpdateProfessionalLiabilityInsuranceCarrierDocument} {...props} />
    );
    
export type UpdateProfessionalLiabilityInsuranceCarrierProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateProfessionalLiabilityInsuranceCarrierMutation, UpdateProfessionalLiabilityInsuranceCarrierMutationVariables>
    } & TChildProps;
export function withUpdateProfessionalLiabilityInsuranceCarrier<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateProfessionalLiabilityInsuranceCarrierMutation,
  UpdateProfessionalLiabilityInsuranceCarrierMutationVariables,
  UpdateProfessionalLiabilityInsuranceCarrierProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateProfessionalLiabilityInsuranceCarrierMutation, UpdateProfessionalLiabilityInsuranceCarrierMutationVariables, UpdateProfessionalLiabilityInsuranceCarrierProps<TChildProps, TDataName>>(UpdateProfessionalLiabilityInsuranceCarrierDocument, {
      alias: 'updateProfessionalLiabilityInsuranceCarrier',
      ...operationOptions
    });
};

/**
 * __useUpdateProfessionalLiabilityInsuranceCarrierMutation__
 *
 * To run a mutation, you first call `useUpdateProfessionalLiabilityInsuranceCarrierMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfessionalLiabilityInsuranceCarrierMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfessionalLiabilityInsuranceCarrierMutation, { data, loading, error }] = useUpdateProfessionalLiabilityInsuranceCarrierMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfessionalLiabilityInsuranceCarrierMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfessionalLiabilityInsuranceCarrierMutation, UpdateProfessionalLiabilityInsuranceCarrierMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfessionalLiabilityInsuranceCarrierMutation, UpdateProfessionalLiabilityInsuranceCarrierMutationVariables>(UpdateProfessionalLiabilityInsuranceCarrierDocument, options);
      }
export type UpdateProfessionalLiabilityInsuranceCarrierMutationHookResult = ReturnType<typeof useUpdateProfessionalLiabilityInsuranceCarrierMutation>;
export type UpdateProfessionalLiabilityInsuranceCarrierMutationResult = Apollo.MutationResult<UpdateProfessionalLiabilityInsuranceCarrierMutation>;
export type UpdateProfessionalLiabilityInsuranceCarrierMutationOptions = Apollo.BaseMutationOptions<UpdateProfessionalLiabilityInsuranceCarrierMutation, UpdateProfessionalLiabilityInsuranceCarrierMutationVariables>;
export const GetProfessionalLiabilityJudgmentsQuestionnaireDetailsDocument = gql`
    query GetProfessionalLiabilityJudgmentsQuestionnaireDetails {
  personalDetails {
    id
    professionalLiabilityJudgmentsQuestionnaire {
      judgmentsEntered
      liabilityClaimSettlementsPaid
      pendingLiabilityActions
      anyLegalActionDueToClinicalActions
    }
  }
}
    `;
export type GetProfessionalLiabilityJudgmentsQuestionnaireDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery, GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQueryVariables>, 'query'>;

    export const GetProfessionalLiabilityJudgmentsQuestionnaireDetailsComponent = (props: GetProfessionalLiabilityJudgmentsQuestionnaireDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery, GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQueryVariables> query={GetProfessionalLiabilityJudgmentsQuestionnaireDetailsDocument} {...props} />
    );
    
export type GetProfessionalLiabilityJudgmentsQuestionnaireDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery, GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQueryVariables>
    } & TChildProps;
export function withGetProfessionalLiabilityJudgmentsQuestionnaireDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery,
  GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQueryVariables,
  GetProfessionalLiabilityJudgmentsQuestionnaireDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery, GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQueryVariables, GetProfessionalLiabilityJudgmentsQuestionnaireDetailsProps<TChildProps, TDataName>>(GetProfessionalLiabilityJudgmentsQuestionnaireDetailsDocument, {
      alias: 'getProfessionalLiabilityJudgmentsQuestionnaireDetails',
      ...operationOptions
    });
};

/**
 * __useGetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery__
 *
 * To run a query within a React component, call `useGetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery, GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery, GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQueryVariables>(GetProfessionalLiabilityJudgmentsQuestionnaireDetailsDocument, options);
      }
export function useGetProfessionalLiabilityJudgmentsQuestionnaireDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery, GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery, GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQueryVariables>(GetProfessionalLiabilityJudgmentsQuestionnaireDetailsDocument, options);
        }
export type GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQueryHookResult = ReturnType<typeof useGetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery>;
export type GetProfessionalLiabilityJudgmentsQuestionnaireDetailsLazyQueryHookResult = ReturnType<typeof useGetProfessionalLiabilityJudgmentsQuestionnaireDetailsLazyQuery>;
export type GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQueryResult = Apollo.QueryResult<GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQuery, GetProfessionalLiabilityJudgmentsQuestionnaireDetailsQueryVariables>;
export const UpdateProfessionalLiabilityJudgmentsQuestionnaireDocument = gql`
    mutation UpdateProfessionalLiabilityJudgmentsQuestionnaire($input: UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationInput!) {
  updateProfessionalLiabilityJudgmentsQuestionnaire(input: $input) {
    professionalLiabilityJudgmentsQuestionnaire {
      judgmentsEntered
    }
  }
}
    `;
export type UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationFn = Apollo.MutationFunction<UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation, UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationVariables>;
export type UpdateProfessionalLiabilityJudgmentsQuestionnaireComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation, UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationVariables>, 'mutation'>;

    export const UpdateProfessionalLiabilityJudgmentsQuestionnaireComponent = (props: UpdateProfessionalLiabilityJudgmentsQuestionnaireComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation, UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationVariables> mutation={UpdateProfessionalLiabilityJudgmentsQuestionnaireDocument} {...props} />
    );
    
export type UpdateProfessionalLiabilityJudgmentsQuestionnaireProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation, UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationVariables>
    } & TChildProps;
export function withUpdateProfessionalLiabilityJudgmentsQuestionnaire<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation,
  UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationVariables,
  UpdateProfessionalLiabilityJudgmentsQuestionnaireProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation, UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationVariables, UpdateProfessionalLiabilityJudgmentsQuestionnaireProps<TChildProps, TDataName>>(UpdateProfessionalLiabilityJudgmentsQuestionnaireDocument, {
      alias: 'updateProfessionalLiabilityJudgmentsQuestionnaire',
      ...operationOptions
    });
};

/**
 * __useUpdateProfessionalLiabilityJudgmentsQuestionnaireMutation__
 *
 * To run a mutation, you first call `useUpdateProfessionalLiabilityJudgmentsQuestionnaireMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfessionalLiabilityJudgmentsQuestionnaireMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfessionalLiabilityJudgmentsQuestionnaireMutation, { data, loading, error }] = useUpdateProfessionalLiabilityJudgmentsQuestionnaireMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfessionalLiabilityJudgmentsQuestionnaireMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation, UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation, UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationVariables>(UpdateProfessionalLiabilityJudgmentsQuestionnaireDocument, options);
      }
export type UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationHookResult = ReturnType<typeof useUpdateProfessionalLiabilityJudgmentsQuestionnaireMutation>;
export type UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationResult = Apollo.MutationResult<UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation>;
export type UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationOptions = Apollo.BaseMutationOptions<UpdateProfessionalLiabilityJudgmentsQuestionnaireMutation, UpdateProfessionalLiabilityJudgmentsQuestionnaireMutationVariables>;
export const GetProfessionalLicensesDocument = gql`
    query GetProfessionalLicenses($kind: ProfessionalLicenseKind!) {
  personalDetails {
    id
    professionalLicenses(kind: $kind) {
      issuingState
      issuingAuthority
      number
      licenseVerificationUrl
      dateOfIssue
      expiresAt
      status
      unrestrictedLicense
      nonMedicalLicenseKind
    }
  }
  states
}
    `;
export type GetProfessionalLicensesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetProfessionalLicensesQuery, GetProfessionalLicensesQueryVariables>, 'query'> & ({ variables: GetProfessionalLicensesQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetProfessionalLicensesComponent = (props: GetProfessionalLicensesComponentProps) => (
      <ApolloReactComponents.Query<GetProfessionalLicensesQuery, GetProfessionalLicensesQueryVariables> query={GetProfessionalLicensesDocument} {...props} />
    );
    
export type GetProfessionalLicensesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetProfessionalLicensesQuery, GetProfessionalLicensesQueryVariables>
    } & TChildProps;
export function withGetProfessionalLicenses<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetProfessionalLicensesQuery,
  GetProfessionalLicensesQueryVariables,
  GetProfessionalLicensesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetProfessionalLicensesQuery, GetProfessionalLicensesQueryVariables, GetProfessionalLicensesProps<TChildProps, TDataName>>(GetProfessionalLicensesDocument, {
      alias: 'getProfessionalLicenses',
      ...operationOptions
    });
};

/**
 * __useGetProfessionalLicensesQuery__
 *
 * To run a query within a React component, call `useGetProfessionalLicensesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfessionalLicensesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfessionalLicensesQuery({
 *   variables: {
 *      kind: // value for 'kind'
 *   },
 * });
 */
export function useGetProfessionalLicensesQuery(baseOptions: Apollo.QueryHookOptions<GetProfessionalLicensesQuery, GetProfessionalLicensesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfessionalLicensesQuery, GetProfessionalLicensesQueryVariables>(GetProfessionalLicensesDocument, options);
      }
export function useGetProfessionalLicensesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfessionalLicensesQuery, GetProfessionalLicensesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfessionalLicensesQuery, GetProfessionalLicensesQueryVariables>(GetProfessionalLicensesDocument, options);
        }
export type GetProfessionalLicensesQueryHookResult = ReturnType<typeof useGetProfessionalLicensesQuery>;
export type GetProfessionalLicensesLazyQueryHookResult = ReturnType<typeof useGetProfessionalLicensesLazyQuery>;
export type GetProfessionalLicensesQueryResult = Apollo.QueryResult<GetProfessionalLicensesQuery, GetProfessionalLicensesQueryVariables>;
export const UpdateProfessionalLicensesDocument = gql`
    mutation UpdateProfessionalLicenses($input: UpdateProfessionalLicensesMutationInput!) {
  updateProfessionalLicenses(input: $input) {
    professionalLicenses {
      status
    }
  }
}
    `;
export type UpdateProfessionalLicensesMutationFn = Apollo.MutationFunction<UpdateProfessionalLicensesMutation, UpdateProfessionalLicensesMutationVariables>;
export type UpdateProfessionalLicensesComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateProfessionalLicensesMutation, UpdateProfessionalLicensesMutationVariables>, 'mutation'>;

    export const UpdateProfessionalLicensesComponent = (props: UpdateProfessionalLicensesComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateProfessionalLicensesMutation, UpdateProfessionalLicensesMutationVariables> mutation={UpdateProfessionalLicensesDocument} {...props} />
    );
    
export type UpdateProfessionalLicensesProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateProfessionalLicensesMutation, UpdateProfessionalLicensesMutationVariables>
    } & TChildProps;
export function withUpdateProfessionalLicenses<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateProfessionalLicensesMutation,
  UpdateProfessionalLicensesMutationVariables,
  UpdateProfessionalLicensesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateProfessionalLicensesMutation, UpdateProfessionalLicensesMutationVariables, UpdateProfessionalLicensesProps<TChildProps, TDataName>>(UpdateProfessionalLicensesDocument, {
      alias: 'updateProfessionalLicenses',
      ...operationOptions
    });
};

/**
 * __useUpdateProfessionalLicensesMutation__
 *
 * To run a mutation, you first call `useUpdateProfessionalLicensesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfessionalLicensesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfessionalLicensesMutation, { data, loading, error }] = useUpdateProfessionalLicensesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfessionalLicensesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfessionalLicensesMutation, UpdateProfessionalLicensesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfessionalLicensesMutation, UpdateProfessionalLicensesMutationVariables>(UpdateProfessionalLicensesDocument, options);
      }
export type UpdateProfessionalLicensesMutationHookResult = ReturnType<typeof useUpdateProfessionalLicensesMutation>;
export type UpdateProfessionalLicensesMutationResult = Apollo.MutationResult<UpdateProfessionalLicensesMutation>;
export type UpdateProfessionalLicensesMutationOptions = Apollo.BaseMutationOptions<UpdateProfessionalLicensesMutation, UpdateProfessionalLicensesMutationVariables>;
export const GetSpokenLanguagesDocument = gql`
    query GetSpokenLanguages {
  personalDetails {
    id
    spokenLanguages {
      language
      readingProficiency
      writingProficiency
      speakingProficiency
    }
  }
}
    `;
export type GetSpokenLanguagesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetSpokenLanguagesQuery, GetSpokenLanguagesQueryVariables>, 'query'>;

    export const GetSpokenLanguagesComponent = (props: GetSpokenLanguagesComponentProps) => (
      <ApolloReactComponents.Query<GetSpokenLanguagesQuery, GetSpokenLanguagesQueryVariables> query={GetSpokenLanguagesDocument} {...props} />
    );
    
export type GetSpokenLanguagesProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetSpokenLanguagesQuery, GetSpokenLanguagesQueryVariables>
    } & TChildProps;
export function withGetSpokenLanguages<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetSpokenLanguagesQuery,
  GetSpokenLanguagesQueryVariables,
  GetSpokenLanguagesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetSpokenLanguagesQuery, GetSpokenLanguagesQueryVariables, GetSpokenLanguagesProps<TChildProps, TDataName>>(GetSpokenLanguagesDocument, {
      alias: 'getSpokenLanguages',
      ...operationOptions
    });
};

/**
 * __useGetSpokenLanguagesQuery__
 *
 * To run a query within a React component, call `useGetSpokenLanguagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpokenLanguagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpokenLanguagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSpokenLanguagesQuery(baseOptions?: Apollo.QueryHookOptions<GetSpokenLanguagesQuery, GetSpokenLanguagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpokenLanguagesQuery, GetSpokenLanguagesQueryVariables>(GetSpokenLanguagesDocument, options);
      }
export function useGetSpokenLanguagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpokenLanguagesQuery, GetSpokenLanguagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpokenLanguagesQuery, GetSpokenLanguagesQueryVariables>(GetSpokenLanguagesDocument, options);
        }
export type GetSpokenLanguagesQueryHookResult = ReturnType<typeof useGetSpokenLanguagesQuery>;
export type GetSpokenLanguagesLazyQueryHookResult = ReturnType<typeof useGetSpokenLanguagesLazyQuery>;
export type GetSpokenLanguagesQueryResult = Apollo.QueryResult<GetSpokenLanguagesQuery, GetSpokenLanguagesQueryVariables>;
export const UpdateSpokenLanguagesDocument = gql`
    mutation UpdateSpokenLanguages($input: UpdateSpokenLanguagesMutationInput!) {
  updateSpokenLanguages(input: $input) {
    spokenLanguages {
      language
    }
  }
}
    `;
export type UpdateSpokenLanguagesMutationFn = Apollo.MutationFunction<UpdateSpokenLanguagesMutation, UpdateSpokenLanguagesMutationVariables>;
export type UpdateSpokenLanguagesComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateSpokenLanguagesMutation, UpdateSpokenLanguagesMutationVariables>, 'mutation'>;

    export const UpdateSpokenLanguagesComponent = (props: UpdateSpokenLanguagesComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateSpokenLanguagesMutation, UpdateSpokenLanguagesMutationVariables> mutation={UpdateSpokenLanguagesDocument} {...props} />
    );
    
export type UpdateSpokenLanguagesProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateSpokenLanguagesMutation, UpdateSpokenLanguagesMutationVariables>
    } & TChildProps;
export function withUpdateSpokenLanguages<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateSpokenLanguagesMutation,
  UpdateSpokenLanguagesMutationVariables,
  UpdateSpokenLanguagesProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateSpokenLanguagesMutation, UpdateSpokenLanguagesMutationVariables, UpdateSpokenLanguagesProps<TChildProps, TDataName>>(UpdateSpokenLanguagesDocument, {
      alias: 'updateSpokenLanguages',
      ...operationOptions
    });
};

/**
 * __useUpdateSpokenLanguagesMutation__
 *
 * To run a mutation, you first call `useUpdateSpokenLanguagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSpokenLanguagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSpokenLanguagesMutation, { data, loading, error }] = useUpdateSpokenLanguagesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSpokenLanguagesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSpokenLanguagesMutation, UpdateSpokenLanguagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSpokenLanguagesMutation, UpdateSpokenLanguagesMutationVariables>(UpdateSpokenLanguagesDocument, options);
      }
export type UpdateSpokenLanguagesMutationHookResult = ReturnType<typeof useUpdateSpokenLanguagesMutation>;
export type UpdateSpokenLanguagesMutationResult = Apollo.MutationResult<UpdateSpokenLanguagesMutation>;
export type UpdateSpokenLanguagesMutationOptions = Apollo.BaseMutationOptions<UpdateSpokenLanguagesMutation, UpdateSpokenLanguagesMutationVariables>;
export const GetUsmleScoresDetailsDocument = gql`
    query GetUSMLEScoresDetails {
  personalDetails {
    id
    usmleScores {
      usmleIdNumber
      step1ExamPassed
      step1ExamScore
      step1ExamDate
      step2ExamPassed
      step2ExamScore
      step2ExamDate
      step3ExamPassed
      step3ExamScore
      step3ExamDate
    }
  }
}
    `;
export type GetUsmleScoresDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUsmleScoresDetailsQuery, GetUsmleScoresDetailsQueryVariables>, 'query'>;

    export const GetUsmleScoresDetailsComponent = (props: GetUsmleScoresDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetUsmleScoresDetailsQuery, GetUsmleScoresDetailsQueryVariables> query={GetUsmleScoresDetailsDocument} {...props} />
    );
    
export type GetUsmleScoresDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetUsmleScoresDetailsQuery, GetUsmleScoresDetailsQueryVariables>
    } & TChildProps;
export function withGetUsmleScoresDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUsmleScoresDetailsQuery,
  GetUsmleScoresDetailsQueryVariables,
  GetUsmleScoresDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetUsmleScoresDetailsQuery, GetUsmleScoresDetailsQueryVariables, GetUsmleScoresDetailsProps<TChildProps, TDataName>>(GetUsmleScoresDetailsDocument, {
      alias: 'getUsmleScoresDetails',
      ...operationOptions
    });
};

/**
 * __useGetUsmleScoresDetailsQuery__
 *
 * To run a query within a React component, call `useGetUsmleScoresDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsmleScoresDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsmleScoresDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsmleScoresDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetUsmleScoresDetailsQuery, GetUsmleScoresDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsmleScoresDetailsQuery, GetUsmleScoresDetailsQueryVariables>(GetUsmleScoresDetailsDocument, options);
      }
export function useGetUsmleScoresDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsmleScoresDetailsQuery, GetUsmleScoresDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsmleScoresDetailsQuery, GetUsmleScoresDetailsQueryVariables>(GetUsmleScoresDetailsDocument, options);
        }
export type GetUsmleScoresDetailsQueryHookResult = ReturnType<typeof useGetUsmleScoresDetailsQuery>;
export type GetUsmleScoresDetailsLazyQueryHookResult = ReturnType<typeof useGetUsmleScoresDetailsLazyQuery>;
export type GetUsmleScoresDetailsQueryResult = Apollo.QueryResult<GetUsmleScoresDetailsQuery, GetUsmleScoresDetailsQueryVariables>;
export const UpdateUsmleScoresDocument = gql`
    mutation UpdateUSMLEScores($input: UpdateUSMLEScoresMutationInput!) {
  updateUsmleScores(input: $input) {
    usmleScores {
      usmleIdNumber
    }
  }
}
    `;
export type UpdateUsmleScoresMutationFn = Apollo.MutationFunction<UpdateUsmleScoresMutation, UpdateUsmleScoresMutationVariables>;
export type UpdateUsmleScoresComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateUsmleScoresMutation, UpdateUsmleScoresMutationVariables>, 'mutation'>;

    export const UpdateUsmleScoresComponent = (props: UpdateUsmleScoresComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateUsmleScoresMutation, UpdateUsmleScoresMutationVariables> mutation={UpdateUsmleScoresDocument} {...props} />
    );
    
export type UpdateUsmleScoresProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateUsmleScoresMutation, UpdateUsmleScoresMutationVariables>
    } & TChildProps;
export function withUpdateUsmleScores<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateUsmleScoresMutation,
  UpdateUsmleScoresMutationVariables,
  UpdateUsmleScoresProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateUsmleScoresMutation, UpdateUsmleScoresMutationVariables, UpdateUsmleScoresProps<TChildProps, TDataName>>(UpdateUsmleScoresDocument, {
      alias: 'updateUsmleScores',
      ...operationOptions
    });
};

/**
 * __useUpdateUsmleScoresMutation__
 *
 * To run a mutation, you first call `useUpdateUsmleScoresMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUsmleScoresMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUsmleScoresMutation, { data, loading, error }] = useUpdateUsmleScoresMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUsmleScoresMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUsmleScoresMutation, UpdateUsmleScoresMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUsmleScoresMutation, UpdateUsmleScoresMutationVariables>(UpdateUsmleScoresDocument, options);
      }
export type UpdateUsmleScoresMutationHookResult = ReturnType<typeof useUpdateUsmleScoresMutation>;
export type UpdateUsmleScoresMutationResult = Apollo.MutationResult<UpdateUsmleScoresMutation>;
export type UpdateUsmleScoresMutationOptions = Apollo.BaseMutationOptions<UpdateUsmleScoresMutation, UpdateUsmleScoresMutationVariables>;
export const GetUsPublicHealthServiceDetailsDocument = gql`
    query GetUSPublicHealthServiceDetails {
  personalDetails {
    id
    unitedStatesPublicHealthService {
      startedAt
      endedAt
    }
  }
}
    `;
export type GetUsPublicHealthServiceDetailsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUsPublicHealthServiceDetailsQuery, GetUsPublicHealthServiceDetailsQueryVariables>, 'query'>;

    export const GetUsPublicHealthServiceDetailsComponent = (props: GetUsPublicHealthServiceDetailsComponentProps) => (
      <ApolloReactComponents.Query<GetUsPublicHealthServiceDetailsQuery, GetUsPublicHealthServiceDetailsQueryVariables> query={GetUsPublicHealthServiceDetailsDocument} {...props} />
    );
    
export type GetUsPublicHealthServiceDetailsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetUsPublicHealthServiceDetailsQuery, GetUsPublicHealthServiceDetailsQueryVariables>
    } & TChildProps;
export function withGetUsPublicHealthServiceDetails<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUsPublicHealthServiceDetailsQuery,
  GetUsPublicHealthServiceDetailsQueryVariables,
  GetUsPublicHealthServiceDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetUsPublicHealthServiceDetailsQuery, GetUsPublicHealthServiceDetailsQueryVariables, GetUsPublicHealthServiceDetailsProps<TChildProps, TDataName>>(GetUsPublicHealthServiceDetailsDocument, {
      alias: 'getUsPublicHealthServiceDetails',
      ...operationOptions
    });
};

/**
 * __useGetUsPublicHealthServiceDetailsQuery__
 *
 * To run a query within a React component, call `useGetUsPublicHealthServiceDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsPublicHealthServiceDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsPublicHealthServiceDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsPublicHealthServiceDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetUsPublicHealthServiceDetailsQuery, GetUsPublicHealthServiceDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsPublicHealthServiceDetailsQuery, GetUsPublicHealthServiceDetailsQueryVariables>(GetUsPublicHealthServiceDetailsDocument, options);
      }
export function useGetUsPublicHealthServiceDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsPublicHealthServiceDetailsQuery, GetUsPublicHealthServiceDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsPublicHealthServiceDetailsQuery, GetUsPublicHealthServiceDetailsQueryVariables>(GetUsPublicHealthServiceDetailsDocument, options);
        }
export type GetUsPublicHealthServiceDetailsQueryHookResult = ReturnType<typeof useGetUsPublicHealthServiceDetailsQuery>;
export type GetUsPublicHealthServiceDetailsLazyQueryHookResult = ReturnType<typeof useGetUsPublicHealthServiceDetailsLazyQuery>;
export type GetUsPublicHealthServiceDetailsQueryResult = Apollo.QueryResult<GetUsPublicHealthServiceDetailsQuery, GetUsPublicHealthServiceDetailsQueryVariables>;
export const UpdateUsPublicHealthServiceDetailsDocument = gql`
    mutation UpdateUSPublicHealthServiceDetails($input: UpdateUnitedStatesPublicHealthServiceMutationInput!) {
  updateUnitedStatesPublicHealthService(input: $input) {
    service {
      startedAt
    }
  }
}
    `;
export type UpdateUsPublicHealthServiceDetailsMutationFn = Apollo.MutationFunction<UpdateUsPublicHealthServiceDetailsMutation, UpdateUsPublicHealthServiceDetailsMutationVariables>;
export type UpdateUsPublicHealthServiceDetailsComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateUsPublicHealthServiceDetailsMutation, UpdateUsPublicHealthServiceDetailsMutationVariables>, 'mutation'>;

    export const UpdateUsPublicHealthServiceDetailsComponent = (props: UpdateUsPublicHealthServiceDetailsComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateUsPublicHealthServiceDetailsMutation, UpdateUsPublicHealthServiceDetailsMutationVariables> mutation={UpdateUsPublicHealthServiceDetailsDocument} {...props} />
    );
    
export type UpdateUsPublicHealthServiceDetailsProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateUsPublicHealthServiceDetailsMutation, UpdateUsPublicHealthServiceDetailsMutationVariables>
    } & TChildProps;
export function withUpdateUsPublicHealthServiceDetails<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateUsPublicHealthServiceDetailsMutation,
  UpdateUsPublicHealthServiceDetailsMutationVariables,
  UpdateUsPublicHealthServiceDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateUsPublicHealthServiceDetailsMutation, UpdateUsPublicHealthServiceDetailsMutationVariables, UpdateUsPublicHealthServiceDetailsProps<TChildProps, TDataName>>(UpdateUsPublicHealthServiceDetailsDocument, {
      alias: 'updateUsPublicHealthServiceDetails',
      ...operationOptions
    });
};

/**
 * __useUpdateUsPublicHealthServiceDetailsMutation__
 *
 * To run a mutation, you first call `useUpdateUsPublicHealthServiceDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUsPublicHealthServiceDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUsPublicHealthServiceDetailsMutation, { data, loading, error }] = useUpdateUsPublicHealthServiceDetailsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUsPublicHealthServiceDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUsPublicHealthServiceDetailsMutation, UpdateUsPublicHealthServiceDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUsPublicHealthServiceDetailsMutation, UpdateUsPublicHealthServiceDetailsMutationVariables>(UpdateUsPublicHealthServiceDetailsDocument, options);
      }
export type UpdateUsPublicHealthServiceDetailsMutationHookResult = ReturnType<typeof useUpdateUsPublicHealthServiceDetailsMutation>;
export type UpdateUsPublicHealthServiceDetailsMutationResult = Apollo.MutationResult<UpdateUsPublicHealthServiceDetailsMutation>;
export type UpdateUsPublicHealthServiceDetailsMutationOptions = Apollo.BaseMutationOptions<UpdateUsPublicHealthServiceDetailsMutation, UpdateUsPublicHealthServiceDetailsMutationVariables>;
export const DeleteUsPublicHealthServiceDetailsDocument = gql`
    mutation DeleteUSPublicHealthServiceDetails {
  deleteUnitedStatesPublicHealthService {
    success
  }
}
    `;
export type DeleteUsPublicHealthServiceDetailsMutationFn = Apollo.MutationFunction<DeleteUsPublicHealthServiceDetailsMutation, DeleteUsPublicHealthServiceDetailsMutationVariables>;
export type DeleteUsPublicHealthServiceDetailsComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteUsPublicHealthServiceDetailsMutation, DeleteUsPublicHealthServiceDetailsMutationVariables>, 'mutation'>;

    export const DeleteUsPublicHealthServiceDetailsComponent = (props: DeleteUsPublicHealthServiceDetailsComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteUsPublicHealthServiceDetailsMutation, DeleteUsPublicHealthServiceDetailsMutationVariables> mutation={DeleteUsPublicHealthServiceDetailsDocument} {...props} />
    );
    
export type DeleteUsPublicHealthServiceDetailsProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<DeleteUsPublicHealthServiceDetailsMutation, DeleteUsPublicHealthServiceDetailsMutationVariables>
    } & TChildProps;
export function withDeleteUsPublicHealthServiceDetails<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteUsPublicHealthServiceDetailsMutation,
  DeleteUsPublicHealthServiceDetailsMutationVariables,
  DeleteUsPublicHealthServiceDetailsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteUsPublicHealthServiceDetailsMutation, DeleteUsPublicHealthServiceDetailsMutationVariables, DeleteUsPublicHealthServiceDetailsProps<TChildProps, TDataName>>(DeleteUsPublicHealthServiceDetailsDocument, {
      alias: 'deleteUsPublicHealthServiceDetails',
      ...operationOptions
    });
};

/**
 * __useDeleteUsPublicHealthServiceDetailsMutation__
 *
 * To run a mutation, you first call `useDeleteUsPublicHealthServiceDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUsPublicHealthServiceDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUsPublicHealthServiceDetailsMutation, { data, loading, error }] = useDeleteUsPublicHealthServiceDetailsMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUsPublicHealthServiceDetailsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUsPublicHealthServiceDetailsMutation, DeleteUsPublicHealthServiceDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUsPublicHealthServiceDetailsMutation, DeleteUsPublicHealthServiceDetailsMutationVariables>(DeleteUsPublicHealthServiceDetailsDocument, options);
      }
export type DeleteUsPublicHealthServiceDetailsMutationHookResult = ReturnType<typeof useDeleteUsPublicHealthServiceDetailsMutation>;
export type DeleteUsPublicHealthServiceDetailsMutationResult = Apollo.MutationResult<DeleteUsPublicHealthServiceDetailsMutation>;
export type DeleteUsPublicHealthServiceDetailsMutationOptions = Apollo.BaseMutationOptions<DeleteUsPublicHealthServiceDetailsMutation, DeleteUsPublicHealthServiceDetailsMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserMutationInput!) {
  updateUser(input: $input) {
    user {
      ...BaseUserFields
    }
  }
}
    ${BaseUserFieldsFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;
export type UpdateUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateUserMutation, UpdateUserMutationVariables>, 'mutation'>;

    export const UpdateUserComponent = (props: UpdateUserComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateUserMutation, UpdateUserMutationVariables> mutation={UpdateUserDocument} {...props} />
    );
    
export type UpdateUserProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>
    } & TChildProps;
export function withUpdateUser<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UpdateUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateUserMutation, UpdateUserMutationVariables, UpdateUserProps<TChildProps, TDataName>>(UpdateUserDocument, {
      alias: 'updateUser',
      ...operationOptions
    });
};

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateJumioIdentityVerificationDocument = gql`
    mutation CreateJumioIdentityVerification($input: CreateJumioIdentityVerificationMutationInput!) {
  createJumioIdentityVerification(input: $input) {
    user {
      ...BaseUserFields
    }
  }
}
    ${BaseUserFieldsFragmentDoc}`;
export type CreateJumioIdentityVerificationMutationFn = Apollo.MutationFunction<CreateJumioIdentityVerificationMutation, CreateJumioIdentityVerificationMutationVariables>;
export type CreateJumioIdentityVerificationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateJumioIdentityVerificationMutation, CreateJumioIdentityVerificationMutationVariables>, 'mutation'>;

    export const CreateJumioIdentityVerificationComponent = (props: CreateJumioIdentityVerificationComponentProps) => (
      <ApolloReactComponents.Mutation<CreateJumioIdentityVerificationMutation, CreateJumioIdentityVerificationMutationVariables> mutation={CreateJumioIdentityVerificationDocument} {...props} />
    );
    
export type CreateJumioIdentityVerificationProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<CreateJumioIdentityVerificationMutation, CreateJumioIdentityVerificationMutationVariables>
    } & TChildProps;
export function withCreateJumioIdentityVerification<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateJumioIdentityVerificationMutation,
  CreateJumioIdentityVerificationMutationVariables,
  CreateJumioIdentityVerificationProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, CreateJumioIdentityVerificationMutation, CreateJumioIdentityVerificationMutationVariables, CreateJumioIdentityVerificationProps<TChildProps, TDataName>>(CreateJumioIdentityVerificationDocument, {
      alias: 'createJumioIdentityVerification',
      ...operationOptions
    });
};

/**
 * __useCreateJumioIdentityVerificationMutation__
 *
 * To run a mutation, you first call `useCreateJumioIdentityVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJumioIdentityVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJumioIdentityVerificationMutation, { data, loading, error }] = useCreateJumioIdentityVerificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateJumioIdentityVerificationMutation(baseOptions?: Apollo.MutationHookOptions<CreateJumioIdentityVerificationMutation, CreateJumioIdentityVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateJumioIdentityVerificationMutation, CreateJumioIdentityVerificationMutationVariables>(CreateJumioIdentityVerificationDocument, options);
      }
export type CreateJumioIdentityVerificationMutationHookResult = ReturnType<typeof useCreateJumioIdentityVerificationMutation>;
export type CreateJumioIdentityVerificationMutationResult = Apollo.MutationResult<CreateJumioIdentityVerificationMutation>;
export type CreateJumioIdentityVerificationMutationOptions = Apollo.BaseMutationOptions<CreateJumioIdentityVerificationMutation, CreateJumioIdentityVerificationMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  me {
    ...BaseUserFields
    lastVerification {
      verificationStatus
    }
  }
}
    ${BaseUserFieldsFragmentDoc}`;
export type GetCurrentUserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>, 'query'>;

    export const GetCurrentUserComponent = (props: GetCurrentUserComponentProps) => (
      <ApolloReactComponents.Query<GetCurrentUserQuery, GetCurrentUserQueryVariables> query={GetCurrentUserDocument} {...props} />
    );
    
export type GetCurrentUserProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetCurrentUserQuery, GetCurrentUserQueryVariables>
    } & TChildProps;
export function withGetCurrentUser<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  GetCurrentUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetCurrentUserQuery, GetCurrentUserQueryVariables, GetCurrentUserProps<TChildProps, TDataName>>(GetCurrentUserDocument, {
      alias: 'getCurrentUser',
      ...operationOptions
    });
};

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetUserExpirationWarningTimeDocument = gql`
    query GetUserExpirationWarningTime {
  me {
    id
    expirationWarningTimeUnits
    expirationWarningTime
  }
}
    `;
export type GetUserExpirationWarningTimeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetUserExpirationWarningTimeQuery, GetUserExpirationWarningTimeQueryVariables>, 'query'>;

    export const GetUserExpirationWarningTimeComponent = (props: GetUserExpirationWarningTimeComponentProps) => (
      <ApolloReactComponents.Query<GetUserExpirationWarningTimeQuery, GetUserExpirationWarningTimeQueryVariables> query={GetUserExpirationWarningTimeDocument} {...props} />
    );
    
export type GetUserExpirationWarningTimeProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetUserExpirationWarningTimeQuery, GetUserExpirationWarningTimeQueryVariables>
    } & TChildProps;
export function withGetUserExpirationWarningTime<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetUserExpirationWarningTimeQuery,
  GetUserExpirationWarningTimeQueryVariables,
  GetUserExpirationWarningTimeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetUserExpirationWarningTimeQuery, GetUserExpirationWarningTimeQueryVariables, GetUserExpirationWarningTimeProps<TChildProps, TDataName>>(GetUserExpirationWarningTimeDocument, {
      alias: 'getUserExpirationWarningTime',
      ...operationOptions
    });
};

/**
 * __useGetUserExpirationWarningTimeQuery__
 *
 * To run a query within a React component, call `useGetUserExpirationWarningTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserExpirationWarningTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserExpirationWarningTimeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserExpirationWarningTimeQuery(baseOptions?: Apollo.QueryHookOptions<GetUserExpirationWarningTimeQuery, GetUserExpirationWarningTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserExpirationWarningTimeQuery, GetUserExpirationWarningTimeQueryVariables>(GetUserExpirationWarningTimeDocument, options);
      }
export function useGetUserExpirationWarningTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserExpirationWarningTimeQuery, GetUserExpirationWarningTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserExpirationWarningTimeQuery, GetUserExpirationWarningTimeQueryVariables>(GetUserExpirationWarningTimeDocument, options);
        }
export type GetUserExpirationWarningTimeQueryHookResult = ReturnType<typeof useGetUserExpirationWarningTimeQuery>;
export type GetUserExpirationWarningTimeLazyQueryHookResult = ReturnType<typeof useGetUserExpirationWarningTimeLazyQuery>;
export type GetUserExpirationWarningTimeQueryResult = Apollo.QueryResult<GetUserExpirationWarningTimeQuery, GetUserExpirationWarningTimeQueryVariables>;
export const UpdateUserExpirationWarningTimeDocument = gql`
    mutation UpdateUserExpirationWarningTime($input: UpdateUserMutationInput!) {
  updateUser(input: $input) {
    user {
      ...BaseUserFields
    }
  }
}
    ${BaseUserFieldsFragmentDoc}`;
export type UpdateUserExpirationWarningTimeMutationFn = Apollo.MutationFunction<UpdateUserExpirationWarningTimeMutation, UpdateUserExpirationWarningTimeMutationVariables>;
export type UpdateUserExpirationWarningTimeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateUserExpirationWarningTimeMutation, UpdateUserExpirationWarningTimeMutationVariables>, 'mutation'>;

    export const UpdateUserExpirationWarningTimeComponent = (props: UpdateUserExpirationWarningTimeComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateUserExpirationWarningTimeMutation, UpdateUserExpirationWarningTimeMutationVariables> mutation={UpdateUserExpirationWarningTimeDocument} {...props} />
    );
    
export type UpdateUserExpirationWarningTimeProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<UpdateUserExpirationWarningTimeMutation, UpdateUserExpirationWarningTimeMutationVariables>
    } & TChildProps;
export function withUpdateUserExpirationWarningTime<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateUserExpirationWarningTimeMutation,
  UpdateUserExpirationWarningTimeMutationVariables,
  UpdateUserExpirationWarningTimeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateUserExpirationWarningTimeMutation, UpdateUserExpirationWarningTimeMutationVariables, UpdateUserExpirationWarningTimeProps<TChildProps, TDataName>>(UpdateUserExpirationWarningTimeDocument, {
      alias: 'updateUserExpirationWarningTime',
      ...operationOptions
    });
};

/**
 * __useUpdateUserExpirationWarningTimeMutation__
 *
 * To run a mutation, you first call `useUpdateUserExpirationWarningTimeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserExpirationWarningTimeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserExpirationWarningTimeMutation, { data, loading, error }] = useUpdateUserExpirationWarningTimeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserExpirationWarningTimeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserExpirationWarningTimeMutation, UpdateUserExpirationWarningTimeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserExpirationWarningTimeMutation, UpdateUserExpirationWarningTimeMutationVariables>(UpdateUserExpirationWarningTimeDocument, options);
      }
export type UpdateUserExpirationWarningTimeMutationHookResult = ReturnType<typeof useUpdateUserExpirationWarningTimeMutation>;
export type UpdateUserExpirationWarningTimeMutationResult = Apollo.MutationResult<UpdateUserExpirationWarningTimeMutation>;
export type UpdateUserExpirationWarningTimeMutationOptions = Apollo.BaseMutationOptions<UpdateUserExpirationWarningTimeMutation, UpdateUserExpirationWarningTimeMutationVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  signOut {
    success
  }
}
    `;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;
export type SignOutComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SignOutMutation, SignOutMutationVariables>, 'mutation'>;

    export const SignOutComponent = (props: SignOutComponentProps) => (
      <ApolloReactComponents.Mutation<SignOutMutation, SignOutMutationVariables> mutation={SignOutDocument} {...props} />
    );
    
export type SignOutProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>
    } & TChildProps;
export function withSignOut<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SignOutMutation,
  SignOutMutationVariables,
  SignOutProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, SignOutMutation, SignOutMutationVariables, SignOutProps<TChildProps, TDataName>>(SignOutDocument, {
      alias: 'signOut',
      ...operationOptions
    });
};

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const ShareDocumentsDocument = gql`
    mutation ShareDocuments($input: ShareDocumentsMutationInput!) {
  shareDocuments(input: $input) {
    sharingEvent {
      id
    }
  }
}
    `;
export type ShareDocumentsMutationFn = Apollo.MutationFunction<ShareDocumentsMutation, ShareDocumentsMutationVariables>;
export type ShareDocumentsComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<ShareDocumentsMutation, ShareDocumentsMutationVariables>, 'mutation'>;

    export const ShareDocumentsComponent = (props: ShareDocumentsComponentProps) => (
      <ApolloReactComponents.Mutation<ShareDocumentsMutation, ShareDocumentsMutationVariables> mutation={ShareDocumentsDocument} {...props} />
    );
    
export type ShareDocumentsProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: Apollo.MutationFunction<ShareDocumentsMutation, ShareDocumentsMutationVariables>
    } & TChildProps;
export function withShareDocuments<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ShareDocumentsMutation,
  ShareDocumentsMutationVariables,
  ShareDocumentsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, ShareDocumentsMutation, ShareDocumentsMutationVariables, ShareDocumentsProps<TChildProps, TDataName>>(ShareDocumentsDocument, {
      alias: 'shareDocuments',
      ...operationOptions
    });
};

/**
 * __useShareDocumentsMutation__
 *
 * To run a mutation, you first call `useShareDocumentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useShareDocumentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [shareDocumentsMutation, { data, loading, error }] = useShareDocumentsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useShareDocumentsMutation(baseOptions?: Apollo.MutationHookOptions<ShareDocumentsMutation, ShareDocumentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ShareDocumentsMutation, ShareDocumentsMutationVariables>(ShareDocumentsDocument, options);
      }
export type ShareDocumentsMutationHookResult = ReturnType<typeof useShareDocumentsMutation>;
export type ShareDocumentsMutationResult = Apollo.MutationResult<ShareDocumentsMutation>;
export type ShareDocumentsMutationOptions = Apollo.BaseMutationOptions<ShareDocumentsMutation, ShareDocumentsMutationVariables>;
export const GetAllDocumentsDocument = gql`
    query GetAllDocuments {
  personalDetails {
    id
    documents {
      id
      name
      category
      attachment {
        id
        previewUrl
      }
    }
  }
}
    `;
export type GetAllDocumentsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>, 'query'>;

    export const GetAllDocumentsComponent = (props: GetAllDocumentsComponentProps) => (
      <ApolloReactComponents.Query<GetAllDocumentsQuery, GetAllDocumentsQueryVariables> query={GetAllDocumentsDocument} {...props} />
    );
    
export type GetAllDocumentsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>
    } & TChildProps;
export function withGetAllDocuments<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAllDocumentsQuery,
  GetAllDocumentsQueryVariables,
  GetAllDocumentsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetAllDocumentsQuery, GetAllDocumentsQueryVariables, GetAllDocumentsProps<TChildProps, TDataName>>(GetAllDocumentsDocument, {
      alias: 'getAllDocuments',
      ...operationOptions
    });
};

/**
 * __useGetAllDocumentsQuery__
 *
 * To run a query within a React component, call `useGetAllDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDocumentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllDocumentsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>(GetAllDocumentsDocument, options);
      }
export function useGetAllDocumentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>(GetAllDocumentsDocument, options);
        }
export type GetAllDocumentsQueryHookResult = ReturnType<typeof useGetAllDocumentsQuery>;
export type GetAllDocumentsLazyQueryHookResult = ReturnType<typeof useGetAllDocumentsLazyQuery>;
export type GetAllDocumentsQueryResult = Apollo.QueryResult<GetAllDocumentsQuery, GetAllDocumentsQueryVariables>;
export const GetSharingEventsDocument = gql`
    query GetSharingEvents {
  personalDetails {
    id
    sharingEvents {
      id
      sentFromEmail
      recipientEmails
      categoriesIncluded
      createdAt
      documentSent
      documents {
        name
      }
    }
  }
}
    `;
export type GetSharingEventsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetSharingEventsQuery, GetSharingEventsQueryVariables>, 'query'>;

    export const GetSharingEventsComponent = (props: GetSharingEventsComponentProps) => (
      <ApolloReactComponents.Query<GetSharingEventsQuery, GetSharingEventsQueryVariables> query={GetSharingEventsDocument} {...props} />
    );
    
export type GetSharingEventsProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetSharingEventsQuery, GetSharingEventsQueryVariables>
    } & TChildProps;
export function withGetSharingEvents<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetSharingEventsQuery,
  GetSharingEventsQueryVariables,
  GetSharingEventsProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetSharingEventsQuery, GetSharingEventsQueryVariables, GetSharingEventsProps<TChildProps, TDataName>>(GetSharingEventsDocument, {
      alias: 'getSharingEvents',
      ...operationOptions
    });
};

/**
 * __useGetSharingEventsQuery__
 *
 * To run a query within a React component, call `useGetSharingEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSharingEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSharingEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSharingEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetSharingEventsQuery, GetSharingEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSharingEventsQuery, GetSharingEventsQueryVariables>(GetSharingEventsDocument, options);
      }
export function useGetSharingEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSharingEventsQuery, GetSharingEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSharingEventsQuery, GetSharingEventsQueryVariables>(GetSharingEventsDocument, options);
        }
export type GetSharingEventsQueryHookResult = ReturnType<typeof useGetSharingEventsQuery>;
export type GetSharingEventsLazyQueryHookResult = ReturnType<typeof useGetSharingEventsLazyQuery>;
export type GetSharingEventsQueryResult = Apollo.QueryResult<GetSharingEventsQuery, GetSharingEventsQueryVariables>;