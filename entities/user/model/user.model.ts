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
