export type FactorItemCommand = {
  gtin?: string
  name?: string
  nameFa?: string
  price: number
  quantity: number
}

export type FactorCreateCommand = {
  appPublicId: string
  currency: 'IRR' | 'USD' | 'CAD'
  total: number
  items: FactorItemCommand[]
  factorDate: string
  payer: string
  createdAt?: number
  updatedAt?: number
}

export type FactorItem = {
  i: number // GTIN
  p: number // Price
  q: number // Quantity
  r: number // Row
}

export type FactorDTO = {
  trackingCode: number
  publicId: string
  appPublicId: string
  currency: 'IRR' | 'USD' | 'CAD'
  total: number
  items: FactorItem[]
  factorDate: string // ISO 8601
  payer: string
  createdAt?: number // Unix timestamp
  updatedAt?: number // Unix timestamp
  paid?: boolean
  paidRef?: 'IPG_SEP'
}

export type ObtainTokenCommand = {
  publicId: string
  appPublicId: string
  ipgCompany: 'SAMAN'
  amount: number
}

export type TokenDTO = {
  status: number
  token?: string
  errorCode?: string
  errorDesc?: string
}
