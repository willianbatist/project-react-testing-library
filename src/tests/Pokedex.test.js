import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('5. Teste o componente "<Pokedex.js />"', () => {
  it('5.1 Teste se página contém um heading `h2` com o texto `Encountered pokémons`.',
    () => {
      renderWithRouter(<App />);
      const headingDex = screen.getByRole('heading',
        { name: /Encountered pokémons/i, level: 2 });
      expect(headingDex).toBeInTheDocument();
    });

  it(` 5.2 Teste se é exibido o próximo Pokémon da lista
  quando o botão "Próximo pokémon" é clicado.`, () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokemonOne = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokemonOne).toBeInTheDocument();
    userEvent.click(nextPokemon);
    const pokemonTwo = screen.getByRole('img', { name: /charmander sprite/i });
    expect(pokemonTwo).toBeInTheDocument();
  });

  it(' 5.2.1 O botão deve conter o texto `Próximo pokémon`;', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('button', { name: 'Próximo pokémon' })).toBeInTheDocument();
  });

  it(`5.2.2 Os próximos Pokémons da lista devem ser mostrados,
  um a um, ao clicar sucessivamente no botão;
  5.3 Teste se é mostrado apenas um Pokémon por vez.`, () => {
    renderWithRouter(<App />);
    const img = screen.getAllByRole('img', { name: /sprite/i });
    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    expect(img.length).toBe(1);
    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    expect(img.length).toBe(1);
    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    expect(img.length).toBe(1);
  });

  it(`5.2.3 O primeiro Pokémon da lista deve ser mostrado ao clicar no botão,
  se estiver no último Pokémon da lista;`, () => {
    renderWithRouter(<App />);
    const eight = 8;
    for (let index = 0; index < eight; index += 1) {
      userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    }
    // ultimo pokemon da lista
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Dragonair');
    userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    // primeiro pokemon da lista
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    const typesPokemonButton = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    // Verifica se todos os botões de buttons é do mesmo tamanho array de tipos, assim diz não ter repetição.
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(typesPokemonButton.length);
    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    // ser se os tipos dos botões bate com a lista de tipos.
    // 5.4.3 O texto do botão deve corresponder ao `nome do tipo`, ex. `Psychic`;
    for (let index = 0; index < typesPokemonButton.length; index += 1) {
      const type = typesPokemonButton[index];
      expect(buttons[index]).toHaveTextContent(type);
    }
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    // deixar a lista do pokemons tipo bug
    userEvent.click(screen.getByRole('button', { name: /bug/i }));
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Bug');
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
  });
});
