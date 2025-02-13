import * as echarts from 'echarts'
/**
 * el:目标渲染元素
 * option：echarts配置项
 * resize：是否需要全屏功能
 */

export const initEcharts = (el, option, resize = false) => {
    const chartDom = el;
    const myChart = echarts.init(chartDom);
    let num = 0
    //全屏放大功能，增加全屏按钮，点击全屏按钮(自己添加)传递resize参数=true就行
    if (resize) {
        myChart.resize()
        const resizeObserver = new ResizeObserver(entries => {
            num++
            if (num >= 2) {
                myChart.resize()
                if (!document.webkitIsFullScreen) {
                    num = 0
                    setTimeout(() => {
                        resizeObserver.disconnect()
                    }, 50)
                }
            }
        });
        resizeObserver.observe(el)
    }
    myChart.clear()
    myChart.setOption(option);
}

export const screenFull = e => {
    if (e.requestFullscreen) {
        e.requestFullscreen();
    } else if (e.mozRequestFullScreen) {
        e.mozRequestFullScreen();
    } else if (e.webkitRequestFullscreen) {
        e.webkitRequestFullscreen();
    } else if (e.msRequestFullscreen) {
        e.msRequestFullscreen();
    }
};
