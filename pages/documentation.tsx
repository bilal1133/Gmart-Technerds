import React from 'react';

export default class Documentation extends React.Component<any, any> {
    render() {
        return (<html lang="en">
            <head>
                <title>Gmarket Documentation</title>
                <meta charSet="utf-8"/>
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description" content=""/>
                <meta name="author" content=""/>
                <link rel="shortcut icon" href="favicon.ico"/>
                <link
                    href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800'
                    rel='stylesheet' type='text/css'/>
                <script defer src="/doc/assets/fontawesome/js/all.js"></script>
                <link rel="stylesheet" href="/doc/assets/plugins/bootstrap/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="/doc/assets/plugins/prism/prism.css"/>
                <link rel="stylesheet"
                      href="/doc/assets/plugins/lightbox/dist/ekko-lightbox.css"/>
                <link rel="stylesheet"
                      href="/doc/assets/plugins/elegant_font/css/style.css"/>
                <link id="theme-style" rel="stylesheet"
                      href="/doc/assets/css/styles.css"/>

            </head>

            <body className="body-pink">
            <div className="page-wrapper">
                <header id="header" className="header">
                    <div className="container">
                        <div className="branding">
                            <h1 className="logo">
                                <a href="index.html">
                                    <span className="text-success text-bold">Gmarket</span> - Flutter
                                    app with next js admin panel
                                </a>
                            </h1>
                        </div>
                    </div>
                </header>
                <div className="doc-wrapper">
                    <div className="container">
                        <div id="doc-header" className="doc-header text-center">
                            <h1 className="doc-title"><span aria-hidden="true"
                                                            className="icon icon_puzzle_alt"></span> Documentation</h1>
                            <div className="meta"><i className="far fa-clock"></i> Last updated: March 24th, 2021</div>
                        </div>
                        <div className="doc-body row">
                            <div className="doc-content col-md-9 col-12 order-1">
                                <div className="content-inner">
                                    <section id="panel_instroduction" className="doc-section">
                                        <h2 className="section-title">Admin panel Introduction</h2>
                                        <div className="section-block">
                                            <p>This project is written in next.js for backend, react.js for frontend and
                                                mysql for
                                                database.</p>
                                            <p>
                                                <b>Next.js</b> is an open-source React front-end development web
                                                framework.
                                                It
                                                enables functionality such as server-side rendering and generating
                                                static
                                                websites
                                                for React based web applications. It is a production-ready framework
                                                that
                                                allows
                                                developers to quickly create static and dynamic JAMstack websitesNext.js
                                                is
                                                widely
                                                used by many large companies and stands among top-recommended
                                                "toolchains"
                                                available
                                                when starting a new React app, all of which provide a layer of
                                                abstraction
                                                to aid in
                                                common tasks. Traditional React apps render all their content in the
                                                client-side
                                                browser. Next.js is used to extend this functionality by including
                                                applications
                                                rendered on the server side.
                                            </p>
                                            <p>
                                                <b>React</b> (also known as React.js or ReactJS) is an open-source,
                                                front-end,
                                                JavaScript library for building user interfaces or UI components. It is
                                                maintained
                                                by Facebook and a community of individual developers and companies.
                                                React
                                                can be
                                                used as a base in the development of single-page or mobile applications
                                            </p>
                                            <img src="/doc/assets/images/admin.png"
                                                 style={{width: '100%', marginTop: '20px', marginBottom: '20px'}}/>
                                        </div>
                                    </section>
                                    <section id="upload_on_server" className="doc-section">
                                        <h2 className="section-title">Upload on server</h2>
                                        <div className="section-block">
                                            <p>
                                                <ul className="list list-unstyled">
                                                    <li>1. Zip all files except (<i>node_modules</i> and <i>public</i>
                                                        folders)
                                                    </li>
                                                    <li>2. Upload the zip file to the server
                                                    </li>
                                                    <li>3. Unzip the uploaded file
                                                    </li>
                                                    <li>4. Run <code>gulp clean</code> and <code>gulp build</code> to
                                                        compile assets
                                                        files.
                                                        <img src="/doc/assets/images/code1.png"
                                                             style={{width: '100%', marginTop: '20px'}}/>
                                                        <img src="/doc/assets/images/code2.png"
                                                             style={{width: '100%', marginBottom: '20px'}}/>
                                                    </li>
                                                    <li>5. Run <code>npm install</code> to install node modules.
                                                        <img src="/doc/assets/images/code3.png"
                                                             style={{
                                                                 width: '100%',
                                                                 marginBottom: '20px',
                                                                 marginTop: '20px'
                                                             }}/></li>
                                                </ul>
                                            </p>
                                        </div>
                                    </section>
                                    <section id="create_db" className="doc-section">
                                        <h2 className="section-title">Create database</h2>
                                        <div className="section-block">
                                            <p>
                                                Follow the steps below to create the database
                                                <ul className="list list-unstyled">
                                                    <li>1. Create mysql database on your server</li>
                                                    <li>2. Enter username, password and database name
                                                        to <i>next.config.json</i> and <i>ormconfig.json</i>
                                                        files.
                                                        <img src="/doc/assets/images/file1.png"
                                                             style={{
                                                                 width: '100%',
                                                                 marginBottom: '20px',
                                                                 marginTop: '20px'
                                                             }}/>
                                                        <img src="/doc/assets/images/file2.png"
                                                             style={{
                                                                 width: '100%',
                                                                 marginBottom: '20px',
                                                                 marginTop: '20px'
                                                             }}/>
                                                    </li>
                                                    <li>3. Run <code>npm i ts-node</code> to install ts-node package.
                                                        This
                                                        packages
                                                        help you to
                                                        run typeorm commands.
                                                        <img src="/doc/assets/images/code4.png"
                                                             style={{
                                                                 width: '100%',
                                                                 marginBottom: '20px',
                                                                 marginTop: '20px'
                                                             }}/>
                                                    </li>
                                                    <li>4. Run <code>ts-node ./node_modules/typeorm/cli.js
                                                        migration:generate</code>
                                                        code to
                                                        create migration files.
                                                        <img src="/doc/assets/images/code5.png"
                                                             style={{
                                                                 width: '100%',
                                                                 marginBottom: '20px',
                                                                 marginTop: '20px'
                                                             }}/>
                                                    </li>
                                                    <li>5. Run <code>ts-node ./node_modules/typeorm/cli.js
                                                        migration:run</code> code to
                                                        create tables.
                                                        <img src="/doc/assets/images/code6.png"
                                                             style={{
                                                                 width: '100%',
                                                                 marginBottom: '20px',
                                                                 marginTop: '20px'
                                                             }}/>
                                                    </li>
                                                </ul>
                                            </p>
                                        </div>
                                    </section>
                                    <section id="run" className="doc-section">
                                        <h2 className="section-title">Run on server</h2>
                                        <div className="section-block">
                                            <p>
                                                To run the project on the server, first and foremost, install any
                                                third-party
                                                library (example:
                                                <i>pm2</i>)
                                                <ul className="list list-unstyled">
                                                    <li>1. Run <code>next build</code> to create build files.
                                                        <img src="/doc/assets/images/code7.png"
                                                             style={{
                                                                 width: '100%',
                                                                 marginBottom: '20px',
                                                                 marginTop: '20px'
                                                             }}/></li>
                                                    <li>2. Run <code>npm i pm2</code> to install pm2 packages. These
                                                        packages will help
                                                        you to run the files.
                                                        <img src="/doc/assets/images/code8.png"
                                                             style={{
                                                                 width: '100%',
                                                                 marginBottom: '20px',
                                                                 marginTop: '20px'
                                                             }}/>
                                                    </li>
                                                    <li>3. Run <code>pm2 create "next start" or "node
                                                        server.js"</code> to
                                                        run project
                                                        in your server.
                                                    </li>
                                                </ul>
                                            </p>
                                        </div>
                                    </section>

                                    <section id="app_intro" className="doc-section">
                                        <h2 className="section-title">App Introduction</h2>
                                        <div className="section-block">
                                            <p>
                                                The mobile app was developed with a flutter framework created by Google.
                                                Flutter is
                                                an open-source mobile application development kit used in the
                                                development of
                                                applications for Android and iOS

                                                <h4>Requirements</h4>

                                                To edit this project you must have Flutter and Dart installed and
                                                configured
                                                successfully on your device <a
                                                href="https://flutter.dev/docs/get-started/install"
                                                target="_blank" rel="noopener">Install flutter</a><br/>Set
                                                up your editor Install the <a
                                                href="https://flutter.dev/docs/get-started/editor?tab=androidstudio"
                                                target="_blank"
                                                rel="noopener">Flutter and Dart plugins</a>
                                            </p>
                                        </div>
                                    </section>
                                    <section id="config" className="doc-section">
                                        <h2 className="section-title">Configuration</h2>
                                        <div className="section-block">
                                            <p>
                                                Before running the app, you need to set up several configurations
                                                <ul className="list list-unstyled">
                                                    <li>1. Download and extract the project to any folder</li>
                                                    <li>2. Open project in preferred IDE</li>
                                                    <li>3. Open terminal in project folder and run <code>flutter pub
                                                        get</code> to
                                                        install all packages
                                                    </li>
                                                    <li>4. Open <i>/lib/src/config/global_config.dart</i> and replace
                                                        the URL with the
                                                        URL of your server
                                                        <img src="/doc/assets/images/file3.png"
                                                             style={{
                                                                 width: '100%',
                                                                 marginBottom: '20px',
                                                                 marginTop: '20px'
                                                             }}/>
                                                    </li>
                                                    <li>5. Create your own <a
                                                        href="https://cloud.google.com/maps-platform/"
                                                        target="_blank" rel="noopener">
                                                        Google Maps API key</a>
                                                    </li>
                                                    <li>6. Create the project in firebase and get the cloud messaging
                                                        key.
                                                    </li>
                                                </ul>
                                            </p>
                                        </div>
                                    </section>
                                    <section id="android_config" className="doc-section">
                                        <h2 className="section-title">Android configuration</h2>
                                        <div className="section-block">
                                            <ul className="list list-unstyled">
                                                <li>1. Create and download your <a
                                                    href="https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.space.trim=1&foreground.space.pad=0.25&foreColor=rgba(96%2C%20125%2C%20139%2C%200)&backColor=rgb(68%2C%20138%2C%20255)&crop=0&backgroundShape=square&effects=none&name=ic_launcher">app
                                                    icon</a>
                                                </li>
                                                <li>2. After downloading, replace the icons folder with the following
                                                    folders:
                                                    <ol>
                                                        <li>
                                                            <i>/mipmap-hdpi</i> in <i>/android/app/src/main/res/</i> folder
                                                        </li>
                                                        <li>
                                                            <i>/mipmap-mdpi</i> in <i>/android/app/src/main/res/</i> folder
                                                        </li>
                                                        <li>
                                                            <i>/mipmap-xhdpi</i> in <i>/android/app/src/main/res/</i> folder
                                                        </li>
                                                        <li>
                                                            <i>/mipmap-xxhdpi</i> in <i>/android/app/src/main/res/</i> folder
                                                        </li>
                                                        <li>
                                                            <i>/mipmap-xxxhdpi</i> in <i>/android/app/src/main/res/</i> folder
                                                        </li>
                                                    </ol>
                                                    <img src="/doc/assets/images/android.png"
                                                         style={{
                                                             width: '100%',
                                                             marginBottom: '20px',
                                                             marginTop: '20px'
                                                         }}/>
                                                </li>
                                                <li>3. Open <i>/android/app/build.gradle</i> and change the package name
                                                </li>
                                                <li>4. Open all <u>AndroidManifest.xml</u> files
                                                    from <i>/android/app/src/main/</i>,
                                                    <i>/android/app/src/profil/</i>, <i>

                                                        /android/app/src/debug/</i> folders and set package name and
                                                    application name.
                                                </li>
                                                <li>5. Open <i>/android/app/src/main/kotlin/-- Package name
                                                    --/MainActivity.kt</i>
                                                    and change the package name
                                                </li>
                                                <li>6. Follow <a
                                                    href="https://pub.dev/packages/flutter_google_maps"> Flutter google
                                                    map documentation</a>to configure app for android
                                                </li>
                                                <li>7. Follow <a
                                                    href="https://firebase.flutter.dev/docs/messaging/overview"> Push
                                                    notification documentation</a> to configure push notification for
                                                    android
                                                </li>
                                            </ul>
                                        </div>
                                    </section>
                                    <section id="ios_config" className="doc-section">
                                        <h2 className="section-title">Ios configuration</h2>
                                        <div className="section-block">
                                            <ul>
                                                <li>1. Create icons with following sizes
                                                    <ol>
                                                        <li>40x40</li>
                                                        <li>58x58</li>
                                                        <li>60x60</li>
                                                        <li>80x80</li>
                                                        <li>87x87</li>
                                                        <li>120x120</li>
                                                        <li>180x180</li>
                                                    </ol>
                                                </li>
                                                <li>2. Click Assets.xcassets in the Project navigator and choose
                                                    AppIcon.
                                                    This will
                                                    give you an empty app icon set.
                                                    <img src="/doc/assets/images/ios_icon.png"
                                                         style={{
                                                             width: '100%',
                                                             marginBottom: '20px',
                                                             marginTop: '20px'
                                                         }}/><br/>
                                                    Drag the right-sized image (in .png format) from Finder onto every
                                                    blank in the
                                                    app settings. The app icon should be all set up by this moment.
                                                    <img src="/doc/assets/images/banof.png"
                                                         style={{
                                                             width: '100%',
                                                             marginBottom: '20px',
                                                             marginTop: '20px'
                                                         }}/>
                                                </li>
                                                <li>3. Follow <a
                                                    href="https://pub.dev/packages/flutter_google_maps"> Flutter google
                                                    map documentation</a> to configure app for ios
                                                </li>
                                                <li>4. Follow <a
                                                    href="https://firebase.flutter.dev/docs/messaging/overview"> Push
                                                    notification documentation</a> to configure push notification for
                                                    ios
                                                </li>
                                            </ul>
                                        </div>
                                    </section>
                                    <section id="config" className="doc-section">
                                        <h2 className="section-title">Run & Build</h2>
                                        <div className="section-block">
                                            <p>
                                                If you want to run the app on an emulator, run <code>flutter
                                                run</code><br/>
                                                If you want to build apk, follow the steps below:
                                                <img src="/doc/assets/images/code9.png"
                                                     style={{
                                                         width: '100%',
                                                         marginBottom: '20px',
                                                         marginTop: '20px'
                                                     }}/>
                                                <ul className="list list-unstyled">
                                                    <li>To create apk file, run <code>flutter build apk --release</code>
                                                    </li>
                                                    <li>To generate an app bundle, run <code>flutter build appbundle
                                                        --target-platform
                                                        android-arm,android-arm64,android-x64</code></li>
                                                    <li>To split the APKs per ABI, run <code>flutter build apk
                                                        --target-platform
                                                        android-arm,android-arm64,android-x64 --split-per-abi</code>
                                                    </li>
                                                    <li>To install your application on your connected device run <code>flutter
                                                        install</code></li>
                                                    <li>
                                                        If you want to upload your application to Google Play you must
                                                        sign it before
                                                        uploading by generating a signing key by running the following
                                                        command:
                                                        <br/><code>keytool -genkey -v -keystore android/app/key.jks
                                                        -keyalg RSA -keysize
                                                        2048 -validity 10000 -alias key</code>
                                                        Open <i>/android/key.properties</i> and edit the following
                                                        attributes:
                                                        <br/>
                                                        <img src="/doc/assets/images/file4.png"
                                                             style={{
                                                                 width: '100%',
                                                                 marginBottom: '20px',
                                                                 marginTop: '20px'
                                                             }}/>
                                                    </li>
                                                    <li>After editing, re-build your application</li>
                                                </ul>
                                            </p>
                                        </div>
                                    </section>
                                </div>
                            </div>
                            <div className="doc-sidebar col-md-3 col-12 order-0 d-none d-md-flex">
                                <div id="doc-nav" className="doc-nav">
                                    <nav id="doc-menu" className="nav doc-menu flex-column sticky">
                                        <a className="nav-link scrollto" href="#admin-components">Next js admin
                                            panel</a>
                                        <nav className="doc-sub-menu nav flex-column">
                                            <a className="nav-link scrollto"
                                               href="#panel_instroduction">Introduction</a>
                                            <a className="nav-link scrollto" href="#upload_on_server">Upload on
                                                server</a>
                                            <a className="nav-link scrollto" href="#create_db">Create database</a>
                                            <a className="nav-link scrollto" href="#run">Run on server</a>
                                        </nav>
                                        <a className="nav-link scrollto" href="#app-components">App</a>
                                        <nav className="doc-sub-menu nav flex-column">
                                            <a className="nav-link scrollto" href="#app_intro">Introduction</a>
                                            <a className="nav-link scrollto" href="#config">Configuration</a>
                                            <a className="nav-link scrollto" href="#android_config">Android
                                                configuration</a>
                                            <a className="nav-link scrollto" href="#ios_config">Ios configuration</a>
                                            <a className="nav-link scrollto" href="#build">Run & Build</a>
                                        </nav>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <script type="text/javascript" src="/doc/assets/plugins/jquery-3.4.1.min.js"></script>
            <script type="text/javascript" src="/doc/assets/plugins/bootstrap/js/bootstrap.min.js"></script>
            <script type="text/javascript" src="/doc/assets/plugins/prism/prism.js"></script>
            <script type="text/javascript" src="/doc/assets/plugins/jquery-scrollTo/jquery.scrollTo.min.js"></script>
            <script type="text/javascript" src="/doc/assets/plugins/lightbox/dist/ekko-lightbox.min.js"></script>
            <script type="text/javascript" src="/doc/assets/plugins/stickyfill/dist/stickyfill.min.js"></script>
            <script type="text/javascript" src="/doc/assets/js/main.js"></script>

            </body>
            </html>
        );
    }
}