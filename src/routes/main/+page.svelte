<script>
    import NavbarFav from "../components/NavbarFav.svelte";
    import BottomNav from "../components/BottomNav.svelte";
    import MovieCard from "../components/MovieCard.svelte";
</script>



<NavbarFav />

<main>
    <div class="grid">
        <MovieCard title="Shrek" />
        <MovieCard title="Inception" isFavorite={true} />
        <MovieCard title="Totoro" />
        <MovieCard title="Fight Club" />
    </div>
</main>

<BottomNav />

<style>
    main {
        padding: 2rem;
        display: flex;
        justify-content: center;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 1.5rem;
        max-width: 800px;
        width: 100%;
    }
</style>





