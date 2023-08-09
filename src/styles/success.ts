import { styled } from "@stitches/react";

export const ImagesContainer = styled("section", {
  display: "flex",
  alignItems: "center",
  marginBottom: "3rem",

  "div + div": {
    marginLeft: "calc(-140px / 2)",
  },
});