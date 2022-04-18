class ServicesGamers extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <section id="section-gamers" class="gamers">
      <div class="container" data-aos="fade-up">
        <header class="section-header">
          <h2>NFT Gamers</h2>
          <p>Play with your NFTs</p>
        </header>

        <div class="wizard">
          <div class="wizard-inner">
            <div class="connecting-line"></div>
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="nav-item active">
                <a title="1. Scan Wallet" class="nav-link" id="nav-gamers-wallet" role="tab" data-bs-toggle="tab"
                  aria-controls="gamers-wallet" href="#list-gamers-wallet">
                  <span class="round-tab">
                    <i class="fas fa-wallet" style="font-size: 3.7vh"></i>
                  </span>
                </a>
              </li>
              <li role="presentation" class="nav-item disabled">
                <a title="2. Select Token" class="nav-link" id="nav-gamers-nfts" role="tab" data-bs-toggle="tab"
                  aria-controls="gamers-nfts" href="#list-gamers-nfts">
                  <span class="round-tab"><i class="fas fa-sd-card" style="font-size: 3.7vh"></i></span>
                </a>
              </li>
              <li role="presentation" class="nav-item disabled">
                <a title="3. Select Game" class="nav-link" id="nav-gamers-games" role="tab" data-bs-toggle="tab"
                  aria-controls="gamers-games" href="#list-gamers-games">
                  <span class="round-tab"><i class="fas fa-gamepad" style="font-size: 3.7vh"></i></span>
                </a>
              </li>
              <li role="presentation" class="nav-item disabled">
                <a title="4. Select Content" class="nav-link" id="nav-gamers-content" role="tab" data-bs-toggle="tab"
                  aria-controls="gamers-content" href="#list-gamers-content">
                  <span class="round-tab"><i class="fas fa-link" style="font-size: 3.7vh"></i></span>
                </a>
              </li>
              <li role="presentation" class="nav-item disabled">
                <a title="5. Review Order" class="nav-link" id="nav-gamers-review" role="tab" data-bs-toggle="tab"
                  aria-controls="gamers-review" href="#list-gamers-review">
                  <span class="round-tab"><i class="fas fa-shopping-cart" style="font-size: 3.7vh"></i></span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="row spacer">&nbsp;</div>

        <div class="row">
          <div class="col-12">
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="list-gamers-wallet" role="tabpanel"
                aria-labelledby="nav-gamers-wallet">
                <div class="col-lg-12">
                  <h4>Input your Wallet address</h4>
                  <form id="gamers-scan-form" action="#" method="post">
                    <input type="hidden" name="walletMode" value="gamers" />
                    <div class="gy-4">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gamers-chain" id="gamers-chain-enj"
                          value="enj" checked>
                        <label class="form-check-label" for="gamers-chain-enj"><img style="width:50px"
                            src="assets/img/enjin-coin-enj-logo.svg" alt="Enjin" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gamers-chain" id="gamers-chain-avax"
                          value="avalanche">
                        <label class="form-check-label" for="gamers-chain-avax"><img style="width:50px"
                            src="assets/img/avalanche-avax-logo.svg" alt="Avalanche" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gamers-chain" id="gamers-chain-heco"
                          value="heco">
                        <label class="form-check-label" for="gamers-chain-heco"><img style="width:50px"
                            src="assets/img/heco-logo.svg" alt="Heco" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gamers-chain" id="gamers-chain-polygon"
                          value="polygon">
                        <label class="form-check-label" for="gamers-chain-polygon"><img style="width:50px"
                            src="assets/img/polygon-matic-logo.svg" alt="Polygon" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gamers-chain" id="gamers-chain-velas"
                          value="velas">
                        <label class="form-check-label" for="gamers-chain-velas"><img style="width:50px"
                            src="assets/img/velas-vlx-logo.svg" alt="Velas" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gamers-chain" id="gamers-chain-xrp"
                          value="xrp">
                        <label class="form-check-label" for="gamers-chain-xrp"><img style="width:50px"
                            src="assets/img/xrp-xrp-logo.svg" alt="XRP" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gamers-chain" id="gamers-chain-solana"
                          value="solana">
                        <label class="form-check-label" for="gamers-chain-solana"><img style="width:50px"
                            src="assets/img/solana-sol-logo.svg" alt="Solana" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gamers-chain" id="gamers-chain-near"
                          value="near">
                        <label class="form-check-label" for="gamers-chain-near"><img style="width:50px"
                            src="assets/img/near-protocol-near-logo.svg" alt="Near" /></label>
                      </div>
                    </div>
                    <div class="row spacer-20">&nbsp;</div>
                    <div class="row gy-4 chain-wallet" id="gamers-wallet-enj">
                      <div class="col-md-6">
                        <input type="text" name="walletAddress" id="walletAddress" class="form-control wallet-address"
                          placeholder="Ethereum Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <a href="https://enjin.io/software/wallet" target="_blank">Download the Enjin Wallet</a>
                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="gamers-wallet-avax">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressAvax" id="walletAddressAvax"
                          class="form-control wallet-address" placeholder="Avalanche Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <button id="avax-wallet-connect" class="btn btn-primary" type="button">
                          Connect with Metamask
                        </button>
                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="gamers-wallet-heco">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressHeco" id="walletAddressHeco"
                          class="form-control wallet-address" placeholder="HECO Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <button id="heco-wallet-connect" class="btn btn-primary" type="button">
                          Connect with Metamask
                        </button>
                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="gamers-wallet-polygon">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressPolygon" id="walletAddressPolygon"
                          class="form-control wallet-address" placeholder="Polygon Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <button id="polygon-wallet-connect" class="btn btn-primary" type="button">
                          Connect with Metamask
                        </button>
                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="gamers-wallet-velas">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressVelas" id="walletAddressVelas"
                          class="form-control wallet-address" placeholder="Velas Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <button id="velas-wallet-connect" class="btn btn-primary" type="button">
                          Connect with Metamask
                        </button>
                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="gamers-wallet-xrp">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressXrp" id="walletAddressXrp"
                          class="form-control wallet-address" placeholder="XRP Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">

                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="gamers-wallet-solana">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressSolana" id="walletAddressSolana"
                          class="form-control wallet-address" placeholder="Solana Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">

                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="gamers-wallet-near">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressNear" id="walletAddressNear"
                          class="form-control wallet-address" placeholder="Aurora Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <button id="near-wallet-connect" class="btn btn-primary" type="button">
                          Connect with Metamask
                        </button>
                      </div>
                    </div>
                    <div class="row spacer-20">&nbsp;</div>
                    <div class="row gy-4">
                      <div class="col-md-12 text-center">
                        <button id="scan-wallet" class="btn-read-more" type="submit">
                          Scan Wallet
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="tab-pane fade" id="list-gamers-nfts" role="tabpanel" aria-labelledby="nav-gamers-nfts">
                <div class="col-md-12">
                  <div class="panel panel-primary" id="gamers-nft-panel">
                    <div class="panel-heading">
                      <h4>Select a Token</h4>
                    </div>
                    <div class="panel-body">
                      <ul class="list-group" id="gamers-nfts">
                        <li class="list-group-item">Awaiting results...</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="list-gamers-games" role="tabpanel" aria-labelledby="nav-gamers-games">
                <div class="col-md-12">
                  <div class="panel panel-primary" id="gamers-games-panel">
                    <div class="panel-heading">
                      <h4>Select a Game</h4>
                    </div>
                    <div class="panel-body">
                      <ul class="list-group" id="gamers-games">

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="list-gamers-content" role="tabpanel" aria-labelledby="nav-gamers-content">
                <div class="col-md-12">
                  <div class="panel panel-primary" id="gamers-games-panel">
                    <div class="panel-heading">
                      <h4>Link your NFT</h4>
                    </div>
                    <div class="panel-body">
                      <ul class="list-group" id="gamers-content">

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="list-gamers-review" role="tabpanel" aria-labelledby="nav-gamers-review">
                <div class="col-md-12">
                  <div class="panel panel-primary" id="gamers-review-panel">
                    <div class="panel-heading">
                      <h4>Review your Order</h4>
                      <p class="section-header">Complete your purchase to link your NFT to this content. Enjoy!</p>
                    </div>
                    <div class="panel-body">
                      <div class="flex-shrink-0 text-center">
                        <p class="game-icon">
                          <span id="gamers-review-token"></span> <i class="fas fa-link" style="font-size: 3.7vh"></i>
                          <span id="gamers-review-icon"></span>
                        </p>
                        <p>
                          <strong id="gamers-review-name"></strong>
                        </p>
                        <p>
                        <form action="https://www.coinpayments.net/index.php" method="post" target="_top">
                          <input type="hidden" name="cmd" value="_pay_simple">
                          <input type="hidden" name="reset" value="1">
                          <input type="hidden" name="merchant" value="aca09a5c8eadff03ff731f14e42f7ae1">
                          <input type="hidden" name="currency" value="USD">
                          <input type="hidden" name="amountf" id="amountf" value="5.00">
                          <input type="hidden" name="item_number" id="item_number" value="2">
                          <input type="hidden" name="invoice" id="invoice" value="7">
                          <input type="hidden" name="custom" id="custom" value="7">
                          <input type="hidden" name="item_name" id="item_name" value="Test NFT Item">
                          <input type="image" src="https://www.coinpayments.net/images/pub/buynow-wide-blue.png"
                            alt="Buy Now with CoinPayments.net">
                        </form>
                        <span id="gamers-review-cost"></span>
                        </p>

                      </div>

                    </div>
                  </div>
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

customElements.define('services-gamers-component', ServicesGamers);