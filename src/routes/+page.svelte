<script lang="ts">
  import Navbar from "./components/Navbar.svelte";
  import BottomNav from "./components/BottomNav.svelte";

  const featuredMovies = [
    { 
      title: "Featured Movie", 
      subtitle: "Editor's Choice",
      description: "Discover today's top pick",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    { 
      title: "Trending Now", 
      subtitle: "Most Popular",
      description: "What everyone's watching",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    { 
      title: "New Release", 
      subtitle: "Just Added",
      description: "Fresh content for you",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];
</script>

<Navbar />

<main class="main-content">
  <!-- Hero Section -->
  <section class="hero-section">
    <div class="hero-content">
      <h1 class="hero-title">Welcome to IMDB</h1>
      <p class="hero-subtitle">Discover amazing movies and shows</p>
      <div class="hero-buttons">
        <a href="/search" class="btn btn-primary">Search Movies</a>
        <a href="/randomise" class="btn btn-secondary">Random Pick</a>
      </div>
    </div>
  </section>

  <!-- Featured Movies Section -->
  <section class="featured-section">
    <h2 class="section-title">Featured Today</h2>
    <div class="movie-grid">
      {#each featuredMovies as movie, index}
        <div class="movie-card" style="background: {movie.gradient}">
          <div class="movie-content">
            <span class="movie-subtitle">{movie.subtitle}</span>
            <h3 class="movie-title">{movie.title}</h3>
            <p class="movie-description">{movie.description}</p>
            <button class="movie-btn">Explore</button>
          </div>
          <div class="movie-number">{index + 1}</div>
        </div>
      {/each}
    </div>
  </section>

  <!-- Quick Actions Section -->
  <section class="actions-section">
    <h2 class="section-title">Quick Actions</h2>
    <div class="actions-grid">
      <a href="/search" class="action-card">
        <div class="action-icon">🔍</div>
        <h3>Search</h3>
        <p>Find specific movies</p>
      </a>
      <a href="/randomise" class="action-card">
        <div class="action-icon">🎲</div>
        <h3>Random</h3>
        <p>Surprise me!</p>
      </a>
      <a href="/login" class="action-card">
        <div class="action-icon">👤</div>
        <h3>Account</h3>
        <p>Sign in or register</p>
      </a>
    </div>
  </section>
</main>

<BottomNav />

<style>
  /* Global Styles */
  .main-content {
    min-height: calc(100vh - 130px);
    padding-bottom: 60px; /* Space for bottom nav */
  }

  /* Hero Section */
  .hero-section {
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 60px 20px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    pointer-events: none;
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .hero-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  .hero-subtitle {
    font-size: clamp(1.1rem, 3vw, 1.4rem);
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .hero-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn {
    padding: 12px 24px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    display: inline-block;
    border: 2px solid transparent;
  }

  .btn-primary {
    background: white;
    color: #1e3c72;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255,255,255,0.3);
  }

  .btn-secondary {
    background: transparent;
    color: white;
    border-color: white;
  }

  .btn-secondary:hover {
    background: white;
    color: #1e3c72;
    transform: translateY(-2px);
  }

  /* Featured Section */
  .featured-section {
    padding: 60px 20px;
    background: #f8f9fa;
  }

  .section-title {
    text-align: center;
    font-size: clamp(2rem, 4vw, 2.5rem);
    margin-bottom: 3rem;
    color: #333;
    font-weight: 700;
  }

  .movie-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .movie-card {
    border-radius: 20px;
    padding: 2rem;
    color: white;
    position: relative;
    overflow: hidden;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }

  .movie-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  }

  .movie-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .movie-card:hover::before {
    opacity: 1;
  }

  .movie-content {
    position: relative;
    z-index: 2;
  }

  .movie-subtitle {
    font-size: 0.9rem;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .movie-title {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    margin: 0.5rem 0;
  }

  .movie-description {
    opacity: 0.9;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  .movie-btn {
    background: rgba(255,255,255,0.2);
    border: 1px solid rgba(255,255,255,0.3);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .movie-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: scale(1.05);
  }

  .movie-number {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    background: rgba(255,255,255,0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    backdrop-filter: blur(10px);
  }

  /* Actions Section */
  .actions-section {
    padding: 60px 20px;
    background: white;
  }

  .actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .action-card {
    background: white;
    border: 2px solid #f0f0f0;
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    text-decoration: none;
    color: #333;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .action-card:hover {
    border-color: #1e3c72;
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(30,60,114,0.1);
  }

  .action-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
  }

  .action-card:hover .action-icon {
    transform: scale(1.1);
  }

  .action-card h3 {
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .action-card p {
    color: #666;
    margin: 0;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .hero-section {
      padding: 40px 20px;
    }

    .featured-section,
    .actions-section {
      padding: 40px 20px;
    }

    .movie-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .actions-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .hero-buttons {
      flex-direction: column;
      align-items: center;
    }

    .btn {
      width: 200px;
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    .movie-card {
      min-height: 200px;
      padding: 1.5rem;
    }

    .action-card {
      padding: 1.5rem;
    }

    .section-title {
      margin-bottom: 2rem;
    }
  }

  /* Animation for smooth loading */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .movie-card,
  .action-card {
    animation: fadeInUp 0.6s ease forwards;
  }

  .movie-card:nth-child(1) { animation-delay: 0.1s; }
  .movie-card:nth-child(2) { animation-delay: 0.2s; }
  .movie-card:nth-child(3) { animation-delay: 0.3s; }

  .action-card:nth-child(1) { animation-delay: 0.1s; }
  .action-card:nth-child(2) { animation-delay: 0.2s; }
  .action-card:nth-child(3) { animation-delay: 0.3s; }
</style>


<!-- <script lang="ts">
  import Navbar from "./components/Navbar.svelte";
  import BottomNav from "./components/BottomNav.svelte";

  const movies = [
    { title: "Movie of the day" },
    { title: "Movie of the day" },
    { title: "Movie of the day" }
  ];
</script>

<Navbar />


<div class="container">
  <div class="movie-grid">
    {#each movies as movie}
      <div class="movie-box">
        <div class="movie-content">
          <p class="movie-title">{movie.title}</p>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
.container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  height: calc(100vh - 130px); 
  display: flex;
  align-items: center;
}

.movie-grid {
  display: flex;
  justify-content: space-between;
  gap: 3%;
  width: 100%;
  padding: 0 5%;
}

.movie-box {
  width: 30%;
  height: 70vh;
  border: 2px solid #000;
  display: flex;
  flex-direction: column;
}

.movie-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 10px;
}

.movie-title {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  text-align: center;
  font-size: 24px;
}

@media (max-width: 768px) {
  .movie-grid {
    flex-direction: column;
    align-items: center;
  }
  
  .movie-box {
    width: 90%;
    height: 30vh;
    margin-bottom: 20px;
  }
}
</style>

<BottomNav /> -->