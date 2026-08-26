"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import toast from "react-hot-toast";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  downloads: number;
}

const mockBooks: Record<string, Book> = {
  "1": {
    id: "1",
    title: "Sustentabilidade Digital",
    author: "João Silva",
    description: "Um guia completo sobre práticas sustentáveis na era digital. Este e-book aborda desde os fundamentos da sustentabilidade até estratégias avançadas de implementação em empresas de tecnologia.",
    price: 29.90,
    image: "📗",
    rating: 4.5,
    downloads: 342,
  },
  "2": {
    id: "2",
    title: "O Futuro Verde",
    author: "Maria Santos",
    description: "Descubra como a tecnologia pode salvar nosso planeta. Uma leitura inspiradora sobre inovação e sustentabilidade.",
    price: 34.90,
    image: "📘",
    rating: 5,
    downloads: 521,
  },
  "3": {
    id: "3",
    title: "Tecnologia Eco-Amigável",
    author: "Pedro Costa",
    description: "Soluções tecnológicas para um mundo mais verde.",
    price: 24.90,
    image: "📙",
    rating: 4,
    downloads: 234,
  },
};

export default function BookDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    setBook(mockBooks[id] || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-gray-600 mb-4">Livro não encontrado</p>
        <Link href="/livros" className="text-primary hover:underline">
          Voltar aos livros
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: book.id,
      title: book.title,
      price: book.price,
      image: book.image,
    });
    toast.success(`${book.title} adicionado ao carrinho!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/livros" className="text-primary hover:underline mb-6 inline-block">
        ← Voltar aos livros
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex items-center justify-center bg-gray-50 rounded-lg p-12">
          <div className="text-9xl">{book.image}</div>
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-6">por {book.author}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-4xl font-bold text-primary">R$ {book.price.toFixed(2)}</span>
            <span className="text-2xl">⭐ {book.rating}</span>
            <span className="text-gray-600">({book.downloads} downloads)</span>
          </div>

          <div className="border-t border-gray-200 py-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Sobre</h2>
            <p className="text-gray-600 leading-relaxed">{book.description}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-white py-4 rounded-lg hover:bg-secondary transition text-lg font-semibold"
            >
              🛒 Adicionar ao Carrinho
            </button>
            <Link
              href="/carrinho"
              className="w-full block text-center bg-gray-100 text-gray-900 py-4 rounded-lg hover:bg-gray-200 transition font-semibold"
            >
              Ir para o Carrinho
            </Link>
          </div>

          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✓ Acesso instantâneo após o pagamento
            </p>
            <p className="text-sm text-green-800">
              ✓ Sem limites de downloads
            </p>
            <p className="text-sm text-green-800">
              ✓ Suporte ao cliente 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
