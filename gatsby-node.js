const path = require(`path`);
const axios = require('axios');

const crypto = require('crypto');


exports.sourceNodes = async ({ actions }) => {
    const { createNode } = actions;
    // fetch raw data from the randomuser api
    const getData = () => axios.post(`https://local.checkintocash.com/wp-content/themes/bb-theme-child/api/api.php`);
    // await for results
    const res = await getData();
  
    let full_state = "";
    let min_state = "";
    // map into these results and create nodes
  
    res.data.map((state, i) => {
      // Create your node object
      full_state = state.state;
      min_state = state.state_min;
      
      const userNode = {
        id: state.ID, 
        parent: `__SOURCE__`,
        internal: {
          type: `MomentFeed`, // name of the graphQL query --> allRandomUser {}
          // contentDigest will be added just after
          // but it is required
        },
        children        : [],
        state           : full_state,
        state_min       : min_state, 
        cities          : state.cities
      }

      // Get content digest of node. (Required field)
      const contentDigest = crypto
        .createHash(`md5`)
        .update(JSON.stringify(userNode))
        .digest(`hex`);
      // add it to userNode
      userNode.internal.contentDigest = contentDigest;

      // Create node with the gatsby createNode() API
      createNode(userNode);

    });
  
    return;
  }