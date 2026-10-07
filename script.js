(function () {
    'use strict';
  
    var doc = document.documentElement;
    doc.classList.add('js');
  
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var $  = function (s, c) { return (c || document).querySelector(s); };
    var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  
    /* ---------- Footer year ---------- */
    $('#year').textContent = new Date().getFullYear();
  
    /* ---------- Header shadow on scroll ---------- */
    var header = $('#header');
    function onScroll() { header.classList.toggle('scrolled', window.scrollY > 10); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  
    /* ---------- Mobile menu ---------- */
    var hamburger = $('#hamburger');
    var nav = $('#nav');
    function setMenu(open) {
      nav.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    }
    hamburger.addEventListener('click', function () {
      setMenu(hamburger.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); hamburger.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) setMenu(false);
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 880) setMenu(false); });
  
    /* ---------- Smooth scrolling ---------- */
    $$('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (link.hasAttribute('data-placeholder') || href === '#') { e.preventDefault(); return; }
        var target = document.getElementById(href.slice(1));
        if (!target) return;
        e.preventDefault();
        setMenu(false);
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      });
    });
  
    /* ---------- Reveal on scroll ---------- */
    var reveals = $$('.reveal');
    if ('IntersectionObserver' in window) {
      var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); revealObs.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function (el) { revealObs.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }
  
    /* ---------- Active nav link highlighting ---------- */
    var navLinks = $$('.nav-links a');
    var sections = navLinks.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); }).filter(Boolean);
    if ('IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            navLinks.forEach(function (a) {
              a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
            });
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      sections.forEach(function (s) { spy.observe(s); });
    }
  
    /* ---------- Animated counters ---------- */
    function formatNumber(value, decimals) {
      return decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-US');
    }
    function setCounter(el, value) {
      var decimals = parseInt(el.dataset.decimals || '0', 10);
      el.textContent = formatNumber(value, decimals) + (el.dataset.suffix || '');
    }
    function animateCounter(el) {
      var target = parseFloat(el.dataset.target);
      if (reduceMotion) { setCounter(el, target); return; }
      var duration = 1800, start = null;
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        setCounter(el, target * eased);
        if (p < 1) requestAnimationFrame(step);
        else setCounter(el, target);
      }
      requestAnimationFrame(step);
    }
    var counters = $$('.stat-num');
    if ('IntersectionObserver' in window) {
      var countObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { animateCounter(en.target); countObs.unobserve(en.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { countObs.observe(c); });
    } else {
      counters.forEach(function (c) { setCounter(c, parseFloat(c.dataset.target)); });
    }
  
    /* ---------- Pricing toggle ---------- */
    var sw = $('#billingSwitch');
    var amounts = $$('.amt');
    var billed = $$('.billed[data-monthly]');
    sw.addEventListener('click', function () {
      var yearly = sw.getAttribute('aria-checked') !== 'true';
      sw.setAttribute('aria-checked', String(yearly));
      amounts.forEach(function (a) { a.textContent = '$' + (yearly ? a.dataset.yearly : a.dataset.monthly); });
      billed.forEach(function (b) { b.textContent = yearly ? b.dataset.yearly : b.dataset.monthly; });
    });
  
    /* ---------- FAQ accordion ---------- */
    var faqItems = $$('.faq-item');
    faqItems.forEach(function (item) {
      var btn = $('.faq-q', item);
      btn.addEventListener('click', function () {
        var willOpen = !item.classList.contains('open');
        faqItems.forEach(function (other) {
          other.classList.remove('open');
          $('.faq-q', other).setAttribute('aria-expanded', 'false');
        });
        if (willOpen) {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  
    /* ---------- Contact form validation ---------- */
    var form = $('#contactForm');
    var success = $('#formSuccess');
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  
    var rules = {
      name: function (v) {
        if (!v.trim()) return 'Please enter your name.';
        if (v.trim().length < 2) return 'Your name must be at least 2 characters.';
        return '';
      },
      email: function (v) {
        if (!v.trim()) return 'Please enter your email address.';
        if (!emailRe.test(v.trim())) return 'Please enter a valid email address.';
        return '';
      },
      topic: function (v) { return v ? '' : 'Please choose a topic.'; },
      message: function (v) {
        if (!v.trim()) return 'Please write a message.';
        if (v.trim().length < 10) return 'Your message must be at least 10 characters.';
        return '';
      }
    };
  
    function validateField(input) {
      var rule = rules[input.name];
      if (!rule) return true;
      var msg = rule(input.value);
      var field = input.closest('.field');
      var err = $('.error', field);
      field.classList.toggle('invalid', !!msg);
      err.textContent = msg;
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      return !msg;
    }
  
    $$('input, select, textarea', form).forEach(function (input) {
      input.addEventListener('blur', function () { validateField(input); });
      input.addEventListener('input', function () {
        if (input.closest('.field').classList.contains('invalid')) validateField(input);
        success.classList.remove('show');
      });
      input.addEventListener('change', function () { validateField(input); });
    });
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      $$('input, select, textarea', form).forEach(function (input) {
        if (!validateField(input) && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        success.classList.remove('show');
        firstInvalid.focus();
        return;
      }
      var firstName = form.elements.name.value.trim().split(' ')[0];
      $('#successText').textContent = 'Thanks, ' + firstName + '! Your message has been received (demo only, nothing was actually sent).';
      form.reset();
      $$('.field', form).forEach(function (f) { f.classList.remove('invalid'); });
      $$('input, select, textarea', form).forEach(function (i) { i.removeAttribute('aria-invalid'); });
      success.classList.add('show');
    });
  })();