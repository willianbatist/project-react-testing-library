import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('4. Teste o componente `<NotFound.js />`', () => {
  it('Teste se página contém um heading "h2" com o texto "Page requested not found 😭";',
    () => {
      renderWithRouter(<NotFound />);
      const heading = screen.getByRole('heading', {
        name: 'Page requested not found Crying emoji' });
      expect(heading).toBeInTheDocument();
    });

  it('Teste se página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif".', () => {
    renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const alt = 'Pikachu crying because the page requested was not found';
    const imgFound = screen.getByRole('img', { name: alt });
    expect(imgFound.src).toBe(url);
  });
});
