import { TTariffType } from "@/entities/course/model/course.model"

export const getTariffNameByType = (type: TTariffType) => {
  switch (type) {
    case "basic":
      return "Самостоятельный"
    case "mentor":
      return "AI и тренажёры"
    case "project":
      return "Наставник и практика"
    default:
      return "Бесплатные модули"
  }
}
