// I have no clue why svgs, pngs, and jsons don't work in this project
// for now this is a solution

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.json" {
  const content: any;
  export default content;
}
