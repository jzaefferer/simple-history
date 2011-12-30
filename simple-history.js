/*!
 * Simple History v0.1.0
 *
 * Copyright 2011, Jörn Zaefferer
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function(window, undefined) {

  window.SimpleHistory = {
    supported: !!(window.history && window.history.pushState),
    pushState: function(fragment) {
      history.pushState({}, null, fragment);
      this.notify();
    },
    replaceState: function(fragment) {
      history.replaceState({}, null, fragment);
      this.notify();
    },
    notify: function() {
      this.matcher(location.pathname + location.search);
    },
    start: function(matcher) {
      this.matcher = matcher;
      // delay binding to ignore first popstate event in Chrome
      setTimeout(function() {
        window.addEventListener("popstate", function() {
          SimpleHistory.notify();
        }, false);
      }, 100);
      this.notify();
    }
  };

}(window));