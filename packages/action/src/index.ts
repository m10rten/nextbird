import { NEXTBIRD_VERSION } from "./consts";

// eslint-disable-next-line no-console
console.info(`
  Thank you for using @nextbird/action v${NEXTBIRD_VERSION}!
`);

export * from "./server-action";
export * from "./hooks";
