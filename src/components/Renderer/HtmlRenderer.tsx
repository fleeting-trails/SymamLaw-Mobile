import React from "react";
import { useWindowDimensions } from "react-native";
import RenderHTML, {
  HTMLContentModel,
  HTMLElementModel,
} from "react-native-render-html";

function HtmlRenderer({ html, width }: PropTypes.HtmlRenderer) {
  const dimension = useWindowDimensions();
  const customHTMLElementModels = {
    svg: HTMLElementModel.fromCustomModel({
      tagName: "svg",
      mixedUAStyles: {
        width: 8,
        height: 8,
        borderRadius: 25,
        marginRight: 10,
        marginTop: 8,

        // alignSelf: 'center',
        backgroundColor: "black",
      },
      contentModel: HTMLContentModel.block,
    }),
  };
  const tagStyles = {
    li: {
      flexDirection: "row",
      // gap: 10,
    },
  };
  return (
    <RenderHTML
      contentWidth={width ?? dimension.width}
      source={{ html: html ?? "" }}
      tagsStyles={tagStyles as any}
      customHTMLElementModels={customHTMLElementModels}
    />
  );
}

export default HtmlRenderer;
