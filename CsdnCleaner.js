// ==UserScript==
// @name         remake csdn
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  简化csdn; 免登录；去广告；启用复制；界面简化;启用复制
// @author       tom
// @match        https://blog.csdn.net/*
// @match        https://*.blog.csdn.net/*

// @icon         https://www.google.com/s2/favicons?sz=64&domain=csdn.net
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    const selectors = [
        'div.recommendAdBox',
        'div.passport-login-tip-container',
        '#recommendAdBox',
        '#footerRightAds',
        '#blogColumnPayAdvert',
        'div.kind_person',
        'div.toolbar-advert',
        'div.csdn-side-toolbar',
        'div#toolBarBox',
        'div.preview-wrapper.view',
        'div.toolbar-container-right',
        'ul.toolbar-menus',
        'div.passport-login-container',
        'div.aside-box:not(.groupfile)',
        'div.hide-preCode-box',
        'aside.blog_container_aside',
        'div.programmer1Box'
    ];
    const styles = `
        main {
            width: 90% !important;
        }
        div#mainBox {
            margin-right: 0 !important;
            width: 76% !important;
        }
        div.blog-content-box {
            padding-bottom: 88px !important;
        }
        div#rightAside{
            margin-left:10px;
            width: 210px;
        }
    `;
    const removeElements = (selectors) => {
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => el.remove());
        });
    };
    const addStyles = (styles) => {
        const style = document.createElement('style');
        style.textContent = styles;
        document.head.append(style);
    };
    const updateCodePreElement = () => {
        // 获取所有 name 属性为 "code" 的 pre 元素
        const codePreElements = document.querySelectorAll('pre[name="code"]') || [];
        const codePreElements2 = document.querySelectorAll('pre.prettyprint') || [];
        const mergedArray = [...codePreElements, ...codePreElements2];
        // 遍历找到的元素
        mergedArray.forEach(element => {
            // 移除 set-code-hide 类（如果存在）
            element.classList.remove('set-code-hide');

            // 添加 set-code-show 类（如果不存在）
            if (!element.classList.contains('set-code-show')) {
                element.classList.add('set-code-show');
            }
        });

    };
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                removeElements(selectors);
                updateCodePreElement();
                document.querySelectorAll("#content_views").forEach(el => {el.id = "fakedId"});

                document.querySelectorAll('.hljs-button.signin.active').forEach(el => {
                    el.setAttribute('data-title', '复制');
                    el.addEventListener('click', function() {
                        // 获取元素的父元素
                        let parentElement = el.parentElement;
                        // 获取父元素下所有的子节点
                        let childNodes = parentElement.childNodes;
                        // 初始化一个空字符串用于拼接所有子元素的innerText
                        let result = '';
                        // 遍历所有的子节点
                        for (let i = 0; i < childNodes.length; i++) {
                            // 如果是文本节点，拼接其nodeValue
                            if (childNodes[i].nodeType === Node.TEXT_NODE) {
                                result += childNodes[i].nodeValue;
                            } else {
                                result += childNodes[i].innerText;
                            }
                        }
                        // 输出最终的字符串
                        navigator.clipboard.writeText(result);
                    });
                });
            }
        });
    });
    document.addEventListener('keydown', function(e) {
        // 检查是否按下了command/control + c
        if ((e.metaKey || e.ctrlKey) && e.keyCode == 67) {
            e.preventDefault();
            let selectedText = window.getSelection().toString();
            navigator.clipboard.writeText(selectedText)
                .then(() => {
                console.log('复制成功！');
            })
                .catch(err => {
                console.log('复制失败: ', err);
            });
        }
    });


    const config = { childList: true, subtree: true };
    const targetNode = document.body;
    observer.observe(targetNode, config);
    removeElements(selectors);
    updateCodePreElement();
    addStyles(styles);
})();
