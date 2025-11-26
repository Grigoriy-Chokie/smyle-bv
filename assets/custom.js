/**
 * JAVASCRIPT DEVELOPER DOCUMENTATION
 *
 * Symmetry is a powerful and customizable theme designed for large-scale e-commerce stores. Built
 * using Web Components, it offers a highly modular architecture that makes customization and
 * maintenance easier than ever. In addition, Symmetry is optimized for speed, ensuring that your
 * store runs as fast as possible to provide your customers with a seamless shopping experience.
 *
 * If you would like to add your own JS to Symmetry, we recommend using this file and referencing
 * it using Theme Settings > Advanced > Custom HTML.
 *
 * As a brief overview, Symmetry:
 *  - Broadcasts many JS events.
 *  - Is built using Web Components.
 *  - Leverages 'code splitting' for some features.
 *  - Is completely custom built (no JS libraries)
 *  - Has a number of JS utilities.
 *
 *
 *
 * =================================================================================================
 * Custom JavaScript Events
 * =================================================================================================
 *
 * Symmetry broadcasts many custom events for ease of extensibility, detailed in this section.
 *
 * When in the Theme Editor, the details of each custom event will be logged out in the Dev Tools
 * console everytime it is triggered.
 *
 * Events are named in the following convention: ["on/dispatch"]:[subject]:[action] (where
 * 'dispatch' will trigger an event to occur, and 'on' indicates an event has occurred).
 *
 * All 'Return data' detailed in this section is returned within the 'event.detail' object.
 *
 * The available events are:
 *  1.  on:variant:change
 *  2.  on:cart:add
 *  3.  on:cart:error
*   4.  on:cart:after-merge
 *  5.  on:cart-drawer:before-open
 *  6.  on:cart-drawer:after-open
 *  7.  on:cart-drawer:after-close
 *  8.  on:quickbuy:before-open
 *  9.  on:quickbuy:after-open
 *  10. on:quickbuy:after-close
 *  11. dispatch:cart-drawer:open
 *  12. dispatch:cart-drawer:refresh
 *  13. dispatch:cart-drawer:close
 *  14. on:debounced-resize
 *  15. on:breakpoint-change
 *
 * -------------------------------------------------------------------------------------------------
 * 1) on:variant:change
 * -------------------------------------------------------------------------------------------------
 * Fires whenever a variant is selected (e.g. Product page, Quickbuy, Featured Product etc).
 *
 * How to listen:
 * document.addEventListener('on:variant:change', (event) => {
 *  // your code here
 * });
 *
 * Returned data:
 *  - form: the product form content
 *  - variant: the selected variant object
 *  - allVariants: an array of all variants
 *  - selectedOptions: an array of currently selected options (e.g. ['Blue', 'Large'])
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 2) on:cart:add
 * -------------------------------------------------------------------------------------------------
 * Fires when a variant has been added to the cart, where it didn't exist in the cart before. This
 * event does not fire when the added variant was already in the cart.
 *
 * How to listen:
 * document.addEventListener('on:cart:add', (event) => {
 *   // your code here
 * });
 *
 * Returned data:
 *   - variantId: id of the variant that was just added to the cart
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 3) on:cart:error
 * -------------------------------------------------------------------------------------------------
 * Fires when an action related to the cart has failed, for example adding too much quantity of an
 * item to the cart.
 *
 * How to listen:
 * document.addEventListener('on:cart:error', (event) => {
 *   // your code here
 * });
 *
 * Returned data:
 *   - error: the error message
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 4) on:cart:after-merge
 * -------------------------------------------------------------------------------------------------
 * Fires after a list of cart items has finished being dynamically updated after a cart change.
 *
 * How to listen:
 * document.addEventListener('on:cart:after-merge', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 5) on:cart-drawer:before-open
 * -------------------------------------------------------------------------------------------------
 * Fires before the cart drawer opens.
 *
 * How to listen:
 * document.addEventListener('on:cart-drawer:before-open', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 6) on:cart-drawer:after-open
 * -------------------------------------------------------------------------------------------------
 * Fires after the cart drawer has finished opening.
 *
 * How to listen:
 * document.addEventListener('on:cart-drawer:after-open', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 7) on:cart-drawer:after-close
 * -------------------------------------------------------------------------------------------------
 * Fires after the cart drawer has finished closing.
 *
 * How to listen:
 * document.addEventListener('on:cart-drawer:after-close', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 8) on:quickbuy:before-open
 * -------------------------------------------------------------------------------------------------
 * Fires before the quick buy drawer opens.
 *
 * How to listen:
 * document.addEventListener('on:quickbuy:before-open', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 9) on:quickbuy:after-open
 * -------------------------------------------------------------------------------------------------
 * Fires after the quick buy drawer has finished opening.
 *
 * How to listen:
 * document.addEventListener('on:quickbuy:after-open', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 10) on:quickbuy:after-close
 * -------------------------------------------------------------------------------------------------
 * Fires after the quick buy drawer has finished closing.
 *
 * How to listen:
 * document.addEventListener('on:quickbuy:after-close', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 11) dispatch:cart-drawer:open
 * -------------------------------------------------------------------------------------------------
 * Opens the cart drawer (if enabled in the Theme Settings).
 *
 * How to trigger:
 * document.dispatchEvent(new CustomEvent('dispatch:cart-drawer:open'));
 *
 * You can optionally pass in a 'detail' object with a property of 'opener', which specifies the DOM
 * element that should be focussed on when the drawer is closed.
 *
 * Example:
 * document.getElementById('header-search').addEventListener('keydown', (evt) => {
 *   if (evt.keyCode === 67) {
 *     evt.preventDefault();
 *     document.dispatchEvent(new CustomEvent('dispatch:cart-drawer:open', {
 *       detail: {
 *         opener: evt.target
 *       }
 *     }));
 *   }
 * });
 *
 * In this example, we attach a keydown listener to the search input in the header. If the user
 * presses the 'c' key, it prevents the default behavior (which would be to type the letter 'c' in
 * the input) and dispatches the 'dispatch:cart-drawer:open' event with a 'detail' object that
 * specifies the search input as the opener. When the cart drawer is closed, focus is returned to
 * the search input.
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 12) dispatch:cart-drawer:refresh
 * -------------------------------------------------------------------------------------------------
 * Refreshes the contents of the cart drawer.
 *
 * This event is useful when you are adding variants to the cart and would like to instruct the
 * theme to re-render the cart drawer.
 *
 * How to trigger:
 * document.dispatchEvent(new CustomEvent('dispatch:cart-drawer:refresh', {
 *   bubbles: true
 * }));
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 13) dispatch:cart-drawer:close
 * -------------------------------------------------------------------------------------------------
 * Closes the cart drawer.
 *
 * How to trigger:
 * document.dispatchEvent(new CustomEvent('dispatch:cart-drawer:close'));
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 14) on:debounced-resize
 * -------------------------------------------------------------------------------------------------
 * Fires when the viewport finishes resizing (debounced to 300ms by default).
 *
 * How to listen:
 * window.addEventListener('on:debounced-resize', (event) => {
 *   // your code here
 * });
 *
 *
 * -------------------------------------------------------------------------------------------------
 * 15) on:breakpoint-change
 * -------------------------------------------------------------------------------------------------
 * Fires when the breakpoint of the viewport changes.
 *
 * Example:
 * window.addEventListener('on:breakpoint-change', (event) => {
 *  if (theme.mediaMatches.md) {
 *   console.log('we are not on mobile');
 *  }
 * });
 *
 *
 *
 * =================================================================================================
 * Web Components
 * =================================================================================================
 *
 * Symmetry utilizes Web Components to the fullest.
 *
 * Web Components are a set of standardized APIs that allow developers to create custom, reusable
 * HTML elements that can be used across different web pages and applications.
 * Web Components consist of three main technologies: Custom Elements, Shadow DOM and HTML
 * Templates.
 *
 * See Mozilla for more: https://developer.mozilla.org/en-US/docs/Web/Web_Components
 *
 *
 *
 =================================================================================================
 * Third-Party JavaScript Dependencies
 * =================================================================================================
 *
 * Symmetry has no third-party JavaScript dependencies.
 *
 *
 * =================================================================================================
 *
 * Have fun! - The Clean Canvas Development Team.
 */

