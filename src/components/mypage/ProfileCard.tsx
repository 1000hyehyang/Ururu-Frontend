import Image from 'next/image';
import { myPageData } from '@/data/mypage';

export function ProfileCard() {
  const { profile } = myPageData;

  return (
    <section className="mx-auto flex w-full max-w-xl flex-col items-center rounded-xl bg-white px-5 py-4 shadow-[0_2px_12px_0_rgba(0,0,0,0.04)]">
      {/* 상단: 아바타/닉네임/뱃지/포인트 */}
      <div className="mb-4 flex w-full items-center justify-between">
        {/* 아바타+닉네임+뱃지 */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-black">
            <Image src={profile.avatar} alt="아바타" width={48} height={48} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-lg font-extrabold text-gray-900">{profile.nickname}</div>
            <div className="flex gap-1">
              {profile.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-pink-400 bg-white px-2 py-0.5 text-xs font-semibold text-pink-400"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* 포인트 */}
        <div className="flex flex-col items-end">
          <div className="mb-0.5 flex items-center gap-1">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-pink-300 text-base font-bold text-pink-400">
              P
            </span>
          </div>
          <div className="text-xs text-gray-400">우르르 포인트</div>
          <div className="text-base font-extrabold tracking-tight text-gray-900">
            {profile.points.toLocaleString()}P
          </div>
        </div>
      </div>
      {/* 하단: 3개 버튼 */}
      <div className="mt-1 flex w-full gap-2">
        <button className="flex h-10 flex-1 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-400 transition-colors hover:border-pink-300 hover:text-pink-400">
          나의 리뷰
        </button>
        <button className="flex h-10 flex-1 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-400 transition-colors hover:border-pink-300 hover:text-pink-400">
          프로필 수정
        </button>
        <button className="flex h-10 flex-1 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-400 transition-colors hover:border-pink-300 hover:text-pink-400">
          뷰티 프로필
        </button>
      </div>
    </section>
  );
}
