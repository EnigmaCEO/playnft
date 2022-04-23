var tokenID = "";
var tokenIndex = "";
var tokenSupply = 0;
var tokenImage = "";
var walletID = "";
var publisherID = "";
var gameID = "";
var contentID = "";
var streamerID = "";
var chainID = "enj";
var TIERS = { 99: 'tier1', 199: 'tier2', 299: 'tier3', 399: 'tier4', 499: 'tier5', 599: 'tier6', 699: 'tier7', 799: 'tier8', 899: 'tier9', 999: 'tier10' };
var PRICES = { tier1: 99, tier2: 199, tier3: 299, tier4: 399, tier5: 499, tier6: 599, tier7: 699, tier8: 799, tier9: 899, tier10: 999 };
var CHAINS = { eth: 1, avalanche: 43114, polygon: 137, heco: 128 };
var simplified_abi = [
    {
        'inputs': [{ 'internalType': 'address', 'name': 'owner', 'type': 'address' }],
        'name': 'balanceOf',
        'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
        'payable': false, 'stateMutability': 'view', 'type': 'function', 'constant': true
    },
    {
        'inputs': [],
        'name': 'name',
        'outputs': [{ 'internalType': 'string', 'name': '', 'type': 'string' }],
        'stateMutability': 'view', 'type': 'function', 'constant': true
    },
    {
        'inputs': [{ 'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256' }],
        'name': 'ownerOf',
        'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
        'payable': false, 'stateMutability': 'view', 'type': 'function', 'constant': true
    },
    {
        'inputs': [{ 'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256' }],
        'name': 'tokenURI',
        'outputs': [{ 'internalType': 'string', 'name': '', 'type': 'string' }],
        'payable': false, 'stateMutability': 'view', 'type': 'function', 'constant': true
    },
    {
        'inputs': [],
        'name': 'symbol',
        'outputs': [{ 'internalType': 'string', 'name': '', 'type': 'string' }],
        'stateMutability': 'view', 'type': 'function', 'constant': true
    },
    {
        'inputs': [],
        'name': 'totalSupply',
        'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
        'stateMutability': 'view', 'type': 'function', 'constant': true
    },
];
/*********** Moralis API **********************/

const serverUrl = "https://s4wy4pswzlfd.usemoralis.com:2053/server";
const appId = "brwT5yD5Q3O6yPw4MLI6EnDYK0TZmdZgTR6YFFte";

Moralis.start({ serverUrl, appId });
Moralis.enableWeb3();

Moralis.onAccountChanged(async (account) => {
    const confirmed = confirm("Link this address to PlayNFT?");
    if (confirmed) {
        await Moralis.link(account);
    }
});

async function getContractOwner(chain, item, owner) {
    let address = item.token_address;

    if (chain == "polygon" || chain == "avalanche") {

        await $.getJSON('https://api.covalenthq.com/v1/' + CHAINS[chain] + '/tokens/' + address + '/nft_metadata/' + item.token_id + '/?key=ckey_859b732db5394a57936af2db4db', function (data) {
            console.log("Data: " + JSON.stringify(data));
            var nfts = data.data.items;

            nfts.forEach(function (item) {
                console.log(item)
                if (item.type == "nft") {
                    if (!item.contract_name) return;
                    if (!item.nft_data) return;

                    if (item.nft_data[0].original_owner.toLowerCase() != owner.toLowerCase()) return;

                    if (!item.nft_data[0].external_data.image) return;
                    $.getJSON('https://api.covalenthq.com/v1/' + CHAINS[chain] + '/tokens/' + address + '/nft_token_ids/?key=ckey_859b732db5394a57936af2db4db', function (supply) {
                        console.log("Supply: " + JSON.stringify(supply));
                        tokenSupply = supply.data.pagination.total_count;
                        let token_content = { tokenId: item.contract_address, tokenName: item.contract_name, tokenImage: item.nft_data[0].external_data.image.replace("ipfs://", "https://ipfs.io/ipfs/"), tokenIndex: 0, tokenSupply: supply.data.pagination.total_count };

                        $("#creators-token-template")
                            .tmpl(token_content)
                            .appendTo("#creators-nfts");
                    });
                }
            });

            stopLoading();
        })
    }
}

async function getNFTs(chain, address) {
    startLoading();
    console.log(chain)
    console.log(address)

    if (chain == "heco") {
        await Moralis.switchNetwork(CHAINS[chain]);
        const chainId = await Moralis.chainId;
        console.log(chainId);

        $.getJSON('https://api.covalenthq.com/v1/' + CHAINS[chain] + '/address/' + address + '/balances_v2/?nft=true&no-nft-fetch=false&key=ckey_859b732db5394a57936af2db4db', function (data) {
            console.log("Data: " + JSON.stringify(data));
            var nfts = data.data.items;

            nfts.forEach(function (item) {
                console.log(item)
                if (item.type == "nft" && item.balance > 0) {
                    if (!item.contract_name) return;

                    let token_content = { tokenId: item.contract_address, tokenName: item.contract_name, tokenImage: item.logo_url.replace("ipfs://", "https://ipfs.io/ipfs/"), tokenIndex: 0 };

                    $("#token-template")
                        .tmpl(token_content)
                        .appendTo("#gamers-nfts");
                }
            });

            openTab("#nav-gamers-nfts");
        })
    }

    if (chain == "avalanche" || chain == "polygon") {
        const options = { chain: chain, address: address };
        console.log(options)
        const tokenMetadata = await Moralis.Web3API.account.getNFTs(options).then(function (details) {
            console.log(details.result)
            var nfts = details.result;

            nfts.forEach(function (item) {
                console.log(item)
                if (item.amount > 0) {
                    if (!item.metadata) return;
                    if (!item.name) return;

                    let meta = jQuery.parseJSON(item.metadata);
                    if (!meta.image) return;

                    let token_content = { tokenId: item.token_address, tokenName: item.name, tokenImage: meta.image.replace("ipfs://", "https://ipfs.io/ipfs/"), tokenIndex: item.token_id };

                    $("#token-template")
                        .tmpl(token_content)
                        .appendTo("#gamers-nfts");
                }
            });

            openTab("#nav-gamers-nfts");
        }).catch((err) => {
            console.error(err);
        });
    }

    if (chain == "velas") {

        await fetch('https://graphql.bitquery.io', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': 'BQYv8qjokwd5p934UXoQc2ywlZ3Bh19Q'
            },
            body: JSON.stringify({
                query: '{\
            ethereum(network: velas) {\
                address(address: {is: "'+ address + '"}) {\
                balances {\
                    currency {\
                    address\
                    symbol\
                    tokenType\
                    tokenId\
                    name\
                    }\
                    value\
                }\
                }\
            }\
            }'})
        })
            .then(async function (r) {
                await r.json().then(function (data) {
                    console.log(data)

                    var nfts = data.data.ethereum.address[0].balances;
                    if (nfts) {
                        console.log(nfts)
                        nfts.forEach(async function (item) {

                            if (item.value == 0) return;
                            if (item.currency.tokenType == "") return;
                            if (item.currency.address == "-") return;
                            console.log(item)

                            let token_content = { tokenId: item.currency.address, tokenName: item.currency.name, tokenImage: "/assets/img/velas-vlx-logo.svg", tokenIndex: item.currency.tokenId };

                            $("#token-template")
                                .tmpl(token_content)
                                .appendTo("#gamers-nfts");
                        })

                        openTab("#nav-gamers-nfts");
                    }
                })

            });
    }

    if (chain == "xrp") {
        const PUBLIC_SERVER = "wss://xrplcluster.com/"
        const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
        await client.connect()

        try {
            const data = await client.request({
                method: "account_nfts",
                account: address
            })
            console.log(data)
            var nfts = data.result.account_nfts;

            nfts.forEach(async function (item) {

                console.log(item)
                if (item.URI == "") return;
                let meta = xrpl.convertHexToString(item.URI)
                $.ajax({ url: "https://api.playnft.io/getmeta", type: "POST", crossDomain: true, data: JSON.stringify({ itemURI: meta }), dataType: "json", contentType: "application/json" }).done(function (metaData) {
                    let data = jQuery.parseJSON(metaData);
                    console.log(data)

                    let token_content = { tokenId: item.TokenID, tokenName: data.name, tokenImage: data.image, tokenIndex: item.TokenTaxon };

                    $("#token-template")
                        .tmpl(token_content)
                        .appendTo("#gamers-nfts");

                })
            })

            openTab("#nav-gamers-nfts");

        } catch (error) {
            console.log(error)
            stopLoading()
        }

        client.disconnect();
    }

    if (chain == "solana") {
        let options = { address: address };
        console.log(options)
        const tokenMetadata = await Moralis.SolanaAPI.account.getNFTs(options).then(function (details) {
            console.log(details)
            var nfts = details;

            nfts.forEach(async function (item) {
                console.log(item)
                options = { network: "mainnet", address: item.associatedTokenAddress };
                const tokenMetadata = await Moralis.SolanaAPI.nft.getNFTMetadata(options).then(function (result) {
                    console.log(result)
                    var metaData = result;

                    metaData.forEach(function (meta) {
                        if (!meta.mint) return;
                        if (!meta.name) return;
                        if (!meta.metaplex.metadataUri) return;
                        let data = jQuery.parseJSON(meta.metaplex.metadataUri);
                        console.log(data)

                        let token_content = { tokenId: item.associatedTokenAddress, tokenName: meta.name, tokenImage: data.image.replace("ipfs://", "https://ipfs.io/ipfs/"), tokenIndex: data.token_id };

                        $("#token-template")
                            .tmpl(token_content)
                            .appendTo("#gamers-nfts");
                    });
                });
            });

            openTab("#nav-gamers-nfts");
        }).catch((err) => {
            console.error(err);
        });
    }

    if (chain == "near") {
        $.getJSON('https://api.aurorascan.dev/api?module=account&action=tokennfttx&address=' + address + '&sort=asc', function (data) {
            console.log("Data: " + JSON.stringify(data));
            var transfers = data.result;
            var nftArray = [];

            transfers.forEach(function (item) {
                console.log(item)

                var nftAddress = item.contractAddress + '-' + item.tokenID + '-' + item.tokenName;

                if (item.to == address) {
                    if (!nftArray.includes(nftAddress)) {
                        nftArray.push(nftAddress);
                    }
                } else
                    if (item.from == address) {
                        if (nftArray.includes(nftAddress)) {
                            nftArray.pop(nftAddress);
                            const index = nftArray.indexOf(nftAddress);
                            if (index > -1) {
                                nftArray.splice(index, 1);
                            }
                        }
                    }
            });

            const ethers = Moralis.web3Library
            const provider = new ethers.providers.JsonRpcProvider('https://mainnet.aurora.dev/');



            nftArray.forEach(async function (item) {
                console.log(item)
                const nft = item.split('-')
                let contract = await new ethers.Contract(nft[0], simplified_abi, provider);
                var tokenURI = "";
                let image = "/assets/img/near-protocol-near-logo.svg";

                try {
                    await contract.tokenURI(nft[1]).then(r => {
                        console.log("URL: " + r.toString().replace("ipfs://", "https://ipfs.io/ipfs/"))
                        tokenURI = r.toString()
                    }).catch(error => console.log(error))

                } catch (error) {
                    console.log(error)
                }

                await $.getJSON(tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/"), function (metaData) {
                    console.log(metaData)

                    if (metaData) {
                        image = metaData.image.replace("ipfs://", "https://ipfs.io/ipfs/");
                    }
                }).catch((err) => {
                    //console.error(err);
                });

                let token_content = { tokenId: nft[0], tokenName: nft[2], tokenImage: image, tokenIndex: nft[1] };

                $("#token-template")
                    .tmpl(token_content)
                    .appendTo("#gamers-nfts");
            });

            openTab("#nav-gamers-nfts");
        })
    }
}

