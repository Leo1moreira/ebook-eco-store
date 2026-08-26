"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminPage() {
  const [books, setBooks] = useState([
    {
      id: "1",
      title: "Sustentabilidade Digital",
      author: "João Silva",
      price: 29.90,
    },
    {
      id: "2",
      title: "O Futuro Verde",
      author: "Maria Santos",
      price: 34.90,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", author: "", price: "" });

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.price) {
      toast.error("Preencha todos os campos");
      return;
    }

    const newBook = {
      id: String(books.length + 1),
      title: formData.title,
      author: formData.author,
      price: parseFloat(formData.price),
    };

    setBooks([...books, newBook]);
    setFormData({ title: "", author: "", price: "" });
    setShowForm(false);
    toast.success("Livro adicionado com sucesso!");
  };

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
    toast.success("Livro removido!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard Admin</h1>
        <Link
          href="/"
          className="text-primary hover:underline font-semibold"
        >
          ← Voltar
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-3xl font-bold text-primary mb-2">{books.length}</div>
          <p className="text-gray-600">Livros no Catálogo</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-3xl font-bold text-primary mb-2">1.250</div>
          <p className="text-gray-600">Vendas Totais</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-3xl font-bold text-primary mb-2">R$ 18.750</div>
          <p className="text-gray-600">Faturamento</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="text-3xl font-bold text-primary mb-2">348</div>
          <p className="text-gray-600">Usuários Ativos</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Gerenciar Livros</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition"
          >
            {showForm ? "Cancelar" : "➕ Adicionar Livro"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAddBook} className="mb-8 p-6 bg-gray-50 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Autor
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition font-semibold"
            >
              Adicionar
            </button>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Título</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Autor</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Preço</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">{book.title}</td>
                  <td className="px-6 py-4 text-gray-600">{book.author}</td>
                  <td className="px-6 py-4 font-semibold text-primary">R$ {book.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
