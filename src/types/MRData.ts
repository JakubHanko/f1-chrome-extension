export interface MRData {
  xmlns: string;
  series: string;
  url: string;
  limit: string;
  offset: string;
  total: string;
}

export type MRDataResponse = {
  MRData: MRData;
};
