class Modals extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="modal" tabindex="-1" id="gamers-game-modal">
            <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <h3 class="modal-title" id="gamers-game-name"></h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div class="container">
                    <div class="row">
                    <div class="col-lg-4">
                        <div class="flex-shrink-0 game-icon">
                        <span id="gamers-game-icon"></span>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <p><strong>Publisher:</strong> <span id="gamers-game-publisher"></span></p>
                        <p><strong>Website:</strong> <span id="gamers-game-website"></span></p>
                        <p>
                        <span id="gamers-game-platforms"></span>
                        </p>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-lg-12">
                        <div>
                        <hr>
                        </div>
                        <div>
                        <header>
                            <h4>Game Description</h4>
                            <p><span id="gamers-game-info"></span></p>
                        </header>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="gamers-games-select">Select Game</button>
                </div>
            </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="creators-game-modal">
            <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <h3 class="modal-title" id="creators-game-name"></h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div class="container">
                    <div class="row">
                    <div class="col-lg-4">
                        <div class="flex-shrink-0 game-icon">
                        <span id="creators-game-icon"></span>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <p><strong>Publisher:</strong> <span id="creators-game-publisher"></span></p>
                        <p><strong>Website:</strong> <span id="creators-game-website"></span></p>
                        <p>
                        <span id="creators-game-platforms"></span>
                        </p>
                    </div>
                    </div>
                    <div class="row">
                    <div class="col-lg-12">
                        <div>
                        <hr>
                        </div>
                        <div>
                        <header>
                            <h4>Game Description</h4>
                            <p><span id="creators-game-info"></span></p>
                        </header>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="creators-games-select">Select Game</button>
                </div>
            </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="gamers-content-modal">
            <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <h3 class="modal-title" id="gamers-content-title"></h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div class="container">
                    <div class="row">
                    <div class="col-lg-4">
                        <div class="flex-shrink-0 content-icon">
                        <span id="gamers-content-icon"></span>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <header>
                        <h4>Description</h4>
                        <p><span id="gamers-content-info"></span></p>
                        </header>
                    </div>
                    </div>
                </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="gamers-content-select">Select Content</button>
                </div>
            </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="creators-content-modal">
            <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <h3 class="modal-title" id="creators-content-title"></h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <div class="container">
                    <div class="row">
                    <div class="col-lg-4">
                        <div class="flex-shrink-0 content-icon">
                        <span id="creators-content-icon"></span>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <header>
                        <h4>Description</h4>
                        <p><span id="creators-content-info"></span></p>
                        </header>
                    </div>
                    </div>
                </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" id="creators-content-select">Select Content</button>
                </div>
            </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="developers-new-modal">
            <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <h3 class="modal-title">Create PlayNFT Publisher Profile</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="developers-new-form" action="#" method="post">
                <div class="modal-body">
                    <div class="container">
                    <div class="gy-4">

                        <div class="col-md-6 form-floating mb-3">
                        <input type="text" name="developers_name" id="developers_name" class="form-control"
                            placeholder="Publisher Name" required />
                        <label for="developers_name">Publisher Name</label>
                        <div id="PublisherNameFeedback" class="invalid-feedback">
                            Publisher Name already exists.
                        </div>
                        </div>

                        <div class="col-md-6 form-floating mb-3">
                        <input type="url" class="form-control" name="developers_website" id="developers_website"
                            placeholder="Publisher Website" required />
                        <label for="developers_website">Publisher Website</label>
                        </div>

                        <div class="col-md-6 form-floating mb-3">
                        <input type="email" class="form-control" name="developers_email" id="developers_email"
                            placeholder="Notification Email" required />
                        <label for="developers_email">Notification Email</label>
                        </div>

                        <div class="col-md-12 form-floating mb-3">
                        <input type="text" class="form-control" name="developers_wallet" id="developers_wallet"
                            placeholder="Payment Wallet" required />
                        <label for="developers_wallet">Ethereum wallet address used for payments</label>
                        </div>

                        <div class="col-md-12 mb-3">
                        <textarea class="form-control" name="developers_info" id="developers_info" rows="6"
                            placeholder="Publisher Info" style="height: max-content;"></textarea>
                        </div>

                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="developers-new-publisher">Create Publisher</button>
                </div>
                </form>
            </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="developers-login-modal">
            <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <h3 class="modal-title">PlayNFT Publisher Login</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="developers-login-form" action="#" method="post">
                <div class="modal-body">
                    <div class="container">
                    <div class="gy-4">

                        <div class="col-md-6 form-floating mb-3">
                        <input type="text" name="developers_name" id="login_developers_name" class="form-control"
                            placeholder="Publisher Name" required />
                        <label for="developers_name">Publisher Name</label>

                        </div>

                        <div class="col-md-6 form-floating mb-3">
                        <input type="email" class="form-control" name="developers_email" id="login_developers_email"
                            placeholder="Notification Email" required />
                        <label for="developers_email">Notification Email</label>
                        </div>

                        <div class="col-md-12 form-floating mb-3">
                        <input type="text" class="form-control" name="developers_wallet" id="login_developers_wallet"
                            placeholder="Payment Wallet" required />
                        <label for="developers_wallet">Ethereum wallet address used for payments</label>
                        </div>

                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="developers-login-publisher">Login</button>
                </div>
                </form>
            </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="developers-view-modal">
            <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <h3 class="modal-title">PlayNFT Publisher Profile</h3>
                </div>
                <form id="developers-edit-form" action="#" method="post">
                <input type="hidden" name="developers_id" id="edit_developers_id" class="form-control" />
                <div class="modal-body">
                    <div class="container">
                    <div class="gy-4">

                        <div class="col-md-6 form-floating mb-3">
                        <input type="text" name="developers_name" id="edit_developers_name" class="form-control"
                            placeholder="Publisher Name" readonly />
                        <label for="developers_name">Publisher Name</label>
                        <div id="PublisherFeedback" class="invalid-feedback">
                            Publisher not found.
                        </div>
                        </div>

                        <div class="col-md-6 form-floating mb-3">
                        <input type="url" class="form-control" name="developers_website" id="edit_developers_website"
                            placeholder="Publisher Website" required />
                        <label for="developers_website">Publisher Website</label>
                        </div>

                        <div class="col-md-6 form-floating mb-3">
                        <input type="email" class="form-control" name="developers_email" id="edit_developers_email"
                            placeholder="Notification Email" required />
                        <label for="developers_email">Notification Email</label>
                        </div>

                        <div class="col-md-12 form-floating mb-3">
                        <input type="text" class="form-control" name="developers_wallet" id="edit_developers_wallet"
                            placeholder="Payment Wallet" readonly />
                        <label for="developers_wallet">Ethereum wallet address used for payments</label>
                        </div>

                        <div class="col-md-12 mb-3">
                        <textarea class="form-control" name="developers_info" id="edit_developers_info" rows="6"
                            placeholder="Publisher Info" style="height: max-content;"></textarea>
                        </div>

                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" id="developers-edit-publisher">Continue</button>
                </div>
                </form>
            </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="developers-game-modal">
            <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <h3 class="modal-title">PlayNFT Game Profile</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="developers-game-form" action="#" method="post">
                <input type="hidden" name="developers_game_id" id="developers_game_id" class="form-control" />
                <input type="hidden" name="developers_publisher_id" id="developers_publisher_id" class="form-control" />
                <div class="modal-body">
                    <div class="container">
                    <div class="gy-4">

                        <div class="col-md-6 form-floating mb-3">
                        <input type="text" name="developers_game_name" id="developers_game_name" class="form-control"
                            placeholder="Game Name" required />
                        <label for="developers_game_name">Game Name</label>
                        <div id="PublisherGameFeedback" class="invalid-feedback">
                            Game not found.
                        </div>
                        </div>

                        <div class="col-md-6 mb-3">
                        <label for="developers_game_icon" class="form-label">Upload square image</label>
                        <input class="form-control" type="file" name="developers_game_icon" id="developers_game_icon"
                            accept=".png">
                        </div>

                        <div class="col-md-6 form-floating mb-3">
                        <select class="form-select" id="developers_game_status" name="developers_game_status"
                            aria-label="Development Status">
                            <option value="0">In Development</option>
                            <option value="1">Live</option>
                        </select>
                        <label for="developers_game_status">Development Status</label>
                        </div>

                        <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="developers_game_steam"
                            name="developers_game_steam">
                        <label class="form-check-label" for="developers_game_steam"><i class="fab fa-steam-symbol"></i> Steam
                            Platform</label>
                        </div>

                        <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="developers_game_apple"
                            name="developers_game_apple">
                        <label class="form-check-label" for="developers_game_apple"><i class="fab fa-app-store-ios"></i> Apple
                            Platform</label>
                        </div>

                        <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" id="developers_game_google"
                            name="developers_game_google">
                        <label class="form-check-label" for="developers_game_google"><i class="fab fa-google-play"></i> Google
                            Platform</label>
                        </div>

                        <div class="col-md-12 mb-3">
                        <textarea class="form-control" name="developers_game_info" id="developers_game_info" rows="6"
                            placeholder="Game Info" style="height: max-content;"></textarea>
                        </div>

                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="developers-edit-game">Submit</button>
                </div>
                </form>
            </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="developers-content-modal">
            <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <h3 class="modal-title">PlayNFT Game Content</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="developers-content-form" action="#" method="post">
                <input type="hidden" name="developers_content_id" id="developers_content_id" class="form-control" />
                <input type="hidden" name="developers_game_id" id="developers_game_id" class="form-control" />
                <input type="hidden" name="developers_publisher_id" id="developers_publisher_id" class="form-control" />
                <div class="modal-body">
                    <div class="container">
                    <div class="gy-4">

                        <div class="col-md-6 form-floating mb-3">
                        <input type="text" name="developers_content_name" id="developers_content_name" class="form-control"
                            placeholder="Content Name" required />
                        <label for="developers_content_name">Content Name</label>
                        <div id="PublisherGameFeedback" class="invalid-feedback">
                            Content not found.
                        </div>
                        </div>

                        <div class="col-md-6 form-floating mb-3">
                        <input type="text" name="developers_content_code" id="developers_content_code" class="form-control"
                            placeholder="Content Code" required />
                        <label for="developers_content_code">Content Code</label>
                        This code will be returned when a user's token has been linked with this content. (Example:
                        unlock_quest1)<br />

                        </div>

                        <div class="col-md-6 form-floating mb-3">
                        <input type="number" name="developers_content_cost" id="developers_content_cost" class="form-control"
                            placeholder="Content Cost" min="1" step="any" required />
                        <label for="developers_content_cost">Content Cost</label>
                        </div>

                        <div class="col-md-6 mb-3">
                        <label for="developers_content_icon" class="form-label">Upload square image</label>
                        <input class="form-control" type="file" name="developers_content_icon" id="developers_content_icon"
                            accept=".png">
                        </div>

                        <div class="col-md-6 form-floating mb-3">
                        <select class="form-select" id="developers_content_type" name="developers_content_type"
                            aria-label="Content Type">
                            <option value="0">Unlockable Item</option>
                            <option value="1">Modifier</option>
                            <option value="2">Consummable</option>
                            <option value="3">Event</option>
                        </select>
                        <label for="developers_content_type">Content Type</label>
                        </div>

                        <div class="form-check form-switch mb-3">
                        if selected, this exclusive content is only able to be linked to one NFT.<br />
                        <input class="form-check-input" type="checkbox" id="developers_content_exclusive"
                            name="developers_content_exclusive">
                        <label class="form-check-label" for="developers_content_exclusive">Exclusive?</label>
                        </div>

                        <div class="col-md-6 form-floating mb-3">
                        <select class="form-select" id="developers_content_target" name="developers_content_target"
                            aria-label="Content Target">
                            <option value="0">Everyone</option>
                            <option value="1">Creators Only</option>
                            <option value="2">Streamers Only</option>
                            <option value="3">Gamers Only</option>
                        </select>
                        <label for="developers_content_target">Content Target</label>
                        </div>

                        <div class="col-md-12 mb-3">
                        Provide detailed instructions on how this content is accessed in the game.<br />
                        <textarea class="form-control" name="developers_content_info" id="developers_content_info" rows="6"
                            placeholder="Content Instructions" style="height: max-content;"></textarea>
                        </div>

                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="developers-edit-content">Submit</button>
                </div>
                </form>
            </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" id="streamers-nfts-modal">
            <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                <h3 class="modal-title">Edit NFT Data</h3>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="streamers-nfts-form" action="#" method="post">
                <input type="hidden" name="streamers_nft_id" id="streamers_nft_id" class="form-control" />
                <input type="hidden" name="streamer_id" id="streamer_id" class="form-control" />
                <div class="modal-body">
                    <div class="container">
                    <div class="gy-4">

                        <div class="col-md-6 form-floating mb-3">
                        <input type="text" name="streamers_nft_name" id="streamers_nft_name" class="form-control"
                            placeholder="NFT Name" required />
                        <label for="streamers_nft_name">Token Name</label>
                        <div id="StreamerNFTFeedback" class="invalid-feedback">
                            Token not found.
                        </div>
                        </div>

                        <div class="col-md-6 mb-3">
                        <label for="streamers_nft_icon" class="form-label">Upload image</label>
                        <input class="form-control" type="file" name="streamers_nft_icon" id="streamers_nft_icon"
                            accept=".png" required>
                        </div>

                        <div class="col-md-6 form-floating mb-3">
                        <select class="form-select" id="streamers_nft_status" name="streamers_nft_status"
                            aria-label="Visibility Status">
                            <option value="0" selected="selected">Offline</option>
                            <option value="1">Live</option>
                        </select>
                        <label for="streamers_nft_status">Visibility Status</label>
                        </div>

                        <div class="col-md-6 form-floating mb-3">
                        <select class="form-select" name="streamers_nft_cost" id="streamers_nft_cost"
                            aria-label="Visibility Status">
                            <option value="tier1" selected="selected">$0.99</option>
                            <option value="tier2">$1.99</option>
                            <option value="tier3">$2.99</option>
                            <option value="tier4">$3.99</option>
                            <option value="tier5">$4.99</option>
                            <option value="tier6">$5.99</option>
                            <option value="tier7">$6.99</option>
                            <option value="tier8">$7.99</option>
                            <option value="tier9">$8.99</option>
                            <option value="tier10">$9.99</option>
                        </select>
                        <label for="streamers_nft_cost">Token Cost</label>
                        </div>

                        <div class="col-md-12 mb-3">
                        <textarea class="form-control" name="streamers_nft_description" id="streamers_nft_description"
                            rows="6" placeholder="Description" style="height: max-content;"></textarea>
                        </div>

                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="streamers-edit-nft">Submit</button>
                </div>
                </form>
            </div>
            </div>
        </div>
        <div class="modal" tabindex="-2" role="dialog" id="spinnerModal">
            <div class="modal-dialog modal-dialog-centered text-center" role="document">
            <span class="fa fa-spinner fa-spin fa-3x w-100"></span>
            </div>
        </div>
        <div class="modal" tabindex="-1" id="purchase-content-modal">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">Purchase NFT Link</h3>
                    </div>
                    <div class="modal-body">
                    <services-creators-component modal="true"></services-creators-component>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" tabindex="-1" id="purchase-twitch-modal">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title">Purchase Twitch Token</h3>
                    </div>
                    <div class="modal-body" style="text-align: center;">
                        <p><img id="twitch_token_picture" style="width: 50%;" src=""></p>
                        <h5 id="twitch_token_name" ></h5>
                        <hr>
                        <p style="text-align: left;font-weight:bold">Description:</p>
                        <p id="twitch_token_description" style="text-align: left;"></p>
                        <div id="payment-options" class="modal-footer"></div>
                        
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('modals-component', Modals);