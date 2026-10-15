/**
 * ============================================================================
 * মডিউল ৭.১: Partial, Required, Readonly, Pick & Omit
 * ============================================================================
 * 
 * কেন এটি গুরুত্বপূর্ণ?
 * একটি ডাটাবেজ মডেল (যেমন: Post বা User) তৈরি করার পর:
 * - Create করার সময় id, createdAt থাকে না (Omit)
 * - Update করার সময় সব ফিল্ড অপশনাল হয় (Partial)
 * - টেবিল বা কার্ডে দেখানোর সময় মাত্র ২-৩টি ফিল্ড লাগে (Pick)
 * বারবার নতুন ইন্টারফেস না লিখে ইউটিলিটি টাইপ দিয়ে ট্রান্সফর্ম করুন!
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 07-utility-types-cheatcodes/01-partial-pick-omit.ts
 */

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ১. Omit<T, Keys>: নির্দিষ্ট ফিল্ডগুলো বাদ দিয়ে নতুন টাইপ
// Create Post DTO: id, createdAt, updatedAt ক্লায়েন্ট পাঠাবে না
export type CreatePostDto = Omit<BlogPost, "id" | "createdAt" | "updatedAt">;

// ২. Partial<T>: সব ফিল্ডকে অপশনাল (?) করে দেয়
// Update Post DTO: ইউজার চাইলে শুধু title আপডেট করতে পারে, অথবা শুধু content
export type UpdatePostDto = Partial<CreatePostDto>;

// ৩. Pick<T, Keys>: নির্দিষ্ট ফিল্ডগুলো বেছে নেওয়া
// Post Card Preview: শুধু id, title, এবং isPublished লাগবে
export type PostCardPreview = Pick<BlogPost, "id" | "title" | "isPublished">;

// ৪. Required<T>: সব অপশনাল ফিল্ডকে বাধ্যতামূলক করে
type Config = { host?: string; port?: number };
type StrictConfig = Required<Config>; // { host: string; port: number }

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * একটি ইন্টারফেস রয়েছে:
 * 
 * export interface UserProfile {
 *   id: string;
 *   username: string;
 *   email: string;
 *   passwordHash: string;
 *   bio?: string;
 *   avatarUrl?: string;
 *   createdAt: Date;
 * }
 * 
 * ইউটিলিটি টাইপ ব্যবহার করে দুটি নতুন টাইপ তৈরি করুন:
 * ১. `PublicUser`: যেখানে passwordHash এবং createdAt থাকবে না (Omit ব্যবহার করুন)
 * ২. `UpdateBioDto`: যেখানে UserProfile থেকে শুধুমাত্র 'bio' এবং 'avatarUrl' থাকবে (Pick ব্যবহার করুন)
 */

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  bio?: string;
  avatarUrl?: string;
  createdAt: Date;
}

// TODO: PublicUser টাইপ তৈরি করুন
export type PublicUser = Omit<UserProfile, "passwordHash" | "createdAt">;

// TODO: UpdateBioDto তৈরি করুন
export type UpdateBioDto = Pick<UserProfile, "bio" | "avatarUrl">;

// টেস্ট:
const publicUser: PublicUser = {
  id: "u_1",
  username: "freak",
  email: "freak@dev.com",
};

const bioUpdate: UpdateBioDto = {
  bio: "Fullstack developer mastering Nest & Next",
};

if (publicUser.id === "u_1" && bioUpdate.bio) {
  console.log("🎉 Module 7.1 Task Passed! Pick, Omit & Partial mastered.");
}
