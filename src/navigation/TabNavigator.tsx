import React, { FC, ReactNode } from "react"
import { Text, Pressable, View, StyleSheet } from "react-native"
import StaticSafeAreaInsets from "react-native-static-safe-area-insets"
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"
import { SvgXml } from "react-native-svg"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

import { TabRoutes, TabRoute } from "./routes"
import DocumentsStack from "./DocumentsStack"
import SettingsStack from "./SettingsStack"
import ShareStack from "./ShareStack"

import { Icons } from "../assets"
import { Colors, Sizing, Outlines, Typography, Buttons } from "../styles"

type TabButtonConfig = {
  label: string
  icon: string
}

const determineConfig = (tab: Tab): TabButtonConfig => {
  switch (tab.name) {
    case "Documents": {
      return {
        label: TabRoutes.Documents,
        icon: Icons.FileText,
      }
    }
    case "Share": {
      return {
        label: TabRoutes.Share,
        icon: Icons.Share,
      }
    }
    case "Settings": {
      return {
        label: TabRoutes.Settings,
        icon: Icons.Sliders,
      }
    }
  }
}

type Tab = {
  name: TabRoute
  component: FC
}

const TabNavigator: FC = () => {
  const documentsTab = {
    name: TabRoutes.Documents,
    component: DocumentsStack,
  }
  const shareTab = {
    name: TabRoutes.Share,
    component: ShareStack,
  }
  const settingsTab = {
    name: TabRoutes.Settings,
    component: SettingsStack,
  }

  const tabs = [documentsTab, shareTab, settingsTab]

  const TabNavigator = createBottomTabNavigator()

  return (
    <TabNavigator.Navigator
      tabBar={(props): ReactNode => <TabBar {...props} tabs={tabs} />}
    >
      {tabs.map(({ name, component }) => {
        return (
          <TabNavigator.Screen name={name} component={component} key={name} />
        )
      })}
    </TabNavigator.Navigator>
  )
}

type TabBarProps = BottomTabBarProps & { tabs: Tab[] }

const TabBar: FC<TabBarProps> = ({
  state,
  navigation: tabNavigation,
  tabs,
}) => {
  const stackNavigation = useNavigation<
    StackNavigationProp<{ undefined: undefined }>
  >()

  const toTabButton = (tab: Tab, index: number): ReactNode => {
    const focusedRouteName = state.routeNames[state.index]

    const tabIsFocused = (tab: Tab): boolean => {
      return tab.name === focusedRouteName
    }

    const currentRoute = state.routes.find(
      route => route.name === focusedRouteName,
    )

    const indexInCurrentRoute = currentRoute?.state?.index

    const isOnRootOfCurrentRoute =
      indexInCurrentRoute === 0 || indexInCurrentRoute === undefined

    const focused = tabIsFocused(tab)

    const handleOnPress = (): void => {
      if (!focused) {
        tabNavigation.navigate(tab.name)
      } else if (!isOnRootOfCurrentRoute) {
        stackNavigation.popToTop()
      }
    }

    const textColor = focused ? Colors.primary.brand : Colors.neutral.black

    const { label, icon } = determineConfig(tab)
    const widthScaleFactor = 0.9

    const tabButtonStyle = {
      ...style.tabButton,
      width: (Sizing.screen.width / tabs.length) * widthScaleFactor,
    }

    return (
      <Pressable
        onPress={handleOnPress}
        style={Buttons.applyOpacity(tabButtonStyle)}
        accessibilityRole="button"
        accessibilityState={focused ? { selected: true } : {}}
        key={index}
        testID={`${label}Tab`}
      >
        <TabIcon focused={focused} icon={icon} />
        <Text
          allowFontScaling={false}
          numberOfLines={2}
          ellipsizeMode="middle"
          style={{ ...style.tabLabelText, color: textColor }}
        >
          {label}
        </Text>
      </Pressable>
    )
  }

  return <View style={style.tabBarContainer}>{tabs.map(toTabButton)}</View>
}

interface TabIconProps {
  focused: boolean
  icon: string
}

const TabIcon: FC<TabIconProps> = ({ focused, icon }) => {
  const iconSize = 22

  return (
    <View style={style.tabIconContainer}>
      <SvgXml
        xml={icon}
        stroke={focused ? Colors.primary.brand : Colors.neutral.black}
        strokeWidth={2}
        width={iconSize}
        height={iconSize}
      />
    </View>
  )
}

const style = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: Sizing.x10,
    paddingBottom: StaticSafeAreaInsets.safeAreaInsetsBottom + Sizing.x10,
    paddingHorizontal: Sizing.x10,
    backgroundColor: Colors.neutral.white,
    borderTopWidth: Outlines.borderWidth.hairline,
    borderColor: Colors.neutral.s200,
  },
  tabButton: {
    alignItems: "center",
  },
  tabIconContainer: {
    marginBottom: Sizing.x10,
  },
  tabLabelText: {
    ...Typography.body.x10,
    textAlign: "center",
    maxWidth: Sizing.x80,
  },
})

export default TabNavigator
