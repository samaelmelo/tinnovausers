import { fireEvent, render, screen } from '@testing-library/react';
import {Button} from './index';
import { vi } from 'vitest';

describe('Button component', () => {
  it('renders the button text', () => {
    render(<Button text="Salvar" />);
    expect(screen.getByRole('button')).toHaveTextContent('Salvar');
  });

  it('calls onClick whe clicked', () => {
    const handleClick = vi.fn();
    render(<Button text="Clique aqui" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it("is disabled when 'disabled' is true", () => {
    render(<Button text="Desativado" disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it("is disabled when 'isLoading' is true", () => {
    render(<Button text="Carregando" isLoading />);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button').textContent).not.toContain('Carregando');
  });

  it('shows spinner when loading', () => {
    render(<Button text="Enviar" isLoading />);
    expect(
      screen.getByRole('button').querySelector('span'),
    ).toBeInTheDocument();
  });

  it('applies correct class for variant outline', () => {
    const { container } = render(
      <Button text="Outline" variant="outline" className="outline" />,
    );
    expect(container.firstChild).toHaveClass('outline');
  });

  it('applies correct class for variant secondary', () => {
    const { container } = render(
      <Button text="Voltar" variant="secondary" className="secondary" />,
    );
    expect(container.firstChild).toHaveClass('secondary');
  });
});
