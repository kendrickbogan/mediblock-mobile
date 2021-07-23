import React, { FC, useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native"
import Purchases, { PurchasesPackage } from "react-native-purchases"
import Config from "react-native-config"
import { SvgXml } from "react-native-svg"

import { RemoteData } from "../remoteData"
import { useSubscriptionContext } from "../SubscriptionContext"
import FullScreenLoadingIndicator from "../FullScreenLoadingIndicator"
import { useAuthContext } from "../AuthContext"
import ExternalLinking from "../externalLinking"
import { useStatusBarEffect } from "../navigation/useStatusBarEffect"

import {
  Buttons,
  Colors,
  Elements,
  Outlines,
  Sizing,
  Typography,
} from "../styles"
import { Icons, Images } from "../assets"

type PurchasesPackageError = "NoPackage"
type PurchasesPackageRemoteData = RemoteData<
  PurchasesPackage,
  PurchasesPackageError
>

const HowThisWorks: FC = () => {
  return (
    <SafeAreaView style={style.container}>
      <HowThisWorksContent />
    </SafeAreaView>
  )
}

const HowThisWorksContent: FC = () => {
  useStatusBarEffect("dark", Colors.neutral.white)
  const { setSubscription } = useSubscriptionContext()
  const { signOut } = useAuthContext()

  const [purchaseInFlight, setPurchaseInFlight] = useState(false)
  const [
    purchasesPackageRemoteData,
    setPurchasesPackageRemoteData,
  ] = useState<PurchasesPackageRemoteData>({
    kind: "NotStarted",
  })

  const getOfferings = async (): Promise<void> => {
    setPurchasesPackageRemoteData({ kind: "Loading" })

    const offerings = await Purchases.getOfferings()
    const annualPackage = offerings?.current?.annual

    if (annualPackage) {
      setPurchasesPackageRemoteData({ kind: "Success", data: annualPackage })
    } else {
      setPurchasesPackageRemoteData({
        kind: "Failure",
        error: "NoPackage",
      })
    }
  }

  useEffect(() => {
    getOfferings()
  }, [])

  if (purchasesPackageRemoteData.kind === "Loading") {
    return <FullScreenLoadingIndicator />
  }

  if (purchasesPackageRemoteData.kind === "Failure") {
    const handleOnPressReload = (): void => {
      getOfferings()
    }

    const handleOnPressSimulatePurchase = (): void => {
      setSubscription("Access")
    }

    return (
      <ScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
        alwaysBounceVertical={false}
      >
        <Text style={style.errorHeaderText}>Something went wrong</Text>
        <Text style={style.errorBodyText}>
          Try reloading with the button below. If that doesn&apos;t work, close
          and reopen the app and ensure you&apos;re connected to the internet.
        </Text>
        <Pressable
          style={Buttons.applyOpacity(style.pillButton)}
          onPress={handleOnPressReload}
          accessibilityRole="button"
        >
          <Text style={style.pillButtonText}>Reload</Text>
        </Pressable>
        {__DEV__ && (
          <Pressable
            style={Buttons.applyOpacity()}
            onPress={handleOnPressSimulatePurchase}
            accessibilityRole="button"
          >
            <Text style={style.devButtonText}>DEV: Simulate Purchase</Text>
          </Pressable>
        )}
      </ScrollView>
    )
  }

  if (purchasesPackageRemoteData.kind === "Success") {
    const annualPackagePrice =
      purchasesPackageRemoteData.data.product.price_string

    const handleOnPressSignOut = (): void => {
      signOut()
    }

    const handleOnPressLearnMore = async (): Promise<void> => {
      ExternalLinking.openUrl(Config.LEARN_MORE_URL)
    }

    const handleOnPressPrivacyPolicy = async (): Promise<void> => {
      ExternalLinking.openUrl(Config.PRIVACY_POLICY_URL)
    }

    const handleOnPressTermsOfUse = async (): Promise<void> => {
      ExternalLinking.openUrl(Config.TERMS_OF_USE_URL)
    }

    const handleOnPressPurchase = (
      purchasesPackage: PurchasesPackage,
    ) => async (): Promise<void> => {
      setPurchaseInFlight(true)
      try {
        await Purchases.purchasePackage(purchasesPackage)
        setPurchaseInFlight(false)
        setSubscription("Access")
      } catch (e) {
        setPurchaseInFlight(false)
      }
    }

    const handleOnPressRestorePurchases = async (): Promise<void> => {
      setPurchaseInFlight(true)
      try {
        const result = await Purchases.restoreTransactions()
        setPurchaseInFlight(false)
        if (result.activeSubscriptions.length === 0) {
          Alert.alert(
            "No Purchases to Restore",
            "We couldn't find any active subscriptions for MediBlock.",
          )
        } else {
          setSubscription("Access")
        }
      } catch (e) {
        setPurchaseInFlight(false)
        Alert.alert("Something Went Wrong", "Please try again.")
      }
    }

    return (
      <>
        <View style={style.navigationContainer}>
          <Pressable
            style={Buttons.applyOpacity(style.navigationButton)}
            onPress={handleOnPressSignOut}
            accessibilityRole="button"
          >
            <Text style={style.navigationButtonText}>Sign Out</Text>
          </Pressable>
          <Pressable
            style={Buttons.applyOpacity(style.navigationButton)}
            onPress={handleOnPressLearnMore}
            accessibilityRole="button"
          >
            <Text style={style.navigationButtonText}>Learn More</Text>
          </Pressable>
        </View>
        <ScrollView
          style={style.container}
          contentContainerStyle={style.contentContainer}
          alwaysBounceVertical={false}
        >
          <View style={style.appInfoContainer}>
            <View style={style.logoContainer}>
              <SvgXml xml={Images.MediBlockLogo} width="250" />
            </View>
            <Text style={style.introText}>
              Securely store and share all your medical identity documents
            </Text>
            <View>
              <FeatureBullet text="Unlimited secure cloud storage" />
              <FeatureBullet text="Quickly share documents via email" />
              <FeatureBullet text="Stay on top of upcoming expirations" />
            </View>
          </View>
          <View style={style.subscribeContainer}>
            <Text style={style.freeTrialText}>
              Start with a 3 month free trial
            </Text>
            <Pressable
              style={Buttons.applyOpacity(style.pillButton)}
              onPress={handleOnPressPurchase(purchasesPackageRemoteData.data)}
              accessibilityRole="button"
              accessibilityState={{ disabled: purchaseInFlight }}
              disabled={purchaseInFlight}
            >
              <Text style={style.pillButtonText}>
                Subscribe for {annualPackagePrice} / Year
              </Text>
            </Pressable>
            <Text style={style.subscribeButtonDescriptionText}>
              Cancel anytime within the first 3 months and you won’t be charged.
              Renews annually.
            </Text>
          </View>

          <Pressable
            style={Buttons.applyOpacity(style.restorePurchasesButton)}
            onPress={handleOnPressRestorePurchases}
            accessibilityRole="button"
            accessibilityState={{ disabled: purchaseInFlight }}
            disabled={purchaseInFlight}
          >
            <Text style={style.restorePurchasesButtonText}>
              Restore Purchases
            </Text>
          </Pressable>
        </ScrollView>

        <View style={style.footerContainer}>
          <Pressable
            style={Buttons.applyOpacity(style.footerLegalButton)}
            onPress={handleOnPressTermsOfUse}
            accessibilityRole="link"
          >
            <Text style={style.footerLegalButtonText}>Terms of Use</Text>
          </Pressable>

          <Pressable
            style={Buttons.applyOpacity(style.footerLegalButton)}
            onPress={handleOnPressPrivacyPolicy}
            accessibilityRole="link"
          >
            <Text style={style.footerLegalButtonText}>Privacy Policy</Text>
          </Pressable>
        </View>
        {purchaseInFlight && <FullScreenLoadingIndicator />}
      </>
    )
  }

  return null
}

interface FeatureBulletProps {
  text: string
}
const FeatureBullet: FC<FeatureBulletProps> = ({ text }) => {
  return (
    <View style={style.featureBullet}>
      <SvgXml
        xml={Icons.Checkmark}
        width={Sizing.x20}
        height={Sizing.x20}
        strokeWidth={Sizing.iconStroke.x20}
        stroke={Colors.primary.brand}
      />
      <Text style={style.featureBulletText}>{text}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    ...Elements.container.base,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.neutral.s100,
    justifyContent: "center",
    paddingHorizontal: Sizing.x20,
    paddingBottom: Sizing.x30,
  },
  appInfoContainer: {
    alignItems: "center",
  },
  subscribeContainer: {
    alignItems: "center",
    marginVertical: Sizing.x50,
  },
  pillButton: {
    ...Buttons.pill.primary,
    backgroundColor: Colors.primary.brand,
    borderColor: Colors.primary.brand,
    marginVertical: Sizing.x20,
    width: "100%",
  },
  pillButtonText: {
    ...Buttons.pillText.primary,
    textAlign: "center",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: Sizing.x20,
  },
  introText: {
    ...Typography.subheader.x30,
    marginBottom: Sizing.x20,
    paddingHorizontal: Sizing.x40,
    textAlign: "center",
  },
  featureBullet: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: Sizing.x5,
  },
  featureBulletText: {
    ...Typography.body.x20,
    marginLeft: Sizing.x10,
    textAlign: "center",
  },
  freeTrialText: {
    ...Typography.subheader.x30,
    textAlign: "center",
  },
  subscribeButtonDescriptionText: {
    ...Typography.body.x20,
    color: Colors.neutral.s400,
    paddingHorizontal: Sizing.x40,
    textAlign: "center",
  },
  restorePurchasesButton: {
    alignSelf: "center",
  },
  restorePurchasesButtonText: {
    ...Typography.body.x20,
    color: Colors.primary.brand,
    textAlign: "center",
  },
  navigationContainer: {
    borderBottomWidth: Outlines.borderWidth.hairline,
    borderColor: Colors.neutral.s200,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navigationButton: {
    alignSelf: "flex-start",
    marginTop: Sizing.x10,
    paddingHorizontal: Sizing.x20,
    paddingVertical: Sizing.x10,
  },
  navigationButtonText: {
    ...Typography.body.x20,
    color: Colors.neutral.s500,
    textAlign: "center",
  },
  footerContainer: {
    alignItems: "center",
    backgroundColor: Colors.neutral.s100,
    borderColor: Colors.neutral.s100,
    borderTopWidth: Outlines.borderWidth.thin,
    flexDirection: "row",
    padding: Sizing.x20,
  },
  footerLegalButton: {
    flex: 1,
    alignItems: "center",
  },
  footerLegalButtonText: {
    ...Typography.body.x20,
    color: Colors.primary.brand,
    textAlign: "center",
  },
  errorHeaderText: {
    ...Typography.subheader.x40,
    textAlign: "center",
    marginBottom: Sizing.x10,
  },
  errorBodyText: {
    ...Typography.body.x20,
    textAlign: "center",
    marginBottom: Sizing.x20,
  },
  devButtonText: {
    ...Typography.body.x20,
    color: Colors.neutral.s500,
    textAlign: "center",
  },
})

export default HowThisWorks
