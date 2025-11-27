(() => {
  const formatMoney = (value) => {
    if (typeof Shopify !== 'undefined' && Shopify.formatMoney) {
      return Shopify.formatMoney(value);
    }

    return (Number(value) / 100).toFixed(2);
  };

  class UpsellVariantCard {
    constructor(card) {
      this.card = card;
      this.variants = this.parseVariants(card.dataset.variants);
      this.checkbox = card.querySelector('.upsell-card__checkbox');
      this.sellingPlanInput = card.querySelector('.upsell-card__selling-plan');
      this.priceEl = card.querySelector('[data-upsell-price]');
      this.compareEl = card.querySelector('[data-upsell-compare-at]');
      this.discountEls = card.querySelectorAll('[data-upsell-discount]');
      this.optionInputs = card.querySelectorAll('input.bundle-option');
      this.imageEl = card.querySelector('[data-upsell-image]');
      this.currentVariant = null;

      this.attachEvents();
      this.applyVariant(this.getCurrentVariant());
      this.toggleSellingPlan();
    }

    parseVariants(data) {
      try {
        return JSON.parse(data) || [];
      } catch (err) {
        console.warn('Upsell variants: unable to parse variants json', err);
        return [];
      }
    }

    attachEvents() {
      this.optionInputs.forEach((input) => {
        input.addEventListener('change', () => this.onOptionChange());
      });

      this.checkbox?.addEventListener('change', () => this.toggleSellingPlan());
    }

    getSelectedOptions() {
      const selected = {};
      this.optionInputs.forEach((input) => {
        if (input.checked) {
          const position = input.dataset.optionPosition;
          selected[`option${position}`] = input.value;
        }
      });

      return selected;
    }

    getCurrentVariant() {
      if (!this.variants.length) return null;

      const selected = this.getSelectedOptions();
      const hasSelections = Object.keys(selected).length > 0;

      if (!hasSelections) {
        return this.variants.find((variant) => variant.available) || this.variants[0];
      }

      return this.variants.find(
        (variant) =>
          (!selected.option1 || variant.option1 === selected.option1) &&
          (!selected.option2 || variant.option2 === selected.option2) &&
          (!selected.option3 || variant.option3 === selected.option3),
      ) || null;
    }

    onOptionChange() {
      this.applyVariant(this.getCurrentVariant());
    }

    applyVariant(variant) {
      this.currentVariant = variant;

      if (!variant) {
        this.disableCard();
        return;
      }

      if (this.checkbox) {
        this.checkbox.value = variant.id;
        this.checkbox.disabled = !variant.available;

        if (!variant.available) {
          this.checkbox.checked = false;
        }
      }

      this.updatePrices(variant);
      this.updateImage(variant);
      this.updateSellingPlanValue(variant);
      this.toggleSellingPlan();
    }

    disableCard() {
      if (this.checkbox) {
        this.checkbox.checked = false;
        this.checkbox.disabled = true;
      }

      if (this.priceEl) {
        this.priceEl.textContent = theme?.strings?.noVariant || '';
      }

      if (this.compareEl) {
        this.compareEl.textContent = '';
      }

      this.updateSellingPlanValue(null);
      this.updateDiscount(0);
      this.toggleSellingPlan();
    }

    updatePrices(variant) {
      if (this.priceEl) {
        this.priceEl.innerHTML = formatMoney(variant.price || 0);
      }

      if (this.compareEl) {
        const showCompare = variant.compare_at_price > variant.price;
        this.compareEl.innerHTML = showCompare ? formatMoney(variant.compare_at_price) : '';
      }

      const percent =
        variant.compare_at_price > variant.price && variant.compare_at_price
          ? Math.round(((variant.compare_at_price - variant.price) * 100) / variant.compare_at_price)
          : 0;

      this.updateDiscount(percent);
    }

    updateDiscount(percent) {
      this.discountEls.forEach((el) => {
        el.textContent = percent > 0 ? `${percent}%` : '';
      });
    }

    updateImage(variant) {
      if (!this.imageEl) return;

      const newSrc = variant?.featured_image?.src || variant?.image?.src;
      if (newSrc) {
        this.imageEl.src = newSrc;
        this.imageEl.srcset = '';
      }
    }

    updateSellingPlanValue(variant) {
      if (!this.sellingPlanInput) return;

      const planId = variant?.selling_plan_allocations?.[0]?.selling_plan?.id || '';
      this.sellingPlanInput.value = planId;
      if (!planId) {
        this.sellingPlanInput.disabled = true;
      }
    }

    toggleSellingPlan() {
      if (!this.sellingPlanInput) return;

      const shouldEnable =
        this.checkbox?.checked &&
        this.currentVariant?.requires_selling_plan &&
        this.sellingPlanInput.value !== '';

      this.sellingPlanInput.disabled = !shouldEnable;
    }
  }

  function initUpsellVariantCards() {
    const upsellCards = document.querySelectorAll('.upsells-multiselect--variants [data-upsell-card]');
    upsellCards.forEach((card) => new UpsellVariantCard(card));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUpsellVariantCards);
  } else {
    initUpsellVariantCards();
  }
})();
