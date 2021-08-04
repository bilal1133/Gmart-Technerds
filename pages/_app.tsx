import '../public/vendor/fontawesome-free/css/all.min.css'
import '../public/css/sb-admin-2.min.css'
import '../public/css/custom.css'
import '../public/vendor/datatables2/dataTables.bootstrap4.min.css'
import "../public/vendor/fontawesome-free/css/all.min.css"
import "../public/vendor/bootstrap-select/css/bootstrap-select.min.css"
import React from 'react';

export default function MyApp({Component, pageProps}) {
    return (
        <div>
            {typeof window === 'undefined' ? null : <Component {...pageProps} />}
        </div>
    );
}