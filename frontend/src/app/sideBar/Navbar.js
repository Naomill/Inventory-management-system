import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const [isOrdersOpen, setIsOrdersOpen] = useState(false);
    const [isExportOpen, setIsExportOpen] = useState(false);

    return (
        <div className="w-64 bg-[#263238] text-white h-screen fixed flex flex-col justify-between">
            <div>
                <div className="p-6 text-lg font-bold border-b border-gray-700">
                    StockFlow
                </div>
                <nav className="mt-6">
                    <Link href="/products" legacyBehavior>
                        <a className="flex items-center px-6 py-2 hover:bg-gray-700">
                            <span className="material-icons-outlined mr-2">inventory</span>
                            Product Management
                        </a>
                    </Link>
                    <Link href="/categories" legacyBehavior>
                        <a className="flex items-center px-6 py-2 hover:bg-gray-700">
                            <span className="material-icons-outlined mr-2">category</span>
                            Category Management
                        </a>
                    </Link>
                    <div>
                        <button
                            onClick={() => setIsOrdersOpen(!isOrdersOpen)}
                            className="w-full text-left flex items-center px-6 py-2 hover:bg-gray-700"
                        >
                            <span className="material-icons-outlined mr-2">people</span>
                            Orders and Suppliers
                            <span className="ml-auto material-icons-outlined">
                                {isOrdersOpen ? 'expand_less' : 'expand_more'}
                            </span>
                        </button>
                        {isOrdersOpen && (
                            <div className="ml-8">
                                <Link href="/orders" legacyBehavior>
                                    <a className="block px-4 py-2 hover:bg-gray-700">Orders</a>
                                </Link>
                                <Link href="/suppliers" legacyBehavior>
                                    <a className="block px-4 py-2 hover:bg-gray-700">Supplier Management</a>
                                </Link>
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            onClick={() => setIsExportOpen(!isExportOpen)}
                            className="w-full text-left flex items-center px-6 py-2 hover:bg-gray-700"
                        >
                            <span className="material-icons-outlined mr-2">upload</span>
                            Exportation and Customers
                            <span className="ml-auto material-icons-outlined">
                                {isExportOpen ? 'expand_less' : 'expand_more'}
                            </span>
                        </button>
                        {isExportOpen && (
                            <div className="ml-8">
                                <Link href="/export-orders" legacyBehavior>
                                    <a className="block px-4 py-2 hover:bg-gray-700">Export Orders</a>
                                </Link>
                                <Link href="/customers" legacyBehavior>
                                    <a className="block px-4 py-2 hover:bg-gray-700">Customer Management</a>
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
            <div className="p-6 border-t border-gray-700 flex justify-center">
                <Link href="/" legacyBehavior>
                    <a className="bg-red-500 text-white w-12 h-12 flex items-center justify-center rounded-full hover:bg-red-600">
                        <span className="material-icons-outlined">logout</span>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;