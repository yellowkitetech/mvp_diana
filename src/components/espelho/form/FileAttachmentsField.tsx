
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { File, FileText, Upload } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

interface FileAttachmentsFieldProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  form: UseFormReturn<any>;
}

export const FileAttachmentsField: React.FC<FileAttachmentsFieldProps> = ({ 
  files, 
  setFiles, 
  form 
}) => {
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    
    const newFiles = Array.from(fileList);
    
    // Validate files
    const validFiles = newFiles.filter(file => 
      file.size <= MAX_FILE_SIZE && ACCEPTED_FILE_TYPES.includes(file.type)
    );
    
    if (validFiles.length !== newFiles.length) {
      toast({
        title: "Validação de arquivos",
        description: "Alguns arquivos não foram adicionados devido a restrições de tamanho ou formato.",
        variant: "destructive"
      });
    }
    
    setFiles([...files, ...validFiles]);
    form.setValue('anexos', [...files, ...validFiles]);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    form.setValue('anexos', updatedFiles);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="file-upload">Anexos</Label>
      
      <div className="grid grid-cols-1 gap-2">
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-2 border rounded-md"
              >
                <div className="flex items-center">
                  <File className="h-4 w-4 mr-2" />
                  <span className="text-sm">{file.name}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 p-0"
                >
                  <span className="sr-only">Remove</span>
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-background hover:bg-accent/50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-1 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Clique para anexar</span> ou arraste e solte
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, DOCX, JPEG, PNG (máx. 5MB)
              </p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.docx,.doc,.jpeg,.jpg,.png"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
