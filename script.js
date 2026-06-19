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

  function normalizeRelease(item, index) {
    return {
      id: item.id || slugify(item.title) || "track-" + index,
      title: item.title || "Untitled track",
      artist: item.artist || "Callizto Dark Symphony",
      year: item.year || "",
      status: item.status || "",
      type: item.type || "",
      arc: item.arc || "",
      coverImage: item.coverImage || item.image || "",
      coverAspect: ["portrait", "wide", "square"].indexOf(item.coverAspect) >= 0 ? item.coverAspect : "portrait",
      imageAlt: item.imageAlt || item.title || "",
      localAudio: item.localAudio || "",
      lyrics: item.lyrics || "",
      story: item.story || "",
      info: item.info || "",
      lyricsPending: item.lyricsPending !== false,
      archiveTextPending: item.archiveTextPending === true,
      description: item.description || ""
    };
  }

  function createButton(text, className) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = className || "button secondary";
    button.textContent = text;
    return button;
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

  function renderCdsMusicArchive(containerId, url, key) {
    var container = document.getElementById(containerId);
    if (!container) {
      return;
    }

    var storageKey = "cdsMusicPlayerPreferencesV1";
    var repeatModes = ["off", "one", "all"];

    function formatTime(seconds) {
      if (!Number.isFinite(seconds) || seconds < 0) {
        return "--:--";
      }
      var total = Math.floor(seconds);
      return Math.floor(total / 60) + ":" + String(total % 60).padStart(2, "0");
    }

    function uniqueKnownIds(values, officialIds) {
      var known = new Set(officialIds);
      var seen = new Set();
      return (Array.isArray(values) ? values : []).filter(function (id) {
        if (typeof id !== "string" || !known.has(id) || seen.has(id)) {
          return false;
        }
        seen.add(id);
        return true;
      });
    }

    function completeOrder(values, officialIds) {
      var order = uniqueKnownIds(values, officialIds);
      officialIds.forEach(function (id) {
        if (order.indexOf(id) < 0) {
          order.push(id);
        }
      });
      return order;
    }

    function defaultPreferences(officialIds) {
      return {
        trackOrder: officialIds.slice(),
        favorites: [],
        excluded: [],
        mode: "official",
        favoritesFirst: false,
        shuffle: false,
        repeat: "off"
      };
    }

    function readPreferences(officialIds) {
      var defaults = defaultPreferences(officialIds);
      try {
        var stored = JSON.parse(localStorage.getItem(storageKey) || "null");
        if (!stored || typeof stored !== "object") {
          var legacyExcluded = JSON.parse(localStorage.getItem("cdsExcludedTracksV1") || "[]");
          defaults.excluded = uniqueKnownIds(legacyExcluded, officialIds);
          defaults.mode = defaults.excluded.length ? "custom" : "official";
          return defaults;
        }
        return {
          trackOrder: completeOrder(stored.trackOrder, officialIds),
          favorites: uniqueKnownIds(stored.favorites, officialIds),
          excluded: uniqueKnownIds(stored.excluded, officialIds),
          mode: stored.mode === "custom" ? "custom" : "official",
          favoritesFirst: stored.favoritesFirst === true,
          shuffle: stored.shuffle === true,
          repeat: repeatModes.indexOf(stored.repeat) >= 0 ? stored.repeat : "off"
        };
      } catch (error) {
        return defaults;
      }
    }

    function savePreferences(preferences) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(preferences));
      } catch (error) {
        /* Listening preferences remain optional when storage is unavailable. */
      }
    }

    function iconButton(symbol, label, className) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "cds-icon-button" + (className ? " " + className : "");
      button.setAttribute("aria-label", label);
      button.title = label;
      var glyph = document.createElement("span");
      glyph.setAttribute("aria-hidden", "true");
      glyph.textContent = symbol;
      button.appendChild(glyph);
      return button;
    }

    function render(items, loadNote) {
      var tracks = items.map(normalizeRelease);
      var trackById = new Map(tracks.map(function (track) {
        return [track.id, track];
      }));
      var officialIds = tracks.map(function (track) {
        return track.id;
      });
      var preferences = readPreferences(officialIds);
      var unavailableIds = new Set(tracks.filter(function (track) {
        return !track.localAudio;
      }).map(function (track) {
        return track.id;
      }));
      var currentTrackId = "";
      var detailsMode = "";
      var isSeeking = false;
      var pendingPlayback = false;

      container.innerHTML = "";

      if (loadNote) {
        var loadNoteElement = document.createElement("p");
        loadNoteElement.className = "archive-load-note";
        loadNoteElement.textContent = loadNote;
        container.appendChild(loadNoteElement);
      }

      var playbackNotice = document.createElement("p");
      playbackNotice.className = "cds-playback-notice";
      playbackNotice.setAttribute("role", "status");
      playbackNotice.hidden = true;
      container.appendChild(playbackNotice);

      var shell = document.createElement("div");
      shell.className = "cds-music-archive";
      container.appendChild(shell);

      var player = document.createElement("article");
      player.className = "cds-player-shrine";
      shell.appendChild(player);

      var playerLabel = document.createElement("p");
      playerLabel.className = "cds-player-label";
      playerLabel.textContent = "CDS Archive Player";
      player.appendChild(playerLabel);

      var coverStage = document.createElement("div");
      coverStage.className = "cds-cover-stage is-portrait";
      player.appendChild(coverStage);

      var coverBackdrop = document.createElement("div");
      coverBackdrop.className = "cds-cover-backdrop";
      coverStage.appendChild(coverBackdrop);

      var cover = document.createElement("img");
      cover.className = "cds-cover-image";
      coverStage.appendChild(cover);

      var nowPlaying = document.createElement("div");
      nowPlaying.className = "cds-now-playing";
      player.appendChild(nowPlaying);

      var title = document.createElement("h3");
      nowPlaying.appendChild(title);

      var subtitle = document.createElement("p");
      subtitle.className = "cds-track-subtitle";
      nowPlaying.appendChild(subtitle);

      var audio = document.createElement("audio");
      audio.preload = "metadata";
      audio.className = "music-native-audio";
      audio.volume = 1;
      player.appendChild(audio);

      var progressBlock = document.createElement("div");
      progressBlock.className = "cds-progress-block";
      player.appendChild(progressBlock);

      var progress = document.createElement("input");
      progress.type = "range";
      progress.className = "cds-progress";
      progress.min = "0";
      progress.max = "0";
      progress.step = "0.01";
      progress.value = "0";
      progress.disabled = true;
      progress.setAttribute("aria-label", "Seek within current track");
      progressBlock.appendChild(progress);

      var timeRow = document.createElement("div");
      timeRow.className = "cds-time-row";
      progressBlock.appendChild(timeRow);

      var currentTimeLabel = document.createElement("span");
      currentTimeLabel.textContent = "0:00";
      timeRow.appendChild(currentTimeLabel);

      var durationLabel = document.createElement("span");
      durationLabel.textContent = "--:--";
      timeRow.appendChild(durationLabel);

      var controlRow = document.createElement("div");
      controlRow.className = "cds-transport-row";
      player.appendChild(controlRow);

      var shuffleButton = iconButton("â‡„", "Shuffle off", "cds-shuffle-control");
      var previousButton = iconButton("|â—€", "Previous track");
      var playButton = iconButton("â–¶", "Play", "cds-play-control");
      var nextButton = iconButton("â–¶|", "Next track");
      var repeatButton = iconButton("â†»", "Repeat off", "cds-repeat-control");
      var repeatBadge = document.createElement("small");
      repeatBadge.className = "cds-repeat-badge";
      repeatBadge.textContent = "1";
      repeatButton.appendChild(repeatBadge);

      [shuffleButton, previousButton, playButton, nextButton, repeatButton].forEach(function (button) {
        controlRow.appendChild(button);
      });

      var volumeControl = document.createElement("label");
      volumeControl.className = "cds-volume-control";
      volumeControl.setAttribute("aria-label", "Playback volume");
      player.appendChild(volumeControl);

      var volumeIcon = document.createElement("span");
      volumeIcon.setAttribute("aria-hidden", "true");
      volumeIcon.textContent = "â™ª";
      volumeControl.appendChild(volumeIcon);

      var volume = document.createElement("input");
      volume.type = "range";
      volume.min = "0";
      volume.max = "1";
      volume.step = "0.01";
      volume.value = "1";
      volume.setAttribute("aria-label", "Volume");
      volumeControl.appendChild(volume);

      var detailActions = document.createElement("div");
      detailActions.className = "cds-detail-actions";
      player.appendChild(detailActions);

      var lyricsButton = createButton("Lyrics / Story", "cds-detail-button");
      var infoButton = createButton("Track Info", "cds-detail-button");
      detailActions.appendChild(lyricsButton);
      detailActions.appendChild(infoButton);

      var detailsPanel = document.createElement("div");
      detailsPanel.className = "cds-track-details";
      detailsPanel.hidden = true;
      player.appendChild(detailsPanel);

      var archivePanel = document.createElement("aside");
      archivePanel.className = "cds-playlist-archive";
      shell.appendChild(archivePanel);

      var archiveHeader = document.createElement("header");
      archiveHeader.className = "cds-playlist-header";
      archivePanel.appendChild(archiveHeader);

      var archiveHeading = document.createElement("div");
      archiveHeader.appendChild(archiveHeading);

      var archiveEyebrow = document.createElement("p");
      archiveEyebrow.className = "cds-player-label";
      archiveEyebrow.textContent = "Ritual archive";
      archiveHeading.appendChild(archiveEyebrow);

      var archiveTitle = document.createElement("h3");
      archiveTitle.textContent = "Archive sequence";
      archiveHeading.appendChild(archiveTitle);

      var trackCount = document.createElement("p");
      trackCount.className = "cds-track-count";
      archiveHeader.appendChild(trackCount);

      var preferenceControls = document.createElement("div");
      preferenceControls.className = "cds-playlist-preferences";
      archivePanel.appendChild(preferenceControls);

      var savePlaylistButton = createButton("Save Custom Playlist", "cds-archive-command");
      var loadPlaylistButton = createButton("Load Custom Playlist", "cds-archive-command");
      var resetPlaylistButton = createButton("Reset Playlist", "cds-archive-command");
      var favoritesFirstButton = createButton("Favorites First", "cds-archive-command cds-favorites-first");
      favoritesFirstButton.setAttribute("aria-pressed", String(preferences.favoritesFirst));
      preferenceControls.appendChild(savePlaylistButton);
      preferenceControls.appendChild(loadPlaylistButton);
      preferenceControls.appendChild(resetPlaylistButton);
      preferenceControls.appendChild(favoritesFirstButton);

      var importInput = document.createElement("input");
      importInput.type = "file";
      importInput.accept = "application/json,.json";
      importInput.className = "visually-hidden";
      importInput.setAttribute("aria-label", "Load custom playlist JSON file");
      archivePanel.appendChild(importInput);

      var preferenceHelp = document.createElement("p");
      preferenceHelp.className = "cds-playlist-help";
      preferenceHelp.textContent = "Your custom playlist is saved in this browser. Save a backup if you want to keep it before clearing browser data.";
      archivePanel.appendChild(preferenceHelp);

      var preferenceMessage = document.createElement("p");
      preferenceMessage.className = "cds-playlist-message";
      preferenceMessage.setAttribute("role", "status");
      preferenceMessage.hidden = true;
      archivePanel.appendChild(preferenceMessage);

      var playlist = document.createElement("div");
      playlist.className = "cds-playlist-list";
      playlist.setAttribute("role", "list");
      archivePanel.appendChild(playlist);

      function orderedIds() {
        var base = preferences.mode === "custom"
          ? completeOrder(preferences.trackOrder, officialIds)
          : officialIds.slice();
        if (!preferences.favoritesFirst) {
          return base;
        }
        var favorites = new Set(preferences.favorites);
        return base.filter(function (id) {
          return favorites.has(id);
        }).concat(base.filter(function (id) {
          return !favorites.has(id);
        }));
      }

      function orderedTracks() {
        return orderedIds().map(function (id) {
          return trackById.get(id);
        }).filter(Boolean);
      }

      function enabledTracks() {
        var excluded = new Set(preferences.excluded);
        return orderedTracks().filter(function (track) {
          return !excluded.has(track.id) && !unavailableIds.has(track.id);
        });
      }

      function currentTrack() {
        var enabled = enabledTracks();
        if (!enabled.length) {
          return null;
        }
        return enabled.find(function (track) {
          return track.id === currentTrackId;
        }) || enabled[0];
      }

      function setMessage(message, isError) {
        preferenceMessage.hidden = !message;
        preferenceMessage.textContent = message || "";
        preferenceMessage.classList.toggle("is-error", Boolean(isError));
      }

      function syncPreferences() {
        preferences.trackOrder = completeOrder(preferences.trackOrder, officialIds);
        savePreferences(preferences);
      }

      function updateNotice() {
        if (!unavailableIds.size) {
          playbackNotice.hidden = true;
          playbackNotice.textContent = "";
          return;
        }
        playbackNotice.hidden = false;
        playbackNotice.textContent = "Playback notice: Some tracks may be temporarily unavailable. We are working on restoring full playback.";
      }

      function setProgressFill() {
        var max = Number(progress.max);
        var value = Number(progress.value);
        var percent = max > 0 && Number.isFinite(value) ? Math.max(0, Math.min(100, value / max * 100)) : 0;
        progress.style.setProperty("--progress", percent + "%");
      }

      function updateProgress() {
        var track = currentTrack();
        var hasDuration = Number.isFinite(audio.duration) && audio.duration > 0;
        progress.disabled = !track || !hasDuration;
        if (hasDuration) {
          progress.max = String(audio.duration);
          if (!isSeeking) {
            progress.value = String(Math.min(audio.currentTime, audio.duration));
          }
          durationLabel.textContent = formatTime(audio.duration);
        } else {
          progress.max = "0";
          if (!isSeeking) {
            progress.value = "0";
          }
          durationLabel.textContent = "--:--";
        }
        currentTimeLabel.textContent = formatTime(isSeeking ? Number(progress.value) : audio.currentTime);
        setProgressFill();
      }

      function loadTrack(track) {
        if (!track) {
          audio.pause();
          audio.removeAttribute("src");
          delete audio.dataset.trackId;
          audio.load();
          return;
        }
        if (audio.dataset.trackId === track.id) {
          return;
        }
        audio.pause();
        audio.removeAttribute("src");
        audio.dataset.trackId = track.id;
        audio.src = track.localAudio;
        audio.load();
      }

      function adjacentTrack(direction, wrap) {
        var enabled = enabledTracks();
        if (!enabled.length) {
          return null;
        }
        var current = currentTrack();
        if (preferences.shuffle && enabled.length > 1 && direction > 0) {
          var choices = enabled.filter(function (track) {
            return !current || track.id !== current.id;
          });
          return choices[Math.floor(Math.random() * choices.length)];
        }
        var index = enabled.findIndex(function (track) {
          return current && track.id === current.id;
        });
        var nextIndex = index + direction;
        if (nextIndex < 0 || nextIndex >= enabled.length) {
          if (!wrap) {
            return null;
          }
          nextIndex = nextIndex < 0 ? enabled.length - 1 : 0;
        }
        return enabled[nextIndex];
      }

      function selectTrack(trackId, shouldPlay) {
        if (preferences.excluded.indexOf(trackId) >= 0 || unavailableIds.has(trackId)) {
          return;
        }
        currentTrackId = trackId;
        detailsMode = "";
        loadTrack(currentTrack());
        update();
        if (shouldPlay) {
          playCurrentTrack();
        }
      }

      function moveTrack(direction, shouldPlay, wrap) {
        var next = adjacentTrack(direction, wrap !== false);
        if (!next) {
          audio.pause();
          updateTransport();
          return;
        }
        selectTrack(next.id, shouldPlay);
      }

      function markUnavailable(trackId, continuePlayback) {
        if (!trackId || unavailableIds.has(trackId)) {
          return;
        }
        var orderBeforeFailure = orderedTracks();
        var failedIndex = orderBeforeFailure.findIndex(function (track) {
          return track.id === trackId;
        });
        unavailableIds.add(trackId);
        var enabled = enabledTracks();
        var next = enabled.find(function (track) {
          return orderBeforeFailure.findIndex(function (orderedTrack) {
            return orderedTrack.id === track.id;
          }) > failedIndex;
        }) || (preferences.repeat === "all" ? enabled[0] : null);
        if (currentTrackId === trackId) {
          currentTrackId = next ? next.id : "";
          loadTrack(next);
        }
        update();
        if (continuePlayback && next) {
          playCurrentTrack();
        }
      }

      function playCurrentTrack() {
        var track = currentTrack();
        if (!track) {
          update();
          return;
        }
        pendingPlayback = true;
        loadTrack(track);
        audio.play().then(function () {
          pendingPlayback = false;
        }).catch(function (error) {
          pendingPlayback = false;
          if (error && error.name === "NotAllowedError") {
            setMessage("Playback was blocked by the browser. Press Play again.", true);
            return;
          }
          markUnavailable(track.id, true);
        });
      }

      function updateCover(track) {
        coverStage.className = "cds-cover-stage is-" + track.coverAspect;
        cover.src = track.coverImage;
        cover.alt = track.imageAlt || track.title + " cover art";
        coverBackdrop.style.backgroundImage = "url(" + JSON.stringify(track.coverImage) + ")";
      }

      function updateDetails(track) {
        detailsPanel.innerHTML = "";
        detailsPanel.hidden = !detailsMode || !track;
        lyricsButton.setAttribute("aria-pressed", String(detailsMode === "lyrics"));
        infoButton.setAttribute("aria-pressed", String(detailsMode === "info"));
        if (!track || !detailsMode) {
          return;
        }
        var heading = document.createElement("h4");
        heading.textContent = detailsMode === "lyrics" ? "Lyrics / Story" : "Track Info";
        detailsPanel.appendChild(heading);

        if (detailsMode === "lyrics") {
          var archiveText = [track.lyrics, track.story].filter(Boolean).join("\n\n");
          var copy = document.createElement("p");
          copy.textContent = archiveText || "Archive text pending.";
          detailsPanel.appendChild(copy);
          return;
        }

        var facts = document.createElement("dl");
        [
          ["Year", track.year],
          ["Arc", track.arc],
          ["Type", track.type],
          ["Archive notes", track.info || track.description]
        ].forEach(function (entry) {
          if (!entry[1]) {
            return;
          }
          var term = document.createElement("dt");
          term.textContent = entry[0];
          var definition = document.createElement("dd");
          definition.textContent = entry[1];
          facts.appendChild(term);
          facts.appendChild(definition);
        });
        detailsPanel.appendChild(facts);
      }

      function updateTransport() {
        var track = currentTrack();
        var hasTrack = Boolean(track);
        playButton.disabled = !hasTrack;
        previousButton.disabled = enabledTracks().length < 2;
        nextButton.disabled = enabledTracks().length < 2;
        playButton.firstChild.textContent = audio.paused ? "â–¶" : "âšâš";
        playButton.setAttribute("aria-label", audio.paused ? "Play" : "Pause");
        playButton.title = audio.paused ? "Play" : "Pause";

        shuffleButton.setAttribute("aria-pressed", String(preferences.shuffle));
        shuffleButton.setAttribute("aria-label", preferences.shuffle ? "Shuffle on" : "Shuffle off");
        shuffleButton.title = preferences.shuffle ? "Shuffle on" : "Shuffle off";

        repeatButton.setAttribute("aria-pressed", String(preferences.repeat !== "off"));
        repeatButton.setAttribute("data-repeat-mode", preferences.repeat);
        repeatBadge.hidden = preferences.repeat !== "one";
        var repeatLabel = preferences.repeat === "one" ? "Repeat one" : preferences.repeat === "all" ? "Repeat all" : "Repeat off";
        repeatButton.setAttribute("aria-label", repeatLabel);
        repeatButton.title = repeatLabel;
      }

      function renderPlaylist() {
        playlist.innerHTML = "";
        var ordered = orderedTracks();
        var enabled = enabledTracks();
        var favorites = new Set(preferences.favorites);
        var excluded = new Set(preferences.excluded);
        var track = currentTrack();

        trackCount.textContent = enabled.length + (enabled.length === 1 ? " track" : " tracks");
        favoritesFirstButton.setAttribute("aria-pressed", String(preferences.favoritesFirst));
        favoritesFirstButton.classList.toggle("is-active", preferences.favoritesFirst);

        if (!ordered.length) {
          var empty = document.createElement("p");
          empty.className = "cds-playlist-empty";
          empty.textContent = "The archive is waiting for its first release.";
          playlist.appendChild(empty);
          return;
        }

        ordered.forEach(function (item, index) {
          var isCurrent = track && track.id === item.id;
          var isFavorite = favorites.has(item.id);
          var isExcluded = excluded.has(item.id);
          var isUnavailable = unavailableIds.has(item.id);
          var row = document.createElement("div");
          row.className = "cds-playlist-item" +
            (isCurrent ? " is-current" : "") +
            (isFavorite ? " is-favorite" : "") +
            (isExcluded ? " is-excluded" : "") +
            (isUnavailable ? " is-unavailable" : "");
          row.setAttribute("role", "listitem");

          var position = document.createElement("span");
          position.className = "cds-track-position";
          position.textContent = String(index + 1).padStart(2, "0");
          row.appendChild(position);

          var select = document.createElement("button");
          select.type = "button";
          select.className = "cds-track-select";
          select.disabled = isExcluded || isUnavailable;
          select.setAttribute("aria-current", isCurrent ? "true" : "false");
          select.addEventListener("click", function () {
            selectTrack(item.id, true);
          });
          var name = document.createElement("strong");
          name.textContent = item.title;
          select.appendChild(name);
          var meta = document.createElement("small");
          meta.textContent = [item.arc, item.type].filter(Boolean).join(" / ");
          if (isUnavailable) {
            var unavailableHint = document.createElement("em");
            unavailableHint.textContent = "Unavailable";
            meta.appendChild(document.createTextNode(" "));
            meta.appendChild(unavailableHint);
          }
          select.appendChild(meta);
          row.appendChild(select);

          var actions = document.createElement("div");
          actions.className = "cds-track-row-actions";
          row.appendChild(actions);

          var favorite = iconButton("â›§", isFavorite ? "Remove track from favorites" : "Bind track to favorites", "cds-favorite-control");
          favorite.setAttribute("aria-pressed", String(isFavorite));
          favorite.addEventListener("click", function () {
            if (isFavorite) {
              preferences.favorites = preferences.favorites.filter(function (id) {
                return id !== item.id;
              });
            } else {
              preferences.favorites.push(item.id);
            }
            syncPreferences();
            renderPlaylist();
          });
          actions.appendChild(favorite);

          var exclude = iconButton("ðŸª“", isExcluded ? "Restore to custom playlist" : "Remove from custom playlist", "cds-exclude-control");
          exclude.setAttribute("aria-pressed", String(isExcluded));
          exclude.addEventListener("click", function () {
            var wasPlaying = !audio.paused;
            preferences.mode = "custom";
            if (isExcluded) {
              preferences.excluded = preferences.excluded.filter(function (id) {
                return id !== item.id;
              });
            } else {
              preferences.excluded.push(item.id);
            }
            syncPreferences();
            if (!isExcluded && currentTrackId === item.id) {
              var next = enabledTracks()[0] || null;
              currentTrackId = next ? next.id : "";
              loadTrack(next);
              if (wasPlaying && next) {
                playCurrentTrack();
              }
            }
            update();
          });
          actions.appendChild(exclude);

          if (preferences.mode === "custom" && !preferences.favoritesFirst) {
            var moveUp = iconButton("â†‘", "Move track up", "cds-order-control");
            var moveDown = iconButton("â†“", "Move track down", "cds-order-control");
            moveUp.disabled = index === 0;
            moveDown.disabled = index === ordered.length - 1;
            moveUp.addEventListener("click", function () {
              moveCustomTrack(item.id, -1);
            });
            moveDown.addEventListener("click", function () {
              moveCustomTrack(item.id, 1);
            });
            actions.appendChild(moveUp);
            actions.appendChild(moveDown);
          }

          playlist.appendChild(row);
        });
      }

      function moveCustomTrack(trackId, direction) {
        preferences.mode = "custom";
        var order = completeOrder(preferences.trackOrder, officialIds);
        var index = order.indexOf(trackId);
        var target = index + direction;
        if (index < 0 || target < 0 || target >= order.length) {
          return;
        }
        var swap = order[target];
        order[target] = trackId;
        order[index] = swap;
        preferences.trackOrder = order;
        syncPreferences();
        renderPlaylist();
      }

      function update() {
        var track = currentTrack();
        if (!track) {
          currentTrackId = "";
          loadTrack(null);
          title.textContent = "No playable tracks";
          subtitle.textContent = "Restore a track to continue listening.";
          cover.removeAttribute("src");
          cover.alt = "";
          coverBackdrop.style.backgroundImage = "none";
          lyricsButton.disabled = true;
          infoButton.disabled = true;
          updateDetails(null);
        } else {
          currentTrackId = track.id;
          loadTrack(track);
          updateCover(track);
          title.textContent = track.title;
          subtitle.textContent = track.arc || track.type || "Archive recording";
          var hasArchiveText = Boolean(track.lyrics || track.story);
          lyricsButton.disabled = !hasArchiveText;
          lyricsButton.title = hasArchiveText ? "Open lyrics and story" : "Archive Text Pending";
          infoButton.disabled = false;
          updateDetails(track);
        }
        updateNotice();
        updateProgress();
        updateTransport();
        renderPlaylist();
      }

      shuffleButton.addEventListener("click", function () {
        preferences.shuffle = !preferences.shuffle;
        syncPreferences();
        updateTransport();
      });

      previousButton.addEventListener("click", function () {
        if (audio.currentTime > 4) {
          audio.currentTime = 0;
          updateProgress();
          return;
        }
        moveTrack(-1, !audio.paused, true);
      });

      playButton.addEventListener("click", function () {
        if (audio.paused) {
          playCurrentTrack();
        } else {
          audio.pause();
        }
      });

      nextButton.addEventListener("click", function () {
        moveTrack(1, !audio.paused, true);
      });

      repeatButton.addEventListener("click", function () {
        var nextIndex = (repeatModes.indexOf(preferences.repeat) + 1) % repeatModes.length;
        preferences.repeat = repeatModes[nextIndex];
        syncPreferences();
        updateTransport();
      });

      volume.addEventListener("input", function () {
        audio.volume = Number(volume.value);
      });

      progress.addEventListener("input", function () {
        var target = Number(progress.value);
        if (!Number.isFinite(audio.duration) || audio.duration <= 0 || !Number.isFinite(target)) {
          return;
        }
        isSeeking = true;
        audio.currentTime = target;
        currentTimeLabel.textContent = formatTime(target);
        setProgressFill();
      });

      ["change", "pointerup", "keyup"].forEach(function (eventName) {
        progress.addEventListener(eventName, function () {
          isSeeking = false;
          updateProgress();
        });
      });

      lyricsButton.addEventListener("click", function () {
        detailsMode = detailsMode === "lyrics" ? "" : "lyrics";
        updateDetails(currentTrack());
      });

      infoButton.addEventListener("click", function () {
        detailsMode = detailsMode === "info" ? "" : "info";
        updateDetails(currentTrack());
      });

      favoritesFirstButton.addEventListener("click", function () {
        preferences.favoritesFirst = !preferences.favoritesFirst;
        preferences.mode = "custom";
        syncPreferences();
        renderPlaylist();
      });

      savePlaylistButton.addEventListener("click", function () {
        var payload = {
          app: "Callizto Dark Symphony",
          type: "music-player-preferences",
          version: 1,
          createdAt: new Date().toISOString(),
          trackOrder: completeOrder(preferences.trackOrder, officialIds),
          favorites: preferences.favorites.slice(),
          excluded: preferences.excluded.slice(),
          mode: "custom",
          favoritesFirst: preferences.favoritesFirst,
          shuffle: preferences.shuffle,
          repeat: preferences.repeat
        };
        var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        var objectUrl = URL.createObjectURL(blob);
        var download = document.createElement("a");
        download.href = objectUrl;
        download.download = "callizto-dark-symphony-playlist.json";
        document.body.appendChild(download);
        download.click();
        download.remove();
        URL.revokeObjectURL(objectUrl);
        setMessage("Custom playlist backup saved.", false);
      });

      loadPlaylistButton.addEventListener("click", function () {
        importInput.click();
      });

      importInput.addEventListener("change", function () {
        var file = importInput.files && importInput.files[0];
        if (!file) {
          return;
        }
        var reader = new FileReader();
        reader.addEventListener("load", function () {
          try {
            var imported = JSON.parse(String(reader.result || ""));
            if (!imported || imported.app !== "Callizto Dark Symphony" || imported.type !== "music-player-preferences" || imported.version !== 1) {
              throw new Error("This is not a CDS music-player preferences file.");
            }
            preferences.trackOrder = completeOrder(imported.trackOrder, officialIds);
            preferences.favorites = uniqueKnownIds(imported.favorites, officialIds);
            preferences.excluded = uniqueKnownIds(imported.excluded, officialIds);
            preferences.mode = "custom";
            preferences.favoritesFirst = imported.favoritesFirst === true;
            preferences.shuffle = imported.shuffle === true;
            preferences.repeat = repeatModes.indexOf(imported.repeat) >= 0 ? imported.repeat : "off";
            syncPreferences();
            currentTrackId = "";
            update();
            setMessage("Custom playlist restored and saved in this browser.", false);
          } catch (error) {
            setMessage(error instanceof Error ? error.message : "The playlist file could not be loaded.", true);
          }
          importInput.value = "";
        });
        reader.readAsText(file);
      });

      resetPlaylistButton.addEventListener("click", function () {
        var hasCustomSettings = preferences.mode === "custom" || preferences.favorites.length || preferences.excluded.length;
        if (hasCustomSettings && !window.confirm("Reset to the official CDS archive playlist and clear local favorites and exclusions?")) {
          return;
        }
        preferences = defaultPreferences(officialIds);
        syncPreferences();
        currentTrackId = "";
        detailsMode = "";
        update();
        setMessage("Official archive playlist restored.", false);
      });

      audio.addEventListener("play", updateTransport);
      audio.addEventListener("pause", updateTransport);
      audio.addEventListener("loadedmetadata", updateProgress);
      audio.addEventListener("durationchange", updateProgress);
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("error", function () {
        var failedTrackId = audio.dataset.trackId;
        markUnavailable(failedTrackId, pendingPlayback || !audio.paused);
      });
      audio.addEventListener("ended", function () {
        if (preferences.repeat === "one") {
          audio.currentTime = 0;
          playCurrentTrack();
          return;
        }
        var next = adjacentTrack(1, preferences.repeat === "all");
        if (next) {
          selectTrack(next.id, true);
        } else {
          audio.pause();
          updateTransport();
        }
      });

      update();
    }

    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Unable to load " + url);
        }
        return response.json();
      })
      .then(function (data) {
        render(data[key] || []);
      })
      .catch(function () {
        var fallbackItems = (fallbackData[key] || []).map(function (item, index) {
          return Object.assign({}, item, {
            artist: item.artist || "Callizto Dark Symphony",
            coverAspect: item.coverAspect || (index < 3 ? "portrait" : "wide")
          });
        });
        render(fallbackItems, "Archive data could not be loaded. A local fallback archive is being shown.");
      });
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

  renderCdsMusicArchive("music-player", "data/releases.json", "releases");
  renderJsonList("video-list", "data/videos.json", "videos", "video");
  renderArchiveCategories("archive-category-grid", "data/archive.json", "categories");
}());
