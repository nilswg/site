# 產生履歷 pdf

## quick start
先用 genPDF 產生履歷快照 pdf 檔，再使用 qpdf 對其加密。
```bash
pnpm run start
```

## genPDF.mjs
如果是 WSL，要記得開啟 VcXsrv。VcXsrv 能讓 WSL 透過外層的 Window 提供虛擬的圖形化顯示界面。

## qpdf.mjs
加解密 pdf 時，會使用到 qpdf 套件，qpdf 是在 Linux 常用於處理PDF文件的開源工具。
```bash
sudo apt-get update
sudo apt-get install qpdf
```