async function getCreatorsNFTs(chain, address) {
    startLoading();
    console.log(chain)
    console.log(address)

    if (chain == "heco") {
        await Moralis.switchNetwork(CHAINS[chain]);
        const chainId = await Moralis.chainId;
        console.log(chainId);

        $.getJSON('https://api.covalenthq.com/v1/' + CHAINS[chain] + '/address/' + address + '/balances_v2/?nft=true&no-nft-fetch=false&key=ckey_859b732db5394a57936af2db4db', function (data) {
            console.log("Data: " + JSON.stringify(data));
            var nfts = data.data.items;

            nfts.forEach(function (item) {
                console.log(item)
                if (item.type == "nft" && item.balance > 0) {
                    if (!item.contract_name) return;

                    let token_content = { tokenId: item.contract_address, tokenName: item.contract_name, tokenImage: item.logo_url, tokenIndex: 0 };

                    $("#creators-token-template")
                        .tmpl(token_content)
                        .appendTo("#creators-nfts");
                }
            });

            openTab("#nav-creators-nfts");
        })
    }

    if (chain == "avalanche" || chain == "polygon") {
        let options = { chain: chain, address: address };
        const tokenMetadata = await Moralis.Web3API.account.getNFTs(options).then(async function (details) {
            console.log(details.result)
            var nfts = details.result;
            var tokenArray = [];

            for (const item of nfts) {
                console.log(item)

                if (item.is_valid == 1) {
                    if (!item.metadata) continue;
                    if (!item.name) continue;

                    let meta = jQuery.parseJSON(item.metadata);
                    if (!meta.image) continue;

                    if (!tokenArray.includes(item.token_address)) {
                        tokenArray.push(item.token_address);
                    } else {
                        continue;
                    }

                    await getContractOwner(chain, item, address)

                }
            }

            openTab("#nav-creators-nfts");
        }).catch((err) => {
            console.error(err);
        });
    }

    if (chain == "velas") {

        await fetch('https://graphql.bitquery.io', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': 'BQYv8qjokwd5p934UXoQc2ywlZ3Bh19Q'
            },
            body: JSON.stringify({
                query: '{\
            ethereum(network: velas) {\
                address(address: {is: "'+ address + '"}) {\
                balances {\
                    currency {\
                    address\
                    symbol\
                    tokenType\
                    tokenId\
                    name\
                    }\
                    value\
                }\
                }\
            }\
            }'})
        })
            .then(async function (r) {
                await r.json().then(function (data) {
                    console.log(data)

                    var nfts = data.data.ethereum.address[0].balances;
                    console.log(nfts)
                    nfts.forEach(async function (item) {

                        if (item.value == 0) return;
                        if (item.currency.tokenType == "") return;
                        if (item.currency.address == "-") return;
                        console.log(item)

                        const ethers = Moralis.web3Library

                        const provider = new ethers.providers.JsonRpcProvider('https://evmexplorer.velas.com/rpc');

                        let contract = await new ethers.Contract(item.currency.address, simplified_abi, provider);
                        var totalSupply = 1;
                        var owner = "";

                        await contract.ownerOf(0).then(r => {
                            console.log(r.toString())
                            owner = r.toString()
                        }).catch(error => console.log(error))

                        if (owner.toLowerCase() != address.toLowerCase()) return;

                        await contract.totalSupply().then(r => {
                            console.log('Total Supply: ' + r.toNumber())
                            totalSupply = r.toNumber()
                        })


                        tokenSupply = totalSupply;
                        let token_content = { tokenId: item.currency.address, tokenName: item.currency.name, tokenImage: "/assets/img/velas-vlx-logo.svg", tokenIndex: 0, tokenSupply: totalSupply };

                        $("#creators-token-template")
                            .tmpl(token_content)
                            .appendTo("#creators-nfts");
                    })

                    openTab("#nav-creators-nfts");

                })

            })
    }

    if (chain == "xrp") {
        const PUBLIC_SERVER = "wss://xrplcluster.com/"
        const client = new xrpl.Client("wss://xls20-sandbox.rippletest.net:51233")
        await client.connect()
        try {
            const data = await client.request({
                method: "account_nfts",
                account: address
            })
            console.log(data)
            var nfts = data.result.account_nfts;

            nfts.forEach(async function (item) {

                console.log(item)
                if (item.URI == "") return;
                if (item.Issuer.toLowerCase() != address.toLowerCase()) return;

                let meta = xrpl.convertHexToString(item.URI)
                $.ajax({ url: "https://api.playnft.io/getmeta", type: "POST", crossDomain: true, data: JSON.stringify({ itemURI: meta }), dataType: "json", contentType: "application/json" }).done(function (metaData) {
                    let data = jQuery.parseJSON(metaData);
                    console.log(data)

                    tokenSupply = 1;
                    let token_content = { tokenId: item.TokenID, tokenName: data.name, tokenImage: data.image, tokenIndex: 0, tokenSupply: 1 };

                    $("#creators-token-template")
                        .tmpl(token_content)
                        .appendTo("#creators-nfts");


                })
            })

            openTab("#nav-creators-nfts");

        } catch (error) {
            console.log(error)
            stopLoading()
        }

        client.disconnect();
    }

    if (chain == "solana") {
        let options = { address: address };
        console.log(options)
        const tokenMetadata = await Moralis.SolanaAPI.account.getNFTs(options).then(function (details) {
            console.log(details)
            var nfts = details;

            nfts.forEach(async function (item) {
                console.log(item)
                options = { address: item.associatedTokenAddress };
                const tokenMetadata = await Moralis.SolanaAPI.nft.getNFTMetadata(options).then(function (result) {
                    console.log(result)
                    var metaData = result;

                    metaData.forEach(function (meta) {
                        if (!meta.mint) return;
                        if (!meta.name) return;
                        if (!meta.metaplex.metadataUri) return;
                        let data = jQuery.parseJSON(meta.metaplex.metadataUri);
                        console.log(data)

                        let token_content = { tokenId: item.associatedTokenAddress, tokenName: meta.name, tokenImage: data.image.replace("ipfs://", "https://ipfs.io/ipfs/"), tokenIndex: 0, tokenSupply: 1 };

                        $("#creators-token-template")
                            .tmpl(token_content)
                            .appendTo("#creators-nfts");
                    });
                });
            });

            openTab("#nav-creators-nfts");
        }).catch((err) => {
            console.error(err);
        });
    }

    if (chain == "near") {
        $.getJSON('https://api.aurorascan.dev/api?module=account&action=txlist&address=' + address + '&sort=asc&apikey=5YZZTXW2DDRP89PXN7DUE7TY914E2IV456', function (data) {
            console.log("Data: " + JSON.stringify(data));
            let transfers = data.result;
            var nftArray = [];

            transfers.forEach(function (item) {
                console.log(item)

                var nftAddress = item.contractAddress;

                if (item.to == "" && item.input != "") {
                    if (!nftArray.includes(nftAddress)) {
                        nftArray.push(nftAddress);
                    }
                }
            });

            const ethers = Moralis.web3Library
            const provider = new ethers.providers.JsonRpcProvider('https://mainnet.aurora.dev/');



            nftArray.forEach(async function (item) {
                console.log(item)

                let contract = await new ethers.Contract(item, simplified_abi, provider);
                var tokenURI = "";
                let image = "/assets/img/near-protocol-near-logo.svg";
                var totalSupply = 1;
                var tokenName = "";

                try {
                    await contract.name().then(r => {
                        tokenName = r.toString()
                    })

                } catch (error) {
                    console.log(error)
                    return;
                }

                try {
                    await contract.totalSupply().then(r => {
                        console.log('Total Supply: ' + r.toNumber())
                        totalSupply = r.toNumber()
                    })

                } catch (error) {
                    console.log(error)
                    return;
                }

                let token_content = { tokenId: item, tokenName: tokenName, tokenImage: image, tokenIndex: 0, tokenSupply: totalSupply };

                $("#creators-token-template")
                    .tmpl(token_content)
                    .appendTo("#creators-nfts");
            });

            openTab("#nav-creators-nfts");
        })
    }
}

