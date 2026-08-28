/* Phosphor Icons — local loader (vendored from @phosphor-icons/web@2.1.1)
   Original src/index.js injected stylesheets from a remote CDN; this local
   version loads the vendored style.css via a relative path (no CDN). */
(function () {
  var head = document.getElementsByTagName("head")[0];
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "./style.css";
  head.appendChild(link);
})();