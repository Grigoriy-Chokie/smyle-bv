if (!customElements.get('product-bundles')) {
  class ProductBundles extends HTMLElement {
    constructor() {
      super();

      this.productForm = this.closest('.product-form');
      this.buyButtons = this.productForm?.querySelector('buy-buttons') || null;
      this.idInput = this.buyButtons?.querySelector('input[name="id"]') || this.buyButtons?.querySelector('input[name="items[0][id]"]') || null;
    }

    setVariantId(id) {
      if (!this.idInput || !id) return;

      this.idInput.value = id;
    }
  }

  customElements.define('product-bundles', ProductBundles)
}

if (!customElements.get('bundle-product')) {
  class BundleProduct extends HTMLElement {
    constructor() {
      super();

      this.productBundles = this.closest('product-bundles') || null;
      this.bundleId = this.dataset.bundleId;
      this.bundleInput = this.querySelector('input[name="bundle"]');
      this.bundleOptionInputs = this.querySelectorAll('input.bundle-option.js-option');

      this.bundles = window.purchaseOptions?.bundles || null;
      this.isDefaultProduct = this.bundleId == 'default';
      this.bundleOptions = this.bundles?.[this.bundleId] || null;

      this.variantPicker = document.querySelector(`variant-picker[data-form-id="${this.dataset.formId}"]`)

      this.variantPicker?.addEventListener('on:variant:change', this.handleVariantChange.bind(this));
    }

    connectedCallback() {
      if (!this.productBundles) return;
      
      this.attachEventListeners();
      this.onDefaultProductVariantChange();
    }

    handleVariantChange(event){
      this.featuredImgaElement = this.featuredImgaElement || this.querySelector('[data-featured-image] img')

      if(!this.featuredImgaElement || !event.detail.variant?.featured_image?.src) return

      this.featuredImgaElement.srcset = ''
      this.featuredImgaElement.src = event.detail.variant?.featured_image?.src
    }

    attachEventListeners() {
      document.addEventListener('on:variant:change', this.onDefaultProductVariantChange.bind(this));
      this.bundleInput?.addEventListener('click', this.onBundleInputClick.bind(this));
      this.bundleOptionInputs.forEach(optionInput => {optionInput.addEventListener('click', this.onBundleOptionInputClick.bind(this))});
    }

    onBundleInputClick() {
      if (!this.bundles) return;

      const bundleVariantId = this.getVariantId(this.isDefaultProduct);      
      if (!bundleVariantId) return;

      this.productBundles.setVariantId(bundleVariantId);
      purchaseOptions.is_bundle = !this.isDefaultProduct;
      purchaseOptions.current_bundle_id = this.bundleId;
    }

    onBundleOptionInputClick(event) {
      const optionPosition = event.target.dataset.optionPosition;
      const value = event.target.value;

      this.setBundleOption(optionPosition, value);
      this.bundleInput?.click();
    }

    onDefaultProductVariantChange(event) {
      const { variant } = event?.detail || window.purchaseOptions;
      if (!variant || this.isDefaultProduct) return;

      const { option1 , option2, option3 } = variant;
      if (option1 != null) this.bundleOptions.option1 = option1
      if (option2 != null) this.bundleOptions.option2 = option2
      if (option3 != null) this.bundleOptions.option3 = option3

      this.setCurrentBundleVariant();

      const isCurrentBundle = purchaseOptions.is_bundle && purchaseOptions.current_bundle_id == this.bundleId
      if (isCurrentBundle) {
        const bundleVariantId = this.getVariantId(this.isDefaultProduct);
        if (bundleVariantId) this.productBundles.setVariantId(bundleVariantId);
      }
    }

    getVariantId(isDefaultProduct) {
      if (isDefaultProduct) return purchaseOptions?.variant?.id || null;
      
      return this.bundleOptions?.current_variant?.id || null;
    }

    setBundleOption(optionPosition, value) {
      if (!optionPosition || !value) return;
      
      const key = 'option' + optionPosition;
      this.bundleOptions[key] = value;

      this.setCurrentBundleVariant();
    }

    setCurrentBundleVariant() {
      if (!this.bundleOptions) return;

      const { option1 , option2, option3, product } = this.bundleOptions;
      const { variants } = product;

      if (variants.length === 1) {
        this.bundleOptions.current_variant = variants[0];
        return;
      }

      this.bundleOptions.current_variant = variants.find(variant =>
        variant.option1 === option1 &&
        (variant.option2 === option2 || option2 === null) &&
        (variant.option3 === option3 || option3 === null)
      ) ?? null;

      this.updatePrices();
    }

    updatePrices() {
      const variant = this.bundleOptions?.current_variant;
      if (!variant?.price) return;

      const { price, compare_at_price } = variant;
      const discountPercent = compare_at_price > price ? Math.round((compare_at_price - price) * 100 / compare_at_price)  : 0
  
      const originalPriceElement = this.querySelector('[data-bundle-original-price]');
      const discountedPriceElement = this.querySelector('[data-bundle-discounted-price]');
      const discountPercentBadges = this.querySelectorAll('[data-bundle-discount-percent] > span');

      if (discountedPriceElement) {
        discountedPriceElement.innerText = window.Shopify.formatMoney(price);
      }

      if (originalPriceElement) {
        originalPriceElement.innerText = compare_at_price > 0 ? window.Shopify.formatMoney(compare_at_price) : '';
      }

      discountPercentBadges.forEach(discountPercentBadge => {
        discountPercentBadge.innerText = discountPercent > 0 ? discountPercent : '';
      })
    }
  }

  customElements.define('bundle-product', BundleProduct)
}