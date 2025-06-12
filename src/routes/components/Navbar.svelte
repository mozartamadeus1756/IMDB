<script>
    import { onMount } from 'svelte';
    
    let isMenuOpen = false;
    let isScrolled = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function closeMenu() {
        isMenuOpen = false;
    }

    onMount(() => {
        const handleScroll = () => {
            isScrolled = window.scrollY > 50;
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });
</script>

<nav class="navbar" class:scrolled={isScrolled}>
    <div class="navbar-container">
        <!-- Logo/Brand -->
        <div class="navbar-brand">
            <a href="/" class="brand-link" on:click={closeMenu}>
                <span class="brand-text">IMDB</span>
                <span class="brand-subtitle">Movies & Shows</span>
            </a>
        </div>

        <!-- Desktop Navigation -->
        <ul class="navbar-nav desktop-nav">
            <li class="nav-item">
                <a href="/" class="nav-link">
                    <span class="nav-icon">🏠</span>
                    <span class="nav-text">Home</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="/search" class="nav-link">
                    <span class="nav-icon">🔍</span>
                    <span class="nav-text">Search</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="/randomise" class="nav-link">
                    <span class="nav-icon">🎲</span>
                    <span class="nav-text">Random</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="/login" class="nav-link nav-link-cta">
                    <span class="nav-icon">👤</span>
                    <span class="nav-text">Sign In</span>
                </a>
            </li>
        </ul>

        <!-- Mobile Menu Button -->
        <button 
            class="mobile-menu-btn" 
            class:active={isMenuOpen}
            on:click={toggleMenu}
            aria-label="Toggle menu"
        >
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        </button>
    </div>

    <!-- Mobile Navigation -->
    <div class="mobile-nav" class:open={isMenuOpen}>
        <ul class="mobile-nav-list">
            <li class="mobile-nav-item">
                <a href="/" class="mobile-nav-link" on:click={closeMenu}>
                    <span class="nav-icon">🏠</span>
                    <span class="nav-text">Home</span>
                </a>
            </li>
            <li class="mobile-nav-item">
                <a href="/search" class="mobile-nav-link" on:click={closeMenu}>
                    <span class="nav-icon">🔍</span>
                    <span class="nav-text">Search</span>
                </a>
            </li>
            <li class="mobile-nav-item">
                <a href="/randomise" class="mobile-nav-link" on:click={closeMenu}>
                    <span class="nav-icon">🎲</span>
                    <span class="nav-text">Random</span>
                </a>
            </li>
            <li class="mobile-nav-item">
                <a href="/login" class="mobile-nav-link mobile-nav-cta" on:click={closeMenu}>
                    <span class="nav-icon">👤</span>
                    <span class="nav-text">Sign In</span>
                </a>
            </li>
        </ul>
    </div>
</nav>

<!-- Overlay for mobile menu -->
{#if isMenuOpen}
    <div class="mobile-overlay" on:click={closeMenu}></div>
{/if}

<style>
    .navbar {
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        color: white;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .navbar.scrolled {
        background: rgba(30, 60, 114, 0.95);
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    }

    .navbar-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 70px;
    }

    /* Brand/Logo */
    .navbar-brand {
        flex-shrink: 0;
    }

    .brand-link {
        color: white;
        text-decoration: none;
        display: flex;
        flex-direction: column;
        transition: transform 0.3s ease;
    }

    .brand-link:hover {
        transform: scale(1.05);
    }

    .brand-text {
        font-size: 1.8rem;
        font-weight: 700;
        line-height: 1;
        background: linear-gradient(45deg, #fff, #f0f8ff);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .brand-subtitle {
        font-size: 0.7rem;
        opacity: 0.8;
        line-height: 1;
        margin-top: -2px;
    }

    /* Desktop Navigation */
    .desktop-nav {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 0.5rem;
    }

    .nav-item {
        position: relative;
    }

    .nav-link {
        color: white;
        text-decoration: none;
        padding: 10px 16px;
        border-radius: 25px;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .nav-link::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s ease;
    }

    .nav-link:hover::before {
        left: 100%;
    }

    .nav-link:hover {
        background: rgba(255,255,255,0.1);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .nav-link-cta {
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.3);
    }

    .nav-link-cta:hover {
        background: rgba(255,255,255,0.2);
        border-color: rgba(255,255,255,0.5);
    }

    .nav-icon {
        font-size: 1.1rem;
    }

    .nav-text {
        font-weight: 500;
        font-size: 0.95rem;
    }

    /* Mobile Menu Button */
    .mobile-menu-btn {
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 8px;
    }

    .mobile-menu-btn:hover {
        background: rgba(255,255,255,0.2);
    }

    .hamburger-line {
        width: 20px;
        height: 2px;
        background: white;
        margin: 2px 0;
        transition: all 0.3s ease;
        border-radius: 2px;
    }

    .mobile-menu-btn.active .hamburger-line:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .mobile-menu-btn.active .hamburger-line:nth-child(2) {
        opacity: 0;
    }

    .mobile-menu-btn.active .hamburger-line:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    /* Mobile Navigation */
    .mobile-nav {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
        transform: translateY(-100%);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    }

    .mobile-nav.open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
    }

    .mobile-nav-list {
        list-style: none;
        margin: 0;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .mobile-nav-link {
        color: white;
        text-decoration: none;
        padding: 16px 20px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        transition: all 0.3s ease;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
    }

    .mobile-nav-link:hover {
        background: rgba(255,255,255,0.15);
        transform: translateX(8px);
    }

    .mobile-nav-cta {
        background: rgba(255,255,255,0.1) !important;
        border-color: rgba(255,255,255,0.3) !important;
        margin-top: 8px;
    }

    .mobile-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 999;
        backdrop-filter: blur(2px);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .desktop-nav {
            display: none;
        }

        .mobile-menu-btn {
            display: flex;
        }

        .navbar-container {
            height: 60px;
            padding: 0 15px;
        }

        .brand-text {
            font-size: 1.5rem;
        }

        .brand-subtitle {
            font-size: 0.6rem;
        }
    }

    @media (max-width: 480px) {
        .mobile-nav-list {
            padding: 15px;
        }

        .mobile-nav-link {
            padding: 14px 16px;
        }
    }

    /* Add top margin to body to account for fixed navbar */
    :global(body) {
        margin-top: 70px;
    }

    @media (max-width: 768px) {
        :global(body) {
            margin-top: 60px;
        }
    }

    /* Animation for nav items */
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .mobile-nav.open .mobile-nav-item {
        animation: slideInDown 0.3s ease forwards;
    }

    .mobile-nav.open .mobile-nav-item:nth-child(1) { animation-delay: 0.1s; }
    .mobile-nav.open .mobile-nav-item:nth-child(2) { animation-delay: 0.2s; }
    .mobile-nav.open .mobile-nav-item:nth-child(3) { animation-delay: 0.3s; }
    .mobile-nav.open .mobile-nav-item:nth-child(4) { animation-delay: 0.4s; }
</style>


<!-- <script></script>

<nav>
    <div class="navbar">
        <ul>
            <li><a href="/">IMDB</a></li>
            <li><a href="/search">Search</a></li>
            <li><a href="/randomise">Randomise</a></li>
            <li><a href="/login">Sign In</a></li>
        </ul>
    </div>
</nav>

<style>
    nav {
        background-color: #333;
        color: white;
        padding: 10px;
    }

    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
    }

    li {
        margin-right: 20px;
    }

    a {
        color: white;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style> -->