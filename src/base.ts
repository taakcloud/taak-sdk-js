import { Response as NodeResponse } from 'node-fetch'
import fetch from 'isomorphic-unfetch'
import { TaakResponse } from './taak-response'

export type Config = {
  apiKey: string
  appHost?: string
  gtinHost?: string
  mfactorHost?: string
  basePath?: string
  debug?: boolean
  local?: boolean // For development use only, default is false
}

export abstract class Base {
  private apiKey: string
  private appHost = 'https://app-api.taakcloud.com'
  private gtinHost = 'https://gtin.taakcloud.com'
  private mfactorHost = 'https://mfactor.taakcloud.com'
  private basePath: string
  private debug: boolean
  private local: boolean

  constructor(config: Config) {
    this.apiKey = config.apiKey
    this.appHost = config.appHost || this.appHost
    this.gtinHost = config.gtinHost || this.gtinHost
    this.mfactorHost = config.mfactorHost || this.mfactorHost
    this.basePath = config.basePath
    this.debug = config.debug || false
    this.local = config.local || false
  }

  protected request<T>(
    endpoint: string,
    options?: RequestInit,
    basePath?: string
  ): Promise<TaakResponse> {
    let actualBasePath = null
    if (this.local) {
      actualBasePath = this.lookupLocalPath(basePath ? basePath : this.basePath)
    } else {
      actualBasePath = basePath ? basePath : this.basePath
    }
    const url = actualBasePath + endpoint
    if (this.debug) console.log('URL:', url)
    const headers = {
      'X-TAAK-API-KEY': this.apiKey,
      'Content-type': 'application/json',
    }
    const config = {
      ...options,
      headers,
    }
    return fetch(url, config)
      .then(async (r: NodeResponse) => {
        if (this.debug) console.log('RESPONSE:', r)
        try {
          const data: T = await r.json()
          return { status: r.status, data }
        } catch (error) {
          return { status: r.status, error: error?.message }
        }
      })
      .catch((error: any) => {
        return { status: 0, error: error?.message }
      })
  }

  protected appRequest<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<TaakResponse> {
    return this.request(endpoint, options, this.appHost)
  }

  protected gtinRequest<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<TaakResponse> {
    return this.request(endpoint, options, this.gtinHost)
  }

  protected mfactorRequest<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<TaakResponse> {
    return this.request(endpoint, options, this.mfactorHost)
  }

  private lookupLocalPath = (remotePath: string) => {
    switch(remotePath) {
      case 'https://app-api.taakcloud.com':
        return 'http://localhost:8080'
      case 'https://gtin.taakcloud.com':
        return 'http://localhost:8091'
      case 'https://mfactor.taakcloud.com':
        return 'http://localhost:8092'
      default:
        throw new Error(`No local path found for ${remotePath}`)
    }
  }

}
