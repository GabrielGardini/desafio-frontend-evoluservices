import { request, gql } from "graphql-request";

export async function getFilteredCharacter(name, page) {
  const query = gql`
  query {
    characters(page: ${page}, filter: { name: "${name}" }) {
      info {
        count
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
            name
        }
        location {
            name
        }
        
        image

      }
    }
  }
  `;

  try {
    const data = await request("https://rickandmortyapi.com/graphql", query);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
