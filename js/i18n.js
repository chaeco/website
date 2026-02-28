const translations = {
    en: {
        nav_ecosystem: "Ecosystem",
        nav_philosophy: "Philosophy",
        hero_h1: "Refining the Web Experience.",
        hero_p: "A collective organization building specialized, low-level tooling and infrastructure for the next generation of web applications.",
        section_philosophy: "Our Philosophy",
        philosophy_1_h3: "Atomic Design",
        philosophy_1_p: "Every tool is built to solve one specific problem perfectly. No bloat, no unnecessary dependencies.",
        philosophy_2_h3: "Native-First",
        philosophy_2_p: "We believe in leveraging native browser capabilities like IndexedDB, Streams, and Web Crypto for better performance.",
        philosophy_3_h3: "Developer Ergonomics",
        philosophy_3_p: "Clean APIs that feel intuitive. Type safety isn't an afterthought; it's our foundation.",
        section_ecosystem: "Ecosystem Explore",
        cat_storage: "Storage & Utilities",
        cat_routing: "Routing & Auth",
        cat_observability: "Observability",
        footer_copy: "© 2026 Chaeco Open Source Organisation. All tools MIT licensed.",
        footer_top: "Back to top",
        // Repos
        repo_idb_title: "IndexedDB Storage",
        repo_idb_desc: "Universal IndexedDB storage with advanced queries, auto-cleanup, and zero dependencies.",
        repo_htils_title: "HTils",
        repo_htils_desc: "Lightweight TypeScript utility library covering strings, arrays, crypto, DOM, and more.",
        repo_auto_title: "Auto Router",
        repo_auto_desc: "File-based automatic router for Node.js frameworks — zero-config, type-safe, permission-aware.",
        repo_jwt_title: "JWT Permission",
        repo_jwt_desc: "Framework-agnostic JWT route permission middleware with auto-discovery via auto-router.",
        repo_logger_title: "Logger",
        repo_logger_desc: "Cross-platform logger for Node.js and the browser with sampling, rate-limiting, and gzip compression."
    },
    zh: {
        nav_ecosystem: "生态系统",
        nav_philosophy: "设计哲学",
        hero_h1: "定义互联网的<br>性能边界",
        hero_p: "一个致力于为下一代 Web 应用构建专业、底层工具和基础设施的开源组织。",
        section_philosophy: "我们的哲学",
        philosophy_1_h3: "原子化设计",
        philosophy_1_p: "每个工具都只为一个特定问题而生。拒接臃肿，远离无意义的依赖。",
        philosophy_2_h3: "原生优先",
        philosophy_2_p: "我们坚持利用浏览器原生能力（如 IndexedDB, Streams, Web Crypto）以实现极致性能。",
        philosophy_3_h3: "开发者体验",
        philosophy_3_p: "直觉式的干净 API。类型安全不是事后补充，而是我们的基石。",
        section_ecosystem: "探索生态",
        cat_storage: "存储与工具",
        cat_routing: "路由与权限",
        cat_observability: "可观测性",
        footer_copy: "© 2026 Chaeco 开源组织。所有工具遵循 MIT 协议。",
        footer_top: "回到顶部",
        // Repos
        repo_idb_title: "IndexedDB Storage",
        repo_idb_desc: "通用 IndexedDB 存储方案，支持高级查询、自动清理与零依赖设计。",
        repo_htils_title: "HTils",
        repo_htils_desc: "轻量级 TypeScript 工具库，覆盖字符串、数组、加密、DOM 等实用模块。",
        repo_auto_title: "Auto Router",
        repo_auto_desc: "基于文件结构的 Node.js 自动路由，零配置、类型安全，内置权限元数据支持。",
        repo_jwt_title: "JWT Permission",
        repo_jwt_desc: "框架无关的 JWT 路由权限中间件，可与 auto-router 自动联动发现路由。",
        repo_logger_title: "Logger",
        repo_logger_desc: "跨平台日志库，支持 Node.js 与浏览器，内置采样、限流与 gzip 压缩。"
    }
};

let currentLang = localStorage.getItem('chaeco-lang') || (navigator.language.startsWith('zh') ? 'zh' : 'en');

// Safe Mode: Ensure currentLang is valid
if (!translations[currentLang]) {
    currentLang = 'en';
}

function updateContent() {
    if (!translations[currentLang]) return;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
    
    const langBtn = document.querySelector('.lang-switch');
    if (langBtn) {
        langBtn.textContent = currentLang === 'en' ? '中文' : 'English';
    }
    localStorage.setItem('chaeco-lang', currentLang);
}

window.toggleLang = () => {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    updateContent();
};

document.addEventListener('DOMContentLoaded', updateContent);
