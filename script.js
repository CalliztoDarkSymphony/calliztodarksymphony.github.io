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

    var title = document.createElement("h3");
    title.textContent = item.title;
    article.appendChild(title);

    var description = document.createElement("p");
    description.textContent = item.description;
    article.appendChild(description);

    if (item.url) {
      var link = document.createElement("a");
      link.className = "button secondary";
      link.href = item.url;
      link.textContent = item.linkLabel || "Open";
      article.appendChild(link);
    }

    return article;
  }

  function renderJsonList(containerId, url, key, type) {
    var container = document.getElementById(containerId);
    if (!container) {
      return;
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
        container.innerHTML = "";
        items.forEach(function (item) {
          container.appendChild(createCard(item, type));
        });
      })
      .catch(function () {
        container.innerHTML = "<p>Archive data could not be loaded.</p>";
      });
  }

  renderJsonList("release-list", "data/releases.json", "releases", "release");
  renderJsonList("video-list", "data/videos.json", "videos", "video");
}());
