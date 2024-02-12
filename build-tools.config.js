module.exports = {
  browser: {
    name: 'siFunciona'
  },
  readme: {
    from: 'dist/**/!(*.min).js'
  },
  typescript: {
    config: 'tsconfig.json',
    enabled: true
  }
}
