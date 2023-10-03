import { Response as NodeResponse } from 'node-fetch'
import fetch from 'isomorphic-unfetch'
import { TaakResponse } from './taak-response'

export type Config = {
  apiKey: string
  basePath?: string
  debug?: boolean
}

export abstract class Base {
  private apiKey: string
  private basePath: string
  private debug: boolean

  constructor(config: Config) {
    this.apiKey = config.apiKey
    this.basePath = config.basePath
    this.debug = config.debug || false
  }

  protected request<T>(
    endpoint: string,
    options?: RequestInit,
    basePath?: string
  ): Promise<TaakResponse> {
    const url = (basePath ? basePath : this.basePath) + endpoint
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
}
