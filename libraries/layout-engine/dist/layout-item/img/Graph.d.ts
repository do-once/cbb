/**
 * @author GuangHui
 * @description 图片类
 */
import { Base, ISize, LayoutItemTypeEnum } from '../base';
export declare class Graph extends Base {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    src: string;
    constructor(src: string);
    measureSize(): Promise<ISize>;
}
//# sourceMappingURL=Graph.d.ts.map