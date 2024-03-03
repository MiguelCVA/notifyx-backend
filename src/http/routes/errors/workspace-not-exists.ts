export class WorkspaceNotExistsError extends Error {
  errorId: string

  constructor() {
    super('This workspace not exists.')
    this.errorId = 'abb6373f-03a7-4a35-ba75-16378f73eab9'
  }
}
