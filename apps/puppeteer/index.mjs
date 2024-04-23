//@ts-check
/**
 * 先執行 genPDF 產生 PDF 檔案
 * 再執行 encrypt 加密 PDF 檔案
 */

import { genPDF } from "./genPDF.mjs";
import { encrypt } from "./qpdf.mjs";

const url = 'http://localhost:4321/resume/print';
const filePath = './out/document.pdf';
const encryptedFilePath = './out/resume.pdf';
const encryptPassword = '0988572252';

; (async function () {
    await genPDF(url, filePath)
    await encrypt(filePath, encryptedFilePath, encryptPassword)
    console.log('done!')
})()

