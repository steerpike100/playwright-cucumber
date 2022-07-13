import {When, DataTable} from '@cucumber/cucumber';
import {ScenarioWorld} from '../setup/world';
import {getElementLocator} from '../../support/web-element-helper';
import {ElementKey} from '../../env/global';
import {waitFor} from "../../support/wait-for-behaviour";
import { logger } from '../../logger';

When(
    /^the "([^"]*)" table should( not)? equal the following:$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean, dataTable: DataTable) {
        const {
            screen: {page},
            globalConfig,
        } = this;

        logger.log(`the ${elementKey} table should ${negate ? 'not ' : ''}equal the following:`);

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig);
        logger.log(elementIdentifier + " tbody tr");

        await waitFor(async () => {
            const dataBefore = await page.$$eval(elementIdentifier + " tbody tr", (rows) => {
                return rows.map(row => {
                    const cells = row.querySelectorAll('td');
                    return Array.from(cells).map(cell => cell.textContent)
                })
            })
            return JSON.stringify(dataBefore) === JSON.stringify(dataTable.raw()) === !negate;
        });

    }
);
