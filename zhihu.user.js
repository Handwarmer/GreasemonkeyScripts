// ==UserScript==
// @name         知乎！
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       Handwarmer
// @match        *://www.zhihu.com/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 去右下广告
    document.querySelector("div.Banner-adTag").closest("div.Pc-card.Card").remove();
})();
