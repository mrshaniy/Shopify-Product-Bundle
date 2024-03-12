// Product Bundle Script Start

function frequently_bundle() {
    const data = {
      items: []
    };
  
    for (let i = 1; i <= 15; i++) {
      const checkboxId = `product${i}_chk`;
      if ($(`#${checkboxId}`).is(":checked")) {
        addItemToCart(data, `product${i}_id`, checkboxId);
      }
    }
  
    sendToCart(data);
  
    $(".atc_btn .btn--add-to-cart .btn__text").text('Adding to cart');
    setTimeout(function() {
      $(".atc_btn .btn--add-to-cart .btn__text").text('Add to cart');
    }, 1000);
  }
  
  function addItemToCart(data, productId, checkboxId) {
    const p_id = parseInt($(`#${productId}`).val());
    const p_price = parseFloat($(`#v${p_id}`).attr('data-price'));
    data.items.push({
      quantity: 1,
      id: p_id,
      price: p_price
    });
  }
  
  function sendToCart(data) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/cart/add.js', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(data));
  }
  
  function disableAddToCartButton() {
    $(".atc_btn .btn--add-to-cart").prop('disabled', true);
  }
  
  function enableAddToCartButton() {
    $(".atc_btn .btn--add-to-cart").prop('disabled', false);
  }
  
  function handleCheckboxClick(checkboxId) {
    $(`#${checkboxId}`).click(function() {
      const checked = $(`input[id='${checkboxId}']:checked`).length;
      if (checked > 0) {
        enableAddToCartButton();
      } else {
        disableAddToCartButton();
      }
    });
  }
  
  function handleProductChange(productId, dataId, priceElementId) {
    $(`#${productId}`).change(function() {
      const p_id = $(this).val();
      const p_price = $(`#v${p_id}`).attr('data-price');
      $(dataId).attr('data-price', p_price);
  
      let t_price = 0;
      for (let i = 1; i <= 15; i++) {
        t_price += parseFloat($(`#p_v${i}`).attr('data-price'));
      }
      $("#t_price span").text(t_price.toFixed(2));
    });
  }
  
  // Initialize by disabling the "Add to cart" button.
  disableAddToCartButton();
  
  // Attach event handlers and set initial states
  for (let i = 1; i <= 15; i++) {
    const checkboxId = `product${i}_chk`;
    const productId = `product${i}_id`;
    handleCheckboxClick(checkboxId);
    handleProductChange(productId, `#p_v${i}`, `p_v${i}`);
    $(`#${checkboxId}`).prop('checked', false);
  }
  // Product Bundle Script End
  
  $(document).ready(function () {
    $(".atc_btn .btn.btn--add-to-cart").click(function () {
      setTimeout(function () {
        location.reload();
      }, 1000);
    });
  });  