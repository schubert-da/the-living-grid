<script>
	import DaySection from "./DaySection.svelte";

    export let images = [];

    console.log('GalleryGrid images:', images);

    $: uploadeDates = images.length > 0 ? [...new Set(images.map(image => image.date.split("T")[0]))] : null;
    $: console.log('Unique upload dates:', uploadeDates);
</script>

<div class="grid-container w-full flex justify-center">
    {#each uploadeDates as date}
        {@const currentImages = images.filter(image => image.date.split("T")[0] === date)}
        <DaySection images={currentImages} />
    {/each}
</div>