async function AddHecoNetwork() {
    const chainId = 128;
    const chainName = "heco-mainnet";
    const currencyName = "HECO";
    const currencySymbol = "HT";
    const rpcUrl = "https://http-mainnet.hecochain.com";
    const blockExplorerUrl = "https://scan.hecochain.com";

    await Moralis.addNetwork(
        chainId,
        chainName,
        currencyName,
        currencySymbol,
        rpcUrl,
        blockExplorerUrl
    )

    await Moralis.switchNetwork(chainId);
}

async function AddAvaxNetwork() {
    const chainId = 43114;
    const chainName = "Avalanche Mainnet";
    const currencyName = "AVAX";
    const currencySymbol = "AVAX";
    const rpcUrl = "https://api.avax.network/ext/bc/C/rpc";
    const blockExplorerUrl = "https://cchain.explorer.avax.network/";

    await Moralis.addNetwork(
        chainId,
        chainName,
        currencyName,
        currencySymbol,
        rpcUrl,
        blockExplorerUrl
    );

    await Moralis.switchNetwork(chainId);
}

async function AddPolygonNetwork() {
    const chainId = 137;
    const chainName = "Polygon";
    const currencyName = "MATIC";
    const currencySymbol = "MATIC";
    const rpcUrl = "https://polygon-rpc.com";
    const blockExplorerUrl = "https://polygonscan.com/";

    await Moralis.addNetwork(
        chainId,
        chainName,
        currencyName,
        currencySymbol,
        rpcUrl,
        blockExplorerUrl
    );

    await Moralis.switchNetwork(chainId);
}

async function AddVelasNetwork() {
    const chainId = 106;
    const chainName = "Velas";
    const currencyName = "Velas";
    const currencySymbol = "VLX";
    const rpcUrl = "https://evmexplorer.velas.com/rpc";
    const blockExplorerUrl = "https://evmexplorer.velas.com";
    const providerUrl = "wss://api.velas.com"

    await Moralis.enableWeb3();
    const web3 = new Web3(providerUrl);

    await Moralis.addNetwork(
        chainId,
        chainName,
        currencyName,
        currencySymbol,
        rpcUrl,
        blockExplorerUrl
    )

    await Moralis.switchNetwork(chainId);
}

async function AddNEARNetwork() {
    const chainId = 1313161554;
    const chainName = "Aurora";
    const currencyName = "Ethereum";
    const currencySymbol = "ETH";
    const rpcUrl = "https://mainnet.aurora.dev";
    const blockExplorerUrl = "https://explorer.mainnet.aurora.dev/";
    const providerUrl = "wss://mainnet.aurora.dev"

    await Moralis.enableWeb3();
    const web3 = new Web3(providerUrl);

    await Moralis.addNetwork(
        chainId,
        chainName,
        currencyName,
        currencySymbol,
        rpcUrl,
        blockExplorerUrl
    )

    await Moralis.switchNetwork(chainId);
}


async function moralisLogin(chain) {
    const isWeb3Active = Moralis.ensureWeb3IsInstalled()

    if (isWeb3Active) {
        console.log("Activated");
    } else {
        await Moralis.enableWeb3();
    }

    if (chain == "heco") {
        AddHecoNetwork();
    }
    if (chain == "avalanche") {
        AddAvaxNetwork();
    }
    if (chain == "polygon") {
        AddPolygonNetwork();
    }
    if (chain == "velas") {
        AddVelasNetwork();
    }
    if (chain == "near") {
        AddNEARNetwork();
    }

    let user = Moralis.User.current();
    console.log(chain)
    console.log(CHAINS[chain])
    if (!user) {
        let user = await Moralis.authenticate({ signingMessage: "PlayNFT using Moralis", type: chain })
            .then(function (user) {
                return user.get("ethAddress");
            })
            .catch(function (error) {
                console.log(error);
                return null;
            });

    } else {
        console.log(user)
        return user.get("ethAddress");
    }
}

/*********** Moralis API **********************/

function hideSections() {
    $("section").hide();
    $(".hero .container").hide();
    $(".hero").height("0px");
}

function showSections() {
    $("section").show();
    $(".hero").height("100vh");
    $(".hero .container").show();
    $("#section-gamers").hide();
    $("#section-creators").hide();
    $("#section-developers").hide();
    $("#section-streamers").hide();
}

function showActiveStreamers() {
    $.ajax({
        url:
            "https://api.playnft.io/getactivestreamers",
        type: 'GET',
        crossDomain: true,
        data: {},
        success: function (data) {
            console.info(data);
            let response = jQuery.parseJSON(data);

            $("#streamer_list").empty();
            $("#streamer_list").append('<div class="swiper-slide"></div>')
            

            response.forEach(function (val) {
                
                let game_content = { name: val.name, picture: val.picture, nfts: val.nfts };
                $("#active-streamers-template")
                    .tmpl(game_content)
                    .appendTo("#streamer_list");

                streamer_swiper.update()
                streamer_swiper.updateSize()
            });

            $("#streamer_list").append('<div class="swiper-slide"></div>')
            setTimeout(function () {
                streamer_swiper.update()
                streamer_swiper.updateSize()
               }, 500);
        },
        error: function (data) {
            console.info(data);
        }
        
    });
}



