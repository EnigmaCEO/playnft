class Streamers extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <section id="streamers" class="testimonials">

            <div class="container" data-aos="fade-up">

            <header class="section-header">
                <h2>Creators</h2>
                <p>Collect NFTs from your favorite Content Creators.</p><br/>
                <span><button type="submit" onclick="window.location.assign('/creators/')">View All</button></span>
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