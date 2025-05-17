import { render, screen } from '@testing-library/react';
import { Modal } from './';

describe('Modal', () => {
  it('não renderiza nada quando isOpen é false', () => {
    const { container } = render(
      <Modal isOpen={false}>
        <p>Conteúdo do modal</p>
      </Modal>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renderiza o título e o conteúdo quando isOpen é true', () => {
    render(
      <Modal isOpen title="Título do conteúdo">
        <p>Conteúdo do modal</p>
      </Modal>,
    );

    expect(screen.getByText('Título do conteúdo')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo do modal')).toBeInTheDocument();
  });

  it('não renderiza o título se não for passado', () => {
    render(
      <Modal isOpen>
        <p>Sem título</p>
      </Modal>,
    );

    expect(screen.getByText('Sem título')).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
