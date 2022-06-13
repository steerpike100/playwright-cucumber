import {BeforeAll, Before, AfterAll, After} from "@cucumber/cucumber";
const {chromium} = require("playwright");

BeforeAll(async() => {
    global.browser = await chromium.launch({
        headless: false,
    });
});

AfterAll(async ()=>{
    await global.browser.close();
});

Before(async(scenario)=>{
    global.context = await global.browser.newContext(); //an isolated incognito type session within a browser instance - run each test scenario in its own browser context
    global.context = await global.browser.newContext({
        recordVideo: {
            dir: './reports/videos/' + scenario.pickle.name,

        }
    })
    global.page = await global.context.newPage(); //a page refers to a single tab or pop up window within a browser context
})

After(async(scenario)=>{
    const scenarioStatus = scenario.result?.status;
    if(scenarioStatus === 'FAILED'){
        await global.page.screenshot({
            path: `./reports/screenshots/${scenario.pickle.name}.png`
        })
    }
    await global.page.close();
})