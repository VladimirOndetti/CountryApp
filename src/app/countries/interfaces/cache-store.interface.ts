import { Country } from "./country"
import { Region } from "./region.type"

export interface CacheStore {
  byCapital: TermCountries,
  byCountries: TermCountries,
  byRegion: RegionCountries,
}

export interface TermCountries {
  queryTerm: string,
  countries: Country[]
}

export interface RegionCountries {
  region?: Region,
  countries: Country[]
}
