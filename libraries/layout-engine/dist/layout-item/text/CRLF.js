/**
 * @author GuangHui
 * @description 手动换行
 */
import { Base, LayoutItemTypeEnum } from '../base';
export class CRLF extends Base {
    layoutItemType = LayoutItemTypeEnum.CRLF;
    canLineBreak = false;
    debug = false;
    because;
    rowNo;
    constructor({ debug, because, rowNo }) {
        super();
        this.debug = !!debug;
        this.because = because;
        this.rowNo = rowNo;
    }
    async init(force = false) {
        /** 已经初始化,并不是强制初始化,则跳过 */
        if (this.initialized && !force)
            return;
        this.initialized = true;
    }
    measureSize() {
        return {
            width: 0,
            height: 0
        };
    }
}
//# sourceMappingURL=CRLF.js.map