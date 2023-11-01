import { AppBase } from '../app-base'
import { TaakResponse } from '../taak-response'
import { ProductDTO } from './types'

export class Gtin extends AppBase {

  getProduct(gtin: number, currency = 'IRR'): Promise<TaakResponse> {
    return this.gtinRequest<ProductDTO>(
      `/v1/pip/${gtin}/${currency}`,
      {},
    )
  }
}
