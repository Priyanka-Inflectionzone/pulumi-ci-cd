<script lang="ts">
	import '../theme.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import Navbar from '$lib/components/navbar.svelte';
</script>

<body class="">
	<Navbar>
		<slot />
	</Navbar>
</body>
