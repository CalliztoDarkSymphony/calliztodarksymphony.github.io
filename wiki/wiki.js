(function () {
  "use strict";

  var manifest = null;
  var activePhase = "all";
  var activeFile = "";
  var searchQuery = "";
  var contentCache = Object.create(null);

  var archiveStatsDefaults = {
    articles: 100,
    phases: 6,
    words: 55853,
    characters: 361881,
    lines: 6066,
    estimatedTokens: 90473,
    missingRecords: 0,
    tagline: "A living archive, not required reading. But the signal is there for those who want to go deeper."
  };

  var archiveStatFields = [
    { key: "articles", label: "Articles" },
    { key: "phases", label: "Phases" },
    { key: "words", label: "Words" },
    { key: "characters", label: "Characters" },
    { key: "lines", label: "Lines" },
    { key: "estimatedTokens", label: "Estimated AI tokens" },
    { key: "missingRecords", label: "Missing records" }
  ];

  var els = {
    phaseNav: document.getElementById("wiki-phase-nav"),
    articleList: document.getElementById("wiki-article-list"),
    listMeta: document.getElementById("wiki-list-meta"),
    search: document.getElementById("wiki-search"),
    welcomeView: document.getElementById("wiki-welcome-view"),
    welcome: document.getElementById("wiki-welcome"),
    signalLead: document.getElementById("wiki-signal-lead"),
    signalStats: document.getElementById("wiki-signal-stats"),
    panel: document.getElementById("wiki-article-panel"),
    phase: document.getElementById("wiki-article-phase"),
    title: document.getElementById("wiki-article-title"),
    file: document.getElementById("wiki-article-file"),
    body: document.getElementById("wiki-article-body"),
    nav: document.getElementById("wiki-article-nav"),
    status: document.getElementById("wiki-toolbar-status"),
    sidebar: document.getElementById("wiki-sidebar"),
    sidebarOpen: document.getElementById("wiki-sidebar-open"),
    sidebarClose: document.getElementById("wiki-sidebar-close"),
    startIntro: document.getElementById("wiki-start-intro"),
    contentStage: document.querySelector(".wiki-content-stage"),
    main: document.getElementById("wiki-main")
  };

  function formatStatValue(key, value) {
    if (typeof value !== "number" || isNaN(value)) {
      return String(value == null ? "" : value);
    }
    return value.toLocaleString("en-US");
  }

  function resolveArchiveStats(manifestData, externalStats) {
    var stats = Object.assign({}, archiveStatsDefaults, externalStats || {});
    if (manifestData) {
      if (manifestData.stats && typeof manifestData.stats === "object") {
        Object.assign(stats, manifestData.stats);
      }
      if (Array.isArray(manifestData.articles) && manifestData.articles.length) {
        stats.articles = manifestData.articles.length;
      }
      if (Array.isArray(manifestData.phases) && manifestData.phases.length) {
        stats.phases = manifestData.phases.length;
      }
    }
    return stats;
  }

  function renderArchiveSignal(stats) {
    var resolved = resolveArchiveStats(manifest, stats);
    if (els.signalLead) {
      els.signalLead.textContent = resolved.tagline || archiveStatsDefaults.tagline;
    }
    if (!els.signalStats) {
      return;
    }
    els.signalStats.innerHTML = archiveStatFields.map(function (field) {
      return (
        "<div><dt>" + escapeHtml(field.label) + "</dt><dd>" +
        escapeHtml(formatStatValue(field.key, resolved[field.key])) + "</dd></div>"
      );
    }).join("");
  }

  function loadArchiveStats() {
    return fetch("wiki-stats.json")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("No external wiki stats file.");
        }
        return response.json();
      })
      .then(function (data) {
        renderArchiveSignal(data);
      })
      .catch(function () {
        renderArchiveSignal();
      });
  }

  function scrollToReadingTop() {
    var anchor = els.contentStage || els.main || document.getElementById("wiki-reader");
    if (!anchor) {
      window.scrollTo(0, 0);
      return;
    }
    var headerOffset = window.innerWidth >= 981 ? 88 : 72;
    var top = anchor.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    var targetTop = Math.max(0, top);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.scrollTo(0, targetTop);
      return;
    }
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  }

  function focusArticleTitle() {
    if (!els.title || !els.panel || els.panel.hidden) {
      return;
    }
    els.title.setAttribute("tabindex", "-1");
    els.title.focus({ preventScroll: true });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function inlineMarkdown(text) {
    var html = escapeHtml(text);
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, label, url) {
      var safeUrl = escapeHtml(url).replace(/"/g, "%22");
      if (/^https?:\/\//i.test(url) || url.charAt(0) === "/" || url.charAt(0) === "#") {
        return '<a href="' + safeUrl + '" rel="noopener">' + escapeHtml(label) + "</a>";
      }
      return escapeHtml(label);
    });
    return html;
  }

  function renderMarkdown(source) {
    var lines = String(source || "").replace(/\r/g, "").split("\n");
    var html = [];
    var paragraph = [];
    var listType = "";
    var listItems = [];
    var inCode = false;
    var codeLines = [];

    function flushParagraph() {
      if (!paragraph.length) {
        return;
      }
      html.push("<p>" + inlineMarkdown(paragraph.join(" ")) + "</p>");
      paragraph = [];
    }

    function flushList() {
      if (!listItems.length) {
        return;
      }
      var tag = listType === "ol" ? "ol" : "ul";
      html.push("<" + tag + ">" + listItems.map(function (item) {
        return "<li>" + inlineMarkdown(item) + "</li>";
      }).join("") + "</" + tag + ">");
      listItems = [];
      listType = "";
    }

    function flushCode() {
      if (!codeLines.length) {
        return;
      }
      html.push("<pre><code>" + escapeHtml(codeLines.join("\n")) + "</code></pre>");
      codeLines = [];
      inCode = false;
    }

    lines.forEach(function (line) {
      if (inCode) {
        if (/^```/.test(line.trim())) {
          flushCode();
        } else {
          codeLines.push(line);
        }
        return;
      }

      if (/^```/.test(line.trim())) {
        flushParagraph();
        flushList();
        inCode = true;
        return;
      }

      if (/^#{1,4}\s+/.test(line)) {
        flushParagraph();
        flushList();
        var level = line.match(/^(#+)/)[1].length;
        var heading = line.replace(/^#{1,4}\s+/, "");
        html.push("<h" + level + ">" + inlineMarkdown(heading) + "</h" + level + ">");
        return;
      }

      if (/^---+$/.test(line.trim())) {
        flushParagraph();
        flushList();
        html.push("<hr>");
        return;
      }

      if (/^>\s?/.test(line)) {
        flushParagraph();
        flushList();
        html.push("<blockquote>" + inlineMarkdown(line.replace(/^>\s?/, "")) + "</blockquote>");
        return;
      }

      var ul = line.match(/^\s*[-*+]\s+(.+)/);
      if (ul) {
        flushParagraph();
        if (listType && listType !== "ul") {
          flushList();
        }
        listType = "ul";
        listItems.push(ul[1]);
        return;
      }

      var ol = line.match(/^\s*\d+\.\s+(.+)/);
      if (ol) {
        flushParagraph();
        if (listType && listType !== "ol") {
          flushList();
        }
        listType = "ol";
        listItems.push(ol[1]);
        return;
      }

      if (!line.trim()) {
        flushParagraph();
        flushList();
        return;
      }

      flushList();
      paragraph.push(line.trim());
    });

    flushParagraph();
    flushList();
    flushCode();
    return html.join("\n");
  }

  function articleByFile(file) {
    if (!manifest) {
      return null;
    }
    return manifest.articles.find(function (item) {
      return item.file === file;
    }) || null;
  }

  function articleIndex(file) {
    return manifest.articles.findIndex(function (item) {
      return item.file === file;
    });
  }

  function setStatus(text) {
    if (els.status) {
      els.status.textContent = text;
    }
  }

  function updateUrl(file) {
    var url = new URL(window.location.href);
    if (file) {
      url.searchParams.set("article", file);
    } else {
      url.searchParams.delete("article");
    }
    history.replaceState({ article: file || "" }, "", url.pathname + url.search + url.hash);
  }

  function closeSidebar() {
    if (!els.sidebar) {
      return;
    }
    els.sidebar.classList.remove("open");
    if (els.sidebarOpen) {
      els.sidebarOpen.setAttribute("aria-expanded", "false");
    }
    var backdrop = document.querySelector(".wiki-sidebar-backdrop");
    if (backdrop) {
      backdrop.remove();
    }
  }

  function openSidebar() {
    if (!els.sidebar || window.innerWidth > 980) {
      return;
    }
    els.sidebar.classList.add("open");
    if (els.sidebarOpen) {
      els.sidebarOpen.setAttribute("aria-expanded", "true");
    }
    if (!document.querySelector(".wiki-sidebar-backdrop")) {
      var backdrop = document.createElement("div");
      backdrop.className = "wiki-sidebar-backdrop";
      backdrop.addEventListener("click", closeSidebar);
      document.body.appendChild(backdrop);
    }
  }

  function renderPhaseNav() {
    if (!els.phaseNav || !manifest) {
      return;
    }
    var buttons = ['<button type="button" class="wiki-phase-btn active" data-phase="all">All</button>'];
    manifest.phases.forEach(function (phase) {
      buttons.push(
        '<button type="button" class="wiki-phase-btn" data-phase="' + phase.id + '">P' +
        String(phase.num).padStart(2, "0") + "</button>"
      );
    });
    els.phaseNav.innerHTML = buttons.join("");
    els.phaseNav.querySelectorAll(".wiki-phase-btn").forEach(function (button) {
      button.addEventListener("click", function () {
        activePhase = button.getAttribute("data-phase");
        els.phaseNav.querySelectorAll(".wiki-phase-btn").forEach(function (node) {
          node.classList.toggle("active", node === button);
        });
        renderArticleList();
      });
    });
  }

  function filteredArticles() {
    var query = searchQuery.trim().toLowerCase();
    return manifest.articles.filter(function (article) {
      if (activePhase !== "all" && article.phase !== activePhase) {
        return false;
      }
      if (!query) {
        return true;
      }
      return (
        article.title.toLowerCase().indexOf(query) !== -1 ||
        article.file.toLowerCase().indexOf(query) !== -1 ||
        article.phase.toLowerCase().indexOf(query) !== -1 ||
        article.phaseTitle.toLowerCase().indexOf(query) !== -1 ||
        article.searchText.indexOf(query) !== -1
      );
    });
  }

  function renderArticleList() {
    if (!els.articleList || !manifest) {
      return;
    }
    var items = filteredArticles();
    if (els.listMeta) {
      els.listMeta.textContent = items.length + " article" + (items.length === 1 ? "" : "s") + " visible";
    }
    els.articleList.innerHTML = items.map(function (article) {
      var active = article.file === activeFile ? " active" : "";
      return (
        '<a class="wiki-article-link' + active + '" href="?article=' + encodeURIComponent(article.file) + '" data-file="' +
        escapeHtml(article.file) + '"><strong>' + escapeHtml(article.title) + "</strong><small>#" +
        String(article.id).padStart(4, "0") + " · " + escapeHtml(article.phaseTitle) + "</small></a>"
      );
    }).join("");
    els.articleList.querySelectorAll(".wiki-article-link").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        loadArticle(link.getAttribute("data-file"));
        closeSidebar();
      });
    });
  }

  function renderArticleNav(file) {
    if (!els.nav) {
      return;
    }
    var index = articleIndex(file);
    var prev = index > 0 ? manifest.articles[index - 1] : null;
    var next = index < manifest.articles.length - 1 ? manifest.articles[index + 1] : null;
    els.nav.innerHTML =
      (prev
        ? '<a class="wiki-nav-btn prev" href="?article=' + encodeURIComponent(prev.file) + '" data-file="' +
          escapeHtml(prev.file) + '"><span>Previous</span><strong>' + escapeHtml(prev.title) + "</strong></a>"
        : '<span class="wiki-nav-btn prev is-empty" aria-hidden="true"></span>') +
      (next
        ? '<a class="wiki-nav-btn next" href="?article=' + encodeURIComponent(next.file) + '" data-file="' +
          escapeHtml(next.file) + '"><span>Next</span><strong>' + escapeHtml(next.title) + "</strong></a>"
        : '<span class="wiki-nav-btn next is-empty" aria-hidden="true"></span>');
    els.nav.querySelectorAll(".wiki-nav-btn[data-file]").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        loadArticle(link.getAttribute("data-file"));
      });
    });
  }

  function showWelcome() {
    activeFile = "";
    if (els.welcomeView) {
      els.welcomeView.hidden = false;
    }
    if (els.panel) {
      els.panel.hidden = true;
    }
    setStatus("Select an article to begin reading.");
    updateUrl("");
    renderArticleList();
  }

  function loadArticle(file) {
    var article = articleByFile(file);
    if (!article) {
      return;
    }
    activeFile = file;
    updateUrl(file);
    renderArticleList();
    if (els.welcomeView) {
      els.welcomeView.hidden = true;
    }
    if (els.panel) {
      els.panel.hidden = false;
    }
    if (els.phase) {
      els.phase.textContent = "Phase " + article.phaseNum + " · " + article.phaseTitle;
    }
    if (els.title) {
      els.title.textContent = article.title;
    }
    if (els.file) {
      els.file.textContent = article.file;
    }
    if (els.body) {
      els.body.innerHTML = "<p>Loading article...</p>";
    }
    setStatus("Reading #" + String(article.id).padStart(4, "0"));
    renderArticleNav(file);
    scrollToReadingTop();

    if (contentCache[file]) {
      els.body.innerHTML = renderMarkdown(contentCache[file]);
      focusArticleTitle();
      return;
    }

    fetch("content/" + encodeURIComponent(file))
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Unable to load " + file);
        }
        return response.text();
      })
      .then(function (markdown) {
        contentCache[file] = markdown;
        if (activeFile === file && els.body) {
          els.body.innerHTML = renderMarkdown(markdown);
          focusArticleTitle();
        }
      })
      .catch(function (error) {
        if (activeFile === file && els.body) {
          els.body.innerHTML = '<p class="wiki-load-error">' + escapeHtml(error.message) + "</p>";
          focusArticleTitle();
        }
      });
  }

  function bindUi() {
    if (els.search) {
      els.search.addEventListener("input", function () {
        searchQuery = els.search.value;
        renderArticleList();
      });
    }
    if (els.startIntro) {
      els.startIntro.addEventListener("click", function () {
        loadArticle("0001_P01_01_Wiki_Hub_and_Introduction.md");
      });
    }
    if (els.sidebarOpen) {
      els.sidebarOpen.addEventListener("click", openSidebar);
    }
    if (els.sidebarClose) {
      els.sidebarClose.addEventListener("click", closeSidebar);
    }
    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) {
        closeSidebar();
      }
    });
    window.addEventListener("popstate", function () {
      var params = new URLSearchParams(window.location.search);
      var file = params.get("article");
      if (file && articleByFile(file)) {
        loadArticle(file);
      } else {
        showWelcome();
      }
    });
  }

  fetch("wiki-manifest.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Unable to load wiki manifest.");
      }
      return response.json();
    })
    .then(function (data) {
      manifest = data;
      renderPhaseNav();
      loadArchiveStats();
      bindUi();
      var params = new URLSearchParams(window.location.search);
      var file = params.get("article");
      if (file && articleByFile(file)) {
        loadArticle(file);
      } else {
        showWelcome();
      }
    })
    .catch(function (error) {
      setStatus("Wiki failed to load.");
      if (els.articleList) {
        els.articleList.innerHTML = '<p class="wiki-load-error">' + escapeHtml(error.message) + "</p>";
      }
    });
}());