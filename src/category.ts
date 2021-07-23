import { DocumentCategoryEnum, ProfileSectionEnum } from "./generated/graphql"

export type CategoryType = {
  id: DocumentCategoryEnum
  label: string
  profileSections: ProfileSection[]
}
export type ProfileSection = {
  id: ProfileSectionEnum
  label: string
}

export type ProfileCategoryId =
  | "GeneralInformation"
  | "EducationAndTraining"
  | "BoardCertifications"
  | "ProfessionalLicensure"
  | "ProfessionalLiabilityInsuranceDetails"
  | "PhysicianMedicalLicensingExaminations"
  | "ProfessionalPeerReferences"
  | "OtherCertifications"
  | "HospitalAffiliations"
  | "HealthcareFacilityAffiliations"
  | "AcademicAppointments"
  | "ResearchAndPublicBenefitData"
  | "PPDVaccinations"
  | "WorkEmploymentHistory"

export const ProfileCategoryIds: Record<
  ProfileCategoryId,
  DocumentCategoryEnum
> = {
  GeneralInformation: DocumentCategoryEnum.GeneralInformation,
  EducationAndTraining: DocumentCategoryEnum.EducationAndTraining,
  BoardCertifications: DocumentCategoryEnum.BoardCertification,
  ProfessionalLicensure: DocumentCategoryEnum.ProfessionalLicense,
  ProfessionalLiabilityInsuranceDetails:
    DocumentCategoryEnum.ProfessionalLiabilityInsuranceDetail,
  PhysicianMedicalLicensingExaminations:
    DocumentCategoryEnum.MedicalLicensingExamination,
  ProfessionalPeerReferences: DocumentCategoryEnum.PeerReference,
  OtherCertifications: DocumentCategoryEnum.OtherCertification,
  HospitalAffiliations: DocumentCategoryEnum.HospitalAffiliation,
  HealthcareFacilityAffiliations:
    DocumentCategoryEnum.HealthcareFacilityAffiliation,
  AcademicAppointments: DocumentCategoryEnum.AcademicAppointment,
  ResearchAndPublicBenefitData:
    DocumentCategoryEnum.ResearchAndPublicBenefitData,
  PPDVaccinations: DocumentCategoryEnum.PpdOrVaccination,
  WorkEmploymentHistory: DocumentCategoryEnum.EmploymentHistory,
}

export type ProfileSectionId =
  | EducationAndTrainingSectionId
  | GeneralInformationSectionId
  | BoardCertificationsSectionId
  | ProfessionalLicensureSectionId
  | ProfessionalLiabilityInsuranceDetailsSectionId
  | PhysicianMedicalLicensingExaminationsSectionId
  | ProfessionalPeerReferencesSectionId
  | HospitalAffiliationsSectionId
  | OtherCertificationsSectionId
  | HealthcareFacilityAffiliationsSectionId
  | AcademicAppointmentsSectionId
  | ResearchAndPublicBenefitDataSectionId
  | PPDVaccinationsSectionId
  | WorkEmploymentHistorySectionId

type EducationAndTrainingSectionId =
  | "MedicalDegree"
  | "UndergraduateDegree"
  | "OtherDegree"
  | "Internship"
  | "Residency"
  | "Fellowship"

type GeneralInformationSectionId =
  | "Personal"
  | "PriorNames"
  | "BirthAndCitizenship"
  | "MilitaryService"
  | "Address"
  | "DriversLicense"
  | "Passport"
  | "IdentifyingNumbers"
  | "SpokenLanguages"

type BoardCertificationsSectionId = "PrimarySpecialty" | "SecondarySpecialty"

type ProfessionalLicensureSectionId =
  | "StateMedicalLicenses"
  | "OtherStateProfessionalLicenses"
  | "DEALicense"
  | "StateXrayFluoroscopyLicense"

type ProfessionalLiabilityInsuranceDetailsSectionId =
  | "ProfessionalLiabilityInsuranceCarrier"
  | "ProfessionalLiabilityJudgmentsQuestionnaire"
  | "InsuranceCarrier"
  | "MalpracticeClaims"

type ProfessionalPeerReferencesSectionId =
  | "PeerReference1"
  | "PeerReference2"
  | "PeerReference3"

type HospitalAffiliationsSectionId = "HospitalAffiliations"

type OtherCertificationsSectionId =
  | "CMECreditHours"
  | "BLS"
  | "ACLS"
  | "PALS"
  | "ATLS"
  | "CPR"
  | "CoreC"
  | "NALS"
  | "NRP"
  | "OtherCertification"

