/**
 * ============================================================================
 * মডিউল ৭.৩: ReturnType<T> ও Awaited<T> (Next.js & Prisma সুপারপাওয়ার)
 * ============================================================================
 * 
 * কেন এটি আপনার জীবন সহজ করে দেবে?
 * Prisma-তে যখন আপনি জটিল কুয়েরি করেন (যেমন: পোস্টের সাথে লেখক এবং কমেন্ট include করা),
 * তখন সেই জটিল অবজেক্টের জন্য নতুন ইন্টারফেস ম্যানুয়ালি লেখা চরম সময়সাপেক্ষ।
 * 
 * সমাধান:
 * Prisma ফাংশন যা রিটার্ন করে, `Awaited<ReturnType<typeof myFunction>>` দিয়ে
 * স্বয়ংক্রিয়ভাবে সেই টাইপটি এক্সট্রাক্ট করে নিন!
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 07-utility-types-cheatcodes/03-awaited-and-return-type.ts
 */

// ১. একটি অ্যাসিঙ্ক সার্ভিস ফাংশন (Prisma বা DB Query অনুকরণ)
async function fetchPostWithRelations(postId: string) {
  return {
    id: postId,
    title: "TypeScript Deep Dive",
    author: {
      id: "u_99",
      name: "IamFreak",
      email: "freak@dev.com",
    },
    comments: [
      { id: "c_1", text: "Awesome guide!", likes: 5 },
      { id: "c_2", text: "Nest.js makes sense now", likes: 12 },
    ],
  };
}

// ২. Awaited এবং ReturnType দিয়ে টাইপ এক্সট্রাকশন:
// ReturnType<typeof fetchPostWithRelations> -> Promise<{ id: string, ... }>
// Awaited<...> -> প্রমিজ খুলে ভেতরের আসল অবজেক্ট টাইপটি বের করে আনে!
export type PostDetail = Awaited<ReturnType<typeof fetchPostWithRelations>>;

// এখন এই PostDetail টাইপটি Next.js React Component এ Props হিসেবে ব্যবহার করুন:
function renderPostUI(post: PostDetail) {
  console.log(`Title: ${post.title}`);
  console.log(`Author: ${post.author.name}`);
  console.log(`Total Comments: ${post.comments.length}`);
}

// ৩. Parameters<T> (ফাংশনের প্যারামিটারের টাইপ এক্সট্রাক্ট করা)
type FetchPostParams = Parameters<typeof fetchPostWithRelations>; // [postId: string]

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * নিচে একটি ফাংশন রয়েছে `getUserCart`:
 * 
 * async function getUserCart(userId: string) {
 *   return {
 *     cartId: "cart_123",
 *     items: [{ productId: "p1", quantity: 2, price: 50 }],
 *     totalAmount: 100,
 *   };
 * }
 * 
 * `Awaited` এবং `ReturnType` ব্যবহার করে `CartResponse` টাইপটি এক্সট্রাক্ট করুন।
 */

async function getUserCart(userId: string) {
  return {
    cartId: "cart_123",
    items: [{ productId: "p1", quantity: 2, price: 50 }],
    totalAmount: 100,
  };
}

// TODO: CartResponse টাইপ এক্সট্রাক্ট করুন
export type CartResponse = Awaited<ReturnType<typeof getUserCart>>;

// টেস্ট:
const sampleCart: CartResponse = {
  cartId: "cart_123",
  items: [{ productId: "p1", quantity: 2, price: 50 }],
  totalAmount: 100,
};

if (sampleCart.items[0].price === 50) {
  console.log("🎉 Module 7.3 Task Passed! Awaited<ReturnType<...>> mastered.");
}
