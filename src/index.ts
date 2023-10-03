import { AppBase } from './app-base'
import { Gtin } from './gtin'
import { mFactor } from './mfactor'
import { applyMixins } from './utils'
import { WebPush } from './web-push'

class TaakSDK extends AppBase {
  static readonly DEFAULT_WEB_PUSH_SERVER_PUBLIC_KEY =
    WebPush.DEFAULT_WEB_PUSH_SERVER_PUBLIC_KEY
}
interface TaakSDK extends WebPush, mFactor, Gtin {}
applyMixins(TaakSDK, [WebPush, mFactor, Gtin])

export default TaakSDK
