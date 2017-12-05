(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Tar = factory());
}(this, (function () { 'use strict';

var headers = {
  name: 100,
  mode: 8,
  uid: 8,
  gid: 8,
  size: 12,
  mtime: 12,
  chksum: 8,
  typeflag: 1,
  linkname: 100,
  magic: 5,
  version: 2,
  uname: 32,
  gname: 32,
  devmajor: 8,
  devminor: 8,
  prefix: 155,
  padding: 12
};

var offsets = {};
Object.keys(headers).reduce(function (acc, k) {
  offsets[k] = acc;
  return acc + headers[k]
}, 0);

var defaults = function (f) { return ({
  name: f.name,
  mode: '777',
  uid: 0,
  gid: 0,
  size: f.content.byteLength,
  mtime: Math.floor(Number(new Date()) / 1000),
  chksum: '        ',
  typeflag: '0',
  magic: 'ustar',
  version: '  ',
  uname: '',
  gname: ''
}); };

var nopad = ['name', 'linkname', 'magic', 'chksum', 'typeflag', 'version', 'uname', 'gname'];
var bsize = 512;

var index = function (files) {
  return files.reduce(function (a, f) {
    if (typeof f.content === 'string')
      { f.content = stringToUint8(f.content); }

    f = Object.assign(defaults(f), f);

    var b = new Uint8Array(Math.ceil((bsize + f.size) / bsize) * bsize);

    var checksum = Object.keys(headers).reduce(function (acc, k) {
      if (!(k in f))
        { return acc }

      var value = stringToUint8(nopad.indexOf(k) > -1
        ? f[k]
        : pad(f[k], headers[k] - 1));

      b.set(value, offsets[k]);
      return acc + value.reduce(function (a, b) { return a + b; }, 0)
    }, 0);

    b.set(stringToUint8(pad(checksum, 7)), offsets.chksum);
    b.set(f.content, bsize);

    var sum = new Uint8Array(a.byteLength + b.byteLength);
    sum.set(a, 0);
    sum.set(b, a.byteLength);

    return sum
  }, new Uint8Array(0))
};

function pad(s, n) {
  s = s.toString(8);
  return ('000000000000' + s).slice(s.length + 12 - n)
}

function stringToUint8(s) {
  var a = new Uint8Array(s.length);
  for (var i = 0; i < s.length; i++)
    { a[i] = s.charCodeAt(i); }
  return a
}

return index;

})));
//# sourceMappingURL=tarts.js.map
