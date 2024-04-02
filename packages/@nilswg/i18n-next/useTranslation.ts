/**
 * 對透過 i18n（即國際化和區域化）獲取的翻譯文字進行型態檢查
 * 此處設置其 type guard 方法。如 isString、isStringArray
 */
import { TFunction } from 'next-i18next'

/**
 * check type of input is string
 */
function isString(e: unknown): e is string {
  if (e && typeof e === 'string') {
    return true
  } else {
    return false
  }
}

/**
 * check type of input is string array
 */
function isStringArray(e: unknown): e is Array<string> {
  if (e && Array.isArray(e)) {
    const _isStringArray = e.length > 0 && e.every((x) => typeof x === 'string')

    return _isStringArray
  }
  return false
}

/**
 * 獲取i18n翻譯文本，檢查輸出結果是否為 string，否則返回空字串
 */
export function getI18nText(t: TFunction, i18nKey: string | string[]): string {
  const result = t(i18nKey)
  return isString(result) ? result : ''
}

/**
 * 獲取i18n翻譯文本，檢查輸出結果是否為 string 陣列，否則返回空陣列
 */
export function getI18nTextArray(
  t: TFunction,
  i18nKey: string | string[]
): string[] {
  const results = t(i18nKey, { returnObjects: true })
  return isStringArray(results) ? results : []
}

/**
 * 檢查輸入的類型是否為一物件陣列，但是不檢查該逐一物件中的屬性。
 */
function isObjectArray<T = object>(e: unknown): e is Array<T> {
  if (e && Array.isArray(e)) {
    const _isObjectArray = e.length > 0 && e.every((x) => typeof x === 'object')

    return _isObjectArray
  }
  return false
}

/**
 * 獲取i18n翻譯文本，檢查輸出結果是否為 T 陣列，否則返回空陣列
 * T 為指定的泛型類型(預設為 object)，但是不檢查其包含屬性是否存在。
 */
export function getI18nObjects<T>(
  t: Function,
  i18nKey: string | string[]
): Partial<T>[] {
  const results = t(i18nKey, { returnObjects: true })
  return isObjectArray<Partial<T>>(results) ? results : []
}
