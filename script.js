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

      container.innerHTML = "";

      if (note) {
        var noteElement = document.createElement("p");
        noteElement.className = "archive-load-note";
        noteElement.textContent = note;
        container.appendChild(noteElement);
      }

      var shell = document.createElement("div");
      shell.className = "music-player-shell";
      container.appendChild(shell);

      var nowPanel = document.createElement("article");
      nowPanel.className = "music-now-panel";
      shell.appendChild(nowPanel);

      var coverWrap = document.createElement("div");
      coverWrap.className = "music-cover-frame";
      nowPanel.appendChild(coverWrap);

      var cover = document.createElement("img");
      coverWrap.appendChild(cover);

      var nowCopy = document.createElement("div");
      nowCopy.className = "music-now-copy";
      nowPanel.appendChild(nowCopy);

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
      nowCopy.appendChild(audio);

      var audioNote = document.createElement("p");
      audioNote.className = "music-player-note";
      nowCopy.appendChild(audioNote);

      var controls = document.createElement("div");
      controls.className = "music-controls";
      nowCopy.appendChild(controls);

      var previousButton = createButton("Previous track", "button secondary music-control-button");
      var playButton = createButton("Play", "button primary music-control-button");
      var nextButton = createButton("Next track", "button secondary music-control-button");
      var repeatSongButton = createButton("Repeat song", "button secondary music-control-button");
      var repeatListButton = createButton("Repeat list", "button secondary music-control-button");
      var muteButton = createButton("Audio on", "button secondary music-control-button");

      [previousButton, playButton, nextButton, repeatSongButton, repeatListButton, muteButton].forEach(function (button) {
        controls.appendChild(button);
      });

      var trackActions = document.createElement("div");
      trackActions.className = "card-actions music-track-actions";
      nowCopy.appendChild(trackActions);

      var lyricsPanel = document.createElement("div");
      lyricsPanel.className = "lyrics-story-panel";
      nowCopy.appendChild(lyricsPanel);

      var playlistPanel = document.createElement("aside");
      playlistPanel.className = "music-playlist-panel";
      shell.appendChild(playlistPanel);

      var playlistHeading = document.createElement("div");
      playlistHeading.className = "playlist-heading";
      playlistPanel.appendChild(playlistHeading);

      var playlistTitle = document.createElement("h3");
      playlistTitle.textContent = "Playlist";
      playlistHeading.appendChild(playlistTitle);

      var playlistCount = document.createElement("p");
      playlistCount.className = "meta";
      playlistHeading.appendChild(playlistCount);

      var playlist = document.createElement("div");
      playlist.className = "playlist-list";
      playlistPanel.appendChild(playlist);

      var excludedDetails = document.createElement("details");
      excludedDetails.className = "excluded-tracks";
      playlistPanel.appendChild(excludedDetails);

      var excludedSummary = document.createElement("summary");
      excludedSummary.textContent = "Excluded tracks";
      excludedDetails.appendChild(excludedSummary);

      var excludedList = document.createElement("div");
      excludedList.className = "excluded-track-list";
      excludedDetails.appendChild(excludedList);

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

      function loadTrack(track) {
        if (!track || audio.dataset.trackId === track.id) {
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

      function updatePlaylist(track) {
        var active = activeTracks();
        playlist.innerHTML = "";
        playlistCount.textContent = active.length + " active / " + tracks.length + " total";

        if (!active.length) {
          var empty = document.createElement("div");
          empty.className = "playlist-empty";
          var emptyText = document.createElement("p");
          emptyText.textContent = "All tracks are hidden from this local playlist.";
          empty.appendChild(emptyText);
          var restore = createButton("Restore all tracks", "button secondary");
          restore.addEventListener("click", function () {
            excludedIds.clear();
            syncStorage();
            update();
          });
          empty.appendChild(restore);
          playlist.appendChild(empty);
          return;
        }

        active.forEach(function (item, index) {
          var row = createButton("", "playlist-track");
          row.setAttribute("aria-pressed", String(track && item.id === track.id));
          row.addEventListener("click", function () {
            selectTrack(item.id, false);
          });

          var number = document.createElement("span");
          number.textContent = String(index + 1).padStart(2, "0");
          row.appendChild(number);

          var label = document.createElement("strong");
          label.textContent = item.title;
          row.appendChild(label);

          var meta = document.createElement("small");
          meta.textContent = item.type;
          row.appendChild(meta);

          playlist.appendChild(row);
        });
      }

      function updateExcludedList() {
        var excluded = tracks.filter(function (track) {
          return excludedIds.has(track.id);
        });
        excludedList.innerHTML = "";

        if (!excluded.length) {
          var none = document.createElement("p");
          none.textContent = "No tracks are hidden from this playlist.";
          excludedList.appendChild(none);
          return;
        }

        excluded.forEach(function (track) {
          var row = document.createElement("div");
          row.className = "excluded-track-row";
          var label = document.createElement("span");
          label.textContent = track.title;
          row.appendChild(label);
          var show = createButton("Show in playlist", "button secondary");
          show.addEventListener("click", function () {
            excludedIds.delete(track.id);
            currentTrackId = currentTrackId || track.id;
            syncStorage();
            update();
          });
          row.appendChild(show);
          excludedList.appendChild(row);
        });

        var restoreAll = createButton("Restore all tracks", "button secondary");
        restoreAll.addEventListener("click", function () {
          excludedIds.clear();
          syncStorage();
          update();
        });
        excludedList.appendChild(restoreAll);
      }

      function updateActions(track) {
        trackActions.innerHTML = "";

        var lyricsButton = createButton(track && track.lyrics ? "Lyrics / Story" : "Lyrics / story pending", "button secondary");
        lyricsButton.addEventListener("click", function () {
          lyricsOpen = !lyricsOpen;
          update();
        });
        trackActions.appendChild(lyricsButton);

        if (track) {
          var hideButton = createButton("Hide from playlist", "button secondary");
          hideButton.addEventListener("click", function () {
            var activeBefore = activeTracks();
            var currentIndex = activeBefore.findIndex(function (item) {
              return item.id === track.id;
            });
            excludedIds.add(track.id);
            syncStorage();
            var activeAfter = activeTracks();
            currentTrackId = activeAfter[Math.min(currentIndex, Math.max(activeAfter.length - 1, 0))] ? activeAfter[Math.min(currentIndex, Math.max(activeAfter.length - 1, 0))].id : "";
            update();
          });
          trackActions.appendChild(hideButton);
        }
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
          audio.pause();
          audio.removeAttribute("src");
          cover.removeAttribute("src");
          cover.alt = "";
          status.textContent = "Playlist empty";
          detail.textContent = "Restore tracks to continue";
          title.textContent = "All tracks hidden";
          description.textContent = "Your local playlist has no active tracks. Restore everything or show individual tracks again below.";
          audioNote.textContent = "";
          controls.hidden = true;
          trackActions.innerHTML = "";
          updatePlaylist(null);
          updateExcludedList();
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
        audioNote.textContent = track.localAudio ? "Local audio ready. Playback starts only when you press Play." : "Local audio file needed in assets/Audio/ before this track can play.";

        playButton.textContent = audio.paused ? "Play" : "Pause";
        repeatSongButton.setAttribute("aria-pressed", String(repeatSong));
        repeatListButton.setAttribute("aria-pressed", String(repeatList));
        repeatSongButton.textContent = repeatSong ? "Repeat song on" : "Repeat song";
        repeatListButton.textContent = repeatList ? "Repeat list on" : "Repeat list";
        muteButton.textContent = audio.muted ? "Audio off" : "Audio on";
        muteButton.setAttribute("aria-pressed", String(audio.muted));

        updatePlaylist(track);
        updateExcludedList();
        updateActions(track);
        updateLyrics(track);
      }

      previousButton.addEventListener("click", function () {
        moveTrack(-1, false);
      });

      nextButton.addEventListener("click", function () {
        moveTrack(1, false);
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

      audio.addEventListener("play", update);
      audio.addEventListener("pause", update);
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

  renderMusicPlayer("music-player", "data/releases.json", "releases");
  renderJsonList("video-list", "data/videos.json", "videos", "video");
}());
