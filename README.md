# Parse Urls From Alexa

### 爬蟲步驟
1. 從 Array.pop() 取出最後放入 array 的 URL
2. Fetch URL 並過濾掉不需要的 DOM
  > script, iframe, header, footer, noscript

1. Parser DOM 找出分類區塊並加總各分類包含的項目數值，判斷是否超過限制數量，如果超過限制數量則將各分類 URL Push 到 Array 中，並回到 Step 1 執行下一個 URL
2. Parser DOM 找出是否有 Next page 的 element，如果有 Next page 則將 URL Push 到 Array 中
3. Parser DOM 找出需要的資料並回存資料
4. 判斷 Array 是否還有其他 URL 未被 pop 出來，如果還有其他 URL 則 Loop Step 1，直到 Array 沒有任何 URL 為止
