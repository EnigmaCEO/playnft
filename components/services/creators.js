class ServicesCreators extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.attributes.modal) {
      this.innerHTML = `
        
      <div class="container">
        
        <div class="wizard">
          <div class="wizard-inner">
            <div class="connecting-line" style="width: 60%"></div>
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="nav-item active" style="width: 33%">
                <a title="1. Scan Wallet" class="nav-link" id="nav-creators-wallet" role="tab" data-bs-toggle="tab"
                  aria-controls="creators-wallet" href="#list-creators-wallet">
                  <span class="round-tab">
                    <i class="fas fa-wallet" style="font-size: 3.7vh"></i>
                  </span>
                </a>
              </li>
              <li role="presentation" class="nav-item disabled" style="width: 33%">
                <a title="2. Select Token" class="nav-link" id="nav-creators-nfts" role="tab" data-bs-toggle="tab"
                  aria-controls="creators-nfts" href="#list-creators-nfts">
                  <span class="round-tab"><i class="fas fa-sd-card" style="font-size: 3.7vh"></i></span>
                </a>
              </li>
              <li role="presentation" class="nav-item disabled" style="width: 33%">
                <a title="3. Review Order" class="nav-link" id="nav-creators-review" role="tab" data-bs-toggle="tab"
                  aria-controls="creators-review" href="#list-creators-review">
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
              <div class="tab-pane fade show active" id="list-creators-wallet" role="tabpanel"
                aria-labelledby="nav-creators-wallet">
                <div class="col-lg-12">
                  <h4>Input your Wallet address</h4>
                  <form id="creators-scan-form" action="#" method="post">
                    <input type="hidden" name="walletMode" value="creators" />

                    <div class="gy-4">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="creators-chain" id="creators-chain-enj"
                          value="enj" checked>
                        <label class="form-check-label" for="creators-chain-enj"><img style="width:50px"
                            src="/assets/img/enjin-coin-enj-logo.svg" alt="Enjin" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="creators-chain" id="creators-chain-avax"
                          value="avalanche">
                        <label class="form-check-label" for="creators-chain-avax"><img style="width:50px"
                            src="/assets/img/avalanche-avax-logo.svg" alt="Avalanche" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="creators-chain" id="creators-chain-heco"
                          value="heco">
                        <label class="form-check-label" for="creators-chain-heco"><img style="width:50px"
                            src="/assets/img/heco-logo.svg" alt="Heco" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="creators-chain" id="creators-chain-polygon"
                          value="polygon">
                        <label class="form-check-label" for="creators-chain-polygon"><img style="width:50px"
                            src="/assets/img/polygon-matic-logo.svg" alt="Polygon" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="creators-chain" id="creators-chain-velas"
                          value="velas">
                        <label class="form-check-label" for="creators-chain-velas"><img style="width:50px"
                            src="/assets/img/velas-vlx-logo.svg" alt="Velas" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="creators-chain" id="creators-chain-xrp"
                          value="xrp">
                        <label class="form-check-label" for="creators-chain-xrp"><img style="width:50px"
                            src="/assets/img/xrp-xrp-logo.svg" alt="XRP" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="creators-chain" id="creators-chain-solana"
                          value="solana">
                        <label class="form-check-label" for="creators-chain-solana"><img style="width:50px"
                            src="/assets/img/solana-sol-logo.svg" alt="Solana" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="creators-chain" id="creators-chain-near"
                          value="near">
                        <label class="form-check-label" for="creators-chain-near"><img style="width:50px"
                            src="/assets/img/aurora.png" alt="Aurora" /></label>
                      </div>
                    </div>
                    <div class="row spacer-20">&nbsp;</div>
                    <div class="row gy-4 chain-wallet" id="creators-wallet-enj">
                      <div class="col-md-6">
                        <input type="text" name="walletAddress" id="creators-walletAddress"
                          class="form-control wallet-address" placeholder="Ethereum Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <a href="https://enjin.io/software/wallet" target="_blank">Download the Enjin Wallet</a>
                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="creators-wallet-avax">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressAvax" id="creators-walletAddressAvax"
                          class="form-control wallet-address" placeholder="Avalanche Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <button id="creators-avax-wallet-connect" class="btn btn-primary" type="button">
                          Connect with Metamask
                        </button>
                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="creators-wallet-heco">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressHeco" id="creators-walletAddressHeco"
                          class="form-control wallet-address" placeholder="HECO Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <button id="creators-heco-wallet-connect" class="btn btn-primary" type="button">
                          Connect with Metamask
                        </button>
                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="creators-wallet-polygon">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressPolygon" id="creators-walletAddressPolygon"
                          class="form-control wallet-address" placeholder="Polygon Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <button id="creators-polygon-wallet-connect" class="btn btn-primary" type="button">
                          Connect with Metamask
                        </button>
                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="creators-wallet-velas">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressVelas" id="creators-walletAddressVelas"
                          class="form-control wallet-address" placeholder="Velas Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <button id="creators-velas-wallet-connect" class="btn btn-primary" type="button">
                          Connect with Metamask
                        </button>
                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="creators-wallet-xrp">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressXrp" id="creators-walletAddressXrp"
                          class="form-control wallet-address" placeholder="XRP Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">

                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="creators-wallet-solana">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressSolana" id="creators-walletAddressSolana"
                          class="form-control wallet-address" placeholder="Solana Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">

                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="creators-wallet-near">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressNear" id="creators-walletAddressNear"
                          class="form-control wallet-address" placeholder="Aurora Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <button id="creators-near-wallet-connect" class="btn btn-primary" type="button">
                          Connect with Metamask
                        </button>
                      </div>
                    </div>
                    <div class="row spacer-20">&nbsp;</div>
                    <div class="row gy-4">
                      <div class="col-md-12 text-center">
                        <div id="creators-error" style="color: red"></div>
                        <button id="creators-scan-wallet" class="btn-read-more" type="submit">
                          Scan Wallet
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="tab-pane fade" id="list-creators-nfts" role="tabpanel" aria-labelledby="nav-creators-nfts">
                <div class="col-md-12">
                  <div class="panel panel-primary" id="creators-nft-panel">
                    <div class="panel-heading">
                      <h4>Select a Token</h4>
                    </div>
                    <div class="panel-body">
                      <ul class="list-group" id="creators-nfts">
                        <li class="list-group-item">Awaiting results...</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="list-creators-review" role="tabpanel"
                aria-labelledby="nav-creators-review">
                <div class="col-md-12">
                  <div class="panel panel-primary" id="creators-review-panel">
                    <div class="panel-heading">
                      <h4>Review your Order</h4>
                      <p class="section-header">Complete your purchase to link your NFT to this content. Enjoy!</p>
                    </div>
                    <div class="panel-body">
                      <div class="flex-shrink-0 text-center">
                        <p class="game-icon">
                          <span id="creators-review-token"></span> <i class="fas fa-link" style="font-size: 3.7vh"></i>
                          <span id="creators-review-icon"></span>
                        </p>
                        <p>
                          <strong id="creators-review-name"></strong>
                        </p>
                        <p>
                        <form action="https://www.coinpayments.net/index.php" method="post" target="_top">
                          <input type="hidden" name="cmd" value="_pay_simple">
                          <input type="hidden" name="reset" value="1">
                          <input type="hidden" name="merchant" value="aca09a5c8eadff03ff731f14e42f7ae1">
                          <input type="hidden" name="currency" value="USD">
                          <input type="hidden" name="amountf" id="creators-amountf" value="5.00">
                          <input type="hidden" name="item_number" id="creators-item_number" value="2">
                          <input type="hidden" name="invoice" id="creators-invoice" value="7">
                          <input type="hidden" name="custom" id="creators-custom" value="7">
                          <input type="hidden" name="item_name" id="creators-item_name" value="Test NFT Item">
                          <input type="image" src="https://www.coinpayments.net/images/pub/buynow-wide-blue.png"
                            alt="Buy Now with CoinPayments.net">
                        </form>
                        <span id="creators-review-cost"></span>
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
        `;
    } else {
      this.innerHTML = `
        <section id="section-creators" class="gamers">
      <div class="container">
        <header class="section-header">
          <h2>NFT Utility</h2>
          <p>Add Utility to your NFTs and Collections</p>
        </header>

        <div class="wizard">
          <div class="wizard-inner">
            <div class="connecting-line"></div>
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="nav-item active">
                <a title="1. Scan Wallet" class="nav-link" id="nav-creators-wallet" role="tab" data-bs-toggle="tab"
                  aria-controls="creators-wallet" href="#list-creators-wallet">
                  <span class="round-tab">
                    <i class="fas fa-wallet" style="font-size: 3.7vh"></i>
                  </span>
                </a>
              </li>
              <li role="presentation" class="nav-item disabled">
                <a title="2. Select Token" class="nav-link" id="nav-creators-nfts" role="tab" data-bs-toggle="tab"
                  aria-controls="creators-nfts" href="#list-creators-nfts">
                  <span class="round-tab"><i class="fas fa-sd-card" style="font-size: 3.7vh"></i></span>
                </a>
              </li>
              <li role="presentation" class="nav-item disabled">
                <a title="3. Select Game" class="nav-link" id="nav-creators-games" role="tab" data-bs-toggle="tab"
                  aria-controls="creators-games" href="#list-creators-games">
                  <span class="round-tab"><i class="fas fa-gamepad" style="font-size: 3.7vh"></i></span>
                </a>
              </li>
              <li role="presentation" class="nav-item disabled">
                <a title="4. Select Content" class="nav-link" id="nav-creators-content" role="tab" data-bs-toggle="tab"
                  aria-controls="creators-content" href="#list-creators-content">
                  <span class="round-tab"><i class="fas fa-link" style="font-size: 3.7vh"></i></span>
                </a>
              </li>
              <li role="presentation" class="nav-item disabled">
                <a title="5. Review Order" class="nav-link" id="nav-creators-review" role="tab" data-bs-toggle="tab"
                  aria-controls="creators-review" href="#list-creators-review">
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
              <div class="tab-pane fade show active" id="list-creators-wallet" role="tabpanel"
                aria-labelledby="nav-creators-wallet">
                <div class="col-lg-12">
                  <h4>Input your Wallet address</h4>
                  <form id="creators-scan-form" action="#" method="post">
                    <input type="hidden" name="walletMode" value="creators" />

                    <div class="gy-4">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="creators-chain" id="creators-chain-enj"
                          value="enj" checked>
                        <label class="form-check-label" for="creators-chain-enj"><img style="width:50px"
                            src="/assets/img/enjin-coin-enj-logo.svg" alt="Enjin" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="creators-chain" id="creators-chain-avax"
                          value="avalanche">
                        <label class="form-check-label" for="creators-chain-avax"><img style="width:50px"
                            src="/assets/img/avalanche-avax-logo.svg" alt="Avalanche" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="creators-chain" id="creators-chain-heco"
                          value="heco">
                        <label class="form-check-label" for="creators-chain-heco"><img style="width:50px"
                            src="/assets/img/heco-logo.svg" alt="Heco" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="creators-chain" id="creators-chain-polygon"
                          value="polygon">
                        <label class="form-check-label" for="creators-chain-polygon"><img style="width:50px"
                            src="/assets/img/polygon-matic-logo.svg" alt="Polygon" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="creators-chain" id="creators-chain-velas"
                          value="velas">
                        <label class="form-check-label" for="creators-chain-velas"><img style="width:50px"
                            src="/assets/img/velas-vlx-logo.svg" alt="Velas" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="creators-chain" id="creators-chain-xrp"
                          value="xrp">
                        <label class="form-check-label" for="creators-chain-xrp"><img style="width:50px"
                            src="/assets/img/xrp-xrp-logo.svg" alt="XRP" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="creators-chain" id="creators-chain-solana"
                          value="solana">
                        <label class="form-check-label" for="creators-chain-solana"><img style="width:50px"
                            src="/assets/img/solana-sol-logo.svg" alt="Solana" /></label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="creators-chain" id="creators-chain-near"
                          value="near">
                        <label class="form-check-label" for="creators-chain-near"><img style="width:50px"
                            src="/assets/img/aurora.png" alt="Aurora" /></label>
                      </div>
                    </div>
                    <div class="row spacer-20">&nbsp;</div>
                    <div class="row gy-4 chain-wallet" id="creators-wallet-enj">
                      <div class="col-md-6">
                        <input type="text" name="walletAddress" id="creators-walletAddress"
                          class="form-control wallet-address" placeholder="Ethereum Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <a href="https://enjin.io/software/wallet" target="_blank">Download the Enjin Wallet</a>
                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="creators-wallet-avax">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressAvax" id="creators-walletAddressAvax"
                          class="form-control wallet-address" placeholder="Avalanche Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <button id="creators-avax-wallet-connect" class="btn btn-primary" type="button">
                          Connect with Metamask
                        </button>
                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="creators-wallet-heco">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressHeco" id="creators-walletAddressHeco"
                          class="form-control wallet-address" placeholder="HECO Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <button id="creators-heco-wallet-connect" class="btn btn-primary" type="button">
                          Connect with Metamask
                        </button>
                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="creators-wallet-polygon">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressPolygon" id="creators-walletAddressPolygon"
                          class="form-control wallet-address" placeholder="Polygon Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <button id="creators-polygon-wallet-connect" class="btn btn-primary" type="button">
                          Connect with Metamask
                        </button>
                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="creators-wallet-velas">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressVelas" id="creators-walletAddressVelas"
                          class="form-control wallet-address" placeholder="Velas Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <button id="creators-velas-wallet-connect" class="btn btn-primary" type="button">
                          Connect with Metamask
                        </button>
                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="creators-wallet-xrp">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressXrp" id="creators-walletAddressXrp"
                          class="form-control wallet-address" placeholder="XRP Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">

                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="creators-wallet-solana">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressSolana" id="creators-walletAddressSolana"
                          class="form-control wallet-address" placeholder="Solana Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">

                      </div>
                    </div>
                    <div class="row gy-4 chain-wallet" id="creators-wallet-near">
                      <div class="col-md-6">
                        <input type="text" name="walletAddressNear" id="creators-walletAddressNear"
                          class="form-control wallet-address" placeholder="Aurora Wallet Address" required />
                      </div>
                      <div class="col-md-6 text-end">
                        <button id="creators-near-wallet-connect" class="btn btn-primary" type="button">
                          Connect with Metamask
                        </button>
                      </div>
                    </div>
                    <div class="row spacer-20">&nbsp;</div>
                    <div class="row gy-4">
                      <div class="col-md-12 text-center">
                        <div id="creators-error" style="color: red"></div>
                        <button id="creators-scan-wallet" class="btn-read-more" type="submit">
                          Scan Wallet
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="tab-pane fade" id="list-creators-nfts" role="tabpanel" aria-labelledby="nav-creators-nfts">
                <div class="col-md-12">
                  <div class="panel panel-primary" id="creators-nft-panel">
                    <div class="panel-heading">
                      <h4>Select a Token</h4>
                    </div>
                    <div class="panel-body">
                      <ul class="list-group" id="creators-nfts">
                        <li class="list-group-item">Awaiting results...</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="list-creators-games" role="tabpanel" aria-labelledby="nav-creators-games">
                <div class="col-md-12">
                  <div class="panel panel-primary" id="creators-games-panel">
                    <div class="panel-heading">
                      <h4>Select a Game</h4>
                    </div>
                    <div class="panel-body">
                      <ul class="list-group" id="creators-games">

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="list-creators-content" role="tabpanel"
                aria-labelledby="nav-creators-content">
                <div class="col-md-12">
                  <div class="panel panel-primary" id="creators-games-panel">
                    <div class="panel-heading">
                      <h4>Link your NFT</h4>
                    </div>
                    <div class="panel-body">
                      <ul class="list-group" id="creators-content">

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="list-creators-review" role="tabpanel"
                aria-labelledby="nav-creators-review">
                <div class="col-md-12">
                  <div class="panel panel-primary" id="creators-review-panel">
                    <div class="panel-heading">
                      <h4>Review your Order</h4>
                      <p class="section-header">Complete your purchase to link your NFT to this content. Enjoy!</p>
                    </div>
                    <div class="panel-body">
                      <div class="flex-shrink-0 text-center">
                        <p class="game-icon">
                          <span id="creators-review-token"></span> <i class="fas fa-link" style="font-size: 3.7vh"></i>
                          <span id="creators-review-icon"></span>
                        </p>
                        <p>
                          <strong id="creators-review-name"></strong>
                        </p>
                        <p>
                        <form action="https://www.coinpayments.net/index.php" method="post" target="_top">
                          <input type="hidden" name="cmd" value="_pay_simple">
                          <input type="hidden" name="reset" value="1">
                          <input type="hidden" name="merchant" value="aca09a5c8eadff03ff731f14e42f7ae1">
                          <input type="hidden" name="currency" value="USD">
                          <input type="hidden" name="amountf" id="creators-amountf" value="5.00">
                          <input type="hidden" name="item_number" id="creators-item_number" value="2">
                          <input type="hidden" name="invoice" id="creators-invoice" value="7">
                          <input type="hidden" name="custom" id="creators-custom" value="7">
                          <input type="hidden" name="item_name" id="creators-item_name" value="Test NFT Item">
                          <input type="image" src="https://www.coinpayments.net/images/pub/buynow-wide-blue.png"
                            alt="Buy Now with CoinPayments.net">
                        </form>
                        <span id="creators-review-cost"></span>
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
}

customElements.define('services-creators-component', ServicesCreators);