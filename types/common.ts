export interface IResponse<T = unknown> {
  length: number
  next?: string | null
  previous?: null | string
  records: T[]
  current?: number
  currency?: number
}
export interface INewsSingle{
  "title": string,
  "description":string,
  "image": string
  "created_at": string
  "content": string
  "slug": string
  "similar_news": []
}

export interface IBanner {
  id: number
  title: string
  description: string
  image: string
}
export interface ICommonDataResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
export interface IBreadcrumb {
  title: string
  link: string
}

