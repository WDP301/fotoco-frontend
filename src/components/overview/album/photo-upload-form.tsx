'use client';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAuthHeader } from '@/lib/action';
import axios, { AxiosProgressEvent, CancelTokenSource } from 'axios';
import {
  AudioWaveform,
  File,
  FileImage,
  FolderArchive,
  UploadCloud,
  Video,
  X,
} from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import imageCompression from 'browser-image-compression';
import { useRouter } from 'next/navigation';
import { cn, interpolateString } from '@/lib/utils';
import { useLanguage } from '@/components/provider/language-provider';
import { siteConfig } from '@/config/site';

interface ProgressBarProps extends React.ComponentPropsWithoutRef<'div'> {
  progress: number;
}

const ProgressBar = ({ progress, className }: ProgressBarProps) => {
  return (
    <div className="h-1 relative">
      <div className="absolute top-0 bottom-0 left-0 w-full h-full bg-gray-200 rounded-full"></div>
      <div
        style={{
          width: `${progress}%`,
        }}
        className={cn(
          'absolute top-0 bottom-0 left-0 h-full transition-all duration-150 bg-purple-500 rounded-full',
          className
        )}
      ></div>
      <div className="absolute top-0 bottom-0 left-0 flex items-center justify-center w-full h-full"></div>
    </div>
  );
};

interface FileUploadProgress {
  progress: number;
  File: File;
  source: CancelTokenSource | null;
}

enum FileTypes {
  Image = 'image',
  Pdf = 'pdf',
  Audio = 'audio',
  Video = 'video',
  Other = 'other',
}

const ImageColor = {
  bgColor: 'bg-purple-600',
  fillColor: 'fill-purple-600',
};

const PdfColor = {
  bgColor: 'bg-blue-400',
  fillColor: 'fill-blue-400',
};

const AudioColor = {
  bgColor: 'bg-yellow-400',
  fillColor: 'fill-yellow-400',
};

const VideoColor = {
  bgColor: 'bg-green-400',
  fillColor: 'fill-green-400',
};

const OtherColor = {
  bgColor: 'bg-gray-400',
  fillColor: 'fill-gray-400',
};

