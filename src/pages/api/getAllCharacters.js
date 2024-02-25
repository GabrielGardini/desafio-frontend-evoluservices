export async function getAllCharacters(page) {
  try {
    const data = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await data.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
