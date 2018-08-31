$(function () {
    var w = $('#code-box').width();
    var codefn = qcode();


    $('#code-box').on('click', "#error-refresh", function () {
        codefn.resetCode();
        $.getJSON('/data/code/qcode.do', {w:w},function (data) {
            codefn.setCode(data.data);
        });

    });


    /**
     * 加载验证码
     */
    function qcode(){
        $.getJSON('/data/code/qcode.do', {w:w},function (data) {
            codefn = new moveCode(data.data);
        });
    }


    /**
     * 验证码校验
     * @param len
     * @param code
     */
    function analyze(len, code, callback){
        $.getJSON('/data/code/analyze.do', {w:len, code:code},callback);
    }

    //获取元素距离页面边缘的距离
    function getOffset(box, direction) {
        var setDirection = (direction == 'top') ? 'offsetTop' : 'offsetLeft';
        var offset = box[setDirection];
        var parentBox = box.offsetParent;
        while (parentBox) {
            offset += parentBox[setDirection];
            parentBox = parentBox.offsetParent;
        }
        parentBox = null;
        return parseInt(offset);
    }

    function moveCode(code) {
        var fn = {codeVluae: code};
        var box = document.querySelector("#code-box"),
            progress = box.querySelector("p"),
            codeInput = box.querySelector('.code-input'),
            evenBox = box.querySelector("span");

        //默认事件
        var boxEven = ['mousedown', 'mousemove', 'mouseup'];
        //改变手机端与pc事件类型
        if (typeof document.ontouchstart == 'object') {
            boxEven = ['touchstart', 'touchmove', 'touchend'];
        }

        var goX, offsetLeft, deviation, evenWidth, endX;
        function moveFn(e) {
            e.preventDefault();
            if(undefined != codeInput.value && null != codeInput.value && '' != codeInput.value) {
                return;
            }

            e = (boxEven['0'] == 'touchstart') ? e.touches[0] : e || window.event;
            endX = e.clientX - goX;
            endX = (endX > 0) ? (endX > evenWidth) ? evenWidth : endX : 0;
            if (endX > evenWidth * 0.96) {
                progress.innerText = '松开验证';
                progress.style.backgroundColor = "#66CC66";
            } else {
                progress.innerText = '';
                progress.style.backgroundColor = "#66CC66";
            }

            progress.style.width = endX + deviation + 'px';
            evenBox.style.left = endX + 'px';
        }

        function removeFn() {
            if(undefined != codeInput.value && null != codeInput.value && '' != codeInput.value) {
                return;
            }
            document.removeEventListener(boxEven['2'],removeFn,false);
            document.removeEventListener(boxEven['1'],moveFn,false);
            if (endX > evenWidth * 0.96) {
                codeInput.value = fn.codeVluae;
                analyze(endX, fn.codeVluae, function (data) {
                    if(data.meta.errCode == 0 && data.data == true){
                        progress.innerText = '验证成功';
                        progress.style.width = evenWidth + deviation + 'px';
                        evenBox.style.left = evenWidth + 'px';
                        evenBox.onmousedown = null;
                        evenBox.onmouseup = null;
                        evenBox.onmousemove = null;
                        progress.id = '';
                    } else {
                        progress.innerHTML = '<i class="iconfont icon-shuaxin"></i>&nbsp;&nbsp;验证失败,点击重试';
                        progress.id = "error-refresh";
                        progress.style.width = evenWidth + deviation + 'px';
                        evenBox.style.left = evenWidth + 'px';
                        progress.style.backgroundColor = "#f40";
                        codeInput.value = '';
                    }

                });
            } else {
                progress.style.width = '0px';
                evenBox.style.left = '0px';
            }
        }

        function initMove(e){
            e = (boxEven['0'] == 'touchstart') ? e.touches[0] : e || window.event;
            goX = e.clientX,
                offsetLeft = getOffset(box, 'left'),
                deviation = this.clientWidth,
                evenWidth = box.clientWidth - deviation,
                endX;
            document.addEventListener(boxEven['1'], moveFn, false);
            document.addEventListener(boxEven['2'], removeFn, false);
        }

        evenBox.addEventListener(boxEven['0'], initMove, false);

        fn.setCode = function (code) {
            if (code){
                fn.codeVluae = code;
            }
        };

        fn.getCode = function () {
            return fn.codeVluae;
        };

        fn.resetCode = function () {
            evenBox.removeAttribute('style');
            progress.removeAttribute('style');
            codeInput.value = '';
        };

        return fn;
    }
});