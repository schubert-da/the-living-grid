<script>
	import GalleryGrid from '$lib/components/GalleryGrid.svelte';

    export let data;
    // console.log("data", data);
</script>

<div class="grid-container flex flex-col items-center gap-5">
    <div class="title-content flex flex-col items-center gap-4 mb-5">
        <h1 class='text-center text-3xl sm:text-5xl font-bold'>The Grid</h1>
        <p class='text-center text-pretty max-w-[70ch] text-sm sm:text-xl'> This is a weird experiment because I wanted to document my travel a bit more. Each day the grid will randomly spawn new layouts, image filters and arrangements, but I won't know what it will look like until I start filling out the grid. </p>
        <p class='text-center text-pretty max-w-[70ch] text-sm sm:text-xl'>I'm also in Japan currently and have no way to fix this if it goes to hell... Enjoy!</p>
    </div>

    <GalleryGrid images={data.images} />
</div>