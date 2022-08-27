import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import ResultBox from './ResultBox';


describe('Component ResultBox', () => {
	it('should render without crashing', () => {
	    render(< ResultBox amount={100} from='PLN' to='USD' />);
    });

  it('should render proper info about conversion PLN -> USD', () => {
    const amounts = [100, 50, 200, 350];

    for(let amount of amounts){
      render(< ResultBox amount={amount} from='PLN' to='USD' />);
      const resultBox = screen.getByTestId('resultDiv');
      expect(resultBox).toHaveTextContent(`PLN ${amount}.00 = $${Math.round((amount/3.5)*100)/100}`);
      cleanup();
    }
  });

  it('should render proper info about conversion USD -> PLN', () => {
    const amounts = [90, 80, 10, 100];

    for (let amount of amounts){
      render(< ResultBox amount={amount} from='USD' to='PLN' />);
      const resultBox = screen.getByTestId('resultDiv');
      expect(resultBox).toHaveTextContent(`$${amount}.00 = PLN ${amount*3.5}.00`);
      cleanup();
    }
  });

  it('should render proper info when same currency is selected in both options', () => {
    const currencies = ['USD', 'PLN'];

    for(let currency of currencies){
      render(< ResultBox amount={2137} from={currency} to={currency} />);
      const resultBox = screen.getByTestId('resultDiv');
      if(currency === 'USD'){
          expect(resultBox).toHaveTextContent('$2,137.00 = $2,137.00');
      } else {
        expect(resultBox).toHaveTextContent('PLN 2,137.00 = PLN 2,137.00');
      }
      cleanup();
    }
  });

  it('should render proper info when amount has negative value', () => {
    render(< ResultBox amount={-100} from='PLN' to='USD' />);
      const resultBox = screen.getByTestId('resultDiv');
    expect(resultBox).toHaveTextContent('Wrong value...');
  });
});


