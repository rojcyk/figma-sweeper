import React from "react"

const getStyles = (paintStyles: Plugin.ExportedStyle[]) => {
  let tmp: any[] = []

  if (paintStyles) {
    paintStyles.forEach((style, index) => {
      const errors: any[] = []

      if (style.errors) {
        style.errors.forEach((err: any, index: any) => {
          errors.push(
            <li
              style={{
                display: "block",
                fontSize: "11px"
              }}
              key={index}
            >
              - {err}
            </li>
          )
        })
      }

      tmp.push(
        <li
          key={index}
          style={{
            fontSize: "12px",
            marginBottom: "4px",
            display: "block",
            opacity: style.errors === null ? "1" : "0.5"
          }}
        >
          {style.name}

          {style.errors !== null && (
            <ul style={{ margin: "0", padding: "0", marginTop: "4px", listStyleType: "disc" }}>
              {errors}
            </ul>
          )}
        </li>
      )
    })
  }

  return tmp
}

export const ThemeOverview = ({ paintStyles }: { paintStyles: Plugin.ExportedStyle[] }) => {
  const styles = getStyles(paintStyles)
  return (
    <ul
      style={{
        margin: "0",
        padding: "0",
        paddingLeft: "8px"
      }}
    >
      {styles}
    </ul>
  )
}
