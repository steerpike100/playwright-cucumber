import {Then} from '@cucumber/cucumber'
import {getElementLocator} from '../../support/web-element-helper'
import {ScenarioWorld} from "../setup/world";
import {waitFor} from '../../support/wait-for-behaviour'
import { ElementKey } from '../../env/global';

Then(
    /^the "([^"]*)" should contain the text "(.*)"$/,
    async function (this: ScenarioWorld, elementKey: string, expectedElementText: string) {

        const {
            screen: {page},
            globalConfig,

        } = this;

        console.log(`the ${elementKey} header should contain the text ${expectedElementText}`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const elementText = await page.textContent(elementIdentifier)
            return elementText?.includes(expectedElementText)
        })

    }
)

Then(
    /^the "([^"]*)" should equal the text "(.*)"$/,
    async function(this: ScenarioWorld,elementKey:ElementKey, expectedElementText:string) {
        const {
            screen: {page},
            globalConfig,
        } = this;
        console.log(`the ${elementKey} should  equal the text ${expectedElementText}`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async()=>{
            const elementText = await page.textContent(elementIdentifier)
            return (elementText === expectedElementText)
        })
    }
);

