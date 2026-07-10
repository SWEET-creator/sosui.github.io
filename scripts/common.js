(function () {
  let currentLang = localStorage.getItem('site-lang') || 'ja';
  const langListeners = [];

  function getLinks(page) {
    return {
      research: 'index.html',
      products: 'products.html',
      arts: 'Arts.html'
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
          <a class="header-quick-link" href="${links.research}">
            <strong data-ja="Research" data-en="Research">Research</strong>
          </a>
          <a class="header-quick-link" href="${links.products}">
            <strong data-ja="Products" data-en="Products">Products</strong>
          </a>
          <a class="header-quick-link" href="${links.arts}">
            <strong data-ja="Arts" data-en="Arts">Arts</strong>
          </a>
        </div>
      </div>
      <h1 data-ja="古賀 荘翠 / Sosui Koga" data-en="Sosui Koga / 古賀 荘翠">古賀 荘翠 / Sosui Koga</h1>
      <p class="subtitle" data-ja="Researcher / Creator" data-en="Researcher / Creator">Researcher / Creator</p>
    `;
  }

  function renderProfile(page) {
    const profile = document.getElementById('profile-hero');
    if (!profile) return;

    const profileImages = {
      index: 'public/SosuiKoga_Research.png',
      products: 'public/SosuiKoga_Products.png',
      arts: 'public/SosuiKoga_Arts.png'
    };
    const profileImage = profileImages[page] || profileImages.index;
    const profileDetails = {
      index: [
        ['奈良先端科学技術大学院大学 情報理工学領域 博士後期課程', 'Ph.D. student, Division of Information Science, NAIST'],
        ['光メディアインタフェース研究室 所属', 'Affiliation: Optical Media Interface Lab']
      ],
      products: [
        ['画像認識、生成モデル、Web、センシング、ロボティクスを用いて、研究上のアイデアや身近な課題を実際に動くシステムへと変化させる', 'I transform research ideas and everyday challenges into functional systems by leveraging image recognition, generative models, web technologies, sensing, and robotics.']
      ],
      arts: [
        ['主観的な美しさと好みによって創られるものたちの場所', 'I create works using video, generative systems, and interactive media, exploring the boundaries between computation, biology, machines, and matter.']
      ]
    };
    const details = profileDetails[page] || profileDetails.index;

    profile.classList.add('profile-hero');
    profile.innerHTML = `
      <img class="profile-image" src="${profileImage}" alt="Sosui Koga">
      <div class="profile-summary">
        ${details.map(([ja, en]) => `<p data-ja="${ja}" data-en="${en}">${ja}</p>`).join('')}
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
    renderProfile(page);

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
