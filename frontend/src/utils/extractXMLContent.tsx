const extractXMLContent = (xmlContent: string) => {
    const extractedMatches = xmlContent.match(/<[^>]+>([^<]+)<\/[^>]+>/g);

    if (!extractedMatches) {
        return [];
      }
    
      const extractedText = extractedMatches.map((match) =>
        match.replace(/<\/?[^>]+(>|$)/g, '')
      );


    return extractedText
}

export default extractXMLContent