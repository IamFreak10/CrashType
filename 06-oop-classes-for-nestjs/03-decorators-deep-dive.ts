/**
 * ============================================================================
 * মডিউল ৬.৩: Decorators Deep Dive (Nest.js-এর জাদু উন্মোচন)
 * ============================================================================
 * 
 * ডেকোরেটর কী?
 * Nest.js এ আপনি সারাদিন লিখবেন:
 * @Controller('posts')
 * @Get(':id')
 * @Injectable()
 * 
 * ভয় পাওয়ার কিছু নেই! ডেকোরেটর আসলে কিছুই না — এটি সাধারণ একটি জাভাস্ক্রিপ্ট ফাংশন
 * যা কোনো ক্লাস, মেথড বা প্রপার্টিকে র‍্যাপ করে বা তার ওপর কিছু মেটাডাটা বসিয়ে দেয়।
 * 
 * কিভাবে রান করবেন:
 * $ npx tsx 06-oop-classes-for-nestjs/03-decorators-deep-dive.ts
 */

// ১. Class Decorator
function Controller(baseRoute: string) {
  return function (target: Function) {
    // ক্লাসের প্রোটোটাইপে রুট পাথ যুক্ত করা হচ্ছে
    target.prototype.baseRoute = baseRoute;
    console.log(`[DECORATOR] Registered Controller with route: /${baseRoute}`);
  };
}

// ২. Method Decorator
function Get(subPath: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(`[DECORATOR] Registered GET /${subPath} -> Method: ${propertyKey}`);
    // মেথডের মূল আচরণও পরিবর্তন করা যায়:
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`Executing ${propertyKey}...`);
      return originalMethod.apply(this, args);
    };
  };
}

// এবার দেখুন কীভাবে Nest.js স্টাইলে ক্লাস তৈরি হয়:
@Controller("api/v1/posts")
class PostControllerSimulated {
  @Get("all")
  getPosts() {
    return ["Post A", "Post B"];
  }
}

const sim = new PostControllerSimulated();
console.log("Base Route:", (sim as any).baseRoute);
console.log("Result:", sim.getPosts());

// ============================================================================
// 🏋️‍♂️ প্র্যাকটিস সেশন (TODO)
// ============================================================================

/**
 * টাস্ক:
 * একটি মেথড ডেকোরেটর তৈরি করুন `LogExecutionTime`:
 * যা কোনো মেথড কল হওয়ার সময় `console.time(propertyKey)` এবং শেষ হলে `console.timeEnd(propertyKey)` কল করবে।
 */

// TODO: LogExecutionTime মেথড ডেকোরেটর তৈরি করুন
export function LogExecutionTime() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      console.time(propertyKey);
      const result = originalMethod.apply(this, args);
      console.timeEnd(propertyKey);
      return result;
    };

    return descriptor;
  };
}

class TestService {
  @LogExecutionTime()
  heavyCalculation() {
    let sum = 0;
    for (let i = 0; i < 100000; i++) sum += i;
    return sum;
  }
}

const testService = new TestService();
const calculatedSum = testService.heavyCalculation();

if (calculatedSum > 0) {
  console.log("🎉 Module 6.3 Task Passed! Decorator architecture fully understood.");
}
