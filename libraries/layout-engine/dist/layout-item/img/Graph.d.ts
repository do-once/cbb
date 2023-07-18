/**
 * @author GuangHui
 * @description 图片类
 */
import { Base, IPos, ISize, LayoutItemTypeEnum } from '../base';
export declare class Graph extends Base {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    src: string;
    constructor(src: string);
    getPos(): IPos;
    getSize(): Promise<ISize>;
    measureSize(): Promise<ISize>;
}
//# sourceMappingURL=Graph.d.ts.map