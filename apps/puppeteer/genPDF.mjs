// @ts-check

import path from 'path'
// const { launch } = require('puppeteer')
import { launch } from 'puppeteer'


/**
 * genPDF
 * url  ex: http://localhost:3000/
 * path ex: './myfile.pdf'
 *
 * @param {string} url
 * @param {string} filePath
 */
async function genPDF(url, filePath) {
  filePath = path.join(process.cwd(), filePath)
  console.log('Generating PDF...\n')
  console.log('Your PDF will be saved at:\n', filePath)
  try {
    const browser = await launch({ headless: true, args: ['--no-sandbox',] })
    const page = await browser.newPage()

    await page.setViewport({ width: 794, height: 1122, deviceScaleFactor: 2 })

    await page.goto(url, {
      waitUntil: 'networkidle0',
    })

    await page.emulateMediaType('screen')

    await page.evaluate(() => {
      document.querySelector("header")?.remove()
      document.querySelector("footer")?.remove()
      document.querySelector("#pageloader")?.remove()
      document.querySelector("#toasts")?.remove()
      document.querySelector("#resume-download-btn")?.remove()
    })

    await page.pdf({
      path: filePath,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      margin: {},
    })

    await browser.close()
    console.log('PDF generated successfully\n')
    return
  } catch (e) {
    throw e
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  genPDF('http://localhost:4321/resume/print', './document.pdf')
}

export { genPDF }