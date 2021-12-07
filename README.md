# solsearcher
## ETL to update a pyth oracle with floor and avg price for a given NFT collection

### Running
1. Create NFT Collection Product Account in the modified version of the pyth oracle (https://github.com/ferric-sol/pyth-client) 
1. Create two Price Accounts one with price_type 'floor_price' and one with price_type 'avg_price' for this new Product Account
1. Update product account id in solsearcher.js
1. Update the collection names in solsearcher.js
1. Run with ```node solsearcher.js``` and it should send the floor and average price for this NFT collection to the pythd running on localhost


### TODO
1. Run through every collection on every exchange and automatically create a product account id in pythd
1. Create a mapping from marketplace collection name -> pyth product account id (different marketplaces name collections differently) -> solana address