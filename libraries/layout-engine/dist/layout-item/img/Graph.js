/**
 * @author GuangHui
 * @description 图片类
 */
import { Base, LayoutItemTypeEnum } from '../base';
export class Graph extends Base {
    layoutItemType = LayoutItemTypeEnum.GRAPH;
    canLineBreak = false;
    src;
    constructor(src) {
        super();
        if (!src)
            throw new Error('src is required');
        this.src = src;
    }
    getPos() {
        return {
            x: this.x,
            y: this.y
        };
    }
    async getSize() {
        /** 未获取过,则尝试获取 */
        if (this.width < 0 || this.height < 0) {
            try {
                const { width, height } = await this.measureSize();
                this.width = width;
                this.height = height;
            }
            catch (error) {
                console.log(`${this.src} getSize faild because: `, error);
            }
        }
        return {
            width: this.width,
            height: this.height
        };
    }
    async measureSize() {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = this.src;
            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };
            img.onerror = reject;
        });
    }
}
//# sourceMappingURL=Graph.js.map