$(document).ready(function () {
    showSections()
    showActiveStreamers()

    var hash = window.location.hash.substring(1);
    var params = {}
    hash.split('&').map(hk => {
        let temp = hk.split('=');
        params[temp[0]] = temp[1]
    });

    console.log(params)
    if (params.access_token && params.token_type && params.state && params.id_token) {
        var clientID = "bugcm9v8dm9e2d4wp7u9l3hsnd5plo"
        let state = window.btoa(encodeURIComponent(escape(new Date().toDateString())));
        if (params.state == state) {
            hideSections();
            $("#section-streamers").show();
            startLoading();

            $.ajax({
                url: 'https://id.twitch.tv/oauth2/userinfo',
                type: 'GET',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + params.access_token);
                },
                data: {},
                success: function (data) {
                    console.info(data);

                    if (data.aud != clientID) return;
                    if (data.email_verified == false) {
                        alert("Twitch Email must be verified!");
                        return;
                    }

                    streamerID = data.sub;

                    let formData = { streamer_id: streamerID, streamer_name: data.preferred_username, streamer_email: data.email, streamer_picture: data.picture, mode: "streamer" };

                    $.ajax({
                        url:
                            "https://api.playnft.io/getnfts",
                        type: "POST",
                        crossDomain: true,
                        data: JSON.stringify(formData),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            console.info(data);
                            let response = jQuery.parseJSON(data);

                            $("#streamers-nfts").empty();

                            response.forEach(function (item) {
                                var status = "Offline"
                                if (item.status == "1") status = "Live"

                                let game_content = { id: item.id, name: item.name, cost: PRICES[item.cost], status: item.status, status_text: status, minted: item.minted, supply: item.supply, description: item.description, streamerId: streamerID };
                                $("#streamers-nfts-template")
                                    .tmpl(game_content)
                                    .appendTo("#streamers-nfts");
                            });

                            openTab("#nav-streamers-nfts");
                        },
                    });


                },
                error: function (error) {
                    console.info(error);
                },
            });
        }
    }



    $("#avax-wallet-connect").click(function () {
        moralisLogin("avalanche").then(function (address) {
            console.log(address)
            if (address) {
                $("#walletAddressAvax").val(address);
            } else {

            }
        });
    });

    $("#heco-wallet-connect").click(function () {
        moralisLogin("heco").then(function (address) {
            console.log(address)
            if (address) {
                $("#walletAddressHeco").val(address);
            } else {

            }
        });
    });

    $("#polygon-wallet-connect").click(function () {
        moralisLogin("polygon").then(function (address) {
            console.log(address)
            if (address) {
                $("#walletAddressPolygon").val(address);
            } else {

            }
        });
    });

    $("#velas-wallet-connect").click(function () {
        moralisLogin("velas").then(function (address) {
            console.log(address)
            if (address) {
                $("#walletAddressVelas").val(address);
            } else {

            }
        });
    });

    $("#near-wallet-connect").click(function () {
        moralisLogin("near").then(function (address) {
            console.log(address)
            if (address) {
                $("#walletAddressNear").val(address);
            } else {

            }
        });
    });

    $("#creators-avax-wallet-connect").click(function () {
        moralisLogin("avalanche").then(function (address) {
            console.log(address)
            if (address) {
                $("#creators-walletAddressAvax").val(address);
            } else {

            }
        });
    });

    $("#creators-heco-wallet-connect").click(function () {
        moralisLogin("heco").then(function (address) {
            console.log(address)
            if (address) {
                $("#creators-walletAddressHeco").val(address);
            } else {

            }
        });
    });

    $("#creators-polygon-wallet-connect").click(function () {
        moralisLogin("polygon").then(function (address) {
            console.log(address)
            if (address) {
                $("#creators-walletAddressPolygon").val(address);
            } else {

            }
        });
    });

    $("#creators-velas-wallet-connect").click(function () {
        moralisLogin("velas").then(function (address) {
            console.log(address)
            if (address) {
                $("#creators-walletAddressVelas").val(address);
            } else {

            }
        });
    });

    $("#creators-near-wallet-connect").click(function () {
        moralisLogin("near").then(function (address) {
            console.log(address)
            if (address) {
                $("#creators-walletAddressNear").val(address);
            } else {

            }
        });
    });

    $(".chain-wallet").hide();
    $('.wallet-address').prop('required', false)
    $("#gamers-wallet-enj").show();
    $('#walletAddress').prop('required', true);
    $("#creators-wallet-enj").show();
    $('#creators-walletAddress').prop('required', true);


    $("input[name='gamers-chain']").change(function () {
        var chain = $('input[name="gamers-chain"]:checked').val();

        $(".chain-wallet").hide();
        $('.wallet-address').prop('required', false)

        chainID = chain;

        if (chain == "enj") {
            $("#gamers-wallet-enj").show();
            $('#walletAddress').prop('required', true);
        }
        if (chain == "avalanche") {
            $("#gamers-wallet-avax").show();
            $('#walletAddressAvax').prop('required', true);
        }
        if (chain == "heco") {
            $("#gamers-wallet-heco").show();
            $('#walletAddressHeco').prop('required', true);
        }
        if (chain == "polygon") {
            $("#gamers-wallet-polygon").show();
            $('#walletAddressPolygon').prop('required', true);
        }
        if (chain == "velas") {
            $("#gamers-wallet-velas").show();
            $('#walletAddressVelas').prop('required', true);
        }
        if (chain == "xrp") {
            $("#gamers-wallet-xrp").show();
            $('#walletAddressXrp').prop('required', true);
        }
        if (chain == "solana") {
            $("#gamers-wallet-solana").show();
            $('#walletAddressSolana').prop('required', true);
        }
        if (chain == "near") {
            $("#gamers-wallet-near").show();
            $('#walletAddressNear').prop('required', true);
        }
    });

    $("input[name='creators-chain']").change(function () {
        var chain = $('input[name="creators-chain"]:checked').val();

        $(".chain-wallet").hide();
        $('.wallet-address').prop('required', false)

        chainID = chain;

        if (chain == "enj") {
            $("#creators-wallet-enj").show();
            $('#creators-walletAddress').prop('required', true);
        }
        if (chain == "avalanche") {
            $("#creators-wallet-avax").show();
            $('#creators-walletAddressAvax').prop('required', true);
        }
        if (chain == "heco") {
            $("#creators-wallet-heco").show();
            $('#creators-walletAddressHeco').prop('required', true);
        }
        if (chain == "polygon") {
            $("#creators-wallet-polygon").show();
            $('#creators-walletAddressPolygon').prop('required', true);
        }
        if (chain == "velas") {
            $("#creators-wallet-velas").show();
            $('#creators-walletAddressVelas').prop('required', true);
        }
        if (chain == "xrp") {
            $("#creators-wallet-xrp").show();
            $('#creators-walletAddressXrp').prop('required', true);
        }
        if (chain == "solana") {
            $("#creators-wallet-solana").show();
            $('#creators-walletAddressSolana').prop('required', true);
        }
        if (chain == "near") {
            $("#creators-wallet-near").show();
            $('#creators-walletAddressNear').prop('required', true);
        }
    });



    $("#service-gamers").click(function () {
        hideSections();
        $("#section-gamers").show();
    });

    $("#service-creators").click(function () {
        hideSections();
        $("#section-creators").show();
    });

    $("#service-developers").click(function () {
        hideSections();
        $("#section-developers").show();
    });

    $("#service-streamers").click(function () {
        hideSections();
        $("#section-streamers").show();
    });

    $(".nav-link").click(function () {
        if ($(".hero .container").is(":hidden") && !$(this).attr("role")) {
            showSections();
            window.location.hash = $(this).attr("href");
        }
    });

    $("#gamers-scan-form").on("submit", function (e) {
        e.preventDefault();
        startLoading();
        const data = new FormData(e.target);
        const formData = Object.fromEntries(data.entries());
        console.log(JSON.stringify(formData));

        if ($('input[name="gamers-chain"]:checked').val() == "enj") {
            walletID = $('#walletAddress').val()

            $.ajax({
                url:
                    "https://api.playnft.io/gettokens",
                type: "POST",
                crossDomain: true,
                data: JSON.stringify(formData),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    //console.info(JSON.stringify(data));
                    let response = jQuery.parseJSON(data);

                    $("#gamers-nfts").empty();
                    console.info(response.length);

                    let count = 1;
                    response.forEach(function (item) {
                        if (item.value > 0) {

                            let url = item.token.itemURI.replace("{id}", item.token.id).replace("{index}", item.index);

                            $.ajax({ url: "https://api.playnft.io/getmeta", type: "POST", crossDomain: true, data: JSON.stringify({ itemURI: url }), dataType: "json", contentType: "application/json" }).done(function (metaData) {

                                try {
                                    let meta = jQuery.parseJSON(metaData);
                                    if (!meta.image) return;

                                    console.log("Success #" + count++ + ": " + url)
                                    let token_content = { tokenId: item.token.id, tokenName: item.token.name, tokenImage: meta.image, tokenIndex: item.index.replace(/^0+/, '') };
                                    $("#token-template")
                                        .tmpl(token_content)
                                        .appendTo("#gamers-nfts");
                                } catch (e) {
                                    console.log("Failed #" + count++ + ": " + url)
                                }
                            });
                        }
                    });

                    openTab("#nav-gamers-nfts");
                },
            });
        }

        if ($('input[name="gamers-chain"]:checked').val() == "avalanche") {
            walletID = $('#walletAddressAvax').val();
            $("#gamers-nfts").empty();

            getNFTs("avalanche", walletID)

        }

        if ($('input[name="gamers-chain"]:checked').val() == "heco") {
            walletID = $('#walletAddressHeco').val();
            $("#gamers-nfts").empty();

            getNFTs("heco", walletID)

        }

        if ($('input[name="gamers-chain"]:checked').val() == "polygon") {
            walletID = $('#walletAddressPolygon').val();
            $("#gamers-nfts").empty();

            getNFTs("polygon", walletID)
        }

        if ($('input[name="gamers-chain"]:checked').val() == "velas") {
            walletID = $('#walletAddressVelas').val();
            $("#gamers-nfts").empty();

            getNFTs("velas", walletID)
        }

        if ($('input[name="gamers-chain"]:checked').val() == "xrp") {
            walletID = $('#walletAddressXrp').val();
            $("#gamers-nfts").empty();

            getNFTs("xrp", walletID)
        }

        if ($('input[name="gamers-chain"]:checked').val() == "solana") {
            walletID = $('#walletAddressSolana').val();
            $("#gamers-nfts").empty();

            getNFTs("solana", walletID)
        }

        if ($('input[name="gamers-chain"]:checked').val() == "near") {
            walletID = $('#walletAddressNear').val();
            $("#gamers-nfts").empty();

            getNFTs("near", walletID)
        }
    });

    $("#creators-scan-form").on("submit", function (e) {
        e.preventDefault();
        startLoading();

        const data = new FormData(e.target);
        const formData = Object.fromEntries(data.entries());
        console.log(JSON.stringify(formData));

        if ($('input[name="creators-chain"]:checked').val() == "enj") {
            walletID = $('#creators-walletAddress').val()

            $.ajax({
                url:
                    "https://api.playnft.io/gettokens",
                type: "POST",
                crossDomain: true,
                data: JSON.stringify(formData),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    console.info(data);
                    let response = jQuery.parseJSON(data);

                    $("#creators-nfts").empty();

                    let count = 1;
                    response.forEach(function (item) {
                        if (item.value > 0) {

                            if (item.token.totalSupply == 18446744073709551615) {
                                item.token.totalSupply = "Infinite";
                            }

                            let url = item.token.itemURI.replace("{id}", item.token.id).replace("{index}", item.index);

                            $.ajax({ url: "https://api.playnft.io/getmeta", type: "POST", crossDomain: true, data: JSON.stringify({ itemURI: url }), dataType: "json", contentType: "application/json" }).done(function (metaData) {

                                try {
                                    let meta = jQuery.parseJSON(metaData);
                                    if (!meta.image) return;

                                    console.log("Success #" + count++ + ": " + url)
                                    tokenSupply = item.token.totalSupply;
                                    let token_content = { tokenId: item.token.id, tokenName: item.token.name, tokenImage: meta.image, tokenSupply: item.token.totalSupply };
                                    $("#creators-token-template")
                                        .tmpl(token_content)
                                        .appendTo("#creators-nfts");
                                } catch (e) {
                                    console.log("Failed #" + count++ + ": " + url)
                                }
                            });
                        }
                    });

                    openTab("#nav-creators-nfts");
                },
            });
        }

        if ($('input[name="creators-chain"]:checked').val() == "avalanche") {
            walletID = $('#creators-walletAddressAvax').val();
            $("#creators-nfts").empty();

            getCreatorsNFTs("avalanche", walletID)

        }

        if ($('input[name="creators-chain"]:checked').val() == "heco") {
            walletID = $('#creators-walletAddressHeco').val();
            $("#creators-nfts").empty();

            getCreatorsNFTs("heco", walletID)

        }

        if ($('input[name="creators-chain"]:checked').val() == "polygon") {
            walletID = $('#creators-walletAddressPolygon').val();
            $("#creators-nfts").empty();

            getCreatorsNFTs("polygon", walletID)

        }

        if ($('input[name="creators-chain"]:checked').val() == "velas") {
            walletID = $('#creators-walletAddressVelas').val();
            $("#creators-nfts").empty();

            getCreatorsNFTs("velas", walletID)

        }

        if ($('input[name="creators-chain"]:checked').val() == "xrp") {
            walletID = $('#creators-walletAddressXrp').val();
            $("#creators-nfts").empty();

            getCreatorsNFTs("xrp", walletID)

        }

        if ($('input[name="creators-chain"]:checked').val() == "solana") {
            walletID = $('#creators-walletAddressSolana').val();
            $("#creators-nfts").empty();

            getCreatorsNFTs("solana", walletID)

        }

        if ($('input[name="creators-chain"]:checked').val() == "near") {
            walletID = $('#creators-walletAddressNear').val();
            $("#creators-nfts").empty();

            getCreatorsNFTs("near", walletID)

        }
    });

    $("#developers-new-form").on("submit", function (e) {
        e.preventDefault();
        startLoading();

        const data = new FormData(e.target);
        const formData = Object.fromEntries(data.entries());
        console.log(JSON.stringify(formData));

        $.ajax({
            url:
                "https://api.playnft.io/createpublisher",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.info(data);
                try {
                    let response = jQuery.parseJSON(data);

                    publisherID = response["insertId"];
                    console.log("publisherID: " + publisherID);

                    var myModalEl = document.getElementById('developers-new-modal')
                    var modal = bootstrap.Modal.getInstance(myModalEl)
                    modal.hide();
                    openTab("#nav-developers-games");
                } catch (error) {
                    console.log("Error")
                    $('#developers_name').addClass('is-invalid');
                    stopLoading();
                }

            },
        });
    });

    $("#developers-login-form").on("submit", function (e) {
        e.preventDefault();
        startLoading();

        const data = new FormData(e.target);
        const formData = Object.fromEntries(data.entries());
        console.log(JSON.stringify(formData));

        $.ajax({
            url:
                "https://api.playnft.io/getpublisher",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.info(data);
                try {
                    let response = jQuery.parseJSON(data)[0];

                    if (!response["id"]) {
                        console.log(response)
                        $('#login_developers_name').addClass('is-invalid');
                    }
                    else {
                        publisherID = response["id"];
                        console.log("publisherID: " + publisherID);

                        var myModalEl = document.getElementById('developers-login-modal')
                        var modal = bootstrap.Modal.getInstance(myModalEl)
                        modal.hide();

                        $('#developers-view-modal').show();

                        $('#edit_developers_name').val(response["companyName"])
                        $('#edit_developers_website').val(response["website"])
                        $('#edit_developers_email').val(response["email"])
                        $('#edit_developers_wallet').val(response["wallet"])
                        $('#edit_developers_info').val(response["companyInfo"])
                        if (response["companyInfo"]) tinymce.get('edit_developers_info').setContent(response["companyInfo"])
                        $('#edit_developers_id').val(publisherID)
                        stopLoading();
                    }

                } catch (error) {
                    console.log("Error " + error)
                    $('#login_developers_name').addClass('is-invalid');
                    stopLoading();
                }

            },
        });
    });

    $("#developers-edit-form").on("submit", function (e) {
        e.preventDefault();
        startLoading();

        const data = new FormData(e.target);
        const formData = Object.fromEntries(data.entries());
        console.log(JSON.stringify(formData));

        $.ajax({
            url:
                "https://api.playnft.io/updatepublisher",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.info(data);
                try {
                    const publisherData = { "publisherId": publisherID }

                    $.ajax({
                        url:
                            "https://api.playnft.io/getgames",
                        type: "POST",
                        crossDomain: true,
                        data: JSON.stringify(publisherData),
                        dataType: "json",
                        contentType: "application/json",
                        success: function (data) {
                            console.info(data);
                            let response = jQuery.parseJSON(data);

                            $("#developers-games").empty();

                            response.forEach(function (item) {
                                let status
                                let cost
                                let review = '';

                                if (item.status == 0) {
                                    status = "Development"
                                }
                                if (item.status == 1) {
                                    status = "Live"
                                }
                                if (item.approved == 0) {
                                    review = " (In Review)"
                                }

                                let platforms = ''
                                if (item.platform_steam != 0) platforms += '<i class="fab fa-steam-symbol"></i> '
                                if (item.platform_apple != 0) platforms += '<i class="fab fa-app-store-ios"></i> '
                                if (item.platform_google != 0) platforms += '<i class="fab fa-google-play"></i> '

                                let game_content = { gameId: item.id, gameName: item.name, gameIcon: item.icon, gameInfo: item.gameInfo, gameStatus: status, gameReview: review, gameStatusValue: item.status, gamePlatforms: platforms, gamePlatformSteam: item.platform_steam, gamePlatformApple: item.platform_apple, gamePlatformGoogle: item.platform_google };
                                $("#developers-games-template")
                                    .tmpl(game_content)
                                    .appendTo("#developers-games");

                            });

                            $('#developers-view-modal').hide()
                            openTab("#nav-developers-games");
                        },
                    });
                } catch (error) {
                    console.log("Error " + error)
                    $('#edit_developers_name').addClass('is-invalid');
                }

            },
        });

    });

    $("#developers-game-form").on("submit", function (e) {
        e.preventDefault();
        startLoading();

        var file = $('#developers_game_icon')[0].files[0];
        if (file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);

            // when image data was read
            reader.onload = function (event) {
                // I usually remove the prefix to only keep data, but it depends on your server
                var fileData = event.target.result.replace("data:" + file.type + ";base64,", '');

                const data = new FormData(e.target);
                data.append("icon", fileData);
                data.append("icon_type", file.type);
                const formData = Object.fromEntries(data.entries());
                console.log(JSON.stringify(formData));

                updateGame(formData);
            }
        } else {
            const data = new FormData(e.target);
            const formData = Object.fromEntries(data.entries());
            console.log(JSON.stringify(formData));

            updateGame(formData);
        }
    });

    function updateGame(formData) {

        $.ajax({
            url:
                "https://api.playnft.io/updategame",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.info(data);
                var response = jQuery.parseJSON(data);

                setTimeout(function () {
                    $("#developers-games").empty();

                    response.forEach(function (item) {
                        let status
                        let cost
                        let review = ''
                        if (item.status == 0) {
                            status = "Development"
                        }
                        if (item.status == 1) {
                            status = "Live"
                        }
                        if (item.approved == 0) {
                            review = "(In Review)"
                        }

                        let platforms = ''
                        if (item.platform_steam != 0) platforms += '<i class="fab fa-steam-symbol"></i> '
                        if (item.platform_apple != 0) platforms += '<i class="fab fa-app-store-ios"></i> '
                        if (item.platform_google != 0) platforms += '<i class="fab fa-google-play"></i> '

                        let game_content = { gameId: item.id, gameName: item.name, gameIcon: item.icon, gameInfo: item.gameInfo, gameStatus: status, gameStatusValue: item.status, gamePlatforms: platforms, gamePlatformSteam: item.platform_steam, gamePlatformApple: item.platform_apple, gamePlatformGoogle: item.platform_google };
                        $("#developers-games-template")
                            .tmpl(game_content)
                            .appendTo("#developers-games");

                    });

                    var myModalEl = document.getElementById('developers-game-modal')
                    var modal = bootstrap.Modal.getInstance(myModalEl)
                    modal.hide();

                }, 2000);
            },
        });
    }

    $("#developers-content-form").on("submit", function (e) {
        e.preventDefault();
        startLoading();

        var file = $('#developers_content_icon')[0].files[0];
        if (file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);

            // when image data was read
            reader.onload = function (event) {
                // I usually remove the prefix to only keep data, but it depends on your server
                var fileData = event.target.result.replace("data:" + file.type + ";base64,", '');

                const data = new FormData(e.target);
                data.append("icon", fileData);
                data.append("icon_type", file.type);
                const formData = Object.fromEntries(data.entries());
                console.log(JSON.stringify(formData));

                updateContent(formData);
            }
        } else {
            const data = new FormData(e.target);
            const formData = Object.fromEntries(data.entries());
            console.log(JSON.stringify(formData));

            updateContent(formData);
        }
    });

    function updateContent(formData) {

        $.ajax({
            url:
                "https://api.playnft.io/updatecontent",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.info(data);
                var response = jQuery.parseJSON(data);

                setTimeout(function () {
                    $("#developers-content").empty();

                    response.forEach(function (item) {
                        let type = ''

                        if (item.type == 0) {
                            type = "Unlockable Item"
                        }
                        if (item.type == 1) {
                            type = "Modifier"
                        }
                        if (item.type == 2) {
                            type = "Consummable"
                        }
                        if (item.type == 3) {
                            type = "Event"
                        }

                        if (item.status == -1) {
                            status = "Locked"
                        }
                        if (item.status == 0) {
                            status = "New"
                        }
                        if (item.status == 1) {
                            status = "Submitted"
                        }
                        if (item.status == 2) {
                            status = "Approved"
                        }

                        let game_content = { id: item.id, gameId: item.gameId, title: item.title, image: item.image, cost: item.cost, code: item.code, exclusive: item.exclusive, target: item.target, type: item.type, typetext: type, info: item.description, locked: item.locked };
                        $("#developers-content-template")
                            .tmpl(game_content)
                            .appendTo("#developers-content");

                    });

                    $("#developers-content-form")[0].reset();

                    var myModalEl = document.getElementById('developers-content-modal')
                    var modal = bootstrap.Modal.getInstance(myModalEl)
                    modal.hide();

                }, 2000);
            },
        });
    }

    $("#streamers-nfts-form").on("submit", function (e) {
        e.preventDefault();
        startLoading();

        var file = $('#streamers_nft_icon')[0].files[0];
        if (file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);

            // when image data was read
            reader.onload = function (event) {
                // I usually remove the prefix to only keep data, but it depends on your server
                var fileData = event.target.result.replace("data:" + file.type + ";base64,", '');

                const data = new FormData(e.target);
                data.append("icon", fileData);
                data.append("icon_type", file.type);
                const formData = Object.fromEntries(data.entries());
                console.log(JSON.stringify(formData));

                updateNFT(formData);
            }
        } else {
            const data = new FormData(e.target);
            const formData = Object.fromEntries(data.entries());
            console.log(JSON.stringify(formData));

            updateNFT(formData);
        }
    });

    function updateNFT(formData) {

        $.ajax({
            url:
                "https://api.playnft.io/updatenft",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.info(data);
                var response = jQuery.parseJSON(data);

                setTimeout(function () {
                    $("#streamers-nfts").empty();

                    response.forEach(function (item) {

                        var status = "Offline"
                        if (item.status == "1") status = "Live"

                        let game_content = { id: item.id, name: item.name, cost: PRICES[item.cost], status: item.status, status_text: status, minted: item.minted, supply: item.supply, description: item.description, streamerId: streamerID };
                        $("#streamers-nfts-template")
                            .tmpl(game_content)
                            .appendTo("#streamers-nfts");

                    });

                    $("#streamers-nfts-form")[0].reset();

                    var myModalEl = document.getElementById('streamers-nfts-modal')
                    var modal = bootstrap.Modal.getInstance(myModalEl)
                    modal.hide();
                    stopLoading();
                }, 2000);
            },
        });
    }

    //Wizard
    $('a[data-bs-toggle="tab"]').on("show.bs.tab", function (e) {
        var $target = $(e.target);

        if ($target.parent().hasClass("disabled")) {
            console.log($target.parent());
            return false;
        }
    });

});

