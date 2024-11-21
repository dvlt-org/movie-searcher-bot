const puppeteer = require("puppeteer");

async function getUrls(pageUrl) {
    try {
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        await page.goto(pageUrl, { waitUntil: 'domcontentloaded' }); // Sahifa to'liq yuklanguncha kutish

        // Sahifa elementlari to'liq yuklangani va mavjudligini kutish
        await page.waitForSelector(".downlist-inner a");
        await page.waitForSelector(".img-fit");
        await page.waitForSelector("header .title");

        const urls = await page.evaluate(() => {
            const elements = document.querySelectorAll(".downlist-inner a");
            const coverImage = document.querySelector(".img-fit");
            const movieName = document.querySelector("header .title").textContent;

            // URL ro'yxatini olish, birinchi elementni chiqarish, qolganlarini olish
            return [...Array.from(elements).map((item, index) => index === 0 ? null : item.href).filter(Boolean), coverImage.src, movieName];
        });

        console.log(urls);
        await browser.close();
        return urls;
    } catch (error) {
        return "Malumotni olib bo'lmadi"
    }
}

module.exports = getUrls;
