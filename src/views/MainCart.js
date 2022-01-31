import { useEffect, useState } from 'react';
import CartHeader from '../components/CartHeader';
import ProductCard from '../components/ProductCard';

function MainCart() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(0);
  console.log('PARSE::', JSON.stringify(localStorage.getItem('cart')));
  const [cart, setCart] = useState(
    localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
  );
  const apiData = JSON.parse(localStorage.getItem('apidata'));
  const getDatas = () => {
    if (apiData) {
      setData(apiData);
    } else {
      fetch('https://dnc0cmt2n557n.cloudfront.net/products.json').then(
        async (res) => {
          setFlag(1);
          let datas = await res.json();
          console.log('Datas::', datas);
          if (datas.products.length > 0) {
            let c = datas.products.map((item) => {
              return { prod_name: item.title, qty: 0, price: item.price };
            });
            console.log('Cart::', JSON.stringify(c));
            localStorage.setItem('cart', JSON.stringify(c));
            setCart(c);
          }
          localStorage.setItem('apidata', JSON.stringify(datas.products));
          setData(datas.products);
        }
      );
    }
  };
  useEffect(() => {
    if (flag == 0) getDatas();
    console.log('Cart is::', JSON.stringify(cart));
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [data, flag, cart]);
  return (
    <>
      <div style={{ height: '50%' }}>
        <CartHeader cart={cart} setCart={setCart} />
      </div>
      {data.map((item, index) => (
        <div style={{ height: '20%', marginTop: '3%' }}>
          <center>
            {' '}
            <ProductCard prod={item} cart={cart} setCart={setCart} />
          </center>
        </div>
      ))}
    </>
  );
}

export default MainCart;
