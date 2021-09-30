// to solve ReferenceError: regeneratorRuntime is not defined
import "babel-polyfill";

// Import the js file to test
import { handleSubmit, updateUI, polarityResolver, postData } from "../src/client/js/formHandler"

/* 
 * Did not know how to check the functionality of postData and updateUI functions.
 * I know I need to use the information in https://jestjs.io/docs/asynchronous.
 * My main problem is that the way I structured the functions makes the testing difficult for a method
 * like postData since it does not expect returned output
 */

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the form submit definitions", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing if the handleSubmit() function is defined", () => {
        // Define the input for the function, if any, in the form of variables/array
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        expect(handleSubmit).toBeDefined();
    });

      test("Testing if the postData() function is defined", () => {
        // Define the input for the function, if any, in the form of variables/array
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        expect(postData).toBeDefined();
    })

    test("Testing if the updateUI() function is defined", () => {
        // Define the input for the function, if any, in the form of variables/array
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        expect(updateUI).toBeDefined();
    })

    test("Testing of the polarityResolver() function is defined", () => {
        // Define the input for the function, if any, in the form of variables/array
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        expect(polarityResolver).toBeDefined();
    });
});


describe('Testing the polarityResolver() functionality', () => {
  test.each`
    input       | expectedResult
    ${'P+'}     | ${'strong positive'}
    ${'P'}      | ${'positive'}
    ${'NEU'}    | ${'neutral'}
    ${'N'}      | ${'negative'} 
    ${'N+'}     | ${'strong negative'}
    ${'NONE'}   | ${'without polarity'}
    ${'knkad'}  | ${'This is an invalid score tag!'}
    // add new test cases here
  `('Returns $expectedResult when the input is $input', ({ input, expectedResult }) => {
    expect(polarityResolver(input)).toBe(expectedResult)
  })
});
