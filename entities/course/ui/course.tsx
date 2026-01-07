import MaskedView from "@react-native-masked-view/masked-view"
import { LinearGradient } from "expo-linear-gradient"
import { Image, Linking, StyleSheet, Text, View } from "react-native"

import { ICourse } from "@/entities/course/model/course.model"

import { COLORS, FONTS, GAPS, RADIUSES } from "@/shared/config/tokens"
import { COURSE_URL } from "@/shared/constants/api"
import { Button } from "@/shared/ui/button/button"
import { Tag } from "@/shared/ui/tag/Tag"
import { getTariffNameByType } from "@/shared/utils/getTariffNameByType"

export const Course = ({
  alias,
  shortTitle,
  image,
  tariff,
  courseOnDirection,
  progress,
}: ICourse) => {
  const handlePress = () => {
    Linking.openURL(`${COURSE_URL}/${alias}`)
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.header}
        alt={shortTitle}
        source={{
          uri: image,
          height: 168,
        }}
        resizeMode="cover"
        height={168}
      />

      <View style={styles.content}>
        {progress ? (
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressPercent}>
                {progress.progressPercent}&nbsp;%
              </Text>
              <Text style={styles.progressText}>
                {progress.userViewedLessonsCount}&nbsp;/&nbsp;
                {progress.tariffLessonsCount}
              </Text>
            </View>

            <View style={styles.progressFooter}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${progress.progressPercent}%` },
                ]}
              />
            </View>
          </View>
        ) : null}

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{shortTitle}</Text>

          {courseOnDirection && courseOnDirection.length > 0 ? (
            <View style={styles.directionsList}>
              {courseOnDirection.map(({ directionId, direction: { name } }) => (
                <Tag key={directionId} text={name} />
              ))}
            </View>
          ) : null}
        </View>

        {progress && tariff ? (
          <MaskedView
            maskElement={
              <Text style={styles.tariff}>
                Тариф «{getTariffNameByType(tariff)}»
              </Text>
            }
          >
            <LinearGradient
              colors={[COLORS.pinkLight, COLORS.primaryLight, COLORS.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.tariff, styles.tariffWithOpacity]}>
                Тариф «{getTariffNameByType(tariff)}»
              </Text>
            </LinearGradient>
          </MaskedView>
        ) : null}
      </View>

      <View style={styles.footer}>
        <Button
          variant="primary"
          style={styles.footerBtn}
          onPress={handlePress}
        >
          <Text style={styles.footerText}>Продолжить</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayDark,
    borderRadius: RADIUSES.r10,
  },
  header: {
    width: "100%",
    height: 168,
    backgroundColor: COLORS.transparent,
    borderTopLeftRadius: RADIUSES.r10,
    borderTopRightRadius: RADIUSES.r10,
  },
  content: {
    padding: 18,
    gap: GAPS.g18,
    overflowY: "scroll",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  progressContainer: {
    marginTop: -10,
    gap: GAPS.g8,
    width: "100%",
  },
  progressHeader: {
    gap: GAPS.g8,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressPercent: {
    fontFamily: FONTS["FiraSans-Regular"],
    fontSize: FONTS.f16,
    fontWeight: 400,
    color: COLORS.pink,
  },
  progressText: {
    fontFamily: FONTS["FiraSans-Regular"],
    fontSize: FONTS.f12,
    fontWeight: 400,
    color: COLORS.grayLight,
  },
  progressFooter: {
    position: "relative",
    width: "100%",
    height: 4,
    backgroundColor: COLORS.grayStroke,
    borderRadius: RADIUSES.r20,
  },
  progressBar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: COLORS.pink,
    borderRadius: RADIUSES.r20,
  },
  titleContainer: {
    gap: GAPS.g12,
  },
  title: {
    fontFamily: FONTS["FiraSans-SemiBold"],
    fontSize: FONTS.f20,
    fontWeight: 700,
    color: COLORS.white,
  },
  directionsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAPS.g8,
  },
  tariff: {
    fontFamily: FONTS["FiraSans-Regular"],
    fontSize: FONTS.f16,
    fontWeight: 400,
  },
  tariffWithOpacity: {
    opacity: 0,
  },
  footer: {
    padding: 18,
    backgroundColor: COLORS.violetDark,
    borderBottomLeftRadius: RADIUSES.r10,
    borderBottomRightRadius: RADIUSES.r10,
  },
  footerBtn: {
    height: 44,
  },
  footerText: {
    fontFamily: FONTS["FiraSans-Regular"],
    fontSize: FONTS.f16,
    fontWeight: 400,
    color: COLORS.white,
  },
})
