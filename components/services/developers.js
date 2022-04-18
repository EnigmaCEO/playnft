class ServicesDevelopers extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <section id="section-developers" class="gamers">
      <div class="container">
        <header class="section-header">
          <h2>Game Developers</h2>
          <p>Add your games to the NFT Playground</p>
        </header>

        <div class="wizard">
          <div class="wizard-inner">
            <div class="connecting-line"></div>
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="nav-item active">
                <a title="1. Create Publisher" class="nav-link" id="nav-developers-publisher" role="tab"
                  data-bs-toggle="tab" aria-controls="developers-publisher" href="#list-developers-publisher">
                  <span class="round-tab">
                    <i class="fas fa-user-tie" style="font-size: 3.7vh"></i>
                  </span>
                </a>
              </li>
              <li role="presentation" class="nav-item disabled">
                <a title="2. Create Game" class="nav-link" id="nav-developers-games" role="tab" data-bs-toggle="tab"
                  aria-controls="developers-games" href="#list-developers-games">
                  <span class="round-tab"><i class="fas fa-gamepad" style="font-size: 3.7vh"></i></span>
                </a>
              </li>
              <li role="presentation" class="nav-item disabled">
                <a title="3. Create Content" class="nav-link" id="nav-developers-content" role="tab"
                  data-bs-toggle="tab" aria-controls="developers-content" href="#list-developers-content">
                  <span class="round-tab"><i class="fas fa-puzzle-piece" style="font-size: 3.7vh"></i></span>
                </a>
              </li>
              <li role="presentation" class="nav-item disabled">
                <a title="4. Review Submission" class="nav-link" id="nav-developers-review" role="tab"
                  data-bs-toggle="tab" aria-controls="developers-review" href="#list-developers-review">
                  <span class="round-tab"><i class="fas fa-check" style="font-size: 3.7vh"></i></span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="row spacer">&nbsp;</div>

        <div class="row">
          <div class="col-12">
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="list-developers-publisher" role="tabpanel"
                aria-labelledby="nav-creators-wallet">
                <div class="col-lg-12">
                  <h4>Create Publisher</h4>

                  <div class="row gy-4">
                    <div class="col-lg-6 text-center">
                      <div class="service-box">
                        <h3>New Publisher</h3>
                        <p>
                          Create a Publisher profile
                        </p>
                        <div class="pricing">
                          <div class="price"></div>

                          <br /><a href="#" class="btn-buy" data-bs-toggle="modal"
                            data-bs-target="#developers-new-modal">Start Here</a>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 text-center">
                      <div class="service-box">
                        <h3>Existing Publisher</h3>
                        <p>
                          Manage your games and content
                        </p>
                        <div class="pricing">
                          <div class="price"></div>

                          <br /><a href="#" class="btn-buy" data-bs-toggle="modal"
                            data-bs-target="#developers-login-modal">Continue</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="list-developers-games" role="tabpanel"
                aria-labelledby="nav-developers-games">
                <div class="col-md-12">
                  <div class="panel panel-primary" id="developers-games-panel">
                    <div class="panel-heading">
                      <h4>Create a Game</h4>
                    </div>
                    <div style="text-align: end; padding-bottom: 20px;">
                      <button id="developers-new-game" type="submit" data-bs-toggle="modal"
                        data-bs-target="#developers-game-modal">
                        New Game
                      </button>
                    </div>
                    <div class="panel-body">
                      <ul class="list-group" id="developers-games">

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="list-developers-content" role="tabpanel"
                aria-labelledby="nav-developers-content">
                <div class="col-md-12">
                  <div class="panel panel-primary" id="developers-games-panel">
                    <div class="panel-heading">
                      <h4>Create Game Content</h4>
                    </div>
                    <div style="text-align: end; padding-bottom: 20px;">
                      <button id="developers-new-content" type="button" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#developers-content-modal">
                        New Content
                      </button>&nbsp;&nbsp;&nbsp;

                      <button id="developers-purchase-content" type="button" class="btn btn-success">
                        Submit Content
                      </button>
                    </div>
                    <div class="panel-body">
                      <ul class="list-group" id="developers-content">

                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="list-developers-review" role="tabpanel"
                aria-labelledby="nav-developers-review">
                <div class="col-md-12">
                  <div class="panel panel-primary" id="developers-review-panel">
                    <div class="panel-heading">
                      <h4>Submit your Content for Approval</h4>
                      <p class="section-header">Your content will appear after a successful approval. Thanks!</p>
                    </div>
                    <div class="panel-body">
                      <div class="flex-shrink-0 text-center">


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

customElements.define('services-developers-component', ServicesDevelopers);