export class UnauthorizedError extends Error {
  errorId: string

  constructor() {
    super('Unauthorized.')
    this.errorId = '9206331e-e852-4fb9-a2f0-357b7b56d37e'
  }
}
