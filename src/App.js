import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [output, setOutput] = useState("");
  const [isLoding, setIsLoding] = useState(false);

  useEffect(
    function () {
      async function convert() {
        setIsLoding(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );
        const data = await res.json();
        setOutput(data.rates[to]);
        setIsLoding(false);
      }
      if (from === to) return setOutput(amount);
      convert();
    },
    [amount, from, to]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoding}
      />
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={isLoding}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={isLoding}
      >
        <option value="INR">INR</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
      </select>
      <p>
        {output} {to}
      </p>
    </div>
  );
}
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
