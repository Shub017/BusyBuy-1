import styles from './SingUP.module.css'
import { useContext } from 'react'
import { CustomContext } from '../../CustomContext/CustomContext'
export default function SingUP(){
    const {registerNewUser, name, setName, email, setEmail, password, setPassword} = useContext(CustomContext);
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the extracted values (name, email, password)
        console.log(name, email, password);
        registerNewUser(name, email, password)
    };

    return (
        <div className={styles.formContainer}>
            <form className={styles.SingUpform} onSubmit={handleSubmit}>
                <h2 className={styles.FormHeading}>Sign Up</h2>
                <input type="text" name="name" value={name} onChange={handleNameChange} className={styles.formInput} placeholder="Enter Name" />
                <input type="email" name="email" value={email} onChange={handleEmailChange} className={styles.formInput} placeholder="Enter Email" />
                <input type="password" name="password" value={password} onChange={handlePasswordChange} className={styles.formInput} placeholder="Enter Password" />
                <button type="submit" className={styles.formSubmitButton}>Sign Up</button>
            </form>
        </div>
    );
}