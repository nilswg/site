/**
 * https://stackoverflow.com/questions/59394040/how-to-get-a-downloadable-file-from-a-readablestream-response-in-a-fetch-request
 */

export function showInOtherTab(blob: Blob) {
  const url = window.URL.createObjectURL(blob)
  window.open(url)
}

export function download(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  // the filename you want
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}