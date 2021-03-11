import { Link } from "./Link";
import { box } from "../style/zen";
import paypal from "../img/paypal.png";
import mastercard from "../img/mastercard.png";
import visa from "../img/visa.png";
const footCard = {
  ...box,
  flexDirection:"column",
  width:"33%", 
  justifyContent:"left" 
};

export const Foot = () => (
  <div style={box}>
    <div style={footCard}>
      Information
      <Link address="/about" name="about" />
      <Link address="/catalog" name="catalogue" />
      <Link address="/contacts" name="contacts" />
    </div>
    <div style={footCard}>
      Payment is available with:
      <div style={box}>
        <img src={paypal} alt="paypal" />
        <img src={mastercard} alt="mastercard" />
        <img src={visa} alt="visa" />
        <img src={visa} alt="visa" />
        <img src={visa} alt="visa" />
        <img src={visa} alt="visa" />
      </div>
      <div>
        2009-2019@Bosanoga.ru - модный интернет-магазин<br/>
        обуви и аксессуаров. Все права защищены.<br/>
        Доставка по всей России.<br/>
      </div>
    </div>
    <div style={footCard}>
      Contacts:
      <div>
        +7 495 79 03 5 03 
      </div>
      <div>
        Everyday from 09-00 to 21-00
      </div>
      <div>
        office@bosanoga.ru
      </div>
      <div>
        <img src={visa} alt="visa" />
        <img src={visa} alt="visa" />
      </div>
      
    </div>
  </div>
);
