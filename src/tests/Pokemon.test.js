import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('6. Teste o componente `<Pokemon.js />`', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByAltText('Pikachu sprite');
    // O nome correto do Pokémon deve ser mostrado na tela;
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
    // O tipo correto do pokémon deve ser mostrado na tela.
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
    //  O peso médio do pokémon deve ser exibido com um texto no formato
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent('Average weight');
    //  A imagem do Pokémon deve ser exibida.
    expect(pikachu).toBeInTheDocument();
    expect(pikachu).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it(`Teste se o card do Pokémon indicado na Pokédex
  contém um link de navegação para exibir detalhes deste Pokémon.`, () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  it(` Teste se ao clicar no link de navegação do Pokémon,
  é feito o redirecionamento da aplicação para a página de detalhes de Pokémon. `,
  () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(screen.getByText('Summary')).toBeInTheDocument();
  });

  it(`Teste também se a URL exibida no navegador muda para
   "/pokemon/<id>", onde "<id>" é o id do Pokémon cujos detalhes se deseja ver;`,
  () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    console.log(history.location.pathname);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    // O ícone deve ser uma imagem com o atributo `src` contendo o caminho `/star-icon.svg`;
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    userEvent.click(screen.getByRole('checkbox', { name: /pokémon favoritado\?/i }));
    const imgPokemon = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgPokemon).toHaveAttribute('src', '/star-icon.svg');
    // A imagem deve ter o atributo `alt` igual a `<pokemon> is marked as favorite`, onde `<pokemon>` é o nome do Pokémon exibido.
    expect(imgPokemon).toBeInTheDocument();
  });
});
