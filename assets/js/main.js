let doc_id = $('body').attr('id')
load_data = () => {
  switch(doc_id) {
    case 'product-data' :
      loadProduct();
      break;
  }
}

load_data();

deleteRecord = (id) => {
  let doc_id = $('body').attr('id')
  let table
  switch (doc_id) {
      case 'product-data':
          table='products'
          break;
      case 'buyer-data':
          table='buyers'
          break
  }
  let sql = `delete from ${table} where id = ${id}`
  db.run(sql, err => {
      if(err) {
          console.log(err)
      } else {
          let page_number = $('#page_number').val()
          let total_row_displayed = $('#row_per_page').val()
          let searchVal = $('#search-data').val()
          load_data(page_number, total_row_displayed, searchVal)
      }
  })
}

deleteAllRecords = () => {
  let doc_id = $('body').attr('id')
  let table
  switch (doc_id) {
      case 'product-data':
          table = 'products';
          break;
      case 'buyer-data':
          table='buyers'
          break
  }

  let sql = `delete from ${table}`
  db.run(sql, err => {
      if(err) {
          console.log(err)
      } else {
          let page_number = $('#page_number').val()
          let total_row_displayed = $('#row_per_page').val()
          let searchVal = $('#search-data').val()
          load_data(page_number, total_row_displayed, searchVal)
      }
  })
}

deleteMultipleRecords = (ids) => {
  let doc_id = $('body').attr('id')
  let table
  switch (doc_id) {
      case 'product-data':
          table = 'products';
          break;
      case 'buyer-data':
          table='buyers'
          break
  }
  let sql = `delete from ${table} where id IN(${ids})`
  db.run(sql, err => {
      if(err) {
          console.log(err)
      } else {
          let page_number = $('#page_number').val()
          let total_row_displayed = $('#row_per_page').val()
          let searchVal = $('#search-data').val()
          load_data(page_number, total_row_displayed, searchVal)
      }
  })
}

//checkbox checked
$('tbody#data').on('click','tr', function() {
  let data_id = $(this).attr('data-id')
  let checkBox = $('input[type="checkbox"]#'+data_id)
  checkBox.prop('checked',!checkBox.prop("checked"))
  $(this).toggleClass('blocked')
})