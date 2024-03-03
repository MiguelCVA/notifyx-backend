export class UserNotFound extends Error {
  errorId: string

  constructor() {
    super('This user not found.')
    this.errorId = '6b66ef6d-47bc-44c5-8573-ad8a55db8a36'
  }
}
