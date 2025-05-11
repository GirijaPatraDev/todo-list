import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const handleGotoLogin = () => {
        navigate('/login');
    }
    return(
        <div>
            Welcome to Todo List App
            <button onClick={handleGotoLogin}>Login/Signup</button>
            <footer>made with React</footer>
        </div>
    );
}

export default Home;