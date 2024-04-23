/**
 * https://stackoverflow.com/questions/59394040/how-to-get-a-downloadable-file-from-a-readablestream-response-in-a-fetch-request
 */

export function showInOtherTab(blob: Blob) {
  const url = window.URL.createObjectURL(blob)
  window.open(url)
}

export function download(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.style.display = 'none'
  // the filename you want
  link.download = filename;
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}