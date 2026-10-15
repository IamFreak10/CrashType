/**
 * ============================================================================
 * মডিউল ৩.৩: Discriminated Unions (Tagged Unions)
 * ============================================================================
 * 
 * এটি আধুনিক TypeScript-এর সবচেয়ে পাওয়ারফুল ডিজাইন প্যাটার্ন।
 * React / Next.js State Management এবং Redux Toolkit-এ এটি জাদুর মতো কাজ করে।
 * 
 * বৈশিষ্ট্য:
 * - প্রতিটা অবজেক্ট টাইপে একটি কমন 'literal' ফিল্ড (যেমন: `type`, `kind`, বা `status`) থাকে।
 * - switch বা if দিয়ে ওই ফিল্ড চেক করলেই TS অবজেক্টের বাকি ফিল্ডগুলো নিজে থেকে ন্যারো করে নেয়।
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 03-unions-and-type-narrowing/03-discriminated-unions.ts
 */

// রিয়েল-ওয়ার্ল্ড Next.js Server Action / API Result টাইপ:
export type AsyncResult<T> =
  | { status: "IDLE" }
  | { status: "PENDING" }
  | { status: "SUCCESS"; data: T }
  | { status: "ERROR"; error: string; code: number };

export function handleUserFetch(result: AsyncResult<{ name: string; email: string }>) {
  switch (result.status) {
    case "IDLE":
      return "Ready to fetch";
    case "PENDING":
      return "Fetching user data...";
    case "SUCCESS":
      // TS জানে status === "SUCCESS" মানে এখানে result.data অবশ্যই বিদ্যমান!
      return `Welcome, ${result.data.name} (${result.data.email})`;
    case "ERROR":
      // TS জানে status === "ERROR" মানে এখানে error এবং code বিদ্যমান!
      return `Failed [${result.code}]: ${result.error}`;
  }
}

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * ই-কমার্স পেমেন্ট গেটওয়ের জন্য একটি Discriminated Union তৈরি করুন: `PaymentMethod`:
 * ১. `method: 'BKASH'`:
 *    - phoneNumber: string
 *    - trxId: string
 * ২. `method: 'STRIPE'`:
 *    - cardLast4: string
 *    - clientSecret: string
 * ৩. `method: 'COD'` (Cash on delivery):
 *    - deliveryAddress: string
 * 
 * এরপর `getPaymentSummary` ফাংশনটি সম্পূর্ণ করুন যা পেমেন্টের বিস্তারিত সামারি টেক্সট দেবে।
 */

// TODO: PaymentMethod Discriminated Union টি ডিফাইন করুন
export type PaymentMethod =
  | { method: "BKASH"; phoneNumber: string; trxId: string }
  | { method: "STRIPE"; cardLast4: string; clientSecret: string }
  | { method: "COD"; deliveryAddress: string };

export function getPaymentSummary(payment: PaymentMethod): string {
  // TODO: switch (payment.method) দিয়ে প্রতিটি কেস হ্যান্ডেল করুন
  switch (payment.method) {
    case "BKASH":
      return `Bkash payment from ${payment.phoneNumber} (TrxID: ${payment.trxId})`;
    case "STRIPE":
      return `Card ending in ${payment.cardLast4}`;
    case "COD":
      return `Cash on delivery to: ${payment.deliveryAddress}`;
  }
}

// টেস্ট:
const p1 = getPaymentSummary({ method: "BKASH", phoneNumber: "01700000000", trxId: "TRX_999" });
const p2 = getPaymentSummary({ method: "STRIPE", cardLast4: "4242", clientSecret: "sec_123" });
const p3 = getPaymentSummary({ method: "COD", deliveryAddress: "Dhaka, Bangladesh" });

if (
  p1.includes("Bkash") &&
  p2.includes("4242") &&
  p3.includes("Dhaka")
) {
  console.log("🎉 Module 3.3 Task Passed! Discriminated Union implemented with 100% type safety.");
}
