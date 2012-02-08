/*!
 * Simple History v0.5.0
 *
 * Copyright 2011, Jörn Zaefferer
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function(window, undefined) {

  var initial = location.href;

  window.SimpleHistory = {
    supported: !!(window.history && window.history.pushState),
    pushState: function(fragment, state) {
      state = state || {};
      history.pushState(state, null, fragment);
      this.notify(state);
    },
    replaceState: function(fragment, state) {
      state = state || {};
      history.replaceState(state, null, fragment);
    },
    notify: function(state) {
      this.matcher(location.pathname + location.search, state);
    },
    start: function(matcher) {
      this.matcher = matcher;
      window.addEventListener("popstate", function(event) {
        // workaround to always ignore first popstate event (Chrome)
        // a timeout isn't reliable enough
        if (initial && initial === location.href) {
          initial = null;
          return;
        }
        SimpleHistory.notify(event.state || {});
      }, false);
    }
  };

}(window));