import React, { useState, useEffect } from "react"
import ImageCard from "../ImageCard"
import { db } from "../../util/firebaseapp"
import "./style.css"
import PropTypes from "prop-types"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import Skeleton from "@mui/material/Skeleton"

export default function LoadImages() {
  const [imagesToLoad, setImagesToLoad] = useState()

  function SkeletonChildrenDemo(props) {
    const { loading = false } = props

    return (
      <div>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ margin: 1 }}>
            {loading ? (
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
            ) : (
              <Avatar src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" />
            )}
          </Box>
          <Box sx={{ width: "100%" }}>
            {loading ? (
              <Skeleton width="100%">
                <Typography>.</Typography>
              </Skeleton>
            ) : (
              <Typography>Ted</Typography>
            )}
          </Box>
        </Box>
        {loading ? (
          <Skeleton variant="rectangular" width="100%">
            <div style={{ paddingTop: "57%" }} />
          </Skeleton>
        ) : (
          ""
        )}
      </div>
    )
  }

  SkeletonChildrenDemo.propTypes = {
    loading: PropTypes.bool,
  }

  useEffect(() => {
    if (!imagesToLoad) {
      const refImages = db.ref("images")
      refImages.on(
        "value",
        (snapshot) => {
          var data = snapshot.val()
          var images = []

          for (var i in data) {
            var image = data[i].image
            var username = data[i].username
            var profileImage = data[i].profileImage
            var id = data[i].id

            images.unshift({ image, username, profileImage, id })
          }
          setImagesToLoad(images)
        },
        (errorObject) => {
          console.log("The read failed: " + errorObject.name)
        },
      )
    }
  }, [imagesToLoad])

  return (
    <div className="ImagesList">
      {imagesToLoad ? (
        imagesToLoad.map((image, index) => <ImageCard imageToShow={image} />)
      ) : (
        <div style={{ maxWidth: "500px", width: "100%" }}>
          <SkeletonChildrenDemo loading />{" "}
        </div>
      )}
    </div>
  )
}
