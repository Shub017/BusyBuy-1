import styles from './LogIn.module.css'
import { Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { CustomContext } from '../../CustomContext/CustomContext';

export default function LogIn(){

    const navigate = useNavigate() // Access the history object

    const { email, setEmail, password, setPassword, UsersInfo, LogIn} = useContext(CustomContext);

    

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Do something with the extracted values ( email, password)
        console.log( email, password);
        const users = await UsersInfo();
        const redirect = await LogIn( email, password, users)
        // Redirect to '/product' after form submission
        if(redirect){
            navigate('/Product')
        }
    };

    return(
        <div className={styles.formContainer} onSubmit={handleSubmit}>
            <form className={styles.LoginPageForm}>
            <h2 className={styles.LoginPageHeading}>LogIn</h2>
            <input type="email" name="email" onChange={handleEmailChange} class={styles.LogInInput} placeholder="Enter Email"></input>
            <input type="password" name="password" onChange={handlePasswordChange} class={styles.LogInInput} placeholder="Enter Password"></input>
            
            <button class={styles.submitButton}>Sign In</button>
            
            <Link to={'/SingUp'}>
                <p>Or SignUp instead</p>
            </Link>
            </form>
        </div>
    )
}