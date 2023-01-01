import { AppBase } from "./app-base";
import { applyMixins } from "./utils";
import { WebPush } from "./web-push";

class TaakSDK extends AppBase {
  static readonly DEFAULT_WEB_PUSH_SERVER_PUBLIC_KEY = 'BBE1u0MfUE82cyodMmjmJlC1cynxKmvDSE0oMdcJN73gAcGp4pdS6ClF9j40mv7NaqOXexbZ-GdjHyGUJ1E4g9s'
}
interface TaakSDK extends WebPush {}
applyMixins(TaakSDK, [WebPush])

export default TaakSDK