class Services extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <section id="services" class="services">
            <div class="container" data-aos="fade-up">
                <header class="section-header">
                <h2>Services</h2>
                <p>NFT Playground</p>
                </header>

                <div class="row gy-4">

                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
                    <div class="service-box purple">
                    <i class="ri-camera-3-line icon"></i>
                    <h3>Game Streamers</h3>
                    <p>
                        Grow your audience and expand your brand with your own Digital Tokens.
                        Distribute using our Twitch extension.
                    </p>
                    <div class="pricing">
                        <div class="price"></div>

                        <br /><a href="#" class="btn-buy" id="service-streamers">Start Now</a>
                    </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
                    <div class="service-box green">
                    <i class="ri-sd-card-line icon"></i>
                    <h3>NFT Utility</h3>
                    <p>
                        Increase the value of your NFTs and Collections by linking them to our blockchain games to unlock special content.
                    </p>
                    <div class="pricing">
                        <div class="price"></div>

                        <br /><a href="#" class="btn-buy" id="service-creators">Start Now</a>
                    </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="400">
                    <div class="service-box orange">
                    <i class="ri-code-s-slash-line icon"></i>
                    <h3>Game Developers</h3>
                    <p>
                        List your in-game unlockable items and rewards to NFT holders.
                        Integrate with our API to access cross-chain users.
                    </p>
                    <div class="pricing">
                        <div class="price"></div>

                        <br /><a href="#" class="btn-buy" id="service-developers">Start Now</a>
                    </div>
                    </div>
                </div>

                <!-- <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="0">
                    <div class="service-box red">
                    <i class="ri-gamepad-line icon"></i>
                    <h3>NFT Hodlers</h3>
                    <p>
                        Select NFTs from your wallet and connect them for in-game
                        rewards and bonuses.
                    </p>
                    <div class="pricing">
                        <div class="price"></div>

                        <br /><a href="#" class="btn-buy" id="service-gamers">Start Now</a>
                    </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="0">
                    <div class="service-box blue">
                    <i class="ri-exchange-funds-line icon"></i>
                    <h3>NFT Marketplace</h3>
                    <p>
                        Discover, buy, and sell NFTs in the EnjinX Marketplace
                    </p>
                    <div class="pricing">
                        <div class="price"></div>

                        <br /><a href="https://enjinx.io/eth/marketplace" class="btn-buy" id="service-market">Start Now</a>
                    </div>
                    </div>
                </div> -->

                </div>
            </div>
            </section>
        `;
    }
}

customElements.define('services-component', Services);