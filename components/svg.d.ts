// TypeScript declaration for importing SVG files as React components or assets
declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
