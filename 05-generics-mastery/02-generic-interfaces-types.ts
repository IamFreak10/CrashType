/**
 * ============================================================================
 * মডিউল ৫.২: Generic Interfaces & Types (API Responses & DTOs)
 * ============================================================================
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 05-generics-mastery/02-generic-interfaces-types.ts
 */

// ১. স্ট্যান্ডার্ড এন্টারপ্রাইজ API রেসপন্স ইন্টারফেস
export interface ApiResponse<TData> {
  success: boolean;
  message: string;
  statusCode: number;
  data: TData;
}

// ২. জেনেরিক পেজিনেশন র‍্যাপার
export interface PaginatedResult<TItem> {
  items: TItem[];
  meta: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// বিভিন্ন মডেলে রিইউজ:
type User = { id: string; name: string };
type Post = { id: string; title: string };

type UsersApiResponse = ApiResponse<User[]>;
type PaginatedPostsResponse = ApiResponse<PaginatedResult<Post>>;

function mockFetchPosts(): PaginatedPostsResponse {
  return {
    success: true,
    message: "Posts fetched successfully",
    statusCode: 200,
    data: {
      items: [{ id: "p1", title: "TypeScript Mastery" }],
      meta: {
        totalItems: 1,
        currentPage: 1,
        totalPages: 1,
        hasMore: false,
      },
    },
  };
}

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * একটি জেনেরিক `RepositoryResult<T>` টাইপ তৈরি করুন যা একটি Discriminated Union হবে:
 * - সাকসেস কেস: `{ success: true, data: T }`
 * - এরর কেস: `{ success: false, error: string }`
 * 
 * এরপর `wrapSuccess<T>(data: T): RepositoryResult<T>` ফাংশনটি তৈরি করুন।
 */

// TODO: RepositoryResult<T> টাইপ ডিফাইন করুন
export type RepositoryResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// TODO: wrapSuccess হেল্পার ফাংশন লিখুন
export function wrapSuccess<T>(data: T): RepositoryResult<T> {
  return {
    success: true,
    data,
  };
}

export function wrapError<T>(error: string): RepositoryResult<T> {
  return {
    success: false,
    error,
  };
}

// টেস্ট:
const ok = wrapSuccess({ username: "iamfreak" });
const fail = wrapError("Database query timed out");

if (ok.success && ok.data.username === "iamfreak" && !fail.success) {
  console.log("🎉 Module 5.2 Task Passed! Generic interfaces and results working.");
}
