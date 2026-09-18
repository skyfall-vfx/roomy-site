// Shows one language section at a time. Order of precedence: ?lang= in the URL, a #ko/#en
// hash (kept for the App Store Connect links), the visitor's last choice, then the browser
// language. Both sections stay in the HTML so nothing needs a build step.
(function () {
  var supported = ["ko", "en"];
  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (supported.indexOf(q) >= 0) return q;
    var h = location.hash.replace("#", "");
    if (supported.indexOf(h) >= 0) return h;
    try { var s = localStorage.getItem("roomy.lang"); if (supported.indexOf(s) >= 0) return s; } catch (e) {}
    return (navigator.language || "").toLowerCase().indexOf("ko") === 0 ? "ko" : "en";
  }
  function apply(lang) {
    document.documentElement.lang = lang;
    supported.forEach(function (l) {
      var section = document.getElementById(l);
      if (section) section.hidden = l !== lang;
      document.querySelectorAll('[data-lang="' + l + '"]').forEach(function (b) {
        b.setAttribute("aria-pressed", l === lang ? "true" : "false");
      });
    });
    document.querySelectorAll("[data-title-" + lang + "]").forEach(function (el) {
      document.title = el.getAttribute("data-title-" + lang);
    });
    try { localStorage.setItem("roomy.lang", lang); } catch (e) {}
  }
  document.addEventListener("DOMContentLoaded", function () {
    apply(pick());
    // A #ko/#en hash only picks the language; don't let it scroll the heading under the bar.
    if (supported.indexOf(location.hash.replace("#", "")) >= 0) window.scrollTo(0, 0);
    document.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        apply(b.getAttribute("data-lang"));
        history.replaceState(null, "", location.pathname);
      });
    });
  });
})();
