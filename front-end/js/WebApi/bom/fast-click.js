//封装tap，解决click 300ms 延时
function tap(obj, callback) {
    var isMove = false;
    var startTime = 0; // 记录触摸时候的时间变量
    obj.addEventListener('touchstart', function (e) {
        startTime = Date.now(); // 记录触摸时间
    });
    obj.addEventListener('touchmove', function (e) {
        isMove = true;  // 看看是否有滑动，有滑动算拖拽，不算点击
    });
    obj.addEventListener('touchend', function (e) {
        if (!isMove && (Date.now() - startTime) < 150) {  // 如果手指触摸和离开时间小于150ms 算点击
            callback && callback(); // 执行回调函数
        }
        isMove = false;  //  取反 重置
        startTime = 0;
    });
}