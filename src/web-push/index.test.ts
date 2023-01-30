import { WebPushSendCommand, WebPushSubscribeCommand } from "./types"

const nock = require('nock')
const TaakSDK = require('../../dist')

describe('WebPush resource', () => {
  test('getWebPushByUserId returns a list of WebPush subscriptions', async () => {
    const scope = nock('https://app-api.taakcloud.com')
      .get('/v1/web-push/user-id-001')
      .reply(200, [{ publicId: 'dfd0b610-c340-4452-a04d-48912448bbb4', userId: 'user-id-001', deviceId: 'Mac OS::Safari::16', appId: '23183417-0bf8-46fc-bcf7-ffe628d6833f' }])

    // Make the request
    const TaakSdkClient = new TaakSDK({ apiKey: 'XYZ' })
    await TaakSdkClient.getWebPushesByUserId('user-id-001')

    // Assert that the expected request was made.
    scope.done()
  })

  test('subscribeWebPush returns subscribed web push', async () => {
    const cmd: WebPushSubscribeCommand = {
      endpoint: 'https://web.push.apple.com/QKP3aIAwuuV7UwYA-7wxLuwe12qX16qOVqRZMoUkZCXbh8adtnaTBdBFFeJK6_-Gt9_L8WBNTZP81Cm2myfTWuqBMk7XJsN97gyiv61O4PzZFLvoftQr5kelbm_zQ3cJU0X4JbgY3Y2Dp7LBM5PusXtfGpDyXypEc-SPO6TsnqM',
      key: 'BCmZsgXRgQS33iVrPVy7-byN6A9ca4SbOAYL95jAaSis4NP6dZ0zhNEVeifrVRPDkGo4-elH8ndgpPiPvibQ9pi',
      auth: 'JY8CftVFEHwBmWhZQRqAbB',
      userId: 'user-id-001',
      deviceId: 'Mac OS::Safari::16',
    }
    const scope = nock('https://app-api.taakcloud.com')
      .post('/v1/web-push/subscribe', cmd).reply(201, { publicId: 'dfd0b610-c340-4452-a04d-48912448bbb4', userId: 'user-id-001', deviceId: 'Mac OS::Safari::16', appId: '23183417-0bf8-46fc-bcf7-ffe628d6833f' })

    const TaakSdkClient = new TaakSDK({ apiKey: 'XYZ' })
    await TaakSdkClient.subscribeWebPush(cmd)
    scope.done()
  })

  test('sendWebPush returns status code of upstream push server', async () => {
    const cmd: WebPushSendCommand = {
      payload: 'Hello, World',
      userId: 'user-id-001',
      deviceId: 'Mac OS::Safari::16',
    }
    const scope = nock('https://app-api.taakcloud.com')
      .post('/v1/web-push/send', cmd)
      .reply(201, {})

    const TaakSdkClient = new TaakSDK({ apiKey: 'XYZ' })
    await TaakSdkClient.sendWebPush(cmd)
    scope.done()
  })

  test('defaultWebPushServerPublicKey', async () => {
    expect(TaakSDK.DEFAULT_WEB_PUSH_SERVER_PUBLIC_KEY).toBe('BBE1u0MfUE82cyodMmjmJlC1cynxKmvDSE0oMdcJN73gAcGp4pdS6ClF9j40mv7NaqOXexbZ-GdjHyGUJ1E4g9s')
  })

  test('deleteWebPush returns status code 204 if success', async () => {
    const publicId = 'dfd0b610-c340-4452-a04d-48912448bbb4'
    const scope = nock('https://app-api.taakcloud.com')
      .delete('/v1/web-push/' + publicId)
      .reply(204, {})

    const TaakSdkClient = new TaakSDK({ apiKey: 'XYZ' })
    await TaakSdkClient.deleteWebPush(publicId)
    scope.done()
  })

  test('urlBase64ToUint8Array', async () => {
    const TaakSdkClient = new TaakSDK({ apiKey: 'XYZ' })
    const key = TaakSDK.DEFAULT_WEB_PUSH_SERVER_PUBLIC_KEY
    const encoded = Buffer.from(key).toString('base64')
    const decoded = Buffer.from(encoded, 'base64').toString('ascii')
    expect(decoded).toBe(key)

    const arr = TaakSdkClient.urlBase64ToUint8Array(key)
    expect(Buffer.from(arr).toString('base64')).toBe("BBE1O0MfUE82cyodMmhmJlA1cylxKmtDSE0oMVcJNz1gAUEpYhdSaClFdj40Gn5NaiMXexZZeGdjHyEUJ1E4A1s=")

  })

})