import type { Plugin } from "unified";
import type { Root } from "mdast";

export interface HeadingTocItem {
  id: string;
  numero: string;
  titulo: string;
  nivel: 2 | 3;
}

export declare function computeHeadingTree(tree: Root): { toc: HeadingTocItem[]; readingTimeMin: number };
export declare function remarkHeadingTree(): Plugin<[], Root>;