export default function PhotoUploadForm({
  albumId,
  setOpen,
}: {
  albumId: string;
  setOpen: (open: boolean) => void;
}) {
  const { dict } = useLanguage();
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([]);

  const getFileIconAndColor = (file: File) => {
    if (file.type.includes(FileTypes.Image)) {
      return {
        icon: <FileImage size={40} className={ImageColor.fillColor} />,
        color: ImageColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Pdf)) {
      return {
        icon: <File size={40} className={PdfColor.fillColor} />,
        color: PdfColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Audio)) {
      return {
        icon: <AudioWaveform size={40} className={AudioColor.fillColor} />,
        color: AudioColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Video)) {
      return {
        icon: <Video size={40} className={VideoColor.fillColor} />,
        color: VideoColor.bgColor,
      };
    }

    return {
      icon: <FolderArchive size={40} className={OtherColor.fillColor} />,
      color: OtherColor.bgColor,
    };
  };

  // feel free to mode all these functions to separate utils
  // here is just for simplicity
  const onUploadProgress = (
    progressEvent: AxiosProgressEvent,
    file: File,
    cancelSource: CancelTokenSource
  ) => {
    const progress = Math.round(
      (progressEvent.loaded / (progressEvent.total ?? 0)) * 100
    );

    if (progress === 100) {
      setUploadedFiles((prevUploadedFiles) => {
        return [...prevUploadedFiles, file];
      });

      setFilesToUpload((prevUploadProgress) => {
        return prevUploadProgress.filter((item) => item.File !== file);
      });

      return;
    }

    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.map((item) => {
        if (item.File.name === file.name) {
          return {
            ...item,
            progress,
            source: cancelSource,
          };
        } else {
          return item;
        }
      });
    });
  };

  const uploadPhotoToAws = useCallback(
    async (
      formData: FormData,
      onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
      cancelSource: CancelTokenSource
    ) => {
      try {
        const imageFile = formData.get('image') as File;

        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(imageFile, options);

        if (imageFile.size > 10 * 1024 * 1024) {
          throw new Error(dict.photo.upload.error.fileSize);
        }

        formData.set('image', compressedFile);

        const result = await axios
          .post(
            `${siteConfig.baseApiURL}/albums/${albumId}/upload-photo`,
            formData,
            {
              onUploadProgress,
              cancelToken: cancelSource.token,
              headers: await getAuthHeader(),
            }
          )
          .then((res) => {
            
          });

        return result;
      } catch (error) {
        throw error;
      }
    },
    [albumId]
  );

  const removeFile = (file: File) => {
    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.filter((item) => item.File !== file);
    });

    setUploadedFiles((prevUploadedFiles) => {
      return prevUploadedFiles.filter((item) => item !== file);
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFilesToUpload((prevUploadProgress) => {
        return [
          ...prevUploadProgress,
          ...acceptedFiles.map((file) => {
            return {
              progress: 0,
              File: file,
              source: null,
            };
          }),
        ];
      });

      const fileUploadBatch = acceptedFiles.map((file) => {
        const formData = new FormData();
        formData.append('image', file);

        const cancelSource = axios.CancelToken.source();
        return uploadPhotoToAws(
          formData,
          (progressEvent) =>
            onUploadProgress(progressEvent, file, cancelSource),
          cancelSource
        );
      });

      try {
        await Promise.all(fileUploadBatch);
        toast.success(dict.photo.upload.success);
        setOpen(false);
        router.refresh();
      } catch (error: any) {
        if (axios.isCancel(error)) {
          toast.error(dict.photo.upload.cancel);
        } else {
          removeFile(acceptedFiles[0]);
          toast.error(
            interpolateString(dict.photo.upload.error.template, {
              error: error.message,
            }) ||
              error?.response?.data?.error?.message ||
              'Unknown error'
          );
        }
      }
    },
    [uploadPhotoToAws, router, setOpen]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-background hover:bg-secondary"
        >
          <div className=" text-center">
            <div className=" border p-2 rounded-md max-w-min mx-auto">
              <UploadCloud size={20} />
            </div>

            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">
                {dict.photo.upload.dragFile}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              {dict.photo.upload.chooseFile}
            </p>
          </div>
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
        />
      </div>

      {filesToUpload.length > 0 && (
        <div>
          <ScrollArea className="h-40">
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
              {dict.photo.upload.filesToUpload}
            </p>
            <div className="space-y-2 pr-3">
              {filesToUpload.map((fileUploadProgress) => {
                return (
                  <div
                    key={fileUploadProgress.File.lastModified}
                    className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
                  >
                    <div className="flex items-center flex-1 p-2">
                      <div className="text-white">
                        {getFileIconAndColor(fileUploadProgress.File).icon}
                      </div>

                      <div className="w-full ml-2 space-y-1">
                        <div className="text-sm flex justify-between">
                          <p className="text-muted-foreground ">
                            {fileUploadProgress.File.name.slice(0, 25)}
                          </p>
                          <span className="text-xs">
                            {fileUploadProgress.progress}%
                          </span>
                        </div>
                        <ProgressBar
                          progress={fileUploadProgress.progress}
                          className={
                            getFileIconAndColor(fileUploadProgress.File).color
                          }
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (fileUploadProgress.source)
                          fileUploadProgress.source.cancel('Upload cancelled');
                        removeFile(fileUploadProgress.File);
                      }}
                      className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
                    >
                      <X size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div>
          <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
            {dict.photo.upload.uploadedFiles}
          </p>
          <div className="space-y-2 pr-3">
            {uploadedFiles.map((file) => {
              return (
                <div
                  key={file.lastModified}
                  className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center flex-1 p-2">
                    <div className="text-white">
                      {getFileIconAndColor(file).icon}
                    </div>
                    <div className="w-full ml-2 space-y-1">
                      <div className="text-sm flex justify-between">
                        <p className="text-muted-foreground ">
                          {file.name.slice(0, 25)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file)}
                    className="bg-red-500 text-white transition-all items-center justify-center px-2 hidden group-hover:flex"
                  >
                    <X size={20} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
