import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --bg: white;
        --bg-blue: #DAF0FF;
        --bg-image: #E6E6E6;
        --main: #1D5D9B;
        --sub: #75C2F6;
        --light: #ACDAFA;
        --primary: #F4D160;

        --blue: #0577E5;
        --green: #1D9B34;
        --yellow: #F4D160;
        --orange: #FF9603;
        --red: #DC2660;
        --purple: #AC2EE7;
        --brown: #886020;
        --teal: #05DEE5;
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

    img {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-user-drag: none;
        -webkit-touch-callout: none;
    }
`;

const GlobalStyles = (): JSX.Element => {
  return <GlobalStyle />;
};

export default GlobalStyles;
