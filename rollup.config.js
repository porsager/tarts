import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'

export default [
  {
    entry: 'lib/index.js',
    dest: 'tarts.js',
    format: 'umd',
    moduleName: 'Tar',
    sourceMap: true,
    exports: 'default',
    plugins: [
      buble(),
      filesize()
    ]
  }, {
    entry: 'lib/index.js',
    dest: 'tarts.min.js',
    format: 'umd',
    moduleName: 'Tar',
    sourceMap: true,
    exports: 'default',
    plugins: [
      buble(),
      uglify({ mangle: true, compress: true }),
      filesize()
    ]
  }
]
