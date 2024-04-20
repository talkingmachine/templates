import { Link } from 'react-router-dom';
import { Footer } from '../../components/footer';
import { Header } from '../../components/header/header';
import { RouterPaths } from '../../consts/router-paths';

export function NotFoundPage ():JSX.Element {
  return (
    <div className="wrapper">
      <Header/>
      <main>
        <div className="container">
          <h3 className="title title--h3">404 Not Found</h3>
          <Link to={RouterPaths.catalog()}>
            <u>Вернуться на главную</u>
          </Link>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

