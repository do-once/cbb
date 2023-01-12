import { ones, inv, multiply } from 'mathjs';
/**
 * 模拟鼠标的offsetX(考虑了transform rotate的情况)
 * @param x 坐标x
 * @param y 坐标y
 * @param elOrCache 节点或缓存
 * @returns touch.offsetX
 */
export function getOffsetPosition(x, y, elOrCache) {
    function getVertexPosition(el) {
        let currentTarget = el;
        let top = 0;
        let left = 0;
        while (currentTarget !== null) {
            top += currentTarget.offsetTop;
            left += currentTarget.offsetLeft;
            currentTarget = currentTarget.offsetParent;
        }
        return { top, left };
    }
    function getTranformData(el) {
        let style = window.getComputedStyle(el);
        let transform = style.transform || '';
        let transformOrigin = style.transformOrigin || '';
        let origin = { x: 0, y: 0 };
        let matrix = ones([3, 3]);
        if (transform !== 'none') {
            let originArray = transformOrigin.split(' ');
            origin.x = parseInt(originArray[0]);
            origin.y = parseInt(originArray[1]);
            let matrixString = transform.match(/\(([^)]*)\)/)[1];
            let stringArray = matrixString.split(',');
            let temp = [];
            stringArray.forEach((value) => {
                temp.push(parseFloat(value.trim()));
            });
            temp = [
                [temp[0], temp[2], temp[4]],
                [temp[1], temp[3], temp[5]],
                [0, 0, 1]
            ];
            matrix = inv(temp);
        }
        else {
            matrix = [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ];
        }
        return { matrix, origin };
    }
    function computPosition(data) {
        data.forEach((obj) => {
            let { temp, origin, vertex: { left, top } } = obj;
            x = x - left - origin.x;
            y = y - top - origin.y;
            let result = multiply(temp, [x, y, 1]);
            x = result[0] + origin.x;
            y = result[1] + origin.y;
        });
        return { x, y };
    }
    let data = [];
    if (elOrCache instanceof Node) {
        var el = elOrCache;
        while (el !== null && el.nodeType === 1) {
            let { left, top } = getVertexPosition(el);
            let transformData = getTranformData(el);
            let temp = transformData.matrix;
            let origin = transformData.origin;
            if (data.length > 0) {
                data[0].vertex.left -= left;
                data[0].vertex.top -= top;
            }
            data.unshift({
                temp,
                origin,
                vertex: {
                    left,
                    top
                }
            });
            el = el.parentNode;
        }
    }
    else if (elOrCache instanceof Array) {
        data = elOrCache;
    }
    let pos = computPosition(data);
    return { x: pos.x, y: pos.y, data };
}
/**
 * 获取父节点的滚动距离
 * @param target HTMLElement 节点
 * @returns 父元素滚动距离
 */
export function getScroll(target) {
    let parentScrollTop = 0;
    let parentScrollLeft = 0;
    let curTarget = target.parentElement;
    while (curTarget !== null) {
        parentScrollTop += curTarget.scrollTop;
        parentScrollLeft += curTarget.scrollLeft;
        if (getComputedStyle(curTarget).position === 'fixed') {
            console.log('fixed', curTarget);
            return {
                parentScrollTop,
                parentScrollLeft
            };
        }
        curTarget = curTarget.parentElement;
    }
    return {
        parentScrollTop,
        parentScrollLeft
    };
}
//# sourceMappingURL=touch-offset.js.map