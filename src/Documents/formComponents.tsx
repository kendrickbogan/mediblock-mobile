import React from "react"

import {
  DegreeKind,
  SpecialtyRankEnum,
  PostGraduateTrainingKind,
  CertificationKindEnum,
  ProfessionalLicenseKind,
  ProfileSectionEnum,
} from "../generated/graphql"

import AcademicAppointmentsForm from "../Forms/AcademicAppointmentsForm"
import AddressForm from "../Forms/AddressForm"
import AdministrativeLeadershipPositionsForm from "../Forms/AdministrativeLeadershipPositionsForm"
import BirthAndCitizenshipForm from "../Forms/BirthAndCitizenshipForm"
import BoardCertificationForm from "../Forms/BoardCertificationForm"
import CMECreditHoursForm from "../Forms/CMECreditHoursForm"
import COMLEXUSAScoresForm from "../Forms/COMLEXUSAScoresForm"
import CertificationForm from "../Forms/CertificationForm"
import CovidVaccinationForm from "../Forms/CovidVaccinationForm"
import CustomCertificationsForm from "../Forms/CustomCertificationsForm"
import DEALicenseForm from "../Forms/DEALicenseForm"
import DegreeForm from "../Forms/DegreeForm"
import DemographicInformationForm from "../Forms/DemographicInformationForm"
import DriversLicenseForm from "../Forms/DriversLicenseForm"
import EmploymentGapExplanationForm from "../Forms/EmploymentGapExplanationForm"
import HealthProfessionsScholarshipForm from "../Forms/HealthProfessionsScholarshipForm"
import HealthcareFacilityAffiliationsForm from "../Forms/HealthcareFacilityAffiliationsForm"
import HospitalAffiliationsForm from "../Forms/HospitalAffiliationsForm"
import IdentifyingNumbersForm from "../Forms/IdentifyingNumbersForm"
import InfluenzaVaccinationForm from "../Forms/InfluenzaVaccinationForm"
import InsurancePoliciesForm from "../Forms/InsurancePoliciesForm"
import LoanRepaymentDetailForm from "../Forms/LoanRepaymentDetailForm"
import MalpracticeClaimsForm from "../Forms/MalpracticeClaimsForm"
import MedicalDegreeForm from "../Forms/MedicalDegreeForm"
import MedicalGroupEmployerForm from "../Forms/MedicalGroupEmployerForm"
import MilitaryServiceForm from "../Forms/MilitaryServiceForm"
import NationalHealthServiceCorpsScholarshipForm from "../Forms/NationalHealthServiceCorpsScholarshipForm"
import PPDTuberculosisTestingForm from "../Forms/PPDTuberculosisTestingForm"
import PassportForm from "../Forms/PassportForm"
import PeerReferenceForm from "../Forms/PeerReferencesForm"
import PersonalDetailsForm from "../Forms/PersonalDetailsForm"
import PostGraduateTrainingForm from "../Forms/PostGraduateTrainingForm"
import PriorNamesForm from "../Forms/PriorNamesForm"
import ProfessionalLiabilityInsuranceCarrierForm from "../Forms/ProfessionalLiabilityInsuranceCarrierForm"
import ProfessionalLiabilityJudgmentsQuestionnaireForm from "../Forms/ProfessionalLiabilityJudgmentsQuestionnaireForm"
import ProfessionalLicensesForm from "../Forms/ProfessionalLicensesForm"
import SpokenLanguagesForm from "../Forms/SpokenLanguagesForm"
import USMLEScoresForm from "../Forms/USMLEScoresForm"
import USPublicHealthServiceForm from "../Forms/USPublicHealthServiceForm"

export interface FormComponent {
  profileSectionId: ProfileSectionEnum
  component: Element
}

