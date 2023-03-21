// ==UserScript==
// @name         bilibili enhancer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://www.bilibili.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
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