type PhysicianMedicalLicensingExaminationsSectionId =
  | "USMLEScores"
  | "COMLEXUSAScores"

type HealthcareFacilityAffiliationsSectionId = "HealthcareFacilityAffiliations"

type AcademicAppointmentsSectionId =
  | "AcademicAppointments"
  | "AdministrativeLeadershipPositions"

type ResearchAndPublicBenefitDataSectionId =
  | "DemographicInformation"
  | "HealthProfessionsScholarship"
  | "LoanRepayment"
  | "NationalHealthServiceCorpsScholarship"
  | "UniteStatesPublicHealthService"

type PPDVaccinationsSectionId =
  | "PPDTuberculosisTesting"
  | "InfluenzaVaccination"
  | "COVID19Vaccine"

type WorkEmploymentHistorySectionId = "MedicalGroupEmployer" | "EmploymentGap"

const EducationAndTrainingSectionIds: Record<
  EducationAndTrainingSectionId,
  ProfileSectionEnum
> = {
  MedicalDegree: ProfileSectionEnum.MedicalDegree,
  UndergraduateDegree: ProfileSectionEnum.UndergraduateDegree,
  OtherDegree: ProfileSectionEnum.OtherDegree,
  Internship: ProfileSectionEnum.Internship,
  Residency: ProfileSectionEnum.Residency,
  Fellowship: ProfileSectionEnum.Fellowship,
}

const GeneralInformationSectionIds: Record<
  GeneralInformationSectionId,
  ProfileSectionEnum
> = {
  Personal: ProfileSectionEnum.Personal,
  PriorNames: ProfileSectionEnum.PriorNames,
  BirthAndCitizenship: ProfileSectionEnum.BirthAndCitizenship,
  MilitaryService: ProfileSectionEnum.MilitaryService,
  Address: ProfileSectionEnum.Address,
  DriversLicense: ProfileSectionEnum.DriversLicense,
  Passport: ProfileSectionEnum.Passport,
  IdentifyingNumbers: ProfileSectionEnum.IdentifyingNumbers,
  SpokenLanguages: ProfileSectionEnum.SpokenLanguages,
}

const BoardCertificationsSectionIds: Record<
  BoardCertificationsSectionId,
  ProfileSectionEnum
> = {
  PrimarySpecialty: ProfileSectionEnum.PrimarySpecialty,
  SecondarySpecialty: ProfileSectionEnum.SecondarySpecialty,
}

const ProfessionalLicensureSectionIds: Record<
  ProfessionalLicensureSectionId,
  ProfileSectionEnum
> = {
  StateMedicalLicenses: ProfileSectionEnum.StateMedicalLicenses,
  OtherStateProfessionalLicenses:
    ProfileSectionEnum.OtherStateProfessionalLicenses,
  DEALicense: ProfileSectionEnum.DeaLicense,
  StateXrayFluoroscopyLicense: ProfileSectionEnum.StateXrayFluoroscopyLicense,
}

const ProfessionalLiabilityInsuranceDetailsSectionIds: Record<
  ProfessionalLiabilityInsuranceDetailsSectionId,
  ProfileSectionEnum
> = {
  ProfessionalLiabilityInsuranceCarrier:
    ProfileSectionEnum.ProfessionalLiabilityInsuranceCarrier,
  ProfessionalLiabilityJudgmentsQuestionnaire:
    ProfileSectionEnum.ProfessionalLiabilityJudgmentsQuestionnaire,
  InsuranceCarrier: ProfileSectionEnum.InsuranceCarrier,
  MalpracticeClaims: ProfileSectionEnum.MalpracticeClaims,
}

const ProfessionalPeerReferencesSectionIds: Record<
  ProfessionalPeerReferencesSectionId,
  ProfileSectionEnum
> = {
  PeerReference1: ProfileSectionEnum.PeerReference_1,
  PeerReference2: ProfileSectionEnum.PeerReference_2,
  PeerReference3: ProfileSectionEnum.PeerReference_3,
}

const HospitalAffiliationsSectionIds: Record<
  HospitalAffiliationsSectionId,
  ProfileSectionEnum
> = {
  HospitalAffiliations: ProfileSectionEnum.HospitalAffiliations,
}

const OtherCertificationsSectionIds: Record<
  OtherCertificationsSectionId,
  ProfileSectionEnum
