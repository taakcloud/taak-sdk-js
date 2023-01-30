import { Buffer } from 'buffer'
import { AppBase } from "../app-base"
import { TaakResponse } from '../taak-response'
import { WebPushDTO, WebPushSendCommand, WebPushSubscribeCommand } from "./types"

const resourcePath = '/v1/web-push'

export class WebPush extends AppBase {

  static readonly DEFAULT_WEB_PUSH_SERVER_PUBLIC_KEY = 'BBE1u0MfUE82cyodMmjmJlC1cynxKmvDSE0oMdcJN73gAcGp4pdS6ClF9j40mv7NaqOXexbZ-GdjHyGUJ1E4g9s'

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

  deleteWebPush(publicId: string): Promise<TaakResponse> {
    return this.request<void>(`${resourcePath}/${publicId}`, {
      method: 'DELETE',
    })
  }

  async checkIfSubscribed(debug?: boolean): Promise<TaakResponse> {
    return new Promise(function (resolve, reject) {
      navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription().then(function (subscription: PushSubscription | null) {
          if (!!subscription) {
            resolve({ status: 0, data: subscription })
          } else {
            return serviceWorkerRegistration.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: WebPush.urlBase64ToUint8Array(WebPush.DEFAULT_WEB_PUSH_SERVER_PUBLIC_KEY),
              }).then(function (subscription: PushSubscription) {
                if (!!subscription)
                  resolve({ status: 0, data: subscription })
                else
                  resolve({ status: 4, error: 'Subscription is undefined'})
              }).catch(function (e) {
                if (debug)
                  console.log('Error', e)
                if (Notification.permission === 'denied') {
                  resolve({ status: 2, error: 'Permission for Notifications was denied' })
                } else {
                  resolve({ status: 3, error: 'Unable to subscribe' })
                }
              })
          }
        }).catch(function (err) {
          if (debug)
            console.log('Error', err)
          resolve({ status: 1, error: 'Error on getSubscription' })
        })
      })
    })
  }

  async checkIfPermissionGiven(debug?: boolean): Promise<TaakResponse> {
    if (navigator.permissions) {
      return navigator.permissions
      .query({ name: 'notifications' })
      .then((res) => {
        if (debug)
          console.log('push notification permission', res.state)
        if (res?.state !== 'granted') {
          return this.askForPermission()
        } else {
          return { status: 0, data: 'granted' }
        }
      })
      .catch((err) => {
        if (debug)
          console.log('push notification permission check failure', err)
        return this.askForPermission()
      })
    } else {
      return { status: 1, error: 'navigator.permissions not supported' }
    }
  }

  private async askForPermission(debug?: boolean): Promise<TaakResponse> {
    return new Promise(function (resolve, reject) {
      const permissionResult = Promise.resolve(Notification.requestPermission())
      if (permissionResult) {
        permissionResult.then(resolve, reject)
      }
    }).then(function (permissionResult) {
      if (debug)
        console.log('PermissionResult is', permissionResult)
      return { status: permissionResult === 'granted' ? 0 : 2, data: permissionResult }
    })
  }

  private static urlBase64ToUint8Array(base64String?: string) {
    if (!base64String) return
    var padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

    var rawData = Buffer.from(base64, 'base64').toString('ascii')
    var outputArray = new Uint8Array(rawData.length)

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

}