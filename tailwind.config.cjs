module.exports = {
    presets: [require('@scayle/tailwind-base')],
    mode: 'jit',
    content: [
        'src/**/*.js',
        'src/**/*.ts',
        'src/**/*.vue',
        'src/**/*.html',
    ],
    plugins: [
        require('tailwindcss-logical'),
        require('@scayle/tailwind-base/plugins/base.js'),
        require('@scayle/tailwind-base/plugins/element-plus.js')
    ],
};
