
import { useState, ChangeEvent } from "react";
import { UploadCloud, X, FileText, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label: string;
  description?: string;
  accept?: string;
  maxFiles?: number;
  maxSize?: number; // in MB
  onChange?: (files: File[]) => void;
  className?: string;
}

const FileUpload = ({
  label,
  description,
  accept = "image/*,.pdf,.doc,.docx",
  maxFiles = 5,
  maxSize = 5, // 5MB
  onChange,
  className,
}: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleFiles(selectedFiles);
  };

  const handleFiles = (selectedFiles: File[]) => {
    setError(null);
    
    // Check if adding new files would exceed max files limit
    if (files.length + selectedFiles.length > maxFiles) {
      setError(`Você pode enviar no máximo ${maxFiles} arquivos.`);
      return;
    }
    
    // Check file sizes
    const oversizedFiles = selectedFiles.filter(
      file => file.size > maxSize * 1024 * 1024
    );
    
    if (oversizedFiles.length > 0) {
      setError(`Alguns arquivos são maiores que ${maxSize}MB.`);
      return;
    }
    
    const newFiles = [...files, ...selectedFiles];
    setFiles(newFiles);
    if (onChange) onChange(newFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFiles(droppedFiles);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (onChange) onChange(newFiles);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <Image className="w-4 h-4 text-marketplace-primary" />;
    }
    return <FileText className="w-4 h-4 text-marketplace-primary" />;
  };

  return (
    <div className={className}>
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
        
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 transition-colors",
            dragActive
              ? "border-marketplace-primary bg-marketplace-primary/5"
              : "border-gray-300 hover:border-marketplace-primary/50",
            className
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-3 text-center">
            <UploadCloud className="h-10 w-10 text-gray-400" />
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium text-gray-700">
                Arraste arquivos aqui ou{" "}
                <label className="text-marketplace-primary cursor-pointer hover:text-marketplace-secondary">
                  clique para selecionar
                  <input
                    type="file"
                    multiple
                    className="sr-only"
                    accept={accept}
                    onChange={handleFileChange}
                  />
                </label>
              </p>
              <p className="text-xs text-gray-500">
                Arquivos suportados: imagens, PDFs e documentos até {maxSize}MB
              </p>
            </div>
          </div>
        </div>
        
        {error && (
          <p className="text-sm text-red-500 mt-2">{error}</p>
        )}
        
        {files.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Arquivos selecionados ({files.length}/{maxFiles})
            </p>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li 
                  key={index}
                  className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    {getFileIcon(file)}
                    <span className="text-sm truncate max-w-[200px]">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
