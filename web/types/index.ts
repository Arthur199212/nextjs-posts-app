export interface registerRequestDocument {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface loginRequestDocument {
  email: string
  password: string
}

export interface postDocument {
  id: string
  title: string
  body: string
  imageUrl: string
  user: {
    id: string,
    name: string,
    avatarUrl: string
  },
  createdAt: string
}