(function forceReloadOnBackFromCheckout() {
    const navigationEntry = performance.getEntriesByType('navigation')[0];
    const isBackNavigation = navigationEntry?.type === 'back_forward';

    if (isBackNavigation) {
        window.location.reload(true);
    }

    if (document.referrer.includes('/cart')) setTimeout(() => {document.querySelector('cart-drawer')?.open()}, 1000); 
})();

(function validateLocalization () {
    if (window.location.host === 'wesmyle.com') {
        const url = new URL(window.location.href);
        if (url.searchParams.has('country')) {
            url.searchParams.delete('country');
            window.history.replaceState({}, '', url);
        }
    }
})();

 if (!customElements.get('subscription-form')) {
    class SubscriptionForm extends HTMLElement {
        constructor() {
            super();
            this.inputs = Array.from(this.querySelectorAll('input'));
            this.idInputs = Array.from(this.querySelectorAll('[name="items[0][id]"]'));
            this.sellingPlanInputs = Array.from(this.querySelectorAll('[name="selling_plan"]'));
            
            this.productForm = this.closest('product-form');
            this.quantityRules = this.productForm?.querySelector('quantity-rules') || null;
            this.colorQuantitySelector = this.productForm?.querySelector('color-quantity-selector');
            this.productDuo = this.productForm?.querySelector('product-duo');

            this.price = this.querySelector('.option-price');

            this.attachEventListeners();
        }

        attachEventListeners() {
            this.idInputs.forEach(input => {
                input.addEventListener('change', () => this.handleIdInputChange(input));
            });

            this.sellingPlanInputs.forEach(input => {
                input.addEventListener('change', () => this.handleSellingPlanInputChange(input));
            })

            if(!this.price) return
            document.querySelector('variant-picker')?.addEventListener('on:variant:change', this.updatePrice.bind(this));
        }

        handleIdInputChange(input) {
            if (!input) return;

            const isNoSubsButton = input.value === '';
            this.inputs.forEach(input => input.disabled = false);

            const wrapper = input.closest('[data-option]');
            const currentInputs = Array.from(wrapper.querySelectorAll('input'));

            currentInputs.forEach(currentInput => {
                currentInput.checked = true;
                currentInput.disabled = isNoSubsButton;
            });

            if (this.quantityRules) this.quantityRules.quantityTypeSelector = isNoSubsButton ? 'onetime' : 'subscribe'
            if (this.colorQuantitySelector) {
                const quantitySelectors = Array.from(this.colorQuantitySelector.querySelectorAll('quantity-selector'));
                quantitySelectors.forEach(selector => selector.updateInputState())
            }
            if (this.productDuo) {
                const bundleInput = this.productDuo.bundleInput;
                if (bundleInput) bundleInput.disabled = isNoSubsButton;

                const prices = this.productDuo.querySelectorAll('.js-price');
                prices.forEach(price => {
                    const { subscriptionPrice, onetimePrice, compareAtPrice } = price.dataset;
                    if (!subscriptionPrice || !onetimePrice) return;

                    const priceElementCurrent = price.querySelector('.price__current');
                    const priceElementOriginal = price.querySelector('.price__was');
                    const currentPrice = isNoSubsButton ? +onetimePrice : +subscriptionPrice;

                    priceElementCurrent.innerHTML = window.Shopify?.formatMoney(currentPrice);
                    priceElementOriginal.style.display = currentPrice == +compareAtPrice ? 'none' : '';
                })
            }
            if (purchaseOptions) {
                purchaseOptions.purchase_type = isNoSubsButton ? 'onetime' : 'subscription';
                window.dispatchEvent(new CustomEvent('on:price:changed'));
            }
        }

        handleSellingPlanInputChange(input) {
            if (!input) return;

            const isNoSubsButton = input.value === '';
            if (this.quantityRules) this.quantityRules.quantityTypeSelector = isNoSubsButton ? 'onetime' : 'subscribe';
            if (purchaseOptions) {
                purchaseOptions.purchase_type = isNoSubsButton ? 'onetime' : 'subscription';
                window.dispatchEvent(new CustomEvent('on:price:changed'));
            }
        }

        updatePrice(event) {
            this.price.textContent = event.detail.formatted;
        }
    }

    customElements.define('subscription-form', SubscriptionForm);
}

