/**
 * ============================================================================
 * মডিউল ৮.১: Next.js 15/16 App Router & Server Actions Type Safety
 * ============================================================================
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 08-realworld-nestjs-and-nextjs/01-nextjs-app-router-types.ts
 */

// ১. Next.js App Router Page Props (Async Params & SearchParams)
// Next.js 15+ এ params এবং searchParams উভয়ই Promise!
export interface PostPageProps {
  params: Promise<{
    postId: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

// Next.js Page Component অনুকরণ:
export async function PostPageComponent({ params, searchParams }: PostPageProps) {
  const { postId } = await params;
  const query = await searchParams;

  console.log(`Rendering Post Page for ID: ${postId}`);
  console.log(`Query filters:`, query);
  return { postId, query };
}

// ২. Server Action State & Response Pattern
export type ActionResponse<TData = unknown> =
  | { success: true; message: string; data?: TData }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

// ৩. Zod স্কিমা থেকে টাইপ জেনারেট করা (Schema-Driven Development)
// (Zod টাইপ স্ট্রাকচার কীভাবে কাজ করে তার বিশুদ্ধ সিমুলেশন):
export interface CreateCommentSchema {
  postId: string;
  content: string;
  authorEmail: string;
}

export async function createCommentAction(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse<CreateCommentSchema>> {
  const content = formData.get("content");
  const authorEmail = formData.get("authorEmail");
  const postId = formData.get("postId");

  if (!content || typeof content !== "string" || content.length < 5) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: { content: ["Content must be at least 5 characters"] },
    };
  }

  return {
    success: true,
    message: "Comment created successfully",
    data: {
      postId: String(postId),
      content,
      authorEmail: String(authorEmail),
    },
  };
}

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * একটি Next.js ইউজার প্রোফাইল পেজের জন্য `UserProfilePageProps` ইন্টারফেস লিখুন:
 * - params: Promise<{ username: string }>
 * - searchParams: Promise<{ tab?: "posts" | "likes" | "about" }>
 */

// TODO: UserProfilePageProps ইন্টারফেস ডিফাইন করুন
export interface UserProfilePageProps {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ tab?: "posts" | "likes" | "about" }>;
}

async function renderProfile(props: UserProfilePageProps) {
  const { username } = await props.params;
  const { tab } = await props.searchParams;
  return `User @${username} on tab: ${tab || "posts"}`;
}

// টেস্ট:
renderProfile({
  params: Promise.resolve({ username: "freak" }),
  searchParams: Promise.resolve({ tab: "likes" }),
}).then((res) => {
  if (res.includes("@freak") && res.includes("likes")) {
    console.log("🎉 Module 8.1 Task Passed! Next.js App Router typing verified.");
  }
});
