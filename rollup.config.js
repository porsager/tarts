import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'

export default [
  {
    input: 'lib/index.js',
    output: {
      file: 'tarts.js',
      format: 'umd',
      name: 'Tar',
      sourcemap: true
    },
    plugins: [
      buble(),
      filesize()
    ]
  }, {
    input: 'lib/index.js',
    output: {
      file: 'tarts.min.js',
      format: 'umd',
      name: 'Tar',
      sourcemap: true
    },
    plugins: [
      buble(),
      uglify.uglify({ mangle: true, compress: true }),
      filesize()
    ]
  }
]
