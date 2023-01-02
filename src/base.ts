import { Response as NodeResponse } from 'node-fetch'
import fetch from 'isomorphic-unfetch'
import { TaakResponse } from './taak-response'

export type Config = {
  apiKey: string
  basePath?: string
}

export abstract class Base {
  private apiKey: string
  private basePath: string

  constructor(config: Config) {
    this.apiKey = config.apiKey
    this.basePath = config.basePath
  }

  protected request<T>(endpoint: string, options?: RequestInit): Promise<TaakResponse> {
    const url = this.basePath + endpoint
    const headers = {
      'X-TAAK-API-KEY': this.apiKey,
      'Content-type': 'application/json'
    }
    const config = {
      ...options,
      headers,
    }
    return fetch(url, config).then(async (r: NodeResponse) => {
      try {
        const data: T = await r.json()
        return { status: r.status, data }
      } catch (error) {
        return { status: r.status, error: error?.message }
      }
    }).catch((error: any) => {
      return { status: 0, error: error?.message }
    })
  }

}