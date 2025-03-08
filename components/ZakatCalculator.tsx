"use client"; // Ensures this component is only executed on the client side

import { useState, useEffect } from "react";
import axios from "axios";

const ZakatCalculator = () => {
  const [assets, setAssets] = useState<string>("");
  const [liabilities, setLiabilities] = useState<string>("");
  const [inputCurrency, setInputCurrency] = useState<string>("USD");
  const [outputCurrency, setOutputCurrency] = useState<string>("USD");
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [nisab, setNisab] = useState<{ USD: number; BDT: number }>({
    USD: 5000,
    BDT: 550000,
  });
  const [zakatUSD, setZakatUSD] = useState<number>(0);
  const [zakatBDT, setZakatBDT] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Exchange Rate ONLY on Client Side
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        setExchangeRate(response.data.rates.BDT);
      } catch (error) {
        console.error("Error fetching exchange rate", error);
        setError("Failed to fetch exchange rate.");
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, []);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const calculateZakat = () => {
    const netWealth =
      (parseFloat(assets) || 0) - (parseFloat(liabilities) || 0);

    const netWealthUSD =
      inputCurrency === "USD" ? netWealth : netWealth / exchangeRate;
    const netWealthBDT =
      inputCurrency === "USD" ? netWealth * exchangeRate : netWealth;

    if (netWealthUSD >= nisab.USD) {
      setZakatUSD(Number((netWealthUSD * 0.025).toFixed(2)));
      setZakatBDT(Number((netWealthBDT * 0.025).toFixed(2)));
    } else {
      setZakatUSD(0);
      setZakatBDT(0);
    }
  };

  return (
    <div className="p-6 bg-white my-20 shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl text-center font-semibold mb-4">
        Zakat Calculator
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading exchange rates...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <div className="mb-3">
            <label className="block text-sm font-medium">Currency</label>
            <select
              value={inputCurrency}
              onChange={(e) => setInputCurrency(e.target.value)}
              className="mt-2 w-full p-2 border rounded-md"
            >
              <option value="USD">USD</option>
              <option value="BDT">BDT</option>
            </select>

            <label className="block text-sm font-medium">
              Zakatable Assets
            </label>
            <input
              type="text"
              value={assets}
              onChange={(e) => setAssets(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Total Assets"
            />

            <label className="block text-sm font-medium">Liabilities</label>
            <input
              type="text"
              value={liabilities}
              onChange={(e) => setLiabilities(e.target.value)}
              className="w-full p-2 border rounded-md mt-2"
              placeholder="Total Liabilities"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium">
              Show Calculation In
            </label>
            <select
              value={outputCurrency}
              onChange={(e) => setOutputCurrency(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="USD">USD</option>
              <option value="BDT">BDT</option>
            </select>
          </div>

          <button
            onClick={calculateZakat}
            className="w-full bg-primary text-white p-2 rounded-md mt-3"
          >
            Calculate Zakat
          </button>

          {zakatUSD > 0 ? (
            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
              <p>Your Zakat Due:</p>
              {outputCurrency === "USD" ? (
                <p>{formatCurrency(zakatUSD, "USD")}</p>
              ) : (
                <p>{formatCurrency(zakatBDT, "BDT")}</p>
              )}
            </div>
          ) : (
            <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 rounded-md">
              <p>No Zakat is due.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ZakatCalculator;
