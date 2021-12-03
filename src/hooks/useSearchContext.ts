import { createContext, useContext } from "react"

export type SearchType = {
  displayName: string
  setDisplayName: (value: string) => void
}
export const SearchContext = createContext<SearchType>({
  displayName: '',
  setDisplayName: () => {},
})

export const useSearchContext = () => useContext(SearchContext)