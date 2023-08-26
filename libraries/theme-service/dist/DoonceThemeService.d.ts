/**
 * @author GuangHui
 * @description DoonceThemeService 主体程序
 */
export declare type ThemeTuple = [string, string][];
/**
 * 主题服务
 *
 * @date 2021-06-24 10:28:29
 * @export
 * @class ThemeService
 */
export declare class DoonceThemeService {
    private styleEl;
    private styleElId;
    /**
     * 应用主题
     *
     * @date 2021-06-24 10:30:20
     * @public
     * @instance
     * @param {Array} themeTuple  主题配置数组(二元数组)，参照上面使用demo
     * @memberof ThemeService
     */
    applyTheme(themeTuple: ThemeTuple): void;
    /**
     * 销毁
     *
     * @date 2021-06-24 10:30:34
     * @public
     * @instance
     * @memberof ThemeService
     */
    destroy(): void;
    /**
     * 应用主题数组
     *
     * @date 2021-06-24 10:30:51
     * @private
     * @param {Array} themeTuple 主题配置数组
     * @memberof ThemeService
     */
    _apply(themeTuple: ThemeTuple): void;
    /**
     * 加载MutationObserverPolyfill
     *
     * @date 2021-06-24 10:31:03
     * @private
     * @return {Promise} promise实例
     * @memberof ThemeService
     */
    _loadMutationObserverPolyfill(): Promise<any>;
    /**
     * 加载CssVarsPonyfill
     *
     * @date 2021-06-24 10:31:22
     * @private
     * @return {Promise} promise实例
     * @memberof ThemeService
     */
    _loadCssVarsPonyfill(): Promise<boolean | void>;
    /**
     * 生成样式字符串
     *
     * @date 2021-06-24 10:31:36
     * @private
     * @param {ThemeTuple} themeTuple  主题配置数组
     * @return {String} css var 样式字符串
     * @memberof ThemeService
     */
    _genCssText(themeTuple: ThemeTuple): string;
}
//# sourceMappingURL=DoonceThemeService.d.ts.map