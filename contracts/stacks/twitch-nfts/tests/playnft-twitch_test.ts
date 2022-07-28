import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.31.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';
  
  Clarinet.test({
    name: "Ensure that NFT token URL and ID is as expected",
    async fn(chain: Chain, accounts: Map<string, Account>) {
      let deployer = accounts.get("deployer")!;
      let wallet_1 = accounts.get("wallet_1")!;
      let wallet_2 = accounts.get("wallet_2")!;
      let wallet_3 = accounts.get("wallet_3")!;

      let block = chain.mineBlock([
        Tx.contractCall("playnft-twitch", "mint", [types.ascii("11"), types.principal(wallet_1.address)], deployer.address),
        Tx.contractCall("playnft-twitch", "mint", [types.ascii("51"), types.principal(wallet_2.address)], deployer.address),
        Tx.contractCall("playnft-twitch", "mint", [types.ascii("55"), types.principal(wallet_3.address)], deployer.address),
        Tx.contractCall("playnft-twitch", "mint", [types.ascii("85"), types.principal(wallet_1.address)], wallet_1.address),
        
        Tx.contractCall("playnft-twitch", "get-last-token-id", [], deployer.address),

        Tx.contractCall(
          "playnft-twitch",
          "get-token-uri",
          [types.uint(1)],
          wallet_1.address
        ),

        Tx.contractCall("playnft-twitch", "get-owner", [types.uint(1)], deployer.address),
        Tx.contractCall("playnft-twitch", "get-owner", [types.uint(1000)], deployer.address),

        Tx.contractCall("playnft-twitch", "transfer", [types.uint(1), types.principal(wallet_1.address), types.principal(wallet_3.address)], wallet_1.address),
        Tx.contractCall("playnft-twitch", "transfer", [types.uint(2), types.principal(wallet_2.address), types.principal(wallet_1.address)], wallet_2.address),
        Tx.contractCall("playnft-twitch", "transfer", [types.uint(3), types.principal(wallet_3.address), types.principal(wallet_2.address)], wallet_3.address),
        Tx.contractCall("playnft-twitch", "transfer", [types.uint(1), types.principal(wallet_1.address), types.principal(wallet_3.address)], wallet_1.address),
        Tx.contractCall("playnft-twitch", "transfer", [types.uint(2), types.principal(wallet_2.address), types.principal(wallet_1.address)], wallet_2.address),
        Tx.contractCall("playnft-twitch", "transfer", [types.uint(3), types.principal(wallet_3.address), types.principal(wallet_2.address)], wallet_3.address),

      ]);
      assertEquals(block.receipts.length, 14);
      assertEquals(block.height, 2);
      block.receipts[0].result.expectOk();
      block.receipts[1].result.expectOk();
      block.receipts[2].result.expectOk();
      block.receipts[3].result.expectErr();
      block.receipts[4].result.expectOk().expectUint(4);
      block.receipts[5].result
        .expectOk()
        .expectSome()
        .expectAscii("https://api.playnft.io/tokenmeta?token_id=11");

      block.receipts[6].result.expectOk().expectSome().expectPrincipal(wallet_1.address);
      block.receipts[7].result.expectOk().expectNone()
      block.receipts[8].result.expectOk();
      block.receipts[9].result.expectOk();
      block.receipts[10].result.expectOk();
      block.receipts[11].result.expectErr();
      block.receipts[12].result.expectErr();
      block.receipts[13].result.expectErr();
    },
  });