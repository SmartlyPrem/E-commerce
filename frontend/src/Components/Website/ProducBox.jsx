import React, { useContext } from 'react';
import { FaStar } from "react-icons/fa";
import { Context } from '../../Context/MainContext';
import { useDispatch, useSelector } from 'react-redux';
import { BsCart4 } from "react-icons/bs";
import { addToCart } from '../../reducer/CartSlice';
import axios from 'axios';

const ProducBox = ({ name, _id, image, rating = 4, price, color, discount_per, discount_price, bestProdImg }) => {
    const { BASE_URL, ProdImgPath, CART_URL } = useContext(Context);
    const user = useSelector(store => store.user);
    const dispatcher = useDispatch()
    const cart = useSelector(store => store.cart);

    function addTodbCart(pId) {
        if (user.data != null) {
            // !user.data
            axios.post(BASE_URL + CART_URL + "/add-to-cart", {user_id : user.data._id, pId : pId})
                .then(
                    (success) => { }
                )
                .catch(
                    (error) => { }
                )
        }
    }

    return (
        <div className='flex items-center flex-col mobile:border-b tablet:border p-3 '>
            <div className='border-b pb-3'><img className='w-[200px] h-[200px]' src={`${BASE_URL}${bestProdImg != null ? bestProdImg : ProdImgPath}${image}`} alt="" /></div>
            <h2 className='text-center py-2 capitalize'>{name}</h2>
            <div>
                {
                    color.map(
                        (color, i) => {
                            return <span key={i} style={{ backgroundColor: color.code }} className='px-[10px] ms-2 rounded-full'></span>
                        }
                    )
                }
            </div>
            <Stars yellow={rating} />
            {
                discount_per != 0 ?
                    <div className='mt-2 text-center'><span className='text-blue-600'>₹{discount_price} ({discount_per + "% off discount"})</span>
                        <br />
                        <span className='text-[#C1C8CE] line-through text-center'>₹ {price}</span>
                    </div> : <span className='text-blue-600 text-center'>₹ {price}</span>
            }
            <div onClick={() => {
                dispatcher(addToCart({ price: discount_price, pId: _id, qty: 1 }));
                addTodbCart(_id);
            }} className='relative my-3 cursor-pointer'>
                <BsCart4 className='text-xl' />
                {
                    cart.data.map(
                        (prod, i)=>{
                            return prod.pId == _id ?  <div key={i} className='absolute top-[-5px] right-[-5px] bg-red-600 text-[15px] flex justify-center items-center text-white rounded-full h-[15px] w-[15px]'>
                            {prod.qty}
                        </div> : ''
                        }
                    )
                }
                
            </div>
        </div>
    );
}

const Service = ({ services }) => {
    return (
        <div className='container mx-auto grid grid-cols-1 laptop:grid-cols-3 gap-20 my-10 p-2'>
            {
                services.map(
                    (ser, i) => {
                        return <div className='flex flex-col items-center' key={i}>
                            <img src={ser.img} alt="" />
                            <h3 className='my-4 font-semibold'>{ser.Name}</h3>
                            <p className='text-center text-gray-500'>{ser.desc}</p>
                        </div>
                    }
                )
            }
        </div>
    )
}

export default ProducBox;
export { Service };

function Stars({ yellow }) {
    let stars = [];
    for (var i = 1; i <= 5; i++) {
        if (i <= yellow) {
            stars.push(<FaStar key={i} color='#FFC600' />)
        } else {
            stars.push(<FaStar key={i} color='#C1C8CE' />)
        }
    }
    return <div className='flex justify-center'>{stars}</div>
}

export { Stars };