> = {
  CMECreditHours: ProfileSectionEnum.CmeCreditHours,
  BLS: ProfileSectionEnum.Bls,
  ACLS: ProfileSectionEnum.Acls,
  PALS: ProfileSectionEnum.Pals,
  ATLS: ProfileSectionEnum.Atls,
  CPR: ProfileSectionEnum.Cpr,
  CoreC: ProfileSectionEnum.CoreC,
  NALS: ProfileSectionEnum.Nals,
  NRP: ProfileSectionEnum.Nrp,
  OtherCertification: ProfileSectionEnum.OtherCertification,
}

const PhysicianMedicalLicensingExaminationsSectionIds: Record<
  PhysicianMedicalLicensingExaminationsSectionId,
  ProfileSectionEnum
> = {
  USMLEScores: ProfileSectionEnum.UsmleScores,
  COMLEXUSAScores: ProfileSectionEnum.ComlexusaScores,
}

const HealthcareFacilityAffiliationsSectionIds: Record<
  HealthcareFacilityAffiliationsSectionId,
  ProfileSectionEnum
> = {
  HealthcareFacilityAffiliations:
    ProfileSectionEnum.HealthcareFacilityAffiliations,
}

const AcademicAppointmentsSectionIds: Record<
  AcademicAppointmentsSectionId,
  ProfileSectionEnum
> = {
  AcademicAppointments: ProfileSectionEnum.AcademicAppointments,
  AdministrativeLeadershipPositions:
    ProfileSectionEnum.AdministrativeLeadershipPositions,
}

const ResearchAndPublicBenefitDataSectionIds: Record<
  ResearchAndPublicBenefitDataSectionId,
  ProfileSectionEnum
> = {
  DemographicInformation: ProfileSectionEnum.DemographicInformation,
  HealthProfessionsScholarship: ProfileSectionEnum.HealthProfessionsScholarship,
  LoanRepayment: ProfileSectionEnum.LoanRepayment,
  NationalHealthServiceCorpsScholarship:
    ProfileSectionEnum.NationalHealthServiceCorpsScholarship,
  UniteStatesPublicHealthService:
    ProfileSectionEnum.UnitedStatesPublicHealthService,
}

const PPDVaccinationsSectionIds: Record<
  PPDVaccinationsSectionId,
  ProfileSectionEnum
> = {
  PPDTuberculosisTesting: ProfileSectionEnum.PpdTuberculosisTesting,
  COVID19Vaccine: ProfileSectionEnum.Covid19Vaccine,
  InfluenzaVaccination: ProfileSectionEnum.InfluenzaVaccination,
}

const WorkEmploymentHistorySectionIds: Record<
  WorkEmploymentHistorySectionId,
  ProfileSectionEnum
> = {
  MedicalGroupEmployer: ProfileSectionEnum.MedicalGroupEmployer,
  EmploymentGap: ProfileSectionEnum.EmploymentGap,
}

export const ProfileSectionIds = {
  ...GeneralInformationSectionIds,
  ...EducationAndTrainingSectionIds,
  ...BoardCertificationsSectionIds,
  ...ProfessionalLicensureSectionIds,
  ...ProfessionalLiabilityInsuranceDetailsSectionIds,
  ...PhysicianMedicalLicensingExaminationsSectionIds,
  ...ProfessionalPeerReferencesSectionIds,
  ...HospitalAffiliationsSectionIds,
  ...OtherCertificationsSectionIds,
  ...HealthcareFacilityAffiliationsSectionIds,
  ...AcademicAppointmentsSectionIds,
  ...ResearchAndPublicBenefitDataSectionIds,
  ...PPDVaccinationsSectionIds,
  ...WorkEmploymentHistorySectionIds,
}

const educationAndTrainingCategory: CategoryType = {
  id: ProfileCategoryIds.EducationAndTraining,
  label: "Education and Training",
  profileSections: [
    {
      label: "Medical/Professional School",
      id: EducationAndTrainingSectionIds.MedicalDegree,
    },
    {
      label: "Other Degree",
      id: EducationAndTrainingSectionIds.OtherDegree,
    },
    {
      label: "Undergraduate Degree",
      id: EducationAndTrainingSectionIds.UndergraduateDegree,
    },
    {
      label: "Residency",
      id: EducationAndTrainingSectionIds.Residency,
    },
    {
      label: "Fellowship",
      id: EducationAndTrainingSectionIds.Fellowship,
    },
    {
      label: "Internship",
      id: EducationAndTrainingSectionIds.Internship,
    },
  ],
}

