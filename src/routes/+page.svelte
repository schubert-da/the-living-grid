<script>
	import GalleryGrid from '$lib/components/GalleryGrid.svelte';

    export let data;
    // console.log("data", data);
</script>

<div class="grid-container flex flex-col items-center gap-5">
    <div class="title-content flex flex-col items-center gap-4 mb-5">
        <h1 class='text-center text-3xl sm:text-5xl font-bold'>The Living Grid - Japan</h1>
        <p class='text-center text-pretty max-w-[80ch] text-sm sm:text-lg leading-[1.4]'> I like to document my travels capturing odd details that I find interesting - a bit of decor, how I feel in the moment, weird things that happened. The only place I would upload these photos would be Instagram, but the over time I learnt that I was starting to taking photos <em>for Instagram rather than myself</em> - stories, photos and reels all needed to look *a certain way* which to me felt forced and unnatural. </p>
        <p class='text-center text-pretty max-w-[80ch] text-sm sm:text-lg leading-[1.4]'>That's why this page exists - based on the date, photos are compressed, randomly layouts change and filters will be applied, leaving myself little control over how things look and instead lets me just take a <em>good enough</em> memory instead of repeatedly wasting time taking the "perfect picture" which I'd likely forget anyways. All I have to do is just fill out the grid and see how it turns out.</p>
        <p class='text-center text-pretty max-w-[80ch] text-sm sm:text-lg leading-[1.4]'>I'm also in Japan currently and have no way to fix this if it goes to hell... Enjoy!</p>
    </div>

    <GalleryGrid images={data.images} />
</div>