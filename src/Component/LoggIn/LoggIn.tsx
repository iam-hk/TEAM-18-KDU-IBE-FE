import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useState } from 'react';
import "./LoggIn.scss"

function LoggIn() {
    const { instance } = useMsal();
    const [idToken, setIdToken] = useState("");
    const Login = async () => {
        try {
            const { idToken } = await instance.loginPopup();
            setIdToken(idToken);
        } catch (error) {
            console.error(error);
        }
    }
    const Logout = async () => {
        try {
            await instance.logoutPopup();
            setIdToken("")
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="home">
            <AuthenticatedTemplate>
                <div role="alert">
                    <button type="button" className="logout-button" onClick={() => Logout()}>Logout</button>
                </div>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <div className="login-button" role="alert">
                    <button type="button" className="login-button"  onClick={() => Login()}>Login</button>
                </div>
            </UnauthenticatedTemplate>
        </div>
    )
}
export default LoggIn;