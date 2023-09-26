

console.log("Pemanggilan IMask.js dilakukan");
let inputPrdPrice = IMask(
  document.getElementById('product_price'),
  {
    mask: 'Rp num',
    blocks: {
      num: {
        mask: Number,
        thousandsSeparator: '.',
        scale: 3,
        radix: ',',
        mapToRadix: ['.'],
        padFractionalZeros: false,
        signed: false
      }
    }
  }
);

let inputPrdCost = IMask(
  document.getElementById('product_cost'),
  {
    mask: 'Rp num',
    blocks: {
      num: {
        mask: Number,
        thousandsSeparator: '.',
        scale: 3,
        radix: ',',
        mapToRadix: ['.'],
        padFractionalZeros: false,
        signed: false
      }
    }
  }
);


function loadProduct() {
  let query = `select * from products`
  db.serialize( () => {
    db.all(query, (err, rows) => {
      if (err) throw err
      let tr = ''
      if (rows.length < 1) {
        tr += ''
      } else {
        rows.forEach( (row) => {
          tr += `<tr data-id=${row.id}>
          <td>${row.id}</td>
          <td>${row.product_name}</td>
          <td>${row.product_code}</td>
          <td>${row.barcode}</td>
          <td>${row.category}</td>
          <td>${row.unit}</td>
          <td>${row.selling_price}</td>
          <td>${row.cost_of_product}</td>
          <td>${row.product_initial_qty}</td>
          <td>
            <button class="btn btn-sm btn-light btn-light-bordered"><i class="fa fa-edit"></i></button>
            <button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i></button>
          </td>
          
          </tr>`
        })
      }
      $('tbody#data').html(tr)
    })
  })
}

blankForm = () => {
  $('#product_name').val("")
  $('#product_barsode').val("")
  $('#product_price').val("")
  $('#product_cost').val("")
  $('#product_initial_qty').val("")
}

insertProduct = () => {
  let prd_name = $('#product_name').val()
  let prd_barcode = $('#product_barcode').val()
  let prd_category = $('#product_category').val()
  let prd_price = $('#product_price').val()
  let prd_init_qty = $('#product_initial_qty').val()
  let prd_cost = $('#product_cost').val()
  let prd_unit = $('#product_unit').val()

  let required = $('[required]')
  let required_array = []
  required.each(function () {
    if($(this).val() != "") {
      required_array.push($(this).val())
    }
  })

  if(required_array.length < 4) {
    dialog.showMessageBox({
      title: 'Alert',
      type: 'info',
      message: 'Nama produk, Harga jual, Harga pokok, dan Satuan harus diisi'
    })
  } else if(parseInt(prd_price) < parseInt(prd_cost)) {
    dialog.showMessageBox({
      title: 'Alert',
      type: 'info',
      message: 'Harga jual lebih kecil dari pada harga pokok'
    })
  } else {
    db.serialize( () => {
      db.run(`insert into products(product_name, barcode, category, selling_price, cost_of_product, product_initial_qty, unit) values('${prd_name}','${prd_barcode}','${prd_category}','${prd_price}','${prd_cost}','${prd_init_qty}','${prd_unit}')`, err => {
        if(err) throw err
        blankForm()
        $('#product_name').focus()
        load_data()
      })
    })
  }
}