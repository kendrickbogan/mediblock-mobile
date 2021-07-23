import Purchases, { PurchasesPackage } from "react-native-purchases"

export type Subscription = "None" | "Access" | "Error"

export const getSubscriptions = async (): Promise<Subscription> => {
  try {
    const { activeSubscriptions } = await Purchases.getPurchaserInfo()
    return await handleGotSubscriptions(activeSubscriptions)
  } catch (e) {
    console.log("Error getting subscriptions", e)
    return "Error"
  }
}

export const restoreSubscriptions = async (): Promise<Subscription> => {
  try {
    const { activeSubscriptions } = await Purchases.restoreTransactions()
    return await handleGotSubscriptions(activeSubscriptions)
  } catch (e) {
    console.log("Error restoring subscriptions", e)
    return "Error"
  }
}

const handleGotSubscriptions = async (
  activeSubscriptions: string[],
): Promise<Subscription> => {
  const offerings = await Purchases.getOfferings()
  const currentOfferings = offerings?.current

  if (!currentOfferings) {
    throw new Error("Couldn't get current offerings")
  }

  const productIds = currentOfferings.availablePackages.map(
    (p: PurchasesPackage) => p.product.identifier,
  )
  const userSubscription = activeSubscriptions[0]
  const userHasActiveSubscription = productIds.some(
    productId => userSubscription === productId,
  )

  if (userHasActiveSubscription) {
    return "Access"
  } else {
    return "None"
  }
}
