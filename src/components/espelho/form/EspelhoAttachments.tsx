
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Paperclip, File, X } from 'lucide-react';

interface EspelhoAttachmentsProps {
  files: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
}

export const EspelhoAttachments: React.FC<EspelhoAttachmentsProps> = ({
  files,
  onFileChange,
  onRemoveFile
}) => {
  return (
    <div>
      <FormLabel>Anexo de Arquivo</FormLabel>
      <div className="mt-2">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <Paperclip className="mr-2 h-4 w-4" />
            Anexar PDF
          </Button>
          <Input
            id="file-upload"
            type="file"
            accept=".pdf"
            multiple
            className="hidden"
            onChange={onFileChange}
          />
          <span className="text-sm text-muted-foreground">
            {files.length > 0 ? `${files.length} arquivo(s) selecionado(s)` : 'Nenhum arquivo selecionado'}
          </span>
        </div>
        
        {files.length > 0 && (
          <div className="mt-3 space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between border rounded-md p-2">
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4" />
                  <span className="text-sm truncate max-w-[300px]">{file.name}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
