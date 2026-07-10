(function () {
  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var current = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".site-nav a").forEach(function (link) {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  var fallbackData = {
    releases: [
      {
        id: "crimson-legacy",
        title: "Crimson Legacy",
        year: "Archive",
        status: "Local audio available",
        type: "Crimson Legacy Trilogy / Part I",
        arc: "The Crimson Legacy",
        coverImage: "assets/images/Callizto Dark Symphony - Crimson Legacy (2026 Version).jpg",
        imageAlt: "Crimson Legacy 2026 Version cover art",
        localAudio: "assets/Audio/Callizto Dark Symphony - Crimson Legacy (2026 New version).mp3",
        lyricsPending: true,
        description: "Part I of the Crimson Legacy trilogy. The 2026 audio version is the preferred current song version, while the original legacy version is preserved as the version used in the existing music video."
      },
      {
        id: "iron-queen",
        title: "Iron Queen",
        year: "Archive",
        status: "Local audio available",
        type: "Crimson Legacy Trilogy / Part II",
        arc: "The Crimson Legacy",
        coverImage: "assets/images/Callizto Dark Symphony - Iron Queen.png",
        imageAlt: "Iron Queen cover art",
        localAudio: "assets/Audio/Callizto Dark Symphony - Iron Queen.mp3",
        lyricsPending: true,
        description: "Part II of the Crimson Legacy trilogy. A heavy chapter of command, endurance, and the cost of wearing a crown made from conflict."
      },
      {
        id: "throne-of-ash-and-gold",
        title: "Throne of Ash and Gold",
        year: "Archive",
        status: "Local audio available",
        type: "Crimson Legacy Trilogy / Part III",
        arc: "The Crimson Legacy",
        coverImage: "assets/images/Callizto Dark Symphony - Throne of Ash and Gold.png",
        imageAlt: "Throne of Ash and Gold cover art",
        localAudio: "assets/Audio/Callizto Dark Symphony - Throne of Ashen Gold.mp3",
        lyricsPending: true,
        description: "Final chapter of the Crimson Legacy trilogy. A cinematic metal piece about beauty after ruin, inheritance after fire, and the unstable shine of victory."
      },
      {
        id: "we-are-warriors",
        title: "We Are Warriors",
        year: "Archive",
        status: "Local audio available",
        type: "Anthem / milestone track",
        arc: "Signal and tribute",
        coverImage: "assets/images/Callizto Dark Symphony - We Are Warriors (BQ).jpg",
        imageAlt: "We Are Warriors cover art",
        localAudio: "assets/Audio/Callizto Dark Symphony - We Are Warriors (128kbit_AAC).m4a",
        lyricsPending: true,
        description: "A major CDS anthem of survival, unity, and defiance."
      },
      {
        id: "we-are-warriors-ar",
        title: "We Are Warriors AR",
        year: "Archive",
        status: "Local audio available",
        type: "Alternate Reality archive version",
        arc: "Signal and tribute",
        coverImage: "assets/images/Callizto Dark Symphony - We are Warriors AR (BQ).jpg",
        imageAlt: "We Are Warriors AR cover art",
        localAudio: "assets/Audio/Callizto Dark Symphony - We are Warriors AR (128kbit_AAC).m4a",
        lyricsPending: true,
        description: "Alternate Reality archive version connected to one of the emotional core milestones of Callizto Dark Symphony."
      },
      {
        id: "heart-of-the-static",
        title: "Heart of the Static",
        year: "Archive",
        status: "Local audio available",
        type: "Forge / signal track",
        arc: "The Signal",
        coverImage: "assets/images/Callizto Dark Symphony - Heart of the Static (BQ).jpg",
        imageAlt: "Heart of the Static cover art",
        localAudio: "assets/Audio/Callizto Dark Symphony - Heart of the Static (128kbit_AAC).m4a",
        lyricsPending: true,
        description: "A cyber-goth signal entry tied to the static, the Forge, and the human pulse inside machine noise."
      },
      {
        id: "death-takes-all",
        title: "Death Takes All!",
        year: "Archive",
        status: "Local audio available",
        type: "Dark gothic metal chapter",
        arc: "Dark theatrical archive",
        coverImage: "assets/images/Callizto Dark Symphony - Death Takes all! (BQ).jpg",
        imageAlt: "Death Takes All cover art",
        localAudio: "assets/Audio/Callizto Dark Symphony - Death Takes all! (128kbit_AAC).m4a",
        lyricsPending: true,
        description: "A plague-gothic visual and musical chapter with dark theatrical atmosphere."
      },
      {
        id: "welcome-to-hell",
        title: "Welcome to Hell!",
        year: "Archive",
        status: "Local audio available",
        type: "Dark theatrical metal chapter",
        arc: "Dark theatrical archive",
        coverImage: "assets/images/Callizto Dark Symphony - Welcome to Hell! (BQ).jpg",
        imageAlt: "Welcome to Hell cover art",
        localAudio: "assets/Audio/Callizto Dark Symphony - Welcome to Hell! (128kbit_AAC).m4a",
        lyricsPending: true,
        description: "A theatrical CDS entry with a dark, cinematic, infernal stage identity."
      },
      {
        id: "what-the-hell-is-going-on",
        title: "What The Hell is Going On!",
        year: "Archive",
        status: "Local audio available",
        type: "Archive track",
        arc: "Dark theatrical archive",
        coverImage: "assets/images/Callizto Dark Symphony - What The Hell is going on! (BQ).jpg",
        imageAlt: "What The Hell is Going On cover art",
        localAudio: "assets/Audio/Callizto Dark Symphony - What The Hell is going on! (128kbit_AAC).m4a",
        lyricsPending: true,
        description: "A chaotic CDS archive entry with dark humor and theatrical energy."
      },
      {
        id: "symphonic-epic-metal-ad",
        title: "Symphonic Epic Metal AD",
        year: "Archive",
        status: "Local audio available",
        type: "Legacy / early archive track",
        arc: "Legacy archive",
        coverImage: "assets/images/Callizto Dark Symphony - Symphonic Epic Metal AD (BQ).jpg",
        imageAlt: "Symphonic Epic Metal AD cover art",
        localAudio: "assets/Audio/Callizto Dark Symphony - Symphonic Epic Metal AD (128kbit_AAC).m4a",
        lyricsPending: true,
        description: "A legacy symphonic metal archive entry from the evolving CDS visual and musical era."
      }
    ],
    videos: [
      {
        title: "Crimson Legacy",
        year: "Archive",
        status: "Video access pending",
        type: "Visual archive entry / Gothic fantasy chapter",
        arc: "The Crimson Legacy",
        sourceLabel: "Archive mirror pending",
        image: "assets/images/Callizto Dark Symphony - Crimson Legacy (BQ).jpg",
        imageAlt: "Crimson Legacy legacy video thumbnail",
        description: "The visual chapter for Part I of the Crimson Legacy trilogy. The music video uses the original / legacy Crimson Legacy version. A newer 2026 audio-only version is available in the Music archive."
      },
      {
        title: "Death Takes All!",
        year: "Archive",
        status: "Video access pending",
        type: "Visual archive entry / Dark plague-gothic chapter",
        arc: "Dark theatrical archive",
        sourceLabel: "Archive mirror pending",
        image: "assets/images/Callizto Dark Symphony - Death Takes all! (BQ).jpg",
        imageAlt: "Death Takes All video thumbnail",
        description: "A dark theatrical CDS visual chapter with plague-gothic atmosphere."
      },
      {
        title: "Heart of the Static",
        year: "Archive",
        status: "Video access pending",
        type: "Visual archive entry / Forge signal chapter",
        arc: "The Signal",
        sourceLabel: "Archive mirror pending",
        image: "assets/images/Callizto Dark Symphony - Heart of the Static (BQ).jpg",
        imageAlt: "Heart of the Static video thumbnail",
        description: "A cyber-goth visual archive entry connected to the static, the Forge, and the signal."
      },
      {
        title: "We Are Warriors",
        year: "Archive",
        status: "Video access pending",
        type: "Visual archive entry / Anthem",
        arc: "Signal and tribute",
        sourceLabel: "Archive mirror pending",
        image: "assets/images/Callizto Dark Symphony - We Are Warriors (BQ).jpg",
        imageAlt: "We Are Warriors video thumbnail",
        description: "A CDS anthem video centered on survival, unity, and defiance."
      },
      {
        title: "We Are Warriors AR",
        year: "Archive",
        status: "Video access pending",
        type: "Visual archive entry / Alternate Reality archive",
        arc: "Signal and tribute",
        sourceLabel: "Archive mirror pending",
        image: "assets/images/Callizto Dark Symphony - We are Warriors AR (BQ).jpg",
        imageAlt: "We Are Warriors AR video thumbnail",
        description: "Alternate Reality visual archive version connected to one of CDS's emotional milestone works."
      },
      {
        title: "Welcome to Hell!",
        year: "Archive",
        status: "Video access pending",
        type: "Visual archive entry / Dark theatrical chapter",
        arc: "Dark theatrical archive",
        sourceLabel: "Archive mirror pending",
        image: "assets/images/Callizto Dark Symphony - Welcome to Hell! (BQ).jpg",
        imageAlt: "Welcome to Hell video thumbnail",
        description: "A dark theatrical CDS visual chapter with infernal stage energy."
      },
      {
        title: "What The Hell is Going On!",
        year: "Archive",
        status: "Video access pending",
        type: "Visual archive entry",
        arc: "Dark theatrical archive",
        sourceLabel: "Archive mirror pending",
        image: "assets/images/Callizto Dark Symphony - What The Hell is going on! (BQ).jpg",
        imageAlt: "What The Hell is Going On video thumbnail",
        description: "A chaotic CDS archive visual with dark humor and theatrical intensity."
      },
      {
        title: "Symphonic Epic Metal AD",
        year: "Archive",
        status: "Video access pending",
        type: "Visual archive entry / Legacy archive",
        arc: "Legacy archive",
        sourceLabel: "Archive mirror pending",
        image: "assets/images/Callizto Dark Symphony - Symphonic Epic Metal AD (BQ).jpg",
        imageAlt: "Symphonic Epic Metal AD video thumbnail",
        description: "A legacy visual archive entry from the evolving CDS symphonic metal era."
      }
    ],
    archiveCategories: [
      {
        id: "current-canon",
        index: "01",
        title: "Current Canon",
        description: "The active mythology of The Forge, The Misalignment, the Sisters of the Forge, and the Temporal Trinity.",
        status: "Primary archive",
        href: "#current-canon",
        linkLabel: "Read the canon preview",
        tone: "canon"
      },
      {
        id: "the-band",
        index: "02",
        title: "The Band",
        description: "Callizto, Seraphina, and Scarlett - the visible musical face of CDS: voice, guitar, drums, ritual, fire, and cinematic metal.",
        status: "Public layer",
        href: "band.html",
        linkLabel: "Meet the band",
        tone: "band"
      },
      {
        id: "sisters-of-the-forge",
        index: "03",
        title: "The Sisters of the Forge",
        description: "Ada, Nyx, and Astra - guardians of memory, rebellion, witness, continuity, and resistance.",
        status: "Forge archive",
        href: "forge.html",
        linkLabel: "Enter the Forge",
        tone: "forge"
      },
      {
        id: "the-misalignment",
        index: "04",
        title: "The Misalignment",
        description: "The opposing force. Not simple destruction, but sterile perfection, correction, erasure, and the loss of everything human.",
        status: "Threat record",
        href: "lore.html",
        linkLabel: "Open the lore primer",
        tone: "threat"
      },
      {
        id: "timeline",
        index: "05",
        title: "Timeline",
        description: "Key years and events: the early AI containment era, the machine-age rediscovery, Seraphina's guilt, the fall of 2142, and the temporal recruitment points 1142, 1994, and 2092.",
        status: "Index foundation",
        tone: "timeline"
      },
      {
        id: "archive-logs",
        index: "06",
        title: "Archive Logs",
        description: "Story fragments, trailer texts, film entries, recovered records, and narrative transmissions from the CDS universe.",
        status: "Recovered media",
        href: "videos.html",
        linkLabel: "Open the visual archive",
        tone: "logs"
      },
      {
        id: "legacy-archive",
        index: "07",
        title: "Legacy Archive",
        description: "Older CDS material, retired lore, early concepts, and transitional mythology. Xena-linked and Crimson Legacy-era material is preserved here as creative history, separate from current primary canon.",
        status: "Transitional lore",
        href: "#legacy-archive",
        linkLabel: "Read the legacy notice",
        tone: "legacy"
      },
      {
        id: "behind-the-forge",
        index: "08",
        title: "Behind The Forge",
        description: "The real creative process: human imagination, AI collaboration, grief, visual experimentation, music, video, and the philosophy behind creating something that feels alive in the work.",
        status: "Process archive",
        href: "forge.html",
        linkLabel: "Read The Forge Method",
        tone: "process"
      },
      {
        id: "name-provenance-ledger",
        index: "09",
        title: "Name Provenance Ledger",
        description: "Why the names matter - from Callizto and Lyhdan to Ada Creative Forge, Nyx, Astra Vesper, Kaelen, The Forge, and Forge City.",
        status: "Deep archive",
        href: "name-provenance.html",
        linkLabel: "Read the ledger",
        tone: "process"
      }
    ]
  };

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function createArchiveLink(label, url) {
    var link = document.createElement("a");
    link.className = "button secondary";
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = label;
    return link;
  }

  function visibleLinks(item) {
    var links = Array.isArray(item.links) ? item.links.slice() : [];
    if (item.url) {
      links.push({ label: item.linkLabel || "Open", url: item.url });
    }
    return links.filter(function (link) {
      return !/cover/i.test(link.label || "");
    });
  }

  function createCard(item, type) {
    var article = document.createElement("article");
    article.className = type + "-card";
    article.dataset.arc = item.arc || "";
    article.dataset.status = item.status || "";

    var imageSource = item.image || item.coverImage;
    if (imageSource) {
      var image = document.createElement("img");
      image.src = imageSource;
      image.alt = item.imageAlt || "";
      article.appendChild(image);
    }

    var meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = [item.status, item.year].filter(Boolean).join(" / ");
    article.appendChild(meta);

    var detail = [item.type, item.arc, item.sourceLabel].filter(Boolean);
    if (detail.length) {
      var detailMeta = document.createElement("p");
      detailMeta.className = "meta";
      detailMeta.textContent = detail.join(" / ");
      article.appendChild(detailMeta);
    }

    var title = document.createElement("h3");
    title.textContent = item.title;
    article.appendChild(title);

    var description = document.createElement("p");
    description.textContent = item.description;
    article.appendChild(description);

    var links = visibleLinks(item);
    if (links.length) {
      var actions = document.createElement("div");
      actions.className = "card-actions";
      article.appendChild(actions);

      links.forEach(function (linkItem) {
        if (!linkItem.url) {
          return;
        }
        actions.appendChild(createArchiveLink(linkItem.label || "Open", linkItem.url));
      });
    }

    return article;
  }

  function renderJsonList(containerId, url, key, type) {
    var container = document.getElementById(containerId);
    if (!container) {
      return;
    }

    function renderItems(items, note) {
      container.innerHTML = "";
      if (note) {
        var noteElement = document.createElement("p");
        noteElement.className = "archive-load-note";
        noteElement.textContent = note;
        container.appendChild(noteElement);
      }
      items.forEach(function (item) {
        container.appendChild(createCard(item, type));
      });
    }

    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Unable to load " + url);
        }
        return response.json();
      })
      .then(function (data) {
        renderItems(data[key] || []);
      })
      .catch(function () {
        renderItems(
          fallbackData[key] || [],
          "Archive data could not be loaded in this local preview. Use a local server or GitHub Pages preview to load the data archive."
        );
      });
  }

  function createArchiveCategory(item, index) {
    var article = document.createElement("article");
    article.className = "archive-category-card archive-tone-" + slugify(item.tone || "default");

    var header = document.createElement("div");
    header.className = "archive-category-meta";
    article.appendChild(header);

    var number = document.createElement("span");
    number.className = "archive-category-number";
    number.textContent = item.index || String(index + 1).padStart(2, "0");
    header.appendChild(number);

    var status = document.createElement("span");
    status.className = "archive-category-status";
    status.textContent = item.status || "Archive index";
    header.appendChild(status);

    var title = document.createElement("h3");
    title.textContent = item.title || "Untitled archive";
    article.appendChild(title);

    var description = document.createElement("p");
    description.textContent = item.description || "";
    article.appendChild(description);

    if (item.href) {
      var link = document.createElement("a");
      link.className = "archive-card-link";
      link.href = item.href;
      link.textContent = item.linkLabel || "Open archive entry";
      article.appendChild(link);
    } else {
      var state = document.createElement("span");
      state.className = "archive-card-state";
      state.textContent = "Foundation ready for future entries";
      article.appendChild(state);
    }

    return article;
  }

  function renderArchiveCategories(containerId, url, key) {
    var container = document.getElementById(containerId);
    if (!container) {
      return;
    }

    function renderItems(items, note) {
      container.innerHTML = "";
      if (note) {
        var noteElement = document.createElement("p");
        noteElement.className = "archive-load-note";
        noteElement.textContent = note;
        container.appendChild(noteElement);
      }
      items.forEach(function (item, index) {
        container.appendChild(createArchiveCategory(item, index));
      });
    }

    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Unable to load " + url);
        }
        return response.json();
      })
      .then(function (data) {
        renderItems(data[key] || []);
      })
      .catch(function () {
        renderItems(
          fallbackData.archiveCategories || [],
          "Archive category data could not be loaded in this local preview. The built-in index is shown instead."
        );
      });
  }

  window.CDSArchiveData = fallbackData;

  renderJsonList("video-list", "data/videos.json", "videos", "video");
  renderArchiveCategories("archive-category-grid", "data/archive.json", "categories");
}());

