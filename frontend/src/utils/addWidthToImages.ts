import React, { useEffect } from "react";
import cheerio from "cheerio";

export const addWidthToImages = (xmlString: string, width: string) => {
    const $ = cheerio.load(xmlString, { xmlMode: true });

    $("img").each((index, element) => {
      const existingStyle = $(element).attr("style") || "";
      $(element).attr("style", `${existingStyle}display: block; width: 500px;`);
    });

    $("h2").each((index, element) => {
      const existingStyle = $(element).attr("style") || "";
      $(element).attr(
        "style",
        `${existingStyle}font-family: 'Sunflower' !important; font-size: 1.875rem; font-weight: bold; letter-spacing: 1px;`
      );
    });


////console.log("$.xml()", $.xml())
    return $.xml();
  
};
