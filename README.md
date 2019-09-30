# 20190930-RWD-Table-to-SVG
Demonstrate table layout with SVG in RWD

- Demo: https://pulipulichen.github.io/20190930-RWD-Table-to-SVG/table.html
- Demo in different size: https://pulipulichen.github.io/20190930-RWD-Table-to-SVG/

----

# Install

````html
<script src="https://pulipulichen.github.io/20190930-RWD-Table-to-SVG/table-thumbnail-rwd.js"></script>
````

# Usage

````js
$(() => {
  $('table').each((i, table) => {
    TableThumbnailRWD(table, {
      // options...
    })
  })
})
````

# Options

````
TableThumbnailRWD(table, {
  showThumbnailWidthPX: 640,
  thumbnailMinWidth: '800px',
  thumbnailTitle: 'Open table in new window',
  popupCssURL: '//pulipulichen.github.io/20190930-RWD-Table-to-SVG/popup.css'
})
````

----

# Resources

- Icon: https://findicons.com/icon/263276/table2