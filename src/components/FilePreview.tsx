import { FileAttachment } from '@/types/modes';
import { File, Image, Music, FileText, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilePreviewProps {
  file: FileAttachment;
  onRemove?: () => void;
  compact?: boolean;
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return <Image className="h-4 w-4" />;
  if (type.startsWith('audio/')) return <Music className="h-4 w-4" />;
  if (type.startsWith('text/') || type.includes('pdf') || type.includes('document')) return <FileText className="h-4 w-4" />;
  return <File className="h-4 w-4" />;
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const FilePreview = ({ file, onRemove, compact = false }: FilePreviewProps) => {
  const isImage = file.type.startsWith('image/');

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg glass text-xs group">
        {isImage ? (
          <img src={file.url} alt={file.name} className="h-8 w-8 rounded object-cover" />
        ) : (
          <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
            {getFileIcon(file.type)}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="truncate font-medium">{file.name}</p>
          <p className="text-muted-foreground">{formatSize(file.size)}</p>
        </div>
        {onRemove && (
          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100" onClick={onRemove}>
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }

  // Full preview in chat messages
  if (isImage) {
    return (
      <a href={file.url} target="_blank" rel="noopener noreferrer" className="block mt-2">
        <img src={file.url} alt={file.name} className="max-w-[300px] max-h-[200px] rounded-lg object-cover border border-border" />
      </a>
    );
  }

  return (
    <a
      href={file.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 mt-2 px-4 py-3 rounded-lg glass hover:bg-muted/50 transition-colors max-w-[300px]"
    >
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {getFileIcon(file.type)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{file.name}</p>
        <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
      </div>
      <Download className="h-4 w-4 text-muted-foreground" />
    </a>
  );
};
