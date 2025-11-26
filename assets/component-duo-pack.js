if (!customElements.get('product-duo')) {
  class ProductDuo extends HTMLElement {
    constructor() {
      super()

      this.input = this.querySelector('input[name*=id]');
      this.bundleInput = this.querySelector('input[name*=_subscription_bundle_id]');
      this.quantityInputs = Array.from(this.querySelectorAll('input[name*=quantity]'));
      
      this.variantPicker = this.querySelector('variant-picker');
      this.productForm = this.closest('product-form');
      this.subscriptionForm = this.productForm?.querySelector('subscription-form') || null;
      this.defaultSelector = this.classList.contains('product-step--onetime-first') ? 'onetime' : 'subscription';

      if (!this.variantPicker || !this.input) return

      this.variantPicker.addEventListener('change', this.changeHandler.bind(this))
      this.quantityInputs.forEach(input => input.addEventListener('change', this.onQuantityChange.bind(this)))

      this.updateSubscriptionForm(this.defaultSelector == 'subscription' ? 1 : 0);
    }

    changeHandler(){
      this.input.value = this.variantPicker.getSelectedVariant()?.id
    }

    onQuantityChange(event) {
      const quantity = event.target?.value;
      if (typeof quantity === 'undefined') return;

      this.updateSubscriptionForm(+quantity)
    }

    updateSubscriptionForm(quantity) {
      if (!this.subscriptionForm) return;

      const quantityLabel = this.subscriptionForm.querySelector('.opt-info__item .js-quantity');
      const quantityInput = this.subscriptionForm.querySelector('[name="items[0][quantity]"]');

      quantityLabel.innerHTML = quantity + 1;
      quantityInput.value = quantity + 1;

      if (purchaseOptions) {
        purchaseOptions.quantity = quantity + 1;
        window.dispatchEvent(new CustomEvent('on:price:changed'));
      }
    }

  }
  customElements.define('product-duo', ProductDuo);
}