async function verifyToken(elem, e) {
    e.preventDefault();
    e.stopPropagation();
    startLoading()
    let id = elem.value;
    let index = $("#verify-token-index").val();
    let mode = $("#verify-token-mode").val();
    console.log(id + " - " + index);

    const ethers = Moralis.web3Library

    const provider = new ethers.providers.JsonRpcProvider('https://evmexplorer.velas.com/rpc');

    let contract = await new ethers.Contract(id, simplified_abi, provider);

    try {
        await contract.ownerOf(index).then(r => {
            console.log(r.toString())
            if (r.toLowerCase() == walletID.toLowerCase()) {
                console.log("owner")
                tokenID = id;

                $(".gamers-nft-item").removeClass("active");
                $(this).addClass("active");
                tokenIndex = index;

                let formData = { tokenId: tokenID, wallet: walletID, tokenIndex: tokenIndex };
                console.log(formData)

                $.ajax({
                    url:
                        "https://api.playnft.io/getgames",
                    type: "POST",
                    crossDomain: true,
                    data: JSON.stringify(formData),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        console.info(data);
                        let response = jQuery.parseJSON(data);

                        $("#gamers-games").empty();

                        response.forEach(function (item) {
                            let status
                            let cost
                            if (item.status == 0) {
                                status = "Development"
                                cost = 10
                            }
                            if (item.status == 1) {
                                status = "Live"
                                cost = 25
                            }

                            let platforms = ''
                            if (item.platform_steam != 0) platforms += '<i class="fab fa-steam-symbol"></i> '
                            if (item.platform_apple != 0) platforms += '<i class="fab fa-app-store-ios"></i> '
                            if (item.platform_google != 0) platforms += '<i class="fab fa-google-play"></i> '

                            let game_content = { gameId: item.id, gameName: item.name, gameIcon: item.icon, gameInfo: item.gameInfo, gameStatus: status, gamePlatforms: platforms, gameCost: cost, companyName: item.companyName, website: item.website, companyInfo: item.companyInfo, publisherId: item.publisherId, };
                            $("#games-template")
                                .tmpl(game_content)
                                .appendTo("#gamers-games");

                        });

                        openTab("#nav-gamers-games");
                    },
                });
                /*
                contract.tokenURI(id).then(async function (meta) {
                console.log(meta)
        
                await $.getJSON(meta, function (data) {
                    console.log("Data: " + JSON.stringify(data));
        
                    let name = data.name;
                    let image = data.image || data.image_url;
        
                    $("#image-" + id).attr("src",image);
                    $(".verify-token").empty();
                    
                    stopLoading()
                })
                }).catch(error => {
                console.log(error)
                $("#verify-token-index").addClass('is-invalid')
                $("#verify-token-index").val('Invalid Data')
                stopLoading()
                });*/
            } else {
                console.log("not owner")
                $("#verify-token-index").addClass('is-invalid')
                $("#verify-token-index").val('Verify Failed')
                stopLoading()
            }
        })
    } catch (error) {
        console.log("not owner")
        $("#verify-token-index").addClass('is-invalid')
        $("#verify-token-index").val('Invalid Index')
        stopLoading()
    }

}

