/* global domtoimage */

let readyWidth = []

let TableThumbnailRWD = function (table, options) {
  if (typeof ($) !== 'function') {
    throw 'jQuery is requirement. Please install from https://code.jquery.com'
  }
  if (typeof (domtoimage) !== 'object') {
    throw 'dom-to-image is requirement. Please install from https://github.com/tsayen/dom-to-image'
  }

  if (typeof (table.prop) === 'function') {
    table = table[0]
  }

  let CONFIG = {
    showThumbnailWidthPX: 640,
    thumbnailMinWidth: '800px',
    thumbnailTitle: 'Open table in new window',
    popupCssURL: null
  }

  if (typeof (options) === 'object') {
    for (let key in CONFIG) {
      if (typeof (options[key]) !== 'undefined') {
        CONFIG[key] = options[key]
      }
    }
  }

  let tableClassname = `table-thumbnail-rwd-${CONFIG.showThumbnailWidthPX}`

  // ---------------------------------------------

  let insertCSSRule = () => {
    if (readyWidth.indexOf(tableClassname) > -1) {
      return false
    }

    let css = `.table-thumbnail.${tableClassname} {
  display: none;
  
  cursor: pointer;
  width: 100%;
  height: auto;
}

@media (max-width: ${CONFIG.showThumbnailWidthPX}px) {
  table.table-thumbnail-ready.${tableClassname} {
    display: none;
  }
  
  .table-thumbnail.${tableClassname} {
    display: block;
  }
}`
    // https://dev.to/karataev/set-css-styles-with-javascript-3nl5
    let style = document.createElement('style');
    style.innerHTML = css
    document.head.appendChild(style);

    readyWidth.push(tableClassname)
  }

  let setupTableThumbnail = (table) => {
    table.style.minWidth = CONFIG.thumbnailMinWidth
    domtoimage.toSvg(table)
            .then(function (dataUrl) {
              /*
              var img = new Image();
              img.src = dataUrl;
              let $img = $(img)
              */
              let svg = dataUrl.slice(dataUrl.indexOf('<svg'))
              let $img = $(`<object type="image/svg+xml" data="${svg}"></object>`)
              
              $img.addClass('table-thumbnail')
                      .addClass(tableClassname)
                      .attr('title', CONFIG.thumbnailTitle)
                      .insertAfter(table)
              $img.click(function () {
                let $table = $(this).prev()
                popupTable($table)
              })
              
              $(table).addClass('table-thumbnail-ready')
                      .addClass(tableClassname)
              table.style.minWidth = undefined
            })
            .catch(function (error) {
              console.error('oops, something went wrong!', error);
            });
  }

  let popupTable = ($table) => {
    let win = window.open('', '_blank')
    win.document.title = 'Table: ' + document.title

    let html = $table.prop('outerHTML')
    if (typeof (CONFIG.popupCssURL) === 'string') {
      html = html + `<link href='${CONFIG.popupCssURL}' rel='stylesheet' type='text/css'/>`
    }

    win.document.body.innerHTML = html
  }

  insertCSSRule()
  setupTableThumbnail(table)
}

if (typeof (window) === 'object') {
  window.TableThumbnailRWD = TableThumbnailRWD
}
if (typeof (exports) !== 'undefined') {
  exports.default = TableThumbnailRWD
}
if (typeof (module) !== 'undefined') {
  module.exports = TableThumbnailRWD
}
