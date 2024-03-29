class About extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <section id="about" class="about">
            <div class="container" data-aos="fade-up">
                <div class="row gx-0">
                    <div class="col-lg-6 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
                        <div class="content">
                        <h3>Who We Are</h3>
                        <h2>
                            We are a cross-chain NFT utility platform.
                        </h2>
                        <p>
                            PlayNFT connects NFT holders and NFT Collection creators to in-game content of blockchain enabled
                            games. This utility is the next evolution of the NFT ecosystem.
                            We are solving the problems of blockchain segmentation and the lack of NFT utility.
                        </p>
                        <p>
                            Current blockchains supported:<br>
                            <img style="width:50px;padding-bottom: 10px" src="assets/img/enjin-coin-enj-logo.svg" alt="Enjin" />
                            <img style="width:50px;padding-bottom: 10px" src="assets/img/avalanche-avax-logo.svg" alt="Avalanche" />
                            <img style="width:50px;padding-bottom: 10px" src="assets/img/heco-logo.svg" alt="Heco" />
                            <img style="width:50px;padding-bottom: 10px" src="assets/img/polygon-matic-logo.svg" alt="Polygon" />
                            <img style="width:50px;padding-bottom: 10px" src="assets/img/velas-vlx-logo.svg" alt="Velas" />
                            <img style="width:50px;padding-bottom: 10px" src="assets/img/near-protocol-near-logo.svg" alt="NEAR Protocol" />
                            <img style="width:50px;padding-bottom: 10px" src="assets/img/solana-sol-logo.svg" alt="Solana" />
                            <img style="height:50px;padding-bottom: 10px" src="assets/img/tezos-xtz-logo.svg" alt="Tezos" />
                            <img style="width:50px;padding-bottom: 10px" src="assets/img/stacks-stx-logo.svg" alt="Stacks" />
                            <img style="width:50px;padding-bottom: 10px" src="assets/img/telos.svg" alt="Telos" />
                            <img style="height:50px;padding-bottom: 10px" src="assets/img/ethereum-eth-logo.svg" alt="Ethereum" />
                            <img style="width:50px;padding-bottom: 10px" src="assets/img/evmos.svg" alt="EVMOS" />
                            <img style="width:50px;padding-bottom: 10px" src="assets/img/tron.svg" alt="Tron" />
                            <img style="width:50px;padding-bottom: 10px" src="assets/img/xrp-xrp-logo.svg" alt="XRPL" />
                        </p>
                    </div>
                </div>

                <div class="col-lg-6 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
                    <div class="content">
                    <img src="assets/img/feature.png" class="img-fluid" alt="" />
                    </div>
                </div>
                </div>
            </div>
            </section>
        `;
    }
}

customElements.define('about-component', About);