$(document).on("click", "li", function () {

    if ($(this).hasClass("gamers-nft-item")) {
        tokenImage = $(this).data('image');
        console.log(tokenImage)
        if (tokenImage && tokenImage.includes("vlx")) {
            let mode = "creators";
            if ($(this).hasClass("gamers-nft-item")) mode = "gamers";
            $(".verify-token").empty();

            $("#verify-" + $(this).attr('id')).append('<form class="form-inline">\
        <div class="col-auto"><input type="hidden" id="verify-token-mode" value="'+ mode + '">\
        <label for="verify-token-index" class="sr-only">Verify: </label>\
        <input style="width:40%" type="text" class="form-control mb-2" id="verify-token-index" name="verify-token-index" placeholder="Token Index">\
        </div>\
        <div class="col-auto"><button onclick="verifyToken(this, event)" id="verify-token" type="button" value="'+ $(this).attr('id') + '" class="btn btn-primary mb-2">Verify</button></div>\
    </form>')
            $("#verify-token-index").focus()
            return;
        }

        startLoading();

        $(".gamers-nft-item").removeClass("active");
        $(this).addClass("active");
        tokenID = $(this).attr('id');
        tokenIndex = $(this).data('index');

        let formData = { tokenId: tokenID, wallet: walletID, tokenIndex: tokenIndex };
        console.log(formData)

        $.ajax({
            url:
                "https://api.playnft.io/getgames",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.info(data);
                let response = jQuery.parseJSON(data);

                $("#gamers-games").empty();

                response.forEach(function (item) {
                    let status
                    let cost
                    if (item.status == 0) {
                        status = "Development"
                        cost = 10
                    }
                    if (item.status == 1) {
                        status = "Live"
                        cost = 25
                    }

                    let platforms = ''
                    if (item.platform_steam != 0) platforms += '<i class="fab fa-steam-symbol"></i> '
                    if (item.platform_apple != 0) platforms += '<i class="fab fa-app-store-ios"></i> '
                    if (item.platform_google != 0) platforms += '<i class="fab fa-google-play"></i> '


                    let game_content = { gameId: item.id, gameName: item.name, gameIcon: item.icon, gameInfo: item.gameInfo, gameStatus: status, gamePlatforms: platforms, gameCost: cost, companyName: item.companyName, website: item.website, companyInfo: item.companyInfo, publisherId: item.publisherId, };
                    $("#games-template")
                        .tmpl(game_content)
                        .appendTo("#gamers-games");

                });

                openTab("#nav-gamers-games");
            },
        });
    }

    if ($(this).hasClass("creators-nft-item")) {
        startLoading();

        $(".creators-nft-item").removeClass("active");
        $(this).addClass("active");
        tokenID = $(this).attr('id');
        tokenImage = $(this).data('image');

        let formData = { tokenId: tokenID, wallet: walletID };
        console.log(formData)

        $.ajax({
            url:
                "https://api.playnft.io/getgames",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.info(data);
                let response = jQuery.parseJSON(data);

                $("#creators-games").empty();

                response.forEach(function (item) {
                    let status
                    let cost
                    if (item.status == 0) {
                        status = "Development"
                        cost = 10
                    }
                    if (item.status == 1) {
                        status = "Live"
                        cost = 25
                    }

                    let platforms = ''
                    if (item.platform_steam != 0) platforms += '<i class="fab fa-steam-symbol"></i> '
                    if (item.platform_apple != 0) platforms += '<i class="fab fa-app-store-ios"></i> '
                    if (item.platform_google != 0) platforms += '<i class="fab fa-google-play"></i> '

                    let game_content = { gameId: item.id, gameName: item.name, gameIcon: item.icon, gameInfo: item.gameInfo, gameStatus: status, gamePlatforms: platforms, gameCost: cost, companyName: item.companyName, website: item.website, companyInfo: item.companyInfo, publisherId: item.publisherId };
                    $("#creators-games-template")
                        .tmpl(game_content)
                        .appendTo("#creators-games");

                });

                openTab("#nav-creators-games");
            },
        });
    }

    if ($(this).hasClass("nav-item completed")) {
        let $active = $(".wizard .nav-tabs li.active");
        $active.removeClass('active')
        $(this).addClass('active')
    }

});

$(document).on("click", "#gamers-games-select", function () {
    startLoading();

    let id = $(this).data('id');
    let formData = { gameId: id, tokenId: tokenID, tokenIndex: tokenIndex, chain: chainID };
    console.log(formData)

    $.ajax({
        url:
            "https://api.playnft.io/getcontent",
        type: "POST",
        crossDomain: true,
        data: JSON.stringify(formData),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            console.info(data);
            let response = jQuery.parseJSON(data);

            $("#gamers-content").empty();

            response.forEach(function (item) {
                let type = ''

                if (item.type == 0) {
                    type = "Unlockable Item"
                }
                if (item.type == 1) {
                    type = "Modifier"
                }
                if (item.type == 2) {
                    type = "Consummable"
                }
                if (item.type == 3) {
                    type = "Event"
                }

                if (item.status < 2) return;
                if (item.locked != 0) return;

                let game_content = { id: item.id, gameId: item.gameId, title: item.title, image: item.image, cost: item.cost, type: type, info: item.description };
                $("#content-template")
                    .tmpl(game_content)
                    .appendTo("#gamers-content");

            });

            var myModalEl = document.getElementById('gamers-game-modal')
            var modal = bootstrap.Modal.getInstance(myModalEl)
            modal.hide();
            openTab("#nav-gamers-content");
        },
    });

});

$(document).on("click", "#creators-games-select", function () {
    startLoading();

    let id = $(this).data('id');

    let formData = { gameId: id, tokenId: tokenID, tokenIndex: 0, chain: chainID, supply: tokenSupply };
    console.log(formData)

    $.ajax({
        url:
            "https://api.playnft.io/getcontent",
        type: "POST",
        crossDomain: true,
        data: JSON.stringify(formData),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            console.info(data);
            let response = jQuery.parseJSON(data);

            $("#creators-content").empty();

            response.forEach(function (item) {
                let type = ''

                if (item.type == 0) {
                    type = "Unlockable Item"
                }
                if (item.type == 1) {
                    type = "Modifier"
                }
                if (item.type == 2) {
                    type = "Consummable"
                }
                if (item.type == 3) {
                    type = "Event"
                }

                if (item.status < 2) return;
                if (item.locked != 0) return;

                let game_content = { id: item.id, gameId: item.gameId, title: item.title, image: item.image, cost: item.adjCost, type: type, info: item.description, locked: item.locked };
                $("#creators-content-template")
                    .tmpl(game_content)
                    .appendTo("#creators-content");

            });

            var myModalEl = document.getElementById('creators-game-modal')
            var modal = bootstrap.Modal.getInstance(myModalEl)
            modal.hide();
            openTab("#nav-creators-content");
        },
    });

});

