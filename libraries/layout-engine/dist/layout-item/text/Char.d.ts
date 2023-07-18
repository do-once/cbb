/**
 * @author GuangHui
 * @description 单字符
 */
import { Base, LayoutItemTypeEnum, IContent, IPos, ISize } from '../base';
export declare class Char extends Base implements IContent {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    rawContent: string;
    content: string;
    getPos(): IPos | Promise<IPos>;
    getSize(): ISize | Promise<ISize>;
}
//# sourceMappingURL=Char.d.ts.map