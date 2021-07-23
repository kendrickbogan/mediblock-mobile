import React, { FC } from "react"
import { Text, StyleSheet, ScrollView, Pressable } from "react-native"
import { gql, useMutation } from "@apollo/client"
import Config from "react-native-config"
import { useNavigation } from "@react-navigation/native"
import { SvgXml } from "react-native-svg"

import { useStatusBarEffect } from "../navigation/useStatusBarEffect"
import { useAuthContext } from "../AuthContext"
import { SignOutMutation } from "../generated/graphql"
import ExternalLinking from "../externalLinking"
import { SettingsRoutes } from "../navigation/routes"

import { Colors, Buttons, Elements, Sizing } from "../styles"
import { Icons } from "../assets"

const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      success
    }
  }
`

const SettingsMenu: FC = () => {
  useStatusBarEffect("light", Colors.primary.brand)
  const navigation = useNavigation()
  const { signOut } = useAuthContext()
  const [signOutMutation] = useMutation<SignOutMutation>(SIGN_OUT)

  const handleOnPressTermsOfUse = async (): Promise<void> => {
    ExternalLinking.openUrl(Config.TERMS_OF_USE_URL)
  }

  const handleOnPressPrivacyPolicy = async (): Promise<void> => {
    ExternalLinking.openUrl(Config.PRIVACY_POLICY_URL)
  }

  const handleOnPressSignOut = async (): Promise<void> => {
    await signOutMutation()
    signOut()
  }

  const handleOnPressExpirationWarningTime = (): void => {
    navigation.navigate(SettingsRoutes.ExpirationWarningTime)
  }

  return (
    <ScrollView
      style={style.container}
      contentContainerStyle={style.contentContainer}
      alwaysBounceVertical={false}
    >
      <Pressable
        style={Buttons.applyOpacity(style.listItemButton)}
        accessibilityRole="button"
        onPress={handleOnPressExpirationWarningTime}
      >
        <Text style={style.listItemText}>Expiration Warning Time Frame</Text>
        <SvgXml
          xml={Icons.CircleChevronRight}
          fill={Colors.secondary.brand}
          width={Sizing.icons.x25}
          height={Sizing.icons.x25}
        />
      </Pressable>
      <Pressable
        style={Buttons.applyOpacity(style.listItemButton)}
        accessibilityRole="link"
        onPress={handleOnPressTermsOfUse}
      >
        <Text style={style.listItemText}>Terms of Use</Text>
        <SvgXml
          xml={Icons.CircleChevronRight}
          fill={Colors.secondary.brand}
          width={Sizing.icons.x25}
          height={Sizing.icons.x25}
        />
      </Pressable>
      <Pressable
        style={Buttons.applyOpacity(style.listItemButton)}
        accessibilityRole="link"
        onPress={handleOnPressPrivacyPolicy}
      >
        <Text style={style.listItemText}>Privacy Policy</Text>
        <SvgXml
          xml={Icons.CircleChevronRight}
          fill={Colors.secondary.brand}
          width={Sizing.icons.x25}
          height={Sizing.icons.x25}
        />
      </Pressable>
      <Pressable
        style={Buttons.applyOpacity(style.listItemButton)}
        accessibilityRole="button"
        onPress={handleOnPressSignOut}
      >
        <Text style={style.listItemText}>Sign Out</Text>
        <SvgXml
          xml={Icons.LogOut}
          stroke={Colors.secondary.brand}
          strokeWidth={Sizing.iconStroke.x20}
          width={Sizing.icons.x25}
          height={Sizing.icons.x25}
        />
      </Pressable>
    </ScrollView>
  )
}

const style = StyleSheet.create({
  container: {
    ...Elements.container.base,
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.neutral.s100,
  },
  listItemButton: {
    ...Buttons.category.primary,
  },
  listItemText: {
    ...Buttons.categoryText.primary,
  },
})

export default SettingsMenu
