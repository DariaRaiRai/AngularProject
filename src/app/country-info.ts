export interface CovidInfo {
  country: string;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  population: number;
  countryInfo: {
    flag: string;
  };
}
