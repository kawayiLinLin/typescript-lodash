const path = require("path")
const fs = require("fs")

const nav = [
  { text: "首页", link: "/" },
  { text: "指南", link: "/guide/介绍.html" },
  { text: "文档", link: "/document/1.number.html" },
  {
    text: "原理",
    link: "https://yzl.xyz/lin/2022/01/%E6%8E%A5%E8%BF%91%E5%A4%A9%E8%8A%B1%E6%9D%BF%E7%9A%84TS%E7%B1%BB%E5%9E%8B%E4%BD%93%E6%93%8D-%E7%9C%8B%E6%87%82%E4%BD%A0%E5%B0%B1%E8%83%BD%E7%8E%A9%E8%BD%ACTS%E4%BA%86/c7c8c77c59d1.html",
    target: "_blank",
  },
  {
    text: "npm",
    link: "https://www.npmjs.com/package/typescript-lodash",
    target: "_blank",
  },
  {
    text: "github",
    link: "https://github.com/kawayiLinLin/typescript-lodash",
    target: "_blank",
  },
]

let sideBarConfigArr = []
function generateSideBar(pathline, sideBarConfig, url, item) {
  // 获取路径下的所有文件和文件夹名称
  let mdDirs = fs.readdirSync(pathline)
  const hasReadme = mdDirs.some((e) => e.includes("README"))
  mdDirs = mdDirs.filter((dir) => !dir.startsWith("."))

  // 如果当前目录没有readme 需要删掉父级path属性
  if (!hasReadme) {
    delete item.path
  }

  // 遍历
  mdDirs.forEach((dir) => {
    // 获取当前文件或文件夹路径
    const fullpath = path.resolve(pathline, dir)
    const stats = fs.statSync(fullpath)

    // 如果是文件夹继续递归
    if (stats.isDirectory()) {
      const item = {
        title: dir,
        path: `${url}/${dir}/`.replace(/\/+/g, "/"),
        children: [],
      }
      generateSideBar(
        path.resolve(pathline, dir),
        item.children,
        `${url}/${dir}/`.replace(/\/+/g, "/"),
        item
      )
      sideBarConfig.push(item)
      // 如果是个文件
    } else if (stats.isFile()) {
      // 如果是readme
      if (dir.includes("README")) {
        // sideBarConfig.push(url)
      } else {
        sideBarConfig.push(`${url}/${dir}`.replace(/\/+/g, "/"))
      }
    }
  })
}
generateSideBar(
  path.resolve(__dirname, "../../documents"),
  sideBarConfigArr,
  ""
)

// 单独处理最顶层分类
sideBarConfigArr = sideBarConfigArr.reduce(
  (config, item) => ((config[item.path] = item.children), config),
  {}
)

module.exports = {
  sidebar: sideBarConfigArr,
  nav,
}
