const fetch = require("node-fetch");
const { nodes } = require("../config");

module.exports = class Rest {
  static async search(track) {
    return await (
      await fetch(`http://localhost:2333/loadtracks?identifier=${track}`, {
        headers: {
          authorization: nodes[0].password,
        },
      })
    ).json();
  }
};