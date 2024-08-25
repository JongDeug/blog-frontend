<script lang="ts">
    import {config} from '$lib/config';

    export let title = 'Main'
    export let description = config.description;
    export let author = config.author;
</script>

<svelte:head>
    <title>{title} | {config.title}</title>
    <meta name="description" content={description}/>
    <meta name="author" content={author}/>
</svelte:head>
