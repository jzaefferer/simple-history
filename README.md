# Simple History

This is a JavaScript library to lightly wrap the HTML5 history API, promoting the API
in its most useful form, without a hashchange fallback or trying to fix irrelevant bugs.

If you need an implementation with hashchange fallback, give
[History.js](https://github.com/balupton/History.js/) a try.

## Usage

Before you intialize any relevant event handlers, check if HTML5 history is supported:

    if (SimpleHistory.supported) {
    	// event handlers
    }

When support is available, use `SimpleHistory.start` to be notified whenever state changes:

    SimpleHistory.start(function(fragment) {
      // pass to router
    });

That callback is called whenever a state change occurs (push or pop, not on replace). Its not called
on page load, assuming the inital rendering is done on the server. If not, you have to implement it
elsewhere.

To trigger a state change manually, use the `pushState` and `replaceState` methods:

    SimpleHistory.pushState(fragment);
    SimpleHistory.replaceState(fragment);

As with the underlying API, `pushState` adds a history entry, `replaceState` replaces the
current history entry. Use `replaceState` whenever you implement a redirect.

## Roadmap

This library is intended to be kept as simple as it is now. It won't ever support a
hashchange fallback, nor updating `document.title`. If you find an issue, please
file a ticket. Of course, patches (via Pull Requests) are welcome.

## License

Copyright 2012, Jörn Zaefferer

Dual licensed under the MIT or GPL Version 2 licenses.
