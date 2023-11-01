import { FactorCreateCommand } from './types'

const nock = require('nock')
const TaakSDK = require('../../dist')

describe('mFactor resource', () => {
  test('createFactor must return a new created factor', async () => {
    const cmd: FactorCreateCommand = {
      appPublicId: '7e100ffc-78cf-43cd-b320-31e462f09bf1',
      currency: 'IRR',
      total: 1000000,
      factorDate: new Date().toISOString(),
      payer: 'John Doe',
      items: [
        {
          name: 'Startup support plan',
          nameFa: 'طرح پشتیبانی نوپا',
          price: 1000000,
          quantity: 1,
        },
      ],
    }
    const scope = nock('https://mfactor.taakcloud.com')
      .post('/api/v1/factor/create', cmd)
      .reply(200, {})

    // Make the request
    const TaakSdkClient = new TaakSDK({ apiKey: 'XYZ' })
    await TaakSdkClient.createFactor(cmd)

    // Assert that the expected request was made.
    scope.done()
  })
})
