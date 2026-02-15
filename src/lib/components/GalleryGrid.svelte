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
        grid-template-columns: repeat(5, min(200px, 16vw));
    }

    @media (max-width: 768px) {
        .grid {
            grid-template-columns: repeat(4, min(200px, 21vw));
        }
    }
    
    @media (max-width: 500px) {
        .grid {
            grid-template-columns: repeat(3, min(200px, 30vw));
        }
    }
</style>