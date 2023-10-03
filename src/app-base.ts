import { Base, Config } from './base'

export class AppBase extends Base {
  constructor(config: Config) {
    config.basePath = config.basePath || 'https://app-api.taakcloud.com'
    super(config)
  }
}
