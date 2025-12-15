import { atom } from "jotai"

import { User } from "./user.model"

export interface UserState {
  profile: User | null
  isLoading: boolean
  error: string | null
}

export const profileAtom = atom<UserState>({
  profile: null,
  isLoading: false,
  error: null,
})
