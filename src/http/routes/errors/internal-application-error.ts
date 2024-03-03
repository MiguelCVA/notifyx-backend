export class InternalApplicationError extends Error {
  errorId: string

  constructor() {
    super('Internal application error.')
    this.errorId = '1181ea27-1385-4a5a-9767-c35728fa341e'
  }
}
