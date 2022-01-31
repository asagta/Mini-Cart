import {
  faCaretDown,
  faCartPlus,
  faTimes,
} from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import './styles.css';

function CartHeader({ cart, setCart }) {
  const [open, setOpen] = useState(false);
  const qtyCalc = () => {
    let qty = 0;
    let price = 0;
    console.log('QTT::', JSON.stringify(cart));
    cart.map((item) => {
      qty = qty + item.qty;
      console.log('Item is agar::', item);
      price = price + parseInt(item.price) * item.qty;
    });
    return {
      _qty: qty,
      _price: price,
    };
  };
  const deleteItem = (pname) => {
    let crt = [...cart];
    for (var i = 0; i < crt.length; i++) {
      if (crt[i].prod_name == pname) {
        crt[i].qty = 0;
        setCart(crt);
        break;
      }
    }
  };
  return (
    <div className="header-cart">
      <div className="header-amt">
        <div>${qtyCalc()._price}</div>
        <div style={{ fontSize: '70%' }}>
          {qtyCalc()._qty} Items
          <span style={{ marginLeft: '10%' }}>
            <FontAwesomeIcon icon={faCaretDown} size={'lg'} />
          </span>
        </div>
      </div>

      <div style={{ width: '20%' }} onClick={() => setOpen(!open)}>
        <FontAwesomeIcon
          icon={faCartPlus}
          size={'2x'}
          color={'gray'}
          className="clickable"
        />
      </div>
      {open && (
        <div className="header-fixed">
          {cart.map((item, index) => {
            if (item.qty > 0)
              return (
                <div className="header-prod">
                  <div style={{ width: '20%' }}>
                    <FontAwesomeIcon
                      icon={faTimes}
                      size={'1x'}
                      color={'gray'}
                      className="clickable"
                      onClick={() => deleteItem(item.prod_name)}
                    />
                  </div>
                  <div style={{ width: '50%' }}>
                    <div>{item.prod_name}</div>
                    <br />
                    <div>
                      <b>${item.price}</b>
                    </div>
                  </div>
                  <div style={{ width: '30%' }}>Qty {item.qty}</div>
                </div>
              );
          })}
        </div>
      )}
    </div>
  );
}

export default CartHeader;
