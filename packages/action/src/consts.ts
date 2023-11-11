import pkg from "../package.json";

if (!pkg.version) throw new Error("No version found in package.json");
export const NEXTBIRD_VERSION = pkg.version;
