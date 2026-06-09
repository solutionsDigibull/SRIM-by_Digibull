import fs from 'fs';
import path from 'path';

export interface FolderTreeEntry {
  path: string;
  name: string;
  depth: number;
  type: 'folder' | 'file';
}

export interface FolderSelectionResult {
  folderPath: string;
  tree: FolderTreeEntry[];
}

function pushFolderTreeEntries(
  rootPath: string,
  currentPath: string,
  depth: number,
  tree: FolderTreeEntry[],
): void {
  const entries = fs.readdirSync(currentPath, { withFileTypes: true });
  entries.sort((left, right) => {
    if (left.isDirectory() !== right.isDirectory()) {
      return left.isDirectory() ? -1 : 1;
    }
    return left.name.localeCompare(right.name);
  });

  for (const entry of entries) {
    const entryPath = path.join(currentPath, entry.name);
    const relativePath = path.relative(rootPath, entryPath) || entry.name;
    tree.push({
      path: relativePath.replace(/\\/g, '/'),
      name: entry.name,
      depth,
      type: entry.isDirectory() ? 'folder' : 'file',
    });
    if (entry.isDirectory()) {
      pushFolderTreeEntries(rootPath, entryPath, depth + 1, tree);
    }
  }
}

export function buildFolderSelection(folderPath: string): FolderSelectionResult {
  const resolvedRoot = path.resolve(folderPath);
  const tree: FolderTreeEntry[] = [
    {
      path: path.basename(resolvedRoot) || resolvedRoot,
      name: path.basename(resolvedRoot) || resolvedRoot,
      depth: 0,
      type: 'folder',
    },
  ];

  pushFolderTreeEntries(resolvedRoot, resolvedRoot, 1, tree);
  return {
    folderPath: resolvedRoot,
    tree,
  };
}
