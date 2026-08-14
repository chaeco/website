/* ==========================================================================
   Chaeco website — animations
   GSAP + ScrollTrigger. transform/opacity only. Respects prefers-reduced-motion.
   ========================================================================== */

(function () {
  'use strict'

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches

  /* ------------------------------------------------------------------ *
   * Hero 拆字：中文逐字、英文逐词，按 <br> 分行
   * ------------------------------------------------------------------ */
  window.initHeroReveal = function () {
    const h1 = document.querySelector('.hero h1')
    if (!h1) return

    const lines = h1.innerHTML.split(/<br\s*\/?>/i).map((s) => s.trim()).filter(Boolean)

    h1.innerHTML = lines
      .map((line) => {
        const isCJK = /[\u4e00-\u9fff]/.test(line)
        const tokens = isCJK ? Array.from(line) : line.split(/\s+/)
        const words = tokens
          .map((t) => `<span class="hero-word"><span class="hero-word-inner">${t}</span></span>`)
          .join(isCJK ? '' : ' ')
        return `<span class="hero-line">${words}</span>`
      })
      .join('')
  }

  /* ------------------------------------------------------------------ *
   * 开场编排
   * ------------------------------------------------------------------ */
  function heroEntrance(keepNav = false) {
    const h1 = document.querySelector('.hero h1')
    const p = document.querySelector('.hero p')
    const nav = document.querySelector('nav')
    if (!h1 || reducedMotion) return

    const inner = h1.querySelectorAll('.hero-word-inner')

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // 导航（仅在首次播放）
    if (nav && !keepNav) tl.from(nav, { y: -30, duration: 0.7, ease: 'power3.out' }, 0)

    // 标题逐字
    tl.to(inner, {
      y: 0,
      rotate: 0,
      duration: 1.1,
      stagger: 0.045,
      ease: 'power4.out',
    }, 0.1)

    // 副标题
    if (p) tl.to(p, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, 0.7)

    // 光球渐显
    gsap.from('.orb', { scale: 0.6, opacity: 0, duration: 1.6, ease: 'power2.out' }, 0.2)
  }

  /* ------------------------------------------------------------------ *
   * 光标光斑跟随
   * ------------------------------------------------------------------ */
  function cursorGlow() {
    const el = document.getElementById('cursorGlow')
    if (!el || !canHover || reducedMotion) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    window.addEventListener('pointermove', (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    })
  }

  /* ------------------------------------------------------------------ *
   * 滚动进度条
   * ------------------------------------------------------------------ */
  function scrollProgress() {
    const bar = document.getElementById('scrollProgress')
    if (!bar || reducedMotion || typeof ScrollTrigger === 'undefined') return

    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })
  }

  /* ------------------------------------------------------------------ *
   * 导航滚动态
   * ------------------------------------------------------------------ */
  function navState() {
    const nav = document.querySelector('nav')
    if (!nav || typeof ScrollTrigger === 'undefined') return
    ScrollTrigger.create({
      start: 'top -60',
      end: 'max',
      onToggle: (self) => nav.classList.toggle('scrolled', self.isActive),
    })
  }

  /* ------------------------------------------------------------------ *
   * 滚动显现：section-label / feature / category / footer
   * ------------------------------------------------------------------ */
  function scrollReveals() {
    if (reducedMotion || typeof ScrollTrigger === 'undefined') return

    gsap.utils.toArray('.section-label, .category-header, .feature-item, footer').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
    })

    // 分类内的产品卡片错峰
    gsap.utils.toArray('.category-block').forEach((block) => {
      gsap.from(block.querySelectorAll('.product-card'), {
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
          once: true,
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      })
    })
  }

  /* ------------------------------------------------------------------ *
   * 产品卡片：3D 倾斜 + 聚光灯
   * ------------------------------------------------------------------ */
  function productCards() {
    if (!canHover || reducedMotion) return

    document.querySelectorAll('.product-card').forEach((card) => {
      const rx = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power3.out' })
      const ry = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power3.out' })

      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width
        const py = (e.clientY - rect.top) / rect.height

        card.style.setProperty('--mx', `${px * 100}%`)
        card.style.setProperty('--my', `${py * 100}%`)
        ry((px - 0.5) * 10)   // ±5°
        rx((0.5 - py) * 8)    // ±4°
      })

      card.addEventListener('pointerleave', () => {
        rx(0)
        ry(0)
      })
    })
  }

  /* ------------------------------------------------------------------ *
   * Logo 旋转
   * ------------------------------------------------------------------ */
  function logoSpin() {
    const logo = document.querySelector('.logo')
    if (!logo || reducedMotion) return
    const icon = logo.querySelector('i')
    if (!icon) return

    logo.addEventListener('mouseenter', () => gsap.to(icon, { rotate: 180, duration: 0.4 }))
    logo.addEventListener('mouseleave', () => gsap.to(icon, { rotate: 0, duration: 0.4 }))
  }

  /* ------------------------------------------------------------------ *
   * GSAP 不可用时的兜底：移除 .js 隐藏态，保证内容可见
   * ------------------------------------------------------------------ */
  function fallbackVisible() {
    document.documentElement.classList.remove('js')
  }

  /* ------------------------------------------------------------------ *
   * 语言切换后重建 hero
   * ------------------------------------------------------------------ */
  window.afterLangUpdate = function () {
    if (typeof gsap === 'undefined') { window.initHeroReveal(); fallbackVisible(); return }
    // 1. 重新拆字（i18n 已写入新文案）
    window.initHeroReveal()
    // 2. 重置为隐藏态再重放开场
    const inner = document.querySelectorAll('.hero .hero-word-inner')
    const p = document.querySelector('.hero p')
    gsap.set(inner, { y: '120%', rotate: 4 })
    gsap.set(p, { y: 28, opacity: 0 })
    heroEntrance(true)
  }

  /* ------------------------------------------------------------------ *
   * 加载仓库数据（renders product cards）
   * ------------------------------------------------------------------ */
  async function initRepos() {
    const container = document.getElementById('ecosystem-content')
    if (!container) return

    try {
      const response = await fetch('data/repos.json')
      const categories = await response.json()

      container.innerHTML = categories.map(cat => `
            <div class="category-block">
                <div class="category-header">
                    <h2 data-i18n="${cat.categoryKey}"></h2>
                </div>
                <div class="product-grid">
                    ${cat.repos.map(repo => `
                        <a href="${repo.url}" class="product-card">
                            <h4 data-i18n="${repo.titleKey}"></h4>
                            <p data-i18n="${repo.descKey}"></p>
                        </a>
                    `).join('')}
                </div>
            </div>
        `).join('')

      // Trigger i18n update for the new content
      if (typeof updateContent === 'function') {
        updateContent()
      }
    } catch (error) {
      console.error('Failed to load repositories:', error)
    }
  }

  /* ------------------------------------------------------------------ *
   * 入口
   * ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', async () => {
    // 0. 加载仓库数据
    await initRepos()

    // 1. 图标
    try {
      if (typeof lucide !== 'undefined') lucide.createIcons()
    } catch (e) { console.error(e) }

    // 2. Hero 拆字（在 i18n 更新后执行）
    window.initHeroReveal()

    // 3. 动画（GSAP 可用时）
    if (typeof gsap !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
      heroEntrance()
      cursorGlow()
      scrollProgress()
      navState()
      scrollReveals()
      productCards()
      logoSpin()
    } else {
      fallbackVisible()
    }
  })
})()
