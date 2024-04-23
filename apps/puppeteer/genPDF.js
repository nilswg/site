// @ts-check

const path = require('path')
const { launch } = require('puppeteer')

/**
 * genPDF
 * url  ex: http://localhost:3000/
 * path ex: './myfile.pdf'
 *
 * @param {string} url
 * @param {string} path
 */
async function genPDF(url, path) {
  console.log('url', url)
  console.log('path', path)
  try {
    const browser = await launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()

    await page.setViewport({ width: 794, height: 1122, deviceScaleFactor: 2 })

    await page.goto(url, {
      waitUntil: 'networkidle0',
    })

    await page.emulateMediaType('screen')

    // remove header
    await page.evaluate(`
      document.querySelector("header").remove()
    `)

    await page.evaluate(`
      document.querySelector("footer").remove()
    `)

    await page.evaluate(`
      document.querySelector("#pageloader").remove()
    `)

    await page.pdf({
      path: path,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      margin: {},
    })

    console.log('done')
    await browser.close()
    // process.exit()
    return
  } catch (e) {
    throw e
  }
}

if (require.main === module) {
  genPDF(
    'http://localhost:3000/resume/print',
    path.join(__dirname, './document.pdf')
  )
}

module.exports = { genPDF }
