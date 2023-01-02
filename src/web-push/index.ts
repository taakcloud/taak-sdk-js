import { AppBase } from "../app-base"
import { TaakResponse } from '../taak-response'
import { WebPushDTO, WebPushSendCommand, WebPushSubscribeCommand } from "./types"

const resourcePath = '/v1/web-push'

export class WebPush extends AppBase {

  subscribeWebPush(command: WebPushSubscribeCommand): Promise<TaakResponse> {
    return this.request<WebPushDTO>(resourcePath + '/subscribe', {
      method: 'POST',
      body: JSON.stringify(command),
    })
  }

  getWebPushesByUserId(userId: string): Promise<TaakResponse> {
    return this.request<WebPushDTO[]>(`${resourcePath}/${userId}`)
  }

  sendWebPush(command: WebPushSendCommand): Promise<TaakResponse> {
    return this.request<void>(resourcePath + '/send', {
      method: 'POST',
      body: JSON.stringify(command),
    })
  }

}