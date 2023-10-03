import { AppBase } from '../app-base'
import { TaakResponse } from '../taak-response'
import {
  FactorCreateCommand,
  FactorDTO,
  ObtainTokenCommand,
  TokenDTO,
} from './types'

export class mFactor extends AppBase {
  public static readonly basePath = 'https://mfactor.ir'
  createFactor(command: FactorCreateCommand): Promise<TaakResponse> {
    return this.request<FactorDTO>(
      '/api/v1/factor/create',
      {
        method: 'POST',
        body: JSON.stringify(command),
      },
      mFactor.basePath
    )
  }

  getFactor(publicId: string): Promise<TaakResponse> {
    return this.request<FactorDTO>(
      `/api/v1/factor/${publicId}`,
      {},
      mFactor.basePath
    )
  }

  ipgObtainToken(command: ObtainTokenCommand): Promise<TaakResponse> {
    return this.request<TokenDTO>(
      '/api/v1/ipg/token',
      {
        method: 'POST',
        body: JSON.stringify(command),
      },
      mFactor.basePath
    )
  }
}
