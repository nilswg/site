//@ts-check
/**
 * ### Resume PDF 產生器
 * 
 * 先執行 genPDF 產生 PDF 檔案
 * 再執行 encrypt 加密 PDF 檔案
 */

import { genPDF } from "./lib/genPDF.mjs";
import { encrypt } from "./lib/qpdf.mjs";


; (async function () {
    ['zh-TW', ''].forEach(async (lang) => {
        const url = `http://localhost:4321/${lang ? lang + '/' : '/'}resume/print`
        const filePath = `./out/resume_${lang ? lang : 'en'}.pdf`;
        const encryptedFilePath = `../public/pdf/resume_${lang ? lang : 'en'}.pdf`;
        const encryptPassword = '0988572252';

        await genPDF(url, filePath)
        await encrypt(filePath, encryptedFilePath, encryptPassword)
        console.log('done!')
    })
})()

