import { AppBase } from '../app-base'
import { TaakResponse } from '../taak-response'
import {
  FactorCreateCommand,
  FactorDTO,
  ObtainTokenCommand,
  TokenDTO,
} from './types'

export class mFactor extends AppBase {
  createFactor(command: FactorCreateCommand): Promise<TaakResponse> {
    return this.mfactorRequest<FactorDTO>(
      '/api/v1/factor/create',
      {
        method: 'POST',
        body: JSON.stringify(command),
      },
    )
  }

  getFactor(publicId: string): Promise<TaakResponse> {
    return this.mfactorRequest<FactorDTO>(
      `/api/v1/factor/${publicId}`,
      {},
    )
  }

  ipgObtainToken(command: ObtainTokenCommand): Promise<TaakResponse> {
    return this.mfactorRequest<TokenDTO>(
      '/api/v1/ipg/token',
      {
        method: 'POST',
        body: JSON.stringify(command),
      },
    )
  }
}
