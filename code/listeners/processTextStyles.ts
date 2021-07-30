export default (localStyles: TextStyle[]) => {
  const textStyles: Plugin.ExportedTextStyle[] = []

  if (localStyles.length === 0)
    return textStyles

  localStyles.forEach((txtStyle) => {
    textStyles.push({
      key: txtStyle.key,
      name: txtStyle.name,
      description: txtStyle.description,
      fontFamily: txtStyle.fontName.family,
      fontStyle: txtStyle.fontName.style,
      fontSize: txtStyle.fontSize,
      letterSpacing: txtStyle.letterSpacing,
      lineHeight: txtStyle.lineHeight,
      textCase: txtStyle.textCase,
      textDecoration: txtStyle.textDecoration,
      paragraphSpacing: txtStyle.paragraphSpacing
    })
  })

  return textStyles
}