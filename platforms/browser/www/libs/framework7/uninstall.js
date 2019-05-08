  // Uninstall library in application.
  // see main-window-func.js, removeLibraryFromApp

  // 1. Remove all references in index.html
  var indexPath = APP_SETTINGS.getIndexFileFullPath(path)
  var html = FILEUTIL.readFileSync(indexPath)
  var scriptPath = `libs/${lib}/js/${lib}.js`
  var cssPath = `libs/${lib}/css/${lib}.ios.css`
  var cssColorsPath = `libs/${lib}/css/${lib}.ios.colors.css`

  cher = CHEERIO.load(html, { xmlMode: false })
  var element = cher('script').filter(function(i, el) {
        return cher(this).attr('src') === scriptPath
  })
  if (element.length > 0) {
    element.remove()
  }
  var element = cher('link').filter(function(i, el) {
        return cher(this).attr('href') === cssPath
  })
  if (element.length > 0) {
    element.remove()
  }
  var element = cher('link').filter(function(i, el) {
        return cher(this).attr('href') === cssColorsPath
  })
  if (element.length > 0) {
    element.remove()
  }

  FILEUTIL.writeFileSync(indexPath, cher.html())
  LOGGER.log("Removed " + lib + " from " + path)

  // 2. Remove directory libs/libname
  var libPath = PATH.join(APP_SETTINGS.getLibDirFullPath(path), lib)
  FSEXTRA.removeSync(libPath)
