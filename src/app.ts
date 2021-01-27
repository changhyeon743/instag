import axios from "axios";

const sessionID = "";

(async () => {
  try {
    const entries = JSON.parse(
      (
        await axios.get("https://www.instagram.com/explore/tags/facebook", {
          headers: {
            Cookie: `sessionid=${sessionID}`,
            "sec-ch-ua": '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
            "sec-ch-ua-mobile": "?0",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
          },
        })
      ).data
        .match(/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/)[1]
        .slice(0, -1)
    ).entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media.edges;

    const captions = [];
    for (const entry of entries) {
      const _entry = entry.node.edge_media_to_caption.edges[0];
      if (!_entry) continue;
      captions.push(_entry.node.text);
    }

    let hashtags = [];
    captions.forEach((caption: string) => (hashtags = hashtags.concat(caption.match(/#([^\s#]+)/g))));

    // Remove Duplicates
    hashtags = [...new Set(hashtags.sort())];

    console.dir(hashtags);
  } catch (err) {
    console.error(err);
  }
})();
