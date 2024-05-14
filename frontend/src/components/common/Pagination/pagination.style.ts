import styled from "styled-components";

export const SMainDiv = styled.div`
    display: grid;
    margin: 15px 0;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0;
    grid-row-gap: 0;
`;

export const SCol1 = styled.div<{
  $size?: string
}>`
  grid-area: 1/1/2/2;
  text-align: left;
  font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "16px" : "")};
    color: ${({theme}) => theme.neutral.dark}
`;

export const SCol2 = styled.div<{
  $size?: string
}>`
  grid-area: 1/2/2/3;
  text-align: right;


`;

export const SButton = styled.button<{
    $active?: boolean;
    $size?: string;
    $disabled?: boolean
}>`
  background-color: white;
  padding: 10px 14px;

  border-radius: 7.5px;
  cursor: pointer;
  font-size: ${({$size}) => ($size == "small") ? "12px" : (($size == "medium") ? "16px" : "")};
  color: ${({theme}) => theme.neutral.dark};

  ${({
    $active,
    theme
  }) => {
    let style = {}
    
    if($active == true) {
        style = {
            ...style,
            backgroundColor: theme.primary.main,
            color: "white"
        }

        
    }
    return style
  }}
`;

export const SPageButtonDiv = styled.div`
  color: ${({theme}) => theme.neutral.dark};
  display: inline-block
`;