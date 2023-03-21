// ==UserScript==
// @name         MAGA (Make ngA Great Again)
// @namespace    https://bbs.nga.cn/
// @version      0.2
// @author       HandWarmer
// @include       /^https?://(bbs\.ngacn\.cc|nga\.178\.com|bbs\.nga\.cn)/.+/
// @match        *://ngabbs.com/*
// @match        *://g.nga.cn/*
// @match        *://nga.178.com/*
// @match        *://ngabbs.com/*
// @match        *://ngacn.cc/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var removeAds = () => {
        var imgs = document.querySelectorAll("img");
        imgs.forEach(img => {
            if(img.src.includes("admark.png")) {
                var tdAcs = img.closest("td");
                var spanAcs = img.closest("span");
                var divAcs = img.closest("div");
                if (tdAcs)
                    tdAcs.remove();
                else if(spanAcs)
                    spanAcs.remove();
                else if (divAcs)
                    divAcs.remove();
            }
        });
    };

    // 延迟执行一秒来应对延迟加载的广告。但似乎不好使
    setTimeout(removeAds(), 1000);
})();
