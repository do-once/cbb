/**
 * @author GuangHui
 * @description 获取scrollbar 宽度
 */
export const getScrollbarWidth = () => {
    if (getScrollbarWidth.scrollBarWidth != null)
        return getScrollbarWidth.scrollBarWidth;
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    document.body.appendChild(outer);
    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';
    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);
    const widthWithScroll = inner.offsetWidth;
    outer.parentNode.removeChild(outer);
    const scrollBarWidth = widthNoScroll - widthWithScroll;
    getScrollbarWidth.scrollBarWidth = scrollBarWidth;
    return scrollBarWidth;
};
//# sourceMappingURL=scrollbar-width.js.map