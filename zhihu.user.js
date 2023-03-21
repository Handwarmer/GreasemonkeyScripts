// ==UserScript==
// @name         知乎！
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Handwarmer
// @match        *://www.zhihu.com/
// @icon         https://static.zhihu.com/heifetz/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 去右下广告
    document.querySelector("div.Banner-adTag").closest("div.Pc-card.Card").remove();
})();
