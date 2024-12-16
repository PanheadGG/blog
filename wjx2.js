// ==UserScript==
// @name         问卷星自动跳转至指定页面
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  当访问指定页面时自动跳转到目标页面
// @author       You
// @match        https://www.wjx.cn/wjx/join/completemobile2.aspx*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 跳转到目标页面
    window.location.href = "https://www.wjx.cn/vm/w1hFCEL.aspx";
})();