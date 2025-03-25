import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>PrizeDraw.vip</title>
          <meta name="description" content="PrizeDraw.vip: Raffle - A fun and fair way to win prizes!" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Exo:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

        </Head>
        <body>
          <div id="sparticlesContainer" className='' ></div>
          <Main />
          <NextScript />
        </body>
      </Html >
    )
  }
}

export default MyDocument;