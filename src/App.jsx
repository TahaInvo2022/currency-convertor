import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('pkr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);
  console.log("🚀 ~ App ~ options:", options)

  const swap = () => {
    setTo((prevTo) => {
      setFrom((prevFrom) => {
        // Swap `from` and `to` values
        setTo(prevFrom);
        setFrom(prevTo);

        // Return new `to` value which is `prevFrom`
        return prevFrom;
      });

      // Return new `to` value which is `prevTo`
      return prevTo;
    });

    setConvertedAmount((prevConvertedAmount) => {
      setAmount((prevAmount) => {
        // Swap `amount` and `convertedAmount` values
        setConvertedAmount(prevAmount);
        setAmount(prevConvertedAmount);

        // Return new `amount` value which is `prevConvertedAmount`
        return prevConvertedAmount;
      });

      // Return new `convertedAmount` value which is `prevConvertedAmount`
      return prevConvertedAmount;
    });
  };


  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  }


  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/10149287/pexels-photo-10149287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert()
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                onAmountChange={(amount) => setConvertedAmount(amount)}
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App