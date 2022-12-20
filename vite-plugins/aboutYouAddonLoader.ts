import { nanoid } from 'nanoid';
import type { Plugin } from 'vite';

export default function aboutYouAddonLoader(): Plugin {
    const windowObjectName = `__VITE_ADDON_MANIFEST_REGISTRATION_${nanoid()}`;

    return {
        apply: 'serve',

        enforce: 'post',

        name: 'aboutyou-addon-loader',

        configureServer(server) {
            return () => {
                server.middlewares.use('/manifest.js', (req, res) => {
                    const url = server?.resolvedUrls?.local[0] || server?.resolvedUrls?.network[0] || '';
                    const code = `
                        System.register([], function(exports, module) {
                            "use strict";

                            return {
                                execute: function() {
                                    exports('default', (registerApplication, registerRoutes) => {
                                        const script = document.createElement('script');

                                        script.src = '${url}manifest.ts'
                                        script.setAttribute('type', 'module');
                                        document.body.appendChild(script);

                                        script.addEventListener('load', () => {
                                            console.log('Add-On loaded');
                                            window['${windowObjectName}'](registerApplication, registerRoutes);
                                        });

                                        script.addEventListener('error', () => {
                                            console.error('Cannot load Add-On');
                                        });
                                    });
                                }
                            };
                        });
                    `;
                    res.writeHead(200, {
                        'Content-Type': 'application/javascript'
                    });
                    res.write(code);
                    res.end();
                });
            }
        },

        transform(code, id) {
            if (!/manifest\.ts($|\?)/.test(id)) {
                return
            }

            return {
                code: code + `\nwindow['${windowObjectName}'] = manifestRegistration;\n`,
                moduleSideEffects: false,
            };
        }
    };
}
