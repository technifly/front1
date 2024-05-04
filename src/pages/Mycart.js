
import React from 'react';
import { useCart, useDispatcher } from '../context/FoodContext';
import { useNavigate } from 'react-router-dom';


const Mycart = () => {
  const data = useCart();
  const dispatcher = useDispatcher();
  const navigate = useNavigate();

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3"> Cart is Empty</div>
      </div>
    )
  }
  let totalprice = data.reduce((total, food) => total + food.price, 0)

  const handladd = () => {
    navigate('/login');
  }
  const handlcheckout = async () => {

     let email = localStorage.getItem('emailuser');
    console.log(email);
     let resp = await fetch ('http://localhost:2001/foodorder/order',{
      method:'POST',
      headers:{
      'Content-Type':'application/json'
      },
      body: JSON.stringify({
        orderdata:data,
        email:email,
        order_date: new Date().toDateString()
      })
     }
    );

    console.log('Response as output::' , resp);
    if(resp.status=== 200){
      // dispatcher({type:'Drop'});
      // it is used to clear cart after adding in db
    }
  }

  return (
    <>
      <div>
        <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
          <table className="table ">
            <thead className='text-success fs-4'>
              <tr >
                <th scope='col'>Sr No</th>
                <th scope='col'>Name</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Option</th>
                <th scope='col'>Amount</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((f, index) => (
                  <tr >
                    <th scope='row'>{index + 1}</th>
                    <td>{f.name}</td>
                    <td>{f.qty}</td>
                    <td>{f.size}</td>
                    <td>{f.price}</td>
                    <td><button type='button' className='btn bg-danger' onClick={() => { dispatcher({ type: "Remove", index: index }) }} >Delete</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <div><h1 className='fs-2'>Total Price: {totalprice}rs</h1></div>
          <div>
            {
              localStorage.getItem('auth') ?
                <button className="btn bg-success mt-5" onClick={handlcheckout}>Check Out</button>
                :
                <button className="btn bg-danger mt-5" onClick={handladd}>Move to Cart</button>
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default Mycart;
