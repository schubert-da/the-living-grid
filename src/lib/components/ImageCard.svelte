<script>
    import { chosenTag } from "$lib/utils/stores";
    import { aspectRatio, weightedChoice, dailyRandom } from "$lib/utils/utils";
	import { onMount } from "svelte";
    import { base } from "$app/paths";

    export let image = null
    export let index = null;
    export let config = null;

    $: chosenLayout = image?.date && Object.keys(config).length && index!==null ?  weightedChoice(new Date(image.date), 'image-' + index, config): null;

    function getCurvedPath() {
        const width = 100;
        const height = 20;

        const rand = (r) => Math.random() * r;

        // baseline
        const baseY = height / 2;

        // force a small slope
        const slope = rand(3) + 0.5; // never zero
        const direction = Math.random() < 0.5 ? -1 : 1;

        const yStart = baseY + slope * direction;
        const yEnd   = baseY - slope * direction;

        // gentle one-direction curve
        const curve = rand(2);

        // control points stay on one side of the whole segment
        const arcSide = Math.min(yStart, yEnd) - curve;

        const d = `
        M 0 ${yStart}
        C ${width * 0.33} ${arcSide},
            ${width * 0.66} ${arcSide},
            ${width} ${yEnd}
        `;

        return d;
    }
</script>

{#if image && chosenLayout}
    {@const randomValue = dailyRandom(new Date(image.date), `image-${index}`)}
    <div class="image-card card-{chosenLayout} relative overflow-hidden w-full p-1.5 border border-neutral-400 rounded" style="aspect-ratio: {aspectRatio}">
        <img
            class:not-selected={$chosenTag && !image?.tags.includes($chosenTag)}
            src={base + image.image}
            alt={image.title || image.description}
            class="w-full h-full object-cover rounded border border-neutral-400"
            loading="lazy"
        />
        
        {#if (chosenLayout === 'regular') && randomValue < 0.4}
            <div class="title-card absolute bottom-0.5 left-1/2 -translate-x-1/2 flex items-center justify-center bg-neutral-800 max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap px-2 py-1 rounded border border-neutral-500">
                <span class='whitespace-nowrap overflow-hidden text-ellipsis w-full max-w-full text-[8px] sm:text-[13px] text-white leading-none'>{image.title}</span>
            </div>

            {:else if chosenLayout === 'regular-text'}
            <div
                class="text-content absolute bottom-0 left-1/2 -translate-x-1/2 bg-gray-100 w-full flex flex-col items-start gap-0.5 rounded p-1.5 py-0.5">
                <div class="text-[12px] font-semibold">{image.title}</div>
                <p class="text-[12px]">{image?.description}</p>
            </div>

            {:else if chosenLayout === 'swoosh'}
            {@const path = getCurvedPath()}
            <svg class='absolute top-0 left-1.5' width="calc(100% - 11.5px)" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path class='overlay' d={path} stroke="oklch(55.6% 0 0)" fill="transparent" stroke-width="1"/>
                <path class='base' d={path} stroke="white" fill="transparent" stroke-width="0.85"/>
            </svg>
        {/if}
    </div>
{/if}

<style>
    .image-card {
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    }

    .image-card img.not-selected {
        filter: grayscale(100%) opacity(50%);
        transition: filter 0.3s ease;
    }
</style>