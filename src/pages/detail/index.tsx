import {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CoinProps } from '../home'
import styles from './detail.module.css'


interface ResponseDataProps{
  data: CoinProps
}

interface ErrorDataProps{
  error: string;
}

type DataProps = ResponseDataProps | ErrorDataProps

export function Detail() {

  const [coin, setCoin] = useState<CoinProps>();
  const[loading, setLoading] = useState(true);
  const { cripto } = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    async function getCoin(){
      try{
        fetch(`https://api.coincap.io/v2/assets/${cripto}`)
        .then(response => response.json())
        .then((data: DataProps) =>{
          
          if("error" in data){
            navigate("/", {replace: true})
            return;
          }

          const reformated = data.data

          const price = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          })
    
          const priceCompact = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            notation: "compact"
          })


          const resultData = {
            ...data.data,
            formatedPrice: price.format(Number(reformated.priceUsd)),
            formatedMarket: priceCompact.format(Number(reformated.marketCapUsd)),
            formatedVolume: priceCompact.format(Number(reformated.volumeUsd24Hr))
          }

          setCoin(resultData);
          setLoading(false)

        })
      }
      
      catch(error){
        console.log(error)
        navigate("/", {replace: true})
      }
    }

    getCoin();
  }, [cripto, navigate])

  if(loading || !coin){
    return(
      <div className={styles.container}>
        <h4 className={styles.center}>Carregando detalhes...</h4>
      </div>
    )
  }

    return(
      <div className={styles.container}>
        <h1 className={styles.center}>{coin?.name}</h1>
        <h1 className={styles.center}>{coin?.symbol}</h1>

        <section className={styles.content}>
          <img src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLocaleLowerCase()}@2x.png`} alt="logo da moeda"
          className={styles.logo} />
          <h1>{coin?.name} | {coin?.symbol} </h1>

          <p>
            <strong>Preço: </strong>
            {coin?.formatedPrice}
          </p>
          <a>
            <strong>Mercado: </strong>
            {coin?.formatedMarket}
          </a>
          <a>
            <strong>Volume: </strong>
            {coin?.formatedVolume}
          </a>
          <a>
            <strong>Mudança 24h: </strong>
            <span className=
            {Number(coin.changePercent24Hr) > 0 ? styles.profit : styles.loss}>
            {Number(coin.changePercent24Hr).toFixed(2)}</span>
          </a>
        </section>
      </div>
    )
  }
  