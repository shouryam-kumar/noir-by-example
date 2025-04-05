export interface Concept {
  title: string;
  description: string;
  example: string;
  explanation: string;
}

export interface Example {
  input: string;
  output: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  initialCode: string;
  solution: string;
  concepts: Concept[];
  hints: string[];
  examples?: Example[];
}

export const challenges: Challenge[] = [
  {
    id: 'hello-noir',
    title: 'Hello Noir!',
    description: 'Get started with Noir by writing your first program that returns a simple value.',
    difficulty: 'beginner',
    initialCode: 'fn main() {\n    // Your code here\n}',
    solution: 'fn main() {\n    42\n}',
    concepts: [
      {
        title: 'Program Structure',
        description: 'Every Noir program starts with a main function that serves as the entry point.',
        example: 'fn main() {\n    // Your code goes here\n}',
        explanation: 'The main function is where your program begins execution. In Noir, functions are defined using the `fn` keyword followed by the function name and parameters in parentheses.'
      },
      {
        title: 'Return Values',
        description: 'Noir functions can return values explicitly or implicitly.',
        example: 'fn get_value() -> Field {\n    return 42;\n}\n\nfn implicit_return() -> Field {\n    42 // No semicolon means this is returned\n}',
        explanation: 'The last expression in a function body is implicitly returned if it doesn\'t end with a semicolon. You can also use the `return` keyword to explicitly return a value.'
      }
    ],
    hints: [
      'The main function needs to return a value',
      'Try returning the integer 42',
      'In Noir, you can return a value by simply writing it as the last expression (without a semicolon)'
    ]
  },
  {
    id: 'basic-arithmetic',
    title: 'Basic Arithmetic',
    description: 'Learn to perform basic arithmetic operations in Noir.',
    difficulty: 'beginner',
    initialCode: 'fn main() {\n    let x = 5;\n    let y = 7;\n    \n    // Calculate the sum of x and y, then multiply by 2\n    // Your code here\n}',
    solution: 'fn main() {\n    let x = 5;\n    let y = 7;\n    \n    // Calculate the sum of x and y, then multiply by 2\n    (x + y) * 2\n}',
    concepts: [
      {
        title: 'Variables',
        description: 'Variables in Noir are created using the `let` keyword and are immutable by default.',
        example: 'let x = 5;\nlet name = "Noir";',
        explanation: 'Variables store values that can be used throughout your program. By default, Noir variables are immutable, meaning they cannot be changed after creation.'
      },
      {
        title: 'Data Types',
        description: 'Noir has several built-in types including Field (for field elements), u8, u16, u32, u64 (for unsigned integers), and bool.',
        example: 'let field_value: Field = 42;\nlet unsigned_byte: u8 = 255;\nlet condition: bool = true;',
        explanation: 'Types can be explicitly annotated with a colon followed by the type name, though Noir can often infer the type from the context.'
      },
      {
        title: 'Arithmetic Operations',
        description: 'Noir supports standard arithmetic operations: addition, subtraction, multiplication, division, and modulo.',
        example: 'let sum = a + b;\nlet difference = a - b;\nlet product = a * b;\nlet quotient = a / b;\nlet remainder = a % b;',
        explanation: 'These operators work as expected with numeric types. Note that division by zero will result in an error.'
      }
    ],
    hints: [
      'Use the + operator to add x and y',
      'Use the * operator to multiply the sum by 2',
      'You can write the whole calculation as a single expression'
    ]
  },
  {
    id: 'control-flow',
    title: 'Control Flow',
    description: 'Learn to use if statements and comparison operators in Noir.',
    difficulty: 'beginner',
    initialCode: 'fn main(x: Field, y: Field) -> Field {\n    // Return the larger of x and y\n    // Your code here\n}',
    solution: 'fn main(x: Field, y: Field) -> Field {\n    // Return the larger of x and y\n    if x > y {\n        x\n    } else {\n        y\n    }\n}',
    concepts: [
      {
        title: 'Function Parameters',
        description: 'Functions can accept parameters, which are specified in the function signature.',
        example: 'fn add(a: Field, b: Field) -> Field {\n    a + b\n}',
        explanation: 'Parameters are listed inside the parentheses after the function name, with each parameter followed by its type. The return type is specified after the -> symbol.'
      },
      {
        title: 'Conditional Statements',
        description: 'Noir uses if, else if, and else for conditional execution of code.',
        example: 'if condition {\n    // Code to execute if condition is true\n} else if other_condition {\n    // Code to execute if other_condition is true\n} else {\n    // Code to execute if all conditions are false\n}',
        explanation: 'The if statement evaluates a boolean condition and executes a block of code if the condition is true. You can chain multiple conditions using else if, and provide a fallback using else.'
      },
      {
        title: 'Comparison Operators',
        description: 'Noir provides several operators for comparing values: ==, !=, <, >, <=, >=.',
        example: 'x == y  // Equal to\nx != y  // Not equal to\nx < y   // Less than\nx > y   // Greater than\nx <= y  // Less than or equal to\nx >= y  // Greater than or equal to',
        explanation: 'These operators return a boolean value (true or false) based on the comparison result, which can be used in conditional statements.'
      }
    ],
    hints: [
      'Use an if statement to check which value is larger',
      'The condition should compare x and y using the > operator',
      'Return the larger value in each branch of the if statement'
    ]
  },
  {
    id: 'loops-and-arrays',
    title: 'Loops and Arrays',
    description: 'Learn to work with arrays and loops to process multiple values.',
    difficulty: 'intermediate',
    initialCode: 'fn main(values: [Field; 5]) -> Field {\n    // Calculate the sum of all values in the array\n    // Your code here\n}',
    solution: 'fn main(values: [Field; 5]) -> Field {\n    // Calculate the sum of all values in the array\n    let mut sum = 0;\n    \n    for i in 0..5 {\n        sum += values[i];\n    }\n    \n    sum\n}',
    concepts: [
      {
        title: 'Arrays',
        description: 'Noir supports fixed-size arrays of any type.',
        example: 'let numbers: [Field; 3] = [1, 2, 3];\nlet first_element = numbers[0]; // Arrays are zero-indexed',
        explanation: 'Arrays are declared with square brackets containing the type and size. Elements can be accessed using indexing with square brackets.'
      },
      {
        title: 'Mutable Variables',
        description: 'Variables can be made mutable using the `mut` keyword.',
        example: 'let mut counter = 0;\ncounter += 1; // This works because counter is mutable',
        explanation: 'By default, variables in Noir are immutable. The `mut` keyword allows you to create variables whose values can be changed.'
      },
      {
        title: 'For Loops',
        description: 'For loops iterate over a range of values.',
        example: 'for i in 0..5 {\n    // This block will execute 5 times, with i taking values 0, 1, 2, 3, 4\n}',
        explanation: 'The range expression start..end creates a range from start (inclusive) to end (exclusive). The loop variable i takes each value in the range in sequence.'
      },
      {
        title: 'Compound Assignment Operators',
        description: 'Noir provides shorthand operators for updating variables: +=, -=, *=, /=.',
        example: 'let mut x = 5;\nx += 3; // Equivalent to x = x + 3\nx *= 2; // Equivalent to x = x * 2',
        explanation: 'These operators combine an arithmetic operation with assignment, providing a concise way to update variables.'
      }
    ],
    hints: [
      'Use a mutable variable to store the running sum',
      'Use a for loop to iterate through the array elements',
      'Access each array element using indexing: values[i]',
      'Add each element to the running sum using the += operator'
    ]
  },
  {
    id: 'functions-and-constraints',
    title: 'Functions and Constraints',
    description: 'Learn how to use functions and constrain values in Noir.',
    difficulty: 'intermediate',
    initialCode: 'fn is_even(x: Field) -> bool {\n    // Your code here\n}\n\nfn main(number: Field) {\n    // Constrain the input to be an even number\n    // Your code here\n}',
    solution: 'fn is_even(x: Field) -> bool {\n    x % 2 == 0\n}\n\nfn main(number: Field) {\n    // Constrain the input to be an even number\n    constrain(is_even(number));\n}',
    concepts: [
      {
        title: 'Function Composition',
        description: 'Functions can call other functions to build more complex behavior.',
        example: 'fn double(x: Field) -> Field {\n    x * 2\n}\n\nfn quadruple(x: Field) -> Field {\n    double(double(x))\n}',
        explanation: 'Breaking code into functions helps with reusability and organization. You can compose functions by using the return value of one function as an input to another.'
      },
      {
        title: 'Boolean Operations',
        description: 'Noir supports standard boolean operations: &&, ||, and !.',
        example: 'let a = true;\nlet b = false;\nlet result1 = a && b;  // Logical AND: false\nlet result2 = a || b;  // Logical OR: true\nlet result3 = !a;     // Logical NOT: false',
        explanation: 'These operators work with boolean values and expressions. They can be combined to create complex conditions.'
      },
      {
        title: 'Constraints',
        description: 'Constraints are used to enforce conditions within a zero-knowledge proof.',
        example: 'fn main(x: Field, y: Field) {\n    constrain(x < y);  // Enforces that x must be less than y\n}',
        explanation: 'The constrain function takes a boolean condition and enforces that it must be true. If the condition is false, the program will fail, and the proof will not be generated.'
      }
    ],
    hints: [
      'Use the modulo operator (%) to check if a number is even',
      'A number is even if the remainder when divided by 2 is 0',
      'Use the constrain function to enforce the condition'
    ]
  },
  {
    id: 'hash-functions',
    title: 'Hash Functions',
    description: 'Learn to use cryptographic primitives in Noir.',
    difficulty: 'intermediate',
    initialCode: 'fn main(preimage: [u8; 32], hash: [u8; 32]) {\n    // Verify that hash is the Pedersen hash of preimage\n    // Your code here\n}',
    solution: 'fn main(preimage: [u8; 32], hash: [u8; 32]) {\n    // Verify that hash is the Pedersen hash of preimage\n    let computed_hash = std::hash::pedersen(preimage);\n    \n    for i in 0..32 {\n        constrain(computed_hash[i] == hash[i]);\n    }\n}',
    concepts: [
      {
        title: 'Cryptographic Primitives',
        description: 'Noir provides built-in functions for cryptographic operations like hashing.',
        example: 'let message = [1, 2, 3, 4];\nlet hashed = std::hash::pedersen(message);',
        explanation: 'Cryptographic primitives are essential for zero-knowledge proofs. Noir provides several hash functions in the std::hash module.'
      },
      {
        title: 'Pedersen Hash',
        description: 'The Pedersen hash is a commitment scheme commonly used in zero-knowledge applications.',
        example: 'let commitment = std::hash::pedersen([message, randomness]);\n',
        explanation: 'The Pedersen hash provides a binding and hiding commitment. It allows you to commit to a value without revealing it, and later prove properties about that value.'
      },
      {
        title: 'Array Equality',
        description: 'Arrays can be compared element by element using a loop.',
        example: 'let a = [1, 2, 3];\nlet b = [1, 2, 3];\nlet mut equal = true;\nfor i in 0..3 {\n    if a[i] != b[i] {\n        equal = false;\n    }\n}',
        explanation: 'Since arrays can\'t be directly compared with ==, you need to compare each element individually.'
      }
    ],
    hints: [
      'Use std::hash::pedersen() to compute the hash of the preimage',
      'Compare each byte of the computed hash with the provided hash',
      'Use a for loop to iterate through all 32 bytes',
      'Use constrain to enforce equality of each byte'
    ]
  },
  {
    id: 'merkle-proofs',
    title: 'Merkle Tree Proofs',
    description: 'Implement Merkle tree verification in Noir.',
    difficulty: 'advanced',
    initialCode: 'fn main(leaf: Field, index: Field, hash_path: [Field; 3], root: Field) {\n    // Verify that leaf is at the given index in a Merkle tree with the provided root\n    // The hash_path provides the sibling nodes needed for verification\n    // Your code here\n}',
    solution: 'fn main(leaf: Field, index: Field, hash_path: [Field; 3], root: Field) {\n    // Verify that leaf is at the given index in a Merkle tree with the provided root\n    let mut computed_root = leaf;\n    let mut idx = index;\n    \n    for i in 0..3 {\n        let current_bit = (idx & 1) == 1;\n        \n        if current_bit {\n            computed_root = std::hash::pedersen([hash_path[i], computed_root]);\n        } else {\n            computed_root = std::hash::pedersen([computed_root, hash_path[i]]);\n        }\n        \n        idx = idx >> 1;\n    }\n    \n    constrain(computed_root == root);\n}',
    concepts: [
      {
        title: 'Merkle Trees',
        description: 'Merkle trees are binary trees where each non-leaf node is the hash of its children.',
        example: 'Let\'s say we have leaves [A, B, C, D]. The Merkle tree would be:\n            root = hash(hash(A, B), hash(C, D))\n           /                         \\\n    hash(A, B)                     hash(C, D)\n     /      \\                     /        \\\n    A        B                    C          D',
        explanation: 'Merkle trees allow efficient verification of data integrity. With just the root and a path of hashes, you can prove that a specific value is part of the tree.'
      },
      {
        title: 'Bitwise Operations',
        description: 'Noir supports bitwise operations: &, |, ^, and >>.',
        example: 'let a = 5;    // 101 in binary\nlet b = 3;    // 011 in binary\nlet c = a & b;  // Bitwise AND: 001 (1 in decimal)\nlet d = a | b;  // Bitwise OR: 111 (7 in decimal)\nlet e = a ^ b;  // Bitwise XOR: 110 (6 in decimal)\nlet f = a >> 1; // Right shift: 10 (2 in decimal)',
        explanation: 'Bitwise operations work directly on the binary representation of numbers. They\'re useful for manipulating individual bits or extracting specific bit patterns.'
      },
      {
        title: 'Merkle Proof Verification',
        description: 'A Merkle proof consists of a leaf, its index, and the hash path needed to recompute the root.',
        example: 'To verify a Merkle proof, you start with the leaf and iteratively hash it with the provided sibling nodes, following the path determined by the index.',
        explanation: 'The index tells you whether to place the current hash on the left or right when combining with the sibling. Each bit of the index represents a decision in the path from leaf to root.'
      }
    ],
    hints: [
      'Start with the leaf value as your computed root',
      'Use the bits of the index to determine whether to hash with the sibling on the left or right',
      'Use the & operator to check the least significant bit of the index',
      'Use the >> operator to shift the index after processing each bit',
      'Finally, constrain the computed root to equal the provided root'
    ]
  },
  {
    id: 'digital-signature',
    title: 'Digital Signature Verification',
    description: 'Implement ECDSA signature verification in Noir.',
    difficulty: 'advanced',
    initialCode: 'fn main(message: [u8; 32], public_key: [u8; 32], signature: [u8; 64]) {\n    // Verify that the signature is valid for the message and public key\n    // Your code here\n}',
    solution: 'fn main(message: [u8; 32], public_key: [u8; 32], signature: [u8; 64]) {\n    // Verify that the signature is valid for the message and public key\n    let is_valid = std::ecdsa::verify_signature(public_key, message, signature);\n    constrain(is_valid);\n}',
    concepts: [
      {
        title: 'Digital Signatures',
        description: 'Digital signatures allow verification that a message was signed by the holder of a private key.',
        example: 'A digital signature scheme typically involves:\n1. A key generation algorithm that produces a private/public key pair\n2. A signing algorithm that creates a signature using the private key and message\n3. A verification algorithm that checks the signature using the public key and message',
        explanation: 'Digital signatures provide authenticity (the message was signed by the private key holder) and integrity (the message hasn\'t been altered since signing).'
      },
      {
        title: 'ECDSA',
        description: 'Elliptic Curve Digital Signature Algorithm is a widely used signature scheme.',
        example: 'In ECDSA:\n- Keys are points on an elliptic curve\n- The public key is derived from the private key\n- Signatures consist of two values (r and s)',
        explanation: 'ECDSA provides strong security with relatively small key sizes, making it suitable for many applications, including Bitcoin and Ethereum.'
      },
      {
        title: 'Standard Library Functions',
        description: 'Noir provides high-level functions for common cryptographic operations.',
        example: 'let is_valid = std::ecdsa::verify_signature(public_key, message, signature);\nlet hash = std::hash::sha256(message);',
        explanation: 'Using standard library functions allows you to write secure code without implementing complex cryptographic algorithms from scratch.'
      }
    ],
    hints: [
      'Use the std::ecdsa::verify_signature function',
      'The function takes the public key, message, and signature as arguments',
      'Use constrain to enforce that the signature is valid'
    ]
  },
  {
    id: 'struct-implementation',
    title: 'Struct Implementation',
    description: 'Learn how to use structs to organize data in Noir.',
    difficulty: 'intermediate',
    initialCode: 'struct Point {\n    x: Field,\n    y: Field,\n}\n\n// Implement the distance_squared function to calculate the squared distance from origin\nfn distance_squared(point: Point) -> Field {\n    // Your code here\n}\n\nfn main(a: Field, b: Field) {\n    let point = Point { x: a, y: b };\n    let expected = a * a + b * b;\n    constrain(distance_squared(point) == expected);\n}',
    solution: 'struct Point {\n    x: Field,\n    y: Field,\n}\n\n// Implement the distance_squared function to calculate the squared distance from origin\nfn distance_squared(point: Point) -> Field {\n    point.x * point.x + point.y * point.y\n}\n\nfn main(a: Field, b: Field) {\n    let point = Point { x: a, y: b };\n    let expected = a * a + b * b;\n    constrain(distance_squared(point) == expected);\n}',
    concepts: [
      {
        title: 'Struct Types',
        description: 'Structs are custom data types that group related values together.',
        example: 'struct Person {\n    name: str,\n    age: Field,\n    is_verified: bool,\n}',
        explanation: 'Structs allow you to create complex data structures by grouping multiple values of different types under a single name.'
      },
      {
        title: 'Struct Instantiation',
        description: 'Structs are created by specifying values for all fields.',
        example: 'let person = Person {\n    name: "Alice",\n    age: 30,\n    is_verified: true,\n};',
        explanation: 'When creating a struct instance, you need to provide values for all the fields defined in the struct.'
      },
      {
        title: 'Field Access',
        description: 'Fields of a struct can be accessed using dot notation.',
        example: 'let person_age = person.age;\nlet is_verified = person.is_verified;',
        explanation: 'The dot notation allows you to read and use individual fields from a struct instance.'
      }
    ],
    hints: [
      'Use the dot notation to access the x and y fields of the point',
      'The squared distance is x² + y²',
      'Remember that Field values support standard arithmetic operations'
    ]
  },
  {
    id: 'private-inputs',
    title: 'Private Inputs',
    description: 'Learn how to work with private inputs in zero-knowledge proofs.',
    difficulty: 'intermediate',
    initialCode: 'fn main(private password_hash: Field, public expected_hash: Field) {\n    // Verify that the private password hash matches the expected hash\n    // Your code here\n}',
    solution: 'fn main(private password_hash: Field, public expected_hash: Field) {\n    // Verify that the private password hash matches the expected hash\n    constrain(password_hash == expected_hash);\n}',
    concepts: [
      {
        title: 'Public vs Private Inputs',
        description: 'Noir allows you to specify inputs as either public or private.',
        example: 'fn main(\n    private secret: Field,  // Only the prover knows this\n    public known: Field,   // Both prover and verifier know this\n) { ... }',
        explanation: 'Private inputs are only known to the prover, while public inputs are known to both the prover and verifier. This distinction is crucial for zero-knowledge proofs.'
      },
      {
        title: 'Input Privacy',
        description: 'Private inputs enable you to prove properties about data without revealing the data itself.',
        example: 'fn main(private password: Field, public password_hash: Field) {\n    let computed_hash = hash(password);\n    constrain(computed_hash == password_hash);\n}',
        explanation: 'This pattern allows you to prove you know a password without revealing it, by only sharing its hash.'
      },
      {
        title: 'Zero-Knowledge Principles',
        description: 'Zero-knowledge proofs allow verification of claims without revealing underlying data.',
        example: 'Proving you know a solution to a puzzle without revealing the solution itself.',
        explanation: 'The "zero-knowledge" property ensures that no information beyond the validity of the statement is revealed. This is powerful for privacy-preserving applications.'
      }
    ],
    hints: [
      'Use the constrain function to enforce the condition',
      'The verification simply requires checking equality between the hashes',
      'In a real application, you would compute the hash inside the circuit, but here we\'re using a pre-computed hash for simplicity'
    ]
  },
  {
    id: 'range-proof',
    title: 'Range Proof',
    description: 'Create a zero-knowledge range proof to verify a value is within bounds.',
    difficulty: 'advanced',
    initialCode: 'fn check_in_range(private value: Field, public min: Field, public max: Field) {\n    // Prove that min ≤ value ≤ max without revealing value\n    // Your code here\n}\n\nfn main(private secret: Field) {\n    // Prove that secret is between 18 and 120 inclusive\n    check_in_range(secret, 18, 120);\n}',
    solution: 'fn check_in_range(private value: Field, public min: Field, public max: Field) {\n    // Prove that min ≤ value ≤ max without revealing value\n    constrain(value >= min);\n    constrain(value <= max);\n}\n\nfn main(private secret: Field) {\n    // Prove that secret is between 18 and 120 inclusive\n    check_in_range(secret, 18, 120);\n}',
    concepts: [
      {
        title: 'Range Proofs',
        description: 'Range proofs allow you to prove a value falls within a specific range without revealing the value itself.',
        example: 'constrain(age >= 18); // Prove you\'re an adult without revealing your age',
        explanation: 'Range proofs are widely used in privacy-preserving applications like anonymous credentials, private voting systems, and confidential transactions.'
      },
      {
        title: 'Compound Constraints',
        description: 'Multiple constraints can be used together to define complex conditions.',
        example: 'constrain(value > min);\nconstrain(value < max);',
        explanation: 'By combining constraints, you can express sophisticated validation logic while maintaining zero knowledge about the private inputs.'
      },
      {
        title: 'Function Composition',
        description: 'Breaking constraints into reusable functions improves code organization.',
        example: 'fn check_valid_age(private age: Field) {\n    constrain(age >= 18);\n    constrain(age <= 120);\n}',
        explanation: 'Isolating constraint logic in functions makes your code more maintainable and allows for reuse across different circuits.'
      }
    ],
    hints: [
      'Use two constraints to check both the lower and upper bounds',
      'For the lower bound, constrain that value >= min',
      'For the upper bound, constrain that value <= max'
    ]
  },
  {
    id: 'merkle-inclusion',
    title: 'Merkle Inclusion Proof',
    description: 'Implement a Merkle tree inclusion proof to verify membership without revealing the full set.',
    difficulty: 'advanced',
    initialCode: 'fn verify_inclusion(\n    private leaf: Field,\n    private index: Field,\n    private merkle_path: [Field; 4],\n    public root: Field\n) -> bool {\n    // Verify that leaf is included in the Merkle tree with the given root\n    // Your code here\n}\n\nfn main(\n    private secret_value: Field,\n    private idx: Field,\n    private path: [Field; 4],\n    public merkle_root: Field\n) {\n    let included = verify_inclusion(secret_value, idx, path, merkle_root);\n    constrain(included);\n}',
    solution: 'fn verify_inclusion(\n    private leaf: Field,\n    private index: Field,\n    private merkle_path: [Field; 4],\n    public root: Field\n) -> bool {\n    // Verify that leaf is included in the Merkle tree with the given root\n    let mut current_hash = leaf;\n    let mut idx = index;\n    \n    for i in 0..4 {\n        let path_element = merkle_path[i];\n        let current_bit = (idx & 1) == 1;\n        \n        if current_bit {\n            current_hash = std::hash::pedersen([path_element, current_hash]);\n        } else {\n            current_hash = std::hash::pedersen([current_hash, path_element]);\n        }\n        \n        idx = idx >> 1;\n    }\n    \n    current_hash == root\n}\n\nfn main(\n    private secret_value: Field,\n    private idx: Field,\n    private path: [Field; 4],\n    public merkle_root: Field\n) {\n    let included = verify_inclusion(secret_value, idx, path, merkle_root);\n    constrain(included);\n}',
    concepts: [
      {
        title: 'Merkle Tree Inclusion Proofs',
        description: 'Merkle inclusion proofs enable verification that a specific value is part of a dataset without revealing the entire dataset.',
        example: 'Proving you\'re on a whitelist without revealing all whitelisted addresses.',
        explanation: 'Merkle inclusion proofs are used in applications like token airdrops, eligibility verification, and set membership proofs.'
      },
      {
        title: 'Path Construction',
        description: 'The path for verification consists of sibling nodes at each level of the tree.',
        example: 'For a leaf at index 2 (binary 010), we need siblings at positions that correspond to the bits of the index.',
        explanation: 'The binary representation of the index tells us whether each sibling is on the left or right at each level of the tree.'
      },
      {
        title: 'Bit Manipulation',
        description: 'Bit operations are used to determine the path through the Merkle tree.',
        example: 'let is_right = (index & (1 << level)) != 0;\nif is_right { /* hash right */ } else { /* hash left */ }',
        explanation: 'Each bit in the index determines whether the current node is the left or right child of its parent, which affects the order of hashing.'
      }
    ],
    hints: [
      'Start with the leaf value and iterate through the Merkle path',
      'Use bitwise operations to determine the direction (left/right) at each level',
      'Check the least significant bit of the index to decide hash order',
      'Shift the index right after each level',
      'Compare the computed root with the provided root'
    ]
  },
  {
    id: 'zk-voting',
    title: 'Anonymous Voting',
    description: 'Implement a zero-knowledge voting circuit to verify vote eligibility without revealing identity.',
    difficulty: 'advanced',
    initialCode: 'struct Voter {\n    id: Field,       // Voter\'s identifier\n    weight: Field,   // Voting weight (e.g., 1 for standard voters)\n}\n\nfn verify_voter(private voter: Voter, private nullifier: Field, public voter_merkle_root: Field) -> bool {\n    // Verify the voter is in the voter Merkle tree without revealing identity\n    // Your code here\n}\n\nfn cast_vote(\n    private voter: Voter,\n    private nullifier: Field,   // Prevents double voting\n    private vote: Field,        // 0 or 1 representing voter\'s choice\n    public voter_merkle_root: Field\n) {\n    // 1. Verify voter eligibility\n    // 2. Constrain vote to valid options (0 or 1)\n    // 3. Return the vote weighted by the voter\'s weight\n    \n    // Your code here\n}',
    solution: 'struct Voter {\n    id: Field,       // Voter\'s identifier\n    weight: Field,   // Voting weight (e.g., 1 for standard voters)\n}\n\nfn verify_voter(private voter: Voter, private nullifier: Field, public voter_merkle_root: Field) -> bool {\n    // In a real implementation, you\'d check a Merkle proof here\n    // For this simplified example, we\'ll just return true\n    true\n}\n\nfn cast_vote(\n    private voter: Voter,\n    private nullifier: Field,   // Prevents double voting\n    private vote: Field,        // 0 or 1 representing voter\'s choice\n    public voter_merkle_root: Field\n) {\n    // 1. Verify voter eligibility\n    let is_eligible = verify_voter(voter, nullifier, voter_merkle_root);\n    constrain(is_eligible);\n    \n    // 2. Constrain vote to valid options (0 or 1)\n    constrain(vote * (vote - 1) == 0);\n    \n    // 3. Calculate the weighted vote\n    let weighted_vote = vote * voter.weight;\n    \n    // Return the weighted vote\n    weighted_vote\n}',
    concepts: [
      {
        title: 'Anonymous Voting',
        description: 'Zero-knowledge proofs enable anonymous voting systems where vote content is verified without revealing voter identity.',
        example: 'A voter can prove they\'re eligible to vote and that their vote is valid without revealing who they are.',
        explanation: 'This preserves privacy while maintaining the integrity of the voting system.'
      },
      {
        title: 'Nullifiers',
        description: 'Nullifiers prevent double-spending or double-voting in zero-knowledge systems.',
        example: 'A unique nullifier is published with each vote, making it impossible to vote twice without detection.',
        explanation: 'The nullifier is typically derived from the voter\'s secret information but doesn\'t reveal anything about their identity.'
      },
      {
        title: 'Range Constraints',
        description: 'Mathematical tricks can be used to constrain values to specific sets.',
        example: 'constrain(vote * (vote - 1) == 0); // Ensures vote is either 0 or 1',
        explanation: 'This constraint is satisfied only when vote equals 0 or 1, effectively limiting the possible values without using conditionals.'
      }
    ],
    hints: [
      'For voter verification, you would typically check a Merkle proof (simplified in this example)',
      'To constrain vote to 0 or 1, use the equation vote * (vote - 1) == 0',
      'Calculate the weighted vote by multiplying the vote value by the voter\'s weight'
    ]
  },
  {
    id: 'zk-mixer',
    title: 'Zero-Knowledge Mixer',
    description: 'Implement core logic for a simple coin mixer that preserves privacy.',
    difficulty: 'advanced',
    initialCode: 'fn verify_deposit(\n    private commitment: Field,\n    private nullifier_hash: Field,\n    private secret: Field,\n    public merkle_root: Field\n) -> bool {\n    // Verify that the commitment is derived correctly from the secret\n    // Your code here\n}\n\nfn verify_withdrawal(\n    private nullifier_hash: Field,\n    private secret: Field,\n    private merkle_path: [Field; 4],\n    private leaf_index: Field,\n    public merkle_root: Field,\n    public recipient: Field\n) {\n    // Verify that a user can withdraw funds without revealing which deposit they\'re withdrawing\n    // Your code here\n}',
    solution: 'fn verify_deposit(\n    private commitment: Field,\n    private nullifier_hash: Field,\n    private secret: Field,\n    public merkle_root: Field\n) -> bool {\n    // Verify that the commitment is derived correctly from the secret\n    let computed_commitment = std::hash::pedersen([secret]);\n    computed_commitment == commitment\n}\n\nfn verify_withdrawal(\n    private nullifier_hash: Field,\n    private secret: Field,\n    private merkle_path: [Field; 4],\n    private leaf_index: Field,\n    public merkle_root: Field,\n    public recipient: Field\n) {\n    // 1. Compute the commitment from the secret\n    let commitment = std::hash::pedersen([secret]);\n    \n    // 2. Verify the commitment is in the Merkle tree\n    let mut current_hash = commitment;\n    let mut idx = leaf_index;\n    \n    for i in 0..4 {\n        let current_bit = (idx & 1) == 1;\n        if current_bit {\n            current_hash = std::hash::pedersen([merkle_path[i], current_hash]);\n        } else {\n            current_hash = std::hash::pedersen([current_hash, merkle_path[i]]);\n        }\n        idx = idx >> 1;\n    }\n    \n    constrain(current_hash == merkle_root);\n    \n    // 3. Verify the nullifier hash matches the expected value\n    let computed_nullifier = std::hash::pedersen([secret, 1]);\n    constrain(computed_nullifier == nullifier_hash);\n}',
    concepts: [
      {
        title: 'Commitments',
        description: 'Cryptographic commitments allow you to commit to a value without revealing it.',
        example: 'let commitment = std::hash::pedersen([secret]);',
        explanation: 'Commitments are created by hashing the secret value, making them impossible to reverse but easy to verify when the original value is later revealed.'
      },
      {
        title: 'Nullifiers',
        description: 'Nullifiers prevent double-spending by providing a unique identifier for each withdrawal.',
        example: 'let nullifier = std::hash::pedersen([secret, 1]);',
        explanation: 'The nullifier is derived from the secret but with a different domain separator to ensure it doesn\'t leak information about the commitment.'
      },
      {
        title: 'Zero-Knowledge Mixers',
        description: 'Mixers increase privacy by breaking the on-chain link between deposit and withdrawal addresses.',
        example: 'Depositing to a shared pool and later withdrawing without revealing which deposit you\'re claiming.',
        explanation: 'This pattern is used in privacy protocols like Tornado Cash and Zcash to provide transaction privacy on public blockchains.'
      }
    ],
    hints: [
      'For deposit verification, hash the secret to obtain the commitment',
      'For withdrawal verification, first verify the Merkle inclusion proof',
      'Create the nullifier hash by combining the secret with a domain separator',
      'Make sure to constrain the computed values to match the expected values'
    ]
  },
  {
    id: 'recursive-functions',
    title: 'Recursive Functions',
    description: 'Learn how to write and use recursive functions in Noir.',
    difficulty: 'intermediate',
    initialCode: 'fn factorial(n: Field) -> Field {\n    // Implement a recursive factorial function\n    // factorial(n) = n * factorial(n-1)\n    // factorial(0) = 1\n    // Your code here\n}\n\nfn main(n: Field) -> Field {\n    factorial(n)\n}',
    solution: 'fn factorial(n: Field) -> Field {\n    // Base case\n    if n == 0 {\n        return 1;\n    }\n    \n    // Recursive case\n    n * factorial(n - 1)\n}\n\nfn main(n: Field) -> Field {\n    factorial(n)\n}',
    concepts: [
      {
        title: 'Recursion',
        description: 'Recursion is a technique where a function calls itself to solve smaller instances of the same problem.',
        example: 'fn countdown(n: Field) {\n    if n == 0 {\n        println!("Liftoff!");\n    } else {\n        println!("{}", n);\n        countdown(n - 1);\n    }\n}',
        explanation: 'Recursive functions must have a base case to prevent infinite recursion. In the countdown example, n == 0 is the base case.'
      },
      {
        title: 'Base Cases',
        description: 'Base cases define the simplest instance of a problem that can be solved directly.',
        example: 'fn fibonacci(n: Field) -> Field {\n    if n <= 1 { // Base case\n        return n;\n    }\n    fibonacci(n - 1) + fibonacci(n - 2) // Recursive case\n}',
        explanation: 'Without a base case, recursive functions would call themselves indefinitely, causing a stack overflow.'
      },
      {
        title: 'Recursive Problem Solving',
        description: 'Complex problems can often be broken down into smaller instances of the same problem.',
        example: 'fn sum_array(arr: [Field], length: Field) -> Field {\n    if length == 0 {\n        return 0;\n    }\n    arr[length - 1] + sum_array(arr, length - 1)\n}',
        explanation: 'Recursive solutions work by solving one piece of the problem and delegating the rest to recursive calls, eventually reaching the base case.'
      }
    ],
    hints: [
      'Start by defining the base case: factorial(0) = 1',
      'For the recursive case, return n * factorial(n - 1)',
      'Make sure your base case prevents infinite recursion'
    ]
  },
  {
    id: 'polynomial-evaluation',
    title: 'Polynomial Evaluation',
    description: 'Implement a function to evaluate polynomials using Horner\'s method.',
    difficulty: 'intermediate',
    initialCode: 'fn evaluate_polynomial(coefficients: [Field; 4], x: Field) -> Field {\n    // Evaluate a polynomial of degree 3 using Horner\'s method\n    // coefficients[0] + coefficients[1]*x + coefficients[2]*x^2 + coefficients[3]*x^3\n    // Your code here\n}\n\nfn main(a: Field, b: Field, c: Field, d: Field, x: Field) -> Field {\n    let coeffs = [a, b, c, d];\n    evaluate_polynomial(coeffs, x)\n}',
    solution: 'fn evaluate_polynomial(coefficients: [Field; 4], x: Field) -> Field {\n    // Evaluate a polynomial of degree 3 using Horner\'s method\n    let mut result = coefficients[3];\n    \n    for i in 0..3 {\n        let idx = 2 - i;\n        result = result * x + coefficients[idx];\n    }\n    \n    result\n}\n\nfn main(a: Field, b: Field, c: Field, d: Field, x: Field) -> Field {\n    let coeffs = [a, b, c, d];\n    evaluate_polynomial(coeffs, x)\n}',
    concepts: [
      {
        title: 'Horner\'s Method',
        description: 'Horner\'s method is an efficient algorithm for evaluating polynomials using nested multiplication.',
        example: 'p(x) = a + bx + cx² + dx³\ncan be rewritten as:\np(x) = a + x(b + x(c + xd))',
        explanation: 'This method requires fewer multiplications than the naive approach, making it more efficient and reducing the potential for numerical errors.'
      },
      {
        title: 'Iterative Algorithms',
        description: 'Iterative algorithms use loops to repeatedly execute a block of code.',
        example: 'let mut sum = 0;\nfor i in 0..10 {\n    sum += i;\n}',
        explanation: 'Iterative solutions often have advantages in terms of efficiency and memory usage compared to recursive solutions.'
      },
      {
        title: 'Algorithm Efficiency',
        description: 'The efficiency of an algorithm is measured by its time and space complexity.',
        example: 'Naively evaluating x^n requires n multiplications, but using exponentiation by squaring reduces this to O(log n).',
        explanation: 'Optimizing algorithms can dramatically improve performance, especially for large inputs or resource-constrained environments.'
      }
    ],
    hints: [
      'Start with the highest-degree coefficient',
      'For each step, multiply the current result by x and add the next coefficient',
      'Iterate from the highest to lowest degree'
    ]
  },
  {
    id: 'array-operations',
    title: 'Array Operations',
    description: 'Implement common array operations to manipulate collections of data.',
    difficulty: 'intermediate',
    initialCode: 'fn sum_array(arr: [Field; 5]) -> Field {\n    // Sum all elements in the array\n    // Your code here\n}\n\nfn find_max(arr: [Field; 5]) -> Field {\n    // Find the maximum value in the array\n    // Your code here\n}\n\nfn main(a: Field, b: Field, c: Field, d: Field, e: Field) {\n    let arr = [a, b, c, d, e];\n    let sum = sum_array(arr);\n    let max = find_max(arr);\n    \n    // Verify our implementations work correctly\n    constrain(sum == a + b + c + d + e);\n    constrain(max >= a && max >= b && max >= c && max >= d && max >= e);\n    constrain(max == a || max == b || max == c || max == d || max == e);\n}',
    solution: 'fn sum_array(arr: [Field; 5]) -> Field {\n    // Sum all elements in the array\n    let mut sum = 0;\n    for i in 0..5 {\n        sum += arr[i];\n    }\n    sum\n}\n\nfn find_max(arr: [Field; 5]) -> Field {\n    // Find the maximum value in the array\n    let mut max = arr[0];\n    for i in 1..5 {\n        if arr[i] > max {\n            max = arr[i];\n        }\n    }\n    max\n}\n\nfn main(a: Field, b: Field, c: Field, d: Field, e: Field) {\n    let arr = [a, b, c, d, e];\n    let sum = sum_array(arr);\n    let max = find_max(arr);\n    \n    // Verify our implementations work correctly\n    constrain(sum == a + b + c + d + e);\n    constrain(max >= a && max >= b && max >= c && max >= d && max >= e);\n    constrain(max == a || max == b || max == c || max == d || max == e);\n}',
    concepts: [
      {
        title: 'Array Iteration',
        description: 'Accessing and processing each element in an array is a fundamental operation.',
        example: 'for i in 0..arr.len() {\n    process(arr[i]);\n}',
        explanation: 'Iterating through arrays allows us to perform operations on each element, such as accumulating a sum or finding a value.'
      },
      {
        title: 'Accumulator Pattern',
        description: 'The accumulator pattern involves maintaining a running value that is updated during iteration.',
        example: 'let mut sum = 0;\nfor value in values {\n    sum += value;\n}',
        explanation: 'This pattern is commonly used for calculating sums, products, or other aggregate values from a collection.'
      },
      {
        title: 'Conditional Logic',
        description: 'Conditional statements allow programs to make decisions based on the values being processed.',
        example: 'if current > max {\n    max = current;\n}',
        explanation: 'Combining conditional logic with iteration enables powerful data processing capabilities like filtering, searching, and optimizing.'
      }
    ],
    hints: [
      'For sum_array, use a mutable variable to accumulate the sum',
      'For find_max, start with the first element as the maximum and update if a larger value is found',
      'Use for loops to iterate through the array elements'
    ]
  },
  {
    id: 'bitwise-operations',
    title: 'Bitwise Operations',
    description: 'Learn to manipulate individual bits using bitwise operations.',
    difficulty: 'intermediate',
    initialCode: 'fn count_bits(n: Field) -> Field {\n    // Count the number of 1 bits in the binary representation of n\n    // Your code here\n}\n\nfn is_power_of_two(n: Field) -> bool {\n    // Check if n is a power of 2 using bitwise operations\n    // Your code here\n}\n\nfn main(n: Field) {\n    let bit_count = count_bits(n);\n    let power_of_two = is_power_of_two(n);\n    \n    // Test with n = 8 (binary 1000): should have 1 bit set and be a power of 2\n    if n == 8 {\n        constrain(bit_count == 1);\n        constrain(power_of_two);\n    }\n    \n    // Test with n = 15 (binary 1111): should have 4 bits set and not be a power of 2\n    if n == 15 {\n        constrain(bit_count == 4);\n        constrain(!power_of_two);\n    }\n}',
    solution: 'fn count_bits(n: Field) -> Field {\n    // Count the number of 1 bits in the binary representation of n\n    let mut count = 0;\n    let mut value = n;\n    \n    while value > 0 {\n        if value & 1 == 1 {\n            count += 1;\n        }\n        value = value >> 1;\n    }\n    \n    count\n}\n\nfn is_power_of_two(n: Field) -> bool {\n    // Check if n is a power of 2 using bitwise operations\n    // A power of 2 has exactly one bit set, and n & (n-1) removes the lowest set bit\n    n > 0 && (n & (n - 1)) == 0\n}\n\nfn main(n: Field) {\n    let bit_count = count_bits(n);\n    let power_of_two = is_power_of_two(n);\n    \n    // Test with n = 8 (binary 1000): should have 1 bit set and be a power of 2\n    if n == 8 {\n        constrain(bit_count == 1);\n        constrain(power_of_two);\n    }\n    \n    // Test with n = 15 (binary 1111): should have 4 bits set and not be a power of 2\n    if n == 15 {\n        constrain(bit_count == 4);\n        constrain(!power_of_two);\n    }\n}',
    concepts: [
      {
        title: 'Bitwise AND (&)',
        description: 'The bitwise AND operation compares each bit of two numbers and returns 1 only if both bits are 1.',
        example: '5 & 3 = 101 & 011 = 001 = 1',
        explanation: 'Bitwise AND is useful for masking (isolating specific bits) and testing individual bits.'
      },
      {
        title: 'Bitwise Right Shift (>>)',
        description: 'The right shift operation moves all bits to the right by a specified number of positions.',
        example: '8 >> 1 = 1000 >> 1 = 0100 = 4',
        explanation: 'Right shifting by n positions is equivalent to dividing by 2^n. It\'s efficient for processing bits sequentially.'
      },
      {
        title: 'Bit Manipulation Techniques',
        description: 'Common bit manipulation patterns solve problems efficiently with minimal operations.',
        example: 'n & (n-1) clears the lowest set bit\nn & -n isolates the lowest set bit\n',
        explanation: 'Bit manipulation techniques are widely used in cryptography, optimization problems, and low-level systems programming.'
      }
    ],
    hints: [
      'For count_bits, check each bit by using n & 1, then right shift to get to the next bit',
      'For is_power_of_two, remember that powers of 2 have exactly one bit set',
      'The expression n & (n-1) == 0 checks if n has exactly one bit set (for n > 0)'
    ]
  },
  {
    id: 'custom-hash-function',
    title: 'Custom Hash Function',
    description: 'Implement a basic hash function to understand cryptographic principles.',
    difficulty: 'advanced',
    initialCode: 'fn simple_hash(input: [u8; 4]) -> Field {\n    // Implement a simple hash function\n    // 1. Start with a prime number as the initial hash value\n    // 2. For each byte, multiply the current hash by 31 and add the byte value\n    // 3. Return the final hash value\n    // Your code here\n}\n\nfn main(a: u8, b: u8, c: u8, d: u8) {\n    let input = [a, b, c, d];\n    let hash1 = simple_hash(input);\n    \n    // Small change should produce different hash\n    let input2 = [a, b, c, d + 1];\n    let hash2 = simple_hash(input2);\n    \n    // Verify that different inputs produce different hashes\n    constrain(hash1 != hash2);\n}',
    solution: 'fn simple_hash(input: [u8; 4]) -> Field {\n    // Implement a simple hash function\n    // 1. Start with a prime number as the initial hash value\n    // 2. For each byte, multiply the current hash by 31 and add the byte value\n    // 3. Return the final hash value\n    let mut hash: Field = 17;\n    \n    for i in 0..4 {\n        hash = hash * 31 + input[i] as Field;\n    }\n    \n    hash\n}\n\nfn main(a: u8, b: u8, c: u8, d: u8) {\n    let input = [a, b, c, d];\n    let hash1 = simple_hash(input);\n    \n    // Small change should produce different hash\n    let input2 = [a, b, c, d + 1];\n    let hash2 = simple_hash(input2);\n    \n    // Verify that different inputs produce different hashes\n    constrain(hash1 != hash2);\n}',
    concepts: [
      {
        title: 'Hash Functions',
        description: 'Hash functions map data of arbitrary size to fixed-size values, ideally with uniform distribution.',
        example: 'Hash functions like SHA-256 and Pedersen transform inputs into fixed-length outputs that are difficult to reverse.',
        explanation: 'Hash functions are essential for data integrity checks, digital signatures, password storage, and many cryptographic protocols.'
      },
      {
        title: 'Avalanche Effect',
        description: 'The avalanche effect is a desirable property where a small change in input produces a significantly different hash output.',
        example: 'Changing a single bit of input should change approximately half the bits in the output hash.',
        explanation: 'This property ensures that even minor modifications to data are detectable, making hash functions useful for integrity verification.'
      },
      {
        title: 'Type Casting',
        description: 'Converting values from one type to another is often necessary when working with different numeric types.',
        example: 'let byte_value: u8 = 255;\nlet field_value: Field = byte_value as Field;',
        explanation: 'Type casting ensures that operations work correctly with the appropriate numeric ranges and representations.'
      }
    ],
    hints: [
      'Start with a prime number (like 17) as your initial hash value',
      'Use a for loop to process each byte in the input array',
      'For each byte, multiply the current hash by 31 and add the byte value',
      'Remember to cast the byte to a Field type before adding it to the hash'
    ]
  },
  {
    id: 'finite-field-math',
    title: 'Finite Field Mathematics',
    description: 'Learn about finite field arithmetic operations that underpin cryptographic protocols.',
    difficulty: 'advanced',
    initialCode: 'fn mod_exp(base: Field, exponent: Field, modulus: Field) -> Field {\n    // Implement modular exponentiation using the fast (square-and-multiply) algorithm\n    // Calculate (base^exponent) % modulus efficiently\n    // Your code here\n}\n\nfn main(a: Field, b: Field, m: Field) {\n    let result = mod_exp(a, b, m);\n    \n    // For testing, verify with a known example: 3^5 % 7 = 5\n    if a == 3 && b == 5 && m == 7 {\n        constrain(result == 5);\n    }\n}',
    solution: 'fn mod_exp(base: Field, exponent: Field, modulus: Field) -> Field {\n    // Implement modular exponentiation using the fast (square-and-multiply) algorithm\n    // Calculate (base^exponent) % modulus efficiently\n    let mut result: Field = 1;\n    let mut base_temp = base % modulus;\n    let mut exp_temp = exponent;\n    \n    while exp_temp > 0 {\n        // If current exponent bit is 1, multiply result by the current base\n        if exp_temp & 1 == 1 {\n            result = (result * base_temp) % modulus;\n        }\n        \n        // Square the base and reduce modulo m\n        base_temp = (base_temp * base_temp) % modulus;\n        \n        // Move to next bit of exponent\n        exp_temp = exp_temp >> 1;\n    }\n    \n    result\n}\n\nfn main(a: Field, b: Field, m: Field) {\n    let result = mod_exp(a, b, m);\n    \n    // For testing, verify with a known example: 3^5 % 7 = 5\n    if a == 3 && b == 5 && m == 7 {\n        constrain(result == 5);\n    }\n}',
    concepts: [
      {
        title: 'Modular Exponentiation',
        description: 'Modular exponentiation is the operation of computing (base^exponent) % modulus efficiently.',
        example: '3^5 % 7 = 243 % 7 = 5',
        explanation: 'Naive computation of large exponentiations can lead to enormous numbers. Modular exponentiation keeps the intermediate values manageable by applying the modulus at each step.'
      },
      {
        title: 'Square-and-Multiply Algorithm',
        description: 'The square-and-multiply algorithm is an efficient method for modular exponentiation.',
        example: 'To compute 3^11:\n1. Express 11 in binary: 1011\n2. Initialize result = 1\n3. For each bit, square the current result, and if the bit is 1, multiply by the base',
        explanation: 'This reduces the number of multiplications from O(exponent) to O(log(exponent)), making it much more efficient for large exponents.'
      },
      {
        title: 'Finite Fields',
        description: 'Finite fields are mathematical structures with a finite number of elements, often used in cryptography.',
        example: 'In the finite field of integers modulo 7, we have 7 elements: {0, 1, 2, 3, 4, 5, 6}, and all operations wrap around',
        explanation: 'Finite fields provide the mathematical foundation for many cryptographic primitives, including elliptic curve cryptography and zero-knowledge proofs.'
      }
    ],
    hints: [
      'Start with a result of 1 and process the exponent bit by bit',
      'For each bit of the exponent, square the current base',
      'If the current bit is 1, multiply the result by the current base',
      'Apply the modulus after each multiplication to keep values manageable'
    ]
  },
  {
    id: 'schnorr-signature',
    title: 'Schnorr Signature Verification',
    description: 'Implement a simplified Schnorr signature verification scheme.',
    difficulty: 'advanced',
    initialCode: 'fn verify_schnorr_signature(\n    public_key: Field,\n    message: Field,\n    signature: (Field, Field),  // (r, s)\n    generator: Field\n) -> bool {\n    // Verify a Schnorr signature\n    // 1. Calculate e = hash(r || message) (simplified: e = r + message)\n    // 2. Verify g^s = r * (public_key)^e (simplified: g*s = r + public_key*e)\n    // Your code here\n}\n\nfn main(\n    public_key: Field,\n    message: Field,\n    r: Field,\n    s: Field,\n    generator: Field\n) {\n    let signature = (r, s);\n    let is_valid = verify_schnorr_signature(public_key, message, signature, generator);\n    \n    // Verify that a valid signature passes the check\n    constrain(is_valid);\n}',
    solution: 'fn verify_schnorr_signature(\n    public_key: Field,\n    message: Field,\n    signature: (Field, Field),  // (r, s)\n    generator: Field\n) -> bool {\n    // Unpack the signature\n    let r = signature.0;\n    let s = signature.1;\n    \n    // Calculate e = hash(r || message) (simplified: e = r + message)\n    let e = r + message;\n    \n    // Verify g^s = r * (public_key)^e (simplified: g*s = r + public_key*e)\n    let left_side = generator * s;\n    let right_side = r + (public_key * e);\n    \n    left_side == right_side\n}\n\nfn main(\n    public_key: Field,\n    message: Field,\n    r: Field,\n    s: Field,\n    generator: Field\n) {\n    let signature = (r, s);\n    let is_valid = verify_schnorr_signature(public_key, message, signature, generator);\n    \n    // Verify that a valid signature passes the check\n    constrain(is_valid);\n}',
    concepts: [
      {
        title: 'Schnorr Signatures',
        description: 'Schnorr signatures are a form of digital signature known for their simplicity, efficiency, and security.',
        example: 'A Schnorr signature consists of a pair (r, s) that can be verified against a public key and message.',
        explanation: 'Schnorr signatures are provably secure under the discrete logarithm assumption and enable interesting features like multi-signatures and threshold signatures.'
      },
      {
        title: 'Digital Signature Verification',
        description: 'Digital signature verification confirms that a message was signed by the holder of a private key.',
        example: 'Given a message, public key, and signature, verification confirms the signature was created using the corresponding private key.',
        explanation: 'The verification process uses mathematical relationships that can only be satisfied if the signer possessed the private key, without requiring the private key itself.'
      },
      {
        title: 'Tuple Types',
        description: 'Tuples are compound data types that group multiple values of potentially different types.',
        example: 'let coordinate: (Field, Field) = (x, y);\nlet x_value = coordinate.0;',
        explanation: 'Tuples provide a way to return or pass multiple values without defining a custom struct, accessed by index (starting from 0).'
      }
    ],
    hints: [
      'Extract the r and s components from the signature tuple',
      'Calculate e as the simplified hash of r and the message',
      'Calculate the left and right sides of the verification equation',
      'Return whether the two sides are equal'
    ]
  },
  {
    id: 'shamir-secret-sharing',
    title: 'Shamir Secret Sharing',
    description: 'Implement a simplified version of Shamir\'s Secret Sharing scheme.',
    difficulty: 'advanced',
    initialCode: 'fn evaluate_polynomial(coefficients: [Field; 3], x: Field) -> Field {\n    // Evaluate a polynomial at point x\n    // polynomial = coefficients[0] + coefficients[1]*x + coefficients[2]*x^2\n    // Your code here\n}\n\nfn combine_shares(x1: Field, y1: Field, x2: Field, y2: Field) -> Field {\n    // Combine two shares to reconstruct the secret (coefficient[0])\n    // using Lagrange interpolation\n    // Your code here\n}\n\nfn main(secret: Field, a1: Field, a2: Field, x1: Field, x2: Field) {\n    // Create a polynomial with the secret as the constant term\n    let coefficients = [secret, a1, a2];\n    \n    // Generate two shares\n    let y1 = evaluate_polynomial(coefficients, x1);\n    let y2 = evaluate_polynomial(coefficients, x2);\n    \n    // Reconstruct the secret from the shares\n    let recovered_secret = combine_shares(x1, y1, x2, y2);\n    \n    // Verify that the recovered secret matches the original\n    constrain(recovered_secret == secret);\n}',
    solution: 'fn evaluate_polynomial(coefficients: [Field; 3], x: Field) -> Field {\n    // Evaluate a polynomial at point x\n    // polynomial = coefficients[0] + coefficients[1]*x + coefficients[2]*x^2\n    let mut result = 0;\n    let mut x_power = 1;\n    \n    for i in 0..3 {\n        result += coefficients[i] * x_power;\n        x_power *= x;\n    }\n    \n    result\n}\n\nfn combine_shares(x1: Field, y1: Field, x2: Field, y2: Field) -> Field {\n    // Combine two shares to reconstruct the secret (coefficient[0])\n    // using Lagrange interpolation\n    \n    // Compute Lagrange basis polynomials evaluated at x=0\n    let l1_at_0 = (0 - x2) / (x1 - x2);  // L1(0) = (0-x2)/(x1-x2)\n    let l2_at_0 = (0 - x1) / (x2 - x1);  // L2(0) = (0-x1)/(x2-x1)\n    \n    // Reconstruct the secret using Lagrange interpolation\n    // f(0) = y1*L1(0) + y2*L2(0)\n    y1 * l1_at_0 + y2 * l2_at_0\n}\n\nfn main(secret: Field, a1: Field, a2: Field, x1: Field, x2: Field) {\n    // Create a polynomial with the secret as the constant term\n    let coefficients = [secret, a1, a2];\n    \n    // Generate two shares\n    let y1 = evaluate_polynomial(coefficients, x1);\n    let y2 = evaluate_polynomial(coefficients, x2);\n    \n    // Reconstruct the secret from the shares\n    let recovered_secret = combine_shares(x1, y1, x2, y2);\n    \n    // Verify that the recovered secret matches the original\n    constrain(recovered_secret == secret);\n}',
    concepts: [
      {
        title: 'Shamir Secret Sharing',
        description: 'Shamir\'s Secret Sharing is a cryptographic algorithm that divides a secret into multiple shares.',
        example: 'A t-of-n threshold scheme splits a secret into n shares, requiring at least t shares to reconstruct it.',
        explanation: 'This enables secure distribution of sensitive information where trust is distributed among multiple parties.'
      },
      {
        title: 'Polynomial Interpolation',
        description: 'Polynomial interpolation reconstructs a polynomial given a set of points on that polynomial.',
        example: 'Given points (1,3) and (2,7), we can determine that the line is y = 4x - 1.',
        explanation: 'Lagrange interpolation is a common method for polynomial reconstruction in secret sharing schemes.'
      },
      {
        title: 'Threshold Cryptography',
        description: 'Threshold cryptography distributes trust among multiple parties, requiring collaboration for cryptographic operations.',
        example: 'A 3-of-5 multisignature wallet requires at least 3 out of 5 signers to approve a transaction.',
        explanation: 'Threshold schemes balance security with resilience, protecting against both malicious actors and loss of shares.'
      }
    ],
    hints: [
      'For polynomial evaluation, compute each term and sum them',
      'For Lagrange interpolation, you need to find the polynomial of degree 1 that passes through the two shares',
      'The formula for Lagrange basis polynomials evaluated at x=0 simplifies our work',
      'The secret is f(0), which we can compute without fully reconstructing the polynomial'
    ]
  },
  {
    id: 'pedersen-commitment',
    title: 'Pedersen Commitment',
    description: 'Implement and verify Pedersen commitments for secret values.',
    difficulty: 'advanced',
    initialCode: 'fn create_commitment(value: Field, blinding_factor: Field, g: Field, h: Field) -> Field {\n    // Create a Pedersen commitment: C = value*g + blinding_factor*h\n    // Your code here\n}\n\nfn verify_commitment(commitment: Field, value: Field, blinding_factor: Field, g: Field, h: Field) -> bool {\n    // Verify that a commitment corresponds to a value and blinding factor\n    // Your code here\n}\n\nfn main(secret: Field, blinding: Field, g: Field, h: Field) {\n    // Create a commitment to the secret value\n    let commitment = create_commitment(secret, blinding, g, h);\n    \n    // Verify the commitment is valid\n    let is_valid = verify_commitment(commitment, secret, blinding, g, h);\n    constrain(is_valid);\n    \n    // A valid Pedersen commitment should not reveal the committed value\n    // (this is just a representation of the hiding property)\n}',
    solution: 'fn create_commitment(value: Field, blinding_factor: Field, g: Field, h: Field) -> Field {\n    // Create a Pedersen commitment: C = value*g + blinding_factor*h\n    value * g + blinding_factor * h\n}\n\nfn verify_commitment(commitment: Field, value: Field, blinding_factor: Field, g: Field, h: Field) -> bool {\n    // Verify that a commitment corresponds to a value and blinding factor\n    let expected_commitment = create_commitment(value, blinding_factor, g, h);\n    expected_commitment == commitment\n}\n\nfn main(secret: Field, blinding: Field, g: Field, h: Field) {\n    // Create a commitment to the secret value\n    let commitment = create_commitment(secret, blinding, g, h);\n    \n    // Verify the commitment is valid\n    let is_valid = verify_commitment(commitment, secret, blinding, g, h);\n    constrain(is_valid);\n    \n    // A valid Pedersen commitment should not reveal the committed value\n    // (this is just a representation of the hiding property)\n}',
    concepts: [
      {
        title: 'Commitment Schemes',
        description: 'Commitment schemes allow a party to commit to a value while keeping it hidden, with the ability to reveal it later.',
        example: 'Like a sealed envelope containing a written bid: you can\'t change it after committing, and others can\'t see it until you reveal it.',
        explanation: 'Commitment schemes are fundamental to many cryptographic protocols, including zero-knowledge proofs and secure multiparty computation.'
      },
      {
        title: 'Pedersen Commitments',
        description: 'Pedersen commitments are a type of cryptographic commitment that is computationally binding and information-theoretically hiding.',
        example: 'C = value*g + blinding_factor*h, where g and h are group generators',
        explanation: 'The blinding factor hides the committed value, while the commitment remains binding under the discrete logarithm assumption.'
      },
      {
        title: 'Hiding and Binding Properties',
        description: 'Good commitment schemes have two key properties: hiding (commitments don\'t reveal the value) and binding (values can\'t be changed after commitment).',
        example: 'Hiding: The same commitment could be to different values with different blinding factors\nBinding: It\'s computationally infeasible to find two different values that create the same commitment',
        explanation: 'These properties make commitment schemes useful for protocols where revealing information too early would compromise security.'
      }
    ],
    hints: [
      'The commitment is a linear combination of the generators weighted by the value and blinding factor',
      'To verify a commitment, recompute the expected commitment and check if it matches',
      'The blinding factor ensures that the commitment doesn\'t reveal the actual value'
    ]
  },
  {
    id: 'zero-knowledge-sudoku',
    title: 'Zero-Knowledge Sudoku',
    description: 'Implement a ZK proof that verifies a Sudoku solution without revealing it.',
    difficulty: 'advanced',
    initialCode: 'fn is_valid_region(region: [Field; 9]) -> bool {\n    // Check if a Sudoku region (row, column, or 3x3 box) contains digits 1-9 exactly once\n    // Your code here\n}\n\nfn verify_sudoku_solution(solution: [[Field; 9]; 9]) -> bool {\n    // Verify that a Sudoku solution is valid without revealing the actual solution\n    // 1. Each row must contain digits 1-9 exactly once\n    // 2. Each column must contain digits 1-9 exactly once\n    // 3. Each 3x3 box must contain digits 1-9 exactly once\n    // Your code here\n}\n\nfn main(private solution: [[Field; 9]; 9]) {\n    // Verify the Sudoku solution is valid without revealing it\n    let is_valid = verify_sudoku_solution(solution);\n    constrain(is_valid);\n}',
    solution: 'fn is_valid_region(region: [Field; 9]) -> bool {\n    // Check if a Sudoku region (row, column, or 3x3 box) contains digits 1-9 exactly once\n    \n    // Create an array to track which digits we\'ve seen\n    let mut seen = [false; 9];\n    \n    for i in 0..9 {\n        let digit = region[i];\n        \n        // Ensure the digit is between 1 and 9\n        if digit < 1 || digit > 9 {\n            return false;\n        }\n        \n        // Calculate the index (0-based) for our seen array\n        let idx = (digit - 1) as usize;\n        \n        // If we\'ve already seen this digit, the region is invalid\n        if seen[idx] {\n            return false;\n        }\n        \n        // Mark this digit as seen\n        seen[idx] = true;\n    }\n    \n    // If we made it here, all digits 1-9 appear exactly once\n    true\n}\n\nfn verify_sudoku_solution(solution: [[Field; 9]; 9]) -> bool {\n    // Check each row\n    for row in 0..9 {\n        let mut row_values = [0; 9];\n        for col in 0..9 {\n            row_values[col] = solution[row][col];\n        }\n        if !is_valid_region(row_values) {\n            return false;\n        }\n    }\n    \n    // Check each column\n    for col in 0..9 {\n        let mut col_values = [0; 9];\n        for row in 0..9 {\n            col_values[row] = solution[row][col];\n        }\n        if !is_valid_region(col_values) {\n            return false;\n        }\n    }\n    \n    // Check each 3x3 box\n    for box_row in 0..3 {\n        for box_col in 0..3 {\n            let mut box_values = [0; 9];\n            let mut idx = 0;\n            \n            for row in (box_row*3)..((box_row+1)*3) {\n                for col in (box_col*3)..((box_col+1)*3) {\n                    box_values[idx] = solution[row][col];\n                    idx += 1;\n                }\n            }\n            \n            if !is_valid_region(box_values) {\n                return false;\n            }\n        }\n    }\n    \n    // If all checks pass, the solution is valid\n    true\n}\n\nfn main(private solution: [[Field; 9]; 9]) {\n    // Verify the Sudoku solution is valid without revealing it\n    let is_valid = verify_sudoku_solution(solution);\n    constrain(is_valid);\n}',
    concepts: [
      {
        title: 'Zero-Knowledge Verification',
        description: 'Zero-knowledge proofs allow one party to prove to another that a statement is true without revealing any additional information.',
        example: 'Proving you know the solution to a puzzle without showing the solution itself.',
        explanation: 'This enables privacy-preserving verification, where the validity of data can be confirmed without exposing the data.'
      },
      {
        title: 'Constraint Satisfaction Problems',
        description: 'Many puzzles and problems can be expressed as a set of constraints that valid solutions must satisfy.',
        example: 'Sudoku rules define a constraint satisfaction problem: each row, column, and box must contain digits 1-9 exactly once.',
        explanation: 'Framing problems as constraint satisfaction allows for systematic verification approaches.'
      },
      {
        title: 'Private Inputs in ZK Circuits',
        description: 'Zero-knowledge circuits can take both public and private inputs, proving relationships between them without revealing the private values.',
        example: 'private solution: [[Field; 9]; 9] allows the prover to provide a Sudoku solution that remains hidden from the verifier.',
        explanation: 'The private keyword ensures that the input value remains known only to the prover while still enabling verification of its properties.'
      }
    ],
    hints: [
      'First implement the is_valid_region function to check if a row, column, or box contains digits 1-9 exactly once',
      'In verify_sudoku_solution, check all rows, all columns, and all 3x3 boxes',
      'Use nested loops to extract each row, column, and 3x3 box for validation',
      'The solution is valid only if all regions (rows, columns, and boxes) are valid'
    ]
  }
]; 