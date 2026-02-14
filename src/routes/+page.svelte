<script>
	import GalleryGrid from '$lib/components/GalleryGrid.svelte';

    export let data;
    console.log("data", data);
</script>

<div class="grid-container flex flex-col items-center gap-10">
    <div class="title-content flex flex-col items-center gap-4">
        <h1 class='text-center text-3xl font-bold'>Japan Gallery grid</h1>
        <p class='text-center max-w-[80ch] text-balance'> I hate how often we document things for the sole purpose of sharing, how everything is curated for online consumption and any other form of capture seems less than.</p>
    </div>

    <GalleryGrid images={data.images} />
</div>