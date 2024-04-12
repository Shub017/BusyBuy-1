import { db } from "../../Firebase";
import { collection, onSnapshot} from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import styles from './Products.module.css';
import { CustomContext } from "../../CustomContext/CustomContext";
import BeatLoader from "react-spinners/BeatLoader";
import SyncLoader from "react-spinners/SyncLoader";

export default function Products(){


    // Using React Spinner Library
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        }, 1000)
    }, [])

    // Spinners for Buttons
    const [buttonActive, setButton] = useState(-1)
    const ActivateButton = (id)=>{
        setButton(id);
        setTimeout(()=>{
            setButton(-1);
        }, 1000)
        console.log(id);
    }

    // to store name of all the albums
    const navigate = useNavigate();
    const {addToCart} = useContext(CustomContext);
    const [productsList, setProductsList] = useState([]);
    const [useProductList, setUseProductList] = useState([]);
    const [sliderValue, setSliderValue] = useState(200000);
    const [filtByMens, setfiltByMens] = useState(false);
    const [filtByWomen, setfiltByWomen] = useState(false);
    const [jewel, setfiltByJewel] = useState(false);
    const [Electronics, setElectronics] = useState(false);
    

    // get data from Database when the app gets render
    useEffect(()=>{

        // getting realtime updates from database
        onSnapshot(collection( db, "Products"), (snapShot) => {
            const card = snapShot.docs.map((doc) => {
                return{
                    id:doc.id,
                    ...doc.data()
                }
            });
            console.log(card);
            
            // storing all the products within local state variable
            setProductsList(card);
            setUseProductList(card);
        });
    },[]);

    const handleMensFilter = (event)=>{
        setfiltByMens(prevState => event.target.checked);
        if (!filtByMens){
            
            const filtered = productsList.map((d)=>{
                
                if (d.Category === 4){
                    
                    return d;
                }
                else{
                    return undefined;
                }
            })

            

            setUseProductList(filtered.filter(Boolean)); // Filter out undefined values
        }
        else{
            setUseProductList(productsList);
        }

    }

    const handleWomensFilter = (event)=>{
        setfiltByWomen(event.target.checked);
        if (!filtByWomen){
            
            const filtered = productsList.map((d)=>{
                
                if (d.Category === 3){
                    
                    return d;
                }
                else{
                    return undefined;
                }
            })

            

            setUseProductList(filtered.filter(Boolean)); // Filter out undefined values
        }
        else{
            setUseProductList(productsList);
        }
    }

    const handleJewelryFilter = (event)=>{
        setfiltByJewel(event.target.checked);
        
        if (!jewel){
            
            const filtered = productsList.map((d)=>{
                
                if (d.Category === 2){
                    
                    return d;
                }
                else{
                    return undefined;
                }
            })

            

            setUseProductList(filtered.filter(Boolean)); // Filter out undefined values
        }
        else{
            setUseProductList(productsList);
        }
    }

    const handleElecetronicsFilter = (event)=>{
        setElectronics(event.target.checked);
        
        if (!Electronics){
            
            const filtered = productsList.map((d)=>{
                
                if (d.Category === 1){
                    
                    return d;
                }
                else{
                    return undefined;
                }
            })

            

            setUseProductList(filtered.filter(Boolean)); // Filter out undefined values
        }
        else{
            setUseProductList(productsList);
        }
    }

    const handleAddToCart = async (Name, Price, Image, id)=>{
        const res = await addToCart(Name, Price, Image);
        if (!res){
            navigate('/Login');
        }
        ActivateButton(id)
        console.log(res);
    }

    return(
        <>
        
        <aside class={styles.filterSidebar}>
            <h2>Filter</h2>
            <form>
                <label for="price">Price: {sliderValue}</label>
                <input type="range" id="price" name="price" min="1" max="200001" onChange={(e)=>{setSliderValue(e.target.value)}} class={styles.priceRange} step="10" defaultValue={sliderValue} />
                <h2>Category</h2>
                <div class={styles.categoryContainer}><div>
                    <input type="checkbox" id="mensFashion" name="mensFashion" onChange={handleMensFilter}/>
                    <label for="mensFashion">Men's Clothing</label></div>
                    <div>
                        <input type="checkbox" id="womensFashion" name="womensFashion" onChange={handleWomensFilter}/>
                        <label for="womensFashion">Women's Clothing</label></div>
                        <div>
                            <input type="checkbox" id="jewelery" name="jewelery" onChange={handleJewelryFilter}/>
                            <label for="jewelery">Jewelery</label></div>
                            <div>
                                <input type="checkbox" id="electronics" name="electronics" onChange={handleElecetronicsFilter}/>
                                <label for="electronics">Electronics</label></div>
                            </div>
            </form>
        </aside>
        {loading?    <BeatLoader
            color={'#36d7b7'}
            loading={true}
            cssOverride={{ }}
            size={100}
            speedMultiplier={1}
            margin={2}
            className={styles.spinnerLoader}
        />:
      
        <div className={styles.grid}>
        {useProductList && useProductList.map((d, index) => {
        if (d && sliderValue >= d.Price) {
            
            return (
                <div key={index} className={styles.ProductCard}>
                    <img src={d.Image} alt={index} className={styles.imgSize}/>
                    <div className={styles.productDescription}>
                        <div className={styles.productName}>
                            <p>{d.Name}</p>
                        </div>
                        <div className={styles.ProductPrice}>₹{d.Price.toLocaleString('en-IN')}</div>
                        <button className={styles.addButton} title="Add to Cart" onClick={()=>{handleAddToCart(d.Name, d.Price, d.Image, index)}}>{buttonActive === index?<SyncLoader
                color={'#a3cb3a'}
                loading={true}
                cssOverride={{}}
                size={15}
                
            />:'Add To Cart'}</button>
                    </div>
                </div>
            );
        } else {
            return null; // If sliderValue is less than d.Price, don't render anything
        }
        })}
        </div>}
        </>
    )
}