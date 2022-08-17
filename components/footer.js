class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <footer id="footer" class="footer">
            <div class="footer-top">
            <div class="container">
                <div class="row gy-4">
                <div class="col-lg-5 col-md-12 footer-info">
                    <a href="index.html" class="logo align-items-center">
                    <img src="/assets/img/logo.png" alt="PlayNFT" />
                    </a>
                    <a href="PlayNFT_Pitchdeck.pdf" target="_blank" class="align-items-center">
                    <b>Pitch Deck <i class="fas fa-file-download"></i></b>
                    </a>

                    <p>
                    We are building an ecosystem to extend the utility and value of
                    NFTs.
                    </p>
                    <div class="social-links mt-3">
                    <a href="https://twitter.com/playnft_io" class="twitter"><i class="bi bi-twitter"></i></a>
                    <a href="https://www.facebook.com/PlayNFT.io" class="facebook"><i class="bi bi-facebook"></i></a>
                    <a href="https://www.linkedin.com/company/playnftio" class="linkedin"><i
                        class="bi bi-linkedin bx bxl-linkedin"></i></a>
                    </div>
                </div>

                <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                    <h4>Donations</h4>
                    <p>
                    <strong>Ethereum:</strong><br />0x9A5e4aD75D29830D8bca2Ed7A5dA33Cab63DC415<br />
                    </p>
                    <p>
                    <strong>Bitcoin:</strong><br />1ADPinDUh7eHraZB83kzfraD2J8PZVWvrz<br />
                    </p>
                </div>
                </div>
            </div>
            </div>

            <div class="container">
            <div class="copyright">
                &copy; Copyright <strong><span>PlayNFT</span></strong>. All Rights Reserved
            </div>
            </div>
        </footer>
        `;
    }
}

customElements.define('footer-component', Footer);