import React from 'react';
import Link from 'next/link';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-red-500 mb-4">Ой! Что-то пошло не так.</h1>
                <p className="text-gray-700 mb-6">
                    Похоже, произошла ошибка. Пожалуйста, попробуйте еще раз позже.
                </p>
                <Link href="/">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Вернуться на главную
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
