/**
 * ============================================================================
 * মডিউল ৬.১: Classes & Parameter Properties (Nest.js-এর সিনট্যাক্স)
 * ============================================================================
 * 
 * কেন এটি গুরুত্বপূর্ণ?
 * Nest.js এর প্রতিটি Controller, Service, Guard, Interceptor ক্লাসের ওপর ভিত্তি করে তৈরি।
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 06-oop-classes-for-nestjs/01-classes-and-modifiers.ts
 */

// ১. Access Modifiers:
// - public (ডিফল্ট): যে কেউ কল করতে পারে
// - private: শুধুমাত্র এই ক্লাসের ভেতর থেকে এক্সেসযোগ্য
// - protected: এই ক্লাস এবং ইনহেরিট করা চাইল্ড ক্লাসে এক্সেসযোগ্য
// - readonly: মান একবার ইনিশিয়ালাইজ হলে পরিবর্তন করা যায় না

// ২. Nest.js এর সবচেয়ে কমন সিনট্যাক্স: "Parameter Properties"
class PostService {
  findAll() {
    return ["Post 1", "Post 2"];
  }
}

export class PostController {
  // constructor প্যারামিটারে access modifier (private readonly) দিলে
  // TypeScript অটোমেটিক ফিল্ড ডিক্লেয়ার ও ইনিশিয়ালাইজ করে দেয়!
  constructor(private readonly postService: PostService) {}

  getPosts() {
    return this.postService.findAll();
  }
}

const service = new PostService();
const controller = new PostController(service);
console.log(controller.getPosts());

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * একটি ক্লাস তৈরি করুন `BankAccount`:
 * - constructor-এ parameter property হিসেবে থাকবে:
 *   - `public readonly accountNumber: string`
 *   - `private balance: number`
 * - মেথড ১: `deposit(amount: number): void` (balance বৃদ্ধি করবে)
 * - মেথড ২: `getBalance(): number` (কারেন্ট ব্যালেন্স রিটার্ন করবে)
 * - মেথড ৩: `withdraw(amount: number): boolean` (যদি balance >= amount হয় তবে বিয়োগ করবে এবং true দেবে, অন্যথায় false)
 */

// TODO: BankAccount ক্লাসটি তৈরি করুন
export class BankAccount {
  constructor(
    public readonly accountNumber: string,
    private balance: number
  ) {}

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  getBalance(): number {
    return this.balance;
  }

  withdraw(amount: number): boolean {
    if (this.balance >= amount && amount > 0) {
      this.balance -= amount;
      return true;
    }
    return false;
  }
}

// টেস্ট:
const account = new BankAccount("AC_9988", 1000);
account.deposit(500);
const success = account.withdraw(300);
const fail = account.withdraw(2000);

if (account.getBalance() === 1200 && success && !fail) {
  console.log("🎉 Module 6.1 Task Passed! Parameter properties & encapsulation mastered.");
}
