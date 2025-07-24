// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pokemonListMapper = (data: any) => ({
  count: data.count as number,
  results: (data.results as { name: string; url: string }[]).map((p) => {
    const id = p.url.split("/").filter(Boolean).pop()!;
    return {
      id: parseInt(id, 10),
      name: p.name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  }),
});
