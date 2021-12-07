const axios = require('axios').default;

const getSolanaArt = async (collectionName) => {
    try { 
        // const collectionsResponse = await axios.get('https://qzlsklfacc.medianetwork.cloud/get_collections')
        // const collectionName = collectionsResponse.data[0].url;
        const floorResponse = await axios.get('https://qzlsklfacc.medianetwork.cloud/query_volume_per_collection?collection='+collectionName);
        console.log('solanaart floor price:', floorResponse.data.floorPrice);
        const priceResponse = await axios.get('https://qzlsklfacc.medianetwork.cloud/nft_for_sale?collection='+collectionName);
        console.log('item price: ', priceResponse.data[0].price);
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const sum = priceResponse.data.map(item => item.price).reduce(reducer);
        console.log('solanaart average price of all items: ', sum/priceResponse.data.length);
    } catch(err) {
        // Handle Error Here
        console.error(err);
    }
}

const getMagicEden = async (collectionName) => {
    try { 
        // const collectionsResponse = await axios.get('https://api-mainnet.magiceden.io/all_collections')
        // const collectionName = collectionsResponse.data.collections[0].symbol;
        const floorResponse = await axios.get('https://api-mainnet.magiceden.io/rpc/getCollectionEscrowStats/'+collectionName);
        const exponent = 9;
        const floorPrice = floorResponse.data.results.floorPrice/Math.pow(10, exponent);
        console.log('magiceden floor price:', floorPrice);
        const priceResponse = await axios.get('https://api-mainnet.magiceden.io/rpc/getCollectionEscrowStats/'+collectionName);
        const avgPrice = priceResponse.data.results.avgPrice24hr/Math.pow(10, exponent);
        console.log('magiceden avg price: ', avgPrice);
    } catch(err) {
        // Handle Error Here
        console.error(err);
    }
}

const getAlphaArt = async (collectionName) => {
    try { 
        // const collectionsResponse = await axios.get('https://apis.alpha.art/api/v1/collections');
        // const collectionName = collectionsResponse.data.collections[0].slug;
        const floorResponse = await axios.get('https://apis.alpha.art/api/v1/collection/'+collectionName);
        const exponent = 9;
        const floorPrice = floorResponse.data.floorPrice/Math.pow(10, exponent);
        console.log('alpha art floor price:', floorPrice);
        const priceResponse = await axios.post('https://apis.alpha.art/api/v1/collection', {
            "collectionId":collectionName,
            "orderBy":"PRICE_LOW_TO_HIGH",
            "status":["BUY_NOW"],
            "traits":[]
        }
        );
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const sum = priceResponse.data.tokens.map(item => parseInt(item.price)).reduce(reducer);

        const avgPrice = sum/priceResponse.data.tokens.length;
        console.log('alpha art average price of all items: ', avgPrice/Math.pow(10, exponent));
    } catch(err) {
        // Handle Error Here
        console.error(err);
    }
}

const getExchangeArt = async (collectionName) => {
    try { 
        // const collectionsResponse = await axios.get('https://api.exchange.art/v1/public/collections')
        // const collectionName = collectionsResponse.data[0].collectionName;
        const floorResponse = await axios.get('https://api.exchange.art/v1/public/collections/metadata?collectionName='+collectionName);
        const exponent = 9;
        const floorPrice = floorResponse.data.floorPrice/Math.pow(10, exponent);
        console.log('exchange art floor price:', floorPrice);
        const priceResponse = await axios.get('https://api.exchange.art/v1/public/tokens?collections='+collectionName);
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const sum = priceResponse.data.tokens.map(item => item.lastListedPrice).reduce(reducer);

        const avgPrice = sum/priceResponse.data.tokens.length;
        console.log('exchange art average price of all items: ', avgPrice/Math.pow(10, exponent));
    } catch(err) {
        // Handle Error Here
        console.error(err);
    }
}

const getDigitalEyes = async (collectionName) => {
    try { 
        // const collectionsResponse = await axios.get('https://us-central1-digitaleyes-prod.cloudfunctions.net/collection-retriever');
        // const collectionName = collectionsResponse.data[0].name;
        const floorResponse = await axios.get('https://us-central1-digitaleyes-prod.cloudfunctions.net/offers-retriever?collection='+collectionName);
        const exponent = 9;
        const floorPrice = floorResponse.data.price_floor/Math.pow(10, exponent);
        console.log('exchange art floor price:', floorPrice);
        const priceResponse = await axios.get('https://us-central1-digitaleyes-prod.cloudfunctions.net/offers-retriever?collection='+collectionName);
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const sum = priceResponse.data.offers.map(item => item.price).reduce(reducer);

        const avgPrice = sum/priceResponse.data.offers.length;
        console.log('exchange art average price of all items: ', avgPrice/Math.pow(10, exponent));
    } catch(err) {
        // Handle Error Here
        console.error(err);
    }
}

const getFTX = async (collectionName) => {
    try { 
        // const collectionsResponse = await axios.get('https://ftx.com/api/nft/nfts'
        // const collectionName = collectionsResponse.data[0].name;
        const floorResponse = await axios.get('https://ftx.com/api/nft/collection/'+collectionName);
        const floorPrice = floorResponse.data.result.floor_price;
        console.log('ftx floor price:', floorPrice);
        const allItemsUrl = "https://ftx.com/api/nft/nfts_filtered?startInclusive=0&endExclusive=10000000&nft_filter_string=%7B%22collection%22%3A%22" + collectionName + "%22%2C%22nftAuctionFilter%22%3A%22all%22%2C%22minPriceFilter%22%3Anull%2C%22maxPriceFilter%22%3Anull%2C%22seriesFilter%22%3A%5B%5D%2C%22traitsFilter%22%3A%7B%7D%2C%22searchStringFilter%22%3Anull%2C%22mintSourceFilter%22%3Anull%2C%22include_not_for_sale%22%3Atrue%7D&sortFunc=offer_asc";
        const priceResponse = await axios.get(allItemsUrl);
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const sum = priceResponse.data.result.nfts.map(item => item.offerPrice).reduce(reducer);

        const avgPrice = sum/priceResponse.data.result.nfts.length;
        console.log('exchange art average price of all items: ', avgPrice);
    } catch(err) {
        // Handle Error Here
        console.error(err);
    }
}

// getSolanaArt();
// getMagicEden();
// getAlphaArt();
// getExchangeArt();
// getDigitalEyes();
// getFTX('FractCat')