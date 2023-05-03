<script lang="ts">
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import { faBars, faCircleUser, faMultiply } from '@fortawesome/free-solid-svg-icons';
	import { navbarMenu, type TabDefinition } from './navigation.tabs';
	import SettingMenu from './setting.menus.svelte';
	import { afterUpdate, onMount } from 'svelte';
	import { page } from '$app/stores';

	const navbarTabs: TabDefinition[] = navbarMenu();
	let activeTab = '';
	onMount(() => {
		activeTab = $page.url.pathname;
	});

	afterUpdate(() => {
		activeTab = $page.url.pathname;
	});

	function drawerLeftOpen(): void {
		const settings: DrawerSettings = {
			id: 'leftSidebar',
			position: 'left',
			width: '800px',
			bgDrawer: 'bg-primary-50 text-on-primary-token',
			bgBackdrop: 'bg-primary-500/50'
		};
		drawerStore.open(settings);
	};

	function drawerRightOpen(): void {
		const settings: DrawerSettings = {
			id: 'rightSidebar',
			position: 'right',
			width: '900px',
			bgDrawer: 'bg-primary-50 text-on-primary-token',
			duration: 300,
			bgBackdrop: 'bg-primary-500/50'
		};
		drawerStore.open(settings);
	};

	function drawerRightClose(): void {
		drawerStore.close();
	};

</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar
			gridColumns="grid-cols-3"
			background="bg-secondary-500"
			class="text-white"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
		>
			<svelte:fragment slot="lead">
				<div >
					<button class="hover:bg-primary-500 p-2 rounded-md" on:click={drawerLeftOpen}>
						<Fa icon={faBars} size="lg" />
					</button>
				</div>
				<div>
					<div class="flex-1 justify-start hidden lg:block ml-5">
						<ul class="menu menu-horizontal space-x-4">
							{#each navbarTabs as t}
								<a
									href={t.path}
									class="hover:bg-[#6c3dc2] hover:text-base-100 px-3 py-2 hover:no-underline rounded-md text-md font-medium {activeTab ==
									t.path
										? 'active: bg-primary-500 text-base-100'
										: 'text-base-100'}">{t.name}</a
								>
							{/each}
						</ul>
					</div>
				</div>
			</svelte:fragment>
			<div>
				<img class="block h-8 w-8 " src="/rean-logo-white.png" alt="REAN" />
			</div>
			<svelte:fragment slot="trail">
				<button class="hover:bg-primary-500 p-2 rounded-md" on:click={drawerRightOpen}>
					<Fa icon={faCircleUser} size="lg" />
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="footer">
		<footer class="text-center w-full fixed bottom-0 h-11 bg-primary-500">
			<a href="https://reanfoundation.org">
				<p
					class="mt-3 text-white text-sm hover:underline-offset-3 hover:underline decoration-indigo-500"
				>
					&#xa9; 2022 REAN Foundation
				</p></a
			>
		</footer>
	</svelte:fragment>
</AppShell>

<div class="w-[60%]">
	<Drawer>
		{#if $drawerStore.id === 'rightSidebar'}
			<SettingMenu on:click={drawerRightClose} />
		{:else if $drawerStore.id === 'leftSidebar'}
			<ul class="grid justify-center w-60 space-y-4 mt-5">
				{#each navbarTabs as t}
					<a
						href={t.path}
						class="hover:bg-surface-700  hover:text-base-100 p-2  hover:no-underline text-start no-underline rounded-md text-md font-medium {activeTab ==
						t.path
							? 'active: bg-surface-800 '
							: 'text-base-100'}">{t.name}</a
					>
				{/each}
			</ul>
		{:else}
			<p>(fallback contents)</p>
		{/if}
	</Drawer>
</div>
