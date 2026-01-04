import { InferOutput, minLength, nonEmpty, object, pipe, string } from "valibot"

export interface User {
  achievements: Achievement[]
  activity: any | null
  balances: Balances
  chatsConfig: ChatsConfig
  profile: UserProfile
  skillTreeProgress: SkillTreeProgress
}

export interface Achievement {
  alias: string
  createdAt: string
  event: EventType
  icons: any[]
  id: number
  necessaryProgress: number
  status: AchievementStatus
  text: string
  title: string
  updatedAt: string
}

export type EventType =
  | "UserUpdatedProfileEvent"
  | "LessonViewedEvent"
  | "AddSubscriptionsToUserEvent"
  | "OrderWithMoneySuccessEvent"
  | "AppointmentEvent"
  | "CertificateIssuedEvent"

export type AchievementStatus = "active" | "disabled"

export interface Balances {
  default: number
  referral: number
}

export interface ChatsConfig {
  mentor: boolean
  subscription: boolean
}

export interface UserProfile {
  chips: number
  description: string | null
  email: string
  enFullName: string | null
  githubProfile: string | null
  id: number
  jobTitle: string | null
  name: string
  photo: string | null
  profileStatus: ProfileStatus
  role: UserRole
  skills: any[]
  surname: string | null
  telegramProfile: string | null
}

export type ProfileStatus = "private" | "public"

export type UserRole = "student" | "mentor" | "admin"

export interface SkillTreeProgress {
  passed: number
  percent: number
  total: number
}

export interface ActiveAchievement extends Achievement {
  status: "active"
}

export interface DisabledAchievement extends Achievement {
  status: "disabled"
}

export interface GroupedAchievements {
  active: ActiveAchievement[]
  disabled: DisabledAchievement[]
}

export interface AchievementsStats {
  total: number
  active: number
  disabled: number
  byEventType: Record<EventType, number>
}

export const profileSchema = object({
  name: pipe(
    string("Имя должно быть строкой"),
    nonEmpty("Имя обязательно для заполнения"),
    minLength(1, "Имя должен содержать минимум 1 символ")
  ),
})

export type ProfileFormData = InferOutput<typeof profileSchema>

export interface IUserState {
  user: User | null
  isLoading: boolean
  error: string | null
}

export interface IPatchProfileData {
  chips: number
  cl_uid: string
  click_id: number
  createdAt: string
  description: string | null
  discordId: number | null
  enFullName: string | null
  gender: string | null
  githubUrl: string | null
  id: number
  inDiscord: boolean
  inTelegram: boolean
  interests: []
  isService: boolean
  jobTitle: string | null
  mainDirectionId: number | null
  marks: []
  name: string | null
  openAiTokenLimit: number
  openAiTokenUsages: number
  photo: string | null
  pid: number | null
  profileStatus: ProfileStatus
  referralId: number | null
  referrer: string
  restoreTokenHash: string | null
  role: UserRole
  skills: []
  surname: string | null
  telegramId: number | null
  telegramUsername: string | null
  transaction_id: number | null
  updatedAt: string
  utm_campaign: string
  utm_content: string
  utm_medium: string
  utm_source: string
  utm_term: string | null
}
