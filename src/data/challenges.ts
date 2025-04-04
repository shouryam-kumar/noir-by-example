export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  concepts: {
    title: string;
    description: string;
    example: string;
    explanation: string;
  }[];
  initialCode: string;
  solution: string;
  hints: string[];
  examples: {
    input: string;
    output: string;
  }[];
}

export const challenges: Challenge[] = [
  {
    id: 'hello-world',
    title: 'Hello Noir!',
    description: 'Write your first Noir program that prints a message. This challenge introduces you to the basic structure of a Noir program.',
    difficulty: 'beginner',
    concepts: [
      {
        title: 'Program Structure',
        description: 'In Noir, every program starts with a main function. This is where your program begins execution. The main function is special because it\'s automatically called when your program runs.',
        example: `// A simple Noir program structure
fn main() {
    // Code inside the main function is executed when the program runs
    
    // You can declare variables
    let message = "Welcome to Noir!";
    
    // You can call other functions
    greet();
}

// Helper functions can be defined outside main
fn greet() {
    println!("Hello from a helper function!");
}`,
        explanation: 'The `fn` keyword tells Noir that we\'re defining a function. `main()` is the name of our function, and the curly braces `{}` contain the code that will run. Everything inside these braces is part of your program.'
      },
      {
        title: 'Printing to Console',
        description: 'To display text in Noir, we use the println! macro. This is how we show information to the user.',
        example: `// Different ways to use println!
println!("Basic message");

// Printing variables
let name = "Alice";
println!("Hello, {}", name);

// Multiple placeholders
let x = 10;
let y = 20;
println!("{} + {} = {}", x, y, x + y);

// Special formatting
println!("Decimal: {}, Binary: {:b}, Hex: {:x}", 42, 42, 42);`,
        explanation: 'The println! macro takes a string inside quotes and prints it to the console. The exclamation mark (!) tells Noir that this is a macro, which is a special kind of function in Noir. You can use {} as placeholders for values you want to insert into the output.'
      }
    ],
    initialCode: `fn main() {
    // Your code here
}`,
    solution: `fn main() {
    println!("Hello, Noir!");
}`,
    hints: [
      'Start by writing the main function',
      'Use println! to print your message',
      'Don\'t forget the exclamation mark after println',
      'Your message should be in quotes'
    ],
    examples: [
      {
        input: 'main()',
        output: 'Hello, Noir!',
      },
    ],
  },
  {
    id: 'variables',
    title: 'Variables and Types',
    description: 'Learn how to store and use data in Noir using variables.',
    difficulty: 'beginner',
    concepts: [
      {
        title: 'Variable Declaration',
        description: 'Variables in Noir are like containers that hold data. You need to tell Noir what type of data you\'re storing.',
        example: `// Basic variable declarations with different types
let age: u32 = 25;
let name: String = "Alice".to_string();
let is_student: bool = true;

// Variables are immutable by default
// If you need to change a variable's value, use mut
let mut score: u32 = 0;
score = 10; // This works because score is mutable

// Constants are always immutable and must have a type annotation
const MAX_SCORE: u32 = 100;

// Multiple variable declaration
let (x, y) = (10, 20);`,
        explanation: 'We use the `let` keyword to create a variable. After the variable name, we use a colon (:) to specify its type. The equals sign (=) assigns a value to the variable.'
      },
      {
        title: 'Common Types',
        description: 'Noir has several basic types for different kinds of data.',
        example: `// Integers (whole numbers)
let unsigned_small: u8 = 255;      // 0 to 255
let unsigned_standard: u32 = 1234; // 0 to 4,294,967,295
let unsigned_large: u64 = 123456789;

let signed_small: i8 = -128;      // -128 to 127
let signed_standard: i32 = -1234; // -2,147,483,648 to 2,147,483,647

// Floating point (decimal numbers)
let float_standard: f32 = 3.14;
let float_precise: f64 = 3.141592653589793;

// Boolean (true/false)
let is_active: bool = true;
let is_completed: bool = false;

// Characters and strings
let letter: char = 'A';
let message: String = "Hello, world!".to_string();`,
        explanation: 'Each type has a specific purpose. u32 is for counting things, i32 for numbers that can be negative, bool for yes/no questions, String for text, and f64 for precise decimal numbers.'
      }
    ],
    initialCode: `fn main() {
    // Create variables for a person's name and age
}`,
    solution: `fn main() {
    let name: String = "Alice".to_string();
    let age: u32 = 25;
    println!("{} is {} years old", name, age);
}`,
    hints: [
      'Use the let keyword to create variables',
      'Don\'t forget to specify the type after the colon',
      'Use println! to display the variables',
      'You can use {} in the string to insert variable values'
    ],
    examples: [
      {
        input: 'main()',
        output: 'Alice is 25 years old',
      },
    ],
  },
  {
    id: 'arithmetic',
    title: 'Basic Arithmetic',
    description: 'Learn how to perform calculations in Noir.',
    difficulty: 'beginner',
    concepts: [
      {
        title: 'Arithmetic Operators',
        description: 'Noir supports basic math operations like addition, subtraction, multiplication, and division.',
        example: `// Basic arithmetic operations
let a = 10;
let b = 3;

// Addition
let sum = a + b;      // 13

// Subtraction
let difference = a - b;  // 7

// Multiplication
let product = a * b;     // 30

// Division (integer division truncates the result)
let quotient = a / b;    // 3
let float_quotient = 10.0 / 3.0;  // 3.3333...

// Remainder (modulo)
let remainder = a % b;   // 1

// Compound assignment operators
let mut c = 5;
c += 2;  // c = c + 2, so c becomes 7
c -= 1;  // c = c - 1, so c becomes 6
c *= 2;  // c = c * 2, so c becomes 12
c /= 4;  // c = c / 4, so c becomes 3

// Order of operations follows standard math rules (PEMDAS)
let result = 5 + 3 * 2;  // 11, not 16
let with_parentheses = (5 + 3) * 2;  // 16`,
        explanation: 'The +, -, *, and / symbols work just like in math. The % symbol gives you the remainder after division. Noir follows the same order of operations as math (PEMDAS).'
      },
      {
        title: 'Type Safety',
        description: 'Noir ensures that your calculations are type-safe, meaning you can\'t mix different types of numbers.',
        example: `// Type safety in arithmetic
let x: u32 = 5;
let y: u32 = 3;
let result: u32 = x + y;  // This works

// Different integer types must be converted
let a: u8 = 10;
let b: u32 = 20;
// let c = a + b;  // Error: mismatched types
let c = a as u32 + b;  // Convert a to u32 before adding

// Working with different number types
let integer: i32 = 5;
let decimal: f64 = 2.5;
// let mixed = integer + decimal;  // Error: mismatched types
let mixed = integer as f64 + decimal;  // 7.5

// Handling potential overflow
let big_number: u8 = 250;
// let too_big = big_number + 10;  // Might cause overflow
let safely_added = big_number.checked_add(10);  // Returns None if overflow occurs`,
        explanation: 'When doing math in Noir, all numbers must be the same type. You can\'t add a whole number (u32) to a decimal number (f64) without converting one of them first.'
      }
    ],
    initialCode: `fn main() {
    let x: u32 = 10;
    let y: u32 = 5;
    // Calculate and print the sum, difference, product, and quotient
}`,
    solution: `fn main() {
    let x: u32 = 10;
    let y: u32 = 5;
    
    let sum = x + y;
    let difference = x - y;
    let product = x * y;
    let quotient = x / y;
    
    println!("Sum: {}", sum);
    println!("Difference: {}", difference);
    println!("Product: {}", product);
    println!("Quotient: {}", quotient);
}`,
    hints: [
      'Create variables to store each result',
      'Use the appropriate operators for each calculation',
      'Print each result using println!',
      'Remember that all numbers must be the same type'
    ],
    examples: [
      {
        input: 'main()',
        output: 'Sum: 15\nDifference: 5\nProduct: 50\nQuotient: 2',
      },
    ],
  },
  {
    id: 'control-flow',
    title: 'Control Flow',
    description: 'Learn how to make decisions in your Noir programs.',
    difficulty: 'intermediate',
    concepts: [
      {
        title: 'If Statements',
        description: 'If statements let your program make decisions based on conditions.',
        example: `// Basic if-else structure
let temperature = 25;

if temperature > 30 {
    println!("It's hot outside!");
} else if temperature > 20 {
    println!("It's nice outside!");
} else {
    println!("It's cold outside!");
}

// Multiple conditions with logical operators
let is_weekend = true;
let has_homework = false;

if is_weekend && !has_homework {
    println!("Let's go to the park!");
} else if is_weekend || !has_homework {
    println!("At least we have some free time.");
} else {
    println!("We need to study!");
}

// If statements as expressions
let status = if temperature > 30 { "hot" } else { "not hot" };
println!("It's {} today.", status);`,
        explanation: 'The if keyword checks if a condition is true. If it is, the code in the first block runs. If not, the code in the else block runs. The condition must be a boolean (true or false).'
      },
      {
        title: 'Comparison Operators',
        description: 'These operators help you compare values in your conditions.',
        example: `// Number comparisons
let x = 5;
let y = 10;

if x == y {
    println!("x equals y");
}

if x != y {
    println!("x does not equal y");
}

if x < y {
    println!("x is less than y");
}

if x > y {
    println!("x is greater than y");
}

if x <= y {
    println!("x is less than or equal to y");
}

if x >= y {
    println!("x is greater than or equal to y");
}

// String comparison
let name = "Alice";
if name == "Alice" {
    println!("Hello, Alice!");
}

// Logical operators for complex conditions
let a = true;
let b = false;

if a && b {  // AND: both must be true
    println!("Both a and b are true");
}

if a || b {  // OR: at least one must be true
    println!("Either a or b is true");
}

if !a {  // NOT: inverts the boolean
    println!("a is false");
}`,
        explanation: 'These operators compare two values and return true or false. They work with numbers, strings, and other types that can be compared.'
      }
    ],
    initialCode: `fn main() {
    let number: u32 = 7;
    // Check if the number is even or odd and print the result
}`,
    solution: `fn main() {
    let number: u32 = 7;
    if number % 2 == 0 {
        println!("{} is even", number);
    } else {
        println!("{} is odd", number);
    }
}`,
    hints: [
      'Use the modulo operator (%) to check for even/odd',
      'An even number has no remainder when divided by 2',
      'Use if-else to handle both cases',
      'Print the number along with whether it\'s even or odd'
    ],
    examples: [
      {
        input: 'main()',
        output: '7 is odd',
      },
      {
        input: 'let number: u32 = 4; main()',
        output: '4 is even',
      },
    ],
  },
  {
    id: 'functions',
    title: 'Functions',
    description: 'Learn how to define and use functions in Noir.',
    difficulty: 'intermediate',
    concepts: [
      {
        title: 'Function Definition',
        description: 'Functions in Noir are defined using the fn keyword, followed by the function name, parameters, and return type. Functions can take parameters and return values, making them reusable blocks of code.',
        example: `fn add(x: u32, y: u32) -> u32 {
    x + y
}

fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}`,
        explanation: 'The return type is specified after the arrow (->). The last expression in a function is automatically returned. Functions can take multiple parameters of different types and return any type. Noir supports both named and unnamed parameters.'
      },
      {
        title: 'Function Calls',
        description: 'Functions can be called by their name followed by arguments in parentheses. Noir supports both positional and named arguments, making function calls flexible and readable.',
        example: `let result = add(5, 3);
let greeting = greet("Noir");
println!("{}", result);
println!("{}", greeting);`,
        explanation: 'Function arguments must match the parameter types defined in the function signature. Noir performs type checking at compile time to ensure type safety. Functions can be called recursively, but be careful of stack overflow with deep recursion.'
      }
    ],
    initialCode: `fn main() {
    let a: u32 = 10;
    let b: u32 = 20;
    // Call the add function and print the result
}

// Define the add function here`,
    solution: `fn add(x: u32, y: u32) -> u32 {
    x + y
}

fn main() {
    let a: u32 = 10;
    let b: u32 = 20;
    let result = add(a, b);
    println!("The sum of {} and {} is: {}", a, b, result);
}`,
    hints: [
      'Define the add function before the main function',
      'Make sure to specify the return type of the add function',
      'Call the add function with the correct arguments',
      'Use the println! macro to display the result'
    ],
    examples: [
      {
        input: 'main()',
        output: 'The sum of 10 and 20 is: 30',
      },
    ],
  },
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'Learn about arrays and how to work with them in Noir.',
    difficulty: 'intermediate',
    concepts: [
      {
        title: 'Array Declaration',
        description: 'Arrays in Noir are fixed-size collections of elements of the same type. They are stored on the stack and have a known size at compile time, making them very efficient.',
        example: `let numbers: [u32; 5] = [1, 2, 3, 4, 5];
let zeros: [u32; 3] = [0; 3];
let words: [&str; 3] = ["hello", "world", "noir"];`,
        explanation: 'The type of an array is written as [T; N] where T is the element type and N is the length. Arrays are zero-indexed and have a fixed size that cannot be changed after creation. All elements must be of the same type.'
      },
      {
        title: 'Array Access',
        description: 'Array elements can be accessed using indexing. Noir performs bounds checking at runtime to prevent buffer overflows, making array access safe.',
        example: `let first = numbers[0];
let last = numbers[numbers.len() - 1];
let middle = numbers[2];`,
        explanation: 'Array indices start at 0. The len() method returns the length of the array. Attempting to access an index beyond the array bounds will result in a runtime error. Arrays can be iterated over using loops or iterator methods.'
      }
    ],
    initialCode: `fn main() {
    let numbers: [u32; 5] = [1, 2, 3, 4, 5];
    // Calculate the sum of all numbers in the array
}`,
    solution: `fn main() {
    let numbers: [u32; 5] = [1, 2, 3, 4, 5];
    let mut sum: u32 = 0;
    
    for i in 0..numbers.len() {
        sum += numbers[i];
    }
    
    println!("The sum is: {}", sum);
}`,
    hints: [
      'Use a for loop to iterate through the array',
      'Initialize a sum variable before the loop',
      'Add each element to the sum inside the loop',
      'Remember that arrays are zero-indexed'
    ],
    examples: [
      {
        input: 'main()',
        output: 'The sum is: 15',
      },
    ],
  },
  {
    id: 'structs',
    title: 'Structs',
    description: 'Learn how to define and use structs in Noir.',
    difficulty: 'intermediate',
    concepts: [
      {
        title: 'Struct Definition',
        description: 'Structs are custom data types that group related data together. They are similar to classes in other languages but without inheritance. Structs can have fields of different types.',
        example: `struct Point {
    x: u32,
    y: u32
}

struct Person {
    name: String,
    age: u32,
    is_student: bool
}`,
        explanation: 'Struct fields are defined with their types. Fields are accessed using dot notation. Structs can have methods defined using impl blocks. They are a fundamental building block for creating complex data structures.'
      },
      {
        title: 'Struct Instantiation',
        description: 'Structs can be created using struct literals. All fields must be initialized when creating a struct instance. Noir provides several ways to create and initialize structs.',
        example: `let point = Point { x: 5, y: 10 };
let person = Person {
    name: "Alice".to_string(),
    age: 25,
    is_student: true
};`,
        explanation: 'All fields must be initialized when creating a struct instance. Struct fields can be accessed and modified using dot notation. Structs can be passed to functions and returned from functions.'
      }
    ],
    initialCode: `struct Rectangle {
    width: u32,
    height: u32
}

fn main() {
    // Create a rectangle and calculate its area
}`,
    solution: `struct Rectangle {
    width: u32,
    height: u32
}

fn main() {
    let rect = Rectangle { width: 10, height: 20 };
    let area = rect.width * rect.height;
    println!("The area of the rectangle is: {}", area);
}`,
    hints: [
      'Create a Rectangle instance with width and height',
      'Calculate the area by multiplying width and height',
      'Use dot notation to access struct fields',
      'Print the result using println!'
    ],
    examples: [
      {
        input: 'main()',
        output: 'The area of the rectangle is: 200',
      },
    ],
  },
  {
    id: 'enums',
    title: 'Enums',
    description: 'Learn about enums and pattern matching in Noir.',
    difficulty: 'intermediate',
    concepts: [
      {
        title: 'Enum Definition',
        description: 'Enums are types that can have different variants. Each variant can optionally contain data. Enums are useful for representing a fixed set of possibilities and are a powerful tool for modeling domain concepts.',
        example: `enum Direction {
    North,
    South,
    East,
    West
}

enum Result<T, E> {
    Ok(T),
    Err(E)
}`,
        explanation: 'Each variant can optionally contain data. Enums are useful for representing a fixed set of possibilities. They are more powerful than enums in many other languages because they can carry data.'
      },
      {
        title: 'Pattern Matching',
        description: 'Pattern matching allows you to handle different enum variants. It\'s a powerful feature that helps you write clear and concise code for handling different cases.',
        example: `match direction {
    Direction::North => println!("Going north"),
    Direction::South => println!("Going south"),
    Direction::East => println!("Going east"),
    Direction::West => println!("Going west")
}`,
        explanation: 'The match expression must handle all possible variants of the enum. Pattern matching is exhaustive, meaning you must handle all possible cases. This helps prevent bugs by ensuring all cases are considered.'
      }
    ],
    initialCode: `enum TrafficLight {
    Red,
    Yellow,
    Green
}

fn main() {
    let light = TrafficLight::Red;
    // Use pattern matching to print the current state
}`,
    solution: `enum TrafficLight {
    Red,
    Yellow,
    Green
}

fn main() {
    let light = TrafficLight::Red;
    
    match light {
        TrafficLight::Red => println!("Stop!"),
        TrafficLight::Yellow => println!("Caution!"),
        TrafficLight::Green => println!("Go!")
    }
}`,
    hints: [
      'Use the match expression to handle each variant',
      'Make sure to handle all possible variants',
      'Print an appropriate message for each case',
      'Remember that match must be exhaustive'
    ],
    examples: [
      {
        input: 'main()',
        output: 'Stop!',
      },
    ],
  },
  {
    id: 'error-handling',
    title: 'Error Handling',
    description: 'Learn about error handling in Noir using Result and Option types.',
    difficulty: 'advanced',
    concepts: [
      {
        title: 'Result Type',
        description: 'Result is used for functions that can fail. It\'s a generic enum with two variants: Ok(T) for success and Err(E) for failure. This is Noir\'s primary way of handling errors.',
        example: `fn divide(a: u32, b: u32) -> Result<u32, String> {
    if b == 0 {
        Err("Division by zero".to_string())
    } else {
        Ok(a / b)
    }
}`,
        explanation: 'Result has two variants: Ok(T) for success and Err(E) for failure. The Result type forces you to handle both success and error cases, making your code more robust. It\'s a powerful tool for error handling.'
      },
      {
        title: 'Option Type',
        description: 'Option represents a value that might be present or absent. It\'s a generic enum with two variants: Some(T) for a value and None for absence. This is Noir\'s way of handling nullable values.',
        example: `fn find_first_even(numbers: &[u32]) -> Option<u32> {
    for &num in numbers {
        if num % 2 == 0 {
            return Some(num);
        }
    }
    None
}`,
        explanation: 'Option has two variants: Some(T) for a value and None for absence. The Option type forces you to handle both the presence and absence of a value, preventing null pointer exceptions.'
      }
    ],
    initialCode: `fn safe_divide(a: u32, b: u32) -> Result<u32, String> {
    // Implement safe division
}

fn main() {
    let result = safe_divide(10, 2);
    // Handle the result appropriately
}`,
    solution: `fn safe_divide(a: u32, b: u32) -> Result<u32, String> {
    if b == 0 {
        Err("Division by zero".to_string())
    } else {
        Ok(a / b)
    }
}

fn main() {
    let result = safe_divide(10, 2);
    
    match result {
        Ok(value) => println!("Result: {}", value),
        Err(error) => println!("Error: {}", error)
    }
}`,
    hints: [
      'Check for division by zero in safe_divide',
      'Return Ok with the result or Err with an error message',
      'Use pattern matching to handle both success and error cases',
      'Remember to handle both Ok and Err variants'
    ],
    examples: [
      {
        input: 'main()',
        output: 'Result: 5',
      },
      {
        input: 'let result = safe_divide(10, 0); main()',
        output: 'Error: Division by zero',
      },
    ],
  },
  {
    id: 'iterators',
    title: 'Iterators',
    description: 'Learn about iterators and common iterator methods in Noir.',
    difficulty: 'advanced',
    concepts: [
      {
        title: 'Iterator Basics',
        description: 'Iterators provide a way to process sequences of elements. They are lazy and only process elements when needed. This makes them very efficient for processing large or infinite sequences.',
        example: `let numbers = vec![1, 2, 3, 4, 5];
let sum: u32 = numbers.iter().sum();
let doubled: Vec<u32> = numbers.iter().map(|x| x * 2).collect();`,
        explanation: 'Iterators are lazy and only process elements when needed. Common methods include map, filter, and collect. They provide a functional programming style for processing collections.'
      },
      {
        title: 'Iterator Methods',
        description: 'Iterators provide many useful methods for processing data. These methods can be chained together to create complex transformations in a clear and concise way.',
        example: `let even_numbers: Vec<u32> = numbers
    .iter()
    .filter(|&x| x % 2 == 0)
    .map(|&x| x * 2)
    .collect();`,
        explanation: 'Methods can be chained together to create complex transformations. Each method returns a new iterator, allowing for method chaining. This style of programming is both expressive and efficient.'
      }
    ],
    initialCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // Use iterators to:
    // 1. Filter out odd numbers
    // 2. Square the remaining numbers
    // 3. Sum the results
}`,
    solution: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    let result: u32 = numbers
        .iter()
        .filter(|&x| x % 2 == 0)
        .map(|&x| x * x)
        .sum();
    
    println!("The result is: {}", result);
}`,
    hints: [
      'Use filter to keep only even numbers',
      'Use map to square each number',
      'Use sum to add up all the squared numbers',
      'Remember that iterators are lazy'
    ],
    examples: [
      {
        input: 'main()',
        output: 'The result is: 220',
      },
    ],
  },
  {
    id: 'closures',
    title: 'Closures',
    description: 'Learn about closures and their use in Noir.',
    difficulty: 'advanced',
    concepts: [
      {
        title: 'Closure Syntax',
        description: 'Closures are anonymous functions that can capture their environment. They are similar to lambda functions in other languages but with more powerful features.',
        example: `let add = |x, y| x + y;
let result = add(5, 3);

let multiply = |x: u32, y: u32| -> u32 {
    x * y
};`,
        explanation: 'Closures can infer their parameter and return types. They can capture variables from their surrounding scope. Closures are first-class citizens in Noir, meaning they can be passed as arguments and returned from functions.'
      },
      {
        title: 'Closure Types',
        description: 'Closures can be passed as arguments to functions. They implement one of three traits: Fn, FnMut, or FnOnce, depending on how they capture variables.',
        example: `fn apply<F>(f: F, x: u32, y: u32) -> u32
where
    F: Fn(u32, u32) -> u32
{
    f(x, y)
}`,
        explanation: 'The Fn trait is used to specify that a type is a closure. Closures can be generic over their captured variables. The three closure traits (Fn, FnMut, FnOnce) determine how the closure can use its captured variables.'
      }
    ],
    initialCode: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    // Create a closure that doubles a number
    // Use map to apply it to all numbers
}`,
    solution: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    
    let double = |x| x * 2;
    let doubled: Vec<u32> = numbers.iter().map(|&x| double(x)).collect();
    
    println!("Doubled numbers: {:?}", doubled);
}`,
    hints: [
      'Define a closure that takes a number and returns its double',
      'Use map to apply the closure to each element',
      'Collect the results into a new vector',
      'Remember that closures can capture their environment'
    ],
    examples: [
      {
        input: 'main()',
        output: 'Doubled numbers: [2, 4, 6, 8, 10]',
      },
    ],
  },
  {
    id: 'generics',
    title: 'Generics',
    description: 'Learn about generics and how to write generic code in Noir.',
    difficulty: 'advanced',
    concepts: [
      {
        title: 'Generic Functions',
        description: 'Generic functions allow you to write code that works with multiple types. They are defined using type parameters that are specified when the function is called.',
        example: `fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    
    largest
}`,
        explanation: 'The type parameter T is specified in angle brackets. The PartialOrd trait bound ensures that the type T can be compared. Generic functions allow you to write reusable code that works with different types.'
      },
      {
        title: 'Generic Structs',
        description: 'Structs can also be generic, allowing them to work with different types. This is useful for creating data structures that can hold any type of data.',
        example: `struct Point<T> {
    x: T,
    y: T
}

struct Pair<T, U> {
    first: T,
    second: U
}`,
        explanation: 'Generic structs can have multiple type parameters. The type parameters can be used in the struct\'s fields and methods. This allows for flexible and reusable data structures.'
      }
    ],
    initialCode: `struct Container<T> {
    value: T
}

impl<T> Container<T> {
    // Implement a new method that takes a value and returns a Container
}

fn main() {
    // Create a Container with a number and print its value
}`,
    solution: `struct Container<T> {
    value: T
}

impl<T> Container<T> {
    fn new(value: T) -> Self {
        Container { value }
    }
}

fn main() {
    let container = Container::new(42);
    println!("The value is: {}", container.value);
}`,
    hints: [
      'Implement the new method for Container',
      'Make sure to specify the generic type parameter',
      'Create a Container instance with a number',
      'Print the value using println!'
    ],
    examples: [
      {
        input: 'main()',
        output: 'The value is: 42',
      },
    ],
  },
  {
    id: 'traits',
    title: 'Traits',
    description: 'Learn about traits and how to use them in Noir.',
    difficulty: 'advanced',
    concepts: [
      {
        title: 'Trait Definition',
        description: 'Traits define shared behavior that types can implement. They are similar to interfaces in other languages but more powerful.',
        example: `trait Greet {
    fn greet(&self) -> String;
    
    fn greet_loudly(&self) -> String {
        self.greet().to_uppercase()
    }
}`,
        explanation: 'Traits can have both required and default methods. Required methods must be implemented by types that implement the trait. Default methods can be overridden but don\'t have to be.'
      },
      {
        title: 'Trait Implementation',
        description: 'Types can implement traits to provide specific behavior. A type can implement multiple traits.',
        example: `struct Person {
    name: String
}

impl Greet for Person {
    fn greet(&self) -> String {
        format!("Hello, {}!", self.name)
    }
}`,
        explanation: 'The impl keyword is used to implement traits for types. A type can implement multiple traits. Trait implementations can be generic, allowing for flexible code reuse.'
      }
    ],
    initialCode: `trait Area {
    fn area(&self) -> u32;
}

struct Square {
    side: u32
}

// Implement the Area trait for Square

fn main() {
    let square = Square { side: 5 };
    // Print the area of the square
}`,
    solution: `trait Area {
    fn area(&self) -> u32;
}

struct Square {
    side: u32
}

impl Area for Square {
    fn area(&self) -> u32 {
        self.side * self.side
    }
}

fn main() {
    let square = Square { side: 5 };
    println!("The area is: {}", square.area());
}`,
    hints: [
      'Implement the Area trait for Square',
      'Calculate the area by multiplying the side by itself',
      'Print the result using println!',
      'Remember to use the &self parameter in the area method'
    ],
    examples: [
      {
        input: 'main()',
        output: 'The area is: 25',
      },
    ],
  }
]; 