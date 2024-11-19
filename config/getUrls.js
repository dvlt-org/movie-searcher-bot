const puppeteer = require("puppeteer")

async function getUrls(pageUrl) {
    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto(pageUrl)

        const urls = await page.evaluate(() => {
            const elements = document.querySelectorAll(".downlist-inner a")
            const coverImage = document.querySelector(".img-fit")
            const movieName = document.querySelector("header .title").textContent
            return [...Array.from(elements).map((item, index) => index === 0 ? null : item.href).filter(Boolean), coverImage.src, movieName]
        })
        console.log(urls)
        await browser.close()
        return urls
    } catch (error) {
        console.log("Kechirasiz malumotni o'qib bo'lmadi")
        return "There's wrong !"
    }
}

module.exports = getUrls;