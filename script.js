/* global domtoimage */

let CONFIG = {
  thumbnailMinWidth: '800px',
  thumbnailTitle: 'Open table in new window',
  popupCssURL: null
}

let init = () => {
  $('table').each((i, table) => {
    setupTableThumbnail(table)
  })
}

let setupTableThumbnail = (table) => {
  table.style.minWidth = CONFIG.thumbnailMinWidth
  domtoimage.toSvg(table)
    .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        let $img = $(img)
        $img.addClass('table-thumbnail')
                .attr('title', CONFIG.thumbnailTitle)
                .insertAfter(table)
        $img.click(function () {
          let $table = $(this).prev()
          popupTable($table)
        })
        $(table).addClass('table-thumbnail-ready')
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
  if (typeof(CONFIG.popupCssURL) === 'string') {
    html = html + + `<link href='${CONFIG.popupCssURL}' rel='stylesheet' type='text/css'/>`
  }

  win.document.body.innerHTML = html
}

// -----------

$(() => {
  init()
})