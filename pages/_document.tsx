import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>

        </Head>
        <body id="page-top">
          <Main />
          <NextScript />
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>
          <script src="/vendor/jquery/jquery.min.js"></script>
          <script src="/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
          <script src="/js/sb-admin-2.min.js"></script>
          <script src="/vendor/datatables2/jquery.dataTables.min.js"></script>
          <script src="/vendor/datatables2/dataTables.bootstrap4.min.js"></script>
          <script src="/vendor/bootstrap-select/js/bootstrap-select.min.js"></script>
          <script src="/vendor/bootstrap-select/js/i18n/defaults-en_US.min.js"></script>
        </body>
      </Html>
    )
  }
}
export default MyDocument