if (!customElements.get('color-quantity-selector')) {
    class ColorQuantitySelector extends HTMLElement {
        constructor() {
            super();

            this.productForm = this.closest('product-form');
            this.subscriptionForm = this.productForm?.querySelector('subscription-form') || null;
            this.buyForm = this.productForm.querySelector(`#${this.productForm.dataset.formId}`) || this.productForm.querySelector('.js-product-form');
            this.stickyATC = document.querySelector('sticky-atc');

            this.addToCartButton = this.buyForm.querySelector('button.add-to-cart');
            this.stickyAddToCartButton = this.stickyATC?.querySelector('button.add-to-cart[type="submit"]');
            this.quantitySelectors = Array.from(this.querySelectorAll('quantity-selector'));

            this.colorLabels = this.querySelectorAll('label.opt-label--swatch');

            this._totalQuantity = 0; 

            this.setSwatchStyleClasses();
        }

        set totalQuantity(quantity) {
            this._totalQuantity = quantity;
            this.updateSubscriptionForm();
            this.toggleATCButtonsState();
            if (purchaseOptions) {
                purchaseOptions.quantity = quantity > 0 ? quantity : 1;
                window.dispatchEvent(new CustomEvent('on:price:changed'));
            }
        }

        connectedCallback() {
            this.disableDefaultIdInput();
            this.toggleATCButtonsState();
            this.addEventListener('quantity:changed', this.onTotalQuantityChange.bind(this))
            this.colorLabels.forEach(label => label.addEventListener('click', this.onColorLabelClick.bind(this)))
        }

        onTotalQuantityChange() {
            const quantity = this.quantitySelectors.reduce((totalQuantity, selector) => totalQuantity += selector.quantity, 0)
            this.totalQuantity = quantity;
        }

        onColorLabelClick(event) {
            const label = event.target;
            const quantitySelector = label.querySelector('quantity-selector');
            if (!quantitySelector) return;

            const quantity = quantitySelector.quantity;
            const isNull = quantity === 0;

            quantitySelector.quantityInput.value = isNull ? 1 : 0;
            quantitySelector.quantity = isNull ? 1 : 0;
        }

        setSwatchStyleClasses() {
            const bodyClassList = document.body.classList;
            
            bodyClassList.forEach(classItem => {
                if (classItem.includes('swatch-style')) bodyClassList.remove(classItem);
            })
            bodyClassList.add('swatch-style-listed');
        }

        disableDefaultIdInput() {
            if (this.buyForm) {
                const idInput = this.buyForm.querySelector('[name="id"]');
                idInput.disabled = true;
            }
        }

        toggleATCButtonsState() {
            const buttons = [this.addToCartButton, this.stickyAddToCartButton];
            buttons.forEach(button => {
                if (!button) return;

                const hasQuantity = this._totalQuantity > 0;
                const enabledText = button.dataset.addToCartText;
                const disabledText = button.dataset.noColorErrorText;
                
                button.disabled = !hasQuantity;
                button.innerHTML = hasQuantity ? enabledText : disabledText;
            })
        }

        updateSubscriptionForm() {
            if (!this.subscriptionForm) return;

            const quantityLabel = this.subscriptionForm.querySelector('.opt-info__item .js-quantity');
            const quantityInput = this.subscriptionForm.querySelector('[name="items[0][quantity]"]');

            if (this._totalQuantity > 0 && quantityLabel) quantityLabel.innerHTML = this._totalQuantity;
            quantityInput.value = this._totalQuantity;
        }
    }

    customElements.define('color-quantity-selector', ColorQuantitySelector)
}

