import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import viteImagemin from '@vheemstra/vite-plugin-imagemin';
import imageminPngquant from 'imagemin-pngquant';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import imageminWebp from 'imagemin-webp';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import imageminAvif from 'imagemin-avif';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import imageminMozjpeg from 'imagemin-mozjpeg';

export default defineConfig({
	plugins: [
		viteImagemin({
			plugins: {
				png: imageminPngquant(),
				jpg: imageminMozjpeg()
			},
			makeWebp: {
				plugins: {
					jpg: imageminWebp(),
					png: imageminWebp()
				}
			},
			makeAvif: {
				plugins: {
					jpg: imageminAvif(),
					png: imageminAvif()
				}
			}
		}),
		sveltekit(),
		viteCompression({ algorithm: 'gzip', ext: 'gz' })
	],
	optimizeDeps: {
		include: ['@splidejs/splide', '@splidejs/svelte-splide']
	}
});
