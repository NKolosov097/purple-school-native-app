export type TVariant = "default" | "info" | "success" | "error"

export interface ToastConfig {
  id: number
  title: string
  variant: TVariant
}

export interface ToastContextType {
  showToast: (variant: TVariant, title: string) => void
}

export interface ToastItemProps {
  toast: ToastConfig
  onRemove: (id: number) => void
}

export interface ToastContainerProps {
  toasts: ToastConfig[]
  onRemoveToast: (id: number) => void
}
