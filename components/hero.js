class Hero extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <section id="hero" class="hero d-flex align-items-center">
            <div class="container">
            <div class="row">
                <div class="col-lg-6 d-flex flex-column justify-content-center">
                <h1 data-aos="fade-up">The playground for NFTs</h1>
                <h2 data-aos="fade-up" data-aos-delay="400">
                    "I just bought an NFT... now what?"
                </h2>
                <div data-aos="fade-up" data-aos-delay="600">
                    <div class="text-center text-lg-start">
                    <a href="#services"
                        class="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                        <span>Get Started</span>
                        <i class="bi bi-arrow-right"></i>
                    </a>
                    </div>
                </div>
                </div>
                <div class="col-lg-5 hero-img" data-aos="zoom-out" data-aos-delay="200">
                    <div class="container">
                        <div class="row jalign-items-center">
                            <div class="col-12 text-center">
                            <h1>Utility Marketplace</h1>
                            </div>
                        </div>
                        <div class="row justify-content-md-center">
                            <div class="col stats" onclick="location.href='/streamers/';">
                            <p style="font-size:calc(100% + 1vw);color: #012970;">264</p>
                            <p style="font-size:calc(100% + 0vw)">Twitch Streamers</p>
                            </div>
                            <div class="col stats" onclick="location.href='/games/';">
                            <p style="font-size:calc(100% + 1vw);color: #012970;">10</p>
                            <p style="font-size:calc(100% + 0vw)">Blockchain Games</p>
                            </div>
                        </div>
                        <div class="row justify-content-md-center">
                            <div class="col stats" onclick="location.href='/collections/';">
                            <p style="font-size:calc(100% + 1vw);color: #012970;">71</p>
                            <p style="font-size:calc(100% + 0vw)">NFT Collections</p>
                            </div>
                            <div class="col stats">
                            <p style="font-size:calc(100% + 1vw);color: #012970;">$15,654</p>
                            <p style="font-size:calc(100% + 0vw)">Transaction Volume</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>
        `;
    }
}

customElements.define('hero-component', Hero);