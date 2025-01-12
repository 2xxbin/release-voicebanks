<script lang="ts">
	import { writable } from 'svelte/store';
	import type { IVoicebankCardData } from '../types/voicebank.js';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import { base } from '$app/paths';

	export let data;
	const voicebanks: IVoicebankCardData[] = data.voicebanks as IVoicebankCardData[];
	const columnCSS = writable(3);

	const updateColumnCount = () => {
		if (typeof window !== 'undefined') {
			const width = window.innerWidth;

			if (width < 640) {
				columnCSS.set(1); // xs
			} else if (width < 768) {
				columnCSS.set(2); // sm
			} else if (width < 1024) {
				columnCSS.set(3); // md
			} else {
				columnCSS.set(4); // lg
			}

			if (voicebanks.length <= 3 && $columnCSS !== 1) {
				if (voicebanks) {
					columnCSS.set(voicebanks.length);
				}
			}
		} else {
			columnCSS.set(3);
		}
	};

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', updateColumnCount);
			updateColumnCount();
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') window.removeEventListener('resize', updateColumnCount);
	});
</script>

<svelte:head>
	{#each voicebanks as voicebank}
		<link rel="preload" as="image" href="{base}{voicebank.illust}" />
	{/each}
</svelte:head>

<div class="flex flex-grow items-center justify-center">
	{#if voicebanks.length > 0}
		<div class="grid gap-6" style="grid-template-columns: repeat({$columnCSS}, minmax(0, 1fr));">
			{#each voicebanks as voicebank}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					class="group relative flex aspect-[4/5] items-center justify-center sm:w-[300px] md:h-[500px] md:w-[400px]"
					tabindex="0"
					role="button"
					onclick={() => goto(`${base}/${voicebank.id}`)}
				>
					<img
						src="{base}{voicebank.illust}"
						alt={voicebank.name.kor}
						class="z-1 contrast-60 duration-50 absolute inset-0 h-full w-full object-cover brightness-0 grayscale filter transition-opacity ease-in-out group-hover:opacity-0"
					/>
					<span
						class="duration-50 text-center text-3xl font-bold opacity-0 transition-opacity ease-in group-hover:opacity-100"
					>
						{voicebank.name.kor}<br />{voicebank.name.eng}
					</span>
				</div>
			{/each}
		</div>
	{/if}
</div>
