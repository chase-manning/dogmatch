import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --bg: white;
        --blue-bg: #DAF0FF;
        --main: #1D5D9B;
        --sub: #75C2F6;
        --light: #ACDAFA;
        --primary: #F4D160;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-size: 8px;
    }

    div {
        color: var(--main);
        font-family: "Kumbh Sans", sans-serif;
        font-optical-sizing: auto;
    }

    button {
        background: none;
        border: none;
        outline: none;
    }
    
    input {
        border: none;
        outline: none;
        background: none;
        -moz-appearance: textfield;
        appearance: textfield;

        // Remove arrows from number input
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
            display: none;
        }
    }

    a {
        text-decoration: none;
    }
`;

const GlobalStyles = (): JSX.Element => {
  return <GlobalStyle />;
};

export default GlobalStyles;
