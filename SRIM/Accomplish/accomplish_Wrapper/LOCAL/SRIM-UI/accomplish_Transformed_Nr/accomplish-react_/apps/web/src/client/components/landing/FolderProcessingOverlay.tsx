import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderSimple, FileText, SpinnerGap, X } from '@phosphor-icons/react';
import type { FolderTreeEntry } from '@/lib/accomplish';
import { cn } from '@/lib/utils';

interface FolderProcessingOverlayProps {
  open: boolean;
  folderPath?: string;
  phase: 'processing' | 'preview';
  nodes: FolderTreeEntry[];
  visibleCount: number;
  motionEnabled: boolean;
  onCancel: () => void;
}

export function FolderProcessingOverlay({
  open,
  folderPath,
  phase,
  nodes,
  visibleCount,
  motionEnabled,
  onCancel,
}: FolderProcessingOverlayProps) {
  const treeScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = treeScrollRef.current;
    if (!el) {
      return;
    }
    el.scrollTop = el.scrollHeight;
  }, [visibleCount, nodes.length, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/10 bg-background/92 shadow-[0_30px_120px_-50px_rgba(0,0,0,0.65)]"
          >
            <div className="border-b border-border/60 px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {phase === 'processing' ? (
                    <SpinnerGap className="h-5 w-5 animate-spin" />
                  ) : (
                    <FolderSimple className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {phase === 'processing' ? 'Processing folder...' : 'Folder tree ready'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {folderPath || 'Scanning selected directory'}
                  </div>
                </div>
              </div>
                <button
                  type="button"
                  onClick={onCancel}
                  className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                  Stop
                </button>
              </div>
            </div>

            <div ref={treeScrollRef} className="max-h-[62vh] overflow-y-auto px-5 py-4">
              <div className="mb-3 text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Directory tree
              </div>
              <div className="space-y-1 font-mono text-[13px] leading-6 text-foreground/90">
                {nodes.slice(0, visibleCount).map((node, index) => {
                  const row = (
                    <div
                      key={`${node.path}-${index}`}
                      className={cn('flex items-center gap-2', node.type === 'folder' && 'font-medium')}
                      style={{ paddingLeft: `${node.depth * 14}px` }}
                    >
                      {node.type === 'folder' ? (
                        <FolderSimple className="h-4 w-4 shrink-0 text-primary" />
                      ) : (
                        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                      )}
                      <span>{node.name}</span>
                    </div>
                  );

                  if (!motionEnabled) {
                    return row;
                  }

                  return (
                    <motion.div
                      key={`${node.path}-${index}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                    >
                      {row}
                    </motion.div>
                  );
                })}
              </div>
              {phase === 'processing' && visibleCount === 0 && (
                <div className="mt-3 text-sm text-muted-foreground">Building tree...</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
