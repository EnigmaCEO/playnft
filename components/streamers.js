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

                <div class="swiper-slide">
                    <div class="testimonial-item">
                    <div class="profile mt-auto">
                        <img
                        src="https://static-cdn.jtvnw.net/jtv_user_pictures/enigmagamesinc-profile_image-6e13de0cbab10c1c-150x150.png"
                        class="testimonial-img" alt="">
                        <h3>EnigmaGamesInc</h3>
                        <h4>0 NFTs</h4>

                    </div>
                    <p>
                        <button type="submit">Visit Channel</button>
                    </p>

                    </div>
                </div><!-- End testimonial item -->

                <div class="swiper-slide">
                    <div class="testimonial-item">
                    <div class="profile mt-auto">
                        <img
                        src="https://static-cdn.jtvnw.net/jtv_user_pictures/eebbe7fc-7859-4917-825b-34e2e63ded6d-profile_image-150x150.png"
                        class="testimonial-img" alt="">
                        <h3>DenkOps</h3>
                        <h4>0 NFTs</h4>

                    </div>
                    <p>
                        <button type="submit">Visit Channel</button>
                    </p>

                    </div>
                </div>

                <div class="swiper-slide">
                    <div class="testimonial-item">
                    <div class="profile mt-auto">
                        <img
                        src="https://static-cdn.jtvnw.net/jtv_user_pictures/293af7b9-814a-4b46-ae97-d55879f2e6a4-profile_image-150x150.png"
                        class="testimonial-img" alt="">
                        <h3>Ziggy</h3>
                        <h4>0 NFTs</h4>

                    </div>
                    <p>
                        <button type="submit">Visit Channel</button>
                    </p>

                    </div>
                </div>

                <div class="swiper-slide">
                    <div class="testimonial-item">
                    <div class="profile mt-auto">
                        <img
                        src="https://static-cdn.jtvnw.net/jtv_user_pictures/982ac00b-03ff-4879-a037-4e0aa5ad2183-profile_image-150x150.png"
                        class="testimonial-img" alt="">
                        <h3>Crunk_Muffin</h3>
                        <h4>0 NFTs</h4>

                    </div>
                    <p>
                        <button type="submit">Visit Channel</button>
                    </p>

                    </div>
                </div>

                <div class="swiper-slide">
                    <div class="testimonial-item">
                    <div class="profile mt-auto">
                        <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/2621b461703eb33d-profile_image-150x150.jpeg"
                        class="testimonial-img" alt="">
                        <h3>JustinLCarter</h3>
                        <h4>0 NFTs</h4>

                    </div>
                    <p>
                        <button type="submit">Visit Channel</button>
                    </p>

                    </div>
                </div>

                <div class="swiper-slide">
                    <div class="testimonial-item">
                    <div class="profile mt-auto">
                        <img
                        src="https://static-cdn.jtvnw.net/jtv_user_pictures/93232cde-2eac-42aa-a0b3-2f63cf898562-profile_image-150x150.png"
                        class="testimonial-img" alt="">
                        <h3>MiraScarlet</h3>
                        <h4>0 NFTs</h4>

                    </div>
                    <p>
                        <button type="submit">Visit Channel</button>
                    </p>

                    </div>
                </div>

                <div class="swiper-slide">
                    <div class="testimonial-item">
                    <div class="profile mt-auto">
                        <img
                        src="https://static-cdn.jtvnw.net/jtv_user_pictures/bc95bb2e-456d-4353-a413-9248f4b22a33-profile_image-150x150.png"
                        class="testimonial-img" alt="">
                        <h3>TheNoosh22</h3>
                        <h4>0 NFTs</h4>

                    </div>
                    <p>
                        <button type="submit">Visit Channel</button>
                    </p>

                    </div>
                </div>

                </div>
                <div class="swiper-pagination"></div>
            </div>

            </div>

        </section>
        `;
    }
}

customElements.define('streamers-component', Streamers);