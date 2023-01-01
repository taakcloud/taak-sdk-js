
export type WebPushDTO = {
  publicId: string,
  userId: string,
  deviceId: string,
  appId: string,
  createdAt: string,
}

export type WebPushSubscribeCommand = {
  userId: string,
  deviceId: string,
  endpoint: string,
  key: string,
  auth: string,
}

export enum Urgency {
  VERY_LOW,
  LOW,
  NORMAL,
  HIGH,
}

export type WebPushSendCommand = {
  payload: string
  publicId?: string
  userId?: string
  deviceId?: string
  urgency?: Urgency
  topic?: string
  timeToLive?: number // default 30 days
}