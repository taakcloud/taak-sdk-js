import { AppBase } from "../app-base"
import { WebPushDTO, WebPushSendCommand, WebPushSubscribeCommand } from "./types"

const resourcePath = '/v1/web-push'

export class WebPush extends AppBase {

  subscribeWebPush(command: WebPushSubscribeCommand) {
    return this.request<WebPushDTO>(resourcePath + '/subscribe', {
      method: 'POST',
      body: JSON.stringify(command),
    })
  }

  getWebPushesByUserId(userId: string) {
    return this.request<WebPushDTO[]>(`${resourcePath}/${userId}`)
  }

  sendWebPush(command: WebPushSendCommand) {
    return this.request<void>(resourcePath + '/send', {
      method: 'POST',
      body: JSON.stringify(command),
    })
  }

}