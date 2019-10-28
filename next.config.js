const path = require('path')
const withImages = require('next-images')
const withCSS = require('@zeit/next-css')
const withFonts = require('next-fonts')
const webpack = require('webpack')
const _ = require('lodash')

const isProduction = process.env.NODE_ENV === 'production'

module.exports =
  withImages(
    Object.assign({}, withFonts(withCSS({
      webpack(config, options) {
        config.resolve.alias['assets'] = path.join(__dirname, 'assets')
        config.resolve.alias['lib'] = path.join(__dirname, 'lib')

        config.mode = isProduction ? 'production' : 'development'

        var appVars = _.keys(process.env).filter(key => key.startsWith('NEXT_JS_'))

        config.plugins.push(new webpack.EnvironmentPlugin(_.pick(process.env, appVars)))

        return config
      }
    })), {
      inlineImageLimit: 48, // make it tiny so that it doesn't inline
    })
  )