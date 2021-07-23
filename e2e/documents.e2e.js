describe("When the app boots", () => {
  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
    await element(by.id("DocumentsTab")).tap()
  })

  const scrollToAndTap = async (text) => {
    await waitFor(element(by.text(text)))
      .toBeVisible()
      .whileElement(by.id("ScrollView"))
      .scroll(5000)
    await element(by.text(text)).tap()
  }

  it("has the correct Documents sections", async () => {
    await expect(element(by.text("General Information"))).toExist()
    await expect(element(by.text("Education and Training"))).toExist()
    await expect(element(by.text("Board Certifications"))).toExist()
    await expect(element(by.text("Professional Licensure"))).toExist()
    await expect(
      element(by.text("Professional Liability Insurance Details")),
    ).toExist()
    await expect(
      element(by.text("Physician Medical Licensing Examinations")),
    ).toExist()
    await expect(element(by.text("Professional Peer References"))).toExist()
    await expect(element(by.text("Hospital Affiliations"))).toExist()
    await expect(element(by.text("Other Certifications"))).toExist()
    await expect(element(by.text("Healthcare Facility Affiliations"))).toExist()
    await expect(element(by.text("Academic Appointments"))).toExist()
    await expect(element(by.text("Research and Public Benefit Data"))).toExist()
    await expect(element(by.text("PPD/Vaccinations"))).toExist()
    await expect(element(by.text("Work/Employment History"))).toExist()
  })

  it("has the correct General Information sections", async () => {
    await scrollToAndTap("General Information")
    await element(by.text("Profile Information")).tap()

    await expect(element(by.text("Personal"))).toExist()
    await expect(element(by.text("Birth and Citizenship"))).toExist()
    await expect(element(by.text("Address"))).toExist()
    await expect(element(by.text("Identifying Numbers"))).toExist()
    await expect(element(by.text("Drivers License"))).toExist()
    await expect(element(by.text("Passport"))).toExist()
    await expect(element(by.text("Military Service"))).toExist()
    await expect(element(by.text("Languages Spoken"))).toExist()
  })

  it("has the correct Education and Training sections", async () => {
    await scrollToAndTap("Education and Training")
    await element(by.text("Profile Information")).tap()

    await expect(element(by.text("Medical/Professional School"))).toExist()
    await expect(element(by.text("Other Degree"))).toExist()
    await expect(element(by.text("Undergraduate Degree"))).toExist()
    await expect(element(by.text("Residency"))).toExist()
    await expect(element(by.text("Fellowship"))).toExist()
    await expect(element(by.text("Internship"))).toExist()
    await expect(element(by.text("Hospital Membership"))).toExist()
  })

  it("has the correct Board Certifications sections", async () => {
    await scrollToAndTap("Board Certifications")
    await element(by.text("Profile Information")).tap()

    await expect(element(by.text("Primary Specialty"))).toExist()
    await expect(element(by.text("Secondary Specialty"))).toExist()
  })

  it("has the correct Professional Licensure sections", async () => {
    await scrollToAndTap("Professional Licensure")
    await element(by.text("Profile Information")).tap()

    await expect(element(by.text("State Medical Licenses"))).toExist()
    await expect(
      element(by.text("Other State Professional Licenses")),
    ).toExist()
    await expect(element(by.text("DEA License"))).toExist()
    await expect(element(by.text("State X-Ray/Fluoroscopy License"))).toExist()
  })

  it("has the correct Professional Liability Insurance Details sections", async () => {
    await scrollToAndTap("Professional Liability Insurance Details")
    await element(by.text("Profile Information")).tap()

    await expect(
      element(by.text("Professional Liability Insurance Carrier")),
    ).toExist()
    await expect(
      element(by.text("Professional Liability Judgments Questionnaire")),
    ).toExist()
    await expect(
      element(by.text("Insurance Carrier or Entity Policies")),
    ).toExist()
    await expect(element(by.text("Malpractice Claims History"))).toExist()
  })

  it("has the correct Physician Medical Licensing Examinations sections", async () => {
    await scrollToAndTap("Physician Medical Licensing Examinations")
    await element(by.text("Profile Information")).tap()

    await expect(element(by.text("USMLE Scores"))).toExist()
    await expect(element(by.text("COMLEX USA Scores"))).toExist()
  })

  it("has the correct Professional Peer References sections", async () => {
    await scrollToAndTap("Professional Peer References")
    await element(by.text("Profile Information")).tap()

    await expect(element(by.text("Peer Reference 1"))).toExist()
    await expect(element(by.text("Peer Reference 2"))).toExist()
    await expect(element(by.text("Peer Reference 3"))).toExist()
  })

  it("has the correct Hospital Affiliations sections", async () => {
    await scrollToAndTap("Hospital Affiliations")
    await element(by.text("Profile Information")).tap()

    await expect(element(by.text("Hospital Affiliations"))).toExist()
  })

  it("has the correct Other Certifications sections", async () => {
    await scrollToAndTap("Other Certifications")
    await element(by.text("Profile Information")).tap()

    await expect(element(by.text("BLS"))).toExist()
    await expect(element(by.text("ACLS"))).toExist()
    await expect(element(by.text("PALS"))).toExist()
    await expect(element(by.text("ATLS"))).toExist()
    await expect(element(by.text("CPR"))).toExist()
    await expect(element(by.text("CoreC"))).toExist()
    await expect(element(by.text("NALS"))).toExist()
    await expect(element(by.text("NRP"))).toExist()
    await expect(element(by.text("Other"))).toExist()
    await expect(element(by.text("CME Credit Hours"))).toExist()
  })

  it("has the correct Healthcare Facility Affiliations sections", async () => {
    await scrollToAndTap("Healthcare Facility Affiliations")
    await element(by.text("Profile Information")).tap()

    await expect(element(by.text("Healthcare Facility Affiliations"))).toExist()
  })

  it("has the correct Academic Appointments sections", async () => {
    await scrollToAndTap("Academic Appointments")
    await element(by.text("Profile Information")).tap()

    await expect(element(by.text("Academic Appointments"))).toExist()
    await expect(
      element(by.text("Administrative Leadership Positions")),
    ).toExist()
  })

  it("has the correct Research and Public Benefit Data sections", async () => {
    await scrollToAndTap("Research and Public Benefit Data")
    await element(by.text("Profile Information")).tap()

    await expect(element(by.text("Demographic Information"))).toExist()
    await expect(element(by.text("Health Professions Scholarship"))).toExist()
    await expect(
      element(by.text("Loan Repayment/Forgiveness Information")),
    ).toExist()
    await expect(
      element(by.text("National Health Service Corps Scholarship")),
    ).toExist()
    await expect(
      element(by.text("United States Public Health Service")),
    ).toExist()
  })

  it("has the correct PPD/Vaccinations sections", async () => {
    await scrollToAndTap("PPD/Vaccinations")
    await element(by.text("Profile Information")).tap()

    await expect(element(by.text("COVID-19 Vaccine"))).toExist()
    await expect(element(by.text("PPD Tuberculosis Testing"))).toExist()
    await expect(element(by.text("Influenza Vaccination"))).toExist()
  })

  it("has the correct Work/Employment History sections", async () => {
    await scrollToAndTap("Work/Employment History")
    await element(by.text("Profile Information")).tap()

    await expect(element(by.text("Medical Group/Employer"))).toExist()
    await expect(
      element(by.text("Explanation for > 6 Month Employment Gap")),
    ).toExist()
  })
})
