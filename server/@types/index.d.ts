declare namespace Express {
  export interface Response {
    // tslint:disable-next-line:no-any
    renderBundle(bundleName: string, data?: any): void;
  }
}
