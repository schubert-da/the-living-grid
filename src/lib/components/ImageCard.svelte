<script>
    import { chosenTag } from "$lib/utils/stores";
    import { aspectRatio, weightedChoice } from "$lib/utils/utils";
	import { onMount } from "svelte";

    export let image = null
    export let index = null;
    export let config = null;

    $: console.log("chosenLayout", chosenLayout)

    $: chosenLayout = image?.date && Object.keys(config).length && index!==null ?  weightedChoice(new Date(image.date), 'image-' + index, config): null;
</script>

{#if image && chosenLayout}
    <div class="w-full" style="aspect-ratio: {aspectRatio}">
        <img
            class:not-selected={$chosenTag && !image?.tags.includes($chosenTag)}
            src={image.image}
            alt={image.title || image.description}
            class="w-full h-full object-cover"
        />
    </div>
{/if}