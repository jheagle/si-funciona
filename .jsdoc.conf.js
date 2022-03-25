'use strict'

module.exports = {
  plugins: ['plugins/markdown'],
  source: {
    include: 'src',
    includePattern: '.+\\.js(doc|x)?$',
    excludePattern: '((^|\\/|\\\\)_|.+\\.test\\..*)'
  },
}