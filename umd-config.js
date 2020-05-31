const path = require('path')

const createUmdConfig = (template, settings) => settings.reduce((config, file) => {
  config[file.name] = {
    template: template,
    exports: () => file.exports
  }
  if (file.exportDefault) {
    config[file.name].exports = () => `${file.exports}\nexport default ${file.exportDefault}`
  }
  if (file.dependencies) {
    config[file.name].dependencies = () => file.dependencies
  }
  if (file.namespace) {
    config[file.name].namespace = () => file.namespace
  }
  if (file.imports || !file.namespace) {
    config[file.name].namespace = () => (file.imports || []).reduce(
      (imports, importInfo) =>
        (imports.length ? `${imports}\n` : '') +
          'import ' + (importInfo.what ? `${importInfo.what} from` : '') + `'${importInfo.from}'`,
      ''
    )
  }
  return config
}, {})

const moduleSettings = createUmdConfig(
  path.join(__dirname, 'umd-templates', 'modules.js'),
  [
    {
      name: 'arrays',
      exports: '{ buildArray, buildArrayOfReferences, uniqueArray, mergeArrays, compareArrays }',
      exportDefault: 'arrayHelpers',
      imports: [
        {
          from: './functions',
          what: '{ curry }'
        },
        {
          from: './objects',
          what: '{ cloneObject }'
        }
      ]
    },
    {
      name: 'functions',
      exports: '{ curry, pipe, callWithParams, delay, queueManager, queueTimeout }',
      exportDefault: 'functionHelpers',
      imports: [
        {
          from: 'core-js/stable'
        },
        {
          from: 'regenerator-runtime/runtime'
        }
      ]
    },
    {
      name: 'numbers',
      exports: '{ getAbsoluteMax, getAbsoluteMin, randomNumber, randomInteger, compare }',
      exportDefault: 'numberHelpers'
    },
    {
      name: 'objects',
      exports: '{ setValue, setAndReturnValue, mapObject, mapProperty, filterObject, reduceObject, notEmptyObjectOrArray, cloneObject, mergeObjects, mergeObjectsMutable }',
      exportDefault: 'objectHelpers',
      imports: [
        {
          from: 'core-js/stable'
        },
        {
          from: './functions',
          what: '{ curry, callWithParams }'
        }
      ]
    },
    {
      name: 'main',
      exports: '{ arrayHelpers, functionHelpers, numberHelpers, objectHelpers }',
      exportDefault: 'functionalHelpers',
      imports: [
        {
          from: 'core-js/stable'
        },
        {
          from: './helpers/arrays',
          what: 'arrayHelpers'
        },
        {
          from: './helpers/functions',
          what: 'functionHelpers'
        },
        {
          from: './helpers/numbers',
          what: 'numberHelpers'
        },
        {
          from: './helpers/objects',
          what: 'objectHelpers'
        }
      ]
    }
  ]
)

const nodeSettings = createUmdConfig(
  path.join(__dirname, 'umd-templates', 'node.js'),
  [
    {
      name: 'arrays',
      exports: 'arrayHelpers',
      dependencies: [
        {
          cjs: './functions',
          param: '{ curry }'
        },
        {
          cjs: './objects',
          param: '{ cloneObject }'
        }
      ]
    },
    {
      name: 'functions',
      exports: 'functionHelpers',
      dependencies: [
        {
          cjs: 'regenerator-runtime',
          param: 'regeneratorRuntime'
        }
      ]
    },
    {
      name: 'numbers',
      exports: 'numberHelpers'
    },
    {
      name: 'objects',
      exports: 'objectHelpers',
      dependencies: [
        {
          cjs: './functions',
          param: '{ curry, callWithParams }'
        }
      ]
    },
    {
      name: 'main',
      exports: 'functionalHelpers',
      dependencies: [
        {
          cjs: './helpers/arrays',
          param: 'arrayHelpers'
        },
        {
          cjs: './helpers/functions',
          param: 'functionHelpers'
        },
        {
          cjs: './helpers/numbers',
          param: 'numberHelpers'
        },
        {
          cjs: './helpers/objects',
          param: 'objectHelpers'
        },
        {
          cjs: 'regenerator-runtime',
          param: 'regeneratorRuntime'
        }
      ]
    }
  ]
)

const webSettings = createUmdConfig(
  path.join(__dirname, 'umd-templates', 'web.js'),
  [
    {
      name: 'arrays',
      exports: 'arrayHelpers',
      namespace: 'arrayHelpers'
    },
    {
      name: 'functions',
      exports: 'functionHelpers',
      namespace: 'functionHelpers'
    },
    {
      name: 'numbers',
      exports: 'numberHelpers',
      namespace: 'numberHelpers'
    },
    {
      name: 'objects',
      exports: 'objectHelpers',
      namespace: 'objectHelpers'
    },
    {
      name: 'main',
      exports: 'functionalHelpers',
      namespace: 'functionalHelpers'
    }
  ]
)

module.exports = {
  modules: moduleSettings,
  node: nodeSettings,
  web: webSettings
}
