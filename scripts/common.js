(function () {
  let currentLang = localStorage.getItem('site-lang') || 'ja';
  const langListeners = [];

  function getLinks(page) {
    const isIndex = page === 'index';
    return {
      bio: 'index.html#bio',
      products: 'products.html',
      links: isIndex ? '#links' : 'index.html#links',
      achievements: isIndex ? '#achievements' : 'index.html#achievements'
    };
  }

  function renderHeader(page) {
    const header = document.getElementById('site-header') || document.querySelector('header');
    if (!header) return;

    const links = getLinks(page);
    header.innerHTML = `
      <div class="header-right-tools">
        <button id="lang-toggle" class="lang-toggle" type="button">EN</button>
        <div class="header-quick-links" aria-label="主要ページへの移動">
          <a class="header-quick-link" href="${links.bio}">
            <strong data-ja="Bio" data-en="Bio">Bio</strong>
          </a>
          <a class="header-quick-link" href="${links.products}">
            <strong data-ja="Products" data-en="Products">Products</strong>
          </a>
          <a class="header-quick-link" href="${links.links}">
            <strong data-ja="Links" data-en="Links">Links</strong>
          </a>
          <a class="header-quick-link" href="${links.achievements}">
            <strong data-ja="Achievements" data-en="Achievements">Achievements</strong>
          </a>
        </div>
      </div>
      <h1 data-ja="古賀 荘翠 / Sosui Koga" data-en="Sosui Koga / 古賀 荘翠">古賀 荘翠 / Sosui Koga</h1>
      <p class="subtitle" data-ja="Researcher / Creator" data-en="Researcher / Creator">Researcher / Creator</p>
    `;
  }

  function renderProfile() {
    const profile = document.getElementById('profile-hero');
    if (!profile) return;

    profile.classList.add('profile-hero');
    profile.innerHTML = `
      <img class="profile-image" src="public/face2.png" alt="プロフィール画像">
      <div class="profile-summary">
        <p data-ja="奈良先端科学技術大学院大学 情報理工学領域 博士後期課程 1年" data-en="Ph.D. student (1st year), Division of Information Science, NAIST">奈良先端科学技術大学院大学 情報理工学領域 博士後期課程 1年</p>
        <p data-ja="光メディアインタフェース研究室 所属" data-en="Affiliation: Optical Media Interface Lab">光メディアインタフェース研究室 所属</p>
      </div>
    `;
  }

  function applyLanguage() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-ja][data-en]').forEach((el) => {
      el.textContent = currentLang === 'en' ? el.dataset.en : el.dataset.ja;
    });

    const button = document.getElementById('lang-toggle');
    if (button) {
      button.textContent = currentLang === 'en' ? '日本語' : 'EN';
    }

    langListeners.forEach((listener) => listener(currentLang));
  }

  function toggleLanguage() {
    currentLang = currentLang === 'ja' ? 'en' : 'ja';
    localStorage.setItem('site-lang', currentLang);
    applyLanguage();
  }

  function init(page) {
    renderHeader(page);
    renderProfile();

    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
      toggle.addEventListener('click', toggleLanguage);
    }

    applyLanguage();
  }

  function onLanguageChange(listener) {
    langListeners.push(listener);
  }

  window.SiteCommon = {
    init,
    applyLanguage,
    onLanguageChange,
    getCurrentLang: () => currentLang
  };
})();
