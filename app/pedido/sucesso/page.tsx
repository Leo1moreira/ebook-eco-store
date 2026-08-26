"use client";

import Link from "next/link";

export default function PedidoSucessoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-primary/10 py-12 px-4">
      <div className="max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-6">✅</div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Pagamento Confirmado!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Seu pedido foi processado com sucesso. Você receberá um email de confirmação em breve.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-2"><strong>Número do Pedido:</strong></p>
          <p className="font-mono text-lg font-bold text-gray-900">ORD-{Date.now()}</p>
        </div>

        <div className="space-y-3">
          <Link
            href="/meus-pedidos"
            className="block bg-primary text-white py-3 rounded-lg hover:bg-secondary transition font-semibold"
          >
            Ver Meus Pedidos
          </Link>
          
          <Link
            href="/livros"
            className="block bg-gray-100 text-gray-900 py-3 rounded-lg hover:bg-gray-200 transition font-semibold"
          >
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
