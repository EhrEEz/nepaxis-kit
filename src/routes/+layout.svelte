<script lang="ts">
	import '$lib/scss/styles.scss';
	import { navigating } from '$app/state';

	import Header from '$lib/components/Header.svelte';
	import favicon from '$lib/assets/logo.svg';
	import faviconDark from '$lib/assets/logo-dark.svg';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	let { children } = $props();

	let showLoader = $state(true);

	if (navigating)
		beforeNavigate(() => {
			showLoader = true;
		});
	afterNavigate(() => {
		showLoader = false;
	});
</script>

<svelte:head>
	<!-- Google Fonts API -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
		rel="stylesheet"
	/>

	<link rel="icon" href={favicon} type="image/svg+xml" media="(prefers-color-scheme: dark)" />
	<link rel="icon" href={faviconDark} type="image/svg+xml" media="(prefers-color-scheme: light)" />
</svelte:head>

<Header />

<main id="smooth-wrapper" class="content">
	<div id="smooth-content" class="content-grid smooth-content">
		{@render children()}
	</div>
</main>
{#if showLoader}
	<div id="loader" class="loading__screen">
		<div id="loader-percent" class="loading__value"></div>
		<canvas id="loading-matrix" class="loading__background"></canvas>
	</div>
{/if}
