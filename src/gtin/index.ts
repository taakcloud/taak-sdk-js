import { AppBase } from '../app-base'
import { TaakResponse } from '../taak-response'
import { ProductDTO } from './types'

export class Gtin extends AppBase {
  public static readonly basePath = 'https://gtin.taakcloud.com'

  getProduct(gtin: number, currency = 'IRR'): Promise<TaakResponse> {
    return this.request<ProductDTO>(
      `/v1/pip/${gtin}/${currency}`,
      {},
      Gtin.basePath
    )
  }
}
