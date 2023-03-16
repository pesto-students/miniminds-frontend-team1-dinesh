import Head from "next/head";
import Script from "next/script";

const Seo = () => {
  return (
    <>
      <Head>
        <title>Linkyviz</title>
        <meta
          name="description"
          content="Are you tired of trying to make sense of your website's internal linking structure on a spreadsheet or by manually navigating through pages?"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://res.cloudinary.com/dh687c0pq/image/upload/v1674394457/linkyviz_fab_icon_nvkhwb.png"
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
