export interface registerRequestData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface loginRequestData {
  email: string
  password: string
}
