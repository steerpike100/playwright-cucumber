import {Given} from '@cucumber/cucumber'
import {ScenarioWorld} from './setup/world'
import {logger} from '../logger'
import {MockConfigKey, MockPayloadKey, MockServerKey} from "../env/global";
import {interceptResponse} from "../support/mock-behaviour";

Given(
    /^the "([^"]*)" endpoint for "([^"]*)" is mocked with "([^"]*)"$/,
    async function(this:ScenarioWorld, mockServerKey: MockServerKey, mockConfigKey: MockConfigKey, mockPayloadKey: MockPayloadKey) {
        const {
            screen: {page},
            globalConfig,
        } = this

        logger.log(`the ${mockServerKey} endpoint for ${mockConfigKey} is mocked with ${mockPayloadKey}`)

        await interceptResponse(page, mockServerKey, mockConfigKey, mockPayloadKey, globalConfig)
    }
)