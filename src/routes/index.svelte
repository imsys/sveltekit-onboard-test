<script lang='ts'>
import Onboard from 'bnc-onboard';
import type { API } from 'bnc-onboard/dist/src/interfaces';
import { onMount } from 'svelte';

let onboard: API;

onMount(()=>{
    onboard = Onboard({
      networkId: 1,
      walletSelect: {
        wallets: [
          { walletName: 'metamask' },
          { walletName: "coinbase" },
        ]
      },
    })
})

const selectAndConnect = async () => {
    if (!onboard) return;

    await onboard.walletSelect();
    await onboard.walletCheck();
}

</script>


<main>

<h1>Testing Onboard on SvelteKit</h1>

<button on:click={selectAndConnect}>Select Wallet and Connect</button>


</main>

<style>

main {
    text-align: center;
    margin-top: 20vh;
}

button {
    padding: 1rem;
    background: #eef9ec;
    border-radius: 1rem;
    border: 2px solid #8cbef2;
}

</style>