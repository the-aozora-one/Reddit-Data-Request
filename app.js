#!/usr/bin/node

require('dotenv').config()
const puppeteer = require('puppeteer');

(async () => {
    const DATA_REQUEST_URL = `https://reddit.com/settings/data-request`

    // Open in headless 
    const browser = await puppeteer.launch({
        headless: ['dev', 'development', 'test', 'testing'].includes(process.env.NODE_ENV)
            ? false
            : 'new',
    })

    // Create a new page
    const page = await browser.newPage()

    // Go to the data request URL
    await page.goto(DATA_REQUEST_URL)

    if (page.url().includes(`reddit.com/login`)) {
        const KEYBOARD_DELAY = 50

        // Enter the username
        const usernameSelector = `#loginUsername`
        await page.waitForSelector(usernameSelector)
        await page.evaluate(() => {
            document.querySelector(`#loginUsername`).value = ''
        })
        await page.focus(usernameSelector)
        await page.keyboard.type(process.env.USER, {
            delay: KEYBOARD_DELAY,
        })

        // Enter the password
        const passwordSelector = `#loginPassword`
        await page.waitForSelector(passwordSelector)
        await page.evaluate(() => {
            document.querySelector(`#loginPassword`).value = ''
        })
        await page.focus(passwordSelector)
        await page.keyboard.type(process.env.PASSWORD, {
            delay: KEYBOARD_DELAY,
        })

        await Promise.all([
            page.keyboard.press('Enter'), // Submit the form
            page.waitForNavigation(), // Wait for the page to navigate
        ])

        if (page.url().includes(`reddit.com/login`)) {
            // The login failed or 2FA is enabled. We can no longer automate this so exit
            console.error(`[ERROR] Login Failed. Exiting`)
            process.exit(1)
        }
    }

    if (!page.url().includes(`reddit.com/settings/data-request`)) {
        // We're not at the right page so navigate to it
        await page.goto(DATA_REQUEST_URL)
    }

    // Wait for the selections to be available
    const privacySelector = `div[aria-label="privacyLaws"] input[type="hidden"]`
    await page.waitForSelector(privacySelector)
    // Select the privacy option
    const optionSelector = `#AppRouter-main-content > div > div > form > fieldset:nth-child(4) > div > div:nth-child(2)`
    await page.click(optionSelector)
    // Select the at all times daterange
    const dateRangeSelector = `#AppRouter-main-content > div > div > form > fieldset._1f1KdpokD5JaT48H_OHcMB > div > div:nth-child(3)`
    await page.click(dateRangeSelector)
    // Submit the request
    const submitSelector = `#AppRouter-main-content > div > div > form > fieldset._11wnCqLRJitVdVSzlf5PcV > button`
    await page.click(submitSelector)

    // We done. Shut it down
    process.exit(0)
})()