const generalInformationCategory: CategoryType = {
  id: ProfileCategoryIds.GeneralInformation,
  label: "General Information",
  profileSections: [
    {
      label: "Personal",
      id: GeneralInformationSectionIds.Personal,
    },
    {
      label: "Prior Names",
      id: GeneralInformationSectionIds.PriorNames,
    },
    {
      label: "Birth and Citizenship",
      id: GeneralInformationSectionIds.BirthAndCitizenship,
    },
    {
      label: "Address",
      id: GeneralInformationSectionIds.Address,
    },
    {
      label: "Identifying Numbers",
      id: GeneralInformationSectionIds.IdentifyingNumbers,
    },
    {
      label: "Drivers License",
      id: GeneralInformationSectionIds.DriversLicense,
    },
    {
      label: "Passport",
      id: GeneralInformationSectionIds.Passport,
    },
    {
      label: "Military Service",
      id: GeneralInformationSectionIds.MilitaryService,
    },
    {
      label: "Languages Spoken",
      id: GeneralInformationSectionIds.SpokenLanguages,
    },
  ],
}

const boardCertificationsCategory: CategoryType = {
  id: ProfileCategoryIds.BoardCertifications,
  label: "Board Certifications",
  profileSections: [
    {
      label: "Primary Specialty",
      id: BoardCertificationsSectionIds.PrimarySpecialty,
    },
    {
      label: "Secondary Specialty",
      id: BoardCertificationsSectionIds.SecondarySpecialty,
    },
  ],
}

const professionalLicensureCategory: CategoryType = {
  id: ProfileCategoryIds.ProfessionalLicensure,
  label: "Professional Licensure",
  profileSections: [
    {
      label: "State Medical Licenses",
      id: ProfessionalLicensureSectionIds.StateMedicalLicenses,
    },
    {
      label: "Other State Professional Licenses",
      id: ProfessionalLicensureSectionIds.OtherStateProfessionalLicenses,
    },
    {
      label: "DEA License",
      id: ProfessionalLicensureSectionIds.DEALicense,
    },
    {
      label: "State X-Ray/Fluoroscopy License",
      id: ProfessionalLicensureSectionIds.StateXrayFluoroscopyLicense,
    },
  ],
}

const professionalLiabilityInsuranceDetailsCategory: CategoryType = {
  id: ProfileCategoryIds.ProfessionalLiabilityInsuranceDetails,
  label: "Professional Liability Insurance Details",
  profileSections: [
    {
      label: "Professional Liability Insurance Carrier",
      id:
        ProfessionalLiabilityInsuranceDetailsSectionIds.ProfessionalLiabilityInsuranceCarrier,
    },
    {
      label: "Professional Liability Judgments Questionnaire",
      id:
        ProfessionalLiabilityInsuranceDetailsSectionIds.ProfessionalLiabilityJudgmentsQuestionnaire,
    },
    {
      label: "Insurance Carrier or Entity Policies",
      id: ProfessionalLiabilityInsuranceDetailsSectionIds.InsuranceCarrier,
    },
    {
      label: "Malpractice Claims History",
      id: ProfessionalLiabilityInsuranceDetailsSectionIds.MalpracticeClaims,
    },
  ],
}

const professionalPeerReferencesCategory: CategoryType = {
  id: ProfileCategoryIds.ProfessionalPeerReferences,
  label: "Professional Peer References",
  profileSections: [
    {
      label: "Peer Reference 1",
      id: ProfessionalPeerReferencesSectionIds.PeerReference1,
    },
    {
      label: "Peer Reference 2",
      id: ProfessionalPeerReferencesSectionIds.PeerReference2,
    },
    {
      label: "Peer Reference 3",
      id: ProfessionalPeerReferencesSectionIds.PeerReference3,
    },
  ],
}

const hospitalAffiliationsCategory: CategoryType = {
  id: ProfileCategoryIds.HospitalAffiliations,
  label: "Hospital Affiliations",
  profileSections: [
    {
      label: "Hospital Affiliations",
      id: HospitalAffiliationsSectionIds.HospitalAffiliations,
    },
  ],
}

const otherCertificationsCategory: CategoryType = {
  id: ProfileCategoryIds.OtherCertifications,
  label: "Other Certifications",
  profileSections: [
    {
      label: "BLS",
      id: OtherCertificationsSectionIds.BLS,
    },
    {
      label: "ACLS",
      id: OtherCertificationsSectionIds.ACLS,
    },
    {
      label: "PALS",
      id: OtherCertificationsSectionIds.PALS,
    },
    {
      label: "ATLS",
      id: OtherCertificationsSectionIds.ATLS,
    },
    {
      label: "CPR",
      id: OtherCertificationsSectionIds.CPR,
    },
    {
      label: "CoreC",
      id: OtherCertificationsSectionIds.CoreC,
    },
    {
      label: "NALS",
      id: OtherCertificationsSectionIds.NALS,
    },
    {
      label: "NRP",
      id: OtherCertificationsSectionIds.NRP,
    },
    {
      label: "Other",
      id: OtherCertificationsSectionIds.OtherCertification,
    },
    {
      label: "CME Credit Hours",
      id: OtherCertificationsSectionIds.CMECreditHours,
    },
  ],
}

