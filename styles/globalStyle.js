import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
    @font-face {
      font-family: "NeueMontrealRegular";
      font-display : block ;
      src: url("/fonts/neueRegular.otf");
    }
    @font-face {
      font-family: "NeueMontrealMedium";
      src: url("/fonts/neueMedium.otf");
    }
    @font-face {
      font-family: "BerlinBold";
      src: url("/fonts/berlinBold.ttf");
    }

    html.has-scroll-smooth {
      overflow: hidden; }

    html.has-scroll-dragging {
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none; }

    .has-scroll-smooth body {
      overflow: hidden; }

    .has-scroll-smooth [data-scroll-container] {
      min-height: 100vh; }

    [data-scroll-direction="horizontal"] [data-scroll-container] {
      white-space: nowrap;
      height: 100vh;
      display: inline-block;
      white-space: nowrap; }

    [data-scroll-direction="horizontal"] [data-scroll-section] {
      display: inline-block;
      vertical-align: top;
      white-space: nowrap;
      height: 100%; }

    .c-scrollbar {
      position: absolute;
      right: 0;
      top: 0;
      width: 11px;
      height: 100%;
      transform-origin: center right;
      transition: transform 0.3s, opacity 0.3s;
      opacity: 0; }
      .c-scrollbar:hover {
        transform: scaleX(1.45); }
      .c-scrollbar:hover, .has-scroll-scrolling .c-scrollbar, .has-scroll-dragging .c-scrollbar {
        opacity: 1; }
      [data-scroll-direction="horizontal"] .c-scrollbar {
        width: 100%;
        height: 10px;
        top: auto;
        bottom: 0;
        transform: scaleY(1); }
        [data-scroll-direction="horizontal"] .c-scrollbar:hover {
          transform: scaleY(1.3); }

  .c-scrollbar_thumb {
    position: absolute;
    top: 0;
    right: 0;
    background-color: black;
    opacity: 0.5;
    width: 7px;
    border-radius: 10px;
    margin: 2px;
    cursor: -webkit-grab;
    cursor: grab; }
    .has-scroll-dragging .c-scrollbar_thumb {
      cursor: -webkit-grabbing;
      cursor: grabbing; }
    [data-scroll-direction="horizontal"] .c-scrollbar_thumb {
      right: auto;
      bottom: 0; }

    /* CSS RESET */
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
    display: block;
    }
    body {
    line-height: 1;
    }
    ol,
    ul {
    list-style: none;
    }
    blockquote,
    q {
    quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
    content: "";
    content: none;
    }
    table {
    border-collapse: collapse;
    border-spacing: 0;
    }
    a {
      text-decoration : none;
    }
    button,
    input,
    optgroup,
    select,
    textarea,html input[type="button"],
    input[type="reset"],
    input[type="submit"],button[disabled],
    html input[disabled],button::-moz-focus-inner,
    input::-moz-focus-inner, input[type="checkbox"],
    input[type="radio"], input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button, input[type="search"], input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-decoration {
      border:none;
      background-image:none;
      background-color:transparent;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      outline : none;
    }

    .link-button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      text-decoration: none;
      display: inline;
      margin: 0;
      padding: 0;
    }

    .link-button:hover,
    .link-button:focus {
      text-decoration: none;
      outline : none;
    } 
    /* CUSTOM CSS */
    * {
      box-sizing: border-box;
      scrollbar-width: none;
      font-family : NeueMontrealRegular;
      /* background : ${({ theme }) => theme.colors.background}; */
      /* color : ${({ theme }) => theme.colors.textStandard}; */
      color : white;
    }

    html {
      overflow-x : hidden;
    }
    body {
      /* position : fixed;
      overflow: hidden; */
      padding: 0;
      margin: 0;
      background : ${({ theme }) => theme.colors.background};
    }



`
