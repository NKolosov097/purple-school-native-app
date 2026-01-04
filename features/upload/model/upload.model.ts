export interface IImageUploaderProps {
  onUpload: (uri: string) => void
}

export interface IUploadState {
  image: string | null
  isLoading: boolean
  error: string | null
}

export interface IUploadResponse {
  urls: {
    original: string
    webP: string
  }
}
