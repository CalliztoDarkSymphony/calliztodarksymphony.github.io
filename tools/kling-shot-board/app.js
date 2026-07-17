(function () {
  "use strict";

  var STORAGE_KEY = "cds.kling-shot-board.state.v1";
  var PROGRESS_FORMAT = "kling-shot-board-progress";
  var MAX_SHOTS = 6;
  var MAX_DURATION = 15;
  var SCENE_STATUSES = ["Pending", "Generating", "Needs Review", "Retry", "Completed", "Skipped"];
  var SHOT_STATUSES = ["Not Generated", "Generated", "Accepted", "Retry"];
  var PENDING_SCENE_STATUSES = ["Pending", "Generating", "Needs Review"];
  var COMPLETE_SCENE_STATUSES = ["Completed", "Skipped"];

  var state = {
    pack: null,
    packKey: "",
    source: "",
    progress: null,
    currentSceneId: "",
    filter: "Pending",
    activeShotByScene: {}
  };

  var toastTimer = 0;
  var elements = {};

  function getElement(id) {
    return document.getElementById(id);
  }

  function cacheElements() {
    [
      "pack-meta", "progress-text", "progress-bar", "count-pending", "count-retry",
      "count-completed", "count-all", "app-message", "workspace", "filtered-count",
      "scene-list", "empty-filter", "previous-scene", "next-scene", "scene-position",
      "scene-id", "scene-title", "scene-purpose", "scene-status", "next-offer",
      "next-offer-text", "open-next-pending", "scene-warnings-panel", "scene-warnings",
      "scene-notes", "total-duration", "global-notes", "element-list", "copy-element-map",
      "shot-tabs", "shot-view", "copy-full-scene", "open-import", "export-progress",
      "import-progress", "reset-progress", "import-dialog", "scene-pack-file", "paste-json",
      "import-pasted-json", "load-default-pack", "import-error", "progress-file", "toast"
    ].forEach(function (id) {
      elements[id] = getElement(id);
    });
  }

  function cleanString(value, fallback) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
    return fallback || "";
  }

  function rawString(value) {
    return typeof value === "string" ? value : "";
  }

  function stringArray(value) {
    if (Array.isArray(value)) {
      return value.map(function (item) { return String(item).trim(); }).filter(Boolean);
    }
    if (typeof value === "string" && value.trim()) {
      return value.split(",").map(function (item) { return item.trim(); }).filter(Boolean);
    }
    return [];
  }

  function numberValue(value) {
    var parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function normalizePack(raw) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      throw new Error("The scene pack must be a JSON object.");
    }
    if (!Array.isArray(raw.scenes) || raw.scenes.length === 0) {
      throw new Error("The scene pack must contain at least one scene.");
    }

    var seenSceneIds = new Set();
    var scenes = raw.scenes.map(function (scene, sceneIndex) {
      if (!scene || typeof scene !== "object" || Array.isArray(scene)) {
        throw new Error("Scene " + (sceneIndex + 1) + " is not a valid object.");
      }

      var sceneId = cleanString(scene.id || scene.sceneId, "");
      if (!sceneId) {
        throw new Error("Scene " + (sceneIndex + 1) + " has no scene ID.");
      }
      if (seenSceneIds.has(sceneId)) {
        throw new Error("Duplicate scene ID: " + sceneId);
      }
      seenSceneIds.add(sceneId);

      var sceneTitle = cleanString(scene.sceneTitle || scene.title, "");
      if (!sceneTitle) {
        throw new Error("Scene " + sceneId + " has no title.");
      }

      var seenElementSlots = new Set();
      var sceneElements = Array.isArray(scene.elements) ? scene.elements.map(function (item, elementIndex) {
        var source = item && typeof item === "object" ? item : {};
        var slot = cleanString(source.slot || source.elementSlot, "Element " + (elementIndex + 1));
        if (seenElementSlots.has(slot)) {
          throw new Error("Duplicate element slot in " + sceneId + ": " + slot);
        }
        seenElementSlots.add(slot);
        return {
          slot: slot,
          name: cleanString(source.name || source.characterObjectName || source.character || source.objectName, "Unnamed element"),
          instruction: cleanString(source.instruction || source.usageInstruction, "No usage instruction supplied."),
          thumbnailPath: cleanString(source.thumbnailPath || source.thumbnail, "")
        };
      }) : [];

      var seenShotNumbers = new Set();
      var sceneShots = Array.isArray(scene.shots) ? scene.shots.map(function (shot, shotIndex) {
        var source = shot && typeof shot === "object" ? shot : {};
        var shotNumber = numberValue(source.number || source.shotNumber || shotIndex + 1);
        if (!Number.isInteger(shotNumber) || shotNumber <= 0) {
          throw new Error("Scene " + sceneId + " contains an invalid shot number.");
        }
        if (seenShotNumbers.has(shotNumber)) {
          throw new Error("Duplicate shot number in " + sceneId + ": " + shotNumber);
        }
        seenShotNumbers.add(shotNumber);
        return {
          number: shotNumber,
          duration: numberValue(source.duration || source.durationSeconds),
          title: cleanString(source.title || source.shotTitle, "Shot " + (shotIndex + 1)),
          prompt: rawString(source.prompt || source.standalonePrompt),
          notes: rawString(source.notes),
          expectedResult: rawString(source.expectedResult),
          retryPrompt: rawString(source.retryPrompt),
          generationFilename: cleanString(source.generationFilename || source.filename, ""),
          speaker: cleanString(source.speaker, "Not specified"),
          visibleCharacters: stringArray(source.visibleCharacters),
          cameraSide: cleanString(source.cameraSide || source.camera, "Not specified"),
          eyeline: cleanString(source.eyeline, "Not specified"),
          elementSlots: stringArray(source.elementSlots || source.elements),
          status: SHOT_STATUSES.indexOf(source.status) >= 0 ? source.status : "Not Generated"
        };
      }) : [];

      return {
        id: sceneId,
        title: sceneTitle,
        purpose: rawString(scene.purpose),
        notes: rawString(scene.notes || scene.globalSceneNotes),
        status: SCENE_STATUSES.indexOf(scene.status) >= 0 ? scene.status : "Pending",
        elements: sceneElements,
        shots: sceneShots
      };
    });

    return {
      projectTitle: cleanString(raw.projectTitle || raw.title, "Untitled Kling Project"),
      packVersion: cleanString(raw.packVersion || raw.version, "1.0"),
      globalNotes: rawString(raw.globalNotes),
      placeholderData: Boolean(raw.placeholderData || raw.placeholder),
      scenes: scenes
    };
  }

  function createPackKey(pack) {
    return [pack.projectTitle, pack.packVersion, pack.scenes.map(function (scene) { return scene.id; }).join("|")].join("::");
  }

  function createProgress(pack) {
    var sceneProgress = {};
    pack.scenes.forEach(function (scene) {
      var shotProgress = {};
      scene.shots.forEach(function (shot) {
        shotProgress[String(shot.number)] = {
          status: shot.status,
          filename: shot.generationFilename
        };
      });
      sceneProgress[scene.id] = {
        status: scene.status,
        shots: shotProgress
      };
    });
    return {
      packKey: createPackKey(pack),
      scenes: sceneProgress
    };
  }

  function sanitizeProgress(pack, imported) {
    var clean = createProgress(pack);
    if (!imported || typeof imported !== "object") {
      return clean;
    }

    pack.scenes.forEach(function (scene) {
      var incomingScene = imported.scenes && imported.scenes[scene.id];
      if (!incomingScene || typeof incomingScene !== "object") {
        return;
      }
      if (SCENE_STATUSES.indexOf(incomingScene.status) >= 0) {
        clean.scenes[scene.id].status = incomingScene.status;
      }
      scene.shots.forEach(function (shot) {
        var incomingShot = incomingScene.shots && incomingScene.shots[String(shot.number)];
        if (!incomingShot || typeof incomingShot !== "object") {
          return;
        }
        if (SHOT_STATUSES.indexOf(incomingShot.status) >= 0) {
          clean.scenes[scene.id].shots[String(shot.number)].status = incomingShot.status;
        }
        if (typeof incomingShot.filename === "string") {
          clean.scenes[scene.id].shots[String(shot.number)].filename = incomingShot.filename;
        }
      });
    });

    return clean;
  }

  function activatePack(pack, source, saved) {
    state.pack = pack;
    state.packKey = createPackKey(pack);
    state.source = source;
    state.progress = sanitizeProgress(pack, saved && saved.progress);
    state.filter = saved && ["Pending", "Retry", "Completed", "All"].indexOf(saved.filter) >= 0 ? saved.filter : "Pending";
    state.activeShotByScene = saved && saved.activeShotByScene && typeof saved.activeShotByScene === "object" ? saved.activeShotByScene : {};

    var requestedScene = saved && saved.currentSceneId;
    state.currentSceneId = pack.scenes.some(function (scene) { return scene.id === requestedScene; }) ? requestedScene : pack.scenes[0].id;

    elements["app-message"].hidden = true;
    elements.workspace.hidden = false;
    saveState();
    renderAll();
  }

  function saveState() {
    if (!state.pack) {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        activePack: state.pack,
        packKey: state.packKey,
        source: state.source,
        progress: state.progress,
        currentSceneId: state.currentSceneId,
        filter: state.filter,
        activeShotByScene: state.activeShotByScene
      }));
    } catch (error) {
      showToast("PROGRESS COULD NOT BE SAVED ON THIS DEVICE", true);
    }
  }

  function readSavedState() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      return null;
    }
  }

  function sceneStatus(sceneId) {
    return state.progress.scenes[sceneId].status;
  }

  function shotProgress(sceneId, shotNumber) {
    return state.progress.scenes[sceneId].shots[String(shotNumber)];
  }

  function currentScene() {
    return state.pack.scenes.find(function (scene) { return scene.id === state.currentSceneId; }) || state.pack.scenes[0];
  }

  function scenesForFilter() {
    if (state.filter === "All") {
      return state.pack.scenes.slice();
    }
    if (state.filter === "Pending") {
      return state.pack.scenes.filter(function (scene) { return PENDING_SCENE_STATUSES.indexOf(sceneStatus(scene.id)) >= 0; });
    }
    if (state.filter === "Retry") {
      return state.pack.scenes.filter(function (scene) { return sceneStatus(scene.id) === "Retry"; });
    }
    return state.pack.scenes.filter(function (scene) { return COMPLETE_SCENE_STATUSES.indexOf(sceneStatus(scene.id)) >= 0; });
  }

  function setOptions(select, values) {
    select.replaceChildren();
    values.forEach(function (value) {
      var option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  function createNode(tag, className, text) {
    var node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    if (typeof text === "string") {
      node.textContent = text;
    }
    return node;
  }

  function renderAll() {
    renderPackMeta();
    renderProgress();
    renderFilters();
    renderSceneList();
    renderScene();
  }

  function renderPackMeta() {
    var placeholder = state.pack.placeholderData ? " | PLACEHOLDER DATA" : "";
    elements["pack-meta"].textContent = state.pack.projectTitle + " | Pack " + state.pack.packVersion + " | " + state.pack.scenes.length + " scenes | " + state.source + placeholder;
  }

  function statusCounts() {
    var counts = { Pending: 0, Retry: 0, Completed: 0, All: state.pack.scenes.length };
    state.pack.scenes.forEach(function (scene) {
      var status = sceneStatus(scene.id);
      if (PENDING_SCENE_STATUSES.indexOf(status) >= 0) {
        counts.Pending += 1;
      } else if (status === "Retry") {
        counts.Retry += 1;
      } else if (COMPLETE_SCENE_STATUSES.indexOf(status) >= 0) {
        counts.Completed += 1;
      }
    });
    return counts;
  }

  function renderProgress() {
    var completed = state.pack.scenes.filter(function (scene) { return sceneStatus(scene.id) === "Completed"; }).length;
    var total = state.pack.scenes.length;
    var percent = total ? Math.round((completed / total) * 100) : 0;
    elements["progress-text"].textContent = completed + " / " + total + " scenes completed";
    elements["progress-bar"].style.width = percent + "%";

    var counts = statusCounts();
    elements["count-pending"].textContent = counts.Pending;
    elements["count-retry"].textContent = counts.Retry;
    elements["count-completed"].textContent = counts.Completed;
    elements["count-all"].textContent = counts.All;
  }

  function renderFilters() {
    document.querySelectorAll(".filter-button").forEach(function (button) {
      var active = button.dataset.filter === state.filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function renderSceneList() {
    var scenes = scenesForFilter();
    elements["scene-list"].replaceChildren();
    elements["filtered-count"].textContent = String(scenes.length);
    elements["empty-filter"].hidden = scenes.length !== 0;

    scenes.forEach(function (scene) {
      var status = sceneStatus(scene.id);
      var button = createNode("button", "scene-list-button");
      button.type = "button";
      button.dataset.sceneId = scene.id;
      button.classList.toggle("is-current", scene.id === state.currentSceneId);
      button.classList.toggle("is-completed", status === "Completed");
      button.setAttribute("aria-current", scene.id === state.currentSceneId ? "true" : "false");

      var top = createNode("span", "scene-list-top");
      var titleWrap = createNode("span");
      titleWrap.appendChild(createNode("small", "", scene.id));
      titleWrap.appendChild(createNode("strong", "", scene.title));
      var statusMark = createNode("span", "scene-status-mark", status);
      statusMark.dataset.status = status;
      top.appendChild(titleWrap);
      top.appendChild(statusMark);
      button.appendChild(top);
      elements["scene-list"].appendChild(button);
    });
  }

  function renderScene() {
    var scene = currentScene();
    var sceneIndex = state.pack.scenes.findIndex(function (item) { return item.id === scene.id; });
    elements["scene-position"].textContent = "Scene " + (sceneIndex + 1) + " of " + state.pack.scenes.length;
    elements["previous-scene"].disabled = sceneIndex <= 0;
    elements["next-scene"].disabled = sceneIndex >= state.pack.scenes.length - 1;
    elements["scene-id"].textContent = scene.id;
    elements["scene-title"].textContent = scene.title;
    elements["scene-purpose"].textContent = scene.purpose || "No purpose supplied.";
    elements["scene-notes"].textContent = scene.notes || "No scene notes supplied.";
    elements["global-notes"].textContent = state.pack.globalNotes || "No global notes supplied.";

    setOptions(elements["scene-status"], SCENE_STATUSES);
    elements["scene-status"].value = sceneStatus(scene.id);
    elements["scene-status"].dataset.status = sceneStatus(scene.id);

    var totalDuration = scene.shots.reduce(function (sum, shot) { return sum + shot.duration; }, 0);
    elements["total-duration"].textContent = formatSeconds(totalDuration);
    elements["total-duration"].parentElement.classList.toggle("is-invalid", totalDuration > MAX_DURATION);

    renderNextOffer(scene);
    renderWarnings(scene);
    renderElements(scene);
    renderShots(scene);
  }

  function formatSeconds(value) {
    var rounded = Math.round(value * 10) / 10;
    return rounded + (rounded === 1 ? " second" : " seconds");
  }

  function nextPendingScene(afterSceneId) {
    var scenes = state.pack.scenes;
    var currentIndex = scenes.findIndex(function (scene) { return scene.id === afterSceneId; });
    for (var offset = 1; offset <= scenes.length; offset += 1) {
      var candidate = scenes[(currentIndex + offset) % scenes.length];
      if (PENDING_SCENE_STATUSES.indexOf(sceneStatus(candidate.id)) >= 0 || sceneStatus(candidate.id) === "Retry") {
        return candidate;
      }
    }
    return null;
  }

  function renderNextOffer(scene) {
    var isCompleted = sceneStatus(scene.id) === "Completed";
    var next = isCompleted ? nextPendingScene(scene.id) : null;
    elements["next-offer"].hidden = !isCompleted;
    elements["open-next-pending"].hidden = !next;
    elements["open-next-pending"].dataset.sceneId = next ? next.id : "";
    elements["next-offer-text"].textContent = next ? "Next: " + next.id + " | " + next.title : "No pending or retry scenes remain in this pack.";
  }

  function sceneWarnings(scene) {
    var warnings = [];
    if (scene.shots.length > MAX_SHOTS) {
      warnings.push("This scene contains " + scene.shots.length + " shots. Kling allows a maximum of six. Extra shots are blocked until the JSON is corrected.");
    }
    if (scene.shots.length === 0) {
      warnings.push("This scene has no shots.");
    }
    var totalDuration = scene.shots.reduce(function (sum, shot) { return sum + shot.duration; }, 0);
    if (totalDuration > MAX_DURATION) {
      warnings.push("Total duration is " + formatSeconds(totalDuration) + ". Kling allows a maximum of fifteen seconds.");
    }
    scene.shots.slice(0, MAX_SHOTS).forEach(function (shot) {
      if (!shot.prompt.trim()) {
        warnings.push("Shot " + shot.number + " has no prompt.");
      }
      if (!Number.isFinite(shot.duration) || shot.duration <= 0) {
        warnings.push("Shot " + shot.number + " has no valid duration.");
      }
      var hasSpeaker = shot.speaker && !/^(none|not specified|n\/a)$/i.test(shot.speaker);
      if (hasSpeaker && shot.visibleCharacters.length > 2) {
        warnings.push("Shot " + shot.number + " is a dialogue shot with more than two visible characters. Review identity stability before generating.");
      }
      if (shot.elementSlots.length === 0) {
        warnings.push("Shot " + shot.number + " has no element slot assignments.");
      }
    });
    return warnings;
  }

  function renderWarnings(scene) {
    var warnings = sceneWarnings(scene);
    elements["scene-warnings-panel"].hidden = warnings.length === 0;
    elements["scene-warnings"].replaceChildren();
    warnings.forEach(function (warning) {
      elements["scene-warnings"].appendChild(createNode("li", "", warning));
    });
  }

  function renderElements(scene) {
    elements["element-list"].replaceChildren();
    elements["copy-element-map"].disabled = scene.elements.length === 0;
    if (scene.elements.length === 0) {
      elements["element-list"].appendChild(createNode("p", "empty-state", "No elements assigned to this scene."));
      return;
    }

    scene.elements.forEach(function (item) {
      var card = createNode("article", "element-card");
      var visual;
      if (item.thumbnailPath) {
        visual = document.createElement("img");
        visual.src = item.thumbnailPath;
        visual.alt = item.name;
        visual.loading = "lazy";
        visual.addEventListener("error", function () {
          var fallback = createNode("div", "element-placeholder", item.slot.replace(/[^0-9]/g, "") || "E");
          visual.replaceWith(fallback);
        }, { once: true });
      } else {
        visual = createNode("div", "element-placeholder", item.slot.replace(/[^0-9]/g, "") || "E");
      }
      var copy = createNode("div");
      copy.appendChild(createNode("span", "element-slot", item.slot));
      copy.appendChild(createNode("strong", "", item.name));
      copy.appendChild(createNode("p", "", item.instruction));
      card.appendChild(visual);
      card.appendChild(copy);
      elements["element-list"].appendChild(card);
    });
  }

  function renderShots(scene) {
    var visibleShots = scene.shots.slice(0, MAX_SHOTS);
    elements["shot-tabs"].replaceChildren();
    elements["copy-full-scene"].disabled = !visibleShots.some(function (shot) { return shot.prompt.length > 0; });

    if (visibleShots.length === 0) {
      elements["shot-view"].replaceChildren(createNode("p", "empty-state", "No shots available in this scene."));
      return;
    }

    var requestedNumber = Number(state.activeShotByScene[scene.id]);
    var activeShot = visibleShots.find(function (shot) { return shot.number === requestedNumber; }) || visibleShots[0];
    state.activeShotByScene[scene.id] = activeShot.number;

    visibleShots.forEach(function (shot) {
      var progress = shotProgress(scene.id, shot.number);
      var button = createNode("button", "shot-tab", "Shot " + shot.number);
      button.type = "button";
      button.setAttribute("role", "tab");
      button.dataset.shotNumber = String(shot.number);
      button.setAttribute("aria-selected", String(shot.number === activeShot.number));
      button.appendChild(createNode("span", "shot-tab-status", progress.status));
      elements["shot-tabs"].appendChild(button);
    });

    renderShot(scene, activeShot);
  }

  function metadataItem(label, value) {
    var item = createNode("div", "metadata-item");
    item.appendChild(createNode("span", "", label));
    item.appendChild(createNode("strong", "", value || "Not specified"));
    return item;
  }

  function renderShot(scene, shot) {
    var progress = shotProgress(scene.id, shot.number);
    elements["shot-view"].replaceChildren();

    var heading = createNode("header", "shot-heading");
    var title = createNode("div");
    title.appendChild(createNode("p", "shot-kicker", "Shot " + shot.number));
    title.appendChild(createNode("h4", "", shot.title));
    heading.appendChild(title);
    heading.appendChild(createNode("span", "duration-badge", formatSeconds(shot.duration)));

    var statusRow = createNode("div", "shot-status-row");
    var statusLabel = createNode("label", "status-control");
    statusLabel.appendChild(createNode("span", "", "Shot status"));
    var statusSelect = document.createElement("select");
    statusSelect.id = "active-shot-status";
    statusSelect.dataset.shotNumber = String(shot.number);
    setOptions(statusSelect, SHOT_STATUSES);
    statusSelect.value = progress.status;
    statusSelect.dataset.status = progress.status;
    statusLabel.appendChild(statusSelect);
    statusRow.appendChild(statusLabel);

    var metadata = createNode("div", "shot-metadata");
    metadata.appendChild(metadataItem("Speaker", shot.speaker));
    metadata.appendChild(metadataItem("Visible characters", shot.visibleCharacters.length ? shot.visibleCharacters.join(", ") : "Not specified"));
    metadata.appendChild(metadataItem("Camera side", shot.cameraSide));
    metadata.appendChild(metadataItem("Eyeline", shot.eyeline));

    var assignments = createNode("section", "shot-elements");
    assignments.appendChild(createNode("strong", "", "Element assignments for this shot"));
    var chipList = createNode("div", "element-chip-list");
    if (shot.elementSlots.length) {
      shot.elementSlots.forEach(function (slot) {
        var match = scene.elements.find(function (item) { return item.slot === slot; });
        chipList.appendChild(createNode("span", "element-chip", match ? slot + ": " + match.name : slot + ": assignment not found in scene map"));
      });
    } else {
      chipList.appendChild(createNode("span", "element-chip", "No element slots assigned"));
    }
    assignments.appendChild(chipList);

    var promptLabel = createNode("label", "prompt-label", "Complete standalone prompt");
    promptLabel.htmlFor = "active-shot-prompt";
    var prompt = document.createElement("textarea");
    prompt.id = "active-shot-prompt";
    prompt.className = "prompt-text";
    prompt.readOnly = true;
    prompt.value = shot.prompt;

    var copyPrompt = createNode("button", "button primary copy-primary", "Copy shot prompt");
    copyPrompt.type = "button";
    copyPrompt.dataset.action = "copy-shot";
    copyPrompt.dataset.shotNumber = String(shot.number);
    copyPrompt.disabled = !shot.prompt.length;

    var filenameLabel = createNode("label", "filename-control");
    filenameLabel.appendChild(createNode("span", "", "Generation filename"));
    var filenameInput = document.createElement("input");
    filenameInput.type = "text";
    filenameInput.id = "active-shot-filename";
    filenameInput.dataset.shotNumber = String(shot.number);
    filenameInput.value = progress.filename;
    filenameInput.placeholder = "scene-shot-version.mp4";
    filenameLabel.appendChild(filenameInput);

    var details = createNode("div", "shot-detail-grid");
    if (shot.notes) {
      var notes = createNode("article", "shot-detail");
      notes.appendChild(createNode("h5", "", "Shot notes"));
      notes.appendChild(createNode("p", "", shot.notes));
      details.appendChild(notes);
    }
    if (shot.expectedResult) {
      var expected = createNode("article", "shot-detail");
      expected.appendChild(createNode("h5", "", "Expected result"));
      expected.appendChild(createNode("p", "", shot.expectedResult));
      details.appendChild(expected);
    }

    elements["shot-view"].appendChild(heading);
    elements["shot-view"].appendChild(statusRow);
    elements["shot-view"].appendChild(metadata);
    elements["shot-view"].appendChild(assignments);
    elements["shot-view"].appendChild(promptLabel);
    elements["shot-view"].appendChild(prompt);
    elements["shot-view"].appendChild(copyPrompt);
    elements["shot-view"].appendChild(filenameLabel);
    if (details.childElementCount) {
      elements["shot-view"].appendChild(details);
    }

    if (shot.retryPrompt) {
      var retryBlock = createNode("section", "retry-block");
      var retryLabel = createNode("label", "prompt-label", "Optional retry prompt");
      var retryText = document.createElement("textarea");
      retryText.readOnly = true;
      retryText.value = shot.retryPrompt;
      retryLabel.appendChild(retryText);
      var retryButton = createNode("button", "button secondary full-width", "Copy retry prompt");
      retryButton.type = "button";
      retryButton.dataset.action = "copy-retry";
      retryButton.dataset.shotNumber = String(shot.number);
      retryBlock.appendChild(retryLabel);
      retryBlock.appendChild(retryButton);
      elements["shot-view"].appendChild(retryBlock);
    }
  }

  function elementMapText(scene) {
    return scene.elements.map(function (item) {
      return item.slot + ": " + item.name + ". " + item.instruction;
    }).join("\n");
  }

  function fullScenePromptText(scene) {
    return scene.shots.slice(0, MAX_SHOTS).map(function (shot) { return shot.prompt; }).filter(function (prompt) { return prompt.length > 0; }).join("\n\n");
  }

  function findShot(scene, number) {
    return scene.shots.find(function (shot) { return shot.number === Number(number); });
  }

  async function copyText(text, feedback) {
    if (!text) {
      showToast("NOTHING TO COPY", true);
      return;
    }
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        var fallback = document.createElement("textarea");
        fallback.value = text;
        fallback.setAttribute("readonly", "");
        fallback.style.position = "fixed";
        fallback.style.opacity = "0";
        document.body.appendChild(fallback);
        fallback.select();
        if (!document.execCommand("copy")) {
          throw new Error("Copy command failed");
        }
        fallback.remove();
      }
      showToast("COPIED: " + feedback, false);
    } catch (error) {
      showToast("COPY FAILED. SELECT THE TEXT MANUALLY.", true);
    }
  }

  function showToast(message, isError) {
    window.clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.style.borderColor = isError ? "var(--red)" : "var(--cyan)";
    elements.toast.hidden = false;
    toastTimer = window.setTimeout(function () {
      elements.toast.hidden = true;
    }, 2200);
  }

  function setAppError(message) {
    elements["app-message"].textContent = message;
    elements["app-message"].classList.add("is-error");
    elements["app-message"].hidden = false;
    elements.workspace.hidden = true;
  }

  function setImportError(message) {
    elements["import-error"].textContent = message;
    elements["import-error"].hidden = false;
  }

  function clearImportError() {
    elements["import-error"].textContent = "";
    elements["import-error"].hidden = true;
  }

  async function loadDefaultPack(closeDialog) {
    clearImportError();
    try {
      var response = await fetch("scene-pack.json", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("scene-pack.json returned HTTP " + response.status + ".");
      }
      var raw = await response.json();
      var pack = normalizePack(raw);
      activatePack(pack, "Automatic scene-pack.json", null);
      if (closeDialog && elements["import-dialog"].open) {
        elements["import-dialog"].close();
      }
      showToast("DEFAULT SCENE PACK LOADED", false);
    } catch (error) {
      var message = "Could not load scene-pack.json. " + error.message;
      if (elements["import-dialog"].open) {
        setImportError(message);
      } else {
        setAppError(message);
      }
    }
  }

  function importPackText(text, source) {
    clearImportError();
    try {
      var raw = JSON.parse(text);
      var pack = normalizePack(raw);
      activatePack(pack, source, null);
      elements["paste-json"].value = "";
      if (elements["import-dialog"].open) {
        elements["import-dialog"].close();
      }
      showToast("SCENE PACK IMPORTED", false);
    } catch (error) {
      setImportError("Scene pack import failed. " + error.message);
    }
  }

  function exportProgress() {
    if (!state.pack) {
      return;
    }
    var payload = {
      format: PROGRESS_FORMAT,
      version: 1,
      exportedAt: new Date().toISOString(),
      projectTitle: state.pack.projectTitle,
      packVersion: state.pack.packVersion,
      packKey: state.packKey,
      currentSceneId: state.currentSceneId,
      filter: state.filter,
      activeShotByScene: state.activeShotByScene,
      progress: state.progress
    };
    downloadJson(payload, safeFilename(state.pack.projectTitle) + "-progress.json");
    showToast("PROGRESS EXPORTED", false);
  }

  function downloadJson(payload, filename) {
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function safeFilename(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "kling-shot-board";
  }

  function importProgressData(raw) {
    if (!raw || typeof raw !== "object") {
      throw new Error("The progress file is not a JSON object.");
    }
    if (raw.format && raw.format !== PROGRESS_FORMAT) {
      throw new Error("This is not a Kling Shot Board progress file.");
    }
    if (raw.packKey && raw.packKey !== state.packKey) {
      throw new Error("This progress file belongs to a different scene pack.");
    }
    var incoming = raw.progress && typeof raw.progress === "object" ? raw.progress : raw;
    state.progress = sanitizeProgress(state.pack, incoming);
    if (raw.currentSceneId && state.pack.scenes.some(function (scene) { return scene.id === raw.currentSceneId; })) {
      state.currentSceneId = raw.currentSceneId;
    }
    if (["Pending", "Retry", "Completed", "All"].indexOf(raw.filter) >= 0) {
      state.filter = raw.filter;
    }
    if (raw.activeShotByScene && typeof raw.activeShotByScene === "object") {
      state.activeShotByScene = raw.activeShotByScene;
    }
    saveState();
    renderAll();
  }

  function resetProgress() {
    if (!state.pack) {
      return;
    }
    if (!window.confirm("Reset all scene and shot progress for this pack? This cannot be undone.")) {
      return;
    }
    state.progress = createProgress(state.pack);
    state.currentSceneId = state.pack.scenes[0].id;
    state.activeShotByScene = {};
    state.filter = "Pending";
    saveState();
    renderAll();
    showToast("PROGRESS RESET", false);
  }

  function moveScene(direction) {
    var index = state.pack.scenes.findIndex(function (scene) { return scene.id === state.currentSceneId; });
    var nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= state.pack.scenes.length) {
      return;
    }
    state.currentSceneId = state.pack.scenes[nextIndex].id;
    saveState();
    renderSceneList();
    renderScene();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateSceneStatus(value) {
    var scene = currentScene();
    state.progress.scenes[scene.id].status = value;
    saveState();
    renderProgress();
    renderFilters();
    renderSceneList();
    renderScene();
    if (value === "Completed") {
      showToast("SCENE COMPLETED", false);
    }
  }

  function bindEvents() {
    document.querySelectorAll(".filter-button").forEach(function (button) {
      button.addEventListener("click", function () {
        state.filter = button.dataset.filter;
        saveState();
        renderFilters();
        renderSceneList();
      });
    });

    elements["scene-list"].addEventListener("click", function (event) {
      var button = event.target.closest("[data-scene-id]");
      if (!button) {
        return;
      }
      state.currentSceneId = button.dataset.sceneId;
      saveState();
      renderSceneList();
      renderScene();
    });

    elements["previous-scene"].addEventListener("click", function () { moveScene(-1); });
    elements["next-scene"].addEventListener("click", function () { moveScene(1); });

    elements["scene-status"].addEventListener("change", function () {
      updateSceneStatus(elements["scene-status"].value);
    });

    elements["open-next-pending"].addEventListener("click", function () {
      var sceneId = elements["open-next-pending"].dataset.sceneId;
      if (!sceneId) {
        return;
      }
      state.currentSceneId = sceneId;
      state.filter = sceneStatus(sceneId) === "Retry" ? "Retry" : "Pending";
      saveState();
      renderAll();
    });

    elements["shot-tabs"].addEventListener("click", function (event) {
      var button = event.target.closest("[data-shot-number]");
      if (!button) {
        return;
      }
      state.activeShotByScene[currentScene().id] = Number(button.dataset.shotNumber);
      saveState();
      renderShots(currentScene());
    });

    elements["shot-view"].addEventListener("change", function (event) {
      if (event.target.id !== "active-shot-status") {
        return;
      }
      var scene = currentScene();
      var progress = shotProgress(scene.id, event.target.dataset.shotNumber);
      progress.status = event.target.value;
      saveState();
      renderShots(scene);
      renderSceneList();
    });

    elements["shot-view"].addEventListener("input", function (event) {
      if (event.target.id !== "active-shot-filename") {
        return;
      }
      var scene = currentScene();
      shotProgress(scene.id, event.target.dataset.shotNumber).filename = event.target.value;
      saveState();
    });

    elements["shot-view"].addEventListener("click", function (event) {
      var button = event.target.closest("[data-action]");
      if (!button) {
        return;
      }
      var scene = currentScene();
      var shot = findShot(scene, button.dataset.shotNumber);
      if (!shot) {
        return;
      }
      if (button.dataset.action === "copy-shot") {
        copyText(shot.prompt, "SHOT " + shot.number);
      } else if (button.dataset.action === "copy-retry") {
        copyText(shot.retryPrompt, "RETRY SHOT " + shot.number);
      }
    });

    elements["copy-element-map"].addEventListener("click", function () {
      copyText(elementMapText(currentScene()), "ELEMENT MAP");
    });

    elements["copy-full-scene"].addEventListener("click", function () {
      copyText(fullScenePromptText(currentScene()), "FULL SCENE");
    });

    elements["open-import"].addEventListener("click", function () {
      clearImportError();
      if (typeof elements["import-dialog"].showModal === "function") {
        elements["import-dialog"].showModal();
      } else {
        elements["import-dialog"].setAttribute("open", "");
      }
    });

    elements["scene-pack-file"].addEventListener("change", async function (event) {
      var file = event.target.files && event.target.files[0];
      if (!file) {
        return;
      }
      try {
        importPackText(await file.text(), "Imported file: " + file.name);
      } catch (error) {
        setImportError("Could not read the selected file. " + error.message);
      }
      event.target.value = "";
    });

    elements["import-pasted-json"].addEventListener("click", function () {
      if (!elements["paste-json"].value.trim()) {
        setImportError("Paste a scene pack before importing.");
        return;
      }
      importPackText(elements["paste-json"].value, "Pasted JSON");
    });

    elements["load-default-pack"].addEventListener("click", function () { loadDefaultPack(true); });
    elements["export-progress"].addEventListener("click", exportProgress);
    elements["import-progress"].addEventListener("click", function () { elements["progress-file"].click(); });
    elements["reset-progress"].addEventListener("click", resetProgress);

    elements["progress-file"].addEventListener("change", async function (event) {
      var file = event.target.files && event.target.files[0];
      if (!file) {
        return;
      }
      try {
        importProgressData(JSON.parse(await file.text()));
        showToast("PROGRESS IMPORTED", false);
      } catch (error) {
        showToast("PROGRESS IMPORT FAILED: " + error.message, true);
      }
      event.target.value = "";
    });
  }

  async function initialize() {
    cacheElements();
    bindEvents();
    var saved = readSavedState();
    if (saved && saved.activePack) {
      try {
        var pack = normalizePack(saved.activePack);
        activatePack(pack, "Saved device pack", saved);
        return;
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    await loadDefaultPack(false);
  }

  initialize();
})();
