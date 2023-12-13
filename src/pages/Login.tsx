import {useAuthentication} from "../context/useAuthentication.tsx";

function Login() {
const {login} = useAuthentication()
    const handleClick = () => {
        login({email:"blabla@hotmail.com", password:"123456"})
    }

    return (
        <div>
            <button onClick={handleClick}>Click</button>
        </div>
    );
}

export default Login;