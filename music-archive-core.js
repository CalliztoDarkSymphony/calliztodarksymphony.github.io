(function () {
  "use strict";

  var container = document.getElementById("music-player");
  if (!container) {
    return;
  }

  var dataUrl = "data/releases.json";
  var dataKey = "releases";
  var stateKey = "cdsMusicArchiveCoreV1";
  var legacyStateKey = "cdsMusicPlayerPreferencesV1";
  var legacyExcludedKey = "cdsExcludedTracksV1";
  var appName = "Callizto Dark Symphony";
  var backupType = "music-archive-backup";
  var backupVersion = 1;
  var repeatModes = ["off", "one", "all"];

  var iconMarkup = {
    play: '<path d="M8 5v14l11-7z"/>',
    pause: '<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>',
    previous: '<path d="M6 5h2v14H6zM18 5v14L9 12z"/>',
    next: '<path d="M16 5h2v14h-2zM6 5l9 7-9 7z"/>',
    shuffle: '<path d="M4 7h3.2c2.8 0 4.2 2.2 5.6 5s2.8 5 5.6 5H20" fill="none"/><path d="m17 14 3 3-3 3M4 17h3.2c1.5 0 2.6-.6 3.5-1.6M14.2 8.6c1-1 2.2-1.6 4.2-1.6H20M17 4l3 3-3 3" fill="none"/>',
    repeat: '<path d="M17 2l3 3-3 3" fill="none"/><path d="M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3" fill="none"/><path d="M20 13v2a4 4 0 0 1-4 4H4" fill="none"/>',
    volume: '<path d="M4 10v4h4l5 4V6L8 10z"/><path d="M16 9c1 .8 1.5 1.8 1.5 3S17 14.2 16 15M18.5 6.5A7 7 0 0 1 21 12a7 7 0 0 1-2.5 5.5" fill="none"/>',
    favorite: '<path d="M12 21 5.53 1.1l16.93 12.31H1.54L18.47 1.1z" fill="none"/>',
    axe: '<path d="M7 21 15.5 5" fill="none"/><path d="M13.5 4.8c2.7-2.2 5.4-1.8 7.5-.6-.2 3.3-1.8 5.7-5.7 7.1l-3.8-2z"/><path d="m5 18 4 2" fill="none"/>',
    more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
    up: '<path d="m6 14 6-6 6 6M12 8v10" fill="none"/>',
    down: '<path d="m6 10 6 6 6-6M12 6v10" fill="none"/>',
    remove: '<path d="M6 6l12 12M18 6 6 18" fill="none"/>',
    queue: '<path d="M5 6h10M5 12h10M5 18h7" fill="none"/><path d="M19 14v6M16 17h6" fill="none"/>'
  };

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function textArray(value) {
    if (Array.isArray(value)) {
      return value.map(function (item) {
        return String(item || "").trim();
      }).filter(Boolean);
    }
    if (typeof value === "string" && value.trim()) {
      return value.split(",").map(function (item) {
        return item.trim();
      }).filter(Boolean);
    }
    return [];
  }

  function isPublic(value) {
    return ["private", "hidden", "internal", "draft"].indexOf(String(value || "public").toLowerCase()) < 0;
  }

  function normalizeVersion(version, releaseId, index, fallbackAudio) {
    var source = version && typeof version === "object" ? version : {};
    return {
      id: source.id || releaseId + "-version-" + (index + 1),
      label: source.label || source.title || (index === 0 ? "Primary version" : "Version " + (index + 1)),
      localAudio: source.localAudio || source.audio || (index === 0 ? fallbackAudio : "") || "",
      publicStatus: source.publicStatus || "public",
      versionType: source.versionType || source.type || "archive-master",
      year: source.year || "",
      notes: source.notes || source.description || ""
    };
  }

  function normalizeRelease(item, index) {
    var source = item && typeof item === "object" ? item : {};
    var id = source.id || slugify(source.title) || "track-" + index;
    var rawVersions = Array.isArray(source.versions) && source.versions.length
      ? source.versions
      : [{
        id: source.primaryVersionId || id + "-primary",
        label: source.versionLabel || "Primary archive version",
        localAudio: source.localAudio || "",
        publicStatus: "public",
        versionType: "archive-master",
        notes: source.versionNotes || ""
      }];
    var versions = rawVersions.map(function (version, versionIndex) {
      return normalizeVersion(version, id, versionIndex, source.localAudio || "");
    }).filter(function (version) {
      return isPublic(version.publicStatus);
    });
    var primaryVersionId = source.primaryVersionId || (versions[0] && versions[0].id) || "";
    var primaryVersion = versions.find(function (version) {
      return version.id === primaryVersionId;
    }) || versions[0] || null;
    var arcIds = textArray(source.arcIds);
    if (!arcIds.length && source.arc) {
      arcIds.push(slugify(source.arc));
    }
    var tags = textArray(source.tags);
    var releaseType = source.releaseType || source.type || "Archive release";
    var track = {
      id: id,
      title: source.title || "Untitled track",
      artist: source.artist || appName,
      year: source.year || "",
      publicStatus: source.publicStatus || "public",
      canonStatus: source.canonStatus || "archive",
      releaseType: releaseType,
      type: source.type || releaseType,
      primaryVersionId: primaryVersion ? primaryVersion.id : primaryVersionId,
      arc: source.arc || "",
      arcIds: arcIds,
      tags: tags,
      coverImage: source.coverImage || source.image || "",
      coverAspect: ["portrait", "wide", "square"].indexOf(source.coverAspect) >= 0 ? source.coverAspect : "portrait",
      imageAlt: source.imageAlt || source.title || "",
      description: source.description || "",
      lyrics: source.lyrics || "",
      story: source.story || "",
      info: source.info || "",
      lyricsPending: source.lyricsPending !== false,
      archiveTextPending: source.archiveTextPending === true,
      versions: versions
    };
    track.searchText = [
      track.title,
      track.artist,
      track.year,
      track.arc,
      track.releaseType,
      track.description,
      track.tags.join(" "),
      track.arcIds.join(" "),
      versions.map(function (version) {
        return version.label + " " + version.notes;
      }).join(" ")
    ].join(" ").toLowerCase();
    return track;
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

  function knownQueueIds(values, officialIds) {
    var known = new Set(officialIds);
    return (Array.isArray(values) ? values : []).filter(function (id) {
      return typeof id === "string" && known.has(id);
    }).slice(0, 200);
  }

  function defaultState(officialIds) {
    return {
      schemaVersion: 1,
      playlist: officialIds.slice(),
      knownTrackIds: officialIds.slice(),
      favorites: [],
      queue: [],
      shuffle: false,
      repeat: "off",
      activeView: "library"
    };
  }

  function normalizeState(raw, officialIds) {
    var source = raw && typeof raw === "object" ? raw : {};
    var playlist = uniqueKnownIds(source.playlist, officialIds);
    var knownTrackIds = uniqueKnownIds(source.knownTrackIds, officialIds);
    if (!knownTrackIds.length) {
      knownTrackIds = officialIds.slice();
    }
    officialIds.forEach(function (id) {
      if (knownTrackIds.indexOf(id) < 0 && playlist.indexOf(id) < 0) {
        playlist.push(id);
      }
    });
    return {
      schemaVersion: 1,
      playlist: playlist,
      knownTrackIds: officialIds.slice(),
      favorites: uniqueKnownIds(source.favorites, officialIds),
      queue: knownQueueIds(source.queue, officialIds),
      shuffle: source.shuffle === true,
      repeat: repeatModes.indexOf(source.repeat) >= 0 ? source.repeat : "off",
      activeView: ["library", "playlist", "queue", "favorites"].indexOf(source.activeView) >= 0 ? source.activeView : "library"
    };
  }

  function migrateLegacyState(legacy, officialIds) {
    var source = legacy && typeof legacy === "object" ? legacy : {};
    var order = uniqueKnownIds(source.trackOrder, officialIds);
    officialIds.forEach(function (id) {
      if (order.indexOf(id) < 0) {
        order.push(id);
      }
    });
    var excluded = new Set(uniqueKnownIds(source.excluded, officialIds));
    return normalizeState({
      playlist: order.filter(function (id) {
        return !excluded.has(id);
      }),
      knownTrackIds: officialIds,
      favorites: source.favorites,
      queue: source.queue,
      shuffle: source.shuffle,
      repeat: source.repeat,
      activeView: "library"
    }, officialIds);
  }

  function readJsonStorage(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch (error) {
      return null;
    }
  }

  function readState(officialIds) {
    var stored = readJsonStorage(stateKey);
    if (stored && typeof stored === "object") {
      return normalizeState(stored, officialIds);
    }
    var legacy = readJsonStorage(legacyStateKey);
    if (!legacy || typeof legacy !== "object") {
      var legacyExcluded = readJsonStorage(legacyExcludedKey);
      legacy = { excluded: Array.isArray(legacyExcluded) ? legacyExcluded : [] };
    }
    return migrateLegacyState(legacy, officialIds);
  }

  function saveState(state) {
    try {
      localStorage.setItem(stateKey, JSON.stringify(state));
    } catch (error) {
      /* The player still works when local browser storage is unavailable. */
    }
  }

  function createSvgIcon(name) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    svg.classList.add("cds-control-icon");
    svg.innerHTML = iconMarkup[name] || iconMarkup.more;
    return svg;
  }

  function iconButton(icon, label, className) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "cds-icon-button" + (className ? " " + className : "");
    button.setAttribute("aria-label", label);
    button.title = label;
    button.appendChild(createSvgIcon(icon));
    return button;
  }

  function replaceButtonIcon(button, icon) {
    var current = button.querySelector("svg");
    var next = createSvgIcon(icon);
    if (current) {
      current.replaceWith(next);
    } else {
      button.prepend(next);
    }
  }

  function textButton(label, className) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = className || "cds-archive-command";
    button.textContent = label;
    return button;
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return "--:--";
    }
    var total = Math.floor(seconds);
    return Math.floor(total / 60) + ":" + String(total % 60).padStart(2, "0");
  }

  function render(rawItems) {
    var tracks = rawItems.map(normalizeRelease).filter(function (track) {
      return isPublic(track.publicStatus);
    });
    var trackById = new Map(tracks.map(function (track) {
      return [track.id, track];
    }));
    var officialIds = tracks.map(function (track) {
      return track.id;
    });
    var state = readState(officialIds);
    saveState(state);

    var failedVersionIds = new Set();
    var currentTrackId = "";
    var currentVersionId = "";
    var playbackOrderIds = state.playlist.length ? state.playlist.slice() : officialIds.slice();
    var detailsMode = "";
    var activeView = state.activeView;
    var editPlaylist = false;
    var openMenuKey = "";
    var searchQuery = "";
    var libraryFilter = "all";
    var arcFilter = "";
    var isSeeking = false;
    var pendingPlayback = false;

    container.innerHTML = "";

    var playbackNotice = document.createElement("p");
    playbackNotice.className = "cds-playback-notice";
    playbackNotice.setAttribute("role", "status");
    playbackNotice.hidden = true;
    container.appendChild(playbackNotice);

    var shell = document.createElement("div");
    shell.className = "cds-music-archive cds-music-core-v1";
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

    var versionControl = document.createElement("label");
    versionControl.className = "cds-version-control";
    versionControl.hidden = true;
    versionControl.appendChild(document.createTextNode("Version"));
    var versionSelect = document.createElement("select");
    versionSelect.setAttribute("aria-label", "Track version");
    versionControl.appendChild(versionSelect);
    nowPlaying.appendChild(versionControl);

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

    var shuffleButton = iconButton("shuffle", "Shuffle off", "cds-shuffle-control");
    var previousButton = iconButton("previous", "Previous track");
    var playButton = iconButton("play", "Play", "cds-play-control");
    var nextButton = iconButton("next", "Next track");
    var repeatButton = iconButton("repeat", "Repeat off", "cds-repeat-control");
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
    volumeControl.appendChild(createSvgIcon("volume"));
    var volume = document.createElement("input");
    volume.type = "range";
    volume.min = "0";
    volume.max = "1";
    volume.step = "0.01";
    volume.value = "1";
    volume.setAttribute("aria-label", "Volume");
    volumeControl.appendChild(volume);
    player.appendChild(volumeControl);

    var detailActions = document.createElement("div");
    detailActions.className = "cds-detail-actions";
    var lyricsButton = textButton("Lyrics / Story", "cds-detail-button");
    var infoButton = textButton("Track Info", "cds-detail-button");
    detailActions.appendChild(lyricsButton);
    detailActions.appendChild(infoButton);
    player.appendChild(detailActions);

    var detailsPanel = document.createElement("div");
    detailsPanel.className = "cds-track-details";
    detailsPanel.hidden = true;
    player.appendChild(detailsPanel);

    var archivePanel = document.createElement("aside");
    archivePanel.className = "cds-playlist-archive";
    shell.appendChild(archivePanel);

    var archiveHeader = document.createElement("header");
    archiveHeader.className = "cds-playlist-header";
    var archiveHeading = document.createElement("div");
    var archiveEyebrow = document.createElement("p");
    archiveEyebrow.className = "cds-player-label";
    archiveEyebrow.textContent = "Curated public archive";
    var archiveTitle = document.createElement("h3");
    archiveTitle.textContent = "Library";
    archiveHeading.appendChild(archiveEyebrow);
    archiveHeading.appendChild(archiveTitle);
    archiveHeader.appendChild(archiveHeading);
    var trackCount = document.createElement("p");
    trackCount.className = "cds-track-count";
    archiveHeader.appendChild(trackCount);
    archivePanel.appendChild(archiveHeader);

    var tabs = document.createElement("div");
    tabs.className = "cds-archive-tabs";
    tabs.setAttribute("role", "tablist");
    archivePanel.appendChild(tabs);

    var tabButtons = {};
    [
      ["library", "Library"],
      ["playlist", "My Playlist"],
      ["queue", "Queue"],
      ["favorites", "Favorites"]
    ].forEach(function (entry) {
      var button = textButton(entry[1], "cds-archive-tab");
      button.setAttribute("role", "tab");
      button.dataset.view = entry[0];
      var count = document.createElement("small");
      button.appendChild(count);
      button.addEventListener("click", function () {
        activeView = entry[0];
        state.activeView = activeView;
        editPlaylist = false;
        openMenuKey = "";
        syncState();
        renderArchive();
      });
      tabButtons[entry[0]] = button;
      tabs.appendChild(button);
    });

    var libraryTools = document.createElement("div");
    libraryTools.className = "cds-library-tools";
    archivePanel.appendChild(libraryTools);

    var search = document.createElement("input");
    search.type = "search";
    search.className = "cds-library-search";
    search.placeholder = "Search the public archive";
    search.setAttribute("aria-label", "Search music library");
    libraryTools.appendChild(search);

    var filters = document.createElement("div");
    filters.className = "cds-library-filters";
    libraryTools.appendChild(filters);

    var filterButtons = {};
    [["all", "All"], ["favorites", "Favorites"], ["available", "Available audio"]].forEach(function (entry) {
      var button = textButton(entry[1], "cds-filter-button");
      button.setAttribute("aria-pressed", String(libraryFilter === entry[0]));
      button.addEventListener("click", function () {
        libraryFilter = entry[0];
        Object.keys(filterButtons).forEach(function (name) {
          filterButtons[name].setAttribute("aria-pressed", String(name === libraryFilter));
        });
        renderArchive();
      });
      filterButtons[entry[0]] = button;
      filters.appendChild(button);
    });

    var arcSelect = document.createElement("select");
    arcSelect.className = "cds-arc-filter";
    arcSelect.setAttribute("aria-label", "Filter by arc or collection");
    var allArcs = document.createElement("option");
    allArcs.value = "";
    allArcs.textContent = "All arcs / collections";
    arcSelect.appendChild(allArcs);
    var arcLabels = new Map();
    tracks.forEach(function (track) {
      track.arcIds.forEach(function (arcId) {
        if (!arcLabels.has(arcId)) {
          arcLabels.set(arcId, track.arc || arcId);
        }
      });
    });
    Array.from(arcLabels.entries()).sort(function (a, b) {
      return a[1].localeCompare(b[1]);
    }).forEach(function (entry) {
      var option = document.createElement("option");
      option.value = entry[0];
      option.textContent = entry[1];
      arcSelect.appendChild(option);
    });
    libraryTools.appendChild(arcSelect);

    var viewToolbar = document.createElement("div");
    viewToolbar.className = "cds-view-toolbar";
    archivePanel.appendChild(viewToolbar);

    var editPlaylistButton = textButton("Edit Playlist", "cds-archive-command");
    var clearQueueButton = textButton("Clear Queue", "cds-archive-command");
    viewToolbar.appendChild(editPlaylistButton);
    viewToolbar.appendChild(clearQueueButton);

    var message = document.createElement("p");
    message.className = "cds-playlist-message";
    message.setAttribute("role", "status");
    message.hidden = true;
    archivePanel.appendChild(message);

    var playlist = document.createElement("div");
    playlist.className = "cds-playlist-list";
    playlist.setAttribute("role", "list");
    archivePanel.appendChild(playlist);

    var backupPanel = document.createElement("div");
    backupPanel.className = "cds-archive-backup";
    var backupCopy = document.createElement("p");
    backupCopy.textContent = "Playlist, queue, favorites, shuffle, and repeat auto-save in this browser.";
    var exportButton = textButton("Export Backup", "cds-archive-command");
    var importButton = textButton("Import Backup", "cds-archive-command");
    backupPanel.appendChild(backupCopy);
    backupPanel.appendChild(exportButton);
    backupPanel.appendChild(importButton);
    archivePanel.appendChild(backupPanel);

    var importInput = document.createElement("input");
    importInput.type = "file";
    importInput.accept = "application/json,.json";
    importInput.className = "visually-hidden";
    importInput.setAttribute("aria-label", "Import music archive backup");
    archivePanel.appendChild(importInput);

    function syncState() {
      state = normalizeState(state, officialIds);
      state.activeView = activeView;
      saveState(state);
    }

    function setMessage(text, isError) {
      message.hidden = !text;
      message.textContent = text || "";
      message.classList.toggle("is-error", Boolean(isError));
    }

    function publicVersions(track) {
      return track ? track.versions.filter(function (version) {
        return isPublic(version.publicStatus);
      }) : [];
    }

    function versionKey(trackId, versionId) {
      return trackId + "::" + versionId;
    }

    function availableVersion(track, preferredId) {
      if (!track) {
        return null;
      }
      var versions = publicVersions(track).filter(function (version) {
        return version.localAudio && !failedVersionIds.has(versionKey(track.id, version.id));
      });
      return versions.find(function (version) {
        return version.id === preferredId;
      }) || versions.find(function (version) {
        return version.id === track.primaryVersionId;
      }) || versions[0] || null;
    }

    function isTrackAvailable(track) {
      return Boolean(availableVersion(track, track && track.primaryVersionId));
    }

    function currentTrack() {
      return trackById.get(currentTrackId) || null;
    }

    function currentVersion() {
      return availableVersion(currentTrack(), currentVersionId);
    }

    function libraryIds() {
      var favorites = new Set(state.favorites);
      var query = searchQuery.trim().toLowerCase();
      return officialIds.filter(function (id) {
        var track = trackById.get(id);
        if (!track) {
          return false;
        }
        if (query && track.searchText.indexOf(query) < 0) {
          return false;
        }
        if (libraryFilter === "favorites" && !favorites.has(id)) {
          return false;
        }
        if (libraryFilter === "available" && !isTrackAvailable(track)) {
          return false;
        }
        if (arcFilter && track.arcIds.indexOf(arcFilter) < 0) {
          return false;
        }
        return true;
      });
    }

    function viewIds() {
      if (activeView === "playlist") {
        return state.playlist.slice();
      }
      if (activeView === "queue") {
        return state.queue.slice();
      }
      if (activeView === "favorites") {
        var favorites = new Set(state.favorites);
        return officialIds.filter(function (id) {
          return favorites.has(id);
        });
      }
      return libraryIds();
    }

    function playableIds(values) {
      return values.filter(function (id) {
        var track = trackById.get(id);
        return track && isTrackAvailable(track);
      });
    }

    function updateNotice() {
      var unavailable = tracks.filter(function (track) {
        return !isTrackAvailable(track);
      });
      playbackNotice.hidden = unavailable.length === 0;
      playbackNotice.textContent = unavailable.length
        ? "Playback notice: Some tracks may be temporarily unavailable. Available releases will continue playing."
        : "";
    }

    function updateCover(track) {
      coverStage.className = "cds-cover-stage is-" + track.coverAspect;
      cover.src = track.coverImage;
      cover.alt = track.imageAlt || track.title + " cover art";
      coverBackdrop.style.backgroundImage = "url(" + JSON.stringify(track.coverImage) + ")";
    }

    function setProgressFill() {
      var max = Number(progress.max);
      var value = Number(progress.value);
      var percent = max > 0 && Number.isFinite(value) ? Math.max(0, Math.min(100, value / max * 100)) : 0;
      progress.style.setProperty("--progress", percent + "%");
    }

    function updateProgress() {
      var hasDuration = Number.isFinite(audio.duration) && audio.duration > 0;
      progress.disabled = !currentTrack() || !hasDuration;
      progress.max = hasDuration ? String(audio.duration) : "0";
      if (!isSeeking) {
        progress.value = hasDuration ? String(Math.min(audio.currentTime, audio.duration)) : "0";
      }
      currentTimeLabel.textContent = formatTime(isSeeking ? Number(progress.value) : audio.currentTime);
      durationLabel.textContent = hasDuration ? formatTime(audio.duration) : "--:--";
      setProgressFill();
    }

    function loadTrack(track, preferredVersionId) {
      var version = availableVersion(track, preferredVersionId);
      if (!track || !version) {
        audio.pause();
        audio.removeAttribute("src");
        delete audio.dataset.trackId;
        delete audio.dataset.versionId;
        audio.load();
        return null;
      }
      currentTrackId = track.id;
      currentVersionId = version.id;
      if (audio.dataset.trackId === track.id && audio.dataset.versionId === version.id) {
        return version;
      }
      audio.pause();
      audio.removeAttribute("src");
      audio.dataset.trackId = track.id;
      audio.dataset.versionId = version.id;
      audio.src = version.localAudio;
      audio.load();
      return version;
    }

    function takeNextQueuedTrack() {
      while (state.queue.length) {
        var id = state.queue.shift();
        var track = trackById.get(id);
        if (track && isTrackAvailable(track)) {
          syncState();
          return track;
        }
      }
      syncState();
      return null;
    }

    function contextTrack(direction, wrap) {
      var order = playableIds(playbackOrderIds.length ? playbackOrderIds : officialIds);
      if (!order.length) {
        return null;
      }
      if (state.shuffle && direction > 0 && order.length > 1) {
        var choices = order.filter(function (id) {
          return id !== currentTrackId;
        });
        return trackById.get(choices[Math.floor(Math.random() * choices.length)]) || null;
      }
      var index = order.indexOf(currentTrackId);
      var nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= order.length) {
        if (!wrap) {
          return null;
        }
        nextIndex = nextIndex < 0 ? order.length - 1 : 0;
      }
      return trackById.get(order[nextIndex]) || null;
    }

    function selectTrack(trackId, shouldPlay, contextIds) {
      var track = trackById.get(trackId);
      if (!track || !isTrackAvailable(track)) {
        return;
      }
      if (Array.isArray(contextIds) && contextIds.length) {
        playbackOrderIds = contextIds.slice();
      }
      detailsMode = "";
      loadTrack(track, track.primaryVersionId);
      updatePlayer();
      renderArchive();
      if (shouldPlay) {
        playCurrentTrack();
      }
    }

    function playCurrentTrack() {
      var track = currentTrack();
      var version = loadTrack(track, currentVersionId);
      if (!track || !version) {
        movePlayback(1, true, state.repeat === "all");
        return;
      }
      pendingPlayback = true;
      audio.play().then(function () {
        pendingPlayback = false;
      }).catch(function (error) {
        pendingPlayback = false;
        if (error && error.name === "NotAllowedError") {
          setMessage("Playback was blocked by the browser. Press Play again.", true);
          return;
        }
        markVersionUnavailable(track.id, version.id, true);
      });
    }

    function movePlayback(direction, shouldPlay, wrap) {
      var next = direction > 0 ? takeNextQueuedTrack() : null;
      if (!next) {
        next = contextTrack(direction, wrap !== false);
      }
      if (!next) {
        audio.pause();
        updateTransport();
        renderArchive();
        return;
      }
      selectTrack(next.id, shouldPlay, playbackOrderIds);
    }

    function markVersionUnavailable(trackId, versionId, continuePlayback) {
      if (!trackId || !versionId) {
        return;
      }
      failedVersionIds.add(versionKey(trackId, versionId));
      var track = trackById.get(trackId);
      var fallbackVersion = availableVersion(track, "");
      if (track && fallbackVersion) {
        loadTrack(track, fallbackVersion.id);
        updatePlayer();
        renderArchive();
        if (continuePlayback) {
          playCurrentTrack();
        }
        return;
      }
      updateNotice();
      movePlayback(1, continuePlayback, state.repeat === "all");
    }

    function playNow(trackId, contextIds, queueIndex) {
      if (Number.isInteger(queueIndex) && queueIndex >= 0) {
        state.queue.splice(queueIndex, 1);
        syncState();
      }
      selectTrack(trackId, true, contextIds);
      setMessage("Playing now.", false);
    }

    function playNext(trackId) {
      state.queue = state.queue.filter(function (id) {
        return id !== trackId;
      });
      state.queue.unshift(trackId);
      syncState();
      setMessage("Track placed next in queue.", false);
      renderArchive();
    }

    function addToQueue(trackId) {
      if (state.queue.indexOf(trackId) < 0) {
        state.queue.push(trackId);
        syncState();
        setMessage("Track added to queue.", false);
      } else {
        setMessage("Track is already in the queue.", false);
      }
      renderArchive();
    }

    function addToPlaylist(trackId) {
      if (state.playlist.indexOf(trackId) < 0) {
        state.playlist.push(trackId);
        syncState();
        setMessage("Track added to My Playlist.", false);
      }
      renderArchive();
    }

    function removeFromPlaylist(trackId) {
      state.playlist = state.playlist.filter(function (id) {
        return id !== trackId;
      });
      syncState();
      setMessage("Track removed from My Playlist. It remains available in Library.", false);
      renderArchive();
    }

    function movePlaylistTrack(trackId, direction) {
      var index = state.playlist.indexOf(trackId);
      var target = index + direction;
      if (index < 0 || target < 0 || target >= state.playlist.length) {
        return;
      }
      var swap = state.playlist[target];
      state.playlist[target] = trackId;
      state.playlist[index] = swap;
      syncState();
      renderArchive();
    }

    function toggleFavorite(trackId) {
      if (state.favorites.indexOf(trackId) >= 0) {
        state.favorites = state.favorites.filter(function (id) {
          return id !== trackId;
        });
        setMessage("Track removed from Favorites.", false);
      } else {
        state.favorites.push(trackId);
        setMessage("Track added to Favorites.", false);
      }
      syncState();
      renderArchive();
    }

    function updateTransport() {
      var hasTrack = Boolean(currentTrack() && currentVersion());
      playButton.disabled = !hasTrack;
      previousButton.disabled = playableIds(playbackOrderIds).length < 2;
      nextButton.disabled = playableIds(playbackOrderIds).length < 2 && state.queue.length === 0;
      replaceButtonIcon(playButton, audio.paused ? "play" : "pause");
      playButton.setAttribute("aria-label", audio.paused ? "Play" : "Pause");
      playButton.title = audio.paused ? "Play" : "Pause";
      shuffleButton.setAttribute("aria-pressed", String(state.shuffle));
      shuffleButton.setAttribute("aria-label", state.shuffle ? "Shuffle on" : "Shuffle off");
      shuffleButton.title = state.shuffle ? "Shuffle on" : "Shuffle off";
      repeatButton.setAttribute("aria-pressed", String(state.repeat !== "off"));
      repeatButton.dataset.repeatMode = state.repeat;
      repeatBadge.hidden = state.repeat !== "one";
      var label = state.repeat === "one" ? "Repeat one" : state.repeat === "all" ? "Repeat all" : "Repeat off";
      repeatButton.setAttribute("aria-label", label);
      repeatButton.title = label;
    }

    function updateDetails(track) {
      detailsPanel.innerHTML = "";
      detailsPanel.hidden = !track || !detailsMode;
      lyricsButton.setAttribute("aria-pressed", String(detailsMode === "lyrics"));
      infoButton.setAttribute("aria-pressed", String(detailsMode === "info"));
      if (!track || !detailsMode) {
        return;
      }
      var heading = document.createElement("h4");
      heading.textContent = detailsMode === "lyrics" ? "Lyrics / Story" : "Track Info";
      detailsPanel.appendChild(heading);
      if (detailsMode === "lyrics") {
        var text = document.createElement("p");
        text.textContent = [track.lyrics, track.story].filter(Boolean).join("\n\n") || "Archive text pending.";
        detailsPanel.appendChild(text);
        return;
      }
      var version = currentVersion();
      var facts = document.createElement("dl");
      [
        ["Year", track.year],
        ["Arc", track.arc],
        ["Release type", track.releaseType],
        ["Canon status", track.canonStatus],
        ["Version", version && version.label],
        ["Tags", track.tags.join(", ")],
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

    function updateVersionControl(track) {
      versionSelect.innerHTML = "";
      var versions = publicVersions(track).filter(function (version) {
        return version.localAudio && !failedVersionIds.has(versionKey(track.id, version.id));
      });
      versions.forEach(function (version) {
        var option = document.createElement("option");
        option.value = version.id;
        option.textContent = version.label;
        option.selected = version.id === currentVersionId;
        versionSelect.appendChild(option);
      });
      versionControl.hidden = versions.length < 2;
    }

    function updatePlayer() {
      var track = currentTrack();
      if (!track || !isTrackAvailable(track)) {
        var fallbackId = playableIds(state.playlist.concat(officialIds))[0] || "";
        if (fallbackId && fallbackId !== currentTrackId) {
          loadTrack(trackById.get(fallbackId), "");
          track = currentTrack();
        }
      }
      if (!track) {
        title.textContent = "No playable tracks";
        subtitle.textContent = "The public archive is waiting for an available release.";
        cover.removeAttribute("src");
        cover.alt = "";
        coverBackdrop.style.backgroundImage = "none";
        versionControl.hidden = true;
        lyricsButton.disabled = true;
        infoButton.disabled = true;
        updateDetails(null);
      } else {
        var version = loadTrack(track, currentVersionId || track.primaryVersionId);
        updateCover(track);
        title.textContent = track.title;
        subtitle.textContent = track.arc || track.releaseType;
        lyricsButton.disabled = !(track.lyrics || track.story);
        lyricsButton.title = lyricsButton.disabled ? "Archive Text Pending" : "Open lyrics and story";
        infoButton.disabled = false;
        if (version) {
          currentVersionId = version.id;
        }
        updateVersionControl(track);
        updateDetails(track);
      }
      updateNotice();
      updateProgress();
      updateTransport();
    }

    function viewTitle() {
      if (activeView === "playlist") return "My Playlist";
      if (activeView === "queue") return "Queue";
      if (activeView === "favorites") return "Favorites";
      return "Library";
    }

    function actionButton(label, handler) {
      var button = textButton(label, "cds-menu-action");
      button.addEventListener("click", function () {
        handler();
        openMenuKey = "";
      });
      return button;
    }

    function renderRow(trackId, position, occurrenceIndex, contextIds) {
      var track = trackById.get(trackId);
      if (!track) {
        return null;
      }
      var key = activeView + "::" + trackId + "::" + occurrenceIndex;
      var isCurrent = currentTrackId === track.id;
      var isFavorite = state.favorites.indexOf(track.id) >= 0;
      var inPlaylist = state.playlist.indexOf(track.id) >= 0;
      var available = isTrackAvailable(track);
      var row = document.createElement("div");
      row.className = "cds-playlist-item" + (isCurrent ? " is-current" : "") + (!available ? " is-unavailable" : "") + (openMenuKey === key ? " has-open-menu" : "");
      row.setAttribute("role", "listitem");

      var favorite = iconButton("favorite", isFavorite ? "Remove from favorites" : "Add to favorites", "cds-favorite-control");
      favorite.setAttribute("aria-pressed", String(isFavorite));
      favorite.addEventListener("click", function () {
        toggleFavorite(track.id);
      });
      row.appendChild(favorite);

      var number = document.createElement("span");
      number.className = "cds-track-position";
      number.textContent = String(position + 1).padStart(2, "0");
      row.appendChild(number);

      var select = document.createElement("button");
      select.type = "button";
      select.className = "cds-track-select";
      select.disabled = !available;
      select.setAttribute("aria-current", isCurrent ? "true" : "false");
      select.addEventListener("click", function () {
        playNow(track.id, activeView === "queue" ? (state.playlist.length ? state.playlist : officialIds) : contextIds, activeView === "queue" ? occurrenceIndex : null);
      });
      var name = document.createElement("strong");
      name.textContent = track.title;
      select.appendChild(name);
      var meta = document.createElement("small");
      meta.textContent = [track.arc, track.releaseType].filter(Boolean).join(" / ");
      if (!available) {
        var hint = document.createElement("em");
        hint.textContent = "Unavailable";
        meta.appendChild(document.createTextNode(" "));
        meta.appendChild(hint);
      }
      select.appendChild(meta);
      row.appendChild(select);

      var actions = document.createElement("div");
      actions.className = "cds-track-row-actions";
      row.appendChild(actions);

      if (activeView === "playlist" && editPlaylist) {
        var up = iconButton("up", "Move track up", "cds-order-control");
        var down = iconButton("down", "Move track down", "cds-order-control");
        var remove = iconButton("axe", "Remove from this playlist", "cds-exclude-control");
        up.disabled = position === 0;
        down.disabled = position === state.playlist.length - 1;
        up.addEventListener("click", function () { movePlaylistTrack(track.id, -1); });
        down.addEventListener("click", function () { movePlaylistTrack(track.id, 1); });
        remove.addEventListener("click", function () { removeFromPlaylist(track.id); });
        actions.appendChild(up);
        actions.appendChild(down);
        actions.appendChild(remove);
      } else if (activeView === "queue") {
        var removeQueue = iconButton("remove", "Remove from queue", "cds-queue-remove");
        removeQueue.addEventListener("click", function () {
          state.queue.splice(occurrenceIndex, 1);
          syncState();
          setMessage("Track removed from queue.", false);
          renderArchive();
        });
        actions.appendChild(removeQueue);
      }

      var more = iconButton("more", "More actions for " + track.title, "cds-more-control");
      more.setAttribute("aria-expanded", String(openMenuKey === key));
      more.addEventListener("click", function () {
        openMenuKey = openMenuKey === key ? "" : key;
        renderArchive();
      });
      actions.appendChild(more);

      if (openMenuKey === key) {
        var menu = document.createElement("div");
        menu.className = "cds-track-menu";
        menu.appendChild(actionButton("Play now", function () {
          playNow(track.id, activeView === "queue" ? (state.playlist.length ? state.playlist : officialIds) : contextIds, activeView === "queue" ? occurrenceIndex : null);
        }));
        menu.appendChild(actionButton("Play next", function () { playNext(track.id); }));
        menu.appendChild(actionButton("Add to queue", function () { addToQueue(track.id); }));
        if (inPlaylist) {
          menu.appendChild(actionButton("Remove from My Playlist", function () { removeFromPlaylist(track.id); }));
        } else {
          menu.appendChild(actionButton("Add to My Playlist", function () { addToPlaylist(track.id); }));
        }
        if (activeView === "queue") {
          menu.appendChild(actionButton("Remove from queue", function () {
            state.queue.splice(occurrenceIndex, 1);
            syncState();
            renderArchive();
          }));
        }
        row.appendChild(menu);
      }
      return row;
    }

    function renderArchive() {
      var ids = viewIds();
      archiveTitle.textContent = viewTitle();
      trackCount.textContent = ids.length + (ids.length === 1 ? " track" : " tracks");
      libraryTools.hidden = activeView !== "library";
      editPlaylistButton.hidden = activeView !== "playlist";
      clearQueueButton.hidden = activeView !== "queue" || state.queue.length === 0;
      viewToolbar.hidden = editPlaylistButton.hidden && clearQueueButton.hidden;
      editPlaylistButton.textContent = editPlaylist ? "Done Editing" : "Edit Playlist";

      Object.keys(tabButtons).forEach(function (view) {
        var button = tabButtons[view];
        button.setAttribute("aria-selected", String(view === activeView));
        var count = view === "library" ? tracks.length : view === "playlist" ? state.playlist.length : view === "queue" ? state.queue.length : state.favorites.length;
        button.querySelector("small").textContent = String(count);
      });

      playlist.innerHTML = "";
      if (!ids.length) {
        var empty = document.createElement("div");
        empty.className = "cds-playlist-empty";
        var emptyTitle = document.createElement("strong");
        var emptyText = document.createElement("p");
        if (activeView === "queue") {
          emptyTitle.textContent = "Queue is clear";
          emptyText.textContent = "Use a track menu to play next or add music to the queue.";
        } else if (activeView === "favorites") {
          emptyTitle.textContent = "No favorites bound yet";
          emptyText.textContent = "Use the pentagram control to collect favorite tracks.";
        } else if (activeView === "playlist") {
          emptyTitle.textContent = "My Playlist is empty";
          emptyText.textContent = "Add tracks from Library. The public archive remains unchanged.";
        } else {
          emptyTitle.textContent = "No releases match";
          emptyText.textContent = "Try a different search or collection filter.";
        }
        empty.appendChild(emptyTitle);
        empty.appendChild(emptyText);
        playlist.appendChild(empty);
        return;
      }

      ids.forEach(function (id, index) {
        var row = renderRow(id, index, index, ids);
        if (row) {
          playlist.appendChild(row);
        }
      });
    }

    function exportBackup() {
      var payload = {
        app: appName,
        type: backupType,
        version: backupVersion,
        createdAt: new Date().toISOString(),
        state: {
          playlist: state.playlist.slice(),
          knownTrackIds: state.knownTrackIds.slice(),
          favorites: state.favorites.slice(),
          queue: state.queue.slice(),
          shuffle: state.shuffle,
          repeat: state.repeat
        }
      };
      var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      var objectUrl = URL.createObjectURL(blob);
      var download = document.createElement("a");
      download.href = objectUrl;
      download.download = "callizto-dark-symphony-music-archive-backup.json";
      document.body.appendChild(download);
      download.click();
      download.remove();
      URL.revokeObjectURL(objectUrl);
      setMessage("Music archive backup exported.", false);
    }

    function importBackup(payload) {
      if (!payload || payload.app !== appName) {
        throw new Error("This is not a Callizto Dark Symphony backup file.");
      }
      if (payload.type === backupType && payload.version === backupVersion && payload.state) {
        state = normalizeState(payload.state, officialIds);
      } else if (payload.type === "music-player-preferences" && payload.version === 1) {
        state = migrateLegacyState(payload, officialIds);
      } else {
        throw new Error("Unsupported music archive backup version.");
      }
      activeView = "playlist";
      state.activeView = activeView;
      syncState();
      renderArchive();
      updateTransport();
      setMessage("Music archive backup imported and saved in this browser.", false);
    }

    search.addEventListener("input", function () {
      searchQuery = search.value;
      renderArchive();
    });

    arcSelect.addEventListener("change", function () {
      arcFilter = arcSelect.value;
      renderArchive();
    });

    editPlaylistButton.addEventListener("click", function () {
      editPlaylist = !editPlaylist;
      openMenuKey = "";
      renderArchive();
    });

    clearQueueButton.addEventListener("click", function () {
      state.queue = [];
      syncState();
      setMessage("Queue cleared.", false);
      renderArchive();
    });

    exportButton.addEventListener("click", exportBackup);
    importButton.addEventListener("click", function () { importInput.click(); });
    importInput.addEventListener("change", function () {
      var file = importInput.files && importInput.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        try {
          importBackup(JSON.parse(String(reader.result || "")));
        } catch (error) {
          setMessage(error instanceof Error ? error.message : "The backup could not be imported.", true);
        }
        importInput.value = "";
      });
      reader.readAsText(file);
    });

    shuffleButton.addEventListener("click", function () {
      state.shuffle = !state.shuffle;
      syncState();
      updateTransport();
    });

    previousButton.addEventListener("click", function () {
      if (audio.currentTime > 4) {
        audio.currentTime = 0;
        updateProgress();
        return;
      }
      movePlayback(-1, !audio.paused, true);
    });

    playButton.addEventListener("click", function () {
      if (audio.paused) playCurrentTrack();
      else audio.pause();
    });

    nextButton.addEventListener("click", function () {
      movePlayback(1, !audio.paused, true);
    });

    repeatButton.addEventListener("click", function () {
      state.repeat = repeatModes[(repeatModes.indexOf(state.repeat) + 1) % repeatModes.length];
      syncState();
      updateTransport();
    });

    volume.addEventListener("input", function () {
      audio.volume = Number(volume.value);
    });

    versionSelect.addEventListener("change", function () {
      var wasPlaying = !audio.paused;
      loadTrack(currentTrack(), versionSelect.value);
      updatePlayer();
      if (wasPlaying) playCurrentTrack();
    });

    progress.addEventListener("input", function () {
      var target = Number(progress.value);
      if (!Number.isFinite(audio.duration) || audio.duration <= 0 || !Number.isFinite(target)) return;
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

    audio.addEventListener("play", updateTransport);
    audio.addEventListener("pause", updateTransport);
    audio.addEventListener("loadedmetadata", updateProgress);
    audio.addEventListener("durationchange", updateProgress);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("error", function () {
      markVersionUnavailable(audio.dataset.trackId, audio.dataset.versionId, pendingPlayback || !audio.paused);
    });
    audio.addEventListener("ended", function () {
      if (state.repeat === "one") {
        audio.currentTime = 0;
        playCurrentTrack();
        return;
      }
      movePlayback(1, true, state.repeat === "all");
    });

    var initialId = playableIds(state.playlist.concat(officialIds))[0] || "";
    if (initialId) {
      loadTrack(trackById.get(initialId), "");
    }
    updatePlayer();
    renderArchive();
  }

  fetch(dataUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Unable to load " + dataUrl);
      }
      return response.json();
    })
    .then(function (data) {
      render(data[dataKey] || []);
    })
    .catch(function () {
      container.innerHTML = '<p class="archive-load-note">The public music archive could not be loaded. Please refresh the page or try again later.</p>';
    });
}());
