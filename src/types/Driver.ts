export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export const getDriverName = (driver: Driver): string =>
  `${driver.givenName} ${driver.familyName}`;
