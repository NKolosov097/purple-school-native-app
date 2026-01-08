export interface ICourse {
  id: number
  alias: string
  shortTitle: string
  title: string
  subTitle: string
  description: string
  metaTitle: string
  metaDescription: string
  image: string
  icon: string | null
  link: string
  length: number
  complexity: number
  difficultyLevel: DifficultyLevel
  status: CourseStatus
  price: number
  oldPrice: number | null
  creditPrice: number | null
  avgRating: number | null
  udemyRating: number
  order: number
  tariff: TTariffType
  teacherId: number
  courseId: number | null
  tags: string[]
  techs: string[]
  skills: string[]
  requirements: string[]
  techDescription: string | null
  exercises: number
  tests: number
  hasConsultaion: boolean
  isOnSite: boolean
  demoVideo: string
  video: string
  plannedReleaseDate: string | null
  discountEndDate: string | null
  telegramChannelId: string
  telegramThreadName: string | null
  discordRoleId: string | null
  discordCategoryId: string | null
  discordChannelsId: string[]
  dzenclassSheet: string | null
  createdAt: string
  updatedAt: string

  allTariffs?: ITariff[]
  tariffs?: ITariff[]
  courseOnDirection?: ICourseDirection[]
  metaData?: IMetaData | null
  progress?: IProgress
  userTariff?: IUserTariff
}

export interface ICourseDirection {
  courseId: number
  directionId: number

  direction: {
    id: number
    alias: string
    color: string
    name: string
    order: number
  }
}

export interface IMetaData {
  [key: string]: any
}

export type DifficultyLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED"

export type CourseStatus = "published" | "soon" | "draft"

export const TariffType = {
  free: "free",
  basic: "basic",
  mentor: "mentor",
  project: "project",
} as const

export type TTariffType = (typeof TariffType)[keyof typeof TariffType]

export interface IProgress {
  progressPercent: number
  tariffLessonsCount: number
  userViewedLessonsCount: number
}

export interface IUserTariff {
  id: number
  name: string
  type: TTariffType
}

export interface ICoursesResponse {
  my: ICourse[]
  other: ICourse[]
}

export interface IStudentCourseDescription {
  id: number
  shortTitle: string
  image: string
  title: string
  alias: string
  length: number
  avgRating: number
  price: number
  courseOnDirection: ICourseDirection[]
  tariffs: ITariff[]
  progress: IProgress
}

export interface ITariff {
  id: number
  name: string
  price: number
  type: TTariffType
  oldPrice?: number
  creditPrice?: number
  lengthInMonth: number
  courseId: number
  createdAt: string
  videoUuid: string
}

export interface ICourseFilters {
  difficulty?: DifficultyLevel[]
  status?: CourseStatus[]
  tariff?: TTariffType[]
  minPrice?: number
  maxPrice?: number
  search?: string
}

export interface IPaginatedCourses {
  courses: ICourse[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ICategorizedCourses {
  myCourses: ICourse[]
  recommendedCourses: ICourse[]
  upcomingCourses: ICourse[]
}

export interface ICourseState {
  courses: ICourse[]
  remindedCourses: Map<number, Date>
  isLoading: boolean
  error: string | null
}
