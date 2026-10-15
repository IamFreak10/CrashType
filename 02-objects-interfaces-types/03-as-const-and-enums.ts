/**
 * ============================================================================
 * মডিউল ২.৩: Enums vs `as const` Objects
 * ============================================================================
 *
 * বিতর্ক:
 * - TypeScript-এর 'enum' জাভাস্ক্রিপ্ট কোডে বাড়তি কোড জেনারেট করে।
 * - আধুনিক Next.js / TypeScript কমিউনিটি 'as const' অবজেক্ট বেশি পছন্দ করে।
 * - তবে Nest.js এবং Prisma-তে String Enum এখনো স্ট্যান্ডার্ড (`@IsEnum(PostStatus)`)।
 *
 * কিভাবে রান করবেন:
 * $ npx tsx 02-objects-interfaces-types/03-as-const-and-enums.ts
 */

// ১. String Enum (Nest.js & Prisma এর জন্য প্রয়োজন)
export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

function updateOrderStatus(status: OrderStatus) {
  console.log(`Order status updated to: ${status}`);
}

updateOrderStatus(OrderStatus.SHIPPED);

// ২. 'as const' Object Pattern (Next.js & Frontend এর জন্য আধুনিক সেরা উপায়)
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
} as const;

// এর থেকে টাইপ বের করার ফর্মুলা:
export type HttpStatusCode = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];
// HttpStatusCode এর টাইপ: 200 | 201 | 400 | 401 | 404 | 500

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * একটি 'as const' অবজেক্ট তৈরি করুন যার নাম `ROLES`:
 * - ADMIN: 'admin'
 * - AUTHOR: 'author'
 * - READER: 'reader'
 *
 * তারপর `typeof` এবং `keyof` ব্যবহার করে একটি টাইপ `AppRole` তৈরি করুন
 * যার টাইপ হবে: 'admin' | 'author' | 'reader'
 */

// TODO: ROLES অবজেক্ট তৈরি করুন 'as const' দিয়ে
export const ROLES = {
  ADMIN: 'admin',
  AUTHOR: 'author',
  READER: 'reader',
} as const;

// TODO: AppRole টাইপ বের করুন
export type AppRole = (typeof ROLES)[keyof typeof ROLES];

// ভ্যালিডেশন চেক:
const myRole: AppRole = 'admin';
// const invalidRole: AppRole = "superadmin"; // ❌ দিলে টাইপ এরর আসবে

if (ROLES.ADMIN === 'admin' && myRole === 'admin') {
  console.log(
    "🎉 Module 2.3 Task Passed! 'as const' type extraction successful."
  );
}
