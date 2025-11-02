export interface Source {
  uri: string;
  title: string;
}

export interface SearchResult {
  text: string;
  sources: Source[];
}