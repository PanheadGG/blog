// ==UserScript==
// @name         问卷星w1hFCEL
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  按规则自动填写问卷星问卷选项，并触发change事件
// @author       Your Name
// @match        https://www.wjx.cn/vm/w1hFCEL.aspx
// @grant        none
// ==/UserScript==

(function () {
    'use strict';


    function slide(id, offsetX, duration = 1000) {
        var slider = document.getElementById(id);
        var rect = slider.getBoundingClientRect();
        var x0 = rect.x || rect.left;
        var y0 = rect.y || rect.top;
        var x1 = x0 + offsetX;
        var y1 = y0;

        // 拟人化：动态计算每步的间隔和距离
        var steps = Math.floor(30 + Math.random() * 20); // 步数随机在30到50之间
        var stepDelays = [];
        var totalDelay = 0;

        // 使用非线性函数生成每步时间间隔（模拟加速-减速）
        for (let i = 0; i < steps; i++) {
            let progress = i / steps;
            let easeOut = Math.pow(progress - 1, 3) + 1; // 使用 EaseOut 动画函数
            let stepDelay = easeOut * (duration / steps);
            stepDelays.push(stepDelay);
            totalDelay += stepDelay;
        }

        // 调整步数间隔比例确保总时长正确
        let scaleFactor = duration / totalDelay;
        stepDelays = stepDelays.map(d => d * scaleFactor);

        // 每步位移量
        var stepOffsets = Array.from({ length: steps }, (_, i) => {
            return offsetX * ((i + 1) / steps) - offsetX * (i / steps);
        });

        // 模拟鼠标按下
        var mousedown = document.createEvent('MouseEvents');
        mousedown.initMouseEvent('mousedown', true, true, window, 0, x0, y0, x0, y0, false, false, false, false, 0, null);
        slider.dispatchEvent(mousedown);

        let currentStep = 0;
        let currentX = x0;

        // 分步拖动逻辑
        function moveStep() {
            if (currentStep >= steps) {
                // 模拟鼠标松开
                var mouseup = document.createEvent('MouseEvents');
                mouseup.initMouseEvent('mouseup', true, true, window, 0, x1, y1, x1, y1, false, false, false, false, 0, null);
                slider.dispatchEvent(mouseup);
                return;
            }

            currentX += stepOffsets[currentStep];
            let xCurrent = currentX;
            let yCurrent = y0;

            // 模拟鼠标移动
            var mousemove = document.createEvent('MouseEvents');
            mousemove.initMouseEvent(
                'mousemove', true, true, window, 0, xCurrent, yCurrent, xCurrent, yCurrent,
                false, false, false, false, 0, null
            );
            slider.dispatchEvent(mousemove);

            currentStep++;

            // 下一步
            setTimeout(moveStep, stepDelays[currentStep] || 0);
        }

        moveStep();
    }



    function simulateClick(element) {
        if (element) {
            element.click();
            element.dispatchEvent(new Event("change", { bubbles: true }));
        }
    }

    // 模拟点击和触发 change 事件的函数
    function simulateClickAndChange(element) {
        if (!element) return;
        var mousedownEvent = new MouseEvent('mousedown', { bubbles: true });
        var mouseupEvent = new MouseEvent('mouseup', { bubbles: true });
        var clickEvent = new MouseEvent('click', { bubbles: true });
        element.dispatchEvent(mousedownEvent);
        element.dispatchEvent(mouseupEvent);
        element.dispatchEvent(clickEvent);

        // 手动触发 change 事件
        var changeEvent = new Event('change', { bubbles: true });
        element.dispatchEvent(changeEvent);
    }

    // 工具函数：随机数
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 工具函数：从数组中随机选
    function getRandomFromArray(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // 定义延迟时间（毫秒）
    var delayTime = 0;
    var delay = 0;

    for (let i = 1; i <= 15; i++) {
        let option;
        switch(i){
            case 1:
                option = getRandomInt(1,4);
                break;
            case 2:
                option = Math.random() < 0.90 ? 1 : 2;
                break;
            case 3:
                option = Math.random() < 0.95 ? getRandomInt(1,2) : 3;
                break;
            case 4:
                option = Math.random() < 0.95 ? getRandomInt(1,2) : 3;
                break;
            case 5:
                option = Math.random() < 0.67 ? 1 : 2;
                break;
            case 6:
                option = Math.random() < 0.67 ? 1 : 2;
                break;
            case 7:
                option = Math.random() < 0.90 ? 1 : getRandomInt(2,3);
                break;
            case 8:
                for (let j = 1; j <= 5; j++) {
                    let ans = getRandomInt(1, 4)
                    document.querySelector(`#q${i}_${ans}`).checked = true;
                    simulateClickAndChange(document.querySelector(`#q${i}_${ans}`));
                }
                continue;
            case 9:
                for (let j = 1; j <= 5; j++) {
                    let ans = getRandomInt(1, 4)
                    document.querySelector(`#q${i}_${ans}`).checked = true;
                    simulateClickAndChange(document.querySelector(`#q${i}_${ans}`));
                }
                continue;
            case 10:
                option = Math.random() < 0.90 ? 1 : 2;
                break;
            case 11:
                for (let j = 1; j <= 5; j++) {
                    let ans = getRandomInt(1, 4)
                    document.querySelector(`#q${i}_${ans}`).checked = true;
                    simulateClickAndChange(document.querySelector(`#q${i}_${ans}`));
                }
                continue;
            case 12:
                option = Math.random() < 0.15 ? 1 : 2;
                break;
            case 13:
                option = Math.random() <0.80 ? getRandomInt(1,2) : 3;
                break;
            case 14:
                for (let j = 1; j <= 5; j++) {
                    let ans = getRandomInt(1, 4)
                    document.querySelector(`#q${i}_${ans}`).checked = true;
                    simulateClickAndChange(document.querySelector(`#q${i}_${ans}`));
                }
                continue;
            case 15:
                option = Math.random() < 0.95 ? getRandomInt(1,2) : 3;
                break;
        }
        simulateClickAndChange(document.querySelector(`#q${i}_${option}`));
    }

    // 提交表单
    setTimeout(function () {
        simulateClickAndChange(document.querySelector('#ctlNext')); // 提交按钮
    }, 1000);

    // 创建 MutationObserver 实例
    const observerRobot = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const element = document.querySelector('#SM_TXT_1');
                if (element) {
                    observerRobot.disconnect(); // 停止观察
                    robotCheck() // 执行函数
                    break;
                }
            }
        }
    });

    function robotCheck() {
        simulateClickAndChange(document.querySelector('#SM_TXT_1')); //人机验证
    }


    // 配置观察选项
    observerRobot.observe(document.body, {
        childList: true, // 监听子节点的变化
        subtree: true // 监听整个子树
    });

    const observerSlide = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const element = document.querySelector('#nc_1_n1z');
                if (element) {
                    //observerSlide.disconnect(); // 停止观察
                    slide("nc_1_n1z", 300, 1300);
                    break;
                }
            }
        }
    });

    // 配置观察选项
    observerSlide.observe(document.body, {
        childList: true, // 监听子节点的变化
        subtree: true // 监听整个子树
    });

    const observerQueRen = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const element = document.querySelector('.layui-layer-btn0');
                if (element) {
                    observerQueRen.disconnect(); // 停止观察
                    simulateClickAndChange(document.querySelector('.layui-layer-btn0'));
                    break;
                }
            }
        }
    });

    // 配置观察选项
    observerQueRen.observe(document.body, {
        childList: true, // 监听子节点的变化
        subtree: true // 监听整个子树
    });

    const observerRefresh = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const element = document.querySelector('#nc_1_refresh1');
                if (element) {
                    //observerRefresh.disconnect(); // 停止观察
                    simulateClickAndChange(document.querySelector('#nc_1_refresh1'));
                    break;
                }
            }
        }
    });

    // 配置观察选项
    observerRefresh.observe(document.body, {
        childList: true, // 监听子节点的变化
        subtree: true // 监听整个子树
    });

})();
