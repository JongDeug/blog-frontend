<script>
	import EditorJS from '$lib/components/EditorJS.svelte';

	export let data = {
		'time': 1550476186479,
		'blocks': [
			{
				'id': 'ficc',
				'type': 'header',
				'data': {
					'text': 'Why Telegram is the best messenger',
					'level': 2,
					'anchor': 'Anchor'
				}
			},
			{
				'type': 'image',
				'data': {
					'file': {
						'url': 'https://jongdeug.port0.org/uploads/na.jpg'
					},
					'caption': 'Roadster // tesla.com',
					'withBorder': false,
					'withBackground': false,
					'stretched': true
				}
			}
		],
		'version': '2.8.1'
	};

	const handleSave = (event) => {
		const data = event.detail;
		// I. Do something
		console.log(data);
	};
</script>

<EditorJS on:save={handleSave} {data} />
