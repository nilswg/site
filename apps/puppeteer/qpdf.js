// @ts-check

/**
 * 所使用的加密技術是 linux - qpdf 命令
 * 必須先安裝此命令到環境中: sudo apt-get install qpdf -y
 */

const path = require('path')
const { exec } = require('child_process')

/**
 * decrypt
 * @param {string} src
 * @param {string} dist
 * @param {string} password
 * @returns
 */
function decrypt(src, dist, password) {
  const cmd = `qpdf --password=${password} --decrypt ${src} ${dist}`
  return execShellCommand(cmd)
}

/**
 * encrypt
 * @param {string} src
 * @param {string} dist
 * @param {string} password
 * @returns
 */
function encrypt(src, dist, password) {
  if (src === dist) {
    dist = dist.split('.pdf')[0]
    dist += '_encryped.pdf'
  }
  const cmd = `qpdf --encrypt ${password} ${password} 256 -- ${src} ${dist}`
  return execShellCommand(cmd)
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

module.exports = { encrypt, decrypt }

if (require.main === module) {
  ;(async () => {
    try {
      const src = path.join(__dirname, 'document.pdf')
      const dist = path.join(__dirname, 'document_encrypted.pdf')
      const password = '1234'
      await encrypt(src, dist, password)
      console.log('encrypt successfully.')
    } catch (e) {
      throw e;
    }
  })()
}

