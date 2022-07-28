class Partners extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <section id="partners" class="clients">
            <div class="container" data-aos="fade-up">
                <header class="section-header">
                <h2>Our Technology Partners</h2>
                <p>Leveraging the latest technology to create a platform for NFTs</p>
                </header>

                <div class="clients-slider swiper-container">
                <div class="swiper-wrapper align-items-center">
                    <div class="swiper-slide">
                    <img src="assets/img/partners/enjin.png" class="img-fluid" alt="Enjin" />
                    </div>
                    <div class="swiper-slide">
                    <img src="assets/img/partners/moralis.png" class="img-fluid" alt="Moralis" />
                    </div>
                    <div class="swiper-slide">
                    <img src="assets/img/partners/twitch.png" class="img-fluid" alt="Twitch" />
                    </div>
                    <div class="swiper-slide">
                    <img src="assets/img/partners/aws.png" class="img-fluid" alt="Amazon Web Services" />
                    </div>
                    <div class="swiper-slide">
                    <img src="assets/img/partners/velas.png" class="img-fluid" alt="Velas" />
                    </div>
                    <div class="swiper-slide">
                    <img src="assets/img/partners/heco.jpeg" class="img-fluid" alt="HECO" />
                    </div>
                    <div class="swiper-slide">
                    <img src="assets/img/partners/covalent.png" class="img-fluid" alt="Covalent" />
                    </div>
                </div>
                <div class="swiper-pagination"></div>
                </div>
            </div>
            </section>
        `;
    }
}

customElements.define('partners-component', Partners);