// ==UserScript==
// @name         GitHub搜索结果黑名单
// @version      1.2
// @description  在 GitHub 搜索结果页面中排除指定用户名、仓库名的搜索结果
// @author       me
// @match        https://github.com/search*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  console.log("开始排除指定用户名的搜索结果");

  function excludeUsers() {
    // 定义要排除的用户名数组
    const excludedUsers = ['cirosantilli'];
    const excludedRepos = [];
    const divElements = document.querySelectorAll('div[data-testid="results-list"] > div');

    // 循环遍历所有直接子 div 元素及其后代元素
    for (let i = 0; i < divElements.length; i++) {
      // 检查后代元素是否包含用户名相关信息
      const userElement = divElements[i].querySelector('span');
      if (userElement) {
        const name = userElement.textContent.trim();
          // 解析用户名和仓库名
        const username = name.split('/')[0];
        const repoName = name.split('/')[1];

        // 如果用户名或仓库名在排除列表中，则隐藏该元素
        if (excludedUsers.includes(username) || excludedRepos.includes(repoName)) {
            console.log("pick it")
          divElements[i].style.display = 'none';
        }
      }
    }
  }

  // 每隔 0.5 秒执行一次 excludeUsers 函数，以应对页面动态加载的情况
  // setInterval(excludeUsers, 1000);

    // 使用MutationObserver监听DOM变化
  const observer = new MutationObserver(excludeUsers);

  // 开始监听
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // 页面加载完成后也执行一次
  document.addEventListener('DOMContentLoaded', excludeUsers);
})();
