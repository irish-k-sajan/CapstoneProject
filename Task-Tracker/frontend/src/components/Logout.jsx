import { GoogleLogout } from 'react-google-login'
import { useNavigate } from 'react-router-dom';

const clientId="714826473195-mkbur5p2vel0mtc8o8suvr94rdni8n4g.apps.googleusercontent.com"
export default function Logout(){
    const navigate=useNavigate();
    function onSuccess(){
        console.log("SUCCESSFULLY LOGGED OUT");
        navigate('/');
    }

    return <div className='flex justify-end'>
    <GoogleLogout 
    clientId={clientId}
    render={renderProps => (
        <button
            onClick={renderProps.onClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
        >
            Logout
        </button>
    )}
    buttonText=''
    onLogoutSuccess={onSuccess}
    />
    </div>

}