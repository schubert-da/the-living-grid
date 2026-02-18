<script>
	import DaySection from "./DaySection.svelte";
    import { chosenTag, tagCounts } from "$lib/utils/stores";

    export let images = [];

    // console.log('GalleryGrid images:', images);

    $: uploadeDates = images.length > 0 ? [...new Set(images.map(image => image.date.split("T")[0]))] : null;
    $: tags = images.length > 0 ? [...new Set(images.flatMap(image => image.tags))] : null;

    $: if(images?.length > 0) {
        let counts = {};
        images.forEach(image => {
            image.tags.forEach(tag => {
                counts[tag] = (counts[tag] || 0) + 1;
            });
        });

        counts = Object.fromEntries(Object.entries(counts).sort((a, b) => b[1] - a[1]));
        tagCounts.set(counts);
    }

    function toggleTag(tag) {
        if ($chosenTag === tag) {
            chosenTag.set(null);
        } else {
            chosenTag.set(tag);
        }
    }
</script>

<div class="tags-filters flex flex-row w-full max-w-full overflow-x-auto items-center gap-2">
    {#each Object.entries($tagCounts).slice(0, 5) as [tag, count]}
        <button class:selected={$chosenTag === tag} on:click={() => toggleTag(tag)} 
            class="tag-filter whitespace-nowrap cursor-pointer bg-white hover:bg-gray-50 hover:shadow hover:scale-104 transition px-4 py-1.5 rounded-full border border-neutral-500 text-sm flex items-center gap-1"
        >
            <span class='text-black'>
                {tag}({count})
            </span>
        </button>
    {/each}
</div>

<div class="grid-container w-full flex flex-col gap-5 items-center justify-center">
    {#each [...uploadeDates].sort((a, b) => new Date(a) - new Date(b)) as date}
        {@const currentImages = images.filter(image => image.date.split("T")[0] === date)}
        <DaySection images={currentImages} />
    {/each}
</div>

<style>
    button.selected {
        background-color: var(--color-palette-yellow);
        color: white;
        border-color: #222;
        border-width: 2px;

        font-weight: 600;
    }
</style>
