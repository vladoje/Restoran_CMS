// Source - https://stackoverflow.com/a/41946697
// Posted by Kalle, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-23, License - CC BY-SA 4.0

// declaration.d.ts
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}
