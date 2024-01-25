/**
 * External dependencies.
 */
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import IconsPlugin from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';
import ComponentsPlugin from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

/**
 * Internal dependencies.
 */
import aboutYouStyleLoader from './vite-plugins/aboutYouStyleLoader';
import aboutYouAddonLoader from './vite-plugins/aboutYouAddonLoader';
import aboutYouVueStyleLoader from './vite-plugins/aboutYouVueStyleLoader';
import aboutYouGlobalWindowEventLoader from './vite-plugins/aboutYouGlobalWindowEventLoader';

const require = createRequire(import.meta.url);

function generatePanelIcons() {
    const dir = path.join(path.dirname(require.resolve('@scayle/panel-icons')), 'img');
    let icons: Record<string, string> = {};

    fs.readdirSync(dir).forEach(function (file: string) {
        const simpleName = file.replace('.svg', '').replace('ic-', '');
        icons[simpleName] = fs.readFileSync(path.join(dir, file)).toString('utf8');
    });

    return icons;
}

const getHttpsOptions = () => {
    try {
        return {
            key: fs.readFileSync(path.resolve('./server-ssl/default.key')),
            cert: fs.readFileSync(path.resolve('./server-ssl/default.crt')),
        }
    } catch (e) {
        console.warn(
            'Private key and certificate were not found. These are required for hot-module replacement. See server-ssl/README.md'
        );

        return false;
    }
}

const generateFullURL =  ({ host, protocol, port }: { host: string; protocol: string; port: number}) => {
    const url = new URL('https://site.example');
    url.protocol = protocol;
    url.hostname = host;
    url.pathname = '/';
    url.port = port.toString();

    return url;
}

export default defineConfig(({ mode, command }) => {
    const env = loadEnv(mode, process.cwd(), ['CONFIG_', 'PANEL_']);
    const host = env.CONFIG_SERVER_HOST || 'demo-add-on.cloud-panel.aboutyou.test';
    const https = getHttpsOptions();
    const port = Number(env.CONFIG_SERVER_PORT || 8082);
    const serverOptions = {
        cors: {
            allowedHeaders: '*',
        },

        https,
        host,
        port,
    };
    const serverUrl = generateFullURL({
        host,
        port,
        protocol: https ? 'https' : 'http',
    });
    const shadowDomExclusivePlugins = () => {
        if (env.PANEL_USE_SHADOW_DOM !== 'true') {
            return [];
        }

        return [
            aboutYouGlobalWindowEventLoader({ addOnId: env.PANEL_ADDON_IDENTIFIER }),
            aboutYouVueStyleLoader({
                command,
                shadowDomContainerSelector: '.single-spa-container',
                addOnId: env.PANEL_ADDON_IDENTIFIER,
                attributes: {
                    'data-add-on': env.PANEL_ADDON_IDENTIFIER,
                }
            }),
            aboutYouStyleLoader({
                external: ['element-plus'],
                shadowDomContainerSelector: '.single-spa-container',
                addOnId: env.PANEL_ADDON_IDENTIFIER,
                attributes: {
                    'data-add-on': env.PANEL_ADDON_IDENTIFIER,
                },
            }),
        ];
    }

    return {
        base: serverUrl.href,

        // vitest has an issue where
        // root option in test.root is ignored if this here is set
        // @link: https://github.com/vitest-dev/vitest/issues/2050
        root: mode === 'test' ? path.resolve(__dirname) : path.resolve(__dirname, 'src'),

        envPrefix: 'PANEL_',
        envDir: path.resolve(__dirname),

        server: {
            ...serverOptions,

            // Enable hot reloading
            hmr: true,
            origin: serverUrl.origin,
        },

        preview: {
            ...serverOptions
        },

        plugins: [
            tsconfigPathsPlugin({
                root: path.resolve(__dirname),
            }),
            vue({
                template: {
                    compilerOptions: {
                        whitespace: 'preserve',
                    }
                }
            }),
            // our exclusive plugins must go after vue
            ...shadowDomExclusivePlugins(),
            aboutYouAddonLoader(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            ComponentsPlugin({
                dts: true,
                resolvers: [
                    ElementPlusResolver(),
                    (componentName: string) => {
                        if (componentName.startsWith('Ay')) {
                            return {
                                name: componentName.slice(2),
                                from: '@scayle/components'
                            };
                        }
                    },
                    IconsResolver({
                        prefix: '',
                        alias: {
                            icon: 'panel',
                        },
                        customCollections: [
                            'panel',
                        ]
                    }),
                ],
            }),

            // Autoload icons
            IconsPlugin({
                compiler: 'vue3',
                defaultClass: 'icon',
                customCollections: {
                    panel: generatePanelIcons()
                }
            }),
        ],

        define: {
            'process.env.NODE_ENV': `'${mode}'`
        },

        build: {
            emptyOutDir: true,
            manifest: true,
            outDir: path.resolve(__dirname, 'dist'),
            rollupOptions: {
                preserveEntrySignatures: 'strict',
                input: {
                    manifest: path.resolve(__dirname, 'src/manifest.ts'),
                },
                output: {
                    entryFileNames: '[name].js',
                    format: 'system',
                },
            },
        },

        test: {
            environment: 'jsdom',
            deps: {
                inline: ['element-plus']
            },
            mockReset: true,
            setupFiles: path.resolve(__dirname, 'vitest-setup.ts'),
            include: ['src/**/*.unit.{js,ts}'],
            outputFile: 'junit.xml',
            reporters: ['default', 'junit'],
            coverage: {
                reporter: ['cobertura', 'text'],
                reportsDirectory: 'coverage',
                exclude: ['src/**/*.unit.{js,ts}'],
            },
        },
    };
})
