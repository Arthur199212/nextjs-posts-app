class HttpError extends Error {
  public status!: number
}

export class BadRequest extends HttpError {
  constructor (message = 'BadRequest') {
    super (message)

    this.status = 400
  }
}

export class Unatherized extends HttpError {
  constructor (message = 'Unatherized') {
    super (message)

    this.status = 401
  }
}
