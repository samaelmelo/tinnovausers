import { render, screen } from '@testing-library/react';
import { UserTable } from '.';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

const mockUsers = [
  {
    id: '1',
    name: 'João da Silva',
    cpf: '12345678900',
    phone: '11999999999',
    email: 'joao@teste.com',
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    cpf: '98765432100',
    phone: '21988888888',
    email: 'maria@teste.com',
  },
];

describe('UserTable', () => {
  it('renderiza os cabeçalhos corretamente', () => {
    render(<UserTable users={mockUsers} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('CPF')).toBeInTheDocument();
    expect(screen.getByText('Telefone')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Ações')).toBeInTheDocument();
  });

  it('renderiza os usuários corretamente', () => {
    render(<UserTable users={mockUsers} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('João da Silva')).toBeInTheDocument();
    expect(screen.getByText('Maria Oliveira')).toBeInTheDocument();
    expect(screen.getByText('joao@teste.com')).toBeInTheDocument();
  });

  it('mostra mensagem quando não há usuários', () => {
    render(<UserTable users={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('Nenhum usuário cadastrado.')).toBeInTheDocument();
  });

  it('chama onEdit e onDelete corretamente ao clicar nos botões da linha', async () => {
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(
      <UserTable users={[mockUsers[0]]} onEdit={onEdit} onDelete={onDelete} />,
    );

    const editButton = screen.getByRole('button', { name: /editar/i });
    const deleteButton = screen.getByRole('button', { name: /excluir/i });

    await userEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledWith('12345678900');

    await userEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith('12345678900');
  });
});
