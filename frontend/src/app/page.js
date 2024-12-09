import Link from 'next/link';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="text-center max-w-xl">
                <h1 className="text-5xl font-extrabold text-gray-100 mb-6">
                    Welcome to Inventory Management System
                </h1>
                <p className="text-lg text-gray-400 mb-8">
                    Manage your products, customers, orders, and more with ease and efficiency in a modern dark mode design.
                </p>
                <div className="flex justify-center space-x-6">
                    <Link href="/products" legacyBehavior>
                        <a className="bg-blue-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-blue-400 transition ease-in-out duration-200 text-lg font-medium">
                            Go to Products
                        </a>
                    </Link>
                    <Link href="/customers" legacyBehavior>
                        <a className="bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-green-400 transition ease-in-out duration-200 text-lg font-medium">
                            Go to Customers
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;