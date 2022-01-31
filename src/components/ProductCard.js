import './styles.css';
import product from '../assets/prod.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/fontawesome-free-solid';
import { useEffect, useState } from 'react';
function ProductCard({ prod, cart, setCart }) {
  const makeCart = (op, pname) => {
    let crt = [...cart];
    let tmp;
    for (var i = 0; i < crt.length; i++) {
      if (crt[i].prod_name == pname) {
        tmp = crt[i].qty;
        break;
      }
    }
    if (op == 'add') {
      tmp = tmp + 1;
      setQty(tmp);
    } else {
      tmp = tmp - 1;
      setQty(tmp);
    }
    for (var i = 0; i < crt.length; i++) {
      if (crt[i].prod_name == pname) {
        crt[i].qty = tmp;
        setCart(crt);
        break;
      }
    }
  };
  const getCurrentQty = (pname) => {
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].prod_name == pname) return cart[i].qty;
    }
  };
  const [qty, setQty] = useState(0);
  useEffect(() => {}, [qty]);
  return (
    <div className="card-prod">
      <div
        style={{
          width: '15%',
          height: '20%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          src={product}
          style={{ width: '50%', height: '30%', objectFit: 'contain' }}
        ></img>
      </div>
      <div style={{ width: '40%' }}>
        <div>{prod.title}</div>
        <div className="keyword">{prod.desc}</div>
      </div>
      <div
        style={{
          width: '30%',
          display: 'flex',
          flexDirection: 'row',
          marginLeft: '2%',
        }}
      >
        <div className="clickable" onClick={() => makeCart('add', prod.title)}>
          <FontAwesomeIcon icon={faPlus} size={'sm'} />
        </div>
        <div className="sm-box">{getCurrentQty(prod.title)}</div>
        <div
          className="clickable"
          onClick={() => {
            if (qty > 0) makeCart('sub', prod.title);
          }}
        >
          <FontAwesomeIcon icon={faMinus} size={'sm'} />
        </div>
      </div>
      <div style={{ width: '10%', fontSize: '150%' }}>
        {prod.currency}
        {prod.price}
      </div>
    </div>
  );
}

export default ProductCard;