const physicianMedicalLicensingExaminationsCategory: CategoryType = {
  id: ProfileCategoryIds.PhysicianMedicalLicensingExaminations,
  label: "Physician Medical Licensing Examinations",
  profileSections: [
    {
      label: "USMLE Scores",
      id: PhysicianMedicalLicensingExaminationsSectionIds.USMLEScores,
    },
    {
      label: "COMLEX USA Scores",
      id: PhysicianMedicalLicensingExaminationsSectionIds.COMLEXUSAScores,
    },
  ],
}

const healthcareFacilityAffiliationsCategory: CategoryType = {
  id: ProfileCategoryIds.HealthcareFacilityAffiliations,
  label: "Healthcare Facility Affiliations",
  profileSections: [
    {
      label: "Healthcare Facility Affiliations",
      id:
        HealthcareFacilityAffiliationsSectionIds.HealthcareFacilityAffiliations,
    },
  ],
}

const academicAppointmentsCategory: CategoryType = {
  id: ProfileCategoryIds.AcademicAppointments,
  label: "Academic Appointments",
  profileSections: [
    {
      label: "Academic Appointments",
      id: AcademicAppointmentsSectionIds.AcademicAppointments,
    },
    {
      label: "Administrative Leadership Positions",
      id: AcademicAppointmentsSectionIds.AdministrativeLeadershipPositions,
    },
  ],
}

const researchAndPublicBenefitDataCategory: CategoryType = {
  id: ProfileCategoryIds.ResearchAndPublicBenefitData,
  label: "Research and Public Benefit Data",
  profileSections: [
    {
      label: "Demographic Information",
      id: ResearchAndPublicBenefitDataSectionIds.DemographicInformation,
    },
    {
      label: "Health Professions Scholarship",
      id: ResearchAndPublicBenefitDataSectionIds.HealthProfessionsScholarship,
    },
    {
      label: "Loan Repayment/Forgiveness Information",
      id: ResearchAndPublicBenefitDataSectionIds.LoanRepayment,
    },
    {
      label: "National Health Service Corps Scholarship",
      id:
        ResearchAndPublicBenefitDataSectionIds.NationalHealthServiceCorpsScholarship,
    },
    {
      label: "United States Public Health Service",
      id: ResearchAndPublicBenefitDataSectionIds.UniteStatesPublicHealthService,
    },
  ],
}

const ppdVaccinationsCategory: CategoryType = {
  id: ProfileCategoryIds.PPDVaccinations,
  label: "PPD/Vaccinations",
  profileSections: [
    {
      label: "COVID-19 Vaccine",
      id: PPDVaccinationsSectionIds.COVID19Vaccine,
    },
    {
      label: "PPD Tuberculosis Testing",
      id: PPDVaccinationsSectionIds.PPDTuberculosisTesting,
    },
    {
      label: "Influenza Vaccination",
      id: PPDVaccinationsSectionIds.InfluenzaVaccination,
    },
  ],
}

const workEmploymentHistoryCategory: CategoryType = {
  id: ProfileCategoryIds.WorkEmploymentHistory,
  label: "Work/Employment History",
  profileSections: [
    {
      label: "Medical Group/Employer",
      id: WorkEmploymentHistorySectionIds.MedicalGroupEmployer,
    },
    {
      label: "Explanation for > 6 Month Employment Gap",
      id: WorkEmploymentHistorySectionIds.EmploymentGap,
    },
  ],
}

export const categories: CategoryType[] = [
  generalInformationCategory,
  educationAndTrainingCategory,
  boardCertificationsCategory,
  professionalLicensureCategory,
  professionalLiabilityInsuranceDetailsCategory,
  physicianMedicalLicensingExaminationsCategory,
  professionalPeerReferencesCategory,
  hospitalAffiliationsCategory,
  otherCertificationsCategory,
  healthcareFacilityAffiliationsCategory,
  academicAppointmentsCategory,
  researchAndPublicBenefitDataCategory,
  ppdVaccinationsCategory,
  workEmploymentHistoryCategory,
]
