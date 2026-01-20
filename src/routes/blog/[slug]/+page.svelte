<script module lang="ts">
	export interface Article {
		slug: string;
		created_on: string;
		title: string;
		short_quote: string;
		tags: string[];
		published_at: string | null;
		text: string;
		category: string;
		cover_image: {
			uri: string;
			alt: string;
		};
	}
</script>

<script lang="ts">
	import '$lib/scss/pages/_blogs.scss';
	import Share from '$lib/components/Share/Share.svelte';

	import Tag from '$lib/components/Tag/Tag.svelte';
	import moment from 'moment';
	import { marked, type RendererObject } from 'marked';
	import DOMPurify from 'dompurify';

	const customRenderer: RendererObject = {
		heading({ tokens, depth }): string {
			const text = this.parser.parseInline(tokens);
			return `<h${depth === 1 ? 2 : depth}${depth === 1 ? ` class="heading-${depth} content-element"` : ` class="content-element heading-${depth}"`}>${text}</h${depth === 1 ? 2 : depth}>`;
		},
		link({ tokens, href, title }): string {
			const text = this.parser.parseInline(tokens);
			return `<a href="${href}" title="${title ? title : href}" target="_blank" class="content-element">${text}</a>`;
		},

		paragraph({ tokens }): string {
			const text = this.parser.parseInline(tokens);
			if (text.startsWith('<img')) {
				return `<p class="content-image">${text}</p>`;
			}
			return `<p>${text}</p>`;
		},
		// list({ ordered, items }): string {
		// 	// console.log(items);
		// 	const list_tag = ordered ? 'ol' : 'ul';
		// 	return `<${list_tag}>${items.map((item) => {
		// 		console.log(item.text);
		// 		return this.listitem(item);
		// 	})}</${list_tag}>`;
		// },

		image({ href, title, text }): string {
			return `<img src="${href}" alt="${text}" title="${title || ''}" class="content-element" />`;
		}
	};

	marked.use({ renderer: customRenderer });

	const { data }: { data: { data: Article } } = $props();
	const mainData = $derived(data.data);
	const created_on = $derived.by(() => {
		return moment(mainData.created_on).format('MMM DD, YYYY');
	});

	let purified_html = $state<string>('');
	$effect(() => {
		const dirty = marked.parse(mainData.text) as string;
		// console.log(dirty);
		purified_html = DOMPurify.sanitize(dirty);
	});
</script>

<!-- <Seo {media_url} siteSettings={{}} pageSettings={{}} /> -->
<section class="main__article content-grid py-9">
	<article id={`article-` + mainData.slug + '_' + mainData.published_at}>
		<div class="fl-row al-center gap-1 mb-3">
			<Tag variant="outline" color="accent" size="small">{created_on}</Tag>
			<!-- <span class="neutral-500">|</span> -->
			<Tag color="white" size="small">{mainData.category}</Tag>
		</div>
		<h1 class="heading-1 mb-4">{mainData.title}</h1>
		{#if mainData.cover_image}
			<img class="rounded-image" src={mainData.cover_image.uri} alt={mainData.cover_image.alt} />
		{/if}
		{#if mainData.tags.length > 0}
			<div class="fl-row gap-1 my-3">
				{#each mainData.tags as tag}
					<Tag variant="outline" color="light" size="small" curvature="large">{tag}</Tag>
				{/each}
			</div>
		{/if}
		<div class="grid-row jc-between ai-center mt-7 mb-7">
			<div class="col-4">
				<Share
					title={mainData.title}
					cover_image={mainData.cover_image.uri}
					addresses={['facebook', 'x', 'linkedin', 'pinterest', 'threads']}
				/>
			</div>
			<div class="col-8">
				<p class="medium-48">{mainData.short_quote}</p>
			</div>
		</div>
		<div class="article-content">
			{@html purified_html}
		</div>
	</article>
</section>
