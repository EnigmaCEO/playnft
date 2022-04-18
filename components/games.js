class Games extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <section id="clients" class="clients">
            <div class="container" data-aos="fade-up">
                <header class="section-header">
                <h2>Our Games</h2>
                <p>Connect your NFTs with any of the games in the playground</p>
                </header>

                <div class="clients-slider swiper-container">
                <div class="swiper-wrapper align-items-center">
                    <div class="swiper-slide">
                    <img src="assets/img/clients/enigma-minmins.png" class="img-fluid" alt="Min-Mins" />
                    </div>
                    <div class="swiper-slide">
                    <img src="assets/img/clients/enigma-shalwend.png" class="img-fluid" alt="Shield of Shalwend" />
                    </div>
                    <div class="swiper-slide">
                    <img src="assets/img/clients/enigma-wgo2.png" class="img-fluid" alt="Wargods Online 2" />
                    </div>
                    <div class="swiper-slide">
                    <img src="assets/img/clients/enigma-theta.png" class="img-fluid" alt="Theta Warriors Defense" />
                    </div>
                    <div class="swiper-slide">
                    <img src="assets/img/clients/enigma-k9.png" class="img-fluid" alt="K9 Empire" />
                    </div>
                </div>
                <div class="swiper-pagination"></div>
                </div>
            </div>
            </section>
        `;
    }
}

customElements.define('games-component', Games);