$(document).on("click", "#gamers-content-select", function () {
    startLoading();

    var _contentId = $(this).data('id');
    var _gameId = $(this).data('game');
    let _tokenId = tokenID.replace('gamers_nft_', '');
    let _icon = $(this).data('icon');
    let _name = $(this).data('name');
    let _mode = "gamers";
    let _index = tokenIndex;


    let formData = { contentId: _contentId, gameId: _gameId, wallet: walletID, token: _tokenId, mode: _mode, index: _index, chain: chainID };
    console.log(formData)

    $.ajax({
        url:
            "https://api.playnft.io/createorder",
        type: "POST",
        crossDomain: true,
        data: JSON.stringify(formData),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            console.info(data);
            let response = jQuery.parseJSON(data);

            $("#gamers-review").empty();

            response.forEach(function (item) {


                $("#gamers-review-cost").html("Total: $" + item.cost)
                $('#gamers-review-token').html('<img src="' + tokenImage + '"/>')
                $('#gamers-review-icon').html('<img src="https://playnft.s3.amazonaws.com/' + publisherID + '/' + _gameId + '/' + _contentId + '/icon.png"/>')
                $("#gamers-review-name").html(_name)

                $('#amountf').val(item.cost)
                $('#item_number').val(_contentId)
                $('#invoice').val(item.orderId)
                $('#custom').val(item.code)
                $('#item_name').val(_name)
            });

            var myModalEl = document.getElementById('gamers-content-modal')
            var modal = bootstrap.Modal.getInstance(myModalEl)
            modal.hide();
            openTab("#nav-gamers-review");
        },
    });

});

$(document).on("click", "#developers-games-select", function (e) {
    e.preventDefault();
    startLoading();

    let id = $(this).data('game-id');
    let formData = { gameId: id, publisherId: publisherID };
    console.log(formData)

    gameID = id;

    $.ajax({
        url:
            "https://api.playnft.io/getcontent",
        type: "POST",
        crossDomain: true,
        data: JSON.stringify(formData),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            console.info(data);
            let response = jQuery.parseJSON(data);

            $("#developers-content").empty();

            response.forEach(function (item) {
                let type = ''
                let status = ''

                if (item.type == 0) {
                    type = "Unlockable Item"
                }
                if (item.type == 1) {
                    type = "Modifier"
                }
                if (item.type == 2) {
                    type = "Consummable"
                }
                if (item.type == 3) {
                    type = "Event"
                }

                if (item.status == -1) {
                    status = "Locked"
                }
                if (item.status == 0) {
                    status = "New"
                }
                if (item.status == 1) {
                    status = "Submitted"
                }
                if (item.status == 2) {
                    status = "Approved"
                }

                let game_content = { id: item.id, gameId: item.gameId, title: item.title, image: item.image, cost: item.cost, code: item.code, exclusive: item.exclusive, target: item.target, type: item.type, typetext: type, info: item.description, status: status, locked: item.locked };
                $("#developers-content-template")
                    .tmpl(game_content)
                    .appendTo("#developers-content");

            });

            openTab("#nav-developers-content");
        },
    });

});

$(document).on("click", "#creators-content-select", function () {
    startLoading();

    var _contentId = $(this).data('id');
    var _gameId = $(this).data('game');
    let _tokenId = tokenID;
    let _walletId = $(this).data('wallet');
    let _icon = $(this).data('icon');
    let _name = $(this).data('name');
    let _mode = "creators";

    let formData = { contentId: _contentId, gameId: _gameId, wallet: _walletId, token: _tokenId, mode: _mode, index: 0, chain: chainID, supply: tokenSupply };
    console.log(formData)

    $.ajax({
        url:
            "https://api.playnft.io/createorder",
        type: "POST",
        crossDomain: true,
        data: JSON.stringify(formData),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            console.info(data);
            let response = jQuery.parseJSON(data);

            $("#creators-review").empty();

            response.forEach(function (item) {


                $("#creators-review-cost").html("Total: $" + item.cost)
                $('#creators-review-token').html('<img src="' + tokenImage + '"/>')
                $('#creators-review-icon').html('<img src="https://playnft.s3.amazonaws.com/' + publisherID + '/' + _gameId + '/' + _contentId + '/icon.png"/>')
                $("#creators-review-name").html(_name)

                $('#creators-amountf').val(item.cost)
                $('#creators-item_number').val(_contentId)
                $('#creators-invoice').val(item.orderId)
                $('#creators-custom').val(item.code)
                $('#creators-item_name').val(_name)
            });

            var myModalEl = document.getElementById('creators-content-modal')
            var modal = bootstrap.Modal.getInstance(myModalEl)
            modal.hide();
            openTab("#nav-creators-review");
        },
    });

});

$(document).on("click", "#developers-purchase-content", function () {
    startLoading();

    let formData = { gameId: gameID, publisherId: publisherID };
    console.log(formData)

    $.ajax({
        url:
            "https://api.playnft.io/submitcontent",
        type: "POST",
        crossDomain: true,
        data: JSON.stringify(formData),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            console.info(data);

            $("#developers-review").empty();

            openTab("#nav-developers-review");
        },
    });

});

$(document).on("click", "#streamers-nfts-select", function () {

    let id = $(this).data('id');
    let supply = $(this).data('supply');

    if (supply == 0) {
        startLoading();

        let formData = { nftId: id, streamerId: streamerID };
        console.log(formData)

        $.ajax({
            url:
                "https://api.playnft.io/getpackages",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.info(data);
                let response = jQuery.parseJSON(data);

                $("#streamers-packages").empty();

                let game_content = { id: 1, name: "10 Supply", cost: 0, supply: 10, nftid: id };
                $("#streamers-packages-template")
                    .tmpl(game_content)
                    .appendTo("#streamers-packages");

                response.forEach(function (item) {

                    if (item.supply == -1) item.supply = "Infinite"

                    let game_content = { id: item.id, name: item.name, cost: item.cost, supply: item.supply, nftid: id };
                    $("#streamers-packages-template")
                        .tmpl(game_content)
                        .appendTo("#streamers-packages");

                    RenderPayPal(item, "#streamers-packages-purchase-" + item.id, id);

                });

                $('#streamers-extension-btn').hide()
                openTab("#nav-streamers-packages");
            },
        });

    } else {
        openTab("#nav-streamers-packages");
    }

});

$(document).on("click", "#streamers-packages-select", function () {
    startLoading();

    let id = $(this).data('packages-id');
    let nftid = $(this).data('nft-id');

    let formData = { packageId: id, nftId: nftid, streamerId: streamerID };
    console.log(formData)

    $.ajax({
        url:
            "https://api.playnft.io/selectpackage",
        type: "POST",
        crossDomain: true,
        data: JSON.stringify(formData),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            console.info(data);

            openTab("#nav-streamers-review");
        },
    });



});

$(document).on("click", "#streamers-extension-btn", function () {

    openTab("#nav-streamers-review");

})





$(document).on("click", "#login-streamers", function () {
    let clientID = "bugcm9v8dm9e2d4wp7u9l3hsnd5plo"
    let redirectSite = location.protocol + "//" + location.host
    let state = window.btoa(encodeURIComponent(escape(new Date().toDateString())));


    location = 'https://id.twitch.tv/oauth2/authorize?response_type=token+id_token&client_id=' + clientID + '&redirect_uri=' + redirectSite + '&scope=openid%20user:read:email&state=' + state + '&claims={"id_token":{"email":null,"email_verified":null},"userinfo":{"email":null,"email_verified":null,"picture":null, "preferred_username":null}}';

});

$(document).on('show.bs.modal', '#gamers-game-modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var gameId = button.data('game-id')
    var gameName = button.data('game-name')
    var gameIcon = button.data('game-icon')
    var gamePlatforms = button.data('game-platforms')
    var gameInfo = button.data('game-info')
    var publisherName = button.data('game-publisher')
    var publisherWebsite = button.data('game-website')
    var publisherId = button.data('game-publisherid')

    publisherID = publisherId;


    var modal = $(this)

    modal.find('#gamers-game-name').text(gameName)
    modal.find('#gamers-game-icon').html('<img src="https://playnft.s3.amazonaws.com/' + publisherId + '/' + gameId + '/icon.png"/>')
    modal.find('#gamers-game-info').html(gameInfo)
    modal.find('#gamers-game-platforms').html(gamePlatforms)
    modal.find('#gamers-games-select').data('id', gameId)
    modal.find('#gamers-game-publisher').text(publisherName)
    modal.find('#gamers-game-website').text(publisherWebsite)

})

$(document).on('show.bs.modal', '#creators-game-modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var gameId = button.data('game-id')
    var gameName = button.data('game-name')
    var gameIcon = button.data('game-icon')
    var gamePlatforms = button.data('game-platforms')
    var gameInfo = button.data('game-info')
    var publisherName = button.data('game-publisher')
    var publisherWebsite = button.data('game-website')
    var publisherId = button.data('game-publisherid')

    publisherID = publisherId;

    var modal = $(this)

    modal.find('#creators-game-name').text(gameName)
    modal.find('#creators-game-icon').html('<img src="https://playnft.s3.amazonaws.com/' + publisherId + '/' + gameId + '/icon.png"/>')
    modal.find('#creators-game-info').html(gameInfo)
    modal.find('#creators-game-platforms').html(gamePlatforms)
    modal.find('#creators-games-select').data('id', gameId)
    modal.find('#creators-game-publisher').text(publisherName)
    modal.find('#creators-game-website').text(publisherWebsite)

})

$(document).on('show.bs.modal', '#gamers-content-modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var id = button.data('content-id')
    var gameId = button.data('content-gameid')
    var gameName = button.data('content-title')
    var gameIcon = button.data('content-icon')
    var gameInfo = button.data('content-info')

    var modal = $(this)

    modal.find('#gamers-content-title').text(gameName)
    modal.find('#gamers-content-icon').html('<img src="https://playnft.s3.amazonaws.com/' + publisherID + '/' + gameId + '/' + id + '/icon.png"/>')
    modal.find('#gamers-content-info').html(gameInfo)
    modal.find('#gamers-content-select').data('id', id)
    modal.find('#gamers-content-select').data('name', gameName)
    modal.find('#gamers-content-select').data('game', gameId)
    modal.find('#gamers-content-select').data('wallet', walletID)
    modal.find('#gamers-content-select').data('token', gameId)
    modal.find('#gamers-content-select').data('icon', gameIcon)
})

