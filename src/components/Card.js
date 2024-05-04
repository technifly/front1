import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatcher } from '../context/FoodContext';

const Card = ({ demo, Options }) => {
    const priceref = useRef();
    const user = useCart();
    const dispatcher = useDispatcher();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const { name, img } = demo;
    let options = Options;
    let priceOption = Object.keys(options);

    let finalprice = qty * parseInt(options[size]);

    const handlAddtocart = async () => {
        let food = [];

        for (const item of user) {
            if (item.id === demo._id) {
                food = item;

                break;
            }
        }

        if (food != []) {
            if (food.size === size) {
                await dispatcher({ type: 'Update', id: demo._id, qty: qty, price: finalprice });
                return;
            }
            else if (food.size !== size) {
                await dispatcher({ type: 'Add', id: demo._id, name: demo.name, price: finalprice, qty: qty, size: size });
                return ;
            }
            return ;
        }
        await dispatcher({ type: 'Add', id: demo._id, name: demo.name, price: finalprice, qty: qty, size: size })

    };

    useEffect(() => {
        setSize(priceref.current.value);

    }, [])

    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={img} className="card-img-top p-4" alt="..." style={{ height: "180px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <div className="container w-100 ">
                        <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(5), (e, i) => {
                                return (
                                    <option ket={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        <select className="m-2 h-100 bg-success rounded" ref={priceref} onChange={(e) => setSize(e.target.value)}>
                            {
                                priceOption.map((d) => {
                                    return <option key={d} value={d}>{d}</option>
                                })
                            }

                        </select>
                        <div className='d-inline h-100 fs-5'> rs-{finalprice}</div>
                    </div>
                    <hr />
                    <button className={`btn btn-success justify-content-center ms-2`} onClick={handlAddtocart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Card;
