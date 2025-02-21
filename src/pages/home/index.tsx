import styles from './home.module.css'
import { BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useState, FormEvent, useEffect } from 'react'


export interface CoinProps {
  id: string;
  name: string;
  symbol: string;
  priceUsd: string;
  vwap24Hr: string;
  changePercent24Hr: string;
  rank: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  explorer: string;
  formatedPrice?: string;
  formatedMarket?: string;
  formatedVolume?: string;
}

interface DataProps {
  data: CoinProps[]
}

export function Home() {
  const [input, setInput] = useState("")
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${offset}`)
        .then(response => response.json())
        .then((data: DataProps) => { // dentro dessa lista a gente vai receber mais uma propriedade chamada data que é uma lista e dentro dela tem todos os objetos
          const coinsData = data.data; // Para não criar sempre data.data, já criei uma const para isso

          const price = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          })

          const priceCompact = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact"
          })

          const formatedResult = coinsData.map((item) => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.priceUsd)), // Como devolve em string eu converto em Number
              formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
              formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr))
            }

            return formated;
          })

          const listCoins = [...coins, ...formatedResult] // Para manter as 10 moedas e colocar o resultado da api a+ na minha lista
          setCoins(listCoins)
          setLoading(false);
        })
    }

    getData()
  }, [offset]) //eslint-disable-line

  if (loading) {
    return (
      <div>
        <h4 className={styles.center}>Carregando detalhes...</h4>
      </div>
    )
  }



  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (input === '') return;

    navigate(`/detail/${input}`)

  }

  function handleGetMore() {
    if (offset === 0) {
      setOffset(10)
      return;
    }

    setOffset(offset + 10)
  }



  return (
    <main className={styles.container}>
      <form className={styles.form}
        onSubmit={handleSubmit} >
        <input type="text"
          placeholder='Digite o nome da moeda... Exemplo: Bitcoin'
          value={input}
          onChange={(e) => setInput(e.target.value)} />

        <button type="submit">
          <BsSearch size={30} color="FFF" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>

        <tbody id='tbody'>
          {coins.length > 0 && coins.map((item) => (
            <tr className={styles.tr} key={item.id}>
              <td className={styles.tdLabel} data-label="Moeda">
                <div className={styles.name}>
                  <img className={styles.logo} src={`https://assets.coincap.io/assets/icons/${item.symbol.toLocaleLowerCase()}@2x.png`} alt="logo cripto" />
                  <Link to={`/detail/${item.id}`}>
                    <span>{item.name} | {item.symbol}</span>
                  </Link>
                </div>
              </td>
              <td className={styles.tdLabel} data-label="Valor mercado">
                {item.formatedMarket}
              </td>
              <td className={styles.tdLabel} data-label="Preço">
                {item.formatedPrice}
              </td>
              <td className={styles.tdLabel} data-label="Volume">
                {item.formatedVolume}
              </td>
              <td className={Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Mudança 24h">
                <span>{Number(item.changePercent24Hr).toFixed(2)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className={styles.buttonMore}
        onClick={handleGetMore}>Carregar mais...</button>


    </main>
  )
}
