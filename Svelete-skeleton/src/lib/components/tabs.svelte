<script lang="ts">
  import { TabGroup, Tab } from '@skeletonlabs/skeleton';
  let tabSet: number = 0;
</script>


<TabGroup>
	<Tab bind:group={tabSet} name="tab1" value={0}><a href="/">Home</a></Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}> <a href="/table">KnowledgeNuggets</a></Tab>
	<Tab bind:group={tabSet} name="tab3" value={2}>Notification</Tab>

</TabGroup>
<!-- 			
<TabGroup>
	<svelte:fragment slot="panel">
	{#if tabSet === 0}
		<a href="/">Home</a>
	{:else if tabSet === 1}
		<a href="/table">KnowledgeNuggets</a>
	{:else if tabSet === 2}
		(tab panel 3 contents)
	{/if}
</svelte:fragment>
</TabGroup> -->