if (!customElements.get('quantity-selector')) {
    class QuantitySelector extends HTMLElement {
        constructor() {
            super();

            this.colorQuantitySelector = this.closest('color-quantity-selector');

            this.quantityInput = this.querySelector("input.quantity-subscribe__selector-input");
            this.quantityButtons = this.querySelectorAll("button.quantity-subscribe__selector-button");

            this.productForm = this.closest('product-form');

            this.idLabel = this.closest('label.opt-label');
            this.bundleInput = this.idLabel.querySelector('input[name*=_subscription_bundle_id]');
            this.kitInput = this.idLabel.querySelector('input[name*=_kit_id]');
            this.idInput = this.idLabel.previousElementSibling;

            this.subscriptionFormBundleInput = document.querySelector('subscription-form input[name*=_subscription_bundle_id]');
            
            this._quantity = 0;
        }

        set quantity(number) {
            this._quantity = number;
            this.updateInputState();
            this.quantityInput.dispatchEvent(new Event("change", { bubbles: true }));
            this.colorQuantitySelector.dispatchEvent(new Event('quantity:changed'));

            const variantId = this.closest('label')?.previousElementSibling?.value
            if(!variantId) return

            document.dispatchEvent(new CustomEvent('sticky-atc:update', {
                detail: {
                    type: number > 0 ? 'add' : 'remove',
                    variantId
                }})
            );
        }

        get quantity() {
            return +this._quantity;
        }

        connectedCallback() {
            this.quantityButtons.forEach(button => button.addEventListener("click", this.onQuantityButtonClick.bind(this, button)))

            this.productForm.addEventListener('on:cart:add', ()=> {
                this.quantityInput.value = 0
                this.quantity = 0
            });
        }

        updateInputState() {
            const isNull = this.quantity === 0; 
            const isSubsFormInputChecked = this.subscriptionFormBundleInput?.checked || false;

            this.idInput.disabled = isNull;
            this.bundleInput.disabled = !isSubsFormInputChecked ? true : isNull;
            this.quantityInput.disabled = isNull;
            if (this.kitInput) this.kitInput.disabled = isNull;
        }

        onQuantityButtonClick(button) {
            const { name } = button;
            if (name === "plus") {
                this.quantityInput.stepUp()
            }
            if (name === "minus") {
                this.quantityInput.stepDown()
            }
            this.quantity = +this.quantityInput.value;
        }
    }

    customElements.define('quantity-selector', QuantitySelector)
}

