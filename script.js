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
      year: item.year || "",
      status: item.status || "",
      type: item.type || "",
      arc: item.arc || "",
      coverImage: item.coverImage || item.image || "",
      imageAlt: item.imageAlt || item.title || "",
      localAudio: item.localAudio || "",
      lyrics: item.lyrics || "",
      lyricsPending: item.lyricsPending !== false,
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

  function readExcludedTrackIds() {
    try {
      return JSON.parse(localStorage.getItem("cdsExcludedTracksV1") || "[]");
    } catch (error) {
      return [];
    }
  }

  function saveExcludedTrackIds(ids) {
    try {
      localStorage.setItem("cdsExcludedTracksV1", JSON.stringify(ids));
    } catch (error) {
      /* Local playlist preferences are optional. */
    }
  }

  function renderMusicPlayer(containerId, url, key) {
    var container = document.getElementById(containerId);
    if (!container) {
      return;
    }

    function formatTime(seconds) {
      if (!Number.isFinite(seconds) || seconds < 0) {
        return "--:--";
      }
      var total = Math.floor(seconds);
      var minutes = Math.floor(total / 60);
      var remaining = String(total % 60).padStart(2, "0");
      return minutes + ":" + remaining;
    }

    function render(items, note) {
      var tracks = items.map(normalizeRelease);
      var excludedIds = new Set(readExcludedTrackIds().filter(function (id) {
        return tracks.some(function (track) {
          return track.id === id;
        });
      }));
      var repeatSong = false;
      var repeatList = false;
      var lyricsOpen = false;
      var currentTrackId = "";
      var isSeeking = false;

      container.innerHTML = "";

      if (note) {
        var noteElement = document.createElement("p");
        noteElement.className = "archive-load-note";
        noteElement.textContent = note;
        container.appendChild(noteElement);
      }

      var shell = document.createElement("div");
      shell.className = "music-player-shell music-player-compact";
      container.appendChild(shell);

      var currentPanel = document.createElement("article");
      currentPanel.className = "music-current-panel";
      shell.appendChild(currentPanel);

      var coverWrap = document.createElement("div");
      coverWrap.className = "music-current-cover";
      currentPanel.appendChild(coverWrap);

      var cover = document.createElement("img");
      coverWrap.appendChild(cover);

      var nowCopy = document.createElement("div");
      nowCopy.className = "music-current-copy";
      currentPanel.appendChild(nowCopy);

      var status = document.createElement("p");
      status.className = "meta";
      nowCopy.appendChild(status);

      var detail = document.createElement("p");
      detail.className = "meta";
      nowCopy.appendChild(detail);

      var title = document.createElement("h3");
      nowCopy.appendChild(title);

      var description = document.createElement("p");
      description.className = "music-description";
      nowCopy.appendChild(description);

      var audio = document.createElement("audio");
      audio.preload = "none";
      audio.className = "music-native-audio";
      currentPanel.appendChild(audio);

      var audioNote = document.createElement("p");
      audioNote.className = "music-player-note";
      nowCopy.appendChild(audioNote);

      var transport = document.createElement("div");
      transport.className = "music-transport";
      currentPanel.appendChild(transport);

      var progressBlock = document.createElement("div");
      progressBlock.className = "music-progress-block";
      transport.appendChild(progressBlock);

      var progress = document.createElement("input");
      progress.className = "music-progress";
      progress.type = "range";
      progress.min = "0";
      progress.max = "0";
      progress.step = "0.01";
      progress.value = "0";
      progress.disabled = true;
      progress.setAttribute("aria-label", "Seek within current track");
      progressBlock.appendChild(progress);

      var timeRow = document.createElement("div");
      timeRow.className = "music-time-row";
      progressBlock.appendChild(timeRow);

      var currentTimeLabel = document.createElement("span");
      currentTimeLabel.textContent = "0:00";
      timeRow.appendChild(currentTimeLabel);

      var durationLabel = document.createElement("span");
      durationLabel.textContent = "--:--";
      timeRow.appendChild(durationLabel);

      var controls = document.createElement("div");
      controls.className = "music-control-strip";
      transport.appendChild(controls);

      var previousButton = createButton("Prev", "button secondary music-control-button");
      var playButton = createButton("Play", "button primary music-control-button music-play-toggle");
      var nextButton = createButton("Next", "button secondary music-control-button");
      var repeatSongButton = createButton("Repeat 1", "button secondary music-control-button");
      var repeatListButton = createButton("Repeat All", "button secondary music-control-button");
      var muteButton = createButton("Mute", "button secondary music-control-button");
      previousButton.setAttribute("aria-label", "Previous track");
      nextButton.setAttribute("aria-label", "Next track");
      repeatSongButton.setAttribute("aria-label", "Repeat current song");
      repeatListButton.setAttribute("aria-label", "Repeat playlist");
      muteButton.setAttribute("aria-label", "Mute or unmute audio");

      [previousButton, playButton, nextButton, repeatSongButton, repeatListButton, muteButton].forEach(function (button) {
        controls.appendChild(button);
      });

      var trackActions = document.createElement("div");
      trackActions.className = "card-actions music-track-actions";
      transport.appendChild(trackActions);

      var lyricsPanel = document.createElement("div");
      lyricsPanel.className = "lyrics-story-panel";
      transport.appendChild(lyricsPanel);

      var playlistPanel = document.createElement("aside");
      playlistPanel.className = "music-playlist-panel";
      shell.appendChild(playlistPanel);

      var playlistHeading = document.createElement("div");
      playlistHeading.className = "playlist-heading music-playlist-toolbar";
      playlistPanel.appendChild(playlistHeading);

      var playlistTitleWrap = document.createElement("div");
      playlistHeading.appendChild(playlistTitleWrap);

      var playlistTitle = document.createElement("h3");
      playlistTitle.textContent = "Playlist";
      playlistTitleWrap.appendChild(playlistTitle);

      var playlistCount = document.createElement("p");
      playlistCount.className = "meta";
      playlistTitleWrap.appendChild(playlistCount);

      var restoreAllButton = createButton("Restore all tracks", "button secondary music-restore-button");
      playlistHeading.appendChild(restoreAllButton);

      var emptyMessage = document.createElement("p");
      emptyMessage.className = "playlist-status-message";
      emptyMessage.textContent = "No active tracks selected.";
      playlistPanel.appendChild(emptyMessage);

      var playlist = document.createElement("div");
      playlist.className = "playlist-list music-playlist-table";
      playlistPanel.appendChild(playlist);

      function activeTracks() {
        return tracks.filter(function (track) {
          return !excludedIds.has(track.id);
        });
      }

      function currentTrack() {
        var active = activeTracks();
        if (!active.length) {
          return null;
        }
        var found = active.find(function (track) {
          return track.id === currentTrackId;
        });
        return found || active[0];
      }

      function syncStorage() {
        saveExcludedTrackIds(Array.from(excludedIds));
      }

      function findNextActiveAfterIndex(index) {
        var active = activeTracks();
        if (!active.length) {
          return null;
        }
        var after = active.find(function (track) {
          return tracks.findIndex(function (item) {
            return item.id === track.id;
          }) > index;
        });
        return after || active[0];
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
        if (track.localAudio) {
          audio.src = track.localAudio;
          audio.load();
        }
      }

      function playCurrentTrack() {
        var track = currentTrack();
        if (!track || !track.localAudio) {
          update();
          return;
        }
        loadTrack(track);
        audio.play().catch(function () {
          audioNote.textContent = "Playback could not start. Try again from the player controls.";
        });
      }

      function selectTrack(trackId, shouldPlay) {
        currentTrackId = trackId;
        loadTrack(currentTrack());
        update();
        if (shouldPlay) {
          playCurrentTrack();
        }
      }

      function moveTrack(direction, shouldPlay) {
        var active = activeTracks();
        if (!active.length) {
          update();
          return;
        }
        var current = currentTrack();
        var index = active.findIndex(function (track) {
          return current && track.id === current.id;
        });
        var nextIndex = index + direction;
        if (nextIndex < 0) {
          nextIndex = repeatList ? active.length - 1 : 0;
        }
        if (nextIndex >= active.length) {
          nextIndex = repeatList ? 0 : active.length - 1;
        }
        selectTrack(active[nextIndex].id, shouldPlay);
      }

      function setTrackIncluded(track, included) {
        var wasPlaying = !audio.paused;
        var removedCurrent = !included && currentTrackId === track.id;
        var index = tracks.findIndex(function (item) {
          return item.id === track.id;
        });

        if (included) {
          excludedIds.delete(track.id);
        } else {
          excludedIds.add(track.id);
        }

        syncStorage();

        if (removedCurrent) {
          var next = findNextActiveAfterIndex(index);
          currentTrackId = next ? next.id : "";
          loadTrack(next);
          update();
          if (next && wasPlaying) {
            playCurrentTrack();
          }
          return;
        }

        update();
      }

      function updateProgress() {
        var hasDuration = Number.isFinite(audio.duration) && audio.duration > 0;
        progress.disabled = !hasDuration || !currentTrack() || !currentTrack().localAudio;

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
      }

      function updatePlaylist(track) {
        var active = activeTracks();
        playlist.innerHTML = "";
        playlistCount.textContent = active.length + " active / " + tracks.length + " total";
        emptyMessage.hidden = active.length > 0;
        restoreAllButton.hidden = active.length === tracks.length;

        var header = document.createElement("div");
        header.className = "music-playlist-row music-playlist-header";
        ["On", "#", "Track", "Status"].forEach(function (label) {
          var heading = document.createElement("span");
          heading.textContent = label;
          header.appendChild(heading);
        });
        playlist.appendChild(header);

        tracks.forEach(function (item, index) {
          var isExcluded = excludedIds.has(item.id);
          var isCurrent = track && item.id === track.id;
          var row = document.createElement("div");
          row.className = "music-playlist-row" + (isExcluded ? " is-excluded" : "") + (isCurrent ? " is-current" : "");

          var includeLabel = document.createElement("label");
          includeLabel.className = "music-include";
          var include = document.createElement("input");
          include.type = "checkbox";
          include.checked = !isExcluded;
          include.setAttribute("aria-label", "Include " + item.title + " in playlist");
          include.addEventListener("change", function () {
            setTrackIncluded(item, include.checked);
          });
          includeLabel.appendChild(include);
          row.appendChild(includeLabel);

          var number = document.createElement("span");
          number.className = "music-track-number";
          number.textContent = String(index + 1).padStart(2, "0");
          row.appendChild(number);

          var select = document.createElement("button");
          select.type = "button";
          select.className = "music-track-main";
          select.setAttribute("aria-pressed", String(isCurrent));
          select.addEventListener("click", function () {
            if (isExcluded) {
              return;
            }
            selectTrack(item.id, !audio.paused);
          });

          var label = document.createElement("strong");
          label.textContent = item.title;
          select.appendChild(label);

          var meta = document.createElement("small");
          meta.textContent = item.arc || item.type;
          select.appendChild(meta);
          row.appendChild(select);

          var tag = document.createElement("span");
          tag.className = "music-track-tag";
          tag.textContent = item.status || item.type;
          row.appendChild(tag);

          playlist.appendChild(row);
        });
      }

      function updateActions(track) {
        trackActions.innerHTML = "";

        var lyricsButton = createButton(track && track.lyrics ? "Lyrics / Story" : "Lyrics / story pending", "button secondary");
        lyricsButton.addEventListener("click", function () {
          lyricsOpen = !lyricsOpen;
          update();
        });
        trackActions.appendChild(lyricsButton);
      }

      function updateLyrics(track) {
        lyricsPanel.innerHTML = "";
        if (!lyricsOpen || !track) {
          lyricsPanel.hidden = true;
          return;
        }
        lyricsPanel.hidden = false;
        var text = document.createElement("p");
        text.textContent = track.lyrics || "Lyrics and story notes will be added later.";
        lyricsPanel.appendChild(text);
      }

      function update() {
        var active = activeTracks();
        var track = currentTrack();

        if (!active.length) {
          currentTrackId = "";
          loadTrack(null);
          cover.removeAttribute("src");
          cover.alt = "";
          status.textContent = "Playlist empty";
          detail.textContent = "Restore tracks to continue";
          title.textContent = "No active tracks selected.";
          description.textContent = "Restore all tracks or reselect individual songs in the playlist.";
          audioNote.textContent = "";
          controls.hidden = true;
          trackActions.innerHTML = "";
          updateProgress();
          updatePlaylist(null);
          updateLyrics(null);
          return;
        }

        controls.hidden = false;
        currentTrackId = track.id;
        loadTrack(track);

        cover.src = track.coverImage;
        cover.alt = track.imageAlt || "";
        status.textContent = [track.status, track.year].filter(Boolean).join(" / ");
        detail.textContent = [track.type, track.arc].filter(Boolean).join(" / ");
        title.textContent = track.title;
        description.textContent = track.description;
        audioNote.textContent = track.localAudio ? "Local audio ready. Playback starts only when you press Play." : "Local audio player coming soon.";

        playButton.textContent = audio.paused ? "Play" : "Pause";
        playButton.disabled = !track.localAudio;
        previousButton.disabled = active.length < 2;
        nextButton.disabled = active.length < 2;
        repeatSongButton.setAttribute("aria-pressed", String(repeatSong));
        repeatListButton.setAttribute("aria-pressed", String(repeatList));
        repeatSongButton.textContent = repeatSong ? "Repeat 1 On" : "Repeat 1";
        repeatListButton.textContent = repeatList ? "Repeat All On" : "Repeat All";
        muteButton.textContent = audio.muted ? "Muted" : "Mute";
        muteButton.setAttribute("aria-pressed", String(audio.muted));

        updateProgress();
        updatePlaylist(track);
        updateActions(track);
        updateLyrics(track);
      }

      previousButton.addEventListener("click", function () {
        moveTrack(-1, !audio.paused);
      });

      nextButton.addEventListener("click", function () {
        moveTrack(1, !audio.paused);
      });

      playButton.addEventListener("click", function () {
        if (audio.paused) {
          playCurrentTrack();
        } else {
          audio.pause();
        }
        update();
      });

      repeatSongButton.addEventListener("click", function () {
        repeatSong = !repeatSong;
        update();
      });

      repeatListButton.addEventListener("click", function () {
        repeatList = !repeatList;
        update();
      });

      muteButton.addEventListener("click", function () {
        audio.muted = !audio.muted;
        update();
      });

      restoreAllButton.addEventListener("click", function () {
        excludedIds.clear();
        syncStorage();
        update();
      });

      progress.addEventListener("input", function () {
        var targetTime = Number(progress.value);
        if (!Number.isFinite(audio.duration) || audio.duration <= 0 || !Number.isFinite(targetTime)) {
          return;
        }
        isSeeking = true;
        audio.currentTime = targetTime;
        currentTimeLabel.textContent = formatTime(targetTime);
      });

      progress.addEventListener("change", function () {
        isSeeking = false;
        updateProgress();
      });

      progress.addEventListener("pointerup", function () {
        isSeeking = false;
        updateProgress();
      });

      progress.addEventListener("keyup", function () {
        isSeeking = false;
        updateProgress();
      });

      audio.addEventListener("play", update);
      audio.addEventListener("pause", update);
      audio.addEventListener("loadedmetadata", updateProgress);
      audio.addEventListener("durationchange", updateProgress);
      audio.addEventListener("timeupdate", updateProgress);
      audio.addEventListener("ended", function () {
        if (repeatSong) {
          audio.currentTime = 0;
          playCurrentTrack();
          return;
        }
        var active = activeTracks();
        var track = currentTrack();
        var index = active.findIndex(function (item) {
          return track && item.id === track.id;
        });
        if (repeatList || index < active.length - 1) {
          moveTrack(1, true);
        } else {
          update();
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
        render(
          fallbackData[key] || [],
          "Archive data could not be loaded in this local preview. Use a local server or GitHub Pages preview to load the data archive."
        );
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

  renderMusicPlayer("music-player", "data/releases.json", "releases");
  renderJsonList("video-list", "data/videos.json", "videos", "video");
  renderArchiveCategories("archive-category-grid", "data/archive.json", "categories");
}());
