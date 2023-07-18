/**
 * @author GuangHui
 * @description DoonceLayoutEngine 主体程序
 */

import { loadFont } from '@doonce/utils'

export type GlobalFontOptions = {
  fontSize: number /** px */
  fontFamily: string
  lineHeight: number /** px */
  fontStyle: string
  fontWeight: string
  fontVariant: string
  source: string
}

export type DoonceLayoutEngineCtrOptions = {
  globalFontOptions?: GlobalFontOptions
}

export class DoonceLayoutEngine {
  globalFontOptions: GlobalFontOptions
  font: FontFace = null as unknown as FontFace

  constructor({ globalFontOptions } = {} as DoonceLayoutEngineCtrOptions) {
    this.globalFontOptions = globalFontOptions ?? {
      fontSize: 16,
      fontFamily: 'SimSun',
      lineHeight: 20,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontVariant: 'normal',
      /** 字体加载地址,和@font-face 中的声明格式一样 */
      source: 'url(path/to/font)'
    }
  }

  async init() {
    /** 字体不存在,则先加载 */
    !this.font &&
      (this.font = await loadFont(this.globalFontOptions.fontFamily, this.globalFontOptions.source))

    /** 字体加载失败,阻塞流程 */
    if (!this.isFontLoaded()) throw new Error(`${this.globalFontOptions.fontFamily} load faild`)
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
  isFontLoaded() {
    return this.font.status === 'loaded'
  }
}
