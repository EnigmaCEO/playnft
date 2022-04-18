class Contact extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <section id="contact" class="contact">
            <div class="container" data-aos="fade-up">
                <header class="section-header">
                <h2>Contact</h2>
                <p>Contact Us</p>
                </header>

                <div class="row gy-4">
                <div class="col-lg-12 text-center">
                    <a href="mailto:info@playnft.io" target="_blank" class="btn btn-primary">Email: info@playnft.io</a>
                </div>
                </div>
            </div>
        </section>
        `;
    }
}

customElements.define('contact-component', Contact);