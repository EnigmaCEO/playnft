class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {

        if(this.attributes.alternate_header) {
            this.innerHTML =`
            <header id="header" class="header fixed-top">
                <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
                    <a href="../" class="logo d-flex align-items-center">
                        <img src="../assets/img/logo.png" alt="PlayNFT" />
                    </a>

                    <nav id="navbar" class="navbar">
                        <ul>
                            <li><a class="nav-link scrollto active" href="../">Home</a></li>
                            <li class="dropdown"><a href="#"><span>Utility Marketplace</span> <i class="bi bi-chevron-down"></i></a>
                                <ul>
                                <li><a class="nav-link" href="/creators/">Content Creators</a></li>
                                <li><a class="nav-link" href="/games/">Blockchain Games</a></li>
                                <li><a class="nav-link" href="/collections/">NFT Collections</a></li>
                                </ul>
                            </li>
                            <li id="header_account" class="dropdown d-none"><a href="#"><span>Account</span> <i class="bi bi-chevron-down"></i></a>
                                <ul>
                                <li><a class="nav-link" href="/account/">Dashboard</a></li>
                                <li><a class="nav-link" href="/nfts/">NFT Inventory</a></li>
                                <li><a class="nav-link" href="javascript:LogOut()">Log Out</a></li>
                                </ul>
                            </li>
                            <li id="header_login" class="d-none">
                                <a class="getstarted" href="/account/">Login</a>
                            </li>
                        </ul>
                        <i class="bi bi-list mobile-nav-toggle"></i>
                    </nav>
                    <!-- .navbar -->
                </div>
            </header>
            `;
        } else {
            this.innerHTML = `
            <header id="header" class="header fixed-top">
                <div class="container-fluid container-xl d-flex align-items-center justify-content-between">
                <a href="/" class="logo d-flex align-items-center">
                    <img src="assets/img/logo.png" alt="PlayNFT" />
                </a>

                <nav id="navbar" class="navbar">
                    <ul>
                    <li><a class="nav-link scrollto active" href="#hero">Home</a></li>
                    <li><a class="nav-link scrollto" href="#about">About</a></li>
                    <li class="dropdown"><a href="#"><span>Utility Marketplace</span> <i class="bi bi-chevron-down"></i></a>
                        <ul>
                        <li><a class="nav-link" href="/creators/">Content Creators</a></li>
                        <li><a class="nav-link" href="/games/">Blockchain Games</a></li>
                        <li><a class="nav-link" href="/collections/">NFT Collections</a></li>
                        </ul>
                    </li>
                    <li><a class="nav-link scrollto" href="#services">Services</a></li>
                    <li><a class="nav-link scrollto" href="#partners">Partners</a></li>
                    <li><a class="nav-link" href="/roadmap/">Roadmap</a></li>
                    <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
                    <li id="header_account" class="dropdown d-none"><a href="#"><span>Account</span> <i class="bi bi-chevron-down"></i></a>
                        <ul>
                        <li><a class="nav-link" href="/account/">Dashboard</a></li>
                        <li><a class="nav-link" href="/nfts/">NFT Inventory</a></li>
                        <li><a class="nav-link" href="javascript:LogOut()">Log Out</a></li>
                        </ul>
                    </li>
                    <li id="header_login" class="d-none">
                        <a class="getstarted" href="/account/">Login</a>
                    </li>
                    </ul>
                    <i class="bi bi-list mobile-nav-toggle"></i>
                </nav>
                </div>
            </header>
            `;
        }
    }
}

customElements.define('header-component', Header);