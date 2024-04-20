import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/breadcrumbs';
import { CatalogAsideFilter } from '../../components/catalog/catalog-aside-filter';
import { CatalogBanner } from '../../components/catalog/catalog-banner';
import { CatalogProductsList } from '../../components/catalog/catalog-products-list';
import { CatalogSort } from '../../components/catalog/catalog-sort';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header/header';
import { useEffect } from 'react';

export default function CatalogPage ():JSX.Element {

  const [, setSearchParams] = useSearchParams();
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if ((entry as {type?: string}).type as string === 'reload') {
          setSearchParams();
        }
      });
    });

    observer.observe({ type: 'navigation', buffered: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <CatalogBanner/>
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <Breadcrumbs/>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <CatalogAsideFilter/>
                </div>
                <div className="catalog__content">
                  <CatalogSort/>
                  <CatalogProductsList/>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

