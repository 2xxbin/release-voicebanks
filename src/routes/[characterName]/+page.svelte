<script lang="ts">
	import type { IVoicebankData } from '../../types/voicebank';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import { type EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel';
	import { writable, type Writable } from 'svelte/store';

	import { base } from '$app/paths';

	export let data;
	const voicebankData: IVoicebankData = data.voicebankData as IVoicebankData;

	let emblaApi: EmblaCarouselType | undefined;
	const thisSlideIndex = writable(0);

	const currentVoicebankCategory1: Writable<string> = writable(
		Object.keys(voicebankData.voiceBanks)[0]
	);
	const currentVoicebankCategory2: Writable<string> = writable(
		Object.keys(voicebankData.voiceBanks[$currentVoicebankCategory1])[0]
	);

	const emblaOptions: EmblaOptionsType = {
		loop: true
	};

	function onInit(event: any) {
		emblaApi = event.detail;
		if (emblaApi) {
			emblaApi.on('select', () => {
				thisSlideIndex.set((emblaApi as EmblaCarouselType).selectedScrollSnap());
			});
		}
	}
</script>

<svelte:head>
	<link rel="preload" as="image" href="{base}{voicebankData.portrait}" />
	{#each Object.keys(voicebankData.voiceBanks) as category1}
		{#each Object.keys(voicebankData.voiceBanks[category1]) as category2}
			<link
				rel="preload"
				as="image"
				href="{base}{voicebankData.voiceBanks[category1][category2].illust}"
			/>
		{/each}
	{/each}
</svelte:head>

<main class="flex-grow">
	<div class="flex w-full flex-col-reverse justify-center md:flex-row">
		<img
			class="mt-12 object-contain md:mt-0 md:w-[30%]"
			src="{base}{voicebankData.portrait}"
			alt="{voicebankData.engName} portrait"
		/>
		<div class="w-full md:ml-16 md:w-1/3">
			<div class="mt-4 flex items-center">
				<h1 class="text-4xl font-bold">{voicebankData.korName}</h1>
				<span class="mx-4">|</span>
				<h2 class="text-xl">{voicebankData.engName}</h2>
			</div>

			<div class="mt-2">
				{#each voicebankData.hashTag as tag}
					<span class="mr-2">#{tag}</span>
				{/each}
			</div>

			<ul class="mt-6 leading-8">
				<li>나이 : {voicebankData.age}</li>
				<li>키 : {voicebankData.height}cm</li>
				<li>몸무게 : {voicebankData.weight}kg</li>
				<li>좋아하는 것 : {voicebankData.like.join(', ')}</li>
				<li>싫어하는 것 : {voicebankData.unLike.join(', ')}</li>
			</ul>

			<div class="my-10">
				{#each voicebankData.description as desc}
					<p class="leading-6">{desc}</p>
				{/each}
			</div>

			<a
				class="cursor-pointer text-2xl font-bold underline"
				href={voicebankData.teamForUseLink}
				target="_blank">TEAM FOR USE</a
			>

			<div class="mt-12">
				<div
					class="overflow-hidden"
					use:emblaCarouselSvelte={{
						options: emblaOptions,
						plugins: []
					}}
					onemblaInit={onInit}
				>
					<div class="flex">
						{#each voicebankData.youtubeVideos as video}
							<div class="aspect-video min-w-0" style="flex: 0 0 100%;">
								<iframe
									class="aspect-video h-full"
									src="https://www.youtube.com/embed/{video}"
									title="{video} player"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									referrerpolicy="strict-origin-when-cross-origin"
									allowfullscreen
								></iframe>
							</div>
						{/each}
					</div>
				</div>

				<div class="mt-4 flex w-full justify-center">
					{#each voicebankData.youtubeVideos as id, index (id)}
						<button
							aria-label={id}
							class="mx-1 h-3 rounded-full transition-all duration-300 ease-in-out"
							class:bg-gray-200={index !== $thisSlideIndex}
							class:bg-blue-400={index === $thisSlideIndex}
							class:w-3={index !== $thisSlideIndex}
							class:w-6={index === $thisSlideIndex}
							onclick={() => emblaApi?.scrollTo(index)}
						></button>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="flex w-full flex-col">
		<div>
			<div class="flex w-full justify-center font-sans text-2xl">
				{#each Object.keys(voicebankData.voiceBanks) as voicebankCategory1, index}
					<button
						class="font-bold text-gray-500"
						class:text-black={voicebankCategory1 === $currentVoicebankCategory1}
						class:underline={voicebankCategory1 === $currentVoicebankCategory1}
						onclick={() => currentVoicebankCategory1.set(voicebankCategory1)}
						>{voicebankCategory1}</button
					>
					{#if index !== Object.keys(voicebankData.voiceBanks).length - 1}
						<span class="mx-6">|</span>
					{/if}
				{/each}
			</div>

			<div class="mt-4 flex w-full flex-wrap justify-center font-sans text-xl">
				{#if $currentVoicebankCategory1}
					{#each Object.keys(voicebankData.voiceBanks[$currentVoicebankCategory1]) as voicebankCategory2}
						<button
							class="mx-6 my-2 whitespace-nowrap font-semibold text-gray-500"
							class:text-black={voicebankCategory2 === $currentVoicebankCategory2}
							class:underline={voicebankCategory2 === $currentVoicebankCategory2}
							onclick={() => currentVoicebankCategory2.set(voicebankCategory2)}
							>{voicebankCategory2}</button
						>
					{/each}
				{/if}
			</div>

			{#if $currentVoicebankCategory1 && $currentVoicebankCategory2}
				<div class="mt-16 w-full grid-cols-1 grid-rows-2 md:grid md:grid-cols-2">
					<div class="row-start-1 row-end-3 flex justify-end md:pr-6">
						<img
							class="mb-4 w-full md:mb-0 md:w-2/3"
							src="{base}{voicebankData.voiceBanks[$currentVoicebankCategory1][
								$currentVoicebankCategory2
							].illust}"
							alt={voicebankData.voiceBanks[$currentVoicebankCategory1][$currentVoicebankCategory2]
								.name}
							loading="lazy"
						/>
					</div>
					<div class="pt-4 md:pl-6">
						<h3 class="text-3xl font-bold">
							{voicebankData.voiceBanks[$currentVoicebankCategory1][$currentVoicebankCategory2]
								.name}
						</h3>

						<div class="mt-8 leading-loose">
							{#each voicebankData.voiceBanks[$currentVoicebankCategory1][$currentVoicebankCategory2].explaination as explaination}
								<p>{explaination}</p>
							{/each}
						</div>

						<ul class="my-8 leading-loose">
							{#each voicebankData.voiceBanks[$currentVoicebankCategory1][$currentVoicebankCategory2].staff as staff}
								<li>
									{staff.position} :: {staff.name}&nbsp; (<a
										href={staff.contact.link}
										target="_blank">{staff.contact.text}</a
									>)
								</li>
							{/each}
						</ul>

						<a
							class="und text-2xl font-bold"
							href={voicebankData.voiceBanks[$currentVoicebankCategory1][$currentVoicebankCategory2]
								.downloadLink}
							target="_blank">DOWNLOAD LINK</a
						>
					</div>
					<div class="pt-8 md:pl-6 md:pt-4">
						<iframe
							class="aspect-video w-full md:w-2/3"
							src="https://www.youtube.com/embed/{voicebankData.voiceBanks[
								$currentVoicebankCategory1
							][$currentVoicebankCategory2].demoYoutubes}"
							title="{voicebankData.voiceBanks[$currentVoicebankCategory1][
								$currentVoicebankCategory2
							].demoYoutubes} player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerpolicy="strict-origin-when-cross-origin"
							allowfullscreen
						></iframe>
					</div>
				</div>
			{/if}
		</div>
	</div>
</main>
