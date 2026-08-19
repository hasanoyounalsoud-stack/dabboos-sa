(function () {
  "use strict";

  // ===== قائمة الجوال =====
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
    mainNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ===== بناء المنيو من data/menu.js =====
  var tabsEl = document.getElementById("menu-tabs");
  var panelsEl = document.getElementById("menu-panels");
  var menu = window.DABBOOS_MENU || [];

  if (tabsEl && panelsEl && menu.length) {
    menu.forEach(function (section, i) {
      var tab = document.createElement("button");
      tab.className = "menu-tab";
      tab.type = "button";
      tab.id = "tab-" + section.id;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", "panel-" + section.id);
      tab.setAttribute("aria-selected", i === 0 ? "true" : "false");
      tab.textContent = section.label;
      tabsEl.appendChild(tab);

      var panel = document.createElement("div");
      panel.className = "menu-panel";
      panel.id = "panel-" + section.id;
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", "tab-" + section.id);
      if (i !== 0) panel.hidden = true;

      var grid = document.createElement("div");
      grid.className = "menu-grid";
      section.items.forEach(function (item) {
        var card = document.createElement("article");
        card.className = "menu-item";
        card.innerHTML =
          '<div class="menu-item-top"><h3>' + escapeHtml(item.name) +
          '</h3><span class="menu-price">' + escapeHtml(item.price) + "</span></div>" +
          (item.desc ? "<p>" + escapeHtml(item.desc) + "</p>" : "");
        grid.appendChild(card);
      });
      panel.appendChild(grid);

      if (section.note) {
        var note = document.createElement("p");
        note.className = "menu-note";
        note.textContent = section.note;
        panel.appendChild(note);
      }

      panelsEl.appendChild(panel);

      tab.addEventListener("click", function () {
        tabsEl.querySelectorAll(".menu-tab").forEach(function (t) {
          t.setAttribute("aria-selected", "false");
        });
        panelsEl.querySelectorAll(".menu-panel").forEach(function (p) {
          p.hidden = true;
        });
        tab.setAttribute("aria-selected", "true");
        panel.hidden = false;
      });
    });
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = String(str);
    return div.innerHTML;
  }
})();
