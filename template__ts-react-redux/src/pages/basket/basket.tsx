import BasketList from '../../components/basket/basket-list';
import BasketPromo from '../../components/basket/basket-promo';
import BasketSummaryOrder from '../../components/basket/basket-summary-order';
import { Breadcrumbs } from '../../components/breadcrumbs';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header/header';

export default function BasketPage ():JSX.Element {

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <Breadcrumbs/>
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <BasketList/>
              <div className="basket__summary">
                <BasketPromo/>
                <BasketSummaryOrder/>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

