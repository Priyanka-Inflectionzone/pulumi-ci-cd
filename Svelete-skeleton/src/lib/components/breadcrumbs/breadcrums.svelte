<script>
  import Fa from 'svelte-fa';
  import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
  export let crumbs;

</script>

<!-- <div
  class=" breadcrumbs overflow-x-auto lg:text-xl sm:text-lg text-md text-secondary lg:ml-14 md:ml-10 sm:ml-6 lg:mt-2 sm:mt-4 mt-5 ml-4"
>
  <ul>
    {#each crumbs as crumb}
      <li><a href={crumb.path} class="text-secondary">{crumb.name}</a></li>
    {/each}
  </ul>
</div> -->
<!-- <div
  class=" breadcrumbs overflow-x-auto lg:text-xl sm:text-lg text-md text-secondary lg:ml-14 md:ml-10 sm:ml-6 lg:mt-2 sm:mt-4 mt-5 ml-4"
> -->
<ol class="breadcrumb text-primary-500 mt-10 ml-3">
  {#each crumbs as crumb, i}
    {#if i < crumbs.length - 1}
      <li class="crumb"><a href={crumb.link}>{crumb.label}</a></li>
      <li class="crumb-separator" aria-hidden>
        <Fa icon={faAngleRight} size = 'md' class='text-primary-500 font-bold'/>
      </li>
    {:else}
      <li class="crumb">{crumb.label}</li>
    {/if}
  {/each}
</ol>
<!-- </div> -->