export const formComponents: FormComponent[] = [
  {
    profileSectionId: ProfileSectionEnum.Personal,
    component: <PersonalDetailsForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.MilitaryService,
    component: <MilitaryServiceForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.Address,
    component: <AddressForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.DriversLicense,
    component: <DriversLicenseForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.Passport,
    component: <PassportForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.MedicalDegree,
    component: <MedicalDegreeForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.BirthAndCitizenship,
    component: <BirthAndCitizenshipForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.Residency,
    component: (
      <PostGraduateTrainingForm
        postGraduateTrainingKind={PostGraduateTrainingKind.Residency}
      />
    ),
  },
  {
    profileSectionId: ProfileSectionEnum.Internship,
    component: (
      <PostGraduateTrainingForm
        postGraduateTrainingKind={PostGraduateTrainingKind.Internship}
      />
    ),
  },
  {
    profileSectionId: ProfileSectionEnum.Fellowship,
    component: (
      <PostGraduateTrainingForm
        postGraduateTrainingKind={PostGraduateTrainingKind.Fellowship}
      />
    ),
  },
  {
    profileSectionId: ProfileSectionEnum.IdentifyingNumbers,
    component: <IdentifyingNumbersForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.SpokenLanguages,
    component: <SpokenLanguagesForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.UndergraduateDegree,
    component: <DegreeForm degreeKind={DegreeKind.Undergraduate} />,
  },
  {
    profileSectionId: ProfileSectionEnum.OtherDegree,
    component: <DegreeForm degreeKind={DegreeKind.Other} />,
  },
  {
    profileSectionId: ProfileSectionEnum.PrimarySpecialty,
    component: (
      <BoardCertificationForm specialtyRank={SpecialtyRankEnum.Primary} />
    ),
  },
  {
    profileSectionId: ProfileSectionEnum.SecondarySpecialty,
    component: (
      <BoardCertificationForm specialtyRank={SpecialtyRankEnum.Secondary} />
    ),
  },
  {
    profileSectionId: ProfileSectionEnum.DeaLicense,
    component: <DEALicenseForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.ProfessionalLiabilityInsuranceCarrier,
    component: <ProfessionalLiabilityInsuranceCarrierForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.PeerReference_1,
    component: <PeerReferenceForm peerReferencePosition={1} />,
  },
  {
    profileSectionId: ProfileSectionEnum.PeerReference_2,
    component: <PeerReferenceForm peerReferencePosition={2} />,
  },
  {
    profileSectionId: ProfileSectionEnum.PeerReference_3,
    component: <PeerReferenceForm peerReferencePosition={3} />,
  },
  {
    profileSectionId: ProfileSectionEnum.StateMedicalLicenses,
    component: (
      <ProfessionalLicensesForm
        professionalLicenseKind={ProfessionalLicenseKind.Medical}
      />
    ),
  },
  {
    profileSectionId: ProfileSectionEnum.OtherStateProfessionalLicenses,
    component: (
      <ProfessionalLicensesForm
        professionalLicenseKind={ProfessionalLicenseKind.Other}
      />
    ),
  },
  {
    profileSectionId: ProfileSectionEnum.StateXrayFluoroscopyLicense,
    component: (
      <ProfessionalLicensesForm
        professionalLicenseKind={ProfessionalLicenseKind.XrayFluoroscopy}
      />
    ),
  },
  {
    profileSectionId: ProfileSectionEnum.UsmleScores,
    component: <USMLEScoresForm />,
  },
  {
    profileSectionId:
      ProfileSectionEnum.ProfessionalLiabilityJudgmentsQuestionnaire,
    component: <ProfessionalLiabilityJudgmentsQuestionnaireForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.HospitalAffiliations,
    component: <HospitalAffiliationsForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.CmeCreditHours,
    component: <CMECreditHoursForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.ComlexusaScores,
    component: <COMLEXUSAScoresForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.Bls,
    component: (
      <CertificationForm certificationKind={CertificationKindEnum.Bls} />
    ),
  },
  {
    profileSectionId: ProfileSectionEnum.Acls,
    component: (
      <CertificationForm certificationKind={CertificationKindEnum.Acls} />
    ),
  },
  {
    profileSectionId: ProfileSectionEnum.Pals,
    component: (
      <CertificationForm certificationKind={CertificationKindEnum.Pals} />
    ),
  },
  {
    profileSectionId: ProfileSectionEnum.Atls,
    component: (
      <CertificationForm certificationKind={CertificationKindEnum.Atls} />
    ),
  },
  {
    profileSectionId: ProfileSectionEnum.Cpr,
    component: (
      <CertificationForm certificationKind={CertificationKindEnum.Cpr} />
    ),
  },
  {
    profileSectionId: ProfileSectionEnum.CoreC,
    component: (
      <CertificationForm certificationKind={CertificationKindEnum.Corec} />
    ),
  },
  {
    profileSectionId: ProfileSectionEnum.Nals,
    component: (
      <CertificationForm certificationKind={CertificationKindEnum.Nals} />
    ),
  },
  {
    profileSectionId: ProfileSectionEnum.Nrp,
    component: (
      <CertificationForm certificationKind={CertificationKindEnum.Nrp} />
    ),
  },
  {
    profileSectionId: ProfileSectionEnum.OtherCertification,
    component: <CustomCertificationsForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.HealthcareFacilityAffiliations,
    component: <HealthcareFacilityAffiliationsForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.AcademicAppointments,
    component: <AcademicAppointmentsForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.DemographicInformation,
    component: <DemographicInformationForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.HealthProfessionsScholarship,
    component: <HealthProfessionsScholarshipForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.PpdTuberculosisTesting,
    component: <PPDTuberculosisTestingForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.MedicalGroupEmployer,
    component: <MedicalGroupEmployerForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.LoanRepayment,
    component: <LoanRepaymentDetailForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.AdministrativeLeadershipPositions,
    component: <AdministrativeLeadershipPositionsForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.InsuranceCarrier,
    component: <InsurancePoliciesForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.MalpracticeClaims,
    component: <MalpracticeClaimsForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.UnitedStatesPublicHealthService,
    component: <USPublicHealthServiceForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.EmploymentGap,
    component: <EmploymentGapExplanationForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.Covid19Vaccine,
    component: <CovidVaccinationForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.NationalHealthServiceCorpsScholarship,
    component: <NationalHealthServiceCorpsScholarshipForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.InfluenzaVaccination,
    component: <InfluenzaVaccinationForm />,
  },
  {
    profileSectionId: ProfileSectionEnum.PriorNames,
    component: <PriorNamesForm />,
  },
]
