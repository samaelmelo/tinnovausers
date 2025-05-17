import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Input } from '.';

describe('Componente de Inpu', () => {
  it('renderiza o label corretamente', () => {
    render(<Input label="Nome" />);
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
  });

  it('mostra mensagem de erro quando inválido', () => {
    render(
      <Input
        label="Email"
        error
        errorMessage="Campo obrigatório"
        placeholder="Digite seu email"
      />,
    );

    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('chama onChange quando o valor é alterado', () => {
    const handleChange = vi.fn();

    render(<Input label="Telefone" onChange={handleChange} />);

    const input = screen.getByLabelText('Telefone');
    fireEvent.change(input, { target: { value: '99999-9999' } });

    expect(handleChange).toHaveBeenCalled();
  });
});