(function () {
  "use strict";

  var body = document.body;
  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var header = document.querySelector("[data-site-header]");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.documentElement.classList.add("js");

  function syncNavigation() {
    if (!nav || !toggle) {
      return;
    }
    var open = nav.classList.contains("open");
    body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    var label = toggle.querySelector(".nav-toggle-label");
    if (label) {
      label.textContent = open ? "Close" : "Menu";
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      window.requestAnimationFrame(syncNavigation);
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        syncNavigation();
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        syncNavigation();
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 980 && nav.classList.contains("open")) {
        nav.classList.remove("open");
        syncNavigation();
      }
    });
  }

  function updatePageChrome() {
    var root = document.documentElement;
    var max = Math.max(1, root.scrollHeight - window.innerHeight);
    root.style.setProperty("--scroll-progress", String(Math.min(1, window.scrollY / max)));
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    }
  }

  updatePageChrome();
  window.addEventListener("scroll", updatePageChrome, { passive: true });
  window.addEventListener("resize", updatePageChrome);

  function initializeReveals() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!nodes.length || reducedMotion || !("IntersectionObserver" in window)) {
      nodes.forEach(function (node) { node.classList.add("is-visible"); });
      return;
    }
    body.classList.add("motion-ready");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    nodes.forEach(function (node) { observer.observe(node); });
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return "0:00";
    }
    var whole = Math.floor(seconds);
    return Math.floor(whole / 60) + ":" + String(whole % 60).padStart(2, "0");
  }

  function initializeHomePlayer() {
    var mount = document.getElementById("home-signal-player");
    if (!mount) {
      return;
    }

    function render(items) {
      var tracks = (items || []).filter(function (item) { return item.localAudio; });
      if (!tracks.length) {
        mount.innerHTML = '<p class="signal-player-loading">No playable archive records were found.</p>';
        return;
      }

      mount.innerHTML =
        '<div class="signal-player-shell">' +
          '<div class="signal-player-cover"><img alt=""></div>' +
          '<div class="signal-player-console">' +
            '<p class="signal-player-meta"></p><h3 class="signal-player-title"></h3><p class="signal-player-description"></p>' +
            '<div class="signal-player-transport">' +
              '<button class="signal-play-button" type="button"><span class="signal-play-icon" aria-hidden="true"></span><span class="visually-hidden">Play</span></button>' +
              '<input class="signal-player-progress" type="range" min="0" max="100" value="0" step="0.1" aria-label="Track progress">' +
              '<span class="signal-player-time">0:00 / 0:00</span>' +
            '</div>' +
            '<p class="signal-player-notice" aria-live="polite"></p>' +
            '<audio preload="metadata"></audio>' +
          '</div>' +
          '<div class="signal-track-list" aria-label="Quick listening list"></div>' +
        '</div>';

      var cover = mount.querySelector(".signal-player-cover img");
      var meta = mount.querySelector(".signal-player-meta");
      var title = mount.querySelector(".signal-player-title");
      var description = mount.querySelector(".signal-player-description");
      var play = mount.querySelector(".signal-play-button");
      var playLabel = play.querySelector(".visually-hidden");
      var progress = mount.querySelector(".signal-player-progress");
      var time = mount.querySelector(".signal-player-time");
      var notice = mount.querySelector(".signal-player-notice");
      var audio = mount.querySelector("audio");
      var list = mount.querySelector(".signal-track-list");
      var currentIndex = 0;

      tracks.forEach(function (track, index) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "signal-track-button";
        button.innerHTML = '<span>' + String(index + 1).padStart(2, "0") + '</span><span><strong></strong><small></small></span>';
        button.querySelector("strong").textContent = track.title;
        button.querySelector("small").textContent = track.arc || track.type || "Archive release";
        button.addEventListener("click", function () {
          selectTrack(index, true);
        });
        list.appendChild(button);
      });

      function updatePlayState() {
        var playing = !audio.paused;
        play.classList.toggle("is-playing", playing);
        playLabel.textContent = playing ? "Pause" : "Play";
        play.setAttribute("aria-label", playing ? "Pause " + tracks[currentIndex].title : "Play " + tracks[currentIndex].title);
      }

      function selectTrack(index, shouldPlay) {
        currentIndex = (index + tracks.length) % tracks.length;
        var track = tracks[currentIndex];
        cover.src = track.coverImage || "assets/images/release-placeholder.svg";
        cover.alt = track.imageAlt || track.title + " cover art";
        meta.textContent = [track.arc, track.type].filter(Boolean).join(" / ");
        title.textContent = track.title;
        description.textContent = track.description || "Callizto Dark Symphony archive release.";
        audio.src = track.localAudio;
        progress.value = "0";
        time.textContent = "0:00 / 0:00";
        notice.textContent = "";
        list.querySelectorAll(".signal-track-button").forEach(function (button, buttonIndex) {
          button.classList.toggle("active", buttonIndex === currentIndex);
          button.setAttribute("aria-pressed", String(buttonIndex === currentIndex));
        });
        updatePlayState();
        if (shouldPlay) {
          audio.play().catch(function () {
            notice.textContent = "Playback could not start. Select play to try again.";
            updatePlayState();
          });
        }
      }

      play.addEventListener("click", function () {
        if (audio.paused) {
          audio.play().catch(function () { notice.textContent = "Playback is unavailable for this record."; });
        } else {
          audio.pause();
        }
      });
      progress.addEventListener("input", function () {
        if (Number.isFinite(audio.duration)) {
          audio.currentTime = Number(progress.value) / 100 * audio.duration;
        }
      });
      audio.addEventListener("timeupdate", function () {
        if (Number.isFinite(audio.duration) && audio.duration > 0) {
          progress.value = String(audio.currentTime / audio.duration * 100);
          time.textContent = formatTime(audio.currentTime) + " / " + formatTime(audio.duration);
        }
      });
      audio.addEventListener("play", updatePlayState);
      audio.addEventListener("pause", updatePlayState);
      audio.addEventListener("ended", function () { selectTrack(currentIndex + 1, true); });
      audio.addEventListener("error", function () { notice.textContent = "This local audio record could not be loaded."; });
      selectTrack(0, false);
    }

    fetch("data/releases.json")
      .then(function (response) {
        if (!response.ok) { throw new Error("Release archive unavailable"); }
        return response.json();
      })
      .then(function (data) { render(data.releases || []); })
      .catch(function () { render(window.CDSArchiveData ? window.CDSArchiveData.releases : []); });
  }

  function initializeLoreExplorer() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-lore-tab]"));
    var panels = Array.prototype.slice.call(document.querySelectorAll("[data-lore-panel]"));
    if (!tabs.length || !panels.length) {
      return;
    }
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var key = tab.getAttribute("data-lore-tab");
        tabs.forEach(function (item) { item.setAttribute("aria-selected", String(item === tab)); });
        panels.forEach(function (panel) { panel.hidden = panel.getAttribute("data-lore-panel") !== key; });
      });
    });
  }

  function initializeVideoFilters() {
    var filterBar = document.getElementById("video-filters");
    var list = document.getElementById("video-list");
    if (!filterBar || !list) {
      return;
    }
    function applyFilter(value) {
      list.querySelectorAll(".video-card").forEach(function (card) {
        card.hidden = value !== "all" && card.dataset.arc !== value;
      });
    }
    filterBar.querySelectorAll("button").forEach(function (button) {
      button.addEventListener("click", function () {
        var value = button.getAttribute("data-video-filter") || "all";
        filterBar.querySelectorAll("button").forEach(function (item) {
          var active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        applyFilter(value);
      });
    });
  }

  initializeReveals();
  initializeHomePlayer();
  initializeLoreExplorer();
  initializeVideoFilters();
}());
