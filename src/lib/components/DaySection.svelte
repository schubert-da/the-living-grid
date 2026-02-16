<script>
    import { chosenTag } from "$lib/utils/stores.js";
    import { dailyRandom, aspectRatio, cardLayouts } from "$lib/utils/utils";
	import { onMount } from "svelte";
    import { base } from "$app/paths";
	import ImageCard from "./ImageCard.svelte";

    export let images = [];
    
    $: currentDate = images.length > 0 ? new Date(images[0].date) : null;
    $: formattedDate = currentDate ? {
        day: currentDate.getUTCDate(),                                  
        month: currentDate.toLocaleString("en-US", { month: "short" }),
        weekday: currentDate.toLocaleString("en-US", { weekday: "long" })
    } : '';

    $: layoutConfig = {}

    onMount(() => {
        let currentLayoutConfig = cardLayouts.map( layout => {
            return {value: layout, weight: dailyRandom(currentDate, `layout-${layout}`)}
        })
        currentLayoutConfig.sort((a, b) => a.weight - b.weight);
        layoutConfig = currentLayoutConfig;
    });
</script>

<section class="section p-2 sm:p-4 w-fit flex flex-col items-center gap-4 border border-neutral-400 rounded-lg bg-gray-100">
    <div class="title-content w-full items-center justify-between flex flex-row gap-4 border-b-3 border-b-neutral-500 pb-2">
        <div class="text-content items-center justify-start flex flex-row gap-1">
            <div class="date">
                <h2 class='text-[#555] text-[54px] sm:text-[72px]'>{formattedDate.day}</h2>
            </div>

            <div class="details">
                <h3 class='uppercase text-[#555] text-[20px] sm:text-[28px] font-semibold'>{formattedDate.month}</h3>
                <h3 class='uppercase text-[#686868] text-[20px] sm:text-[28px]'>{formattedDate.weekday}</h3>
            </div>
        </div>

        {#if images.length > 0}
            {@const firstImage = images[Math.floor(Math.random() * images.length)]}
            {@const secondImage = images[Math.floor(Math.random() * images.length)]}
            <div class="random-images h-full flex flex-row gap-1.5">
                <div class="h-full max-h-20 sm:max-h-25 border-2 rounded-lg border-neutral-500" style="aspect-ratio: {aspectRatio}">
                        <img
                            src={base + firstImage?.image}
                            alt={firstImage?.title || firstImage?.description}
                            class="h-full w-full object-cover"
                        />
                </div>

                {#if firstImage !== secondImage }
                    <div class="h-full max-h-20 sm:max-h-25 border-2 rounded-lg border-neutral-500" style="aspect-ratio: {aspectRatio}">
                            <img
                                src={base + secondImage?.image}
                                alt={secondImage?.title || secondImage?.description}
                                class="h-full w-full object-cover"
                            />
                    </div>
                {/if}
            </div>
        {/if}
    </div>
    
    <div class=" grid grid-cols-5 gap-1 mx-auto justify-center" >
        {#each [...images] as image, index}
            <ImageCard {image} {index} config={layoutConfig} />
        {/each}
    </div>
</section>

<style>
    section {
        box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    }

    .grid {
        grid-template-columns: repeat(5, min(0, 1fr));
        max-width: calc(5 * 200px);
    }

    @media (max-width: 768px) {
        .grid {
            grid-template-columns: repeat(4, minmax(0, 1fr))
        }
    }
    
    @media (max-width: 500px) {
        .grid {
            grid-template-columns: repeat(3, minmax(0, 1fr))
        }
    }
</style>