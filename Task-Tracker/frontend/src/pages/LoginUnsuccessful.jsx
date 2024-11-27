import { useNavigate } from "react-router-dom";

export default function LoginUnsuccessful() {
    const navigate=useNavigate()
    return (
        <div className="flex items-center justify-center min-h-screen bg-red-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-4 text-red-600">Login Unsuccessful</h2>
                <p className="mb-6 text-gray-700">Unfortunately, we couldn't log you in. Please try again.</p>
                <button
                    onClick={() => {
                       navigate('/');
                    }}
                    className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}