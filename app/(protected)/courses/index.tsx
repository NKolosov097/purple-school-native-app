import { useEffect } from "react"
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native"

import { useAtom } from "jotai"

import { ICourse } from "@/entities/course/model/course.model"
import { loadCoursesAtom } from "@/entities/course/model/course.state"
import { Course } from "@/entities/course/ui/course"

import { COLORS, GAPS } from "@/shared/config/tokens"

const renderItem: ListRenderItem<ICourse> | null | undefined = ({
  item,
}: ListRenderItemInfo<ICourse>) => <Course key={item.id} {...item} />

const CoursesScreen = () => {
  const [{ courses, isLoading }, loadCourses] = useAtom(loadCoursesAtom)

  useEffect(() => {
    void loadCourses()
  }, [loadCourses])

  return (
    <>
      {courses.length === 0 && isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.white} />
        </View>
      ) : null}

      {courses.length > 0 ? (
        <FlatList
          data={courses}
          renderItem={renderItem}
          keyExtractor={({ alias }) => alias}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={loadCourses}
              tintColor={COLORS.white}
              titleColor={COLORS.white}
            />
          }
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        />
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: 30,
  },
  contentContainer: {
    gap: GAPS.g18,
  },
})

export default CoursesScreen
