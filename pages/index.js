import React from "react";

export default function Home({ pokemon }) {
  return (
    <div>
      <ul className="pokemon-list">
          {pokemon.map((pokeman, index) => (
              <li className="pokemon-item" key={index}>
                  <img src={pokeman.image} alt={pokeman.name} width="150" height="150" />
                  <p>{pokeman.name}</p>
              </li>
          ))}
      </ul>
    </div>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const { results } = await res.json();
    const pokemon = results.map((result, index) => {
      const paddedIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
      return {
        ...result,
        image,
      };
    });

    return {
      props: {
        pokemon,
      },
    };
  } catch (err) {
    console.error(err);
  }
}
