/**
 * ============================================================================
 * মডিউল ৭.২: Record<Keys, Values> & Mapped Types
 * ============================================================================
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 07-utility-types-cheatcodes/02-record-and-mapping.ts
 */

// ১. Record<Keys, Values>
// ডাইনামিক কি-ভ্যালু ডিকশনারি বা অবজেক্টের জন্য:
type Role = "ADMIN" | "USER" | "GUEST";
type RolePermissions = Record<Role, string[]>;

const permissions: RolePermissions = {
  ADMIN: ["all"],
  USER: ["read", "write"],
  GUEST: ["read"],
  // কোনো Role মিসিং থাকলে TS এরর দেবে!
};

// ২. Mapped Types (লুপ চালিয়ে নতুন টাইপ তৈরি করা)
// [K in keyof T] সিনট্যাক্স দিয়ে টাইপের প্রতিটি ফিল্ড মডিফাই করা যায়:
type User = {
  name: string;
  age: number;
};

// একটি কাস্টম 'Nullable' ম্যাপড টাইপ যা সব ফিল্ডকে null সাপোর্ট করাবে:
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
// { name: string | null; age: number | null }

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * একটি ই-কমার্স স্ট্যাটাস ডিকশনারি টাইপ তৈরি করুন `OrderStatusMessages`:
 * কিগুলো হবে: "PENDING" | "SHIPPED" | "DELIVERED"
 * ভ্যালু হবে: string (স্ট্যাটাস মেসেজ)
 * 
 * `Record` ব্যবহার করে টাইপ এবং কনস্ট্যান্ট তৈরি করুন।
 */

export type OrderState = "PENDING" | "SHIPPED" | "DELIVERED";

// TODO: Record ব্যবহার করে OrderStatusMessages টাইপ বানান
export type OrderStatusMessages = Record<OrderState, string>;

export const statusMessages: OrderStatusMessages = {
  PENDING: "Your order is being reviewed.",
  SHIPPED: "Your order is on the way.",
  DELIVERED: "Your order has been delivered successfully.",
};

if (statusMessages.SHIPPED.includes("on the way")) {
  console.log("🎉 Module 7.2 Task Passed! Record utility type working.");
}
