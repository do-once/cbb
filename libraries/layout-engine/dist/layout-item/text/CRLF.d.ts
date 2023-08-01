/**
 * @author GuangHui
 * @description 手动换行
 */
import { Base, IRow, ISize, LayoutItemTypeEnum } from '../base';
export declare type CRLFCtrOptions = {
    debug?: boolean;
    because: string; /** 手动换行原因 */
    rowNo: IRow['rowNo'];
};
export declare class CRLF extends Base implements IRow {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    debug: boolean;
    because: string;
    rowNo: IRow['rowNo'];
    constructor({ debug, because, rowNo }: CRLFCtrOptions);
    init(force?: boolean): Promise<void>;
    measureSize(): ISize;
}
//# sourceMappingURL=CRLF.d.ts.map