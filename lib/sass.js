/**
 * Sass Build
 * sass build plugin for building/optimizing/converting .scss to .css
 * - scss build using node-sass
 * - parses parallel optimization results and returns SassResultModel.toJSON
 */
'use strict'

const _ = require('ninjs-lodash')
const sass = require('node-sass')
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')

_.$load(_.path.join(__dirname, '.ninjs', 'settings.js'))
_.$load(_.path.join(__dirname, '.ninjs', 'settings.json'))

const prefixer = postcss([autoprefixer(_.$('autoprefixer'))])
// const Backbone = require('backbone')
// const ba = require('backbone-associations')

const OPTIONS = _.$('node-sass.options')
const OUTPUT_STYLES = _.$('node-sass.output_style_options')
const OUTPUT_STYLES_MAP = _.$('node-sass.file_suffix_map')

exports = module.exports = {
  render: render,
  renderApp: renderApp,
  renderHeadings: renderHeadings
}

// returns css string after running sass optimizer
function render(options, callback) {
  let params = _.mcopy(OPTIONS, options)
  let { enabled=true, dest='', outputStyle='expanded', xform=undefined  } = params
  let isExpanded = _.toLower(outputStyle) === 'expanded'

  if(!enabled) return _.fail('not enabled', callback)
  if(!dest) return _.fail('invalid dest', callback)

  sass.render(params, (err, result) => {
    if (err) return _.fail(err, callback)

    let { css, map, stats } = result
    let { entry, duration, includedFiles } = stats
    // map = map ? JSON.stringify(map) : ''

    prefixer.process(css)
      .then((prefixed) => {
        let prefixedCss = _.get(prefixed, 'css') || ''

        _.outputFile(dest, prefixedCss, (err) => {
          if (err) return _.fail(err, callback)

          let stat = _.statSync(dest)
          let bytes = _.get(stat, 'size') || 0

          _.done({ path: dest, files: includedFiles, duration: duration, bytes: bytes, size: _.bytes(bytes) }, callback)
        })
      })
      .catch((err) => { return _.fail(err, callback) })
  })
}

function renderApp(options, callback) {
  let { file='', dest='' } = options
  if(!file) return _.fail('Invalid file', callback)
  if(!dest) return _.fail('Invalid dest', callback)

  let start = _.now()
  let ex = _.path.ex(dest)
  let dir = ex ? _.path.dir(dest) : dest
  let name = ex ? _.path.name(dest) : 'styles'

  let res = { file: file, dest: dest, duration: 0, bytes: 0, size: '', files: [], results: {} }

  let tasks = _.reduce(OUTPUT_STYLES, (result, v) => {
    let mapped = _.get(OUTPUT_STYLES_MAP, v) || ''
    let styleName = mapped ? `${name}.${mapped}.css` : `${name}.css`
    result[v] = _.async.apply(render, _.mcopy(options, { outputStyle: v, dest: _.path.join(dir, styleName)  }))
    res.results[v] = { path: "", duration: 0, bytes: 0, size: "" }
    return result
  }, {})

  return _.async.parallel(tasks, (err, result) => {
    if(err) return _.fail(err, callback)

    _.each(OUTPUT_STYLES, (v) => {
        let oResult = _.get(result, v)
        res.files = _.get(oResult, 'files') || []
        res.results[v] = _.omit(oResult, ['files'])
    })

    _.each(res.files, (file) => {
      let bytes = _.get(_.statSync(file), 'size') || 0
      res.bytes = res.bytes + bytes
    })

    _.assign(res, { size: _.bytes(res.bytes), duration: _.nowDiff(start) })
    _.done(res, callback)
  })
}

function renderHeadings(options, callback) {
  options = _.mcopy(options, {
    data: '#{headings(2,5)} { color: #08c }',
    functions: {
      'headings($from: 0, $to: 6)': (from, to) => {
        let i, f = from.getValue()
        let t = to.getValue()
        let list = new sass.types.List(t - f + 1)
        for (i = f; i <= t; i++) list.setValue(i - f, new sass.types.String('h' + i))
        return list
      }
    }
  })
  return render(options, callback)
}