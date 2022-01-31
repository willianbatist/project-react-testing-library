import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('1. Teste o componente <App.js />', () => {
  it(`Teste se o topo da aplicação contém um conjunto fixo de links 
  ("home","/about", "/favorites") de navegação.`,
  () => {
    renderWithRouter(<App />);
    // O primeiro link deve possuir o texto Home.
    const links = screen.getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');

    // O segundo link deve possuir o texto About.
    expect(links[1].innerHTML).toBe('About');

    // O terceiro link deve possuir o texto Favorite Pokémons.
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });

  it(`Teste se a aplicação é redirecionada para a página inicial, na URL / 
  ao clicar no link Home da barra de navegação`,
  () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[1]);
    userEvent.click(links[0]);
    expect(history.location.pathname).toBe('/');
  });

  it(`Teste se a aplicação é redirecionada para a página de About, na URL 
  /about, ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[1]);
    expect(history.location.pathname).toBe('/about');
  });

  it(`Teste se a aplicação é redirecionada para a página 
  de Pokémons Favoritados, na URL /favorites, ao clicar no link 
  Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[2]);
    expect(history.location.pathname).toBe('/favorites');
  });

  it(`Teste se a aplicação é redirecionada para a página
  Not Found ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/asdasd');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
