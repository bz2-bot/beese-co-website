document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-site-header]');
  const syncHeaderHeight = () => {
    if (header) document.documentElement.style.setProperty('--beese-header-height', `${header.offsetHeight}px`);
  };
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight, { passive: true });

  const toggle = document.querySelector('[data-mobile-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const closeMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    menu.removeAttribute('open');
    menu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('mobile-menu-open');
  };
  const openMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    menu.setAttribute('open', '');
    menu.setAttribute('aria-hidden', 'false');
    document.body.classList.add('mobile-menu-open');
    menu.querySelector('a')?.focus();
  };

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      if (toggle.getAttribute('aria-expanded') === 'true') closeMenu(); else openMenu();
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 990) closeMenu();
    }, { passive: true });
  }

  document.querySelectorAll('[data-product-gallery]').forEach((gallery) => {
    const main = gallery.querySelector('[data-main-image]');
    if (!main) return;
    gallery.querySelectorAll('[data-thumb]').forEach((button) => button.addEventListener('click', () => {
      main.style.opacity = '0';
      window.setTimeout(() => {
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
    const money = (cents) => new Intl.NumberFormat(document.documentElement.lang || 'en-US', { style: 'currency', currency: window.Shopify?.currency?.active || 'USD' }).format(cents / 100);

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
    };
    form.querySelectorAll('[data-option-position] input').forEach((input) => input.addEventListener('change', updateVariant));

    const decoration = form.querySelector('[data-decoration-choice]');
    if (decoration) decoration.addEventListener('change', (event) => {
      const val = (event.target.value || '').toLowerCase();
      const gallery = root.querySelector('[data-product-gallery]');
      const match = [...(gallery?.querySelectorAll('[data-thumb]') || [])].find((thumb) => (thumb.dataset.tags || '').toLowerCase().includes(val.includes('full') ? 'full color' : 'laser'));
      if (match) match.click();
    });
  });

  const shop = document.querySelector('[data-tumbler-shop]');
  if (shop) {
    const links = [...shop.querySelectorAll('[data-tumbler-nav]')];
    const sections = [...shop.querySelectorAll('[data-tumbler-section]')];
    const setActive = (id) => {
      links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`));
    };
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] });
      sections.forEach((section) => observer.observe(section));
    }
  }

  document.querySelectorAll('.tumbler-shop__nav-sizes a').forEach((link) => {
    link.addEventListener('click', () => link.closest('details')?.removeAttribute('open'));
  });
});