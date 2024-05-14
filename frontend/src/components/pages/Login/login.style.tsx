import styled from "styled-components";

export const SLoginMainDiv = styled.div<{}>`
    width: 100%;
    height: 100vh;
    background-color: ${({theme}) => theme.primary.light};
    align-items: center;
    justify-content: center;
`;

export const SLoginFormCard = styled.div<{$device: string}>`
    background-color: white;
    padding: 30px;
    border-radius: 5px;
    position: absolute;
    top: 40%;
    left: 50%;
    width: 500px;
    transform: translate(-50%, -50%);
        box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.33);
    -webkit-box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.33);
    -moz-box-shadow: 0px 0px 4px 2px rgba(0,0,0,0.33);

    ${({$device}) => {
        let style = {}

        if($device == "M") {
            style = {
                ...style,
                top: "20%",
                width: "90%", 
            }
        }
        return style

    }}
  
`;