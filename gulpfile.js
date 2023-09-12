const { build, defaultCmd, partials, readme, testFull, testQuick, typescript, watchFull, watchTest } = require('js-build-tools')

exports.build = build
exports.clean = partials.clean
exports.default = defaultCmd
exports.readme = readme
exports.testFull = testFull
exports.testQuick = testQuick
exports.typescript = typescript
exports.watchFull = watchFull
exports.watchTest = watchTest
