import Link from 'next/link';

const HomePage = () => {
    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-4">Welcome to Inventory Management System</h1>
            <p className="mb-6">Manage your products, customers, orders, and more with ease!</p>
            <div className="space-x-4">
                <Link href="/products" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Go to Products
                </Link>
                <Link href="/customers" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Go to Customers
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
