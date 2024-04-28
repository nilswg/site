// @ts-check

/**
 * 所使用的加密技術是 linux - qpdf 命令
 * 必須先安裝此命令到環境中: sudo apt-get install qpdf -y
 */

// const path = require('path')
// const { exec } = require('child_process')
import path from 'path'
import { exec } from 'child_process'

/**
 * decrypt
 * @param {string} src
 * @param {string} dist
 * @param {string} password
 * @returns
 */
function decrypt(src, dist, password) {
  console.log('Decrypting PDF...\n')
  src = path.join(process.cwd(), src)
  dist = path.join(process.cwd(), dist)
  console.log('Your decrypted PDF will be saved at:\n', dist + '\n')
  try {
    const cmd = `qpdf --password=${password} --decrypt ${src} ${dist}`
    return execShellCommand(cmd)
  } catch (error) {
    console.error('請確認是否已安裝 qpdf 工具')
  }
}

/**
 * encrypt
 * @param {string} src
 * @param {string} dist
 * @param {string} password
 * @returns
 */
function encrypt(src, dist, password) {
  console.log('Encrypting PDF...\n')
  src = path.join(process.cwd(), src)
  dist = path.join(process.cwd(), dist)
  console.log('Your encrypted PDF will be saved at:\n', dist + '\n')
  try {
    if (src === dist) {
      dist = dist.split('.pdf')[0]
      dist += '_encryped.pdf'
    }
    const cmd = `qpdf --encrypt ${password} ${password} 256 -- ${src} ${dist}`
    return execShellCommand(cmd)
  } catch (error) {
    console.error('請確認是否已安裝 qpdf 工具')
  }
}

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) throw error
      resolve(stdout ? stdout : stderr)
    })
  })
}

if (import.meta.url === `file://${process.argv[1]}`) {
  ; (async () => {
    try {
      await encrypt('document.pdf', 'document_encrypted.pdf', '0988572252')
      console.log('encrypt successfully.')
    } catch (e) {
      throw e;
    }
  })()
}

export { encrypt, decrypt }