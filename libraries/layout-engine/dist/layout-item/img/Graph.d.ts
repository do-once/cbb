/**
 * @author GuangHui
 * @description 图片类
 */
import { Base, IImgSurround, ImgSurrounTypeEnum, ISize, LayoutItemTypeEnum } from '../base';
export declare type GraphCtrParams = {
    src: string;
    imgSurroundType: ImgSurrounTypeEnum;
};
export declare class Graph extends Base implements IImgSurround {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    src: string;
    imgSurroundType: ImgSurrounTypeEnum;
    constructor({ src, imgSurroundType }: GraphCtrParams);
    init(): Promise<void>;
    measureSize(): Promise<ISize>;
}
//# sourceMappingURL=Graph.d.ts.map