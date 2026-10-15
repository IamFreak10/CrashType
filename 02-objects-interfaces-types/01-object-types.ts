/**
 * ============================================================================
 * মডিউল ২.১: Object Types, Optional (`?`) ও Readonly
 * ============================================================================
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 02-objects-interfaces-types/01-object-types.ts
 */

// ১. বেসিক অবজেক্ট টাইপ
type UserProfile = {
  readonly id: string;       // readonly: একবার সেট করার পর আর পরিবর্তন করা যাবে না
  name: string;
  email: string;
  age?: number;              // optional (?): থাকতেও পারে, নাও থাকতে পারে
  preferences: {
    theme: "light" | "dark"; // Union of string literals
    notifications: boolean;
  };
};

const user1: UserProfile = {
  id: "usr_101",
  name: "IamFreak",
  email: "freak@example.com",
  // age দেওয়া হয়নি, কিন্তু কোনো এরর নেই কারণ age অপশনাল (?)
  preferences: {
    theme: "dark",
    notifications: true,
  },
};

// user1.id = "new_id"; // ❌ Compile Error: Cannot assign to 'id' because it is a read-only property.

// ২. Excess Property Checks (অতিরিক্ত প্রপার্টির কড়া পাহারা)
// সরাসরি অবজেক্ট লিটারাল পাস করলে TS কোনো বাড়তি ফিল্ড অনুমোদন করে না:
// const user2: UserProfile = { id: "2", name: "A", email: "a@a.com", extra: "hello" }; // ❌ Error!

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * একটি ব্লগ পোস্টের টাইপ ডিফাইন করুন যার নাম হবে `BlogPost`:
 * - id: readonly string
 * - title: string
 * - content: string
 * - tags: string array
 * - publishedAt: optional Date (Date | undefined)
 * - isFeatured: boolean
 */

// TODO: BlogPost টাইপ সম্পূর্ণ করুন
export type BlogPost = {
  readonly id: string;
  title: string;
  content: string;
  tags: string[];
  publishedAt?: Date;
  isFeatured: boolean;
};

// ভ্যালিডেশন চেক:
const samplePost: BlogPost = {
  id: "post_999",
  title: "Mastering TypeScript",
  content: "Deep dive into TypeScript for Nest.js & Next.js",
  tags: ["typescript", "backend", "fullstack"],
  isFeatured: true,
};

if (samplePost.id === "post_999" && samplePost.tags.length === 3) {
  console.log("🎉 Module 2.1 Task Passed! Object type properly defined.");
}
