(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeCxtmenu"] = factory();
	else
		root["cytoscapeCxtmenu"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(2);
var assign = __webpack_require__(1);

var _require = __webpack_require__(3),
    removeEles = _require.removeEles,
    setStyles = _require.setStyles,
    createElement = _require.createElement,
    getPixelRatio = _require.getPixelRatio,
    getOffset = _require.getOffset;

var cxtmenu = function cxtmenu(params) {
  var options = assign({}, defaults, params);
  var cy = this;
  var container = cy.container();
  var target = void 0;

  var data = {
    options: options,
    handlers: [],
    container: createElement({ class: 'cxtmenu' })
  };

  var wrapper = data.container;
  var parent = createElement();
  var canvas = createElement({ tag: 'canvas' });
  var commands = [];
  var c2d = canvas.getContext('2d');
  var r = options.menuRadius;
  var containerSize = (r + options.activePadding) * 2;
  var activeCommandI = void 0;
  var offset = void 0;

  container.insertBefore(wrapper, container.firstChild);
  wrapper.appendChild(parent);
  parent.appendChild(canvas);

  setStyles(wrapper, {
    position: 'absolute',
    zIndex: options.zIndex,
    userSelect: 'none',
    pointerEvents: 'none' // prevent events on menu in modern browsers
  });

  // prevent events on menu in legacy browsers
  ['mousedown', 'mousemove', 'mouseup', 'contextmenu'].forEach(function (evt) {
    wrapper.addEventListener(evt, function (e) {
      e.preventDefault();

      return false;
    });
  });

  setStyles(parent, {
    display: 'none',
    width: containerSize + 'px',
    height: containerSize + 'px',
    position: 'absolute',
    zIndex: 1,
    marginLeft: -options.activePadding + 'px',
    marginTop: -options.activePadding + 'px',
    userSelect: 'none'
  });

  canvas.width = containerSize;
  canvas.height = containerSize;

  function createMenuItems() {
    removeEles('.cxtmenu-item', parent);
    var dtheta = 2 * Math.PI / commands.length;
    var theta1 = Math.PI / 2;
    var theta2 = theta1 + dtheta;

    for (var i = 0; i < commands.length; i++) {
      var command = commands[i];

      var midtheta = (theta1 + theta2) / 2;
      var rx1 = 0.66 * r * Math.cos(midtheta);
      var ry1 = 0.66 * r * Math.sin(midtheta);

      var item = createElement({ class: 'cxtmenu-item' });
      setStyles(item, {
        color: options.itemColor,
        cursor: 'default',
        display: 'table',
        'text-align': 'center',
        //background: 'red',
        position: 'absolute',
        'text-shadow': '-1px -1px 2px ' + options.itemTextShadowColor + ', 1px -1px 2px ' + options.itemTextShadowColor + ', -1px 1px 2px ' + options.itemTextShadowColor + ', 1px 1px 1px ' + options.itemTextShadowColor,
        left: '50%',
        top: '50%',
        'min-height': r * 0.66 + 'px',
        width: r * 0.66 + 'px',
        height: r * 0.66 + 'px',
        marginLeft: rx1 - r * 0.33 + 'px',
        marginTop: -ry1 - r * 0.33 + 'px'
      });

      var content = createElement({ class: 'cxtmenu-content' });

      if (command.content instanceof HTMLElement) {
        content.appendChild(command.content);
      } else {
        content.innerHTML = command.content;
      }

      setStyles(content, {
        'width': r * 0.66 + 'px',
        'height': r * 0.66 + 'px',
        'vertical-align': 'middle',
        'display': 'table-cell'
      });

      setStyles(content, command.contentStyle || {});

      if (command.disabled === true || command.enabled === false) {
        content.setAttribute('class', 'cxtmenu-content cxtmenu-disabled');
      }

      parent.appendChild(item);
      item.appendChild(content);

      theta1 += dtheta;
      theta2 += dtheta;
    }
  }

  function queueDrawBg(rspotlight) {
    redrawQueue.drawBg = [rspotlight];
  }

  function drawBg(rspotlight) {
    rspotlight = rspotlight !== undefined ? rspotlight : rs;

    c2d.globalCompositeOperation = 'source-over';

    c2d.clearRect(0, 0, containerSize, containerSize);

    // draw background items
    c2d.fillStyle = options.fillColor;
    var dtheta = 2 * Math.PI / commands.length;
    var theta1 = Math.PI / 2;
    var theta2 = theta1 + dtheta;

    for (var index = 0; index < commands.length; index++) {
      var command = commands[index];

      if (command.fillColor) {
        c2d.fillStyle = command.fillColor;
      }
      c2d.beginPath();
      c2d.moveTo(r + options.activePadding, r + options.activePadding);
      c2d.arc(r + options.activePadding, r + options.activePadding, r, 2 * Math.PI - theta1, 2 * Math.PI - theta2, true);
      c2d.closePath();
      c2d.fill();

      theta1 += dtheta;
      theta2 += dtheta;

      c2d.fillStyle = options.fillColor;
    }

    // draw separators between items
    c2d.globalCompositeOperation = 'destination-out';
    c2d.strokeStyle = 'white';
    c2d.lineWidth = options.separatorWidth;
    theta1 = Math.PI / 2;
    theta2 = theta1 + dtheta;

    for (var i = 0; i < commands.length; i++) {
      var rx1 = r * Math.cos(theta1);
      var ry1 = r * Math.sin(theta1);
      c2d.beginPath();
      c2d.moveTo(r + options.activePadding, r + options.activePadding);
      c2d.lineTo(r + options.activePadding + rx1, r + options.activePadding - ry1);
      c2d.closePath();
      c2d.stroke();

      theta1 += dtheta;
      theta2 += dtheta;
    }

    c2d.fillStyle = 'white';
    c2d.globalCompositeOperation = 'destination-out';
    c2d.beginPath();
    c2d.arc(r + options.activePadding, r + options.activePadding, rspotlight + options.spotlightPadding, 0, Math.PI * 2, true);
    c2d.closePath();
    c2d.fill();

    c2d.globalCompositeOperation = 'source-over';
  }

  function queueDrawCommands(rx, ry, theta) {
    redrawQueue.drawCommands = [rx, ry, theta];
  }

  function drawCommands(rx, ry, theta) {
    var dtheta = 2 * Math.PI / commands.length;
    var theta1 = Math.PI / 2;
    var theta2 = theta1 + dtheta;

    theta1 += dtheta * activeCommandI;
    theta2 += dtheta * activeCommandI;

    c2d.fillStyle = options.activeFillColor;
    c2d.strokeStyle = 'black';
    c2d.lineWidth = 1;
    c2d.beginPath();
    c2d.moveTo(r + options.activePadding, r + options.activePadding);
    c2d.arc(r + options.activePadding, r + options.activePadding, r + options.activePadding, 2 * Math.PI - theta1, 2 * Math.PI - theta2, true);
    c2d.closePath();
    c2d.fill();

    c2d.fillStyle = 'white';
    c2d.globalCompositeOperation = 'destination-out';

    var tx = r + options.activePadding + rx / r * (rs + options.spotlightPadding - options.indicatorSize / 4);
    var ty = r + options.activePadding + ry / r * (rs + options.spotlightPadding - options.indicatorSize / 4);
    var rot = Math.PI / 4 - theta;

    c2d.translate(tx, ty);
    c2d.rotate(rot);

    // clear the indicator
    c2d.beginPath();
    c2d.fillRect(-options.indicatorSize / 2, -options.indicatorSize / 2, options.indicatorSize, options.indicatorSize);
    c2d.closePath();
    c2d.fill();

    c2d.rotate(-rot);
    c2d.translate(-tx, -ty);

    // c2d.setTransform( 1, 0, 0, 1, 0, 0 );

    // clear the spotlight
    c2d.beginPath();
    c2d.arc(r + options.activePadding, r + options.activePadding, rs + options.spotlightPadding, 0, Math.PI * 2, true);
    c2d.closePath();
    c2d.fill();

    c2d.globalCompositeOperation = 'source-over';
  }

  function updatePixelRatio() {
    var pxr = getPixelRatio();
    var w = containerSize;
    var h = containerSize;

    canvas.width = w * pxr;
    canvas.height = h * pxr;

    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';

    c2d.setTransform(1, 0, 0, 1, 0, 0);
    c2d.scale(pxr, pxr);
  }

  var redrawing = true;
  var redrawQueue = {};

  var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
    return setTimeout(fn, 16);
  };

  var redraw = function redraw() {
    if (redrawQueue.drawBg) {
      drawBg.apply(null, redrawQueue.drawBg);
    }

    if (redrawQueue.drawCommands) {
      drawCommands.apply(null, redrawQueue.drawCommands);
    }

    redrawQueue = {};

    if (redrawing) {
      raf(redraw);
    }
  };

  // kick off
  updatePixelRatio();
  redraw();

  var ctrx = void 0,
      ctry = void 0,
      rs = void 0;

  var bindings = {
    on: function on(events, selector, fn) {

      var _fn = fn;
      if (selector === 'core') {
        _fn = function _fn(e) {
          if (e.cyTarget === cy || e.target === cy) {
            // only if event target is directly core
            return fn.apply(this, [e]);
          }
        };
      }

      data.handlers.push({
        events: events,
        selector: selector,
        fn: _fn
      });

      if (selector === 'core') {
        cy.on(events, _fn);
      } else {
        cy.on(events, selector, _fn);
      }

      return this;
    }
  };

  function addEventListeners() {
    var grabbable = void 0;
    var inGesture = false;
    var dragHandler = void 0;
    var zoomEnabled = void 0;
    var panEnabled = void 0;
    var boxEnabled = void 0;
    var gestureStartEvent = void 0;

    var restoreZoom = function restoreZoom() {
      if (zoomEnabled) {
        cy.userZoomingEnabled(true);
      }
    };

    var restoreGrab = function restoreGrab() {
      if (grabbable) {
        target.grabify();
      }
    };

    var restorePan = function restorePan() {
      if (panEnabled) {
        cy.userPanningEnabled(true);
      }
    };

    var restoreBoxSeln = function restoreBoxSeln() {
      if (boxEnabled) {
        cy.boxSelectionEnabled(true);
      }
    };

    var restoreGestures = function restoreGestures() {
      restoreGrab();
      restoreZoom();
      restorePan();
      restoreBoxSeln();
    };

    window.addEventListener('resize', updatePixelRatio);

    bindings.on('resize', function () {
      updatePixelRatio();
    }).on(options.openMenuEvents, options.selector, function (e) {
      target = this; // Remember which node the context menu is for
      var ele = this;
      var isCy = this === cy;

      if (inGesture) {
        parent.style.display = 'none';

        inGesture = false;

        restoreGestures();
      }

      if (typeof options.commands === 'function') {
        var res = options.commands(target);
        if (res.then) {
          res.then(function (_commands) {
            commands = _commands;
            openMenu();
          });
        } else {
          commands = res;
          openMenu();
        }
      } else {
        commands = options.commands;
        openMenu();
      }

      function openMenu() {
        if (!commands || commands.length === 0) {
          return;
        }

        zoomEnabled = cy.userZoomingEnabled();
        cy.userZoomingEnabled(false);

        panEnabled = cy.userPanningEnabled();
        cy.userPanningEnabled(false);

        boxEnabled = cy.boxSelectionEnabled();
        cy.boxSelectionEnabled(false);

        grabbable = target.grabbable && target.grabbable();
        if (grabbable) {
          target.ungrabify();
        }

        var rp = void 0,
            rw = void 0,
            rh = void 0;
        if (!isCy && ele.isNode() && !ele.isParent() && !options.atMouse) {
          rp = ele.renderedPosition();
          rw = ele.renderedWidth();
          rh = ele.renderedHeight();
        } else {
          rp = e.renderedPosition || e.cyRenderedPosition;
          rw = 1;
          rh = 1;
        }

        offset = getOffset(container);

        ctrx = rp.x;
        ctry = rp.y;

        createMenuItems();

        setStyles(parent, {
          display: 'block',
          left: rp.x - r + 'px',
          top: rp.y - r + 'px'
        });

        rs = Math.max(rw, rh) / 2;
        rs = Math.max(rs, options.minSpotlightRadius);
        rs = Math.min(rs, options.maxSpotlightRadius);

        queueDrawBg();

        activeCommandI = undefined;

        inGesture = true;
        gestureStartEvent = e;
      }
    }).on('cxtdrag tapdrag', options.selector, dragHandler = function dragHandler(e) {

      if (!inGesture) {
        return;
      }

      var origE = e.originalEvent;
      var isTouch = origE.touches && origE.touches.length > 0;

      var pageX = (isTouch ? origE.touches[0].pageX : origE.pageX) - window.scrollX;
      var pageY = (isTouch ? origE.touches[0].pageY : origE.pageY) - window.scrollY;

      activeCommandI = undefined;

      var dx = pageX - offset.left - ctrx;
      var dy = pageY - offset.top - ctry;

      if (dx === 0) {
        dx = 0.01;
      }

      var d = Math.sqrt(dx * dx + dy * dy);
      var cosTheta = (dy * dy - d * d - dx * dx) / (-2 * d * dx);
      var theta = Math.acos(cosTheta);

      if (d < rs + options.spotlightPadding || d > options.menuRadius) {
        queueDrawBg();
        return;
      }

      queueDrawBg();

      var rx = dx * r / d;
      var ry = dy * r / d;

      if (dy > 0) {
        theta = Math.PI + Math.abs(theta - Math.PI);
      }

      var dtheta = 2 * Math.PI / commands.length;
      var theta1 = Math.PI / 2;
      var theta2 = theta1 + dtheta;

      for (var i = 0; i < commands.length; i++) {
        var command = commands[i];

        var inThisCommand = theta1 <= theta && theta <= theta2 || theta1 <= theta + 2 * Math.PI && theta + 2 * Math.PI <= theta2;

        if (command.disabled === true || command.enabled === false) {
          inThisCommand = false;
        }

        if (inThisCommand) {
          activeCommandI = i;
          break;
        }

        theta1 += dtheta;
        theta2 += dtheta;
      }

      queueDrawCommands(rx, ry, theta);
    }).on('tapdrag', dragHandler).on('cxttapend tapend tap', function () {
      parent.style.display = 'none';

      if (activeCommandI !== undefined) {
        var select = commands[activeCommandI].select;

        if (select) {
          select.apply(target, [target, gestureStartEvent]);
          activeCommandI = undefined;
        }
      }

      inGesture = false;

      restoreGestures();
    });
  }

  function removeEventListeners() {
    var handlers = data.handlers;

    for (var i = 0; i < handlers.length; i++) {
      var h = handlers[i];

      if (h.selector === 'core') {
        cy.off(h.events, h.fn);
      } else {
        cy.off(h.events, h.selector, h.fn);
      }
    }

    window.removeEventListener('resize', updatePixelRatio);
  }

  function destroyInstance() {
    redrawing = false;

    removeEventListeners();

    wrapper.remove();
  }

  addEventListeners();

  return {
    destroy: function destroy() {
      destroyInstance();
    }
  };
};

module.exports = cxtmenu;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Simple, internal Object.assign() polyfill for options objects etc.

module.exports = Object.assign != null ? Object.assign.bind(Object) : function (tgt) {
  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    srcs[_key - 1] = arguments[_key];
  }

  srcs.filter(function (src) {
    return src != null;
  }).forEach(function (src) {
    Object.keys(src).forEach(function (k) {
      return tgt[k] = src[k];
    });
  });

  return tgt;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = {
  menuRadius: 100, // the radius of the circular menu in pixels
  selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
  commands: [// an array of commands to list in the menu or a function that returns the array
    /*
    { // example command
      fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
      content: 'a command name' // html/text content to be displayed in the menu
      contentStyle: {}, // css key:value pairs to set the command's css in js if you want
      select: function(ele){ // a function to execute when the command is selected
        console.log( ele.id() ) // `ele` holds the reference to the active element
      },
      enabled: true // whether the command is selectable
    }
    */
  ], // function( ele ){ return [ /*...*/ ] }, // example function for commands
  fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
  activeFillColor: 'rgba(1, 105, 217, 0.75)', // the colour used to indicate the selected command
  activePadding: 20, // additional size in pixels for the active command
  indicatorSize: 24, // the size in pixels of the pointer to the active command
  separatorWidth: 3, // the empty spacing in pixels between successive commands
  spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
  minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight
  maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight
  openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
  itemColor: 'white', // the colour of text in the command's content
  itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
  zIndex: 9999, // the z-index of the ui div
  atMouse: false // draw menu at mouse position
};

module.exports = defaults;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var removeEles = function removeEles(query) {
  var ancestor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

  var els = ancestor.querySelectorAll(query);

  for (var i = 0; i < els.length; i++) {
    var el = els[i];

    el.parentNode.removeChild(el);
  }
};

var setStyles = function setStyles(el, style) {
  var props = Object.keys(style);

  for (var i = 0, l = props.length; i < l; i++) {
    el.style[props[i]] = style[props[i]];
  }
};

var createElement = function createElement(options) {
  options = options || {};

  var el = document.createElement(options.tag || 'div');

  el.className = options.class || '';

  if (options.style) {
    setStyles(el, options.style);
  }

  return el;
};

var getPixelRatio = function getPixelRatio() {
  return window.devicePixelRatio || 1;
};

var getOffset = function getOffset(el) {
  var offset = el.getBoundingClientRect();

  return {
    left: offset.left + document.body.scrollLeft + parseFloat(getComputedStyle(document.body)['padding-left']) + parseFloat(getComputedStyle(document.body)['border-left-width']),
    top: offset.top + document.body.scrollTop + parseFloat(getComputedStyle(document.body)['padding-top']) + parseFloat(getComputedStyle(document.body)['border-top-width'])
  };
};

module.exports = { removeEles: removeEles, setStyles: setStyles, createElement: createElement, getPixelRatio: getPixelRatio, getOffset: getOffset };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cxtmenu = __webpack_require__(0);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  cytoscape('core', 'cxtmenu', cxtmenu); // register with cytoscape.js
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape);
}

