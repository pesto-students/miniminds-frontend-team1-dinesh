import Head from "next/head";
import Script from "next/script";

const Seo = () => {
  return (
    <>
      <Head>
        <title>Miniminds</title>
        <meta
          name="description"
          content="Miniminds is a platform that provides memory games for small children. The games are designed to help children improve their memory and cognitive skills. The platform allows children to play memory games with other children, making it a fun and interactive way for them to learn"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://res.cloudinary.com/dh687c0pq/image/upload/v1677583032/miniminds_1_kuwzry.png"
        />
      </Head>
      <Script
        id="show-banner"
        type="text/javascript"
        strategy="afterInteractive"
      >
        {`    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "g5ymmqq2jg");`}
      </Script>
    </>
  );
};
export default Seo;
