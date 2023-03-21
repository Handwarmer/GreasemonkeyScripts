// ==UserScript==
// @name         bilibili enhancer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://www.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// @downloadUrl  https://github.com/Handwarmer/GreasemonkeyScripts/raw/master/bilibili.user.js
// ==/UserScript==

(function() {
    'use strict';

    // 去掉b站桌面版首页左上角的滚动banner
    var swipe = document.querySelector("div.recommended-swipe.grid-anchor");
    swipe.remove();

    // 把时间长度字符串，如1:53:24，转换成秒
    var stringToSeconds = (timeString) => {
        var timeParts = timeString.split(":");
        var seconds = 0;
        if (timeParts.length == 3) {// 字符串中有小时部分
            seconds += parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60 + parseInt(timeParts[2]);
        } else {
            seconds += parseInt(timeParts[0]) * 60 + parseInt(timeParts[1]);
        }
        return seconds;
    };

    // 用来删除时长短于固定值的视频，现在还不好用，因为搞不定触发条件- -
    const SHORT_VIDEO_THRESHOLD_IN_SEC = 360; //短视频判断阈值，秒数
    var removeShortVideos = () => {
        var videoLengths = document.querySelectorAll("span.bili-video-card__stats__duration");
        videoLengths.forEach(videoLength => {
            var videoLengthInSec = stringToSeconds(videoLength.innerText);
            window.console.log(videoLengthInSec);
            if (videoLengthInSec < SHORT_VIDEO_THRESHOLD_IN_SEC) {
                window.console.log(videoLengthInSec + " deleted");
                var shortVideoCard = videoLength.closest("div.feed-card");
                shortVideoCard.remove();
            }
        });
    };

    // 用来删除广告视频链接，现在还不好用，因为搞不定触发条件- -
    var removeAdCard = () => {
        var adBadges = document.querySelectorAll("svg.bili-video-card__info--ad");
        adBadges.forEach(adBadge => {
            adBadge.closest("div.feed-card").remove();
        });
    };

/**

    var oldXHR = window.XMLHttpRequest;

    function newXHR() {
        var realXHR = new oldXHR();
        realXHR.addEventListener("readystatechange", function() {
            if(realXHR.readyState==4 && realXHR.status==200){
                afterAjaxComplete() //run your code here
            }
        }, false);
        return realXHR;
    }
    window.XMLHttpRequest = newXHR;


    var _send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {

        var callback = this.onreadystatechange;
        this.onreadystatechange = function() {
            if (this.readyState == 4) {
                setTimeout(removeShortVideos(), 2000);
            }
            callback.apply(this, arguments);
        }

        _send.apply(this, arguments);
    }
*/
})();