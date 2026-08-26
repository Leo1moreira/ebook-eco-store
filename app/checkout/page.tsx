"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"info" | "payment">("info");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
  });

  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-2xl text-gray-600 mb-6">Seu carrinho está vazio</p>
        <Link
          href="/livros"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary"
        >
          Voltar aos Livros
        </Link>
      </div>
    );
  }

  const handleSubmitInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.cpf) {
      toast.error("Preencha todos os campos");
      return;
    }
    setStep("payment");
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Pagamento processado com sucesso!");
      clearCart();
      router.push("/pedido/sucesso");
    } catch (error) {
      toast.error("Erro ao processar pagamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === "info" && (
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações de Entrega</h2>

              <form onSubmit={handleSubmitInfo} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CPF
                  </label>
                  <input
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="000.000.000-00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition font-semibold mt-6"
                >
                  Continuar para Pagamento
                </button>
              </form>
            </div>
          )}

          {step === "payment" && (
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Método de Pagamento</h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">💳 Pagar com Pix</h3>
                <p className="text-gray-600 mb-4">
                  Escaneie o QR Code com seu celular para completar o pagamento:
                </p>
                <div className="bg-white border-2 border-gray-300 rounded-lg p-6 flex items-center justify-center min-h-64">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <p className="text-gray-600">QR Code Pix</p>
                    <p className="text-sm text-gray-500 mt-2">Escaneie para pagar</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white rounded border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2"><strong>Chave Pix:</strong></p>
                  <p className="font-mono text-sm text-gray-900 break-all">ebookecostore@email.com</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition font-semibold disabled:opacity-50"
                >
                  {loading ? "Processando..." : "✓ Confirmar Pagamento"}
                </button>

                <button
                  onClick={() => setStep("info")}
                  className="w-full bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Voltar
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>

          <div className="space-y-3 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.title}</span>
                <span className="font-semibold">R$ {item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-300 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxa:</span>
              <span>R$ 0,00</span>
            </div>
          </div>

          <div className="border-t border-gray-300 mt-4 pt-4">
            <div className="flex justify-between">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-bold text-primary">R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
