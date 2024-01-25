module.exports = {
  '*.{ts,js,cjs,vue}': [
      'bash -c "vue-tsc --noEmit"',
      'eslint --fix'
  ]
}
