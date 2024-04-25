// ==UserScript==
// @name         csdn cleaner
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  简化csdn
// @author       You
// @match        https://blog.csdn.net/*
// @match        https://*.blog.csdn.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=csdn.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const removeElements = () => {
        // 删除aside标签
        document.querySelectorAll('div.recommendAdBox').forEach(el => el.remove());

        document.querySelectorAll('#rightAside').forEach(el => el.remove());
        document.querySelectorAll('#blogColumnPayAdvert').forEach(el => el.remove());
        document.querySelectorAll('div.kind_person').forEach(el => el.remove());
        // 删除 toolbar-advert
        document.querySelectorAll('div.toolbar-advert').forEach(el => el.remove());

        //csdn-side-toolbar
        document.querySelectorAll('div.csdn-side-toolbar').forEach(el => el.remove());
        //toolBarBox
        document.querySelectorAll('div#toolBarBox').forEach(el => el.remove());
        // 将main标签的宽度设置为100%
        document.querySelectorAll('main').forEach(el => el.style.width = '90%');
        //toolbar-container-right
        document.querySelectorAll('div.toolbar-container-right').forEach(el => el.remove());
        //toolbar-menus
        document.querySelectorAll('ul.toolbar-menus').forEach(el => el.remove());

        // 将id为mainBox的div标签的margin-right设置为0
        const mainBox = document.querySelector('div#mainBox');
        if (mainBox) {
            mainBox.style.marginRight = '0';
            mainBox.style.width = '76%';
        }

        document.querySelectorAll('div.blog-content-box').forEach((e) => {
            e.style.paddingBottom = '88px';
        });


        // 删除登录提示框
        document.querySelectorAll('div.passport-login-container').forEach(el => el.remove());
    };

    // 创建一个观察器实例并传入回调函数
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                removeElements();
            }
        });
    });

    // 用所需的配置选项来配置观察器
    const config = { childList: true, subtree: true };

    // 选择需要观察的节点
    const targetNode = document.body;

    // 开始观察已选择节点的更改
    observer.observe(targetNode, config);

    // 初次执行，清理页面
    removeElements();
})();
