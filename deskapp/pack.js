const packager = require('electron-packager')
const serialHooks = require('electron-packager/hooks').serialHooks
/*
buildPath（字符串）：将应用程序复制到的临时文件夹的路径
electronVersion（字符串）：您打包的电子版本
platform（字符串）：您打包的目标平台
arch（字符串）：您打包的目标体系结构
callback（功能）：完成操作后必须调用
 */ 

packager({
  // ...
  afterCopy: [serialHooks([
    ('','1.0.5','win32','x64') => {
      setTimeout(() => {
        console.log('first function')
      }, 1000)
    }
  ])],
  // ...
})