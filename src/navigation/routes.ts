export type Routes<T extends string> = Record<T, T>

export type NavigatorRoute =
  | "TabNavigator"
  | "AddDocumentForUpload"
  | "ShareHistory"

export const NavigatorRoutes: Routes<NavigatorRoute> = {
  TabNavigator: "TabNavigator",
  AddDocumentForUpload: "AddDocumentForUpload",
  ShareHistory: "ShareHistory",
}

export type TabRoute = "Documents" | "Share" | "Settings"

export const TabRoutes: Routes<TabRoute> = {
  Documents: "Documents",
  Share: "Share",
  Settings: "Settings",
}

export type AddDocumentForUploadRoute =
  | "AddDocumentUpload"
  | "EditDocumentUpload"

export const AddDocumentForUploadRoutes: Routes<AddDocumentForUploadRoute> = {
  AddDocumentUpload: "AddDocumentUpload",
  EditDocumentUpload: "EditDocumentUpload",
}

export type DocumentsRoute =
  | "Documents"
  | "Category"
  | "ProfileInformationForm"
  | "DocumentUploads"

export const DocumentsRoutes: Routes<DocumentsRoute> = {
  Documents: "Documents",
  Category: "Category",
  ProfileInformationForm: "ProfileInformationForm",
  DocumentUploads: "DocumentUploads",
}

export type UnauthenticatedRoute = "SignIn" | "SignUp"

export const UnauthenticatedRoutes: Routes<UnauthenticatedRoute> = {
  SignIn: "SignIn",
  SignUp: "SignUp",
}

export type SettingsRoute = "SettingsMenu" | "ExpirationWarningTime"

export const SettingsRoutes: Routes<SettingsRoute> = {
  SettingsMenu: "SettingsMenu",
  ExpirationWarningTime: "ExpirationWarningTime",
}

export type ShareRoute = "Share" | "AddRecipients" | "Review" | "Confirmation"

export const ShareRoutes: Routes<ShareRoute> = {
  Share: "Share",
  AddRecipients: "AddRecipients",
  Review: "Review",
  Confirmation: "Confirmation",
}

export type ShareHistoryRoute = "History"

export const ShareHistoryRoutes: Routes<ShareHistoryRoute> = {
  History: "History",
}

export type OnboardingRoute = "HowThisWorks" | "VerifyIdentity" | "ImportData"

export const OnboardingRoutes: Routes<OnboardingRoute> = {
  HowThisWorks: "HowThisWorks",
  VerifyIdentity: "VerifyIdentity",
  ImportData: "ImportData",
}

export type ProfileInformationRoute = "Form" | "ScansAndDocuments" | "Status"

export const ProfileInformationRoutes: Routes<ProfileInformationRoute> = {
  Form: "Form",
  ScansAndDocuments: "ScansAndDocuments",
  Status: "Status",
}

export type ProfileInformationLabel = "Form" | "ScansAndDocuments" | "Status"

export const ProfileInformationLabels: Record<
  ProfileInformationRoute,
  string
> = {
  Form: "Form",
  ScansAndDocuments: "Scans & Documents",
  Status: "Status",
}