module.exports = register;

/***/ })
/******/ ]);
});
//#
// sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmZjkxMjZkY2ZhMjY3YWIwZGU1ZCIsIndlYnBhY2s6Ly8vLi9zcmMvY3h0bWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXNzaWduLmpzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZG9tLXV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImRlZmF1bHRzIiwicmVxdWlyZSIsImFzc2lnbiIsInJlbW92ZUVsZXMiLCJzZXRTdHlsZXMiLCJjcmVhdGVFbGVtZW50IiwiZ2V0UGl4ZWxSYXRpbyIsImdldE9mZnNldCIsImN4dG1lbnUiLCJwYXJhbXMiLCJvcHRpb25zIiwiY3kiLCJjb250YWluZXIiLCJ0YXJnZXQiLCJkYXRhIiwiaGFuZGxlcnMiLCJjbGFzcyIsIndyYXBwZXIiLCJwYXJlbnQiLCJjYW52YXMiLCJ0YWciLCJjb21tYW5kcyIsImMyZCIsImdldENvbnRleHQiLCJyIiwibWVudVJhZGl1cyIsImNvbnRhaW5lclNpemUiLCJhY3RpdmVQYWRkaW5nIiwiYWN0aXZlQ29tbWFuZEkiLCJvZmZzZXQiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwiYXBwZW5kQ2hpbGQiLCJwb3NpdGlvbiIsInpJbmRleCIsInVzZXJTZWxlY3QiLCJwb2ludGVyRXZlbnRzIiwiZm9yRWFjaCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJlIiwicHJldmVudERlZmF1bHQiLCJkaXNwbGF5Iiwid2lkdGgiLCJoZWlnaHQiLCJtYXJnaW5MZWZ0IiwibWFyZ2luVG9wIiwiY3JlYXRlTWVudUl0ZW1zIiwiZHRoZXRhIiwiTWF0aCIsIlBJIiwibGVuZ3RoIiwidGhldGExIiwidGhldGEyIiwiaSIsImNvbW1hbmQiLCJtaWR0aGV0YSIsInJ4MSIsImNvcyIsInJ5MSIsInNpbiIsIml0ZW0iLCJjb2xvciIsIml0ZW1Db2xvciIsImN1cnNvciIsIml0ZW1UZXh0U2hhZG93Q29sb3IiLCJsZWZ0IiwidG9wIiwiY29udGVudCIsIkhUTUxFbGVtZW50IiwiaW5uZXJIVE1MIiwiY29udGVudFN0eWxlIiwiZGlzYWJsZWQiLCJlbmFibGVkIiwic2V0QXR0cmlidXRlIiwicXVldWVEcmF3QmciLCJyc3BvdGxpZ2h0IiwicmVkcmF3UXVldWUiLCJkcmF3QmciLCJ1bmRlZmluZWQiLCJycyIsImdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiIsImNsZWFyUmVjdCIsImZpbGxTdHlsZSIsImZpbGxDb2xvciIsImluZGV4IiwiYmVnaW5QYXRoIiwibW92ZVRvIiwiYXJjIiwiY2xvc2VQYXRoIiwiZmlsbCIsInN0cm9rZVN0eWxlIiwibGluZVdpZHRoIiwic2VwYXJhdG9yV2lkdGgiLCJsaW5lVG8iLCJzdHJva2UiLCJzcG90bGlnaHRQYWRkaW5nIiwicXVldWVEcmF3Q29tbWFuZHMiLCJyeCIsInJ5IiwidGhldGEiLCJkcmF3Q29tbWFuZHMiLCJhY3RpdmVGaWxsQ29sb3IiLCJ0eCIsImluZGljYXRvclNpemUiLCJ0eSIsInJvdCIsInRyYW5zbGF0ZSIsInJvdGF0ZSIsImZpbGxSZWN0IiwidXBkYXRlUGl4ZWxSYXRpbyIsInB4ciIsInciLCJoIiwic3R5bGUiLCJzZXRUcmFuc2Zvcm0iLCJzY2FsZSIsInJlZHJhd2luZyIsInJhZiIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2V0VGltZW91dCIsImZuIiwicmVkcmF3IiwiYXBwbHkiLCJjdHJ4IiwiY3RyeSIsImJpbmRpbmdzIiwib24iLCJldmVudHMiLCJzZWxlY3RvciIsIl9mbiIsImN5VGFyZ2V0IiwicHVzaCIsImFkZEV2ZW50TGlzdGVuZXJzIiwiZ3JhYmJhYmxlIiwiaW5HZXN0dXJlIiwiZHJhZ0hhbmRsZXIiLCJ6b29tRW5hYmxlZCIsInBhbkVuYWJsZWQiLCJib3hFbmFibGVkIiwiZ2VzdHVyZVN0YXJ0RXZlbnQiLCJyZXN0b3JlWm9vbSIsInVzZXJab29taW5nRW5hYmxlZCIsInJlc3RvcmVHcmFiIiwiZ3JhYmlmeSIsInJlc3RvcmVQYW4iLCJ1c2VyUGFubmluZ0VuYWJsZWQiLCJyZXN0b3JlQm94U2VsbiIsImJveFNlbGVjdGlvbkVuYWJsZWQiLCJyZXN0b3JlR2VzdHVyZXMiLCJvcGVuTWVudUV2ZW50cyIsImVsZSIsImlzQ3kiLCJyZXMiLCJ0aGVuIiwiX2NvbW1hbmRzIiwib3Blbk1lbnUiLCJ1bmdyYWJpZnkiLCJycCIsInJ3IiwicmgiLCJpc05vZGUiLCJpc1BhcmVudCIsImF0TW91c2UiLCJyZW5kZXJlZFBvc2l0aW9uIiwicmVuZGVyZWRXaWR0aCIsInJlbmRlcmVkSGVpZ2h0IiwiY3lSZW5kZXJlZFBvc2l0aW9uIiwieCIsInkiLCJtYXgiLCJtaW5TcG90bGlnaHRSYWRpdXMiLCJtaW4iLCJtYXhTcG90bGlnaHRSYWRpdXMiLCJvcmlnRSIsIm9yaWdpbmFsRXZlbnQiLCJpc1RvdWNoIiwidG91Y2hlcyIsInBhZ2VYIiwic2Nyb2xsWCIsInBhZ2VZIiwic2Nyb2xsWSIsImR4IiwiZHkiLCJkIiwic3FydCIsImNvc1RoZXRhIiwiYWNvcyIsImFicyIsImluVGhpc0NvbW1hbmQiLCJzZWxlY3QiLCJyZW1vdmVFdmVudExpc3RlbmVycyIsIm9mZiIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkZXN0cm95SW5zdGFuY2UiLCJyZW1vdmUiLCJkZXN0cm95IiwibW9kdWxlIiwiZXhwb3J0cyIsIk9iamVjdCIsImJpbmQiLCJ0Z3QiLCJzcmNzIiwiZmlsdGVyIiwic3JjIiwia2V5cyIsImsiLCJxdWVyeSIsImFuY2VzdG9yIiwiZG9jdW1lbnQiLCJlbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWwiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJwcm9wcyIsImwiLCJjbGFzc05hbWUiLCJkZXZpY2VQaXhlbFJhdGlvIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm9keSIsInNjcm9sbExlZnQiLCJwYXJzZUZsb2F0IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInNjcm9sbFRvcCIsInJlZ2lzdGVyIiwiY3l0b3NjYXBlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQSwyQ0FBMkMsY0FBYzs7UUFFekQ7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxLQUFLO1FBQ0w7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7UUFFQTtRQUNBOzs7Ozs7Ozs7O0FDaEVBLElBQU1BLFdBQVdDLG1CQUFPQSxDQUFDLENBQVIsQ0FBakI7QUFDQSxJQUFNQyxTQUFTRCxtQkFBT0EsQ0FBQyxDQUFSLENBQWY7O2VBQzJFQSxtQkFBT0EsQ0FBQyxDQUFSLEM7SUFBbkVFLFUsWUFBQUEsVTtJQUFZQyxTLFlBQUFBLFM7SUFBV0MsYSxZQUFBQSxhO0lBQWVDLGEsWUFBQUEsYTtJQUFlQyxTLFlBQUFBLFM7O0FBRTdELElBQUlDLFVBQVUsU0FBVkEsT0FBVSxDQUFTQyxNQUFULEVBQWdCO0FBQzVCLE1BQUlDLFVBQVVSLE9BQU8sRUFBUCxFQUFXRixRQUFYLEVBQXFCUyxNQUFyQixDQUFkO0FBQ0EsTUFBSUUsS0FBSyxJQUFUO0FBQ0EsTUFBSUMs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QUExQixFQUFnQyxjQUFoQyxDQUFYLENBREEsR0FFQUUsV0FBV0MsaUJBQWlCZCxTQUFTVyxJQUExQixFQUFnQyxtQkFBaEMsQ0FBWCxDQUhEO0FBSUw3SixTQUFLdEMsT0FBT3NDLEdBQVAsR0FBYWtKLFNBQVNXLElBQVQsQ0FBY0ksU0FBM0IsR0FDQUYsV0FBV0MsaUJBQWlCZCxTQUFTVyxJQUExQixFQUFnQyxhQUFoQyxDQUFYLENBREEsR0FFQUUsV0FBV0MsaUJBQWlCZCxTQUFTVyxJQUExQixFQUFnQyxrQkFBaEMsQ0FBWDtBQU5BLEdBQVA7QUFRRCxDQVhEOztBQWFBdkIsT0FBT0MsT0FBUCxHQUFpQixFQUFFdk0sc0JBQUYsRUFBY0Msb0JBQWQsRUFBeUJDLDRCQUF6QixFQUF3Q0MsNEJBQXhDLEVBQXVEQyxvQkFBdkQsRUFBakIsQzs7Ozs7Ozs7O0FDakRBLElBQU1DLFVBQVVQLG1CQUFPQSxDQUFDLENBQVIsQ0FBaEI7O0FBRUE7QUFDQSxJQUFJb08sV0FBVyxTQUFYQSxRQUFXLENBQVVDLFNBQVYsRUFBcUI7QUFDbEMsTUFBSSxDQUFDQSxTQUFMLEVBQWdCO0FBQUU7QUFBUyxHQURPLENBQ047O0FBRTVCQSxZQUFXLE1BQVgsRUFBbUIsU0FBbkIsRUFBOEI5TixPQUE5QixFQUhrQyxDQUdPO0FBQzFDLENBSkQ7O0FBTUEsSUFBSSxPQUFPOE4sU0FBUCxLQUFxQixXQUF6QixFQUFzQztBQUFFO0FBQ3RDRCxXQUFVQyxTQUFWO0FBQ0Q7O0FBRUQ3QixPQUFPQyxPQUFQLEdBQWlCMkIsUUFBakIsQyIsImZpbGUiOiJjeXRvc2NhcGUtY3h0bWVudS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImN5dG9zY2FwZUN4dG1lbnVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiY3l0b3NjYXBlQ3h0bWVudVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZmOTEyNmRjZmEyNjdhYjBkZTVkIiwiY29uc3QgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5jb25zdCBhc3NpZ24gPSByZXF1aXJlKCcuL2Fzc2lnbicpO1xuY29uc3QgeyByZW1vdmVFbGVzLCBzZXRTdHlsZXMsIGNyZWF0ZUVsZW1lbnQsIGdldFBpeGVsUmF0aW8sIGdldE9mZnNldCB9ID0gcmVxdWlyZSgnLi9kb20tdXRpbCcpO1xuXG5sZXQgY3h0bWVudSA9IGZ1bmN0aW9uKHBhcmFtcyl7XG4gIGxldCBvcHRpb25zID0gYXNzaWduKHt9LCBkZWZhdWx0cywgcGFyYW1zKTtcbiAgbGV0IGN5ID0gdGhpcztcbiAgbGV0IGNvbnRhaW5lciA9IGN5LmNvbnRhaW5lcigpO1xuICBsZXQgdGFyZ2V0O1xuXG4gIGxldCBkYXRhID0ge1xuICAgIG9wdGlvbnM6IG9wdGlvbnMsXG4gICAgaGFuZGxlcnM6IFtdLFxuICAgIGNvbnRhaW5lcjogY3JlYXRlRWxlbWVudCh7Y2xhc3M6ICdjeHRtZW51J30pXG4gIH07XG5cbiAgbGV0IHdyYXBwZXIgPSBkYXRhLmNvbnRhaW5lcjtcbiAgbGV0IHBhcmVudCA9IGNyZWF0ZUVsZW1lbnQoKTtcbiAgbGV0IGNhbnZhcyA9IGNyZWF0ZUVsZW1lbnQoe3RhZzogJ2NhbnZhcyd9KTtcbiAgbGV0IGNvbW1hbmRzID0gW107XG4gIGxldCBjMmQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgbGV0IHIgPSBvcHRpb25zLm1lbnVSYWRpdXM7XG4gIGxldCBjb250YWluZXJTaXplID0gKHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcpKjI7XG4gIGxldCBhY3RpdmVDb21tYW5kSTtcbiAgbGV0IG9mZnNldDtcblxuICBjb250YWluZXIuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIGNvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgd3JhcHBlci5hcHBlbmRDaGlsZChwYXJlbnQpO1xuICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuICBzZXRTdHlsZXMod3JhcHBlciwge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHpJbmRleDogb3B0aW9ucy56SW5kZXgsXG4gICAgdXNlclNlbGVjdDogJ25vbmUnLFxuICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyAvLyBwcmV2ZW50IGV2ZW50cyBvbiBtZW51IGluIG1vZGVybiBicm93c2Vyc1xuICB9KTtcblxuICAvLyBwcmV2ZW50IGV2ZW50cyBvbiBtZW51IGluIGxlZ2FjeSBicm93c2Vyc1xuICBbJ21vdXNlZG93bicsICdtb3VzZW1vdmUnLCAnbW91c2V1cCcsICdjb250ZXh0bWVudSddLmZvckVhY2goZXZ0ID0+IHtcbiAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoZXZ0LCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9KTtcblxuICBzZXRTdHlsZXMocGFyZW50LCB7XG4gICAgZGlzcGxheTogJ25vbmUnLFxuICAgIHdpZHRoOiBjb250YWluZXJTaXplICsgJ3B4JyxcbiAgICBoZWlnaHQ6IGNvbnRhaW5lclNpemUgKyAncHgnLFxuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHpJbmRleDogMSxcbiAgICBtYXJnaW5MZWZ0OiAtIG9wdGlvbnMuYWN0aXZlUGFkZGluZyArICdweCcsXG4gICAgbWFyZ2luVG9wOiAtIG9wdGlvbnMuYWN0aXZlUGFkZGluZyArICdweCcsXG4gICAgdXNlclNlbGVjdDogJ25vbmUnXG4gIH0pO1xuXG4gIGNhbnZhcy53aWR0aCA9IGNvbnRhaW5lclNpemU7XG4gIGNhbnZhcy5oZWlnaHQgPSBjb250YWluZXJTaXplO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZU1lbnVJdGVtcygpIHtcbiAgICByZW1vdmVFbGVzKCcuY3h0bWVudS1pdGVtJywgcGFyZW50KTtcbiAgICBsZXQgZHRoZXRhID0gMiAqIE1hdGguUEkgLyAoY29tbWFuZHMubGVuZ3RoKTtcbiAgICBsZXQgdGhldGExID0gTWF0aC5QSSAvIDI7XG4gICAgbGV0IHRoZXRhMiA9IHRoZXRhMSArIGR0aGV0YTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29tbWFuZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBjb21tYW5kID0gY29tbWFuZHNbaV07XG5cbiAgICAgIGxldCBtaWR0aGV0YSA9ICh0aGV0YTEgKyB0aGV0YTIpIC8gMjtcbiAgICAgIGxldCByeDEgPSAwLjY2ICogciAqIE1hdGguY29zKG1pZHRoZXRhKTtcbiAgICAgIGxldCByeTEgPSAwLjY2ICogciAqIE1hdGguc2luKG1pZHRoZXRhKTtcblxuICAgICAgbGV0IGl0ZW0gPSBjcmVhdGVFbGVtZW50KHtjbGFzczogJ2N4dG1lbnUtaXRlbSd9KTtcbiAgICAgIHNldFN0eWxlcyhpdGVtLCB7XG4gICAgICAgIGNvbG9yOiBvcHRpb25zLml0ZW1Db2xvcixcbiAgICAgICAgY3Vyc29yOiAnZGVmYXVsdCcsXG4gICAgICAgIGRpc3BsYXk6ICd0YWJsZScsXG4gICAgICAgICd0ZXh0LWFsaWduJzogJ2NlbnRlcicsXG4gICAgICAgIC8vYmFja2dyb3VuZDogJ3JlZCcsXG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAndGV4dC1zaGFkb3cnOiAnLTFweCAtMXB4IDJweCAnICsgb3B0aW9ucy5pdGVtVGV4dFNoYWRvd0NvbG9yICsgJywgMXB4IC0xcHggMnB4ICcgKyBvcHRpb25zLml0ZW1UZXh0U2hhZG93Q29sb3IgKyAnLCAtMXB4IDFweCAycHggJyArIG9wdGlvbnMuaXRlbVRleHRTaGFkb3dDb2xvciArICcsIDFweCAxcHggMXB4ICcgKyBvcHRpb25zLml0ZW1UZXh0U2hhZG93Q29sb3IsXG4gICAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgICB0b3A6ICc1MCUnLFxuICAgICAgICAnbWluLWhlaWdodCc6IChyICogMC42NikgKyAncHgnLFxuICAgICAgICB3aWR0aDogKHIgKiAwLjY2KSArICdweCcsXG4gICAgICAgIGhlaWdodDogKHIgKiAwLjY2KSArICdweCcsXG4gICAgICAgIG1hcmdpbkxlZnQ6IChyeDEgLSByICogMC4zMykgKyAncHgnLFxuICAgICAgICBtYXJnaW5Ub3A6ICgtcnkxIC0gciAqIDAuMzMpICsgJ3B4J1xuICAgICAgfSk7XG5cbiAgICAgIGxldCBjb250ZW50ID0gY3JlYXRlRWxlbWVudCh7Y2xhc3M6ICdjeHRtZW51LWNvbnRlbnQnfSk7XG5cbiAgICAgIGlmKCBjb21tYW5kLmNvbnRlbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCApe1xuICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKCBjb21tYW5kLmNvbnRlbnQgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gY29tbWFuZC5jb250ZW50O1xuICAgICAgfVxuXG4gICAgICBzZXRTdHlsZXMoY29udGVudCwge1xuICAgICAgICAnd2lkdGgnOiAociAqIDAuNjYpICsgJ3B4JyxcbiAgICAgICAgJ2hlaWdodCc6IChyICogMC42NikgKyAncHgnLFxuICAgICAgICAndmVydGljYWwtYWxpZ24nOiAnbWlkZGxlJyxcbiAgICAgICAgJ2Rpc3BsYXknOiAndGFibGUtY2VsbCdcbiAgICAgIH0pO1xuXG4gICAgICBzZXRTdHlsZXMoY29udGVudCwgY29tbWFuZC5jb250ZW50U3R5bGUgfHwge30pO1xuXG4gICAgICBpZiAoY29tbWFuZC5kaXNhYmxlZCA9PT0gdHJ1ZSB8fCBjb21tYW5kLmVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnRlbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjeHRtZW51LWNvbnRlbnQgY3h0bWVudS1kaXNhYmxlZCcpO1xuICAgICAgfVxuXG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgICBpdGVtLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuXG4gICAgICB0aGV0YTEgKz0gZHRoZXRhO1xuICAgICAgdGhldGEyICs9IGR0aGV0YTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBxdWV1ZURyYXdCZyggcnNwb3RsaWdodCApe1xuICAgIHJlZHJhd1F1ZXVlLmRyYXdCZyA9IFsgcnNwb3RsaWdodCBdO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0JnKCByc3BvdGxpZ2h0ICl7XG4gICAgcnNwb3RsaWdodCA9IHJzcG90bGlnaHQgIT09IHVuZGVmaW5lZCA/IHJzcG90bGlnaHQgOiBycztcblxuICAgIGMyZC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInO1xuXG4gICAgYzJkLmNsZWFyUmVjdCgwLCAwLCBjb250YWluZXJTaXplLCBjb250YWluZXJTaXplKTtcblxuICAgIC8vIGRyYXcgYmFja2dyb3VuZCBpdGVtc1xuICAgIGMyZC5maWxsU3R5bGUgPSBvcHRpb25zLmZpbGxDb2xvcjtcbiAgICBsZXQgZHRoZXRhID0gMipNYXRoLlBJLyhjb21tYW5kcy5sZW5ndGgpO1xuICAgIGxldCB0aGV0YTEgPSBNYXRoLlBJLzI7XG4gICAgbGV0IHRoZXRhMiA9IHRoZXRhMSArIGR0aGV0YTtcblxuICAgIGZvciggbGV0IGluZGV4ID0gMDsgaW5kZXggPCBjb21tYW5kcy5sZW5ndGg7IGluZGV4KysgKXtcbiAgICAgIGxldCBjb21tYW5kID0gY29tbWFuZHNbaW5kZXhdO1xuXG4gICAgICBpZiggY29tbWFuZC5maWxsQ29sb3IgKXtcbiAgICAgICAgYzJkLmZpbGxTdHlsZSA9IGNvbW1hbmQuZmlsbENvbG9yO1xuICAgICAgfVxuICAgICAgYzJkLmJlZ2luUGF0aCgpO1xuICAgICAgYzJkLm1vdmVUbyhyICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCByICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nKTtcbiAgICAgIGMyZC5hcmMociArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgciwgMipNYXRoLlBJIC0gdGhldGExLCAyKk1hdGguUEkgLSB0aGV0YTIsIHRydWUpO1xuICAgICAgYzJkLmNsb3NlUGF0aCgpO1xuICAgICAgYzJkLmZpbGwoKTtcblxuICAgICAgdGhldGExICs9IGR0aGV0YTtcbiAgICAgIHRoZXRhMiArPSBkdGhldGE7XG5cbiAgICAgIGMyZC5maWxsU3R5bGUgPSBvcHRpb25zLmZpbGxDb2xvcjtcbiAgICB9XG5cbiAgICAvLyBkcmF3IHNlcGFyYXRvcnMgYmV0d2VlbiBpdGVtc1xuICAgIGMyZC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3V0JztcbiAgICBjMmQuc3Ryb2tlU3R5bGUgPSAnd2hpdGUnO1xuICAgIGMyZC5saW5lV2lkdGggPSBvcHRpb25zLnNlcGFyYXRvcldpZHRoO1xuICAgIHRoZXRhMSA9IE1hdGguUEkvMjtcbiAgICB0aGV0YTIgPSB0aGV0YTEgKyBkdGhldGE7XG5cbiAgICBmb3IoIGxldCBpID0gMDsgaSA8IGNvbW1hbmRzLmxlbmd0aDsgaSsrICl7XG4gICAgICBsZXQgcngxID0gciAqIE1hdGguY29zKHRoZXRhMSk7XG4gICAgICBsZXQgcnkxID0gciAqIE1hdGguc2luKHRoZXRhMSk7XG4gICAgICBjMmQuYmVnaW5QYXRoKCk7XG4gICAgICBjMmQubW92ZVRvKHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcpO1xuICAgICAgYzJkLmxpbmVUbyhyICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nICsgcngxLCByICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nIC0gcnkxKTtcbiAgICAgIGMyZC5jbG9zZVBhdGgoKTtcbiAgICAgIGMyZC5zdHJva2UoKTtcblxuICAgICAgdGhldGExICs9IGR0aGV0YTtcbiAgICAgIHRoZXRhMiArPSBkdGhldGE7XG4gICAgfVxuXG5cbiAgICBjMmQuZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICBjMmQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW91dCc7XG4gICAgYzJkLmJlZ2luUGF0aCgpO1xuICAgIGMyZC5hcmMociArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgcnNwb3RsaWdodCArIG9wdGlvbnMuc3BvdGxpZ2h0UGFkZGluZywgMCwgTWF0aC5QSSoyLCB0cnVlKTtcbiAgICBjMmQuY2xvc2VQYXRoKCk7XG4gICAgYzJkLmZpbGwoKTtcblxuICAgIGMyZC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInO1xuICB9XG5cbiAgZnVuY3Rpb24gcXVldWVEcmF3Q29tbWFuZHMoIHJ4LCByeSwgdGhldGEgKXtcbiAgICByZWRyYXdRdWV1ZS5kcmF3Q29tbWFuZHMgPSBbIHJ4LCByeSwgdGhldGEgXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdDb21tYW5kcyggcngsIHJ5LCB0aGV0YSApe1xuICAgIGxldCBkdGhldGEgPSAyKk1hdGguUEkvKGNvbW1hbmRzLmxlbmd0aCk7XG4gICAgbGV0IHRoZXRhMSA9IE1hdGguUEkvMjtcbiAgICBsZXQgdGhldGEyID0gdGhldGExICsgZHRoZXRhO1xuXG4gICAgdGhldGExICs9IGR0aGV0YSAqIGFjdGl2ZUNvbW1hbmRJO1xuICAgIHRoZXRhMiArPSBkdGhldGEgKiBhY3RpdmVDb21tYW5kSTtcblxuICAgIGMyZC5maWxsU3R5bGUgPSBvcHRpb25zLmFjdGl2ZUZpbGxDb2xvcjtcbiAgICBjMmQuc3Ryb2tlU3R5bGUgPSAnYmxhY2snO1xuICAgIGMyZC5saW5lV2lkdGggPSAxO1xuICAgIGMyZC5iZWdpblBhdGgoKTtcbiAgICBjMmQubW92ZVRvKHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcsIHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcpO1xuICAgIGMyZC5hcmMociArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZywgMipNYXRoLlBJIC0gdGhldGExLCAyKk1hdGguUEkgLSB0aGV0YTIsIHRydWUpO1xuICAgIGMyZC5jbG9zZVBhdGgoKTtcbiAgICBjMmQuZmlsbCgpO1xuXG4gICAgYzJkLmZpbGxTdHlsZSA9ICd3aGl0ZSc7XG4gICAgYzJkLmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1vdXQnO1xuXG4gICAgbGV0IHR4ID0gciArIG9wdGlvbnMuYWN0aXZlUGFkZGluZyArIHJ4L3IqKHJzICsgb3B0aW9ucy5zcG90bGlnaHRQYWRkaW5nIC0gb3B0aW9ucy5pbmRpY2F0b3JTaXplLzQpO1xuICAgIGxldCB0eSA9IHIgKyBvcHRpb25zLmFjdGl2ZVBhZGRpbmcgKyByeS9yKihycyArIG9wdGlvbnMuc3BvdGxpZ2h0UGFkZGluZyAtIG9wdGlvbnMuaW5kaWNhdG9yU2l6ZS80KTtcbiAgICBsZXQgcm90ID0gTWF0aC5QSS80IC0gdGhldGE7XG5cbiAgICBjMmQudHJhbnNsYXRlKCB0eCwgdHkgKTtcbiAgICBjMmQucm90YXRlKCByb3QgKTtcblxuICAgIC8vIGNsZWFyIHRoZSBpbmRpY2F0b3JcbiAgICBjMmQuYmVnaW5QYXRoKCk7XG4gICAgYzJkLmZpbGxSZWN0KC1vcHRpb25zLmluZGljYXRvclNpemUvMiwgLW9wdGlvbnMuaW5kaWNhdG9yU2l6ZS8yLCBvcHRpb25zLmluZGljYXRvclNpemUsIG9wdGlvbnMuaW5kaWNhdG9yU2l6ZSk7XG4gICAgYzJkLmNsb3NlUGF0aCgpO1xuICAgIGMyZC5maWxsKCk7XG5cbiAgICBjMmQucm90YXRlKCAtcm90ICk7XG4gICAgYzJkLnRyYW5zbGF0ZSggLXR4LCAtdHkgKTtcblxuICAgIC8vIGMyZC5zZXRUcmFuc2Zvcm0oIDEsIDAsIDAsIDEsIDAsIDAgKTtcblxuICAgIC8vIGNsZWFyIHRoZSBzcG90bGlnaHRcbiAgICBjMmQuYmVnaW5QYXRoKCk7XG4gICAgYzJkLmFyYyhyICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCByICsgb3B0aW9ucy5hY3RpdmVQYWRkaW5nLCBycyArIG9wdGlvbnMuc3BvdGxpZ2h0UGFkZGluZywgMCwgTWF0aC5QSSoyLCB0cnVlKTtcbiAgICBjMmQuY2xvc2VQYXRoKCk7XG4gICAgYzJkLmZpbGwoKTtcblxuICAgIGMyZC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUGl4ZWxSYXRpbygpe1xuICAgIGxldCBweHIgPSBnZXRQaXhlbFJhdGlvKCk7XG4gICAgbGV0IHcgPSBjb250YWluZXJTaXplO1xuICAgIGxldCBoID0gY29udGFpbmVyU2l6ZTtcblxuICAgIGNhbnZhcy53aWR0aCA9IHcgKiBweHI7XG4gICAgY2FudmFzLmhlaWdodCA9IGggKiBweHI7XG5cbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSB3ICsgJ3B4JztcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gaCArICdweCc7XG5cbiAgICBjMmQuc2V0VHJhbnNmb3JtKCAxLCAwLCAwLCAxLCAwLCAwICk7XG4gICAgYzJkLnNjYWxlKCBweHIsIHB4ciApO1xuICB9XG5cbiAgbGV0IHJlZHJhd2luZyA9IHRydWU7XG4gIGxldCByZWRyYXdRdWV1ZSA9IHt9O1xuXG4gIGxldCByYWYgPSAoXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgfHwgKGZuID0+IHNldFRpbWVvdXQoZm4sIDE2KSlcbiAgKTtcblxuICBsZXQgcmVkcmF3ID0gZnVuY3Rpb24oKXtcbiAgICBpZiggcmVkcmF3UXVldWUuZHJhd0JnICl7XG4gICAgICBkcmF3QmcuYXBwbHkoIG51bGwsIHJlZHJhd1F1ZXVlLmRyYXdCZyApO1xuICAgIH1cblxuICAgIGlmKCByZWRyYXdRdWV1ZS5kcmF3Q29tbWFuZHMgKXtcbiAgICAgIGRyYXdDb21tYW5kcy5hcHBseSggbnVsbCwgcmVkcmF3UXVldWUuZHJhd0NvbW1hbmRzICk7XG4gICAgfVxuXG4gICAgcmVkcmF3UXVldWUgPSB7fTtcblxuICAgIGlmKCByZWRyYXdpbmcgKXtcbiAgICAgIHJhZiggcmVkcmF3ICk7XG4gICAgfVxuICB9O1xuXG4gIC8vIGtpY2sgb2ZmXG4gIHVwZGF0ZVBpeGVsUmF0aW8oKTtcbiAgcmVkcmF3KCk7XG5cbiAgbGV0IGN0cngsIGN0cnksIHJzO1xuXG4gIGxldCBiaW5kaW5ncyA9IHtcbiAgICBvbjogZnVuY3Rpb24oZXZlbnRzLCBzZWxlY3RvciwgZm4pe1xuXG4gICAgICBsZXQgX2ZuID0gZm47XG4gICAgICBpZiggc2VsZWN0b3IgPT09ICdjb3JlJyl7XG4gICAgICAgIF9mbiA9IGZ1bmN0aW9uKCBlICl7XG4gICAgICAgICAgaWYoIGUuY3lUYXJnZXQgPT09IGN5IHx8IGUudGFyZ2V0ID09PSBjeSApeyAvLyBvbmx5IGlmIGV2ZW50IHRhcmdldCBpcyBkaXJlY3RseSBjb3JlXG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkoIHRoaXMsIFsgZSBdICk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBkYXRhLmhhbmRsZXJzLnB1c2goe1xuICAgICAgICBldmVudHM6IGV2ZW50cyxcbiAgICAgICAgc2VsZWN0b3I6IHNlbGVjdG9yLFxuICAgICAgICBmbjogX2ZuXG4gICAgICB9KTtcblxuICAgICAgaWYoIHNlbGVjdG9yID09PSAnY29yZScgKXtcbiAgICAgICAgY3kub24oZXZlbnRzLCBfZm4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3kub24oZXZlbnRzLCBzZWxlY3RvciwgX2ZuKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXJzKCl7XG4gICAgbGV0IGdyYWJiYWJsZTtcbiAgICBsZXQgaW5HZXN0dXJlID0gZmFsc2U7XG4gICAgbGV0IGRyYWdIYW5kbGVyO1xuICAgIGxldCB6b29tRW5hYmxlZDtcbiAgICBsZXQgcGFuRW5hYmxlZDtcbiAgICBsZXQgYm94RW5hYmxlZDtcbiAgICBsZXQgZ2VzdHVyZVN0YXJ0RXZlbnQ7XG5cbiAgICBsZXQgcmVzdG9yZVpvb20gPSBmdW5jdGlvbigpe1xuICAgICAgaWYoIHpvb21FbmFibGVkICl7XG4gICAgICAgIGN5LnVzZXJab29taW5nRW5hYmxlZCggdHJ1ZSApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgcmVzdG9yZUdyYWIgPSBmdW5jdGlvbigpe1xuICAgICAgaWYoIGdyYWJiYWJsZSApe1xuICAgICAgICB0YXJnZXQuZ3JhYmlmeSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgcmVzdG9yZVBhbiA9IGZ1bmN0aW9uKCl7XG4gICAgICBpZiggcGFuRW5hYmxlZCApe1xuICAgICAgICBjeS51c2VyUGFubmluZ0VuYWJsZWQoIHRydWUgKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGV0IHJlc3RvcmVCb3hTZWxuID0gZnVuY3Rpb24oKXtcbiAgICAgIGlmKCBib3hFbmFibGVkICl7XG4gICAgICAgIGN5LmJveFNlbGVjdGlvbkVuYWJsZWQoIHRydWUgKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGV0IHJlc3RvcmVHZXN0dXJlcyA9IGZ1bmN0aW9uKCl7XG4gICAgICByZXN0b3JlR3JhYigpO1xuICAgICAgcmVzdG9yZVpvb20oKTtcbiAgICAgIHJlc3RvcmVQYW4oKTtcbiAgICAgIHJlc3RvcmVCb3hTZWxuKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVQaXhlbFJhdGlvKTtcblxuICAgIGJpbmRpbmdzXG4gICAgICAub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHVwZGF0ZVBpeGVsUmF0aW8oKTtcbiAgICAgIH0pXG5cbiAgICAgIC5vbihvcHRpb25zLm9wZW5NZW51RXZlbnRzLCBvcHRpb25zLnNlbGVjdG9yLCBmdW5jdGlvbihlKXtcbiAgICAgICAgdGFyZ2V0ID0gdGhpczsgLy8gUmVtZW1iZXIgd2hpY2ggbm9kZSB0aGUgY29udGV4dCBtZW51IGlzIGZvclxuICAgICAgICBsZXQgZWxlID0gdGhpcztcbiAgICAgICAgbGV0IGlzQ3kgPSB0aGlzID09PSBjeTtcblxuICAgICAgICBpZiAoaW5HZXN0dXJlKSB7XG4gICAgICAgICAgcGFyZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgICBpbkdlc3R1cmUgPSBmYWxzZTtcblxuICAgICAgICAgIHJlc3RvcmVHZXN0dXJlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIHR5cGVvZiBvcHRpb25zLmNvbW1hbmRzID09PSAnZnVuY3Rpb24nICl7XG4gICAgICAgICAgY29uc3QgcmVzID0gb3B0aW9ucy5jb21tYW5kcyh0YXJnZXQpO1xuICAgICAgICAgIGlmKCByZXMudGhlbiApe1xuICAgICAgICAgICAgcmVzLnRoZW4oX2NvbW1hbmRzID0+IHtcbiAgICAgICAgICAgICAgY29tbWFuZHMgPSBfY29tbWFuZHM7XG4gICAgICAgICAgICAgIG9wZW5NZW51KCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21tYW5kcyA9IHJlcztcbiAgICAgICAgICAgIG9wZW5NZW51KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbW1hbmRzID0gb3B0aW9ucy5jb21tYW5kcztcbiAgICAgICAgICBvcGVuTWVudSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb3Blbk1lbnUoKXtcbiAgICAgICAgICBpZiggIWNvbW1hbmRzIHx8IGNvbW1hbmRzLmxlbmd0aCA9PT0gMCApeyByZXR1cm47IH1cblxuICAgICAgICAgIHpvb21FbmFibGVkID0gY3kudXNlclpvb21pbmdFbmFibGVkKCk7XG4gICAgICAgICAgY3kudXNlclpvb21pbmdFbmFibGVkKCBmYWxzZSApO1xuXG4gICAgICAgICAgcGFuRW5hYmxlZCA9IGN5LnVzZXJQYW5uaW5nRW5hYmxlZCgpO1xuICAgICAgICAgIGN5LnVzZXJQYW5uaW5nRW5hYmxlZCggZmFsc2UgKTtcblxuICAgICAgICAgIGJveEVuYWJsZWQgPSBjeS5ib3hTZWxlY3Rpb25FbmFibGVkKCk7XG4gICAgICAgICAgY3kuYm94U2VsZWN0aW9uRW5hYmxlZCggZmFsc2UgKTtcblxuICAgICAgICAgIGdyYWJiYWJsZSA9IHRhcmdldC5ncmFiYmFibGUgJiYgIHRhcmdldC5ncmFiYmFibGUoKTtcbiAgICAgICAgICBpZiggZ3JhYmJhYmxlICl7XG4gICAgICAgICAgICB0YXJnZXQudW5ncmFiaWZ5KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHJwLCBydywgcmg7XG4gICAgICAgICAgaWYoICFpc0N5ICYmIGVsZS5pc05vZGUoKSAmJiAhZWxlLmlzUGFyZW50KCkgJiYgIW9wdGlvbnMuYXRNb3VzZSApe1xuICAgICAgICAgICAgcnAgPSBlbGUucmVuZGVyZWRQb3NpdGlvbigpO1xuICAgICAgICAgICAgcncgPSBlbGUucmVuZGVyZWRXaWR0aCgpO1xuICAgICAgICAgICAgcmggPSBlbGUucmVuZGVyZWRIZWlnaHQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcnAgPSBlLnJlbmRlcmVkUG9zaXRpb24gfHwgZS5jeVJlbmRlcmVkUG9zaXRpb247XG4gICAgICAgICAgICBydyA9IDE7XG4gICAgICAgICAgICByaCA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgb2Zmc2V0ID0gZ2V0T2Zmc2V0KGNvbnRhaW5lcik7XG5cbiAgICAgICAgICBjdHJ4ID0gcnAueDtcbiAgICAgICAgICBjdHJ5ID0gcnAueTtcblxuICAgICAgICAgIGNyZWF0ZU1lbnVJdGVtcygpO1xuXG4gICAgICAgICAgc2V0U3R5bGVzKHBhcmVudCwge1xuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgIGxlZnQ6IChycC54IC0gcikgKyAncHgnLFxuICAgICAgICAgICAgdG9wOiAocnAueSAtIHIpICsgJ3B4J1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcnMgPSBNYXRoLm1heChydywgcmgpLzI7XG4gICAgICAgICAgcnMgPSBNYXRoLm1heChycywgb3B0aW9ucy5taW5TcG90bGlnaHRSYWRpdXMpO1xuICAgICAgICAgIHJzID0gTWF0aC5taW4ocnMsIG9wdGlvbnMubWF4U3BvdGxpZ2h0UmFkaXVzKTtcblxuICAgICAgICAgIHF1ZXVlRHJhd0JnKCk7XG5cbiAgICAgICAgICBhY3RpdmVDb21tYW5kSSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgIGluR2VzdHVyZSA9IHRydWU7XG4gICAgICAgICAgZ2VzdHVyZVN0YXJ0RXZlbnQgPSBlO1xuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAub24oJ2N4dGRyYWcgdGFwZHJhZycsIG9wdGlvbnMuc2VsZWN0b3IsIGRyYWdIYW5kbGVyID0gZnVuY3Rpb24oZSl7XG5cbiAgICAgICAgaWYoICFpbkdlc3R1cmUgKXsgcmV0dXJuOyB9XG5cbiAgICAgICAgbGV0IG9yaWdFID0gZS5vcmlnaW5hbEV2ZW50O1xuICAgICAgICBsZXQgaXNUb3VjaCA9IG9yaWdFLnRvdWNoZXMgJiYgb3JpZ0UudG91Y2hlcy5sZW5ndGggPiAwO1xuXG4gICAgICAgIGxldCBwYWdlWCA9IChpc1RvdWNoID8gb3JpZ0UudG91Y2hlc1swXS5wYWdlWCA6IG9yaWdFLnBhZ2VYKSAtIHdpbmRvdy5zY3JvbGxYO1xuICAgICAgICBsZXQgcGFnZVkgPSAoaXNUb3VjaCA/IG9yaWdFLnRvdWNoZXNbMF0ucGFnZVkgOiBvcmlnRS5wYWdlWSkgLSB3aW5kb3cuc2Nyb2xsWTtcblxuICAgICAgICBhY3RpdmVDb21tYW5kSSA9IHVuZGVmaW5lZDtcblxuICAgICAgICBsZXQgZHggPSBwYWdlWCAtIG9mZnNldC5sZWZ0IC0gY3RyeDtcbiAgICAgICAgbGV0IGR5ID0gcGFnZVkgLSBvZmZzZXQudG9wIC0gY3RyeTtcblxuICAgICAgICBpZiggZHggPT09IDAgKXsgZHggPSAwLjAxOyB9XG5cbiAgICAgICAgbGV0IGQgPSBNYXRoLnNxcnQoIGR4KmR4ICsgZHkqZHkgKTtcbiAgICAgICAgbGV0IGNvc1RoZXRhID0gKGR5KmR5IC0gZCpkIC0gZHgqZHgpLygtMiAqIGQgKiBkeCk7XG4gICAgICAgIGxldCB0aGV0YSA9IE1hdGguYWNvcyggY29zVGhldGEgKTtcblxuICAgICAgICBpZiggZCA8IHJzICsgb3B0aW9ucy5zcG90bGlnaHRQYWRkaW5nIHx8IGQgPiBvcHRpb25zLm1lbnVSYWRpdXMpe1xuICAgICAgICAgIHF1ZXVlRHJhd0JnKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcXVldWVEcmF3QmcoKTtcblxuICAgICAgICBsZXQgcnggPSBkeCpyIC8gZDtcbiAgICAgICAgbGV0IHJ5ID0gZHkqciAvIGQ7XG5cbiAgICAgICAgaWYoIGR5ID4gMCApe1xuICAgICAgICAgIHRoZXRhID0gTWF0aC5QSSArIE1hdGguYWJzKHRoZXRhIC0gTWF0aC5QSSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZHRoZXRhID0gMipNYXRoLlBJLyhjb21tYW5kcy5sZW5ndGgpO1xuICAgICAgICBsZXQgdGhldGExID0gTWF0aC5QSS8yO1xuICAgICAgICBsZXQgdGhldGEyID0gdGhldGExICsgZHRoZXRhO1xuXG4gICAgICAgIGZvciggbGV0IGkgPSAwOyBpIDwgY29tbWFuZHMubGVuZ3RoOyBpKysgKXtcbiAgICAgICAgICBsZXQgY29tbWFuZCA9IGNvbW1hbmRzW2ldO1xuXG4gICAgICAgICAgbGV0IGluVGhpc0NvbW1hbmQgPSB0aGV0YTEgPD0gdGhldGEgJiYgdGhldGEgPD0gdGhldGEyXG4gICAgICAgICAgICB8fCB0aGV0YTEgPD0gdGhldGEgKyAyKk1hdGguUEkgJiYgdGhldGEgKyAyKk1hdGguUEkgPD0gdGhldGEyO1xuXG4gICAgICAgICAgaWYoIGNvbW1hbmQuZGlzYWJsZWQgPT09IHRydWUgfHwgY29tbWFuZC5lbmFibGVkID09PSBmYWxzZSApe1xuICAgICAgICAgICAgaW5UaGlzQ29tbWFuZCA9IGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCBpblRoaXNDb21tYW5kICl7XG4gICAgICAgICAgICBhY3RpdmVDb21tYW5kSSA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGV0YTEgKz0gZHRoZXRhO1xuICAgICAgICAgIHRoZXRhMiArPSBkdGhldGE7XG4gICAgICAgIH1cblxuICAgICAgICBxdWV1ZURyYXdDb21tYW5kcyggcngsIHJ5LCB0aGV0YSApO1xuICAgICAgfSlcblxuICAgICAgLm9uKCd0YXBkcmFnJywgZHJhZ0hhbmRsZXIpXG5cbiAgICAgIC5vbignY3h0dGFwZW5kIHRhcGVuZCB0YXAnLCBmdW5jdGlvbigpe1xuICAgICAgICBwYXJlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgICBpZiggYWN0aXZlQ29tbWFuZEkgIT09IHVuZGVmaW5lZCApe1xuICAgICAgICAgIGxldCBzZWxlY3QgPSBjb21tYW5kc1sgYWN0aXZlQ29tbWFuZEkgXS5zZWxlY3Q7XG5cbiAgICAgICAgICBpZiggc2VsZWN0ICl7XG4gICAgICAgICAgICBzZWxlY3QuYXBwbHkoIHRhcmdldCwgW3RhcmdldCwgZ2VzdHVyZVN0YXJ0RXZlbnRdICk7XG4gICAgICAgICAgICBhY3RpdmVDb21tYW5kSSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbkdlc3R1cmUgPSBmYWxzZTtcblxuICAgICAgICByZXN0b3JlR2VzdHVyZXMoKTtcbiAgICAgIH0pXG4gICAgO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKXtcbiAgICBsZXQgaGFuZGxlcnMgPSBkYXRhLmhhbmRsZXJzO1xuXG4gICAgZm9yKCBsZXQgaSA9IDA7IGkgPCBoYW5kbGVycy5sZW5ndGg7IGkrKyApe1xuICAgICAgbGV0IGggPSBoYW5kbGVyc1tpXTtcblxuICAgICAgaWYoIGguc2VsZWN0b3IgPT09ICdjb3JlJyApe1xuICAgICAgICBjeS5vZmYoaC5ldmVudHMsIGguZm4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3kub2ZmKGguZXZlbnRzLCBoLnNlbGVjdG9yLCBoLmZuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlUGl4ZWxSYXRpbyk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95SW5zdGFuY2UoKXtcbiAgICByZWRyYXdpbmcgPSBmYWxzZTtcblxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgICB3cmFwcGVyLnJlbW92ZSgpO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKTtcblxuICByZXR1cm4ge1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCl7XG4gICAgICBkZXN0cm95SW5zdGFuY2UoKTtcbiAgICB9XG4gIH07XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3h0bWVudTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jeHRtZW51LmpzIiwiLy8gU2ltcGxlLCBpbnRlcm5hbCBPYmplY3QuYXNzaWduKCkgcG9seWZpbGwgZm9yIG9wdGlvbnMgb2JqZWN0cyBldGMuXG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiAhPSBudWxsID8gT2JqZWN0LmFzc2lnbi5iaW5kKCBPYmplY3QgKSA6IGZ1bmN0aW9uKCB0Z3QsIC4uLnNyY3MgKXtcbiAgc3Jjcy5maWx0ZXIoc3JjID0+IHNyYyAhPSBudWxsKS5mb3JFYWNoKCBzcmMgPT4ge1xuICAgIE9iamVjdC5rZXlzKCBzcmMgKS5mb3JFYWNoKCBrID0+IHRndFtrXSA9IHNyY1trXSApO1xuICB9ICk7XG5cbiAgcmV0dXJuIHRndDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYXNzaWduLmpzIiwibGV0IGRlZmF1bHRzID0ge1xuICBtZW51UmFkaXVzOiAxMDAsIC8vIHRoZSByYWRpdXMgb2YgdGhlIGNpcmN1bGFyIG1lbnUgaW4gcGl4ZWxzXG4gIHNlbGVjdG9yOiAnbm9kZScsIC8vIGVsZW1lbnRzIG1hdGNoaW5nIHRoaXMgQ3l0b3NjYXBlLmpzIHNlbGVjdG9yIHdpbGwgdHJpZ2dlciBjeHRtZW51c1xuICBjb21tYW5kczogWyAvLyBhbiBhcnJheSBvZiBjb21tYW5kcyB0byBsaXN0IGluIHRoZSBtZW51IG9yIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBhcnJheVxuICAgIC8qXG4gICAgeyAvLyBleGFtcGxlIGNvbW1hbmRcbiAgICAgIGZpbGxDb2xvcjogJ3JnYmEoMjAwLCAyMDAsIDIwMCwgMC43NSknLCAvLyBvcHRpb25hbDogY3VzdG9tIGJhY2tncm91bmQgY29sb3IgZm9yIGl0ZW1cbiAgICAgIGNvbnRlbnQ6ICdhIGNvbW1hbmQgbmFtZScgLy8gaHRtbC90ZXh0IGNvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGluIHRoZSBtZW51XG4gICAgICBjb250ZW50U3R5bGU6IHt9LCAvLyBjc3Mga2V5OnZhbHVlIHBhaXJzIHRvIHNldCB0aGUgY29tbWFuZCdzIGNzcyBpbiBqcyBpZiB5b3Ugd2FudFxuICAgICAgc2VsZWN0OiBmdW5jdGlvbihlbGUpeyAvLyBhIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgY29tbWFuZCBpcyBzZWxlY3RlZFxuICAgICAgICBjb25zb2xlLmxvZyggZWxlLmlkKCkgKSAvLyBgZWxlYCBob2xkcyB0aGUgcmVmZXJlbmNlIHRvIHRoZSBhY3RpdmUgZWxlbWVudFxuICAgICAgfSxcbiAgICAgIGVuYWJsZWQ6IHRydWUgLy8gd2hldGhlciB0aGUgY29tbWFuZCBpcyBzZWxlY3RhYmxlXG4gICAgfVxuICAgICovXG4gIF0sIC8vIGZ1bmN0aW9uKCBlbGUgKXsgcmV0dXJuIFsgLyouLi4qLyBdIH0sIC8vIGV4YW1wbGUgZnVuY3Rpb24gZm9yIGNvbW1hbmRzXG4gIGZpbGxDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC43NSknLCAvLyB0aGUgYmFja2dyb3VuZCBjb2xvdXIgb2YgdGhlIG1lbnVcbiAgYWN0aXZlRmlsbENvbG9yOiAncmdiYSgxLCAxMDUsIDIxNywgMC43NSknLCAvLyB0aGUgY29sb3VyIHVzZWQgdG8gaW5kaWNhdGUgdGhlIHNlbGVjdGVkIGNvbW1hbmRcbiAgYWN0aXZlUGFkZGluZzogMjAsIC8vIGFkZGl0aW9uYWwgc2l6ZSBpbiBwaXhlbHMgZm9yIHRoZSBhY3RpdmUgY29tbWFuZFxuICBpbmRpY2F0b3JTaXplOiAyNCwgLy8gdGhlIHNpemUgaW4gcGl4ZWxzIG9mIHRoZSBwb2ludGVyIHRvIHRoZSBhY3RpdmUgY29tbWFuZFxuICBzZXBhcmF0b3JXaWR0aDogMywgLy8gdGhlIGVtcHR5IHNwYWNpbmcgaW4gcGl4ZWxzIGJldHdlZW4gc3VjY2Vzc2l2ZSBjb21tYW5kc1xuICBzcG90bGlnaHRQYWRkaW5nOiA0LCAvLyBleHRyYSBzcGFjaW5nIGluIHBpeGVscyBiZXR3ZWVuIHRoZSBlbGVtZW50IGFuZCB0aGUgc3BvdGxpZ2h0XG4gIG1pblNwb3RsaWdodFJhZGl1czogMjQsIC8vIHRoZSBtaW5pbXVtIHJhZGl1cyBpbiBwaXhlbHMgb2YgdGhlIHNwb3RsaWdodFxuICBtYXhTcG90bGlnaHRSYWRpdXM6IDM4LCAvLyB0aGUgbWF4aW11bSByYWRpdXMgaW4gcGl4ZWxzIG9mIHRoZSBzcG90bGlnaHRcbiAgb3Blbk1lbnVFdmVudHM6ICdjeHR0YXBzdGFydCB0YXBob2xkJywgLy8gc3BhY2Utc2VwYXJhdGVkIGN5dG9zY2FwZSBldmVudHMgdGhhdCB3aWxsIG9wZW4gdGhlIG1lbnU7IG9ubHkgYGN4dHRhcHN0YXJ0YCBhbmQvb3IgYHRhcGhvbGRgIHdvcmsgaGVyZVxuICBpdGVtQ29sb3I6ICd3aGl0ZScsIC8vIHRoZSBjb2xvdXIgb2YgdGV4dCBpbiB0aGUgY29tbWFuZCdzIGNvbnRlbnRcbiAgaXRlbVRleHRTaGFkb3dDb2xvcjogJ3RyYW5zcGFyZW50JywgLy8gdGhlIHRleHQgc2hhZG93IGNvbG91ciBvZiB0aGUgY29tbWFuZCdzIGNvbnRlbnRcbiAgekluZGV4OiA5OTk5LCAvLyB0aGUgei1pbmRleCBvZiB0aGUgdWkgZGl2XG4gIGF0TW91c2U6IGZhbHNlIC8vIGRyYXcgbWVudSBhdCBtb3VzZSBwb3NpdGlvblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZWZhdWx0cy5qcyIsImNvbnN0IHJlbW92ZUVsZXMgPSBmdW5jdGlvbihxdWVyeSwgYW5jZXN0b3IgPSBkb2N1bWVudCkge1xuICBsZXQgZWxzID0gYW5jZXN0b3IucXVlcnlTZWxlY3RvckFsbChxdWVyeSk7XG5cbiAgZm9yKCBsZXQgaSA9IDA7IGkgPCBlbHMubGVuZ3RoOyBpKysgKXtcbiAgICBsZXQgZWwgPSBlbHNbaV07XG5cbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgfVxufTtcblxuY29uc3Qgc2V0U3R5bGVzID0gZnVuY3Rpb24oZWwsIHN0eWxlKSB7XG4gIGxldCBwcm9wcyA9IE9iamVjdC5rZXlzKHN0eWxlKTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IHByb3BzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGVsLnN0eWxlW3Byb3BzW2ldXSA9IHN0eWxlW3Byb3BzW2ldXTtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBsZXQgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG9wdGlvbnMudGFnIHx8ICdkaXYnKTtcblxuICBlbC5jbGFzc05hbWUgPSBvcHRpb25zLmNsYXNzIHx8ICcnO1xuXG4gIGlmIChvcHRpb25zLnN0eWxlKSB7XG4gICAgc2V0U3R5bGVzKGVsLCBvcHRpb25zLnN0eWxlKTtcbiAgfVxuXG4gIHJldHVybiBlbDtcbn07XG5cbmNvbnN0IGdldFBpeGVsUmF0aW8gPSBmdW5jdGlvbigpe1xuICByZXR1cm4gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbn07XG5cbmNvbnN0IGdldE9mZnNldCA9IGZ1bmN0aW9uKGVsKXtcbiAgbGV0IG9mZnNldCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIHJldHVybiB7XG4gICAgbGVmdDogb2Zmc2V0LmxlZnQgKyBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgK1xuICAgICAgICAgIHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVsncGFkZGluZy1sZWZ0J10pICtcbiAgICAgICAgICBwYXJzZUZsb2F0KGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlbJ2JvcmRlci1sZWZ0LXdpZHRoJ10pLFxuICAgIHRvcDogb2Zmc2V0LnRvcCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wICtcbiAgICAgICAgIHBhcnNlRmxvYXQoZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVsncGFkZGluZy10b3AnXSkgK1xuICAgICAgICAgcGFyc2VGbG9hdChnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpWydib3JkZXItdG9wLXdpZHRoJ10pXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVtb3ZlRWxlcywgc2V0U3R5bGVzLCBjcmVhdGVFbGVtZW50LCBnZXRQaXhlbFJhdGlvLCBnZXRPZmZzZXQgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kb20tdXRpbC5qcyIsImNvbnN0IGN4dG1lbnUgPSByZXF1aXJlKCcuL2N4dG1lbnUnKTtcblxuLy8gcmVnaXN0ZXJzIHRoZSBleHRlbnNpb24gb24gYSBjeXRvc2NhcGUgbGliIHJlZlxubGV0IHJlZ2lzdGVyID0gZnVuY3Rpb24oIGN5dG9zY2FwZSApe1xuICBpZiggIWN5dG9zY2FwZSApeyByZXR1cm47IH0gLy8gY2FuJ3QgcmVnaXN0ZXIgaWYgY3l0b3NjYXBlIHVuc3BlY2lmaWVkXG5cbiAgY3l0b3NjYXBlKCAnY29yZScsICdjeHRtZW51JywgY3h0bWVudSApOyAvLyByZWdpc3RlciB3aXRoIGN5dG9zY2FwZS5qc1xufTtcblxuaWYoIHR5cGVvZiBjeXRvc2NhcGUgIT09ICd1bmRlZmluZWQnICl7IC8vIGV4cG9zZSB0byBnbG9iYWwgY3l0b3NjYXBlIChpLmUuIHdpbmRvdy5jeXRvc2NhcGUpXG4gIHJlZ2lzdGVyKCBjeXRvc2NhcGUgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWdpc3RlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=