class Streamers extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <section id="streamers" class="testimonials">

            <div class="container" data-aos="fade-up">

            <header class="section-header">
                <h2>Streamers</h2>
                <p>Collect Tokens from your favorite Twitch Streamers.</p>
            </header>

            <div class="testimonials-slider swiper-container" data-aos="fade-up" data-aos-delay="200">
                <div id="streamer_list" class="swiper-wrapper">


                </div>
                <div class="swiper-pagination"></div>
            </div>

            </div>

        </section>
        `;
    }
}

customElements.define('streamers-component', Streamers);