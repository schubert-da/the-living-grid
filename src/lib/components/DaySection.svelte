<script>
    export let images = [];
    
    $: currentDate = images.length > 0 ? new Date(images[0].date) : null;
    $: formattedDate = currentDate ? {
        day: currentDate.getUTCDate(),                                  
        month: currentDate.toLocaleString("en-US", { month: "short" }),
        weekday: currentDate.toLocaleString("en-US", { weekday: "long" })
    } : '';
    
    const aspectRatio = 435 / 500; 
</script>

<section class="section p-2 sm:p-4 w-fit flex flex-col items-center gap-4 border border-neutral-400 rounded-lg">
    <div class="title-content w-full items-center justify-start flex flex-row gap-1">
        <div class="date">
            <h2 class='text-[#555] text-[72px]'>{formattedDate.day}</h2>
        </div>
        <div class="details">
            <h3 class='uppercase text-[#555] text-[28px] font-semibold'>{formattedDate.month}</h3>
            <h3 class='uppercase text-[#686868] text-[28px]'>{formattedDate.weekday}</h3>
        </div>
    </div>
    
    <div
  class=" grid grid-cols-5 gap-0.5 mx-auto justify-center
  "
>
  {#each [...images, ...images] as image}
    <div class="w-full" style="aspect-ratio: {aspectRatio}">
      <img
        src={image.image}
        alt={image.title || image.description}
        class="w-full h-full object-cover"
      />
    </div>
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