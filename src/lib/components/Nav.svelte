<script lang="ts">
  import RouteIcon from '$lib/components/RouteIcon.svelte';
  import { page } from '$app/stores';
  import { signInWithGoogle } from '$lib/firebase';
  import { getAuthState } from '$lib/stores/auth.svelte';
  let auth = $derived(getAuthState());
  let signInError = $state('');
  async function signIn() {
    try { await signInWithGoogle(); signInError = ''; }
    catch { signInError = 'Sign-in did not finish. You can still play on this device.'; }
  }
</script>
<header class="expedition-header">
  <a class="expedition-brand" href="/" aria-label="Kotsu home"><span lang="ja">コツ</span><b>kotsu</b></a>
  <nav aria-label="Main navigation">
    <a href="/" aria-current={$page.url.pathname === '/' || $page.url.pathname.startsWith('/journey/') ? 'page' : undefined}>Journey</a>
    <a href="/library" aria-current={$page.url.pathname === '/library' ? 'page' : undefined}>Field guide</a>
    <a href="/about" aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>About</a>
  </nav>
  <div class="expedition-account">
    {#if auth.user}<a href="/profile">My profile <RouteIcon name="external" /></a>
    {:else}<button onclick={signIn}>Sign in <RouteIcon name="external" /></button>{/if}
  </div>
</header>
{#if signInError}<p class="account-error" role="alert">{signInError}</p>{/if}
