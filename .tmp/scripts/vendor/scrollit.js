"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*
The MIT License (MIT)

Copyright (c) 2015 Rory Murphy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

!function (root, factory) {
  "function" == typeof define && define.amd ? define("scrollit", ["jquery"], function ($) {
    return root.scrollit = factory($);
  }) : root.scrollit = factory(root.jQuery);
}(undefined, function ($) {
  function stringFormat(formatString) {
    var args = arguments;return formatString = formatString.replace(/\{(\d+)\}/gi, function (match, p1, offset, s) {
      return args[parseInt(p1) + 1];
    });
  }function setStyleBrowser($el, name, value, browsers) {
    $el.css(name, value);for (var i = 0; i < browsers.length; i++) {
      var b = browsers[i];switch (b) {case "webkit":
          for (var i = 0; i < $el.length; $i++) {
            $el[i].style["-webkit-" + name] = value;
          }break;case "mozilla":
          for (var i = 0; i < $el.length; $i++) {
            $el[i].style["-moz-" + name] = value;
          }break;case "ie":
          for (var i = 0; i < $el.length; $i++) {
            $el[i].style["-ms-" + name] = value;
          }break;case "opera":
          for (var i = 0; i < $el.length; $i++) {
            $el[i].style["-o-" + name] = value;
          }}
    }
  }function setStyle($el, name, value) {
    switch (name) {case "hyphens":
        setStyleBrowser($el, name, value, ["webkit", "mozilla", "ie"]);break;case "box-shadow":case "column-rule":case "column-rule-color":case "column-rule-style":case "column-rule-width":case "column-width":case "columns":case "column-count":case "font-feature-setting":case "order":case "text-decoration-style":
        setStyleBrowser($el, name, value, ["webkit", "mozilla"]);break;case "tab-size":
        setStyleBrowser($el, name, value, ["opera", "mozilla"]);break;case "box-sizing":case "column-fill":case "image-rendering":case "text-align-last":case "text-combine-horizontal":case "text-decoration-color":case "text-decoration-line":
        setStyleBrowser($el, name, value, ["mozilla"]);break;case "column-span":case "flex-basis":case "flex-direction":case "flex-flow":case "flex-grow":case "flex-shrink":case "flex-wrap":case "justify-content":case "marquee-direction":case "marquee-play-count":case "marquee-speed":case "marquee-style":case "perspective":case "perspective-origin":case "transform":case "transform-origin":case "transform-style":case "transition":case "transition-property":case "transition-duration":case "transition-timing-function":case "transition-delay":
        setStyleBrowser($el, name, value, ["webkit"]);break;default:
        $el.css(name, value);}
  }function hexToRgb(hex) {
    if (hex = hex.substr(1), 3 === hex.length) {
      var c = { r: parseInt(hex.substr(0, 1), 16), g: parseInt(hex.substr(1, 1), 16), b: parseInt(hex.substr(2, 1), 16) };return { r: 16 * c.r + c.r, g: 16 * c.g + c.g, b: 16 * c.b + c.b };
    }return 6 === hex.length ? { r: parseInt(hex.substr(0, 2), 16), g: parseInt(hex.substr(2, 2), 16), b: parseInt(hex.substr(4, 2), 16) } : void 0;
  }function hslToRgb(h, s, l) {
    function hue2rgb(p, q, t) {
      return 0 > t && (t += 1), t > 1 && (t -= 1), 1 / 6 > t ? p + 6 * (q - p) * t : .5 > t ? q : 2 / 3 > t ? p + (q - p) * (2 / 3 - t) * 6 : p;
    }var r, g, b;if (0 == s) r = g = b = l;else {
      var q = .5 > l ? l * (1 + s) : l + s - l * s,
          p = 2 * l - q;r = hue2rgb(p, q, h + 1 / 3), g = hue2rgb(p, q, h), b = hue2rgb(p, q, h - 1 / 3);
    }return [255 * r, 255 * g, 255 * b];
  }function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;var h,
        s,
        max = Math.max(r, g, b),
        min = Math.min(r, g, b),
        l = (max + min) / 2;if (max == min) h = s = 0;else {
      var d = max - min;switch (s = l > .5 ? d / (2 - max - min) : d / (max + min), max) {case r:
          h = (g - b) / d + (b > g ? 6 : 0);break;case g:
          h = (b - r) / d + 2;break;case b:
          h = (r - g) / d + 4;}h /= 6;
    }return [h, s, l];
  }function parseAttributeColor(val) {
    var matches = hexRegex.exec(val);return null != matches ? new color(hexToRgb("#" + matches[1])) : (matches = rgbRegex.exec(val), null != matches ? new color({ r: matches[1], g: matches[2], b: matches[3] }) : (matches = rgbaRegex.exec(val), null != matches ? new color({ r: matches[1], g: matches[2], b: matches[3], a: matches[4] }) : (matches = hslRegex.exec(val), null != matches ? new color({ h: matches[1], s: matches[2], l: matches[3] }) : (matches = hslaRegex.exec(val), null != matches ? new color({ h: matches[1], s: matches[2], l: matches[3], a: matches[4] }) : void 0))));
  }function parseAttributeNumeric(val) {
    var counter = 0,
        args = {};return args.values = [], args.formatString = val.replace(/(\-?\d+\.?\d*|\-?\d*\.?\d+)/gi, function (match, p1, offset, s) {
      return args.values.push(parseFloat(p1)), "{" + counter++ + "}";
    }), new numericExpression(args);
  }function parseAttribute(val) {
    var result = parseAttributeColor(val);return result || (result = parseAttributeNumeric(val)), result;
  }function makeOffsetFunction(axis, scrollParent, options) {
    var $el,
        result,
        offsetTopFunc = function offsetTopFunc($el, offset) {
      return ($el.get(0) === document ? 0 : $el.offset().top) + offset;
    },
        offsetBottomFunc = function offsetBottomFunc($el, offset) {
      return ($el.get(0) === document ? 0 : $el.offset().top) + $el.height() + offset;
    },
        offsetLeftFunc = function offsetLeftFunc($el, offset) {
      return ($el.get(0) === document ? 0 : $el.offset().left) + offset;
    },
        offsetRightFunc = function offsetRightFunc($el, offset) {
      return ($el.get(0) === document ? 0 : $el.offset().left) + $el.width() + offset;
    };return $el = options instanceof $ ? options : _.isObject(options) && options.$el ? options.$el : scrollParent, result = "y" === axis ? _.isNumber(options) ? _.partial(offsetTopFunc, $el, options) : _.isObject(options) && _.has(options, "top") ? _.partial(offsetTopFunc, $el, options.top) : _.isObject(options) && _.has(options, "bottom") ? _.partial(offsetBottomFunc, $el, options.bottom) : _.partial(offsetTopFunc, $el, 0) : _.isNumber(options) ? _.partial(offsetLeftFunc, $el, options) : _.isObject(options) && _.has(options, "left") ? _.partial(offsetLeftFunc, $el, options.left) : _.isObject(options) && _.has(options, "right") ? _.partial(offsetRightFunc, $el, options.bottom) : _.partial(offsetLeftFunc, $el, 0);
  }var exports = {},
      _ = {};_.has = Object.prototype.hasOwnProperty, slice = Array.prototype.slice;var hasEnumBug = !{ toString: null }.propertyIsEnumerable("toString");_.allKeys = function (obj) {
    if (!_.isObject(obj)) return [];var keys = [];for (var key in obj) {
      keys.push(key);
    }return hasEnumBug && collectNonEnumProps(obj, keys), keys;
  };var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
    return function (obj) {
      var length = arguments.length;if (2 > length || null == obj) return obj;for (var index = 1; length > index; index++) {
        for (var source = arguments[index], keys = keysFunc(source), l = keys.length, i = 0; l > i; i++) {
          var key = keys[i];undefinedOnly && void 0 !== obj[key] || (obj[key] = source[key]);
        }
      }return obj;
    };
  };_.defaults = createAssigner(_.allKeys, !0), _.isObject = function (obj) {
    var type = typeof obj === "undefined" ? "undefined" : _typeof(obj);return "function" === type || "object" === type && !!obj;
  };for (var oTypes = ["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], i = 0; i < oTypes.length; i++) {
    var name = oTypes[i],
        callback = function callback(name) {
      return function (obj) {
        return toString.call(obj) === "[object " + name + "]";
      };
    };_["is" + name] = callback.call(this, name);
  }var executeBound = function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);var self = baseCreate(sourceFunc.prototype),
        result = sourceFunc.apply(self, args);return _.isObject(result) ? result : self;
  };_.partial = function (func) {
    var boundArgs = slice.call(arguments, 1),
        bound = function bound() {
      for (var position = 0, length = boundArgs.length, args = Array(length), i = 0; length > i; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }for (; position < arguments.length;) {
        args.push(arguments[position++]);
      }return executeBound(func, bound, this, this, args);
    };return bound;
  }, $.fn.scrollParent = function () {
    var position = this.css("position"),
        excludeStaticParent = "absolute" === position,
        scrollParent = this.parents().filter(function () {
      var parent = $(this);return excludeStaticParent && "static" === parent.css("position") ? !1 : /(auto|scroll)/.test(parent.css("overflow") + parent.css("overflow-y") + parent.css("overflow-x"));
    }).eq(0);return "fixed" !== position && scrollParent.length ? scrollParent : $(this[0].ownerDocument || document);
  };var baseEasings = {};$.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (i, name) {
    baseEasings[name] = function (p) {
      return Math.pow(p, i + 2);
    };
  }), $.extend(baseEasings, { Sine: function Sine(p) {
      return 1 - Math.cos(p * Math.PI / 2);
    }, Circ: function Circ(p) {
      return 1 - Math.sqrt(1 - p * p);
    }, Elastic: function Elastic(p) {
      return 0 === p || 1 === p ? p : -Math.pow(2, 8 * (p - 1)) * Math.sin((80 * (p - 1) - 7.5) * Math.PI / 15);
    }, Back: function Back(p) {
      return p * p * (3 * p - 2);
    }, Bounce: function Bounce(p) {
      for (var pow2, bounce = 4; p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11;) {}return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((3 * pow2 - 2) / 22 - p, 2);
    } }), exports.easing = { Linear: function Linear(p) {
      return p;
    } }, $.each(baseEasings, function (name, easeIn) {
    exports.easing["easeIn" + name] = easeIn, exports.easing["easeOut" + name] = function (p) {
      return 1 - easeIn(1 - p);
    }, exports.easing["easeInOut" + name] = function (p) {
      return .5 > p ? easeIn(2 * p) / 2 : 1 - easeIn(-2 * p + 2) / 2;
    };
  });var color = function color(options) {
    var t = this;if (_.defaults(options, { a: 1 }), "undefined" != typeof options.r && "undefined" != typeof options.g && "undefined" != typeof options.b) {
      options.type = "rgb";var hsl = rgbToHsl(options.r, options.g, options.b);options.h = 360 * hsl[0], options.s = 100 * hsl[1], options.l = 100 * hsl[2];
    } else if ("undefined" != typeof options.h && "undefined" != typeof options.s && "undefined" != typeof options.l) {
      options.type = "hsl";var rgb = hslToRgb(options.h / 360, options.s / 100, options.l / 100);options.r = rgb[0], options.g = rgb[1], options.b = rgb[2];
    }t.r = function () {
      return options.r;
    }, t.g = function () {
      return options.g;
    }, t.b = function () {
      return options.b;
    }, t.h = function () {
      return options.h;
    }, t.s = function () {
      return options.s;
    }, t.l = function () {
      return options.l;
    }, t.a = function () {
      return options.a;
    }, t.mix = function (c, percent) {
      var perComp = 1 - percent;return "rgb" === options.type ? new color({ r: perComp * options.r + percent * c.r(), g: perComp * options.g + percent * c.g(), b: perComp * options.b + percent * c.b(), a: perComp * options.a + percent * c.a() }) : "hsl" === options.type ? new color({ h: perComp * options.h + percent * c.h(), s: perComp * options.s + percent * c.s(), l: perComp * options.l + percent * c.l(), a: perComp * options.a + percent * c.a() }) : void 0;
    }, t.toString = function () {
      return stringFormat("rgba({0}, {1}, {2}, {3})", Math.round(options.r), Math.round(options.g), Math.round(options.b), options.a);
    };
  },
      hexRegex = /^\s*#([A-Fa-f0-0]{3}|[A-Fa-f0-0]{6})/,
      rgbRegex = /^\s*rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/,
      rgbaRegex = /^\s*rgba\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d\.\d+|\d|\.\d+)\s*\)/,
      hslRegex = /^\s*hsl\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)/,
      hslaRegex = /^\s*hsla\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d\.\d+|\d|\.\d+)\s*\)/,
      numericExpression = function numericExpression(options) {
    var t = this;t.formatString = function () {
      return options.formatString;
    }, t.values = function () {
      return options.values;
    }, t.mix = function (exp, percent) {
      for (var perComp = 1 - percent, args = exp.values(), newArgs = [], i = 0; i < options.values.length; i++) {
        newArgs.push(perComp * options.values[i] + percent * args[i]);
      }var opts = { formatString: options.formatString, values: newArgs };return new numericExpression(opts);
    }, t.toString = function () {
      return stringFormat.apply(this, [options.formatString].concat(options.values));
    };
  };exports.Tween = function (options) {
    var t = this,
        defaults = { $el: null, scrollParent: null, axis: "y", start: 0, end: 0, easing: "Linear", styles: {}, scroll: null },
        executionPoint = 0;if (_.defaults(options, defaults), null === options.$el) throw "Must specify an element or elements to tween";if (null === options.scroll && (null === options.style || 0 === options.styles.length)) throw "Must specify either styles to tween or a scroll function";var $el = options.$el = $(options.$el);null === options.scrollParent && (options.scrollParent = $el.scrollParent()), options.$scrollParent = $(options.scrollParent), options.start = _.isFunction(options.start) ? options.start : makeOffsetFunction(options.axis, options.$scrollParent, options.start), options.end = _.isFunction(options.end) ? options.end : makeOffsetFunction(options.axis, options.$scrollParent, options.end), options.easing = _.isFunction(options.easing) ? options.easing : exports.easing[options.easing];for (var key in options.styles) {
      var val = options.styles[key],
          style = val;_.isString(val) && (style = { endValue: val }), style = _.defaults(style, { startValue: null, endValue: null }), style.startValue && (style.startValue = parseAttribute(style.startValue)), style.endValue && (style.endValue = parseAttribute(style.endValue)), options.styles[key] = style;
    }var scroll = function scroll() {
      var start = options.start(),
          end = options.end(),
          pos = options.$scrollParent.scrollTop(),
          value = 0;if (start > pos && executionPoint >= 0) value = 0;else if (pos > end && 1 > executionPoint) value = 1;else {
        if (start > pos || pos > end) return void (executionPoint = start > pos ? -1 : 1);var percent = (pos - start) / (end - start);value = options.easing(percent);
      }executionPoint = start > pos ? -1 : pos > end ? 1 : 0, options.scroll && options.scroll(value);for (var key in options.styles) {
        var val = options.styles[key];("undefined" == typeof val.startValue || null === val.startValue) && (val.startValue = parseAttribute(options.$el.css(key))), setStyle(options.$el, key, val.endValue.mix(val.startValue, 1 - value).toString());
      }
    },
        animate = function animate() {
      window.requestAnimationFrame(scroll);
    };$(options.scrollParent).on("scroll", animate), animate(), $(document).on("ready", animate), t.dispose = function () {
      $(options.scrollParent).off("scroll", animate);
    };
  }, exports.Parallax = function (options) {
    var t = this,
        defaults = { $el: null, scrollParent: null, axis: "y", attr: "top", speed: 0 };if (_.defaults(options, defaults), null === options.$el) throw "Must specify an element or elements to parallax";var $el = options.$el = $(options.$el);null === options.scrollParent && (options.scrollParent = $el.scrollParent()), options.$scrollParent = $(options.scrollParent);var scroll = function scroll() {
      if ("x" == options.axis) {
        if (parentPos = options.$scrollParent.get(0) === document ? 0 : options.$scrollParent.offset().left, offsetPos = $el.offset().left, "left" === options.attr) {
          var left = $el.css("left");offsetPos -= $.isNumeric(left) ? left : 0;
        } else if ("right" === options.attr) {
          var right = $el.css("right");offsetPos += $.isNumeric(right) ? right : 0;
        }scrollPos = options.$scrollParent.scrollLeft();
      } else {
        if (parentPos = options.$scrollParent.get(0) === document ? 0 : options.$scrollParent.offset().top, offsetPos = $el.offset().top, "top" === options.attr) {
          var top = $el.css("top");offsetPos -= $.isNumeric(top) ? top : 0;
        } else if ("bottom" === options.attr) {
          var bottom = $el.css("bottom");offsetPos += $.isNumeric(bottom) ? bottom : 0;
        }scrollPos = options.$scrollParent.scrollTop();
      }var pos = -(offsetPos - parentPos - scrollPos) * options.speed;$el.css(options.attr, Math.round(pos));
    },
        animate = function animate() {
      window.requestAnimationFrame(scroll);
    };options.$scrollParent.on("scroll", animate), animate(), $(document).on("ready", animate), t.dispose = function () {
      options.$scrollParent.off("scroll", animate);
    };
  }, exports.Waypoint = function (options) {
    var t = this,
        defaults = { position: 0, scrollParent: null, axis: "y", up: null, down: null };_.defaults(options, defaults), null === options.$el && (options.$el = $(document));var $el = options.$el = $(options.$el);null === options.scrollParent && (options.scrollParent = $el.scrollParent()), options.$scrollParent = $(options.scrollParent), options.position = _.isFunction(options.position) ? options.position : makeOffsetFunction(options.axis, options.$el, options.position), t._lastScrollTop = options.$scrollParent.scrollTop();var scroll = function scroll() {
      var position = options.position(),
          scrollTop = options.$scrollParent.scrollTop(),
          scrollLeft = options.$scrollParent.scrollLeft();"y" === options.axis && t._lastScrollTop < position && scrollTop > position && options.down && options.down(), "y" === options.axis && t._lastScrollTop > position && position > scrollTop && options.up && options.up(), "x" === options.axis && t._lastScrollLeft < position && scrollLeft > position && options.right && options.right(), "x" === options.axis && t._lastScrollLeft > position && position > scrollLeft && options.left && options.left(), t._lastScrollTop = scrollTop, t._lastScrollLeft = scrollLeft;
    },
        animate = function animate() {
      window.requestAnimationFrame(scroll);
    };$(options.scrollParent).on("scroll", animate), animate(), $(document).on("ready", animate), t.dispose = function () {
      $(options.scrollParent).off("scroll", animate);
    };
  };var tweens = {};$.fn.tween = function (options) {
    "off" === options ? this.each(function (idx, el) {
      tweens[el] && ($.each(tweens[el], function (i2, item) {
        item.dispose();
      }), delete tweens[el]);
    }) : this.each(function (idx, el) {
      var opts = $.extend({}, options);opts.$el = $(el);var tween = new scrollit.Tween(opts);tweens[el] = tweens[el] || [], tweens[el].push(tween);
    });
  };var waypoints = {};return $.fn.waypoint = function (options) {
    this.each(function (idx, el) {
      var opts = $.extend({}, options);opts.$el = $(el);var way = new scrollit.Waypoint(opts);waypoints[el] = waypoints[el] || [], waypoints[el].push(way);
    });
  }, $.fn.parallax = function (options) {
    this.each(function (idx, el) {
      var opts = $.extend({}, options);opts.$el = $(el);new exports.Parallax(opts);
    });
  }, $(document).ready(function () {
    $("[data-parallax]").each(function (idx, el) {
      $(el).parallax({ speed: $(el).data("parallax") });
    });
  }), exports;
});
//# sourceMappingURL=scrollit.js.map
