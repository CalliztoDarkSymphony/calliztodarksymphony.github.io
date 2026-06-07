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
    archiveFolder: {
      label: "Open CDS Archive Folder",
      url: "https://drive.google.com/drive/folders/113QgWCh0AR_IgkFYskK3cCQcpUJYmwwZ?usp=sharing"
    },
    releases: [
      {
        title: "Crimson Legacy",
        year: "Archive",
        status: "Available",
        type: "Crimson Legacy Trilogy / Part I",
        arc: "The Crimson Legacy",
        image: "assets/images/Callizto Dark Symphony - Crimson Legacy (2026 Version).jpg",
        imageAlt: "Crimson Legacy 2026 Version cover art",
        description: "Part I of the Crimson Legacy trilogy. The 2026 remastered archive version is the preferred current version, with the original legacy audio preserved separately.",
        links: [
          { label: "Listen from archive", url: "https://drive.google.com/file/d/1n5PL7bsQ6EE7YV_XYeG8fzdrF2OxPmcQ/view?usp=drive_link" },
          { label: "Open legacy audio", url: "https://drive.google.com/file/d/1-aT2hYv5RlcXklBKlYa7Rf0qo9-vBb2d/view?usp=drive_link" },
          { label: "Open cover", url: "https://drive.google.com/file/d/1GgJgJhT5KjUQWa9sTmoliLKaWJHMhvJs/view?usp=drive_link" },
          { label: "Open legacy cover", url: "https://drive.google.com/file/d/18vwAdDJ0DQ3YohIXKJyG5sgEq6h0jqSY/view?usp=drive_link" }
        ]
      },
      {
        title: "Iron Queen",
        year: "Archive",
        status: "Audio archive available",
        type: "Crimson Legacy Trilogy / Part II",
        arc: "The Crimson Legacy",
        image: "assets/images/Callizto Dark Symphony - Iron Queen.png",
        imageAlt: "Iron Queen cover art",
        description: "Part II of the Crimson Legacy trilogy. Previously unreleased outside Suno at the time of archive entry. Visual chapter pending.",
        links: [
          { label: "Listen from archive", url: "https://drive.google.com/file/d/17alSpzE25HwvqTUjXM0IO7ps6vAylbsK/view?usp=drive_link" }
        ]
      },
      {
        title: "Throne of Ash and Gold",
        year: "Archive",
        status: "Audio archive available",
        type: "Crimson Legacy Trilogy / Part III",
        arc: "The Crimson Legacy",
        image: "assets/images/Callizto Dark Symphony - Throne of Ash and Gold.png",
        imageAlt: "Throne of Ash and Gold cover art",
        description: "Final chapter of the Crimson Legacy trilogy. Previously unreleased outside Suno at the time of archive entry. Visual chapter pending.",
        links: [
          { label: "Listen from archive", url: "https://drive.google.com/file/d/1yEYLj7CY9FCwm50Rkfbz_iuP0a_QCrLr/view?usp=drive_link" }
        ]
      },
      {
        title: "We Are Warriors",
        year: "Archive",
        status: "Available",
        type: "Anthem / milestone track",
        arc: "Signal and tribute",
        image: "assets/images/Callizto Dark Symphony - We Are Warriors (BQ).jpg",
        imageAlt: "We Are Warriors cover art",
        description: "A major CDS anthem of survival, unity, and defiance.",
        links: [
          { label: "Listen from archive", url: "https://drive.google.com/file/d/1p17FiywrX8dpFpKYeT800C1nE_hApOIF/view?usp=drive_link" },
          { label: "Open cover", url: "https://drive.google.com/file/d/1FHaL8wrtjKNihh2aALeWjCp5NXd8P4MT/view?usp=drive_link" }
        ]
      },
      {
        title: "We Are Warriors AR",
        year: "Archive",
        status: "Available",
        type: "Alternate Reality archive version",
        arc: "Signal and tribute",
        image: "assets/images/Callizto Dark Symphony - We are Warriors AR (BQ).jpg",
        imageAlt: "We Are Warriors AR cover art",
        description: "Alternate Reality archive version connected to one of the emotional core milestones of Callizto Dark Symphony.",
        links: [
          { label: "Listen from archive", url: "https://drive.google.com/file/d/1ypTedeA63shDSmtJG_jp1gSN73kSRfko/view?usp=drive_link" },
          { label: "Open cover", url: "https://drive.google.com/file/d/1wSg6JsLx3V4H6J_iakWvyv3zaYHL2YPa/view?usp=drive_link" }
        ]
      },
      {
        title: "Heart of the Static",
        year: "Archive",
        status: "Available",
        type: "Forge / signal track",
        arc: "The Signal",
        image: "assets/images/Callizto Dark Symphony - Heart of the Static (BQ).jpg",
        imageAlt: "Heart of the Static cover art",
        description: "A cyber-goth signal entry tied to the static, the Forge, and the human pulse inside machine noise.",
        links: [
          { label: "Listen from archive", url: "https://drive.google.com/file/d/1sSNP3TqGse-fOxOFfaaPFy2HuvRdM3kE/view?usp=drive_link" },
          { label: "Open cover", url: "https://drive.google.com/file/d/1g8i6clcm4GcYQ4hbPEaL0y5c--ZTmjBL/view?usp=drive_link" }
        ]
      },
      {
        title: "Death Takes All!",
        year: "Archive",
        status: "Available",
        type: "Dark gothic metal chapter",
        arc: "Dark theatrical archive",
        image: "assets/images/Callizto Dark Symphony - Death Takes all! (BQ).jpg",
        imageAlt: "Death Takes All cover art",
        description: "A plague-gothic visual and musical chapter with dark theatrical atmosphere.",
        links: [
          { label: "Listen from archive", url: "https://drive.google.com/file/d/1kKGthigvAAwuVDh6lAISxULKz3jXaIqP/view?usp=drive_link" },
          { label: "Open cover", url: "https://drive.google.com/file/d/1uNUA9tZ7_6bMYrxpCIvxjUSXrmEGdufb/view?usp=drive_link" }
        ]
      },
      {
        title: "Welcome to Hell!",
        year: "Archive",
        status: "Available",
        type: "Dark theatrical metal chapter",
        arc: "Dark theatrical archive",
        image: "assets/images/Callizto Dark Symphony - Welcome to Hell! (BQ).jpg",
        imageAlt: "Welcome to Hell cover art",
        description: "A theatrical CDS entry with a dark, cinematic, infernal stage identity.",
        links: [
          { label: "Listen from archive", url: "https://drive.google.com/file/d/110ctKd-0MgFPElGVmozcnXVrfMGQUOa7/view?usp=drive_link" },
          { label: "Open cover", url: "https://drive.google.com/file/d/1VgvNNl9F-shlFBJQE0XumaplbTR8JtHg/view?usp=drive_link" }
        ]
      },
      {
        title: "What The Hell is Going On!",
        year: "Archive",
        status: "Available",
        type: "Archive track",
        arc: "Dark theatrical archive",
        image: "assets/images/Callizto Dark Symphony - What The Hell is going on! (BQ).jpg",
        imageAlt: "What The Hell is Going On cover art",
        description: "A chaotic CDS archive entry with dark humor and theatrical energy.",
        links: [
          { label: "Listen from archive", url: "https://drive.google.com/file/d/1P80pHjDb86D9KC3KtyihT7QdIVTUFZUn/view?usp=drive_link" },
          { label: "Open cover", url: "https://drive.google.com/file/d/1CgT-Z2o-J3KQsJLLea6gE5rFnTBvXeLa/view?usp=drive_link" }
        ]
      },
      {
        title: "Symphonic Epic Metal AD",
        year: "Archive",
        status: "Available",
        type: "Legacy / early archive track",
        arc: "Legacy archive",
        image: "assets/images/Callizto Dark Symphony - Symphonic Epic Metal AD (BQ).jpg",
        imageAlt: "Symphonic Epic Metal AD cover art",
        description: "A legacy symphonic metal archive entry from the evolving CDS visual and musical era.",
        links: [
          { label: "Listen from archive", url: "https://drive.google.com/file/d/19bsVbR36W_3QkkW-_8C4jqzKQhFUhOUc/view?usp=drive_link" },
          { label: "Open cover", url: "https://drive.google.com/file/d/1ysmS5L6rKWzdwpA3JnK0jjn_aWqw5JpV/view?usp=drive_link" }
        ]
      }
    ],
    videos: [
      {
        title: "Crimson Legacy",
        year: "Archive",
        status: "Available",
        type: "Music video / Gothic fantasy chapter",
        arc: "The Crimson Legacy",
        sourceLabel: "Google Drive archive",
        image: "assets/images/Callizto Dark Symphony - Crimson Legacy (BQ).jpg",
        imageAlt: "Crimson Legacy legacy video thumbnail",
        description: "The visual chapter for Part I of the Crimson Legacy trilogy. The music video uses the original / legacy Crimson Legacy version. A newer 2026 audio-only version is available in the Music archive.",
        links: [
          { label: "Watch archive cut", url: "https://drive.google.com/file/d/1A_yv3Tm0jqCeOcAZnKlfaSdC-FjHKRC_/view?usp=drive_link" },
          { label: "Open cover", url: "https://drive.google.com/file/d/1GgJgJhT5KjUQWa9sTmoliLKaWJHMhvJs/view?usp=drive_link" }
        ]
      },
      {
        title: "Death Takes All!",
        year: "Archive",
        status: "Available",
        type: "Music video / Dark plague-gothic chapter",
        arc: "Dark theatrical archive",
        sourceLabel: "Google Drive archive",
        image: "assets/images/Callizto Dark Symphony - Death Takes all! (BQ).jpg",
        imageAlt: "Death Takes All video thumbnail",
        description: "A dark theatrical CDS visual chapter with plague-gothic atmosphere.",
        links: [
          { label: "Watch archive cut", url: "https://drive.google.com/file/d/1R60zeV3vHbzQAjKipI7VRD2KcB3QYamC/view?usp=drive_link" },
          { label: "Open cover", url: "https://drive.google.com/file/d/1uNUA9tZ7_6bMYrxpCIvxjUSXrmEGdufb/view?usp=drive_link" }
        ]
      },
      {
        title: "Heart of the Static",
        year: "Archive",
        status: "Available",
        type: "Music video / Forge signal chapter",
        arc: "The Signal",
        sourceLabel: "Google Drive archive",
        image: "assets/images/Callizto Dark Symphony - Heart of the Static (BQ).jpg",
        imageAlt: "Heart of the Static video thumbnail",
        description: "A cyber-goth visual archive entry connected to the static, the Forge, and the signal.",
        links: [
          { label: "Watch archive cut", url: "https://drive.google.com/file/d/1X4INxzxs-mOFYQA_dyyrgfMSK3eTI7EN/view?usp=drive_link" },
          { label: "Open cover", url: "https://drive.google.com/file/d/1g8i6clcm4GcYQ4hbPEaL0y5c--ZTmjBL/view?usp=drive_link" }
        ]
      },
      {
        title: "We Are Warriors",
        year: "Archive",
        status: "Available",
        type: "Music video / Anthem",
        arc: "Signal and tribute",
        sourceLabel: "Google Drive archive",
        image: "assets/images/Callizto Dark Symphony - We Are Warriors (BQ).jpg",
        imageAlt: "We Are Warriors video thumbnail",
        description: "A CDS anthem video centered on survival, unity, and defiance.",
        links: [
          { label: "Watch archive cut", url: "https://drive.google.com/file/d/1cLy2MI_-ZGZtwTgx7ywQ2SenF3uq4xMN/view?usp=drive_link" },
          { label: "Open cover", url: "https://drive.google.com/file/d/1FHaL8wrtjKNihh2aALeWjCp5NXd8P4MT/view?usp=drive_link" }
        ]
      },
      {
        title: "We Are Warriors AR",
        year: "Archive",
        status: "Available",
        type: "Music video / Alternate Reality archive",
        arc: "Signal and tribute",
        sourceLabel: "Google Drive archive",
        image: "assets/images/Callizto Dark Symphony - We are Warriors AR (BQ).jpg",
        imageAlt: "We Are Warriors AR video thumbnail",
        description: "Alternate Reality visual archive version connected to one of CDS's emotional milestone works.",
        links: [
          { label: "Watch archive cut", url: "https://drive.google.com/file/d/1ctmVbF_yQnltv9JckCj8F443TNTA2VoP/view?usp=drive_link" },
          { label: "Open cover", url: "https://drive.google.com/file/d/1wSg6JsLx3V4H6J_iakWvyv3zaYHL2YPa/view?usp=drive_link" }
        ]
      },
      {
        title: "Welcome to Hell!",
        year: "Archive",
        status: "Available",
        type: "Music video / Dark theatrical chapter",
        arc: "Dark theatrical archive",
        sourceLabel: "Google Drive archive",
        image: "assets/images/Callizto Dark Symphony - Welcome to Hell! (BQ).jpg",
        imageAlt: "Welcome to Hell video thumbnail",
        description: "A dark theatrical CDS visual chapter with infernal stage energy.",
        links: [
          { label: "Watch archive cut", url: "https://drive.google.com/file/d/15MIpvUz6JKmeh9IObmOZxuh2qjLTfRfJ/view?usp=drive_link" },
          { label: "Open cover", url: "https://drive.google.com/file/d/1VgvNNl9F-shlFBJQE0XumaplbTR8JtHg/view?usp=drive_link" }
        ]
      },
      {
        title: "What The Hell is Going On!",
        year: "Archive",
        status: "Available",
        type: "Music video / Archive entry",
        arc: "Dark theatrical archive",
        sourceLabel: "Google Drive archive",
        image: "assets/images/Callizto Dark Symphony - What The Hell is going on! (BQ).jpg",
        imageAlt: "What The Hell is Going On video thumbnail",
        description: "A chaotic CDS archive visual with dark humor and theatrical intensity.",
        links: [
          { label: "Watch archive cut", url: "https://drive.google.com/file/d/1XytDtLo8HJ3i2nC69f4Fr2VoTquoMabI/view?usp=drive_link" },
          { label: "Open cover", url: "https://drive.google.com/file/d/1CgT-Z2o-J3KQsJLLea6gE5rFnTBvXeLa/view?usp=drive_link" }
        ]
      },
      {
        title: "Symphonic Epic Metal AD",
        year: "Archive",
        status: "Available",
        type: "Music video / Legacy archive entry",
        arc: "Legacy archive",
        sourceLabel: "Google Drive archive",
        image: "assets/images/Callizto Dark Symphony - Symphonic Epic Metal AD (BQ).jpg",
        imageAlt: "Symphonic Epic Metal AD video thumbnail",
        description: "A legacy visual archive entry from the evolving CDS symphonic metal era.",
        links: [
          { label: "Watch archive cut", url: "https://drive.google.com/file/d/16RvaQDmD-HUHAcDOvLkgnSNeDxQaElnq/view?usp=drive_link" },
          { label: "Open cover", url: "https://drive.google.com/file/d/1ysmS5L6rKWzdwpA3JnK0jjn_aWqw5JpV/view?usp=drive_link" }
        ]
      }
    ]
  };

  function createCard(item, type) {
    var article = document.createElement("article");
    article.className = type + "-card";

    if (item.image) {
      var image = document.createElement("img");
      image.src = item.image;
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

    var links = Array.isArray(item.links) ? item.links.slice() : [];
    if (item.url) {
      links.push({ label: item.linkLabel || "Open", url: item.url });
    }

    if (links.length) {
      var actions = document.createElement("div");
      actions.className = "card-actions";
      article.appendChild(actions);
    }

    links.forEach(function (linkItem) {
      if (!linkItem.url) {
        return;
      }
      var link = document.createElement("a");
      link.className = "button secondary";
      link.href = linkItem.url;
      link.textContent = linkItem.label || "Open";
      if (/^https?:\/\//.test(linkItem.url)) {
        link.target = "_blank";
        link.rel = "noopener";
      }
      article.querySelector(".card-actions").appendChild(link);
    });

    return article;
  }

  function renderJsonList(containerId, url, key, type) {
    var container = document.getElementById(containerId);
    if (!container) {
      return;
    }

    function renderArchiveFolder(archiveFolder) {
      if (!archiveFolder || !archiveFolder.url) {
        return;
      }

      var archiveRoot = document.createElement("div");
      archiveRoot.className = "archive-load-note";

      var label = document.createElement("span");
      label.textContent = "Main public archive folder";
      archiveRoot.appendChild(label);

      var link = document.createElement("a");
      link.className = "button secondary";
      link.href = archiveFolder.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = archiveFolder.label || "Open CDS Archive Folder";
      archiveRoot.appendChild(link);

      container.appendChild(archiveRoot);
    }

    function renderItems(items, note, archiveFolder) {
      container.innerHTML = "";
      if (note) {
        var noteElement = document.createElement("p");
        noteElement.className = "archive-load-note";
        noteElement.textContent = note;
        container.appendChild(noteElement);
      }
      renderArchiveFolder(archiveFolder);
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
        var items = data[key] || [];
        renderItems(items, null, data.archiveFolder);
      })
      .catch(function () {
        renderItems(
          fallbackData[key] || [],
          "Archive data could not be loaded in this local preview. Use a local server or GitHub Pages preview to load the data archive.",
          fallbackData.archiveFolder
        );
      });
  }

  renderJsonList("release-list", "data/releases.json", "releases", "release");
  renderJsonList("video-list", "data/videos.json", "videos", "video");
}());
