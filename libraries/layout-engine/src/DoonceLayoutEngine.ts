/**
 * @author GuangHui
 * @description DoonceLayoutEngine 主体程序
 */

import { loadFont } from '@doonce/utils'

export type GlobalFontOptions = {
  fontSize: number /** 单位px */
  fontFamily: string
  lineHeight: number /** 单位px */
  fontStyle: string
  fontWeight: string
  fontVariant: string
  source: string
}

export type DoonceLayoutEngineCtrOptions = {
  globalFontOptions?: GlobalFontOptions
}

export type LayoutMethodParams = {
  maxWidth: number /** 单位px */
  padding?: [number, number, number, number] /** 上右下左 padding */
  letterSpacing?: number /** 字符间距 */
}

export class DoonceLayoutEngine {
  globalFontOptions: GlobalFontOptions
  font: FontFace = null as unknown as FontFace

  constructor({ globalFontOptions } = {} as DoonceLayoutEngineCtrOptions) {
    if (!globalFontOptions) throw new Error('globalFontOptions is required')

    this.globalFontOptions = globalFontOptions

    this._init()
  }

  private async _init() {
    /** 字体不存在,则先加载 */
    !this.font &&
      (this.font = await loadFont(this.globalFontOptions.fontFamily, this.globalFontOptions.source))

    /** 字体加载失败,阻塞流程 */
    if (!this.isFontLoaded()) throw new Error(`font ${this.globalFontOptions.fontFamily} load faild`)
  }

  public layout({ maxWidth, padding = [0, 0, 0, 0], letterSpacing = 0 }: LayoutMethodParams) {
    if (!maxWidth) throw new Error('layoutParams is required')
  }

  /**
   * 检查字体是否加载完成
   * 参考:https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/check#fonts_that_have_loaded
   * 使用document.fonts.check()存在误检测,参考:https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/check#nonexistent_fonts
   *
   * @date 2023-07-18 00:33:12
   * @returns {boolean} 是否加载
   * @memberof DoonceLayoutEngine
   */
  public isFontLoaded() {
    return this.font.status === 'loaded'
  }
}
