// vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [
        dts({
            include: ['src/index.ts'],
            beforeWriteFile(filePath, content) {
                if (filePath.endsWith('index.d.ts')) {
                    return {
                        filePath: path.resolve(
                            path.dirname(filePath),
                            'ez-tip.d.ts'
                        ),
                        content
                    };
                }
                return { filePath, content };
            }
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'EzTip',
            fileName: 'ez-tip',
        },
        rollupOptions: {
            external: [],
            output: { globals: {} },
        },
        outDir: 'dist',
        emptyOutDir: true,
    },
});