const IMAGES = {
  hero: "/images/hero.jpg",   
  about: "/images/about.jpg",  

  services: {
    personalisedGifts: "images/Resin frame.jpg",
    weddingNikkah: "images/nikah_tray.jpg",
    jewellery: "images/jewellery.jpg",
    resinClock: "images/resin_clock.jpg",
    keychains: "images/keychains.jpg",
    customArt: "images/Tray_coaster_cakestand.jpg",
    giftSets: "images/custom_gift.jpg",
    memoryKeepsakes: "images/memoryKeepsakes.jpg"
  },

  featured: {
    1: "/images/nikahTray.jpg",
    2: "/images/keepsake.jpg", 
    3: "/images/personalisedKeychain.jpg", 
    4: "/images/bookmark.jpg", 
    5: "/images/pendant.jpg", 
    6: "/images/custom_gift_set.jpg"  // Custom Gift Set
  },

  gallery: {
    1: "", // Nikkah Resin Tray
    2: "", // Floral Memory Keepsake
    3: "", // Personalised Name Keychain
    4: "", // Pressed Flower Bookmark
    5: "", // Resin Floral Pendant
    6: "", // Custom Gift Set
    7: "", // Bookmark & Pen Gift Set
    8: ""  // Custom Heart Keychain with Names
  },

  instagram: { 1:"", 2:"", 3:"", 4:"", 5:"", 6:"" }
};

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  function mediaHTML(url, caption, ratio) {
    ratio = ratio || '4/5';
    if (url) {
      return '<div class="media" style="--ar:' + ratio + '"><img src="' + url + '" alt="' + caption + '" loading="lazy"></div>';
    }
    return '<div class="media" style="--ar:' + ratio + '" data-caption="' + caption + '"></div>';
  }

  var SERVICES = [
    { key:'personalisedGifts', name:'Personalised Gifts' },
    { key:'weddingNikkah', name:'Wedding & Nikkah Keepsakes' },
    { key:'jewellery', name:'Resin Jewellery' },
    { key:'resinClock', name:'Resin' },
    { key:'keychains', name:'Keychains' },
    { key:'customArt', name:'Custom Resin Art' },
    { key:'giftSets', name:'Gift Sets' },
    { key:'memoryKeepsakes', name:'Memory Keepsakes' }
  ];

  var GALLERY = [
    { id:1, name:'Nikkah Resin Tray', category:'Wedding', desc:'A handcrafted resin tray personalised with names and a wedding date, finished with pressed flowers and pearl trim.' },
    { id:2, name:'Floral Memory Keepsake', category:'Keepsakes', desc:'A pressed-flower keepsake piece designed to hold onto a meaningful moment.' },
    { id:3, name:'Personalised Name Keychain', category:'Personalised', desc:'A custom name or initial, cast in resin with dried florals and gold flake.' },
    { id:4, name:'Pressed Flower Bookmark', category:'Stationery', desc:'A slim resin bookmark layered with real pressed flowers and a short quote.' },
    { id:5, name:'Resin Floral Pendant', category:'Jewellery', desc:'A pendant necklace featuring real dried flowers set in clear resin with a gold-tone chain.' },
    { id:6, name:'Custom Gift Set', category:'Gifts', desc:'A coordinated set — bookmark, pen and keychain — personalised with a name and finished to match.' },
    { id:7, name:'Bookmark & Pen Gift Set', category:'Stationery', desc:'A matching bookmark and pen set, custom-named and gift-ready.' },
    { id:8, name:'Custom Heart Keychain with Names', category:'Personalised', desc:'A heart-shaped keychain personalised with two names, finished in gold and pressed petals.' }
  ];

  var FEATURED_IDS = [1, 2, 3, 4, 5, 6];
  var CATEGORIES = ['All', 'Wedding', 'Personalised', 'Jewellery', 'Gifts', 'Stationery', 'Keepsakes'];
  var state = { filter: 'All' };

  var heroMedia = document.getElementById('heroMedia');
  if (heroMedia) {
    if (IMAGES.hero) heroMedia.innerHTML = '<img src="' + IMAGES.hero + '" alt="Handcrafted resin artwork" loading="lazy">';
    else heroMedia.setAttribute('data-caption', 'Hero — signature resin piece');
  }
  var aboutMedia = document.getElementById('aboutMedia');
  if (aboutMedia) {
    if (IMAGES.about) aboutMedia.innerHTML = '<img src="' + IMAGES.about + '" alt="The artist at work" loading="lazy">';
    else aboutMedia.setAttribute('data-caption', 'Artist photo');
  }

  var servicesGrid = document.getElementById('servicesGrid');
  if (servicesGrid) {
    servicesGrid.innerHTML = SERVICES.map(function (s, i) {
      return (
        '<div class="service-card show" style="animation-delay:' + (i * 50) + 'ms">' +
          mediaHTML(IMAGES.services[s.key], s.name) +
          '<div class="service-overlay"><h3>' + s.name + '</h3></div>' +
        '</div>'
      );
    }).join('');
  }

  var featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) {
    featuredGrid.innerHTML = FEATURED_IDS.map(function (id, i) {
      var item = GALLERY.find(function (g) { return g.id === id; });
      return (
        '<div class="featured-card show" style="animation-delay:' + (i * 60) + 'ms" data-action="open" data-id="' + item.id + '">' +
          mediaHTML(IMAGES.featured[item.id], item.name) +
          '<div class="featured-overlay"><span>' + item.category + '</span><h3>' + item.name + '</h3></div>' +
        '</div>'
      );
    }).join('');
  }

  var galleryGrid = document.getElementById('galleryGrid');
  var filterRow = document.getElementById('filterRow');
  function renderGallery() {
    if (!galleryGrid) return;
    var items = GALLERY.filter(function (g) { return state.filter === 'All' || g.category === state.filter; });
    galleryGrid.innerHTML = items.map(function (g, i) {
      return (
        '<div class="gallery-card show" style="animation-delay:' + (i * 50) + 'ms" data-action="open" data-id="' + g.id + '">' +
          mediaHTML(IMAGES.gallery[g.id], g.name) +
          '<div class="gallery-info"><span class="gallery-cat">' + g.category + '</span><h3>' + g.name + '</h3></div>' +
        '</div>'
      );
    }).join('');
  }
  if (filterRow) {
    filterRow.innerHTML = CATEGORIES.map(function (c, i) {
      return '<button class="filter-chip ' + (i === 0 ? 'is-active' : '') + '" data-filter="' + c + '" type="button">' + c + '</button>';
    }).join('');
    filterRow.querySelectorAll('.filter-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        filterRow.querySelectorAll('.filter-chip').forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
        state.filter = chip.dataset.filter;
        renderGallery();
      });
    });
  }
  renderGallery();

  var instaGrid = document.getElementById('instaGrid');
  if (instaGrid) {
    var keys = [1, 2, 3, 4, 5, 6];
    instaGrid.innerHTML = keys.map(function (k) {
      return mediaHTML(IMAGES.instagram[k], 'Instagram post', '1/1');
    }).join('');
  }

  var lightbox = document.getElementById('lightbox');
  var lightboxScrim = document.getElementById('lightboxScrim');
  var lightboxContent = document.getElementById('lightboxContent');
  var lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(id) {
    var item = GALLERY.find(function (g) { return g.id === Number(id); });
    if (!item || !lightboxContent) return;
    var img = IMAGES.gallery[item.id] || IMAGES.featured[item.id] || '';
    lightboxContent.innerHTML =
      mediaHTML(img, item.name, '1/1') +
      '<div class="lightbox-info">' +
        '<span class="gallery-cat">' + item.category + '</span>' +
        '<h2>' + item.name + '</h2>' +
        '<p>' + item.desc + '</p>' +
        '<a href="#" class="btn btn-gold">Enquire / Custom Order</a>' +
      '</div>';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxScrim.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxScrim.classList.remove('show');
    document.body.style.overflow = '';
  }
  document.addEventListener('click', function (e) {
    var openTrigger = e.target.closest('[data-action="open"]');
    if (openTrigger) { openLightbox(openTrigger.dataset.id); return; }
  });
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxScrim) lightboxScrim.addEventListener('click', closeLightbox);

  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg) {
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.classList.add('show');
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2600);
  }

  var header = document.getElementById('siteHeader');
  var backToTop = document.getElementById('backToTop');
  var navLinks = document.querySelectorAll('.main-nav a');
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 30);
    if (backToTop) backToTop.classList.toggle('show', y > 600);
    var pos = y + 160;
    document.querySelectorAll('section[id]').forEach(function (sec) {
      if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        var match = document.querySelector('.main-nav a[href="#' + sec.id + '"]');
        if (match) match.classList.add('active');
      }
    });
  }, { passive: true });
  if (backToTop) backToTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  var hamburger = document.getElementById('hamburgerBtn');
  var drawer = document.getElementById('mobileDrawer');
  var scrim = document.getElementById('drawerScrim');
  var drawerClose = document.getElementById('drawerClose');
  function openDrawer() { if (drawer) drawer.classList.add('open'); if (scrim) scrim.classList.add('show'); if (hamburger) hamburger.setAttribute('aria-expanded', 'true'); }
  function closeDrawer() { if (drawer) drawer.classList.remove('open'); if (scrim) scrim.classList.remove('show'); if (hamburger) hamburger.setAttribute('aria-expanded', 'false'); }
  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (scrim) scrim.addEventListener('click', closeDrawer);
  document.querySelectorAll('.mobile-drawer a').forEach(function (a) { a.addEventListener('click', closeDrawer); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  document.querySelectorAll('a[href="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      showToast('Add your real link here — this button is a placeholder for now.');
    });
  });
});