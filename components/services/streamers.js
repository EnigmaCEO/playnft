class ServicesStreamers extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <section id="section-streamers" class="gamers">
      <div class="container">
        <header class="section-header">
          <h2>Content Creators</h2>
          <p>Create NFTs</p>
        </header>

        <div class="wizard">
          <div class="wizard-inner">
            <div class="connecting-line"></div>
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="nav-item active">
                <a title="1. Social Login" class="nav-link" id="nav-streamers-login" role="tab" data-bs-toggle="tab"
                  aria-controls="streamers-login" href="#list-streamers-login">
                  <span class="round-tab">
                    <i class="fas fa-user-tie" style="font-size: 3.7vh"></i>
                  </span>
                </a>
              </li>
              <li role="presentation" class="nav-item disabled">
                <a title="2. Create NFTs" class="nav-link" id="nav-streamers-nfts" role="tab" data-bs-toggle="tab"
                  aria-controls="streamers-nfts" href="#list-streamers-nfts">
                  <span class="round-tab"><i class="fas fa-sd-card" style="font-size: 3.7vh"></i></span>
                </a>
              </li>
              <li role="presentation" class="nav-item disabled">
                <a title="3. NFT Package" class="nav-link" id="nav-streamers-packages" role="tab" data-bs-toggle="tab"
                  aria-controls="streamers-packages" href="#list-streamers-packages">
                  <span class="round-tab"><i class="fas fa-box" style="font-size: 3.7vh"></i></span>
                </a>
              </li>
              <li role="presentation" class="nav-item disabled">
                <a title="4. Review Order" class="nav-link" id="nav-streamers-review" role="tab" data-bs-toggle="tab"
                  aria-controls="streamers-review" href="#list-streamers-review">
                  <span class="round-tab"><i class="fas fa-puzzle-piece" style="font-size: 3.7vh"></i></span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="row spacer">&nbsp;</div>

        <div class="row">
          <div class="col-12">
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="list-streamers-login" role="tabpanel"
                aria-labelledby="nav-streamers-login">
                <div class="col-lg-12">
                  <h4>Creator Login</h4>

                  <div class="row gy-4 text-center">
                    <div class="pricing">
                      <div class="price"></div>

                      <br /><a href="#" class="btn-buy" id="login-streamers">Authenticate Twitch Account</a>
                    </div>
                    <div class="pricing">
                      <div class="price"></div>

                      <br /><a href="#" class="btn-buy" id="login-youtube">Authenticate YouTube Account</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="list-streamers-nfts" role="tabpanel" aria-labelledby="nav-streamers-nfts">
                <div class="col-md-12">
                  <div class="panel panel-primary" id="streamers-nfts-panel">
                    <div class="panel-heading">
                      <h4>NFT Inventory</h4>
                    </div>
                    <div style="text-align: end; padding-bottom: 20px;">
                      <button id="streamers-new-nfts" type="submit" data-bs-toggle="modal"
                        data-bs-target="#streamers-nfts-modal">
                        New NFT
                      </button>
                    </div>
                    <div class="panel-body">
                      <ul class="list-group" id="streamers-nfts">

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="list-streamers-packages" role="tabpanel"
                aria-labelledby="nav-streamers-packages">
                <div class="col-md-12">
                  <div class="panel panel-primary" id="streamers-packages-panel">
                    <div class="panel-heading">
                      <h4>Add NFT Supply</h4>
                    </div>
                    <div style="text-align: center; padding-bottom: 20px;">
                      <button id="streamers-extension-btn" type="button" class="btn btn-success">
                        Continue to Storefront
                      </button>
                    </div>
                    <div class="panel-body">
                      <ul class="list-group" id="streamers-packages">

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="list-streamers-review" role="tabpanel"
                aria-labelledby="nav-streamers-review">
                <div class="col-md-12">
                  <div class="panel panel-primary" id="streamers-review-panel">
                    <div class="panel-heading">
                      <h4>NFT Distribution Storefront</h4>
                      <p class="section-header">Share your storefront URL to start distributing your NFTs.</p>
                    </div>
                    <div class="panel-body">
                      <div class="flex-shrink-0 text-center">
                        <p class="game-icon">
                          <a target="_blank" id="storefront_url" href=""></a>
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

customElements.define('services-streamers-component', ServicesStreamers);