// Import the js file to test
import { checkURL } from "../src/client/js/checkURL"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the url checker function is defined", () => {

    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the checkURL() function exists", () => {
        // Define the input for the function, if any, in the form of variables/array
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        expect(checkURL).toBeDefined();
    });
});


/*
 * Trying the test.each as described in the following article:
 * https://blog.theodo.com/2018/09/jest-each-tests/
 */ 

describe('Testing the url checker functionality', () => {
  test.each`
    input                                                              | expectedResult
    ${'https://news.google.com/topstories?hl=en-US&gl=US&ceid=US:en'}  | ${true}
    ${'https://www.udacity.com/'}                                      | ${true}
    ${'njandjanf'}                                                     | ${false}
    // add new test cases here
  `('Is $input a valid URL? $expectedResult', ({ input, expectedResult }) => {
    expect(checkURL(input)).toBe(expectedResult)
  })
});
