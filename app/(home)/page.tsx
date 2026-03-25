import getCoins from "../utils/getCoins";
import { MdArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number | null;
}

export default async function HomePage() {
  const coins: Coin[] = await getCoins();

  return (
    <div className="w-full bg-[var(--brand-gray)] py-[30px]">
      <div className="max-w-[1440px] mx-auto px-[72px]">
        <div className="text-[var(--brand-purple)] mb-9">
          Select the currency to view statistics
        </div>

        <div className="flex gap-4 mt-4 overflow-x-auto overflow-y-hidden whitespace-nowrap [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {coins.map((coin) => {
            // double check if null, if so set to 0
            const change = coin.price_change_percentage_24h ?? 0;
            const isPositive = change > 0;

            return (
              <div
                key={coin.id}
                className="w-[252px] h-[78px] flex flex-row items-center p-2 rounded bg-[var(--brand-white)] cursor-pointer flex-shrink-0"
              >
                <div className="flex">
                  <img src={coin.image} className="w-7 h-7" alt={coin.name} />
                </div>

                <div className="flex flex-col justify-between ml-4 gap-2 flex-1">
                  <div className="font-bold font-sm">
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </div>

                  <div className="flex items-center gap-2 font-sm">
                    <span>{coin.current_price} USD</span>

                    <span
                      className={`flex items-center gap-1 ${
                        isPositive
                          ? "text-[var(--brand-green)]"
                          : "text-[var(--brand-red)]"
                      }`}
                    >
                      {isPositive ? (
                        <MdArrowDropUp className="h-5 w-5 flex-shrink-0" />
                      ) : (
                        <MdOutlineArrowDropDown className="h-5 w-5 flex-shrink-0" />
                      )}
                      <span className="leading-none">{change.toFixed(2)}%</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
