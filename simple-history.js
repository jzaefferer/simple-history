/*!
 * Simple History v0.4.0
 *
 * Copyright 2011, Jörn Zaefferer
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function(window, undefined) {

  var initial = location.href;

  window.SimpleHistory = {
    supported: !!(window.history && window.history.pushState),
    pushState: function(fragment) {
      history.pushState({}, null, fragment);
      this.notify();
    },
    replaceState: function(fragment) {
      history.replaceState({}, null, fragment);
    },
    notify: function() {
      this.matcher(location.pathname + location.search);
    },
    start: function(matcher) {
      this.matcher = matcher;
      window.addEventListener("popstate", function() {
        // workaround to always ignore first popstate event (Chrome)
        // a timeout isn't reliable enough
        if (initial && initial === location.href) {
          initial = null;
          return;
        }
        SimpleHistory.notify();
      }, false);
    }
  };

}(window));