class LocalizationSelector extends HTMLElement {
    constructor() {
        super();
        this.form = this.closest('form');
        this.inputCountry = this.querySelector('input[name="country_code"]');
        this.inputLanguage = this.querySelector('input[name="locale_code"]');
    }

    connectedCallback() {
        if (this.form && this.inputCountry && this.inputLanguage) {
            this.form.addEventListener('change', this.onInputChange.bind(this));
        }
    }

    onInputChange(event) {
        const selectedValue = event.detail?.selectedValue;
        if (selectedValue) {
            const [countryCode, languageCode] = selectedValue.split('-');
            this.updateInputs(countryCode, languageCode);
            this.handleFormSubmit(countryCode, languageCode);
        }
    }

    updateInputs(countryCode, languageCode) {
        this.inputCountry.value = countryCode;
        this.inputLanguage.value = languageCode;
    }

    handleFormSubmit(countryCode, languageCode) {
        if (window.location.host === 'wesmyle.de') {
            const languagePath = languageCode !== 'en' ? `/${languageCode}` : '';
            window.location.href = `https://wesmyle.com${languagePath}${window.location.pathname}?country=${countryCode}`;
        } else {
            this.form.submit();
        }
    }
}

if (!customElements.get('localization-selector')) {
    customElements.define('localization-selector', LocalizationSelector);
}


if (!customElements.get('delivery-dates')) {
    class DeliveryDates extends HTMLElement {
        constructor() {
            super();

            this.section = this.closest('.js-product');
            this.showOnVariants = this.dataset.showOnVariants || null;

            if (!this.showOnVariants) return;
            this.section?.addEventListener('on:variant:change', this.onVariantChange.bind(this))
        }

        onVariantChange(event) {
            const currentVariant = event.detail?.variant?.title;
            if (!currentVariant) return;

            const isShownForCurrentVariant = [...this.showOnVariants.split(',')].includes(currentVariant);
            this.style.display = isShownForCurrentVariant ? 'block' : 'none';
        }
    }

    customElements.define('delivery-dates', DeliveryDates)
}