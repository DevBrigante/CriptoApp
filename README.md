# DevCurrency

O **DevCurrency** é uma aplicação web que permite aos usuários visualizar dados em tempo real de diversas criptomoedas, como preço, volume de mercado, valor total e mudanças em 24 horas. O objetivo é oferecer uma experiência de consulta rápida e precisa em uma interface responsiva e intuitiva.

---

## 🌐 Acessar Versão Online

**[Acesse a aplicação ao vivo clicando aqui](cripto-app.vercel.app)**

---

## 🚀 Recursos e Tecnologias

- **React**: Biblioteca JavaScript para criar interfaces dinâmicas e responsivas.
- **TypeScript**: Garantia de segurança no código com tipagem estática.
- **CSS Modules**: Modularização do CSS para estilização isolada dos componentes.
- **Hooks do React**: Utilização de `useState` e `useEffect` para gerenciamento de estado e efeitos colaterais.
- **Fetch API**: Consumo de dados dinâmicos da API de criptomoedas.
- **Roteamento**: Gerenciamento de rotas para navegação suave na aplicação.
- **Interface Responsiva**: Design adaptado para dispositivos móveis e desktop.

---

## 🔗 Integração com API

A aplicação consome uma API externa para obter os dados mais recentes das criptomoedas. Entre as informações exibidas estão:

- Nome e símbolo da criptomoeda.
- Valor de mercado total.
- Preço atual.
- Volume negociado em 24 horas.
- Mudança percentual no preço nas últimas 24 horas.

### Exemplos de Resposta da API:

```json
{
  "id": "bitcoin",
  "symbol": "btc",
  "market_cap": "$2T",
  "price": "$98,915.64",
  "volume_24h": "$17B",
  "change_24h": "-2.59%"
}