$(document).on('show.bs.modal', '#creators-content-modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var id = button.data('content-id')
    var gameId = button.data('content-gameid')
    var gameName = button.data('content-title')
    var gameIcon = button.data('content-icon')
    var gameInfo = button.data('content-info')


    var modal = $(this)

    modal.find('#creators-content-title').text(gameName)
    modal.find('#creators-content-icon').html('<img src="https://playnft.s3.amazonaws.com/' + publisherID + '/' + gameId + '/' + id + '/icon.png"/>')
    modal.find('#creators-content-info').html(gameInfo)
    modal.find('#creators-content-select').data('id', id)
    modal.find('#creators-content-select').data('name', gameName)
    modal.find('#creators-content-select').data('game', gameId)
    modal.find('#creators-content-select').data('wallet', walletID)
    modal.find('#creators-content-select').data('token', gameId)
    modal.find('#creators-content-select').data('icon', gameIcon)
})

$(document).on('show.bs.modal', '#developers-game-modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var gameId = button.data('game-id')
    var gameName = button.data('game-name')
    var gameIcon = button.data('game-icon')
    var gamePlatformSteam = Boolean(button.data('game-platformsteam'))
    var gamePlatformApple = Boolean(button.data('game-platformapple'))
    var gamePlatformGoogle = Boolean(button.data('game-platformgoogle'))
    var gameInfo = button.data('game-info')
    var gameStatus = button.data('game-status')

    var modal = $(this)
    modal.find('#developers_game_name').val(gameName)
    //modal.find('#developers-game-icon').html('<img src="assets/img/clients/' + gameIcon + '"/>')
    modal.find('#developers_game_info').val(gameInfo)
    if (gameInfo) tinymce.get('developers_game_info').setContent(gameInfo)
    modal.find('#developers_game_status').val(gameStatus)
    modal.find('#developers_game_steam').attr("checked", gamePlatformSteam)
    modal.find('#developers_game_apple').attr("checked", gamePlatformApple)
    modal.find('#developers_game_google').attr("checked", gamePlatformGoogle)
    modal.find('#developers_game_id').val(gameId)
    modal.find('#developers_publisher_id').val(publisherID)

})

$(document).on('show.bs.modal', '#developers-content-modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var Id = button.data('content-id')
    var gameId = button.data('content-gameid')
    var gameName = button.data('content-title')
    var gameIcon = button.data('content-image')
    var gameInfo = button.data('content-info')
    var gameStatus = button.data('content-status')
    var gameCode = button.data('content-code')
    var gameCost = button.data('content-cost')
    var exclusive = button.data('content-exclusive')
    var type = button.data('content-type')
    var target = button.data('content-target')

    if (!gameId) gameId = gameID;
    if (!Id) Id = 0;
    console.log(exclusive)
    if (exclusive == 0) exclusive = false;

    var modal = $(this)
    modal.find('#developers_content_name').val(gameName)
    modal.find('#developers_content_info').val(gameInfo)
    if (gameInfo) tinymce.get('developers_content_info').setContent(gameInfo)
    modal.find('#developers_content_status').val(gameStatus)
    modal.find('#developers_content_id').val(Id)
    modal.find('#developers_game_id').val(gameId)
    modal.find('#developers_publisher_id').val(publisherID)
    modal.find('#developers_content_code').val(gameCode)
    modal.find('#developers_content_cost').val(gameCost)
    modal.find('#developers_content_exclusive').attr("checked", exclusive)
    modal.find('#developers_content_type').val(type)
    modal.find('#developers_content_target').val(target)

})

$(document).on('show.bs.modal', '#streamers-nfts-modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var Id = button.data('nft-id')
    var gameName = button.data('nft-name')
    var gameIcon = button.data('nft-image')
    var gameInfo = button.data('nft-description')
    var gameStatus = button.data('nft-status')
    var gameCost = button.data('nft-cost')


    if (!Id) Id = 0;

    var modal = $(this)
    modal.find('#streamers_nft_name').val(gameName)
    if (gameInfo) modal.find('#streamers_nft_description').val(gameInfo)
    if (gameInfo) tinymce.get('streamers_nft_description').setContent(gameInfo)
    if (gameStatus) modal.find('#streamers_nft_status').val(gameStatus)
    modal.find('#streamers_nft_id').val(Id)
    modal.find('#streamer_id').val(streamerID)
    if (gameCost) modal.find('#streamers_nft_cost').val(TIERS[gameCost])
})

function openTab(tabId) {
    stopLoading();
    let active = $(".wizard .nav-tabs li.active");
    console.log(active)
    active.addClass("completed");
    active.removeClass("active");
    let next = active.next();

    next.addClass("active");
    next.removeClass("disabled");

    var nextTab = document.querySelector(tabId);
    var tab = new bootstrap.Tab(nextTab);
    tab.show();

}

function resetTabs() {

}

function deleteGame(event, elem) {
    event.preventDefault();
    startLoading();

    if (window.confirm('Are you sure?')) {
        let id = $(elem).data('game-id');
        let info = $(elem).data('game-info');
        let formData = { developers_game_id: id, developers_game_status: -1, developers_publisher_id: publisherID, developers_game_info: info };
        console.log(formData)

        $.ajax({
            url:
                "https://api.playnft.io/updategame",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.info(data);
                let response = jQuery.parseJSON(data);

                $("#developers-games").empty();

                response.forEach(function (item) {
                    let status
                    let cost
                    if (item.status == 0) {
                        status = "Development"
                    }
                    if (item.status == 1) {
                        status = "Live"
                    }

                    let platforms = ''
                    if (item.platform_steam != 0) platforms += '<i class="fab fa-steam-symbol"></i> '
                    if (item.platform_apple != 0) platforms += '<i class="fab fa-app-store-ios"></i> '
                    if (item.platform_google != 0) platforms += '<i class="fab fa-google-play"></i> '

                    let game_content = { gameId: item.id, gameName: item.name, gameIcon: item.icon, gameInfo: item.gameInfo, gameStatus: status, gameStatusValue: item.status, gamePlatforms: platforms, gamePlatformSteam: item.platform_steam, gamePlatformApple: item.platform_apple, gamePlatformGoogle: item.platform_google };
                    $("#developers-games-template")
                        .tmpl(game_content)
                        .appendTo("#developers-games");

                });
            },
        });
    }
}

function deleteContent(event, elem) {
    event.preventDefault();
    startLoading();

    if (window.confirm('Are you sure?')) {
        let id = $(elem).data('content-id');
        let info = $(elem).data('content-info');
        let gameid = $(elem).data('content-gameid');

        let formData = { developers_content_id: id, developers_content_status: -1, developers_publisher_id: publisherID, developers_content_info: info, developers_game_id: gameid };
        console.log(formData)

        $.ajax({
            url:
                "https://api.playnft.io/updatecontent",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.info(data);
                var response = jQuery.parseJSON(data);


                $("#developers-content").empty();

                response.forEach(function (item) {
                    let type = ''
                    let status = ''

                    if (item.type == 0) {
                        type = "Unlockable Item"
                    }
                    if (item.type == 1) {
                        type = "Modifier"
                    }
                    if (item.type == 2) {
                        type = "Consummable"
                    }
                    if (item.type == 3) {
                        type = "Event"
                    }

                    if (item.status == -1) {
                        status = "Locked"
                    }
                    if (item.status == 0) {
                        status = "New"
                    }
                    if (item.status == 1) {
                        status = "Submitted"
                    }
                    if (item.status == 2) {
                        status = "Approved"
                    }

                    let game_content = { id: item.id, gameId: item.gameId, title: item.title, image: item.image, cost: item.cost, code: item.code, exclusive: item.exclusive, target: item.target, type: item.type, typetext: type, status: status, info: item.description, locked: item.locked };
                    $("#developers-content-template")
                        .tmpl(game_content)
                        .appendTo("#developers-content");

                });

            },
        });
    }
}

function deleteNFT(event, elem) {
    event.preventDefault();
    startLoading();

    if (window.confirm('Are you sure?')) {
        let id = $(elem).data('nft-id');
        let info = $(elem).data('nft-description');
        let formData = { streamers_nft_id: id, streamers_nft_status: -1, streamers_nft_description: info, streamer_id: streamerID };
        console.log(formData)

        $.ajax({
            url:
                "https://api.playnft.io/updatenft",
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(formData),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                console.info(data);
                var response = jQuery.parseJSON(data);

                setTimeout(function () {
                    $("#streamers-nfts").empty();

                    response.forEach(function (item) {

                        var status = "Offline"
                        if (item.status == "1") status = "Live"

                        let game_content = { id: item.id, name: item.name, cost: PRICES[item.cost], status: item.status, status_text: status, minted: item.minted, supply: item.supply, description: item.description, streamerId: streamerID };
                        $("#streamers-nfts-template")
                            .tmpl(game_content)
                            .appendTo("#streamers-nfts");

                    });

                }, 2000);
            },
        });
    }
}

function RenderPayPal(item, elem, nftid) {
    console.log(item)
    console.log(elem)
    paypal.Buttons({
        style: {
            layout: 'horizontal',
            color: 'blue',
            shape: 'pill',
            label: 'pay',
            tagline: 'false',
            height: 45
        },
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: "USD",
                        value: item.cost
                    },
                    description: item.name,
                    custom_id: nftid + '|' + streamerID
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                openTab("#nav-streamers-review");
            });
        }
    }).render(elem);
}

function startLoading() {
    $('#spinnerModal').modal('show');
}

function stopLoading() {
    $('#spinnerModal').modal('hide');
}