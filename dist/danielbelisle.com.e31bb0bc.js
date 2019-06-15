// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/dock.js":[function(require,module,exports) {
(function () {
  var about = document.getElementById('about');
  var work = document.getElementById('work');
  var terminal = document.getElementById('terminal');
  var chrome = document.getElementById('chrome');
  var panels = document.querySelectorAll('.panel');
  about.addEventListener('click', function () {
    panels.forEach(function (panel) {
      return panel.classList.remove('last-clicked');
    });
    terminal.style.display = 'flex';
    terminal.classList.add('last-clicked');
  });
  work.addEventListener('click', function () {
    panels.forEach(function (panel) {
      return panel.classList.remove('last-clicked');
    });
    chrome.style.display = 'flex';
    chrome.classList.add('last-clicked');
  });
})();
},{}],"js/drag.js":[function(require,module,exports) {
(function () {
  var panels = document.querySelectorAll('.panel');
  var desktop = document.getElementById('desktop');
  var dock = document.getElementById('dock');

  function addButtonEvents(panel) {
    var closeButton = panel.querySelector('.red');
    var maxButton = panel.querySelector('.green');
    var minButton = panel.querySelector('.yellow');

    if (closeButton) {
      closeButton.addEventListener('click', function () {
        panel.style.display = 'none';
        panel.classList.remove('full-screen');
        dock.classList.remove('collapsed');
      });
    }

    if (maxButton) {
      maxButton.addEventListener('click', function () {
        dock.classList.add('collapsed');
        panel.classList.add('full-screen');
      });
    }

    if (minButton) {
      minButton.addEventListener('click', function () {
        dock.classList.remove('collapsed');
        panel.classList.remove('full-screen');
      });
    }
  } // TODO: Add these for mobile
  // desktop.addEventListener("touchstart", dragStart, false);
  // desktop.addEventListener("touchend", dragEnd, false);

  /**
   * Find all panels and make them draggable. If no panel-header is found the panel
   * itself may be grabbed.
   */


  panels.forEach(function (panel) {
    panel.addEventListener('mousedown', function () {
      panels.forEach(function (panel) {
        return panel.classList.remove('last-clicked');
      });
      panel.classList.add('last-clicked');
    });
    var header = panel.querySelector('.panel-header') || panel;
    header.addEventListener('mousedown', function (e) {
      var shiftX = e.clientX - panel.getBoundingClientRect().left;
      var shiftY = e.clientY - panel.getBoundingClientRect().top;

      desktop.onmousemove = function (e) {
        panel.style.left = e.pageX - shiftX + 'px';
        panel.style.top = e.pageY - shiftY + 'px';
      };
    });
    addButtonEvents(panel);
    desktop.addEventListener('mouseup', function () {
      return desktop.onmousemove = null;
    });
    desktop.addEventListener('mouseout', function (e) {
      var from = e.relatedTarget || e.toElement;

      if (!from || from.nodeName === 'HTML') {
        desktop.onmousemove = null;
      }
    });
  });
})();
},{}],"js/terminal.js":[function(require,module,exports) {
(function () {
  var typeSpeed = 60;
  var typeDelay = 1000;
  var enterDelay = 300;
  var blank = document.getElementById('blank');
  var terminalLines = [{
    activeEl: document.getElementById('ls'),
    command: 'ls contact-info',
    resultingEl: document.getElementById('my-contact')
  }, {
    activeEl: document.getElementById('cat'),
    command: 'cat description.txt',
    resultingEl: document.getElementById('my-description')
  }, {
    activeEl: document.getElementById('whoami'),
    command: 'whoami',
    resultingEl: document.getElementById('my-name')
  }];
  /**
   * Recursively type each terminal command and display corresponding results
   *
   * @param {HTMLElement} activeEl - element containing command
   * @param {String} command - command to be typed
   * @param {HTMLElement} resultingEl - element containing results
   */

  function type(_ref) {
    var activeEl = _ref.activeEl,
        command = _ref.command,
        resultingEl = _ref.resultingEl;
    activeEl.style.display = 'block';
    activeEl.classList.add('active');
    setTimeout(function () {
      var i = 0;
      var typeLetter = setInterval(function () {
        if (i === command.length - 1) {
          clearInterval(typeLetter);
          setTimeout(function () {
            resultingEl.style.display = 'block';
            activeEl.classList.remove('active');

            if (terminalLines.length) {
              type(terminalLines.pop());
            } else {
              blank.style.display = 'block';
              blank.classList.add('active');
            }
          }, enterDelay);
        }

        activeEl.innerHTML += command[i] === ' ' ? '&nbsp;' : command[i];
        i++;
      }, typeSpeed);
    }, typeDelay);
  }

  type(terminalLines.pop());
})();
},{}],"index.js":[function(require,module,exports) {
"use strict";

require("./js/dock.js");

require("./js/drag.js");

require("./js/terminal.js");
},{"./js/dock.js":"js/dock.js","./js/drag.js":"js/drag.js","./js/terminal.js":"js/terminal.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59386" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/danielbelisle.com.e31bb0bc.map