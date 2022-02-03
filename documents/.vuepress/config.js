const package = require('../../package.json')

module.exports = {
  title: "TypeScript-Lodash",
  description: "TypeScript 的工具类型集合",
  base: `/${package.name}/`,
  dest: './docs',
  evergreen: true,
  themeConfig: {
    lastUpdated: '最后更新时间',
    sidebar: require('./sidebar').sidebar,
    nav: require('./sidebar').nav,
    displayAllHeaders: true
  },
}

