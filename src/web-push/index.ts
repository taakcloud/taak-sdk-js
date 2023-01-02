import { Response as NodeResponse } from 'node-fetch'
import { AppBase } from "../app-base"
import { TaakResponse } from '../taak-response'
import { WebPushDTO, WebPushSendCommand, WebPushSubscribeCommand } from "./types"

const resourcePath = '/v1/web-push'

export class WebPush extends AppBase {

  subscribeWebPush(command: WebPushSubscribeCommand): Promise<TaakResponse> {
    return this.request<WebPushDTO>(resourcePath + '/subscribe', {
      method: 'POST',
      body: JSON.stringify(command),
    }).then((res: NodeResponse) => {
      return { status: res.status, data: res.json() }
    }).catch((error) => {
      console.log('TAAK:subscribeWebPush:', error)
      return { status: 500, error }
    })
  }

  getWebPushesByUserId(userId: string): Promise<TaakResponse> {
    return this.request<WebPushDTO[]>(`${resourcePath}/${userId}`)
      .then((res: NodeResponse) => {
        return { status: res.status, data: res.json() }
      }).catch((error) => {
        console.log('TAAK:getWebPushesByUserId:', error)
        return { status: 500, error }
      })
  }

  sendWebPush(command: WebPushSendCommand): Promise<TaakResponse> {
    return this.request<void>(resourcePath + '/send', {
      method: 'POST',
      body: JSON.stringify(command),
    })
      .then((res: NodeResponse) => {
        return { status: res.status, data: res.json() }
      }).catch((error) => {
        console.log('TAAK:sendWebPush:', error)
        return { status: 500, error }
      })
  }

}