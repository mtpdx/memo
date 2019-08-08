function animate(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        if (obj.offsetLeft >= target){
            clearInterval(obj.timer);
        }
        obj.style.left = obj.offsetLeft + 1 + 'px';
    }, 30);
}

// 缓动效果
function animate_v1(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target){
            clearInterval(obj.timer);

            callback && callback();
        }

        obj.style.left = obj.offsetLeft + step + "px";
    }, 15);

}