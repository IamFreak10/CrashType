/**
 * ============================================================================
 * মডিউল ৬.২: Abstract Classes vs Interfaces (Nest.js Dependency Injection)
 * ============================================================================
 * 
 * কেন Nest.js-এ Abstract Class এত গুরুত্বপূর্ণ?
 * ১. TypeScript Interface রানটাইমে কম্পাইল হয়ে মুছে যায় (0 bytes in JS)।
 *    তাই Nest.js IoC Container ইন্টারফেসকে টোকেন হিসেবে চিনতে পারে না!
 * ২. Abstract Class রানটাইমে একটি আসল জাভাস্ক্রিপ্ট ক্লাস/ফাংশন হিসেবে বিদ্যমান থাকে,
 *    তাই একে Dependency Injection Token হিসেবে ইনজেক্ট করা যায়!
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 06-oop-classes-for-nestjs/02-inheritance-and-abstract.ts
 */

export interface Post {
  id: string;
  title: string;
}

// ১. Abstract Class ডিফাইন করা (The Contract)
export abstract class PostDatabaseService {
  abstract save(post: Post): Promise<Post>;
  abstract findOne(id: string): Promise<Post | null>;

  // কনক্রিট (কমন) মেথডও অ্যাবস্ট্রাক্ট ক্লাসে রাখা যায়:
  logOperation(op: string) {
    console.log(`[DB OPERATION] ${op} at ${new Date().toISOString()}`);
  }
}

// ২. Prisma ইমপ্লিমেন্টেশন
export class PrismaPostService extends PostDatabaseService {
  private db: Post[] = [];

  async save(post: Post): Promise<Post> {
    this.logOperation(`Saving post ${post.id}`);
    this.db.push(post);
    return post;
  }

  async findOne(id: string): Promise<Post | null> {
    this.logOperation(`Finding post ${id}`);
    return this.db.find((p) => p.id === id) || null;
  }
}

// ৩. টেস্টিং বা মকিং-এর জন্য আলাদা ইমপ্লিমেন্টেশন
export class MockPostService extends PostDatabaseService {
  async save(post: Post): Promise<Post> {
    return post;
  }
  async findOne(id: string): Promise<Post | null> {
    return { id, title: "Mock Post" };
  }
}

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * Nest.js `CanActivate` (Auth Guard) ইন্টারফেস তৈরি করুন:
 * 
 * interface CanActivate {
 *   canActivate(context: { userId?: string; role?: string }): boolean;
 * }
 * 
 * এরপর `AdminGuard` ক্লাস তৈরি করুন যা `CanActivate` ইন্টারফেসকে `implements` করবে:
 * - যদি context.role === "ADMIN" হয় তবে true রিটার্ন করবে, অন্যথায় false
 */

export interface CanActivate {
  canActivate(context: { userId?: string; role?: string }): boolean;
}

// TODO: AdminGuard ক্লাস তৈরি করুন
export class AdminGuard implements CanActivate {
  canActivate(context: { userId?: string; role?: string }): boolean {
    return context.role === "ADMIN";
  }
}

// টেস্ট:
const guard = new AdminGuard();
const allowed = guard.canActivate({ userId: "u1", role: "ADMIN" });
const blocked = guard.canActivate({ userId: "u2", role: "USER" });

if (allowed && !blocked) {
  console.log("🎉 Module 6.2 Task Passed! Abstract classes & Guard interfaces working.");
}
