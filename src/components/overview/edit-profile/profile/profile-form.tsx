'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { User } from '@/lib/define';
import { useRef, useState } from 'react';
import { updateUserProfile, uploadImage } from '@/lib/action';
import { Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Icons } from '@/components/icons/icons';
import AvatarPicture from '@/components/shared/avatar-picture';
import { useDebounceEffect } from '@/components/crop-image/use-deboundce-effect';
import { canvasPreview } from '@/components/crop-image/canvas-preview';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getProfileFormSchema } from '@/lib/form-schema';
import { useLanguage } from '@/components/provider/language-provider';
import { useAuth } from '@/components/provider/auth-provider';

type ProfileFormValues = z.infer<ReturnType<typeof getProfileFormSchema>>;

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export function ProfileForm({ user }: { user: User }) {
  const router = useRouter();
  const { dict } = useLanguage();
  const { updateUser, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [isImageChanged, setIsImageChanged] = useState(false);

  const [imgSrc, setImgSrc] = useState('');
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(1 / 1);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || '')
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  const defaultValues: Partial<ProfileFormValues> = {
    image: user.img,
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber || '',
    bio: user.bio || '',
  };
  const form = useForm<z.infer<ReturnType<typeof getProfileFormSchema>>>({
    resolver: zodResolver(getProfileFormSchema(dict.lang)),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      if (
        isImageChanged &&
        completedCrop &&
        previewCanvasRef.current &&
        imgRef.current
      ) {
        const image = imgRef.current;
        const crop = completedCrop;
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
          );
        }

        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, 'image/png')
        );

        if (!blob) {
          toast.error(dict.editProfile.profile.message.image.imageCrop);
          setIsLoading(false);
          return;
        }

        const formImageData = new FormData();
        formImageData.append('image', blob);

        const uploadResult = await uploadImage(formImageData);
        if (uploadResult.isSuccess) {
          data.image = uploadResult.data;
        } else {
          toast.error(dict.editProfile.profile.message.image.imageUpload);
          setIsLoading(false);
          return;
        }
      }

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value != undefined) {
          formData.append(key, value);
        }
      });

      const result = await updateUserProfile(data);
      if (result.isSuccess) {
        updateUser(result.data);
        await refreshUser();
        toast.success(dict.editProfile.profile.message.success);
        router.push('/edit-profile');
        router.refresh();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error(error);
      toast.error(dict.editProfile.profile.message.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <>
              <FormItem className="flex gap-4">
                {!!completedCrop ? (
                  <div>
                    <canvas
                      ref={previewCanvasRef}
                      className="h-[100px] w-[100px] border-[3px] rounded-full"
                    />
                  </div>
                ) : (
                  <AvatarPicture
                    src={value}
                    className="h-[100px] w-[100px] border-[3px]"
                  />
                )}
                <div className="flex flex-col gap-2 ">
                  <FormLabel className="text-primary">
                    {dict.editProfile.profile.form.image.label}
                  </FormLabel>
                  <label htmlFor="image" className="cursor-pointer">
                    {dict.editProfile.profile.form.image.chooseFile}
                  </label>
                </div>
                <FormControl>
                  <Input
                    id="image"
                    className="hidden"
                    accept={'image/*'}
                    type="file"
                    {...rest}
                    onChange={(e) => {
                      onSelectFile(e);
                      setIsImageChanged(true);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        {!!imgSrc && (
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={aspect}
            // minWidth={400}
            minHeight={100}
            // circularCrop
            className="w-[300px]"
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{
                transform: `scale(${scale}) rotate(${rotate}deg)`,
              }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
        )}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">
                {dict.editProfile.profile.form.fullName.label}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={dict.editProfile.profile.form.fullName.label}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {dict.editProfile.profile.form.fullName.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">
                {dict.editProfile.profile.form.username.label}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={dict.editProfile.profile.form.username.label}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {dict.editProfile.profile.form.username.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">
                {dict.editProfile.profile.form.email.label}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={dict.editProfile.profile.form.email.label}
                  {...field}
                  disabled={!!user.googleId}
                />
              </FormControl>
              <FormDescription>
                {dict.editProfile.profile.form.email.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">
                {dict.editProfile.profile.form.phoneNumber.label}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={dict.editProfile.profile.form.phoneNumber.label}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {dict.editProfile.profile.form.phoneNumber.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary">
                {dict.editProfile.profile.form.bio.label}
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={dict.editProfile.profile.form.bio.title}
                  className={cn('w-full', {
                    'border-destructive focus-within:border-destructive':
                      form.formState.errors.bio,
                  })}
                />
              </FormControl>
              <FormDescription>
                {dict.editProfile.profile.form.bio.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && (
            <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
          )}
          {dict.button.saveChanges}
        </Button>
      </form>
    </Form>
  );
}
