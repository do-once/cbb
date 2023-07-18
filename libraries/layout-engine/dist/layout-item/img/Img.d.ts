/**
 * @author GuangHui
 * @description 图片类,应包含图片本身 Graph+图片的标题GraphTitle
 */
import { Base, IChild, IPos, ISize, ISurround, LayoutItemTypeEnum, SurrounTypeEnum } from '../base';
import { Graph, GraphTitle } from './';
/** 限制下 Img 的child 类型 */
export declare type ImgChild = Graph | GraphTitle;
export declare class Img extends Base implements IChild, ISurround {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    childs: [Graph, GraphTitle] | [Graph] | [];
    surroundType: SurrounTypeEnum;
    getPos(): IPos | Promise<IPos>;
    getSize(): ISize | Promise<ISize>;
    haveTitle(): boolean;
}
//# sourceMappingURL=Img.d.ts.map