export interface IResponse<T = unknown> {
  length: number
  next?: string | null
  previous?: null | string
  records: T[]
  current?: number
  currency?: number
}

export interface IBanner {
  id: number
  title: string
  description: string
  image: string
}
