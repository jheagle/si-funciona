"use strict";

require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.for-each.js");
require("core-js/modules/esnext.weak-map.delete-all.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
exports.default = void 0;
var _arrays = _interopRequireWildcard(require("./helpers/arrays"));
Object.keys(_arrays).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _arrays[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _arrays[key];
    }
  });
});
var _descriptors = _interopRequireWildcard(require("./helpers/descriptors"));
Object.keys(_descriptors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _descriptors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _descriptors[key];
    }
  });
});
var _functions = _interopRequireWildcard(require("./helpers/functions"));
Object.keys(_functions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _functions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _functions[key];
    }
  });
});
var _numbers = _interopRequireWildcard(require("./helpers/numbers"));
Object.keys(_numbers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _numbers[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _numbers[key];
    }
  });
});
var _objects = _interopRequireWildcard(require("./helpers/objects"));
Object.keys(_objects).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _objects[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _objects[key];
    }
  });
});
var _strings = _interopRequireWildcard(require("./helpers/strings"));
Object.keys(_strings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _strings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _strings[key];
    }
  });
});
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * All the siFunciona system functions for stringing together functions and simplifying logic.
 */

// Every function is available by name (import { curry } from 'si-funciona', require('si-funciona').curry) ...

// ... and all together on the default export (import siFunciona from 'si-funciona', require('si-funciona').default)
const siFunciona = Object.assign({}, _arrays.default, _descriptors.default, _functions.default, _numbers.default, _objects.default, _strings.default);
var _default = exports.default = siFunciona;
if (void 0) {
  // @ts-ignore
  (void 0)['siFunciona'] = siFunciona;
} else if (typeof window !== 'undefined') {
  // @ts-ignore
  window['siFunciona'] = siFunciona;
}