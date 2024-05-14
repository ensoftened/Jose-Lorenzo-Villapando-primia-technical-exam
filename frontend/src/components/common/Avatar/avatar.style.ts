import styled from "styled-components";

export const SDiv = styled.div<{
    $avatarColor: string
    $image?: string
    $customStyle?: any

}>`
    border: solid 1px ${({theme}) => theme.neutral.lighter};
    width: 30px;
    height: 30px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: white;
    -webkit-text-stroke: 0.1px black;
    user-select: none;
    background-color: ${({$avatarColor}) => $avatarColor};
    background-image: ${({$image}) => "url(" + $image + ")"} ;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

    ${({$customStyle}) => $customStyle};
`;


