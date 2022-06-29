import {Then} from '@cucumber/cucumber'
import {getElementLocator} from '../../support/web-element-helper'
import {ScenarioWorld} from "../setup/world";
import {waitFor} from '../../support/wait-for-behaviour'

Then(
    /^the "([^"]*)" should be displayed$/,
    async function (this: ScenarioWorld, elementKey: string) {

        const {
            screen: {page},
            globalConfig,

        } = this;


        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const isElementVisible = (await page.$(elementIdentifier)) != null
            return isElementVisible
        })
    }
)