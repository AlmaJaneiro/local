import * as React from "react";
import { graphql } from "gatsby";


const IndexPage = ({data}) => {

  console.log(data);
  return (
    <main>
       <h1>Stores Information</h1>
       <pre>{JSON.stringify(data, null, 4)}</pre>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>


/**/


export const query = graphql`
query MyQuery {
  allMomentFeed {
    nodes {
      cities {
        ID
        sublocality
        region
        status
        postal_code
        post_name
        phone
        name
        momentfeed_id
        longitude
        locality
        latitude
        internal_ref
        id_local
        country
        corporate_id
        address_extended
        address_3
        address
      }
      state_min
      state
      id
    }
  }
}
`;

