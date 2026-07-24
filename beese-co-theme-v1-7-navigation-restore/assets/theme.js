document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-site-header]');
  const syncHeaderHeight = () => {
    if (header) document.documentElement.style.setProperty('--beese-header-height', `${header.offsetHeight}px`);
  };
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight, { passive: true });

  const toggle = document.querySelector('[data-mobile-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  let previouslyFocused = null;
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const closeMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    menu.removeAttribute('open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('mobile-menu-open');
    previouslyFocused?.focus();
  };

  const openMenu = () => {
    if (!toggle || !menu) return;
    previouslyFocused = document.activeElement;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    menu.setAttribute('open', '');
    menu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('mobile-menu-open');
    menu.querySelector(focusableSelector)?.focus();
  };

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      if (toggle.getAttribute('aria-expanded') === 'true') closeMenu(); else openMenu();
    });
    menu.querySelectorAll('[data-mobile-close], a').forEach((element) => element.addEventListener('click', closeMenu));
    menu.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [...menu.querySelectorAll(focusableSelector)].filter((element) => element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    window.addEventListener('resize', () => {
      syncHeaderHeight();
      if (window.innerWidth > 990 && toggle.getAttribute('aria-expanded') === 'true') closeMenu();
    }, { passive: true });
  }

  document.querySelectorAll('[data-product-gallery]').forEach((gallery) => {
    const main = gallery.querySelector('[data-main-image]');
    if (!main) return;
    gallery.querySelectorAll('[data-thumb]').forEach((button) => button.addEventListener('click', () => {
      main.style.opacity = '0';
      window.setTimeout(() => {
        main.removeAttribute('srcset');
        main.src = button.dataset.src;
        main.alt = button.dataset.alt || '';
        main.style.opacity = '1';
      }, 120);
      gallery.querySelectorAll('[data-thumb]').forEach((thumb) => thumb.removeAttribute('aria-current'));
      button.setAttribute('aria-current', 'true');
    }));
  });

  document.querySelectorAll('[data-product-root]').forEach((root) => {
    const json = root.querySelector('[data-product-json]');
    const form = root.querySelector('[data-product-form]');
    if (!json || !form) return;

    const product = JSON.parse(json.textContent);
    const idInput = form.querySelector('[data-variant-id]');
    const price = root.querySelector('[data-product-price]');
    const button = form.querySelector('[data-add-button]');
    const label = form.querySelector('[data-add-label]');
    const error = form.querySelector('[data-product-error]');
    const artworkInput = form.querySelector('[data-artwork-upload]');
    const artworkStatus = form.querySelector('[data-artwork-status]');
    const artworkPreview = root.querySelector('[data-artwork-preview]');
    const previewControls = form.querySelector('[data-preview-controls]');
    const sizeControl = form.querySelector('[data-preview-size]');
    const positionControl = form.querySelector('[data-preview-position]');
    const sizeValue = form.querySelector('[data-size-value]');
    const positionValue = form.querySelector('[data-position-value]');
    const sizeProperty = form.querySelector('[data-preview-size-property]');
    const positionProperty = form.querySelector('[data-preview-position-property]');
    const decorationProperty = form.querySelector('[data-preview-decoration]');
    const decorationHelp = form.querySelector('[data-decoration-help]');
    const decorationRule = form.querySelector('[data-decoration-rule]');
    const laserDecoration = form.querySelector('[data-decoration-laser]');
    const fullColorDecoration = form.querySelector('[data-decoration-full-color]');
    const money = (cents) => new Intl.NumberFormat(document.documentElement.lang || 'en-US', { style: 'currency', currency: window.Shopify?.currency?.active || 'USD' }).format(cents / 100);
    const normalize = (value = '') => value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();

    const setError = (message = '') => {
      if (!error) return;
      error.textContent = message;
      error.classList.toggle('is-visible', Boolean(message));
    };

    const getCoverageField = () => [...form.querySelectorAll('[data-option-position]')]
      .find((field) => ['customization area', 'coverage', 'decoration area'].includes(normalize(field.dataset.optionName)));

    const getCoverage = () => normalize(getCoverageField()?.querySelector('input:checked')?.value);

    const selectVariantImage = (variant) => {
      const gallery = root.querySelector('[data-product-gallery]');
      if (!gallery) return;

      const thumbs = [...gallery.querySelectorAll('[data-thumb]')];
      const featuredImage = variant.featured_image || variant.featured_media?.preview_image;
      const imageId = String(featuredImage?.id || variant.featured_media?.id || '');
      const colorField = [...form.querySelectorAll('[data-option-position]')]
        .find((field) => field.dataset.optionName?.includes('color'));
      const color = normalize(colorField?.querySelector('input:checked')?.value);

      const match = thumbs.find((thumb) => imageId && thumb.dataset.imageId === imageId)
        || thumbs.find((thumb) => {
          const alt = normalize(thumb.dataset.alt);
          return color && (alt === color || alt.endsWith(` in ${color}`));
        });

      if (match) {
        match.click();
        return;
      }

      const main = gallery.querySelector('[data-main-image]');
      const imageSrc = featuredImage?.src || featuredImage?.url;
      if (main && imageSrc) {
        main.removeAttribute('srcset');
        main.src = imageSrc;
        main.alt = featuredImage.alt || product.title;
      }
    };

    const updateVariant = () => {
      const selections = [...form.querySelectorAll('[data-option-position]')].map((field) => field.querySelector('input:checked')?.value);
      const variant = product.variants.find((item) => item.options.every((value, index) => value === selections[index]));
      if (!variant) {
        idInput.value = '';
        button.disabled = true;
        label.textContent = 'Unavailable';
        return;
      }
      idInput.value = variant.id;
      if (price) price.textContent = money(variant.price);
      button.disabled = !variant.available;
      label.textContent = variant.available ? 'Add to Cart' : 'Sold Out';
      const url = new URL(window.location.href);
      url.searchParams.set('variant', variant.id);
      window.history.replaceState({}, '', url);
      selectVariantImage(variant);
    };

    const applyDecorationPreview = () => {
      const selected = form.querySelector('[data-decoration-choice] input:checked');
      const value = selected?.value || 'Laser Engraved';
      const isEngraved = value.toLowerCase().includes('laser');
      artworkPreview?.classList.toggle('is-engraved', isEngraved);
      if (decorationProperty) decorationProperty.value = value;
      if (decorationHelp) decorationHelp.textContent = isEngraved
        ? 'Laser engraving previews your uploaded artwork in engraved gray.'
        : 'Full color keeps the original colors from your uploaded artwork.';
    };

    const enforceDecorationRules = () => {
      const isFullWrap = getCoverage().includes('full wrap');

      if (fullColorDecoration) fullColorDecoration.disabled = isFullWrap;
      if (isFullWrap && fullColorDecoration?.checked && laserDecoration) laserDecoration.checked = true;
      if (decorationRule) decorationRule.hidden = !isFullWrap;
      applyDecorationPreview();
    };

    const syncPreviewControls = () => {
      if (sizeControl) {
        const value = `${sizeControl.value}%`;
        if (artworkPreview) artworkPreview.style.width = value;
        if (sizeValue) sizeValue.textContent = value;
        if (sizeProperty) sizeProperty.value = value;
      }
      if (positionControl) {
        const value = `${positionControl.value}%`;
        if (artworkPreview) artworkPreview.style.top = value;
        if (positionValue) positionValue.textContent = value;
        if (positionProperty) positionProperty.value = value;
      }
    };

    form.querySelectorAll('[data-option-position] input').forEach((input) => input.addEventListener('change', () => {
      setError();
      updateVariant();
      enforceDecorationRules();
    }));
    form.querySelector('[data-decoration-choice]')?.addEventListener('change', () => {
      setError();
      applyDecorationPreview();
    });
    updateVariant();
    enforceDecorationRules();
    syncPreviewControls();

    artworkInput?.addEventListener('change', () => {
      setError();
      const file = artworkInput.files?.[0];
      if (!file) {
        artworkPreview?.classList.remove('is-visible');
        previewControls?.classList.remove('is-visible');
        if (artworkStatus) artworkStatus.textContent = '';
        return;
      }
      if (artworkStatus) artworkStatus.textContent = `${file.name} selected.`;
      const previewable = ['image/png', 'image/jpeg', 'image/svg+xml'].includes(file.type);
      if (!previewable) {
        artworkPreview?.classList.remove('is-visible');
        previewControls?.classList.remove('is-visible');
        setError('Your file will be attached to the order, but PDF artwork cannot be shown in the instant preview.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (!artworkPreview) return;
        artworkPreview.src = reader.result;
        artworkPreview.classList.add('is-visible');
        previewControls?.classList.add('is-visible');
        applyDecorationPreview();
      };
      reader.readAsDataURL(file);
    });

    sizeControl?.addEventListener('input', syncPreviewControls);
    positionControl?.addEventListener('input', syncPreviewControls);

    form.addEventListener('submit', (event) => {
      setError();
      const phone = form.querySelector('#Phone');
      const proof = form.querySelector('#Proof');
      const quantity = form.querySelector('input[name="quantity"]');
      const selectedDecoration = form.querySelector('[data-decoration-choice] input:checked')?.value || '';
      const invalidFullWrapCombination = getCoverage().includes('full wrap') && selectedDecoration.toLowerCase().includes('full color');

      if (!idInput?.value) {
        event.preventDefault();
        setError('Choose an available color and customization area before adding this tumbler to your cart.');
        return;
      }
      if (invalidFullWrapCombination) {
        event.preventDefault();
        if (laserDecoration) laserDecoration.checked = true;
        enforceDecorationRules();
        setError('Full wrap is available with laser engraving only. Please review the decoration method and try again.');
        laserDecoration?.focus();
        return;
      }
      if (!quantity || !Number.isInteger(Number(quantity.value)) || Number(quantity.value) < 1) {
        event.preventDefault();
        setError('Enter a whole-number quantity of at least 1.');
        quantity?.focus();
        return;
      }
      if (!phone?.value.trim()) {
        event.preventDefault();
        setError('Enter the mobile number where you want to receive your taped proof.');
        phone?.focus();
        return;
      }
      const phoneDigits = phone.value.replace(/\D/g, '');
      if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        event.preventDefault();
        setError('Enter a valid mobile number, including the area code, for your taped proof.');
        phone.focus();
        return;
      }
      if (!proof?.checked) {
        event.preventDefault();
        setError('Please confirm the taped proof agreement before adding this item to your cart.');
        proof?.focus();
      }
    });
  });

  const shop = document.querySelector('[data-tumbler-shop]');
  if (shop) {
    const links = [...shop.querySelectorAll('[data-tumbler-nav]')];
    const sections = [...shop.querySelectorAll('[data-tumbler-section]')];
    const setActive = (id) => {
      links.forEach((link) => {
        const active = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    };
    links.forEach((link) => link.addEventListener('click', () => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) setActive(target.id);
    }));
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      }, { rootMargin: `calc(var(--beese-header-height, 120px) * -1) 0px -55% 0px`, threshold: [0.05, 0.2, 0.5] });
      sections.forEach((section) => observer.observe(section));
    }
  }

  document.querySelectorAll('.tumbler-shop__nav-sizes a').forEach((link) => {
    link.addEventListener('click', () => link.closest('details')?.removeAttribute('open'));
  });
});