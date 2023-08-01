/**
 * @author GuangHui
 * @description DoonceLayoutEngine 主体程序
 */
import { loadFont, checkCollision } from '@doonce/utils';
import { ImgPlaceholder, ImgSurrounTypeEnum, LayoutItemTypeEnum, Row } from './layout-item';
export class DoonceLayoutEngine {
    globalFontConfig;
    font = null;
    inputRowLayoutItemInstanceList;
    inputImgLayoutItemInstanceList;
    debug;
    constructor({ globalFontConfig, inputRowLayoutItemInstanceList, inputImgLayoutItemInstanceList, debug }) {
        if (!globalFontConfig)
            throw new Error('globalFontConfig is required');
        if ((!inputRowLayoutItemInstanceList || !inputRowLayoutItemInstanceList.length) &&
            (!inputImgLayoutItemInstanceList || !inputImgLayoutItemInstanceList.length))
            throw new Error('inputRowLayoutItemInstanceList and inputImgLayoutItemInstanceList is required at least one');
        this.globalFontConfig = globalFontConfig;
        this.inputRowLayoutItemInstanceList = inputRowLayoutItemInstanceList;
        this.inputImgLayoutItemInstanceList = inputImgLayoutItemInstanceList;
        this.debug = !!debug;
    }
    async init() {
        /** 字体不存在,则先加载 */
        !this.font && (this.font = await loadFont(this.globalFontConfig.fontFamily, this.globalFontConfig.source));
        /** 字体加载失败,阻塞流程 */
        if (!this.isFontLoaded())
            throw new Error(`font ${this.globalFontConfig.fontFamily} load faild`);
        /** 等待实例初始化尺寸和 content 结束 */
        await Promise.all([
            ...this.inputRowLayoutItemInstanceList.map(instance => instance.init()),
            ...this.inputImgLayoutItemInstanceList.map(instance => instance.init())
        ]);
        this.debug &&
            console.log('this.inputRowLayoutItemInstanceList after init :>> ', this.inputRowLayoutItemInstanceList);
        this.debug &&
            console.log('this.inputImgLayoutItemInstanceList after init :>> ', this.inputImgLayoutItemInstanceList);
    }
    /**
     * 布局
     *
     * @date 2023-08-01 10:40:15
     * @param { maxWidth } 容器宽度
     * @returns {LayoutMethodRet} 布局对象
     * @memberof DoonceLayoutEngine
     */
    layout({ maxWidth }) {
        if (!maxWidth)
            throw new Error('maxWidth is required');
        /** 存在图片 */
        if (this.inputImgLayoutItemInstanceList && this.inputImgLayoutItemInstanceList.length) {
            return this._layoutWithImg({
                img: this.inputImgLayoutItemInstanceList[0] /** 暂只考虑只有一张图的场景 */,
                maxWidth
            });
        }
        else {
            return this._layoutWithNoneImg({ maxWidth });
        }
    }
    /**
     * 包含图片的图文混排方法
     *
     * @date 2023-08-01 16:57:18
     * @private
     * @param { img, maxWidth } Img实例,容器宽度
     * @returns {LayoutMethodRet} 布局对象
     * @memberof DoonceLayoutEngine
     */
    _layoutWithImg({ img, maxWidth }) {
        let rowList = [];
        /** 环绕 */
        if (img.imgSurroundType === ImgSurrounTypeEnum.FLOAT) {
            /** 首行 */
            let curRow = this._createANewRowAndSetInitialSizeAndPos({ rowNo: 1, prevRow: null });
            /** 记录之前行,用来计算当前行 y 坐标 */
            let prevRow = null;
            for (let i = 0, curInstance; i < this.inputRowLayoutItemInstanceList.length; i++) {
                curInstance = this.inputRowLayoutItemInstanceList[i];
                /** 手动换行 */
                if (curInstance.layoutItemType === LayoutItemTypeEnum.CRLF) {
                    curRow.addChild(curInstance);
                    /** 加入行数组前更新当前行信息 */
                    this._updateCurRowInfo(curRow, prevRow);
                    prevRow = curRow;
                    rowList.push(curRow);
                    /** 创建新行 */
                    curRow = this._createANewRowAndSetInitialSizeAndPos({ rowNo: curRow.rowNo + 1, prevRow: curRow });
                }
                else {
                    /** 超宽,需要将 curInstance 放在下行 */
                    if (curRow.width + curInstance.width > maxWidth) {
                        /** 加入行数组前更新当前行信息 */
                        this._updateCurRowInfo(curRow, prevRow);
                        prevRow = curRow;
                        rowList.push(curRow);
                        /** 创建新行 */
                        curRow = this._createANewRowAndSetInitialSizeAndPos({ rowNo: curRow.rowNo + 1, prevRow });
                    }
                    /** 循环检测碰撞,直到找到图片左侧可以放下 curInstance 的行 */
                    while (
                    /** 左侧碰撞,代表左侧无空间, */
                    checkCollision({
                        width: curInstance.width,
                        height: curInstance.height,
                        x: curRow.width,
                        y: prevRow ? prevRow.y + prevRow.height : 0
                    }, img)) {
                        console.log('checkCollision curInstance :>> ', curInstance);
                        /** 添加图片占位 */
                        curRow.addChild(new ImgPlaceholder({
                            ownerImg: img,
                            height: curRow.height,
                            y: 0 /** 图片占位是相对行定位,所以 y 固定为0 */,
                            rowNo: curRow.rowNo
                        }));
                        curRow.setSize({ width: img.x + img.width });
                        /** 超宽,代表右侧无空间,需要将 curInstance 放在下行 */
                        if (curRow.width + curInstance.width > maxWidth) {
                            /** 加入行数组前更新当前行信息 */
                            this._updateCurRowInfo(curRow, prevRow);
                            prevRow = curRow;
                            rowList.push(curRow);
                            /** 创建新行 */
                            curRow = this._createANewRowAndSetInitialSizeAndPos({ rowNo: curRow.rowNo + 1, prevRow });
                        }
                    }
                    /** 更新当前 layoutItemInstance 的 x 坐标和行号 */
                    curInstance.x = curRow.width;
                    curInstance.rowNo = curRow.rowNo;
                    /** 将当前 layoutItemInstance 塞入当前行 */
                    curRow.addChild(curInstance);
                    /** 更新当前行宽度 */
                    curRow.setSize({ width: curRow.width + curInstance.width });
                }
            }
            /** 最后行 */
            /** 加入行数组前更新当前行信息 */
            this._updateCurRowInfo(curRow, prevRow);
            /** 记录prevRow */
            prevRow = curRow;
            /** 换行,将当前行塞入数组 */
            rowList.push(curRow);
        }
        else if (img.imgSurroundType === ImgSurrounTypeEnum.ABSOLUTE) {
            /** 绝对定位 */
            /** 对文本进行行排版即可,图片不影响文字排版,图片位置应提前设置好 */
            const layoutWithNoneImgRet = this._layoutWithNoneImg({ maxWidth });
            rowList = layoutWithNoneImgRet.rowList;
        }
        else {
            /** 默认下挂 */
            const layoutWithNoneImgRet = this._layoutWithNoneImg({ maxWidth });
            rowList = layoutWithNoneImgRet.rowList;
            /** 图片渲染在题干的右下 */
            img.x = maxWidth - img.width;
            const lastRow = rowList[rowList.length - 1];
            img.y = lastRow.width + img.width <= maxWidth ? lastRow.y : lastRow.y + lastRow.height;
        }
        return { rowList, imgList: [img] };
    }
    /**
     * 无图片时用的布局方法
     *
     * @date 2023-08-01 10:38:26
     * @private
     * @param { maxWidth } 最大宽度
     * @returns {LayoutMethodRet} 布局对象
     * @memberof DoonceLayoutEngine
     */
    _layoutWithNoneImg({ maxWidth }) {
        const rowList = [];
        let prevRow = null;
        /** 首行 */
        let curRow = this._createANewRowAndSetInitialSizeAndPos({ rowNo: 1, prevRow: null });
        for (let i = 0, curInstance; i < this.inputRowLayoutItemInstanceList.length; i++) {
            curInstance = this.inputRowLayoutItemInstanceList[i];
            if (
            /** 手动换行 */
            curInstance.layoutItemType === LayoutItemTypeEnum.CRLF ||
                /** 超宽 */
                curRow.width + curInstance.width > maxWidth) {
                /** 加入rowList前更新当前行信息 */
                this._updateCurRowInfo(curRow, prevRow);
                prevRow = curRow;
                rowList.push(curRow);
                /** 创建新行 */
                curRow = this._createANewRowAndSetInitialSizeAndPos({ rowNo: curRow.rowNo + 1, prevRow });
            }
            /** 更新当前 layoutItemInstance 的 x 坐标和行号 */
            curInstance.x = curRow.width;
            curInstance.rowNo = curRow.rowNo;
            /** 将当前 layoutItemInstance 塞入当前行 */
            curRow.addChild(curInstance);
            /** 更新当前行宽度 */
            curRow.setSize({ width: curRow.width + curInstance.width });
        }
        /** 最后行 */
        this._updateCurRowInfo(curRow, prevRow);
        prevRow = curRow;
        rowList.push(curRow);
        return { rowList, imgList: [] };
    }
    /**
     * 创建新行并设置初始尺寸和位置
     *
     * @date 2023-08-01 10:35:04
     * @private
     * @param { rowNo, prevRow } 行号,前一行实例
     * @returns {Row} 设置好初始尺寸和位置的新行
     * @memberof DoonceLayoutEngine
     */
    _createANewRowAndSetInitialSizeAndPos({ rowNo, prevRow }) {
        const row = new Row({
            globalFontConfig: this.globalFontConfig,
            rowNo
        });
        row.setSize({ width: 0, height: 0 });
        row.setPos({ x: 0, y: prevRow ? prevRow.y + prevRow.height : 0 });
        return row;
    }
    _updateCurRowInfo(curRow, prevRow) {
        /** 更新当前行行高 */
        curRow.height = Math.max(this.globalFontConfig.lineHeight, this.getHighestRowChildHeight(curRow.childs));
        /** 计算当前行 y 坐标,其依赖上一个行高计算后才能计算 */
        curRow.y = prevRow ? prevRow.y + prevRow.height : 0;
        /** 水平对齐行内item */
        curRow.childs.forEach(child => {
            /** placeholder 不需水平对齐 */
            if (child.layoutItemType !== LayoutItemTypeEnum.IMG_PLACEHOLDER) {
                child.y = Math.abs(curRow.height - child.height) / 2;
            }
        });
        /** 水平对齐RowLayoutItemGroup中的元素 */
        curRow.childs
            .filter((c) => c.layoutItemType === LayoutItemTypeEnum.ROW_LAYOUT_ITEM_GROUP)
            .forEach(group => {
            const [prevInstance, symbolInstance] = group.childs;
            /** 挂靠的前字符 */
            prevInstance.rowNo = group.rowNo;
            /** 坐标相对 gorup */
            prevInstance.x = 0;
            prevInstance.y = Math.abs(group.height - prevInstance.height) / 2;
            /** 悬挂的标点 */
            symbolInstance.rowNo = group.rowNo;
            /** 坐标相对 gorup */
            symbolInstance.x = prevInstance.width;
            symbolInstance.y = Math.abs(group.height - symbolInstance.height) / 2;
        });
        return curRow;
    }
    /**
     * 获取最高 child 的高度
     *
     * @date 2023-07-21 16:43:37
     * @private
     * @param rowChild
     * @returns {number} 高度
     * @memberof DoonceLayoutEngine
     */
    getHighestRowChildHeight(rowChild) {
        return rowChild.reduce((acc, cur) => Math.max(cur.height, acc), 0);
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
        return this.font.status === 'loaded';
    }
}
//# sourceMappingURL=DoonceLayoutEngine.js.map