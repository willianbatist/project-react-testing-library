import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('3. Teste o componente "<FavoritePokemons.js />"', () => {
  it(`Teste se é exibido na tela a mensagem "No favorite pokemon found", 
  se a pessoa não tiver pokémons favoritos.`, () => {
    renderWithRouter(<FavoritePokemons />);
    const mensageFound = screen.getByText('No favorite pokemon found');
    expect(mensageFound).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);
    history.push('/');
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemon);
    userEvent.click(
      screen.getByRole('link', { name: /more details/i }),
    );
    userEvent.click(
      screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }),
    );
    history.push('/favorites');
    const pokemonCard = screen.getAllByRole('img', { name: /sprite/i });
    expect(pokemonCard.length).toBe(2);
  });
});
