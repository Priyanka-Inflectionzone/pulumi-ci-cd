<script lang="ts">
	// import { InputChip } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { ConicGradient } from '@skeletonlabs/skeleton';
	import { browser } from '$app/environment';
	import type { ConicStop } from '@skeletonlabs/skeleton';
	import { InputChip } from '@skeletonlabs/skeleton';
	// import InputChip from '$lib/components/tags.svelte';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { Table } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';

	
	let flavorsList = ['vanilla', 'chocolate', 'strawberry'];
	
	let valueSingle: string = 'books';
const conicStops: ConicStop[] = [
	{ color: 'red', start: 0, end: 50 }, // 0-50% is red
	{ color: 'green', start: 50, end: 100 } // 50-100% is green
];

const sourceData = [
	{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
	{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
	{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
	{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
	{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
];

const tableSimple: TableSource = {
	// A list of heading labels.
	head: ['Name', 'Symbol', 'Weight'],
	// The data visibly shown in your table body UI.
	body: tableMapperValues(sourceData, ['name', 'symbol', 'weight']),
	// Optional: The data returned when interactive is enabled and a row is clicked.
	meta: tableMapperValues(sourceData, ['position', 'name', 'symbol', 'weight']),
	// Optional: A list of footer labels.
	// foot: ['Total', '', '<code>31.7747</code>']
};

let page = {
	offset: 0,
	limit: 5,
	size: sourceData.length,
	amounts: [1,2,5,10],
};

$: paginatedSource = sourceData.slice(
	page.offset * page.limit,             // start
	page.offset * page.limit + page.limit // end
);
function onPageChange(e: CustomEvent): void {
	console.log('event:page', e.detail);
}

function onAmountChange(e: CustomEvent): void {
	console.log('event:amount', e.detail);
}

tableMapperValues(sourceData, ['name', 'symbol', 'weight'])

//	[
//		['Hydrogen', 'H', '1.0079'],
//		['Helium', 'He', '4.0026'],
//		...
//	]
				
//for drawer

function drawerOpen(): void {
	drawerStore.open();
}
	
function drawerClose(): void {
	drawerStore.close();
}
					
</script>

<form
method="post"
action=""
class="w-full bg-tertiary-500 p-5 lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
>
	<label class="label mb-2">
		<span>Label Text</span>
		<input type='text' class="input text-primary-500 mb-2 pl-5 ">
	</label>
	<InputChip class="w-full mb-3" chips="variant-filled-error rounded-2xl" name="chips" bind:value={flavorsList} />

	<input type='text' class="input mb-2">
	<select class="select mb-2">
		<option class="" value="">1</option>
		<option value="">2</option>
		<option value="">3</option>
		<option value="">4</option>
	</select>
	<textarea class="textarea" />
	<button class="btn variant-filled-primary">Skeleton</button>
	<button class="btn variant-ringed-primary">Skeleton</button>
	<!-- <ConicGradient stops={conicStops}>(caption)</ConicGradient> -->
</form>
<!-- <input class="input text-primary-500 mb-2  pl-5"> -->
<!-- <Table color="bg-tertiary-500" regionHead ='text-white bg-primary-500' source={tableSimple} interactive={true} 
 >
 <ul>
	{#each paginatedSource as row}
		<li>{row}</li>
	{/each}
</ul>
</Table> -->
<!-- <div class="table-container">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Position</th>
				<th>Name</th>
				<th>Symbol</th>
				<th>Weight</th>
			</tr>
		</thead>
		<tbody>
			{#each paginatedSource as row, i}
				<tr>
					<td>{row.position}</td>
					<td>{row.name}</td>
					<td>{row.symbol}</td>
					<td>{row.weight}</td>
				</tr>
			{/each}
		</tbody>
	
	</table>
</div> -->
<!-- <Table source={tableSimple} interactive={true}  /> -->
<!-- <Paginator  on:page={onPageChange} on:amount={onAmountChange} bind:settings={page}></Paginator> -->
<!-- {#if paginatedSource.pagination}<Paginator class="mt-3" bind:settings={$dataTableStore.pagination} />{/if} -->
<Drawer />

