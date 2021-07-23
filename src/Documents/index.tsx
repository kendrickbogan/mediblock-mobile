import React, { FC } from "react"
import { Text, Pressable, StyleSheet, ScrollView, View } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useNavigation } from "@react-navigation/native"
import { SvgXml } from "react-native-svg"
import { gql } from "@apollo/client"

import { categories, CategoryType } from "../category"
import { useStatusBarEffect } from "../navigation/useStatusBarEffect"
import { DocumentsRoutes } from "../navigation/routes"
import { DocumentsStackParams } from "../navigation/DocumentsStack"
import {
  useGetMenuDataByCategoryQuery,
  ExpirationCategoryCount,
  FormCompletionCategoryCount,
} from "../generated/graphql"
import FullScreenLoadingIndicator from "../FullScreenLoadingIndicator"

import { Buttons, Sizing, Elements, Colors, Typography } from "../styles"
import { Icons } from "../assets"

type DocumentsScreenNavigationProp = StackNavigationProp<
  DocumentsStackParams,
  "Documents"
>

export const GET_MENU_DATA_BY_CATEGORY = gql`
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
`

const Documents: FC = () => {
  useStatusBarEffect("light", Colors.primary.brand)

  return (
    <ScrollView style={style.container}>
      <CategoriesConnector />
    </ScrollView>
  )
}

const CategoriesConnector: FC = () => {
  const { loading, data } = useGetMenuDataByCategoryQuery()

  if (loading) {
    return <FullScreenLoadingIndicator />
  }

  return (
    <CategoriesContent
      expirationsByCategory={data?.personalDetails?.expirationsByCategory}
      formCompletionByCategory={data?.personalDetails?.formCompletionByCategory}
    />
  )
}

type CategoryWithMenuData = {
  category: CategoryType
  upcomingExpirationsCount: number
  completedFormsCount: number
}

interface CategoriesContentProps {
  expirationsByCategory: ExpirationCategoryCount[] | undefined
  formCompletionByCategory: FormCompletionCategoryCount[] | undefined
}

const CategoriesContent: FC<CategoriesContentProps> = ({
  expirationsByCategory,
  formCompletionByCategory,
}) => {
  const categoriesWithMenuData = categories.reduce(
    (
      acc: CategoryWithMenuData[],
      curr: CategoryType,
    ): CategoryWithMenuData[] => {
      const expirationsForCategory = expirationsByCategory?.find(
        expirationCategoryCount => expirationCategoryCount.id === curr.id,
      )
      const formCompletionForCategory = formCompletionByCategory?.find(
        formCompletionCategoryCount =>
          formCompletionCategoryCount.id === curr.id,
      )

      return [
        ...acc,
        {
          category: curr,
          upcomingExpirationsCount: expirationsForCategory?.count || 0,
          completedFormsCount: formCompletionForCategory?.count || 0,
        },
      ]
    },
    [],
  )

  return (
    <>
      {categoriesWithMenuData.map(
        ({ category, upcomingExpirationsCount, completedFormsCount }) => (
          <CategoryListItem
            category={category}
            upcomingExpirationsCount={upcomingExpirationsCount}
            completedFormsCount={completedFormsCount}
            key={category.label}
          />
        ),
      )}
    </>
  )
}

interface CategoryListItemProps {
  category: CategoryType
  upcomingExpirationsCount: number
  completedFormsCount: number
}

const CategoryListItem: FC<CategoryListItemProps> = ({
  category,
  upcomingExpirationsCount,
  completedFormsCount,
}) => {
  const navigation = useNavigation<DocumentsScreenNavigationProp>()

  const handleOnPressCategory = (): void => {
    navigation.navigate(DocumentsRoutes.Category, {
      categoryData: category,
    })
  }

  const allFormsCompleted =
    completedFormsCount === category.profileSections.length

  const formCompletionText = `${completedFormsCount} / ${category.profileSections.length} forms completed`

  const upcomingExpirationsText = `${upcomingExpirationsCount} ${
    upcomingExpirationsCount === 1 ? "document" : "documents"
  } expiring soon`

  return (
    <Pressable
      onPress={handleOnPressCategory}
      style={Buttons.applyOpacity(style.categoryButton)}
      accessibilityRole="button"
    >
      <View style={style.labelAndExpirations}>
        <View>
          <Text style={style.categoryButtonText}>{category.label}</Text>
          {allFormsCompleted ? (
            <View style={style.statusTextCompleted}>
              <Text style={style.statusTextCompletedText}>Completed</Text>
              <SvgXml
                xml={Icons.CheckCircle}
                fill={Colors.success.s400}
                width={Sizing.icons.x10}
                height={Sizing.icons.x10}
              />
            </View>
          ) : (
            <Text style={style.formsCompletedText}>{formCompletionText}</Text>
          )}
        </View>
        {upcomingExpirationsCount > 0 && (
          <Text style={style.upcomingExpirationsText} maxFontSizeMultiplier={1}>
            {upcomingExpirationsText}
          </Text>
        )}
      </View>
      <SvgXml
        xml={Icons.CircleChevronRight}
        fill={Colors.secondary.brand}
        width={Sizing.icons.x25}
        height={Sizing.icons.x25}
      />
    </Pressable>
  )
}

const style = StyleSheet.create({
  container: {
    ...Elements.container.base,
  },
  categoryButton: {
    ...Buttons.category.primary,
  },
  categoryButtonText: {
    ...Typography.subheader.x30,
    flexShrink: 1,
  },
  formsCompletedText: {
    ...Typography.fontSize.x20,
    marginTop: Sizing.x2,
  },
  upcomingExpirationsText: {
    ...Typography.subheader.x20,
    color: Colors.primary.brand,
  },
  labelAndExpirations: {
    flex: 1,
    marginRight: Sizing.x20,
  },
  statusTextCompleted: {
    alignItems: "center",
    flexDirection: "row",
  },
  statusTextCompletedText: {
    ...Typography.subheader.x20,
    color: Colors.success.s400,
    marginRight: Sizing.x5,
  },
})

export default Documents
