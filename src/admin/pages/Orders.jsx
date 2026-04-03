import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../services/db';
import { Package } from 'lucide-react';

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        const data = await getOrders();
        setOrders(data);
    };

    const handleStatusChange = async (id, newStatus) => {
        await updateOrderStatus(id, newStatus);
        loadOrders();
    };

    const statuses = [
        { value: 'pendente_confirmacao', label: 'Pendente Confirmação' },
        { value: 'confirmado_cliente', label: 'Confirmado pelo Cliente' },
        { value: 'saiu_para_entrega', label: 'Saiu para Entrega' },
        { value: 'pago_no_ato', label: 'Pago no Ato (Contra Entrega)' },
        { value: 'recusado_na_porta', label: 'Recusado na Porta' },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700">
                    <Package size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestão de Pedidos</h1>
                    <p className="text-sm text-gray-500">Acompanhe e atualize o status logístico de contra-entrega.</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-4 py-3 font-semibold text-gray-600">ID Pedido</th>
                            <th className="px-4 py-3 font-semibold text-gray-600">Cliente</th>
                            <th className="px-4 py-3 font-semibold text-gray-600">Data</th>
                            <th className="px-4 py-3 font-semibold text-gray-600">Total</th>
                            <th className="px-4 py-3 font-semibold text-gray-600">Status Logístico</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-4 py-4 font-medium text-gray-900">{order.id}</td>
                                <td className="px-4 py-4 text-gray-600">{order.customer}</td>
                                <td className="px-4 py-4 text-gray-500">{new Date(order.date).toLocaleDateString('pt-BR')}</td>
                                <td className="px-4 py-4 text-gray-900 font-medium font-mono">€ {order.total.toFixed(2)}</td>
                                <td className="px-4 py-4">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="bg-white border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-black focus:border-black block w-full p-2.5 font-medium cursor-pointer"
                                    >
                                        {statuses.map(s => (
                                            <option key={s.value} value={s.value}>{s.label}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && <p className="text-center text-gray-500 py-8">Nenhum pedido encontrado.</p>}
            </div>
        </div>
    );
}
