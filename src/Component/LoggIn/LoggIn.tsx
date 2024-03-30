import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { useState } from 'react';
import "./LoggIn.scss"
import { useTranslation } from 'react-i18next';
function LoggIn() {
    const { t } = useTranslation();
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
        <>
            <AuthenticatedTemplate>
                <div role="alert">
                    <button type="button" className="logoutbutton" onClick={() => Logout()}>{t('logout')}</button>
                </div>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <div className="login-button" role="alert">
                    <button type="button" className="loginbutton"  onClick={() => Login()}>{t('login')}</button>
                </div>
            </UnauthenticatedTemplate>
        </>
    )
}
export default LoggIn;