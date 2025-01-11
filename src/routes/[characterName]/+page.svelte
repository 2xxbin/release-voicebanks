<script lang="ts">
	import type { IVoicebankData } from '../../types/voicebank.js';
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import { type EmblaCarouselType, type EmblaOptionsType } from 'embla-carousel';
	import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';
	import { writable } from 'svelte/store';

	export let data;
	const voicebankData: IVoicebankData = data.voicebankData as IVoicebankData;

	let emblaApi: EmblaCarouselType | undefined;
	const thisSlideIndex = writable(0);

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

<main class="flex-grow">
	<div class="flex w-full flex-col-reverse justify-center md:flex-row">
		<img
			class="mt-12 object-contain md:mt-0 md:w-[30%]"
			src={voicebankData.portrait}
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

			<ul class="mb-8 mt-6 leading-8">
				<li>나이 : {voicebankData.age}</li>
				<li>키 : {voicebankData.height}</li>
				<li>몸무게 : {voicebankData.weight}</li>
				<li>좋아하는 것 : {voicebankData.like.join(', ')}</li>
				<li>싫어하는 것 : {voicebankData.unLike.join(', ')}</li>
			</ul>

			<div class="mt-2">
				{#each voicebankData.description as desc}
					<p class="leading-6">{desc}</p>
				{/each}
			</div>

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
</main>
