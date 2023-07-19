/**
 * @author GuangHui
 * @description 图片类,应包含图片本身 Graph+图片的标题GraphTitle,GraphTitle总是在Graph 下方
 */
import { Base, LayoutItemTypeEnum, ImgSurrounTypeEnum } from '../base';
export class Img extends Base {
    layoutItemType = LayoutItemTypeEnum.IMG;
    canLineBreak = false;
    childs;
    imgSurroundType = ImgSurrounTypeEnum.NONE;
    constructor(childs) {
        super();
        this.childs = childs;
    }
    haveTitle() {
        return this.childs.length > 1;
    }
    measureSize() {
        const [graph, graphTitle] = this.childs;
        const width = graphTitle ? Math.max(graph.width, graphTitle.width) : graph.width;
        const height = graphTitle ? graph.height + graphTitle.height : graph.height;
        return {
            width,
            height
        };
    }
}
//# sourceMappingURL=Img.js.map