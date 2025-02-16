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

export interface IReport {
  title: string
  file: string
  file_size: number
  file_type: string
}
export interface IContactInfo {
  email: string
  phone: number
  address: string
  latitude: number
  longitude: number
  social: {
    name: string
    url: string
    icon: string
  }[]
}
