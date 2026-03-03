<script>
    import { chosenTag } from "$lib/utils/stores";
    import { aspectRatio, weightedChoice, dailyRandom } from "$lib/utils/utils";
    import noiseImage from "$lib/assets/noise.jpeg";
	import { onMount } from "svelte";
    import { base } from "$app/paths";

    export let image = null
    export let index = null;
    export let config = null;

    $: chosenLayout = image?.date && Object.keys(config).length && index!==null ?  weightedChoice(new Date(image.date), 'image-' + index, config): null;

    function getCurvedPath() {
        const width = 100;
        const height = 20;

        const rand = (r) => dailyRandom(new Date(image.date), `rand-${index}`) * r;

        // baseline
        const baseY = height / 2;

        // force a small slope
        const slope = rand(3) + 0.5; // never zero
        const direction = dailyRandom(new Date(image.date), `direction-${index}`) < 0.5 ? -1 : 1;

        const yStart = baseY + slope * direction;
        const yEnd   = baseY - slope * direction;

        // gentle one-direction curve
        const curve = rand(2);

        const conrolPointsDirection = dailyRandom(new Date(image.date), `control-direction-${index}`);
        // control points on either side of the segment
        const arcSide1 = Math.min(yStart, yEnd) - curve;
        const arcSide2 = conrolPointsDirection < 0.75 ? Math.max(yStart, yEnd) + curve : arcSide1;

        const d = `
        M 0 ${yStart}
        C ${width * 0.33} ${arcSide1},
            ${width * 0.66} ${arcSide2},
            ${width} ${yEnd}
        `;

        return d;
    }

    const presets = ["filter-a", "filter-b", "filter-c", "filter-d"];
    $: presetRandom = image?.date ? dailyRandom(new Date(image.date), `preset-${index}`) : 0;
    $: preset = presetRandom > 0.8
        ? presets[Math.floor(((presetRandom - 0.8) / 0.2) * presets.length)]
        : null;
</script>

{#if image && chosenLayout}
    {@const randomValue = dailyRandom(new Date(image.date), `image-${index}`)}
    <div 
        class="image-card card-{chosenLayout} relative overflow-hidden w-full p-1.5 border border-neutral-400 rounded" style="aspect-ratio: {aspectRatio}">
        <figure
            style:--noise-url={`url(${noiseImage})`}
            class='relative {preset} w-full h-full object-cover rounded {image.tags.map( t => `tag-${t.replaceAll(" ", "-")}`).join(" ")}'
        >   
            <img
                class:not-selected={$chosenTag && !image?.tags.includes($chosenTag)}
                src={base + image.image}
                alt={image.title || image.description}
                class="relative w-full h-full object-cover rounded border border-neutral-400"
                loading="lazy"
            />
        </figure>

        {#if chosenLayout === 'regular-text'}
            <div
                class="text-content z-10 absolute bottom-0 left-1/2 -translate-x-1/2 bg-gray-100 w-full flex flex-col items-start gap-0.5 rounded p-1.5 py-0.5">
                <!-- <div class="text-[12px] font-semibold">{image.title}</div> -->
                <p class="text-[8px] sm:text-[12px]">{image?.description}</p>
            </div>
        {/if}
        
        {#if (chosenLayout === 'regular' || chosenLayout === 'swoosh') && randomValue < 0.75}
            <div 
                class="title-card absolute bottom-0.5 left-1/2 -translate-x-1/2 flex items-center justify-center bg-neutral-800 max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap px-2 py-1 rounded border border-neutral-500">
                <span class='whitespace-nowrap z-20 overflow-hidden text-ellipsis w-full max-w-full text-[8px] sm:text-[13px] text-white leading-none'>{image.title}</span>
            </div>
        {/if}

        {#if chosenLayout === 'swoosh'}
            {@const path = getCurvedPath()}
            <svg class='absolute top-0 left-1.5' width="calc(100% - 11.5px)" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path class='overlay' d={path} stroke="oklch(55.6% 0 0)" fill="transparent" stroke-width="0.7"/>
                <path class='base' d={path} stroke="white" fill="transparent" stroke-width="0.65"/>
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

    .image-card figure::after {
        content: "";
        position: absolute;
        inset: 0;
        background: var(--noise-url) repeat;
        opacity: 0.12;
        mix-blend-mode: multiply;
        z-index: 2;
        pointer-events: none;
    }
    
    .filter-a {
    position: relative;
    -webkit-filter: contrast(85%) brightness(110%) saturate(75%) sepia(22%);
    filter: contrast(85%) brightness(110%) saturate(75%) sepia(22%);
    }

    .filter-a::before {
    content: "";

    z-index: 1;    
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
    mix-blend-mode: soft-light;
    opacity: 0.5;
    background: rgba(173, 205, 239, 1);
    }

    .filter-b {
    position: relative;
    -webkit-filter: sepia(30%);
    filter: sepia(30%);
    }

    .filter-b::before {
    content: "";
    z-index: 1;
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
    mix-blend-mode: color-burn;
    background: -webkit-radial-gradient(50% 50%, circle closest-corner, rgba(224, 231, 230, 1) 40, rgba(43, 42, 161, 0.6));
    background: radial-gradient(50% 50%, circle closest-corner, rgba(224, 231, 230, 1) 40, rgba(43, 42, 161, 0.6));
    }

    .filter-c {
    position: relative;
    -webkit-filter: contrast(150%) brightness(90%);
    filter: contrast(150%) brightness(90%);
    }

.filter-c::before {
    content: "";
    z-index: 1;
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
    mix-blend-mode: screen;
    opacity: 0.5;
    background: -webkit-radial-gradient(50% 50%, circle closest-corner, rgba(15, 78, 128, 1) 1, rgba(59, 0, 59, 1));
    background: radial-gradient(50% 50%, circle closest-corner, rgba(15, 78, 128, 1) 1, rgba(59, 0, 59, 1));
}

.filter-d {
  position: relative;
  /* -webkit-filter: brightness(110%) saturate(160%) sepia(30%) hue-rotate(350deg);
  filter: brightness(110%) saturate(160%) sepia(30%) hue-rotate(350deg); */
}
.filter-d::before {
  content: "";
  z-index: 1;
  display: block;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0.3;
  background: rgba(204, 68, 0, 1);
}

.filter-e {
  position: relative;
  -webkit-filter: contrast(140%) sepia(50%);
  filter: contrast(140%) sepia(50%);
}
.filter-e::before {
  content: "";
  z-index: 1;
  display: block;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  pointer-events: none;
  mix-blend-mode: lighten;
  background: rgba(161, 44, 199, 0.31);
}
</style>