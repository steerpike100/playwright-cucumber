import {Then} from '@cucumber/cucumber'
import {ElementKey} from '../../env/global';
import {
    getValue,
    getAttributeText, getElementText
} from '../../support/html-behaviour'
import {ScenarioWorld} from '../setup/world';
import {getElementLocator} from "../../support/web-element-helper";
import {waitFor, waitForSelector} from '../../support/wait-for-behaviour';
import {logger} from "../../logger";

Then(
    /^the "([^"]*)" should( not)? contain the text "(.*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
        const {
            screen: {page},
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} should ${negate ? 'not' : ''} contain the text ${expectedElementText}`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {

            const elementStable = await getElementText(page, elementIdentifier)

            if(elementStable) {

                const elementText = await page.textContent(elementIdentifier)
                logger.debug("elementText ", elementText)
                logger.debug("expectedElementText ", expectedElementText)
                return elementText?.includes(expectedElementText) === !negate;
            }else{
                return elementStable
            }
        });

    }
)

Then(
    /^the "([^"]*)" should( not)? equal the text "(.*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, expectedElementText: string) {
        const {
            screen: {page},
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} should ${negate ? 'not' : ''}equal the text ${expectedElementText}`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const elementText = await page.textContent(elementIdentifier)
            return (elementText === expectedElementText) === !negate
        })
    }
);

Then(
    /^the "([^"]*)" should( not)? contain the value "(.*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, elementValue: string) {
        const {
            screen: {page},
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} should ${negate ? 'not' : ''}contain the value ${elementValue}`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const elementAttribute = await getValue(page, elementIdentifier)
            return elementAttribute?.includes(elementValue) === !negate;
        })
    }
)

Then(
    /^the "([^"]*)" should( not)? equal the value "(.*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, elementValue: string) {
        const {
            screen: {page},
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} should ${negate ? 'not' : ''}equal the value ${elementValue}`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const elementAttribute = await getValue(page, elementIdentifier)
            return (elementAttribute === elementValue) === !negate;
        })

    }
)

Then(
    /^the "([^"]*)" should( not)? be enabled$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
        const {
            screen: {page},
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} should ${negate ? 'not' : ''}be enabled`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const isElementEnabled = await page.isEnabled(elementIdentifier)
            return isElementEnabled === !negate;
        })
    }
)

Then(
    /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" should( not)? contain the text "(.*)"$/,
    async function (
        elementPosition: string,
        elementKey: ElementKey,
        negate: boolean,
        expectedElementText: string
    ) {
        const {
            screen: {page},
            globalConfig,
        } = this;

        logger.log(
            `the ${elementPosition} ${elementKey} should ${negate ? 'not ' : ''}contain the text ${expectedElementText}`
        );

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
        const index = Number(elementPosition.match(/\d/g)?.join('')) - 1;

        await waitFor(async () => {
            const elementText = await page.textContent(`${elementIdentifier}>>nth=${index}`);
            return elementText?.includes(expectedElementText) === !negate;
        });
    }
);

Then(
    /^the "([^"]*)" "([^"]*)" attribute should( not)? contain the text "(.*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, attribute: string, negate: boolean, expectedElementText: string) {
        const {
            screen: {page},
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} ${attribute} attribute should ${negate ? 'not ' : ''}contain the text ${expectedElementText}`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);

        await waitFor(async () => {
            const attributeText = await getAttributeText(page, elementIdentifier, attribute)
            return attributeText?.includes(expectedElementText) === !negate;
        });
    }
);
