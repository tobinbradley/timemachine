module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? ''
    : '/',
  css: {
    sourceMap: true
  }
}