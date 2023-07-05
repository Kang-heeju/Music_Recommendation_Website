const axios = require("axios");
const cheerio = require("cheerio");



const getHTML = async() => {
    try{ 
        return await axios.get("https://www.youtube.com/results?search_query=tomboy")
    }catch(err) {
        console.log(err);
    }
}


const parsing = async() => {
    const html = await getHTML();
    const $ = cheerio.load(html.data);
    const $TitleList = $("ytd-video-renderer.style-scope.ytd-item-section-renderer");

   // ytd-two-column-search-results-renderer ytd-section-list-renderer 
    $TitleList.each((inx, node) => {
        const key = $(node).find("a").attr("href");
        console.log(key);
    });

    // const key = $want.find('ytd-thumbnail.style-scope ytd-video-renderer a').attr('href')
    // console.log(key[0]);

}

parsing();