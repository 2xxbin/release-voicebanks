<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<header
		class="flex h-20 items-center justify-between px-8 font-sans sm:mb-12 sm:flex-col sm:justify-center sm:pt-8"
	>
		<a class="text-center text-xl font-bold sm:mb-2 sm:text-2xl" href="/{base}">2xxbin</a>
		<!-- <nav
			class="flex w-2/5 items-center justify-end font-semibold sm:w-full sm:justify-center md:font-medium"
		>
			{#each LANGS as lang, index}
				<a class="mx-4 text-center sm:text-sm" href={lang} aria-label="change lang to {lang}"
					>{lang.toUpperCase()}</a
				>
				{#if index != LANGS.length - 1}
					<span>|</span>
				{/if}
			{/each}
		</nav> -->
	</header>

	<main class="flex-1 px-6">{@render children()}</main>

	<footer class="my-12 flex w-full flex-col items-center">
		<hr class="mb-8 h-1 w-3/4 border-gray-300" />
		<nav class="font-medium [&_a]:mx-2 [&_a]:sm:text-sm">
			<a href="https://x.com/2xxbin" target="_blank" rel="noopener noreferrer">X</a>
			|
			<a href="https://www.youtube.com/@2xxbin" target="_blank" rel="noopener noreferrer">Youtube</a
			>
			|
			<a href="mailto:2xxbin1208@gmail.com" target="_blank" rel="noopener noreferrer">E-Mail</a>
			|
			<a href="https://github.com/2xxbin" target="_blank" rel="noopener noreferrer">Github</a>
		</nav>
		<p class="mt-6 break-keep text-center text-sm sm:text-xs">
			© 2024 2xxbin. All content, images, and designs are the property of 2xxbin. Unauthorized use
			is prohibited.
		</p>
	</footer>
</div>
