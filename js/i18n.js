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
        cat_storage: "Storage & State",
        cat_network: "Network & Security",
        cat_routing: "Routing & Navigation",
        footer_copy: "© 2026 Chaeco Open Source Organisation. All tools MIT licensed.",
        footer_top: "Back to top",
        // Repos
        repo_idb_title: "IndexedDB Storage",
        repo_idb_desc: "Advanced persistency layer for structured data with automated lifecycle management.",
        repo_htils_title: "HTils",
        repo_htils_desc: "Essential runtime utilities for complex object manipulation and data transformation.",
        repo_jwt_title: "JWT Permission",
        repo_jwt_desc: "Decentralized authentication and role-based access control middleware.",
        repo_logger_title: "Structured Logger",
        repo_logger_desc: "Production-grade logging with customizable transports and severity tracking.",
        repo_wizard_title: "Route Wizard",
        repo_wizard_desc: "Smart orchestration for complex application flows and dynamic pathing.",
        repo_auto_title: "Auto Router",
        repo_auto_desc: "Convention-based routing generation for zero-config application mapping."
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
        cat_storage: "存储与状态",
        cat_network: "网络与安全",
        cat_routing: "路由与导航",
        footer_copy: "© 2026 Chaeco 开源组织。所有工具遵循 MIT 协议。",
        footer_top: "回到顶部",
        // Repos
        repo_idb_title: "IndexedDB Storage",
        repo_idb_desc: "面向结构化数据的高级持久化层，具备自动化生命周期管理。",
        repo_htils_title: "HTils",
        repo_htils_desc: "用于复杂对象操作和数据转换的基础运行时工具库。",
        repo_jwt_title: "JWT Permission",
        repo_jwt_desc: "去中心化的身份验证与基于角色的精细化访问控制中间件。",
        repo_logger_title: "Structured Logger",
        repo_logger_desc: "生产级日志工具，支持自定义传输通道与严重级别跟踪。",
        repo_wizard_title: "Route Wizard",
        repo_wizard_desc: "适用于复杂应用流和动态路径识别的智能编排引擎。",
        repo_auto_title: "Auto Router",
        repo_auto_desc: "基于约定的路由自动生成工具，实现零配置的应用映射。"
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
