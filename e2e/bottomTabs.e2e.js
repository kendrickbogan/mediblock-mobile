describe("When the app boots", () => {
  const signIn = async () => {
    await element(by.id("email")).replaceText("email@example.com")
    await element(by.id("password")).replaceText("password")
    await element(by.text("Sign In")).tap()
  }

  beforeAll(async () => {
    await device.launchApp()
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it("has the correct bottom tabs", async () => {
    await signIn()

    await expect(element(by.id("DocumentsTab"))).toBeVisible()
    await expect(element(by.id("ShareTab"))).toBeVisible()
    await expect(element(by.id("SettingsTab"))).toBeVisible()
  })
})
