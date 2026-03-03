<script>
	import '../styles/app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { chosenTag, tagCounts } from "$lib/utils/stores";

	let { children } = $props();

    function toggleTag(tag) {
        if ($chosenTag === tag) {
            chosenTag.set(null);
        } else {
            chosenTag.set(tag);
        }
    }

	$effect(() => {
		if($chosenTag) {
			const element = document.querySelector(`.tag-${$chosenTag.replaceAll(" ", "-")}`);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
		}
	});
	
</script>


<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link href="https://fonts.googleapis.com/css2?family=Abel&family=Geist+Mono:wght@100..900&display=swap" rel="stylesheet">
</svelte:head>

{@render children()}

<div class="filters-bottom-bar w-fit max-w-full fixed -bottom-1 left-1/2 -translate-x-1/2 bg-gray-100 px-5 py-3 flex flex-row items-center gap-4 rounded-t-lg overflow-x-auto border border-neutral-400 z-50">
	<span class="label leading-none text-base sm:text-lg whitespace-nowrap">Filter by</span>

	<div class="tags-list">
			<div class="tags-filters flex flex-row items-center gap-2">
				{#each Object.entries($tagCounts).slice() as [tag, count]}
					<button class:selected={$chosenTag === tag} onclick={() => toggleTag(tag)} class="tag-filter whitespace-nowrap cursor-pointer bg-white hover:bg-gray-50 hover:shadow hover:scale-104 transition px-4 py-1.5 rounded-full border border-neutral-500 text-sm flex items-center gap-1">
						<span class='text-black'>
							{tag}({count})
						</span>
					</button>
				{/each}
			</div>
	</div>
</div>

<style>
	.filters-bottom-bar {
		box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
	}

    button.selected {
        background-color: var(--color-palette-yellow);
        color: white;
        border-color: #222;
        border-width: 2px;

        font-weight: 600;
    }
</style>