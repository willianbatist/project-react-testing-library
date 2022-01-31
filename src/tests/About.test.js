import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('2. Teste o componente <About.js />.', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByText(/This application simulates a Pokédex/i);
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Teste se a página contém um heading "h2" com o texto "About Pokédex".', () => {
    renderWithRouter(<About />);
    const headingPoke = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(headingPoke).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const paragraphsOne = screen.getByText(/This application simulates a Pokédex/i);
    expect(paragraphsOne).toBeInTheDocument();
    const paragraphsTwo = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraphsTwo).toBeInTheDocument();
  });

  it(`Teste se a página contém a seguinte imagem de uma Pokédex: 
  "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png".`,
  () => {
    renderWithRouter(<About />);
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { name: 'Pokédex' });
    expect(img.src).toBe(URL);
  });
});
