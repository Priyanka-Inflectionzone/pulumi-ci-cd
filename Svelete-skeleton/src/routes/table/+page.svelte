<script lang="ts">
	import {
		createDataTableStore,
		dataTableHandler,
	} from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	const sourceData = [
		{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
		{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
		{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
		{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
		{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
		{ position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
		{ position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
		{ position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
		{ position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
		{ position: 10, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
		{ position: 11, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
		{ position: 12, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
		{ position: 13, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
		{ position: 14, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
		{ position: 15, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
		{ position: 16, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
		{ position: 17, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
		{ position: 18, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
		{ position: 19, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
		{ position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
	];

	const dataTableStore = createDataTableStore(
		// Pass your source data here:
		sourceData,
		// Provide optional settings:
		{
			// The current search term.
			search: '',
			// The current sort key.
			sort: '',
			// Paginator component settings.
			pagination: { offset: 0, limit: 10, size: 0, amounts: [5, 10, 20, 50] }
		}
	);

	// This automatically handles search, sort, etc when the model updates.
	dataTableStore.subscribe((model) => dataTableHandler(model));

	// dataTableStore.updateSource(newSourceData)

	const breadCrumbs = [
		{ label: 'Home', link: '/' },
		{ label: 'Table', link: '/table' }
	];
	// console.log('myBreadcrumbs', myBreadcrumbs);
</script>

<!-- <div class=""> -->

	<BreadCrumbs crumbs={breadCrumbs} />
	<!-- </div>		 -->
	<!-- <div class="h-screen"> -->
	<div class="mx-10 mb-16">
	<input
		class="input my-3"
		bind:value={$dataTableStore.search}
		type="search"
		placeholder="Search..."
	/>

	<div class="h-[650px] bg-tertiary-500">
		<div class="table-container h-[650px]">
			<table class="table table-hover h-[650px] w-full">
				<thead class="">
					<tr class="sticky top-0">
						<th style="width: 10%;">Id</th>
						<th style="width: 30%;">Name</th>
						<th style="width: 30%;">Weight</th>
						<th style="width: 30%;">symbol</th>
						<!-- ... --->
					</tr>
				</thead>
				<tbody class="">
					{#each $dataTableStore.filtered as row, rowIndex}
						<tr>
							<!-- <td>{rowIndex }</td> -->
							<td>{row.position}</td>
							<td>{row.name}</td>
							<td>{row.weight}</td>
							<td>{row.symbol}</td>
							<!-- ... --->
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
	<!-- <div
      class=" border-t lg:flex sm:flex md:flex flex-col w-full bg-[#7165E3] h-auto  pl-6 pt-2 rounded-b-lg mb-12 items-center xs:justify-between md:mr-5 sm:mr-5 mr-4"
    > -->

	<!-- </div> -->
	<div class=" border-t w-full bg-secondary-500 h-16 mb-10 rounded-b-lg ">
		{#if $dataTableStore.pagination}<Paginator
				class="mt-2 mr-3"
				buttonClasses="bg-white"
				text="text-white"
				justify="lg:justify-end md:justify-center sm:justify-start justify-start"
				select="text-primary-500 rounded-lg"
				bind:settings={$dataTableStore.pagination}
			/>{/if}
	</div>
</div>
<!-- </div> -->
