import { useContext } from "react";
import { CustomContext } from "../../CustomContext/CustomContext";
import styles from './Cart.module.css'

export default function Cart(){
    const {cartItems, totalCartPrice, updateCartTotalPrice, setCartItems, email, savePurchaseDetails} = useContext(CustomContext);
    console.log("Cart Items for email", email);
    console.log("CartItems Obtained: ", cartItems);
    const totalPrice = cartItems.reduce((accumulator, currentItem) => accumulator + (+currentItem.Price * currentItem.Quantity), 0);
    updateCartTotalPrice(totalPrice);

    const removeFromCart = (index)=>{
        // Create a copy of the cartItems array
        const updatedCartItems = [...cartItems];

        // Using splice to remove item
        updatedCartItems.splice(index, 1);

        // Update the cartItems
        setCartItems(updatedCartItems);
    }

    const increaseQuantity = (index) => {
        // Create a copy of the cartItems array
        const updatedCartItems = [...cartItems];
        
        // Update the Quantity of the item at the given index
        updatedCartItems[index] = {
            ...updatedCartItems[index],
            Quantity: updatedCartItems[index].Quantity + 1
        };
    
        // Update the state with the new array
        setCartItems(updatedCartItems);
    };

    const decreaseQuantity = (index) =>{
        // Create a copy of the cartItems array
        const updatedCartItems = [...cartItems];
        
        // Update the Quantity of the item at the given index
        updatedCartItems[index] = {
            ...updatedCartItems[index],
            Quantity: updatedCartItems[index].Quantity - 1
        };
    
        // Update the state with the new array
        setCartItems(updatedCartItems);
    }
    
    const addPurchasedItem = (email, cartItems)=>{
        savePurchaseDetails(email, cartItems);
    }
    
    return(
        <>
        <aside className={styles.filterSidebar}>
            <p>Total: {totalCartPrice.toLocaleString('en-IN')}</p>
            <button className={styles.CartPurchaseButton} onClick={()=>{addPurchasedItem(email, cartItems)}}>Purchase</button>
        </aside>
        <div className={styles.gridDisplay}>
        
            {cartItems.map((d, index)=>{
                return(
                    <div className={styles.TotalCart}>
                        <img src={d.Image} style={{ height: '200px', width: '200px' }} alt={`ImageNo${index}`}/>
                        <div className={styles.ProductDetails}>
                            <div className={styles.ProductName}>
                                <p>{d.Name}</p>
                            </div>
                            <div className={styles.productOptions}>
                                <p>₹ {(d.Price * d.Quantity).toLocaleString('en-IN')}</p>
                                <div className={styles.productQuantityContainer}>
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFElEQVR4nO2WT2rCQBTGf5dwUWuK55D2AIVWeg012rN016J00aX7/rmJEU9h4s6IZeAJocTJm0mmZOEH3yaQ/Hhf3rw3cFELdQNMgR8gAXbiRJ7FQNQk8Bp4A3LgWOEDsAT6daFPQKYA/nUKDH2hz1KBK7RY/cyn0kMNaBGurrznGa8t9q4G/N4g9OS55shoutfVuSR5VrMA0JMnNvB3QPCnDbwJCE5s4LTkhQHuuj3T3U5g8xFX3bmC1wGjXrWyueKA4JENHAUaIPuqAWK0CAB+Rbn4y7rb11vgCqXuG4rcrMVHLbQ4t+teBMwdzUtDz9hNvA/UVAd4kc7UVPnh8k816slq+5IplIlXMhzGmiNzEf+tX262pRCJmsimAAAAAElFTkSuQmCC" onClick={()=>decreaseQuantity(index)} alt='DecreaseButton'/>
                                    {d.Quantity}
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABHUlEQVR4nO2WQWrCQBSGv0t0oVXxHFIPIKj0GlWrZ3HXonTRpXutNzHFUxjdNZISeEIIY/Je0iku/OFtwpCP988/bwbuukG1gFdgCwTASSqQbxOg+ZfAR+AdiIC4oM7ACmhXhT4DRwUwWyEwLAudSQdWaLr7aZlOzxWgabi684bS3g7wpLS9rgF/KLu5SLN2oTkykQdwJE5e1dSwfxZwDIzzwF8ewes88N4jOMgDh1fSa5Ur7aEVnPzEqq4V/O3R6t1NhmviEfySB256GiA/RQMk0dID+A3lxe9KtyvtrvRm6wDUUKpnsLzoWhxooem5XfUhkLzRSmmotN1lb5+KegDmkkxNl5+WPdWoIVfbRqbQUWonw2GkOTJ38d/6BZ8CjheXznrAAAAAAElFTkSuQmCC" onClick={()=>increaseQuantity(index)} alt='IncreaseButton'/>
                                </div>
                            </div>
                            <button className={styles.removeFromCartButton} onClick={()=>{removeFromCart(index)}}>REMOVE FROM CART</button>
                        </div>
                    </div>
                )
            })}
        
        </div>
        </>
    )
}