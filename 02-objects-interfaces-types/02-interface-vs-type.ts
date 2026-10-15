/**
 * ============================================================================
 * মডিউল ২.২: Interface vs Type Alias — কোনটি কখন?
 * ============================================================================
 * 
 * সংক্ষেপে পার্থক্য:
 * - Type: Union (|), Primitives, Tuples, এবং Zod inference এর জন্য পারফেক্ট।
 * - Interface: OOP, Class contract, এবং Declaration Merging (Express req.user) এর জন্য পারফেক্ট।
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 02-objects-interfaces-types/02-interface-vs-type.ts
 */

// ১. Inheritance (উত্তরাধিকার)
// Interface এ 'extends' ব্যবহার করা হয় (Nest.js স্টাইল):
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserEntity extends BaseEntity {
  name: string;
  email: string;
}

// Type এ ইন্টারসেকশন (&) ব্যবহার করা হয় (Next.js স্টাইল):
type Identifiable = {
  id: string;
};

type Auditable = {
  createdAt: Date;
};

type Product = Identifiable & Auditable & {
  title: string;
  price: number;
};

// ২. Declaration Merging (Express Request এর টাইপ বাড়ানোর ম্যাজিক)
// Express-এ auth middleware এ `req.user = decoded` লিখলে TS সাধারণত এরর দেয়।
// Interface এর ডিক্লেয়ারেশন মার্জিং ক্ষমতা দিয়ে এটি ফিক্স করা যায়:
interface ExpressCustomRequest {
  path: string;
  method: string;
}

// একই নামের ইন্টারফেস পুনরায় ডিক্লেয়ার করলে তারা মার্জ হয়ে যায়:
interface ExpressCustomRequest {
  user?: {
    id: string;
    role: "ADMIN" | "USER";
  };
}

const mockReq: ExpressCustomRequest = {
  path: "/api/posts",
  method: "POST",
  user: { id: "u_1", role: "ADMIN" },
};

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * একটি BaseResponse ইন্টারফেস তৈরি করুন যাতে থাকবে:
 * - success: boolean
 * - timestamp: number
 * 
 * এবার `PaginatedResponse` নামের একটি ইন্টারফেস তৈরি করুন যা `BaseResponse` কে extend করবে এবং থাকবে:
 * - total: number
 * - page: number
 * - limit: number
 */

// TODO: BaseResponse ইন্টারফেস ডিফাইন করুন
export interface BaseResponse {
  success: boolean;
  timestamp: number;
}

// TODO: PaginatedResponse তৈরি করুন যা BaseResponse কে extend করবে
export interface PaginatedResponse extends BaseResponse {
  total: number;
  page: number;
  limit: number;
}

// টেস্ট:
const res: PaginatedResponse = {
  success: true,
  timestamp: Date.now(),
  total: 50,
  page: 1,
  limit: 10,
};

if (res.success && res.total === 50) {
  console.log("🎉 Module 2.2 Task Passed! Interface extension working properly.");
}
