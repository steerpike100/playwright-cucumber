import {Page} from 'playwright'
import {
    GlobalConfig,
    MockConfigKey,
    MockServerKey,
    MockPayloadKey
} from '../env/global'

export const interceptResponse = async (
    page: Page,
    mockServerKey: MockServerKey,
    mockConfigKey: MockConfigKey,
    mockPayloadKey: MockPayloadKey,
    {hostsConfig, mocksConfig, mockPayloadMappings}: GlobalConfig
): Promise<void> => {
    const mockServerHostUrl = hostsConfig[mockServerKey]
    const mockServerRoute = mocksConfig[mockConfigKey]
    const mockServerPayload = mockPayloadMappings[mockPayloadKey]

    if (!mockServerPayload) {
        throw Error(`🧨 Unable to find the ${mockPayloadKey} payload json file 🧨`)
    }

        await page.route(`${mockServerHostUrl}${mockServerRoute}`, (route) =>
        route.fulfill({
            contentType:'application/json',
            body:JSON.stringify(mockServerPayload)
        }))
}