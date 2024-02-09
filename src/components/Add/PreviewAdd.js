import React from "react"
import { useUrl } from "../../contexts/UrlContext"

import "./style.css"

export default function PreviewAdd() {
  const { url } = useUrl()
  return (
    <div>
      {url && (
        <div className="prebox">
          <div className="previewAdd3">
            <img src={url} className="previewAddimg" alt="to upload" />
          </div>
        </div>
      )}
    </div>
  )
}
