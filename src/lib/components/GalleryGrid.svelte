<script>
    export let images = [];
    const aspectRatio = 435 / 500; 
</script>

<div class="grid-container w-full flex justify-center">
    <div class="grid max-auto max-w-250 gap-0.5">
        {#each [...images, ...images] as image}
            <div class="grid-item" style="aspect-ratio: {aspectRatio}">
                <img  src={image.image} alt={image.title || image.description} class="w-full h-full object-cover" />
            </div>
        {/each}
    </div>
</div>

<style>
    .grid {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
</style>