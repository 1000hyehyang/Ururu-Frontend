import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';

interface ProfileImageUploadProps {
  profileImg: string;
}

export function ProfileImageUpload({ profileImg }: ProfileImageUploadProps) {
  return (
    <div className="relative mb-8 flex flex-col items-center">
      <Avatar className="h-28 w-28 bg-bg-300 md:h-36 md:w-36">
        <AvatarImage src={profileImg} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <label
        htmlFor="profile-upload"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 cursor-not-allowed"
      >
        <input id="profile-upload" type="file" accept="image/*" className="hidden" disabled />
        <span className="flex h-9 w-16 items-center justify-center rounded-full border border-bg-300 bg-bg-100 shadow-md hover:bg-bg-200">
          <Camera className="h-5 w-5 text-text-300" />
          <span className="sr-only">프로필 사진 변경</span>
        </span>
      </label>
    </div>
  );
}
